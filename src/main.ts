import {
  ClassSpec,
  CodeBlock,
  EnumSpec,
  FileSpec,
  FunctionSpec,
  InterfaceSpec,
  Modifier,
  PropertySpec,
  TypeName,
  TypeNames,
  Union
} from 'ts-poet';
import { google } from '../build/pbjs';
import {
  basicLongWireType,
  basicTypeName,
  basicWireType,
  defaultValue,
  detectMapType,
  isBytes,
  isEnum,
  isMapType,
  isMessage,
  isPrimitive,
  isRepeated,
  isTimestamp,
  isValueType,
  isWithinOneOf,
  messageToTypeName,
  packedType,
  toReaderCall,
  toTypeName,
  TypeMap,
  isLong
} from './types';
import { asSequence } from 'sequency';
import SourceInfo, { Fields } from './sourceInfo';
import { optionsFromParameter, singular, maybeAddComment } from './utils';
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;
import MethodDescriptorProto = google.protobuf.MethodDescriptorProto;

const dataloader = TypeNames.anyType('DataLoader*dataloader');

export type Options = {
  useContext: boolean;
  snakeToCamel: boolean;
  forceLong: boolean;
  forceLongString: boolean;
  outputEncodeMethods: boolean;
  outputJsonMethods: boolean;
  outputClientImpl: boolean;
};

export function generateFile(typeMap: TypeMap, fileDesc: FileDescriptorProto, parameter: string): FileSpec {
  const options = optionsFromParameter(parameter);

  // Google's protofiles are organized like Java, where package == the folder the file
  // is in, and file == a specific service within the package. I.e. you can have multiple
  // company/foo.proto and company/bar.proto files, where package would be 'company'.
  //
  // We'll match that stucture by setting up the module path as:
  //
  // company/foo.proto --> company/foo.ts
  // company/bar.proto --> company/bar.ts
  //
  // We'll also assume that the fileDesc.name is already the `company/foo.proto` path, with
  // the package already implicitly in it, so we won't re-append/strip/etc. it out/back in.
  const moduleName = fileDesc.name.replace('.proto', '.ts');
  let file = FileSpec.create(moduleName);

  const sourceInfo = SourceInfo.fromDescriptor(fileDesc);

  // Syntax, unlike most fields, is not repeated and thus does not use an index
  const headerComment = sourceInfo.lookup(Fields.file.syntax, undefined);
  maybeAddComment(headerComment, text => (file = file.addComment(text)));

  // first make all the type declarations
  visit(
    fileDesc,
    sourceInfo,
    (fullName, message, sInfo) => {
      file = file.addInterface(generateInterfaceDeclaration(typeMap, fullName, message, sInfo, options));
    },
    options,
    (fullName, enumDesc, sInfo) => {
      file = file.addEnum(generateEnum(fullName, enumDesc, sInfo));
    }
  );

  if (options.outputEncodeMethods || options.outputJsonMethods) {
    // then add the encoder/decoder/base instance
    visit(
      fileDesc,
      sourceInfo,
      (fullName, message) => {
        file = file.addProperty(generateBaseInstance(fullName, message, options));
        let staticMethods = CodeBlock.empty()
          .add('export const %L = ', fullName)
          .beginHash();

        staticMethods = !options.outputEncodeMethods
          ? staticMethods
          : staticMethods
              .addHashEntry(generateEncode(typeMap, fullName, message, options))
              .addHashEntry(generateDecode(typeMap, fullName, message, options));

        staticMethods = !options.outputJsonMethods
          ? staticMethods
          : staticMethods
              .addHashEntry(generateFromJson(typeMap, fullName, message, options))
              .addHashEntry(generateFromPartial(typeMap, fullName, message, options))
              .addHashEntry(generateToJson(typeMap, fullName, message, options));

        staticMethods = staticMethods
          .endHash()
          .add(';')
          .newLine();
        file = file.addCode(staticMethods);
      },
      options,
      (fullName, enumDesc) => {
        if (!options.outputJsonMethods) {
          return;
        }
        let staticMethods = CodeBlock.empty()
          .beginControlFlow('export namespace %L', fullName)
          .addFunction(generateEnumFromJson(fullName, enumDesc))
          .addFunction(generateEnumToJson(fullName, enumDesc))
          .endControlFlow();
        file = file.addCode(staticMethods);
      }
    );
  }

  visitServices(fileDesc, sourceInfo, (serviceDesc, sInfo) => {
    file = file.addInterface(generateService(typeMap, fileDesc, sInfo, serviceDesc, options));
    file = !options.outputClientImpl
      ? file
      : file.addClass(generateServiceClientImpl(typeMap, fileDesc, serviceDesc, options));
  });

  if (options.outputClientImpl && fileDesc.service.length > 0) {
    file = file.addInterface(generateRpcType(options));
    if (options.useContext) {
      file = file.addInterface(generateDataLoadersType(options));
    }
  }

  let hasAnyTimestamps = false;
  visit(
    fileDesc,
    sourceInfo,
    (_, messageType) => {
      hasAnyTimestamps = hasAnyTimestamps || asSequence(messageType.field).any(isTimestamp);
    },
    options
  );
  if (hasAnyTimestamps) {
    file = addTimestampMethods(file, options);
  }

  const initialOutput = file.toString();
  // This `.includes(...)` is a pretty fuzzy way of detecting whether we use these utility
  // methods (to prevent outputting them if its not necessary). In theory, we should be able
  // to lean on the code generation library more to do this sort of "output only if used",
  // similar to what it does for auto-imports.
  if (initialOutput.includes('longToNumber') || initialOutput.includes('numberToLong')) {
    file = addLongUtilityMethod(file, options);
  }
  if (initialOutput.includes('DeepPartial')) {
    file = addDeepPartialType(file);
  }

  return file;
}

