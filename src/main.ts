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
  TypeVariable,
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
  TypeMap
} from './types';
import { asSequence } from 'sequency';
import { lowerFirst, singular } from './utils';
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;
import MethodDescriptorProto = google.protobuf.MethodDescriptorProto;

const dataloader = TypeNames.anyType('DataLoader=dataloader');

export type Options = {
  useContext: boolean;
};

export function generateFile(typeMap: TypeMap, fileDesc: FileDescriptorProto, parameter?: string): FileSpec {
  const options: Options = { useContext: false };
  if (parameter && parameter.includes('context=true')) {
    options.useContext = true;
  }

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

  // first make all the type declarations
  visit(
    fileDesc,
    (fullName, message) => {
      file = file.addInterface(generateInterfaceDeclaration(typeMap, fullName, message));
    },
    (fullName, enumDesc) => {
      file = file.addEnum(generateEnum(fullName, enumDesc));
    }
  );

  // then add the encoder/decoder/base instance
  visit(
    fileDesc,
    (fullName, message) => {
      file = file.addProperty(generateBaseInstance(fullName, message));
      let staticMethods = CodeBlock.empty()
        .add('export const %L = ', fullName)
        .beginHash()
        .addHashEntry(generateEncode(typeMap, fullName, message))
        .addHashEntry(generateDecode(typeMap, fullName, message))
        .addHashEntry(generateFromJson(typeMap, fullName, message))
        .addHashEntry(generateFromPartial(typeMap, fullName, message))
        .addHashEntry(generateToJson(typeMap, fullName, message))
        .endHash()
        .add(';')
        .newLine();
      file = file.addCode(staticMethods);
    },
    (fullName, enumDesc) => {
      let staticMethods = CodeBlock.empty()
        .beginControlFlow('export namespace %L', fullName)
        .addFunction(generateEnumFromJson(fullName, enumDesc))
        .addFunction(generateEnumToJson(fullName, enumDesc))
        .endControlFlow();
      file = file.addCode(staticMethods);
    }
  );

  visitServices(fileDesc, serviceDesc => {
    file = file.addInterface(generateService(typeMap, fileDesc, serviceDesc, options));
    file = file.addClass(generateServiceClientImpl(typeMap, fileDesc, serviceDesc, options));
  });

  if (fileDesc.service.length > 0) {
    file = file.addInterface(generateRpcType(options));
    if (options.useContext) {
      file = file.addInterface(generateDataLoadersType(options));
    }
  }

  file = addLongUtilityMethod(file);
  file = addDeepPartialType(file);

  let hasAnyTimestamps = false;
  visit(fileDesc, (_, messageType) => {
    hasAnyTimestamps = hasAnyTimestamps || asSequence(messageType.field).any(isTimestamp);
  });
  if (hasAnyTimestamps) {
    file = addTimestampMethods(file);
  }

  return file;
}