function addLongUtilityMethod(file: FileSpec, options: Options): FileSpec {
  if (options.forceLong) {
    return file.addFunction(
      FunctionSpec.create('numberToLong')
        .addParameter('number', 'number')
        .addCodeBlock(CodeBlock.empty().addStatement('return %T.fromNumber(number)', 'Long*long'))
    );
  } else if (options.forceLongString) {
    return file.addFunction(
      FunctionSpec.create('longToString')
        .addParameter('long', 'Long*long')
        .addCodeBlock(CodeBlock.empty().addStatement('return long.toString()'))
    );
  } else {
    return file.addFunction(
      FunctionSpec.create('longToNumber')
        .addParameter('long', 'Long*long')
        .addCodeBlock(
          CodeBlock.empty()
            .beginControlFlow('if (long.gt(Number.MAX_SAFE_INTEGER))')
            .addStatement('throw new global.Error("Value is larger than Number.MAX_SAFE_INTEGER")')
            .endControlFlow()
            .addStatement('return long.toNumber()')
        )
    );
  }
}

function addDeepPartialType(file: FileSpec): FileSpec {
  return file.addCode(
    CodeBlock.empty()
      .add('type DeepPartial<T> = {%>\n')
      .add('[P in keyof T]?: T[P] extends Array<infer U>\n')
      .add('? Array<DeepPartial<U>>\n')
      .add(': T[P] extends ReadonlyArray<infer U>\n')
      .add('? ReadonlyArray<DeepPartial<U>>\n')
      .add(': T[P] extends Date | Function | Uint8Array | undefined\n')
      .add('? T[P]\n')
      .add(': T[P] extends infer U | undefined\n')
      .add('? DeepPartial<U>\n')
      .add(': T[P] extends object\n')
      .add('? DeepPartial<T[P]>\n')
      .add(': T[P]\n%<')
      .add('};')
  );
}

function addTimestampMethods(file: FileSpec, options: Options): FileSpec {
  const timestampType = 'Timestamp@./google/protobuf/timestamp';

  let secondsCodeLine = 'const seconds = date.getTime() / 1_000';
  let toNumberCode = 't.seconds';
  if (options.forceLong) {
    toNumberCode = 't.seconds.toNumber()';
    secondsCodeLine = 'const seconds = numberToLong(date.getTime() / 1_000)';
  } else if (options.forceLongString) {
    toNumberCode = 'Number(t.seconds)';
    secondsCodeLine = 'const seconds = (date.getTime() / 1_000).toString()';
  }

  return file
    .addFunction(
      FunctionSpec.create('toTimestamp')
        .addParameter('date', 'Date')
        .returns(timestampType)
        .addCodeBlock(
          CodeBlock.empty()
            .addStatement(secondsCodeLine)
            .addStatement('const nanos = (date.getTime() %% 1_000) * 1_000_000')
            .addStatement('return { seconds, nanos }')
        )
    )
    .addFunction(
      FunctionSpec.create('fromTimestamp')
        .addParameter('t', timestampType)
        .returns('Date')
        .addCodeBlock(
          CodeBlock.empty()
            .addStatement('let millis = %L * 1_000', toNumberCode)
            .addStatement('millis += t.nanos / 1_000_000')
            .addStatement('return new Date(millis)')
        )
    )
    .addFunction(
      FunctionSpec.create('fromJsonTimestamp')
        .addParameter('o', 'any')
        .returns('Date')
        .addCodeBlock(
          CodeBlock.empty()
            .beginControlFlow('if (o instanceof Date)')
            .addStatement('return o')
            .nextControlFlow('else if (typeof o === "string")')
            .addStatement('return new Date(o)')
            .nextControlFlow('else')
            .addStatement('return fromTimestamp(Timestamp.fromJSON(o))')
            .endControlFlow()
        )
    );
}

function generateEnum(fullName: string, enumDesc: EnumDescriptorProto, sourceInfo: SourceInfo): EnumSpec {
  let spec = EnumSpec.create(fullName).addModifiers(Modifier.EXPORT);
  maybeAddComment(sourceInfo, text => (spec = spec.addJavadoc(text)));

  let index = 0;
  for (const valueDesc of enumDesc.value) {
    const info = sourceInfo.lookup(Fields.enum.value, index++);
    maybeAddComment(info, text => (spec = spec.addJavadoc(`${valueDesc.name} - ${text}\n`)));
    spec = spec.addConstant(valueDesc.name, valueDesc.number.toString());
  }
  return spec;
}

function generateEnumFromJson(fullName: string, enumDesc: EnumDescriptorProto): FunctionSpec {
  let func = FunctionSpec.create('fromJSON')
    .addParameter('object', 'any')
    .addModifiers(Modifier.EXPORT)
    .returns(fullName);
  let body = CodeBlock.empty().beginControlFlow('switch (object)');
  for (const valueDesc of enumDesc.value) {
    body = body
      .add('case %L:\n', valueDesc.number)
      .add('case %S:%>\n', valueDesc.name)
      .addStatement('return %L.%L%<', fullName, valueDesc.name);
  }
  body = body
    .add('default:%>\n')
    .addStatement('throw new global.Error(`Invalid value ${object}`)%<')
    .endControlFlow();
  return func.addCodeBlock(body);
}

function generateEnumToJson(fullName: string, enumDesc: EnumDescriptorProto): FunctionSpec {
  let func = FunctionSpec.create('toJSON')
    .addParameter('object', fullName)
    .addModifiers(Modifier.EXPORT)
    .returns('string');
  let body = CodeBlock.empty().beginControlFlow('switch (object)');
  for (const valueDesc of enumDesc.value) {
    body = body.add('case %L.%L:%>\n', fullName, valueDesc.name).addStatement('return %S%<', valueDesc.name);
  }
  body = body
    .add('default:%>\n')
    .addStatement('return "UNKNOWN"%<')
    .endControlFlow();
  return func.addCodeBlock(body);
}

// Create the interface with properties
function generateInterfaceDeclaration(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  sourceInfo: SourceInfo,
  options: Options
) {
  let message = InterfaceSpec.create(fullName).addModifiers(Modifier.EXPORT);
  maybeAddComment(sourceInfo, text => (message = message.addJavadoc(text)));

  let index = 0;
  for (const fieldDesc of messageDesc.field) {
    let prop = PropertySpec.create(
      maybeSnakeToCamel(fieldDesc.name, options),
      toTypeName(typeMap, messageDesc, fieldDesc, options)
    );

    const info = sourceInfo.lookup(Fields.message.field, index++);
    maybeAddComment(info, text => (prop = prop.addJavadoc(text)));

    message = message.addProperty(prop);
  }
  return message;
}

function generateBaseInstance(fullName: string, messageDesc: DescriptorProto, options: Options) {
  // Create a 'base' instance with default values for decode to use as a prototype
  let baseMessage = PropertySpec.create('base' + fullName, TypeNames.anyType('object')).addModifiers(Modifier.CONST);
  let initialValue = CodeBlock.empty().beginHash();
  asSequence(messageDesc.field)
    .filterNot(isWithinOneOf)
    .forEach(field => {
      initialValue = initialValue.addHashEntry(
        maybeSnakeToCamel(field.name, options),
        defaultValue(field.type, options)
      );
    });
  return baseMessage.initializerBlock(initialValue.endHash());
}

type MessageVisitor = (
  fullName: string,
  desc: DescriptorProto,
  sourceInfo: SourceInfo,
  fullProtoTypeName: string
) => void;
type EnumVisitor = (
  fullName: string,
  desc: EnumDescriptorProto,
  sourceInfo: SourceInfo,
  fullProtoTypeName: string
) => void;
export function visit(
  proto: FileDescriptorProto | DescriptorProto,
  sourceInfo: SourceInfo,
  messageFn: MessageVisitor,
  options: Options,
  enumFn: EnumVisitor = () => {},
  tsPrefix: string = '',
  protoPrefix: string = ''
): void {
  const isRootFile = proto instanceof FileDescriptorProto;
  const childEnumType = isRootFile ? Fields.file.enum_type : Fields.message.enum_type;

  let index = 0;
  for (const enumDesc of proto.enumType) {
    // I.e. Foo_Bar.Zaz_Inner
    const protoFullName = protoPrefix + enumDesc.name;
    // I.e. FooBar_ZazInner
    const tsFullName = tsPrefix + maybeSnakeToCamel(enumDesc.name, options);
    const nestedSourceInfo = sourceInfo.open(childEnumType, index++);
    enumFn(tsFullName, enumDesc, nestedSourceInfo, protoFullName);
  }

  const messages = proto instanceof FileDescriptorProto ? proto.messageType : proto.nestedType;
  const childType = isRootFile ? Fields.file.message_type : Fields.message.nested_type;

  index = 0;
  for (const message of messages) {
    // I.e. Foo_Bar.Zaz_Inner
    const protoFullName = protoPrefix + message.name;
    // I.e. FooBar_ZazInner
    const tsFullName = tsPrefix + maybeSnakeToCamel(message.name, options);
    const nestedSourceInfo = sourceInfo.open(childType, index++);
    messageFn(tsFullName, message, nestedSourceInfo, protoFullName);
    visit(message, nestedSourceInfo, messageFn, options, enumFn, tsFullName + '_', protoFullName + '.');
  }
}