function addLongUtilityMethod(file: FileSpec): FileSpec {
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

function addTimestampMethods(file: FileSpec): FileSpec {
  const timestampType = 'Timestamp@./google/protobuf/timestamp';
  return file
    .addFunction(
      FunctionSpec.create('toTimestamp')
        .addParameter('date', 'Date')
        .returns(timestampType)
        .addCodeBlock(
          CodeBlock.empty()
            .addStatement('const seconds = date.getTime() / 1_000')
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
            .addStatement('let millis = t.seconds * 1_000')
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

function generateEnum(fullName: string, enumDesc: EnumDescriptorProto): EnumSpec {
  let spec = EnumSpec.create(fullName).addModifiers(Modifier.EXPORT);
  for (const valueDesc of enumDesc.value) {
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
function generateInterfaceDeclaration(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto) {
  let message = InterfaceSpec.create(fullName).addModifiers(Modifier.EXPORT);
  for (const fieldDesc of messageDesc.field) {
    message = message.addProperty(
      PropertySpec.create(snakeToCamel(fieldDesc.name), toTypeName(typeMap, messageDesc, fieldDesc))
    );
  }
  return message;
}

function generateBaseInstance(fullName: string, messageDesc: DescriptorProto) {
  // Create a 'base' instance with default values for decode to use as a prototype
  let baseMessage = PropertySpec.create('base' + fullName, TypeNames.anyType('object')).addModifiers(Modifier.CONST);
  let initialValue = CodeBlock.empty().beginHash();
  asSequence(messageDesc.field)
    .filterNot(isWithinOneOf)
    .forEach(field => {
      initialValue = initialValue.addHashEntry(snakeToCamel(field.name), defaultValue(field.type));
    });
  return baseMessage.initializerBlock(initialValue.endHash());
}

type MessageVisitor = (fullName: string, desc: DescriptorProto) => void;
type EnumVisitor = (fullName: string, desc: EnumDescriptorProto) => void;
export function visit(
  proto: FileDescriptorProto | DescriptorProto,
  messageFn: MessageVisitor,
  enumFn: EnumVisitor = () => {},
  prefix: string = ''
): void {
  for (const enumDesc of proto.enumType) {
    const fullName = prefix + snakeToCamel(enumDesc.name);
    enumFn(fullName, enumDesc);
  }
  const messages = proto instanceof FileDescriptorProto ? proto.messageType : proto.nestedType;
  for (const message of messages) {
    const fullName = prefix + snakeToCamel(message.name);
    messageFn(fullName, message);
    visit(message, messageFn, enumFn, fullName + '_');
  }
}

function visitServices(proto: FileDescriptorProto, serviceFn: (desc: ServiceDescriptorProto) => void): void {
  for (const serviceDesc of proto.service) {
    serviceFn(serviceDesc);
  }
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto): FunctionSpec {
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
    const value = isMapType(typeMap, messageDesc, field) ? '{}' : '[]';
    func = func.addStatement('message.%L = %L', snakeToCamel(field.name), value);
  });

  // start the tag loop
  func = func
    .beginControlFlow('while (reader.pos < end)')
    .addStatement('const tag = reader.uint32()')
    .beginControlFlow('switch (tag >>> 3)');

  // add a case for each incoming field
  messageDesc.field.forEach(field => {
    const fieldName = snakeToCamel(field.name);
    func = func.addCode('case %L:%>\n', field.number);

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    let readSnippet: CodeBlock;
    if (isPrimitive(field)) {
      readSnippet = CodeBlock.of('reader.%L()', toReaderCall(field));
      if (basicLongWireType(field.type) !== undefined) {
        readSnippet = CodeBlock.of('longToNumber(%L as Long)', readSnippet);
      }
    } else if (isValueType(field)) {
      readSnippet = CodeBlock.of('%T.decode(reader, reader.uint32()).value', basicTypeName(typeMap, field, true));
    } else if (isTimestamp(field)) {
      readSnippet = CodeBlock.of(
        'fromTimestamp(%T.decode(reader, reader.uint32()))',
        basicTypeName(typeMap, field, true)
      );
    } else if (isMessage(field)) {
      readSnippet = CodeBlock.of('%T.decode(reader, reader.uint32())', basicTypeName(typeMap, field));
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    // and then use the snippet to handle repeated fields if necessary
    if (isRepeated(field)) {
      if (isMapType(typeMap, messageDesc, field)) {
        func = func
          .addStatement(`const entry = %L`, readSnippet)
          .beginControlFlow('if (entry.value)')
          .addStatement('message.%L[entry.key] = entry.value', fieldName)
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
function generateEncode(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('encode')
    .addParameter('message', fullName)
    .addParameter('writer', 'Writer@protobufjs/minimal', { defaultValueField: CodeBlock.of('Writer.create()') })
    .returns('Writer@protobufjs/minimal');
  // then add a case for each field
  messageDesc.field.forEach(field => {
    const fieldName = snakeToCamel(field.name);

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
          basicTypeName(typeMap, field, true),
          place,
          tag
        );
    } else if (isValueType(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      writeSnippet = place =>
        CodeBlock.of(
          '%T.encode({ value: %L! }, writer.uint32(%L).fork()).ldelim()',
          basicTypeName(typeMap, field, true),
          place,
          tag
        );
    } else if (isMessage(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      writeSnippet = place =>
        CodeBlock.of('%T.encode(%L, writer.uint32(%L).fork()).ldelim()', basicTypeName(typeMap, field), place, tag);
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    if (isRepeated(field)) {
      if (isMapType(typeMap, messageDesc, field)) {
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
          defaultValue(field.type)
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
function generateFromJson(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('fromJSON')
    .addParameter('object', 'any')
    .returns(fullName);

  // add the message
  func = func.addStatement('const message = Object.create(base%L) as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach(field => {
    const value = isMapType(typeMap, messageDesc, field) ? '{}' : '[]';
    func = func.addStatement('message.%L = %L', snakeToCamel(field.name), value);
  });

  // add a check for each incoming field
  messageDesc.field.forEach(field => {
    const fieldName = snakeToCamel(field.name);

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    const readSnippet = (from: string): CodeBlock => {
      if (isEnum(field)) {
        return CodeBlock.of('%T.fromJSON(%L)', basicTypeName(typeMap, field), from);
      } else if (isPrimitive(field)) {
        // Convert primitives using the String(value)/Number(value) cstr, except for bytes
        if (isBytes(field)) {
          return CodeBlock.of('%L', from);
        } else {
          const cstr = capitalize(basicTypeName(typeMap, field, true).toString());
          return CodeBlock.of('%L(%L)', cstr, from);
        }
        // if (basicLongWireType(field.type) !== undefined) {
        //   readSnippet = CodeBlock.of('longToNumber(%L as Long)', readSnippet);
        // }
      } else if (isTimestamp(field)) {
        return CodeBlock.of('fromJsonTimestamp(%L)', from);
      } else if (isValueType(field)) {
        const cstr = capitalize((basicTypeName(typeMap, field, false) as Union).typeChoices[0].toString());
        return CodeBlock.of('%L(%L)', cstr, from);
      } else if (isMessage(field)) {
        return CodeBlock.of('%T.fromJSON(%L)', basicTypeName(typeMap, field), from);
      } else {
        throw new Error(`Unhandled field ${field}`);
      }
    };

    // and then use the snippet to handle repeated fields if necessary
    func = func.beginControlFlow('if (object.%L)', fieldName);
    if (isRepeated(field)) {
      if (isMapType(typeMap, messageDesc, field)) {
        func = func
          .addStatement(`const entry = %L`, readSnippet(`object.${fieldName}`))
          .beginControlFlow('if (entry.value)')
          .addStatement('message.%L[entry.key] = entry.value', fieldName)
          .endControlFlow();
      } else {
        func = func
          .beginControlFlow('for (const e of object.%L)', fieldName)
          .addStatement(`message.%L.push(%L)`, fieldName, readSnippet('e'))
          .endControlFlow();
      }
    } else {
      func = func.addStatement(`message.%L = %L`, fieldName, readSnippet(`object.${fieldName}`));
    }
    func = func.endControlFlow();
  });
  // and then wrap up the switch/while/return
  func = func.addStatement('return message');
  return func;
}

function generateToJson(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('toJSON')
    .addParameter('message', fullName)
    .returns('unknown');
  func = func.addCodeBlock(CodeBlock.empty().addStatement('const obj: any = {}'));
  // then add a case for each field
  messageDesc.field.forEach(field => {
    const fieldName = snakeToCamel(field.name);

    const readSnippet = (from: string): CodeBlock => {
      if (isEnum(field)) {
        return CodeBlock.of('%T.toJSON(%L)', basicTypeName(typeMap, field), from);
      } else if (isTimestamp(field)) {
        return CodeBlock.of('%L !== undefined ? %L.toISOString() : null', from, from);
      } else if (isMessage(field) && !isValueType(field) && !isMapType(typeMap, messageDesc, field)) {
        return CodeBlock.of(
          '%L ? %T.toJSON(%L) : %L',
          from,
          basicTypeName(typeMap, field, true),
          from,
          defaultValue(field.type)
        );
      } else {
        return CodeBlock.of('%L || %L', from, defaultValue(field.type));
      }
    };

    if (isRepeated(field) && !isMapType(typeMap, messageDesc, field)) {
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

function generateFromPartial(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('fromPartial')
    .addParameter('object', `DeepPartial<${fullName}>`)
    .returns(fullName);
  func = func.addStatement('const message = Object.create(base%L) as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach(field => {
    const value = isMapType(typeMap, messageDesc, field) ? '{}' : '[]';
    func = func.addStatement('message.%L = %L', snakeToCamel(field.name), value);
  });

  // add a check for each incoming field
  messageDesc.field.forEach(field => {
    const fieldName = snakeToCamel(field.name);
    const readSnippet = (from: string): CodeBlock => {
      if (isEnum(field) || isPrimitive(field) || isTimestamp(field) || isValueType(field)) {
        return CodeBlock.of(from);
      } else if (isMessage(field)) {
        return CodeBlock.of('%T.fromPartial(%L)', basicTypeName(typeMap, field), from);
      } else {
        throw new Error(`Unhandled field ${field}`);
      }
    };

    // and then use the snippet to handle repeated fields if necessary
    func = func.beginControlFlow('if (object.%L)', fieldName);
    if (isRepeated(field)) {
      if (isMapType(typeMap, messageDesc, field)) {
        func = func
          .addStatement(`const entry = %L`, readSnippet(`object.${fieldName}`))
          .beginControlFlow('if (entry.value)')
          .addStatement('message.%L[entry.key] = entry.value', fieldName)
          .endControlFlow();
      } else {
        func = func
          .beginControlFlow('for (const e of object.%L)', fieldName)
          .addStatement(`message.%L.push(%L)`, fieldName, readSnippet('e'))
          .endControlFlow();
      }
    } else {
      func = func.addStatement(`message.%L = %L`, fieldName, readSnippet(`object.${fieldName}`));
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
  serviceDesc: ServiceDescriptorProto,
  options: Options
): InterfaceSpec {
  let service = InterfaceSpec.create(serviceDesc.name).addModifiers(Modifier.EXPORT);
  if (options.useContext) {
    service = service.addTypeVariable(contextTypeVar);
  }
  for (const methodDesc of serviceDesc.method) {
    let requestFn = FunctionSpec.create(methodDesc.name);
    if (options.useContext) {
      requestFn = requestFn.addParameter('ctx', TypeNames.typeVariable('Context'));
    }
    requestFn = requestFn.addParameter('request', requestType(typeMap, methodDesc));
    requestFn = requestFn.returns(responsePromise(typeMap, methodDesc));
    service = service.addFunction(requestFn);

    if (options.useContext) {
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc);
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
      const batchMethod = detectBatchMethod(typeMap, fileDesc, serviceDesc, methodDesc);
      if (batchMethod) {
        client = generateBatchingMethod(typeMap, client, batchMethod);
      }
    }

    // Generate the regular RPC method
    let requestFn = FunctionSpec.create(methodDesc.name);
    if (options.useContext) {
      requestFn = requestFn.addParameter('ctx', TypeNames.typeVariable('Context'));
    }
    requestFn = requestFn
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
    client = client.addFunction(requestFn);
  }
  return client;
}

function detectBatchMethod(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): BatchMethod | undefined {
  const nameMatches = methodDesc.name.startsWith('Batch');
  const inputType = typeMap.get(methodDesc.inputType.substring(1)); // drop the `.` prefix
  const outputType = typeMap.get(methodDesc.outputType.substring(1));
  if (nameMatches && inputType && outputType) {
    // TODO: This might be enums?
    const inputTypeDesc = inputType[2] as DescriptorProto;
    const outputTypeDesc = outputType[2] as DescriptorProto;
    if (hasSingleRepeatedField(inputTypeDesc) && hasSingleRepeatedField(outputTypeDesc)) {
      const singleMethodName = methodDesc.name.replace('Batch', 'Get');
      const inputFieldName = inputTypeDesc.field[0].name;
      const inputType = basicTypeName(typeMap, inputTypeDesc.field[0]); // e.g. repeated string -> string
      const outputFieldName = outputTypeDesc.field[0].name;
      let outputType = basicTypeName(typeMap, outputTypeDesc.field[0]); // e.g. repeated Entity -> Entity
      const mapType = detectMapType(typeMap, outputTypeDesc, outputTypeDesc.field[0]);
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

function generateBatchingMethod(typeMap: TypeMap, client: ClassSpec, batchMethod: BatchMethod): ClassSpec {
  const name = batchMethod.singleMethodName.replace('Get', '');
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
  client = client.addFunction(
    FunctionSpec.create(singleMethodName)
      .addParameter('ctx', 'Context')
      .addParameter(singular(inputFieldName), inputType)
      .addCode('const dl = ctx.getDataLoader(%S, () => {%>\n', uniqueIdentifier)
      .addCode('return new %T<%T, %T>(%L);\n', dataloader, inputType, outputType, lambda)
      .addCode('%<});\n')
      .addStatement('return dl.load(%L)', singular(inputFieldName))
      .returns(TypeNames.PROMISE.param(outputType))
  );
  return client;
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
    .addParameter('cstrFn', TypeNames.lambda2([], TypeNames.typeVariable('T')))
    .returns(TypeNames.typeVariable('T'));
  return InterfaceSpec.create('DataLoaders').addFunction(fn);
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

function snakeToCamel(s: string): string {
  return s.replace(/(\_\w)/g, m => m[1].toUpperCase());
}

function capitalize(s: string): string {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}