function visitServices(
  proto: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceFn: (desc: ServiceDescriptorProto, sourceInfo: SourceInfo) => void
): void {
  let index = 0;
  for (const serviceDesc of proto.service) {
    const nestedSourceInfo = sourceInfo.open(Fields.file.service, index++);
    serviceFn(serviceDesc, nestedSourceInfo);
  }
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  options: Options
): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('decode')
    .addParameter('reader', 'Reader@protobufjs/minimal')
    .addParameter('length?', 'number')
    .returns(fullName);

  // add the initial end/message
  func = func
    .addStatement('let end = length === undefined ? reader.len : reader.pos + length')
    .addStatement('const message = Object.create(base%L) as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach(field => {
    const value = isMapType(typeMap, messageDesc, field, options) ? '{}' : '[]';
    func = func.addStatement('message.%L = %L', maybeSnakeToCamel(field.name, options), value);
  });

  // start the tag loop
  func = func
    .beginControlFlow('while (reader.pos < end)')
    .addStatement('const tag = reader.uint32()')
    .beginControlFlow('switch (tag >>> 3)');

  // add a case for each incoming field
  messageDesc.field.forEach(field => {
    const fieldName = maybeSnakeToCamel(field.name, options);
    func = func.addCode('case %L:%>\n', field.number);

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    let readSnippet: CodeBlock;
    if (isPrimitive(field)) {
      readSnippet = CodeBlock.of('reader.%L()', toReaderCall(field));
      if (basicLongWireType(field.type) !== undefined) {
        if (options.forceLong) {
          readSnippet = CodeBlock.of('%L as Long', readSnippet);
        } else if (options.forceLongString) {
          readSnippet = CodeBlock.of('longToString(%L as Long)', readSnippet);
        } else {
          readSnippet = CodeBlock.of('longToNumber(%L as Long)', readSnippet);
        }
      }
    } else if (isValueType(field)) {
      readSnippet = CodeBlock.of(
        '%T.decode(reader, reader.uint32()).value',
        basicTypeName(typeMap, field, options, true)
      );
    } else if (isTimestamp(field)) {
      readSnippet = CodeBlock.of(
        'fromTimestamp(%T.decode(reader, reader.uint32()))',
        basicTypeName(typeMap, field, options, true)
      );
    } else if (isMessage(field)) {
      readSnippet = CodeBlock.of('%T.decode(reader, reader.uint32())', basicTypeName(typeMap, field, options));
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    // and then use the snippet to handle repeated fields if necessary
    if (isRepeated(field)) {
      if (isMapType(typeMap, messageDesc, field, options)) {
        // We need a unique const within the `cast` statement
        const entryVariableName = `entry${field.number}`;
        func = func
          .addStatement(`const %L = %L`, entryVariableName, readSnippet)
          .beginControlFlow('if (%L.value)', entryVariableName)
          .addStatement('message.%L[%L.key] = %L.value', fieldName, entryVariableName, entryVariableName)
          .endControlFlow();
      } else if (packedType(field.type) === undefined) {
        func = func.addStatement(`message.%L.push(%L)`, fieldName, readSnippet);
      } else {
        func = func
          .beginControlFlow('if ((tag & 7) === 2)')
          .addStatement('const end2 = reader.uint32() + reader.pos')
          .beginControlFlow('while (reader.pos < end2)')
          .addStatement(`message.%L.push(%L)`, fieldName, readSnippet)
          .endControlFlow()
          .nextControlFlow('else')
          .addStatement(`message.%L.push(%L)`, fieldName, readSnippet)
          .endControlFlow();
      }
    } else {
      func = func.addStatement(`message.%L = %L`, fieldName, readSnippet);
    }
    func = func.addStatement('break%<');
  });
  func = func
    .addCode('default:%>\n')
    .addStatement('reader.skipType(tag & 7)')
    .addStatement('break%<');
  // and then wrap up the switch/while/return
  func = func
    .endControlFlow()
    .endControlFlow()
    .addStatement('return message');
  return func;
}

/** Creates a function to encode a message by loop overing the tags. */
function generateEncode(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  options: Options
): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('encode')
    .addParameter('message', fullName)
    .addParameter('writer', 'Writer@protobufjs/minimal', { defaultValueField: CodeBlock.of('Writer.create()') })
    .returns('Writer@protobufjs/minimal');
  // then add a case for each field
  messageDesc.field.forEach(field => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    // get a generic writer.doSomething based on the basic type
    let writeSnippet: (place: string) => CodeBlock;
    if (isPrimitive(field)) {
      const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
      writeSnippet = place => CodeBlock.of('writer.uint32(%L).%L(%L)', tag, toReaderCall(field), place);
    } else if (isTimestamp(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      writeSnippet = place =>
        CodeBlock.of(
          '%T.encode(toTimestamp(%L), writer.uint32(%L).fork()).ldelim()',
          basicTypeName(typeMap, field, options, true),
          place,
          tag
        );
    } else if (isValueType(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      writeSnippet = place =>
        CodeBlock.of(
          '%T.encode({ value: %L! }, writer.uint32(%L).fork()).ldelim()',
          basicTypeName(typeMap, field, options, true),
          place,
          tag
        );
    } else if (isMessage(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      writeSnippet = place =>
        CodeBlock.of(
          '%T.encode(%L, writer.uint32(%L).fork()).ldelim()',
          basicTypeName(typeMap, field, options),
          place,
          tag
        );
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    if (isRepeated(field)) {
      if (isMapType(typeMap, messageDesc, field, options)) {
        func = func
          .beginLambda('Object.entries(message.%L).forEach(([key, value]) =>', fieldName)
          .addStatement('%L', writeSnippet('{ key: key as any, value }'))
          .endLambda(')');
      } else if (packedType(field.type) === undefined) {
        func = func
          .beginControlFlow('for (const v of message.%L)', fieldName)
          .addStatement('%L', writeSnippet('v!'))
          .endControlFlow();
      } else {
        const tag = ((field.number << 3) | 2) >>> 0;
        func = func
          .addStatement('writer.uint32(%L).fork()', tag)
          .beginControlFlow('for (const v of message.%L)', fieldName)
          .addStatement('writer.%L(v)', toReaderCall(field))
          .endControlFlow()
          .addStatement('writer.ldelim()');
      }
    } else if (isWithinOneOf(field) || isMessage(field)) {
      func = func
        .beginControlFlow(
          'if (message.%L !== undefined && message.%L !== %L)',
          fieldName,
          fieldName,
          defaultValue(field.type, options)
        )
        .addStatement('%L', writeSnippet(`message.${fieldName}`))
        .endControlFlow();
    } else {
      func = func.addStatement('%L', writeSnippet(`message.${fieldName}`));
    }
  });
  return func.addStatement('return writer');
}

/**
 * Creates a function to decode a message from JSON.
 *
 * This is very similar to decode, we loop through looking for properties, with
 * a few special cases for https://developers.google.com/protocol-buffers/docs/proto3#json.
 * */
function generateFromJson(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  options: Options
): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('fromJSON')
    .addParameter('object', 'any')
    .returns(fullName);

  // create the message
  func = func.addStatement('const message = Object.create(base%L) as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach(field => {
    const value = isMapType(typeMap, messageDesc, field, options) ? '{}' : '[]';
    func = func.addStatement('message.%L = %L', maybeSnakeToCamel(field.name, options), value);
  });

  // add a check for each incoming field
  messageDesc.field.forEach(field => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    const readSnippet = (from: string): CodeBlock => {
      if (isEnum(field)) {
        return CodeBlock.of('%T.fromJSON(%L)', basicTypeName(typeMap, field, options), from);
      } else if (isPrimitive(field)) {
        // Convert primitives using the String(value)/Number(value) cstr, except for bytes
        if (isBytes(field)) {
          return CodeBlock.of('%L', from);
        } else if (isLong(field) && options.forceLong) {
          const cstr = capitalize(basicTypeName(typeMap, field, options, true).toString());
          return CodeBlock.of('%L.fromString(%L)', cstr, from);
        } else {
          const cstr = capitalize(basicTypeName(typeMap, field, options, true).toString());
          return CodeBlock.of('%L(%L)', cstr, from);
        }
        // if (basicLongWireType(field.type) !== undefined) {
        //   readSnippet = CodeBlock.of('longToNumber(%L as Long)', readSnippet);
        // }
      } else if (isTimestamp(field)) {
        return CodeBlock.of('fromJsonTimestamp(%L)', from);
      } else if (isValueType(field)) {
        const cstr = capitalize((basicTypeName(typeMap, field, options, false) as Union).typeChoices[0].toString());
        return CodeBlock.of('%L(%L)', cstr, from);
      } else if (isMessage(field)) {
        if (isRepeated(field) && isMapType(typeMap, messageDesc, field, options)) {
          const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
          if (isPrimitive(valueType)) {
            const cstr = capitalize(
              basicTypeName(typeMap, FieldDescriptorProto.create({ type: valueType.type }), options).toString()
            );
            return CodeBlock.of('%L(%L)', cstr, from);
          } else {
            return CodeBlock.of('%T.fromJSON(%L)', basicTypeName(typeMap, valueType, options).toString(), from);
          }
        } else {
          return CodeBlock.of('%T.fromJSON(%L)', basicTypeName(typeMap, field, options), from);
        }
      } else {
        throw new Error(`Unhandled field ${field}`);
      }
    };

    // and then use the snippet to handle repeated fields if necessary
    func = func.beginControlFlow('if (object.%L !== undefined && object.%L !== null)', fieldName, fieldName);
    if (isRepeated(field)) {
      if (isMapType(typeMap, messageDesc, field, options)) {
        func = func
          .beginLambda('Object.entries(object.%L).forEach(([key, value]) =>', fieldName)
          .addStatement(
            `message.%L[%L] = %L`,
            fieldName,
            maybeCastToNumber(typeMap, messageDesc, field, 'key', options),
            readSnippet('value')
          )
          .endLambda(')');
      } else {
        func = func
          .beginControlFlow('for (const e of object.%L)', fieldName)
          .addStatement(`message.%L.push(%L)`, fieldName, readSnippet('e'))
          .endControlFlow();
      }
    } else {
      func = func.addStatement(`message.%L = %L`, fieldName, readSnippet(`object.${fieldName}`));
    }

    // set the default value (TODO Support bytes)
    if (!isRepeated(field) && field.type !== FieldDescriptorProto.Type.TYPE_BYTES) {
      func = func.nextControlFlow('else');
      func = func.addStatement(
        `message.%L = %L`,
        fieldName,
        isWithinOneOf(field) ? 'undefined' : defaultValue(field.type, options)
      );
    }

    func = func.endControlFlow();
  });
  // and then wrap up the switch/while/return
  func = func.addStatement('return message');
  return func;
}

function generateToJson(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  options: Options
): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('toJSON')
    .addParameter('message', fullName)
    .returns('unknown');
  func = func.addCodeBlock(CodeBlock.empty().addStatement('const obj: any = {}'));
  // then add a case for each field
  messageDesc.field.forEach(field => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    const readSnippet = (from: string): CodeBlock => {
      if (isEnum(field)) {
        return CodeBlock.of('%T.toJSON(%L)', basicTypeName(typeMap, field, options), from);
      } else if (isTimestamp(field)) {
        return CodeBlock.of('%L !== undefined ? %L.toISOString() : null', from, from);
      } else if (isMessage(field) && !isValueType(field) && !isMapType(typeMap, messageDesc, field, options)) {
        return CodeBlock.of(
          '%L ? %T.toJSON(%L) : %L',
          from,
          basicTypeName(typeMap, field, options, true),
          from,
          defaultValue(field.type, options)
        );
      } else {
        if (isLong(field) && options.forceLong) {
          return CodeBlock.of(
            '(%L || %L).toString()',
            from,
            isWithinOneOf(field) ? 'undefined' : defaultValue(field.type, options)
          );
        } else {
          return CodeBlock.of('%L || %L', from, isWithinOneOf(field) ? 'undefined' : defaultValue(field.type, options));
        }
      }
    };

    if (isRepeated(field) && !isMapType(typeMap, messageDesc, field, options)) {
      func = func
        .beginControlFlow('if (message.%L)', fieldName)
        .addStatement('obj.%L = message.%L.map(e => %L)', fieldName, fieldName, readSnippet('e'))
        .nextControlFlow('else')
        .addStatement('obj.%L = []', fieldName)
        .endControlFlow();
    } else {
      func = func.addStatement('obj.%L = %L', fieldName, readSnippet(`message.${fieldName}`));
    }
  });
  return func.addStatement('return obj');
}

function generateFromPartial(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  options: Options
): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('fromPartial')
    .addParameter('object', `DeepPartial<${fullName}>`)
    .returns(fullName);

  // create the message
  func = func.addStatement('const message = Object.create(base%L) as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach(field => {
    const value = isMapType(typeMap, messageDesc, field, options) ? '{}' : '[]';
    func = func.addStatement('message.%L = %L', maybeSnakeToCamel(field.name, options), value);
  });

  // add a check for each incoming field
  messageDesc.field.forEach(field => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    const readSnippet = (from: string): CodeBlock => {
      if (isEnum(field) || isPrimitive(field) || isTimestamp(field) || isValueType(field)) {
        return CodeBlock.of(from);
      } else if (isMessage(field)) {
        if (isRepeated(field) && isMapType(typeMap, messageDesc, field, options)) {
          const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
          if (isPrimitive(valueType)) {
            const cstr = capitalize(
              basicTypeName(typeMap, FieldDescriptorProto.create({ type: valueType.type }), options).toString()
            );
            return CodeBlock.of('%L(%L)', cstr, from);
          } else {
            return CodeBlock.of('%T.fromPartial(%L)', basicTypeName(typeMap, valueType, options).toString(), from);
          }
        } else {
          return CodeBlock.of('%T.fromPartial(%L)', basicTypeName(typeMap, field, options), from);
        }
      } else {
        throw new Error(`Unhandled field ${field}`);
      }
    };

    // and then use the snippet to handle repeated fields if necessary
    func = func.beginControlFlow('if (object.%L !== undefined && object.%L !== null)', fieldName, fieldName);
    if (isRepeated(field)) {
      if (isMapType(typeMap, messageDesc, field, options)) {
        func = func
          .beginLambda('Object.entries(object.%L).forEach(([key, value]) =>', fieldName)
          .beginControlFlow('if (value)')
          .addStatement(
            `message.%L[%L] = %L`,
            fieldName,
            maybeCastToNumber(typeMap, messageDesc, field, 'key', options),
            readSnippet('value')
          )
          .endControlFlow()
          .endLambda(')');
      } else {
        func = func
          .beginControlFlow('for (const e of object.%L)', fieldName)
          .addStatement(`message.%L.push(%L)`, fieldName, readSnippet('e'))
          .endControlFlow();
      }
    } else {
      if (isLong(field) && options.forceLong) {
        func = func.addStatement(
          `message.%L = %L as %L`,
          fieldName,
          readSnippet(`object.${fieldName}`),
          basicTypeName(typeMap, field, options)
        );
      } else {
        func = func.addStatement(`message.%L = %L`, fieldName, readSnippet(`object.${fieldName}`));
      }
    }

    // set the default value (TODO Support bytes)
    if (!isRepeated(field) && field.type !== FieldDescriptorProto.Type.TYPE_BYTES) {
      func = func.nextControlFlow('else');
      func = func.addStatement(
        `message.%L = %L`,
        fieldName,
        isWithinOneOf(field) ? 'undefined' : defaultValue(field.type, options)
      );
    }

    func = func.endControlFlow();
  });

  // and then wrap up the switch/while/return
  return func.addStatement('return message');
}

const contextTypeVar = TypeNames.typeVariable('Context', TypeNames.bound('DataLoaders'));

function generateService(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): InterfaceSpec {
  let service = InterfaceSpec.create(serviceDesc.name).addModifiers(Modifier.EXPORT);
  if (options.useContext) {
    service = service.addTypeVariable(contextTypeVar);
  }
  maybeAddComment(sourceInfo, text => (service = service.addJavadoc(text)));

  let index = 0;
  for (const methodDesc of serviceDesc.method) {
    let requestFn = FunctionSpec.create(methodDesc.name);
    if (options.useContext) {
      requestFn = requestFn.addParameter('ctx', TypeNames.typeVariable('Context'));
    }
    const info = sourceInfo.lookup(Fields.service.method, index++);
    maybeAddComment(info, text => (requestFn = requestFn.addJavadoc(text)));

    requestFn = requestFn.addParameter('request', requestType(typeMap, methodDesc));
    requestFn = requestFn.returns(responsePromise(typeMap, methodDesc));
    service = service.addFunction(requestFn);

    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
        let batchFn = FunctionSpec.create(name);
        if (options.useContext) {
          batchFn = batchFn.addParameter('ctx', TypeNames.typeVariable('Context'));
        }
        batchFn = batchFn.addParameter(singular(batchMethod.inputFieldName), batchMethod.inputType);
        batchFn = batchFn.returns(TypeNames.PROMISE.param(batchMethod.outputType));
        service = service.addFunction(batchFn);
      }
    }
  }
  return service;
}

interface BatchMethod {
  methodDesc: MethodDescriptorProto;
  // a ${package + service + method name} key to identify this method in caches
  uniqueIdentifier: string;
  singleMethodName: string;
  inputFieldName: string;
  inputType: TypeName;
  outputFieldName: string;
  outputType: TypeName;
  mapType: boolean;
}

function hasSingleRepeatedField(messageDesc: DescriptorProto): boolean {
  return messageDesc.field.length == 1 && messageDesc.field[0].label === FieldDescriptorProto.Label.LABEL_REPEATED;
}

function generateRegularRpcMethod(
  options: Options,
  typeMap: TypeMap,
  fileDesc: google.protobuf.FileDescriptorProto,
  serviceDesc: google.protobuf.ServiceDescriptorProto,
  methodDesc: google.protobuf.MethodDescriptorProto
) {
  let requestFn = FunctionSpec.create(methodDesc.name);
  if (options.useContext) {
    requestFn = requestFn.addParameter('ctx', TypeNames.typeVariable('Context'));
  }
  return requestFn
    .addParameter('request', requestType(typeMap, methodDesc))
    .addStatement('const data = %L.encode(request).finish()', requestType(typeMap, methodDesc))
    .addStatement(
      'const promise = this.rpc.request(%L"%L.%L", %S, %L)',
      options.useContext ? 'ctx, ' : '', // sneak ctx in as the 1st parameter to our rpc call
      fileDesc.package,
      serviceDesc.name,
      methodDesc.name,
      'data'
    )
    .addStatement(
      'return promise.then(data => %L.decode(new %T(data)))',
      responseType(typeMap, methodDesc),
      'Reader@protobufjs/minimal'
    )
    .returns(responsePromise(typeMap, methodDesc));
}

function generateServiceClientImpl(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  options: Options
): ClassSpec {
  // Define the FooServiceImpl class
  let client = ClassSpec.create(`${serviceDesc.name}ClientImpl`).addModifiers(Modifier.EXPORT);
  if (options.useContext) {
    client = client.addTypeVariable(contextTypeVar);
    client = client.addInterface(`${serviceDesc.name}<Context>`);
  } else {
    client = client.addInterface(serviceDesc.name);
  }

  // Create the constructor(rpc: Rpc)
  const rpcType = options.useContext ? 'Rpc<Context>' : 'Rpc';
  client = client.addFunction(
    FunctionSpec.createConstructor()
      .addParameter('rpc', rpcType)
      .addStatement('this.rpc = rpc')
  );
  client = client.addProperty('rpc', rpcType, { modifiers: [Modifier.PRIVATE, Modifier.READONLY] });

  // Create a method for each FooService method
  for (const methodDesc of serviceDesc.method) {
    // See if this this fuzzy matches to a batchable method
    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc, options);
      if (batchMethod) {
        client = client.addFunction(generateBatchingRpcMethod(typeMap, batchMethod));
      }
    }

    if (options.useContext && methodDesc.name.match(/^Get[A-Z]/)) {
      client = client.addFunction(generateCachingRpcMethod(options, typeMap, fileDesc, serviceDesc, methodDesc));
    } else {
      client = client.addFunction(generateRegularRpcMethod(options, typeMap, fileDesc, serviceDesc, methodDesc));
    }
  }
  return client;
}

function detectBatchMethod(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto,
  options: Options
): BatchMethod | undefined {
  const nameMatches = methodDesc.name.startsWith('Batch');
  const inputType = typeMap.get(methodDesc.inputType);
  const outputType = typeMap.get(methodDesc.outputType);
  if (nameMatches && inputType && outputType) {
    // TODO: This might be enums?
    const inputTypeDesc = inputType[2] as DescriptorProto;
    const outputTypeDesc = outputType[2] as DescriptorProto;
    if (hasSingleRepeatedField(inputTypeDesc) && hasSingleRepeatedField(outputTypeDesc)) {
      const singleMethodName = methodDesc.name.replace('Batch', 'Get');
      const inputFieldName = inputTypeDesc.field[0].name;
      const inputType = basicTypeName(typeMap, inputTypeDesc.field[0], options); // e.g. repeated string -> string
      const outputFieldName = outputTypeDesc.field[0].name;
      let outputType = basicTypeName(typeMap, outputTypeDesc.field[0], options); // e.g. repeated Entity -> Entity
      const mapType = detectMapType(typeMap, outputTypeDesc, outputTypeDesc.field[0], options);
      if (mapType) {
        outputType = mapType.valueType;
      }
      const uniqueIdentifier = `${fileDesc.package}.${serviceDesc.name}.${methodDesc.name}`;
      return {
        methodDesc,
        uniqueIdentifier,
        singleMethodName,
        inputFieldName,
        inputType,
        outputFieldName,
        outputType,
        mapType: !!mapType
      };
    }
  }
  return undefined;
}

/** We've found a BatchXxx method, create a synthetic GetXxx method that calls it. */
function generateBatchingRpcMethod(typeMap: TypeMap, batchMethod: BatchMethod): FunctionSpec {
  const {
    methodDesc,
    singleMethodName,
    inputFieldName,
    inputType,
    outputFieldName,
    outputType,
    mapType,
    uniqueIdentifier
  } = batchMethod;
  // Create the `(keys) => ...` lambda we'll pass to the DataLoader constructor
  let lambda = CodeBlock.lambda(inputFieldName) // e.g. keys
    .addStatement('const request = { %L }', inputFieldName);
  if (mapType) {
    // If the return type is a map, lookup each key in the result
    lambda = lambda
      .beginLambda('return this.%L(ctx, request).then(res =>', methodDesc.name)
      .addStatement('return %L.map(key => res.%L[key])', inputFieldName, outputFieldName)
      .endLambda(')');
  } else {
    // Otherwise assume they come back in order
    lambda = lambda.addStatement('return this.%L(ctx, request).then(res => res.%L)', methodDesc.name, outputFieldName);
  }
  return FunctionSpec.create(singleMethodName)
    .addParameter('ctx', 'Context')
    .addParameter(singular(inputFieldName), inputType)
    .addCode('const dl = ctx.getDataLoader(%S, () => {%>\n', uniqueIdentifier)
    .addCode(
      'return new %T<%T, %T>(%L, { cacheKeyFn: %T });\n',
      dataloader,
      inputType,
      outputType,
      lambda,
      TypeNames.anyType('hash*object-hash')
    )
    .addCode('%<});\n')
    .addStatement('return dl.load(%L)', singular(inputFieldName))
    .returns(TypeNames.PROMISE.param(outputType));
}

/** We're not going to batch, but use DataLoader for per-request caching. */
function generateCachingRpcMethod(
  options: Options,
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): FunctionSpec {
  const inputType = requestType(typeMap, methodDesc);
  const outputType = responseType(typeMap, methodDesc);
  let lambda = CodeBlock.lambda('requests')
    .beginLambda('const responses = requests.map(async request =>')
    .addStatement('const data = %L.encode(request).finish()', inputType)
    .addStatement(
      'const response = await this.rpc.request(ctx, "%L.%L", %S, %L)',
      fileDesc.package,
      serviceDesc.name,
      methodDesc.name,
      'data'
    )
    .addStatement('return %L.decode(new %T(response))', responseType(typeMap, methodDesc), 'Reader@protobufjs/minimal')
    .endLambda(')')
    .addStatement('return Promise.all(responses)');
  const uniqueIdentifier = `${fileDesc.package}.${serviceDesc.name}.${methodDesc.name}`;
  return FunctionSpec.create(methodDesc.name)
    .addParameter('ctx', 'Context')
    .addParameter('request', requestType(typeMap, methodDesc))
    .addCode('const dl = ctx.getDataLoader(%S, () => {%>\n', uniqueIdentifier)
    .addCode(
      'return new %T<%T, %T>(%L, { cacheKeyFn: %T });\n',
      dataloader,
      inputType,
      outputType,
      lambda,
      TypeNames.anyType('hash*object-hash')
    )
    .addCode('%<});\n')
    .addStatement('return dl.load(request)')
    .returns(TypeNames.PROMISE.param(outputType));
}

/**
 * Creates an `Rpc.request(service, method, data)` abstraction.
 *
 * This lets clients pass in their own request-promise-ish client.
 *
 * We don't export this because if a project uses multiple `*.proto` files,
 * we don't want our the barrel imports in `index.ts` to have multiple `Rpc`
 * types.
 */
function generateRpcType(options: Options): InterfaceSpec {
  const data = TypeNames.anyType('Uint8Array');
  let fn = FunctionSpec.create('request');
  if (options.useContext) {
    fn = fn.addParameter('ctx', 'Context');
  }
  fn = fn
    .addParameter('service', TypeNames.STRING)
    .addParameter('method', TypeNames.STRING)
    .addParameter('data', data)
    .returns(TypeNames.PROMISE.param(data));
  let rpc = InterfaceSpec.create('Rpc');
  if (options.useContext) {
    rpc = rpc.addTypeVariable(TypeNames.typeVariable('Context'));
  }
  rpc = rpc.addFunction(fn);
  return rpc;
}

function generateDataLoadersType(options: Options): InterfaceSpec {
  // TODO Maybe should be a generic `Context.get<T>(id, () => T): T` method
  let fn = FunctionSpec.create('getDataLoader')
    .addTypeVariable(TypeNames.typeVariable('T'))
    .addParameter('identifier', TypeNames.STRING)
    .addParameter('constructorFn', TypeNames.lambda2([], TypeNames.typeVariable('T')))
    .returns(TypeNames.typeVariable('T'));
  return InterfaceSpec.create('DataLoaders')
    .addModifiers(Modifier.EXPORT)
    .addFunction(fn);
}

function requestType(typeMap: TypeMap, methodDesc: MethodDescriptorProto): TypeName {
  return messageToTypeName(typeMap, methodDesc.inputType);
}

function responseType(typeMap: TypeMap, methodDesc: MethodDescriptorProto): TypeName {
  return messageToTypeName(typeMap, methodDesc.outputType);
}

function responsePromise(typeMap: TypeMap, methodDesc: MethodDescriptorProto): TypeName {
  return TypeNames.PROMISE.param(responseType(typeMap, methodDesc));
}

// function generateOneOfProperty(typeMap: TypeMap, name: string, fields: FieldDescriptorProto[]): PropertySpec {
//   const adtType = TypeNames.unionType(
//     ...fields.map(f => {
//       const kind = new Member('field', TypeNames.anyType(`'${f.name}'`), false);
//       const value = new Member('value', toTypeName(typeMap, f), false);
//       return TypeNames.anonymousType(kind, value);
//     })
//   );
//   return PropertySpec.create(snakeToCamel(name), adtType);
// }

function maybeSnakeToCamel(s: string, options: Options): string {
  if (options.snakeToCamel) {
    return s.replace(/(\_\w)/g, m => m[1].toUpperCase());
  } else {
    return s;
  }
}

function capitalize(s: string): string {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}

function maybeCastToNumber(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  variableName: string,
  options: Options
): string {
  const { keyType } = detectMapType(typeMap, messageDesc, field, options)!;
  if (keyType === TypeNames.STRING) {
    return variableName;
  } else {
    return `Number(${variableName})`;
  }
}
