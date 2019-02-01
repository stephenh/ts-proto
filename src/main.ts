import {
  CodeBlock,
  EnumSpec,
  FileSpec,
  FunctionSpec,
  InterfaceSpec,
  Member,
  Modifier,
  PropertySpec,
  TypeName,
  TypeNames
} from 'ts-poet';
import { google } from '../build/pbjs';
import { basicLongWireType, basicTypeName, basicWireType, defaultValue, packedType, toReaderCall } from './types';
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;
import { asSequence } from 'sequency';

export function generateFile(fileDesc: FileDescriptorProto): FileSpec {
  let file = FileSpec.create(fileDesc.package);
  for (const messageDesc of fileDesc.messageType) {
    file = generateMessage(file, messageDesc);
  }
  for (const enumDesc of fileDesc.enumType) {
    file = generateEnum(file, enumDesc);
  }
  file = addLongUtilityMethod(file);
  return file;
}

function addLongUtilityMethod(file: FileSpec): FileSpec {
  return file.addFunction(
    FunctionSpec.create('longToNumber')
      .addParameter('long', 'Long*long')
      .addCodeBlock(
        CodeBlock.empty()
          .beginControlFlow('if (long.gt(Number.MAX_VALUE))')
          .addStatement('throw new Error("Value is larger than Number.MAX_VALUE");')
          .endControlFlow()
          .addStatement('return long.toNumber()')
      )
  );
}

function generateEnum(file: FileSpec, enumDesc: EnumDescriptorProto, prefix: string = ''): FileSpec {
  let spec = EnumSpec.create(prefix + enumDesc.name).addModifiers(Modifier.EXPORT);
  for (const valueDesc of enumDesc.value) {
    spec = spec.addConstant(valueDesc.name, valueDesc.number.toString());
  }
  return file.addEnum(spec);
}

function generateMessage(file: FileSpec, messageDesc: DescriptorProto, prefix: string = ''): FileSpec {
  const fullName = prefix + messageDesc.name;

  // Create the interface with properties
  let message = InterfaceSpec.create(fullName).addModifiers(Modifier.EXPORT);

  for (const fieldDesc of messageDesc.field) {
    if (!isWithinOneOf(fieldDesc)) {
      message = message.addProperty(PropertySpec.create(snakeToCamel(fieldDesc.name), toTypeName(fieldDesc)));
    }
  }

  // Create oneOfs as ADTs
  const oneOfs = createOneOfsMap(messageDesc);
  for (const [name, fields] of oneOfs.entries()) {
    message = message.addProperty(generateOneOfProperty(name, fields));
  }

  // Create a 'base' instance with default values for decode to use as a prototype
  let baseMessage = PropertySpec.create('base' + fullName, TypeNames.anyType('object')).addModifiers(Modifier.CONST);
  let baseMessageInit = CodeBlock.empty().beginHash();
  for (const fieldDesc of messageDesc.field) {
    if (!isWithinOneOf(fieldDesc)) {
      baseMessageInit = baseMessageInit.addHashEntry(snakeToCamel(fieldDesc.name), defaultValue(fieldDesc.type));
    }
  }
  file = file.addProperty(baseMessage.initializerBlock(baseMessageInit.endHash()));

  // Recurse into nested types
  for (const nestedDesc of messageDesc.nestedType) {
    file = generateMessage(file, nestedDesc, prefix + messageDesc.name + '_');
  }
  for (const enumDesc of messageDesc.enumType) {
    file = generateEnum(file, enumDesc, prefix + messageDesc.name + '_');
  }

  return file
    .addFunction(generateDecode(prefix, messageDesc))
    .addFunction(generateEncode(prefix, messageDesc))
    .addInterface(message);
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(prefix: string, messageDesc: DescriptorProto): FunctionSpec {
  const fullName = prefix + messageDesc.name;
  // create the basic function declaration
  let func = FunctionSpec.create('decode' + fullName)
    .addModifiers(Modifier.EXPORT)
    .addParameter('reader', 'Reader@protobufjs/minimal')
    .addParameter('length?', 'number')
    .returns(fullName);

  // add the initial end/message
  func = func
    .addStatement('let end = length === undefined ? reader.len : reader.pos + length')
    .addStatement('const message = Object.create(base%L) as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.forEach(field => {
    const fieldName = snakeToCamel(field.name);
    if (field.label === FieldDescriptorProto.Label.LABEL_REPEATED) {
      func = func.addStatement('message.%L = []', fieldName);
    }
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

    let readSnippet: string;
    if (isPrimitive(field)) {
      readSnippet = `reader.${toReaderCall(field)}()`;
      if (basicLongWireType(field.type) !== undefined) {
        readSnippet = `longToNumber(${readSnippet} as Long)`;
      }
    } else if (isMessage(field)) {
      const [module, type] = toModuleAndType(field.typeName);
      readSnippet = `decode${type}(reader, reader.uint32())`;
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    if (isWithinOneOf(field)) {
      const oneOf = messageDesc.oneofDecl[field.oneofIndex];
      func = func.addStatement(
        "message.%L = { field: '%L', value: %L }",
        snakeToCamel(oneOf.name),
        field.name,
        readSnippet
      );
    } else if (isRepeated(field)) {
      if (packedType(field.type) === undefined) {
        func = func.addStatement('message.%L.push(%L)', fieldName, readSnippet);
      } else {
        func = func
          .beginControlFlow('if ((tag & 7) === 2)')
          .addStatement('const end2 = reader.uint32() + reader.pos')
          .beginControlFlow('while (reader.pos < end2)')
          .addStatement('message.%L.push(%L)', fieldName, readSnippet)
          .endControlFlow()
          .nextControlFlow('else')
          .addStatement('message.%L.push(%L)', fieldName, readSnippet)
          .endControlFlow();
      }
    } else {
      func = func.addStatement('message.%L = %L', fieldName, readSnippet);
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
function generateEncode(prefix: string, messageDesc: DescriptorProto): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('encode' + prefix + messageDesc.name)
    .addModifiers(Modifier.EXPORT)
    .addParameter('message', prefix + messageDesc.name)
    .addParameter('writer', 'Writer@protobufjs/minimal', { defaultValueField: CodeBlock.of('new Writer()') })
    .returns('Writer@protobufjs/minimal');
  // then add a case for each field
  messageDesc.field.forEach(field => {
    const fieldName = snakeToCamel(field.name);
    let writeSnippet: string;
    if (isPrimitive(field)) {
      const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
      writeSnippet = `writer.uint32(${tag}).${toReaderCall(field)}(%L)`;
    } else if (isMessage(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      const [module, type] = toModuleAndType(field.typeName);
      writeSnippet = `encode${type}(%L, writer.uint32(${tag}).fork()).ldelim()`;
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    if (isWithinOneOf(field)) {
      const oneof = messageDesc.oneofDecl[field.oneofIndex];
      func = func
        .beginControlFlow('if (message.%L.field === %S)', snakeToCamel(oneof.name), field.name)
        .addStatement(writeSnippet, `message.${snakeToCamel(oneof.name)}.value`)
        .endControlFlow();
      // we'll do oneofs later
    } else if (isRepeated(field)) {
      if (packedType(field.type) === undefined) {
        func = func
          .beginControlFlow('for (const v of message.%L)', fieldName)
          .addStatement(writeSnippet, 'v')
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
    } else {
      func = func.addStatement(writeSnippet, `message.${fieldName}`);
    }
  });
  return func.addStatement('return writer');
}

function generateOneOfProperty(name: string, fields: FieldDescriptorProto[]): PropertySpec {
  const adtType = TypeNames.unionType(
    ...fields.map(f => {
      const kind = new Member('field', TypeNames.anyType(`'${f.name}'`), false);
      const value = new Member('value', toTypeName(f), false);
      return TypeNames.anonymousType(kind, value);
    })
  );
  return PropertySpec.create(snakeToCamel(name), adtType);
}

function isPrimitive(field: FieldDescriptorProto): boolean {
  return !isMessage(field);
}

function isMessage(field: FieldDescriptorProto): boolean {
  return field.type == FieldDescriptorProto.Type.TYPE_MESSAGE;
}

function isWithinOneOf(field: FieldDescriptorProto): boolean {
  return field.hasOwnProperty('oneofIndex');
}

function isRepeated(field: FieldDescriptorProto): boolean {
  return field.label === FieldDescriptorProto.Label.LABEL_REPEATED;
}

function createOneOfsMap(message: DescriptorProto): Map<string, FieldDescriptorProto[]> {
  return asSequence(message.field)
    .filter(isWithinOneOf)
    .groupBy(f => {
      return message.oneofDecl[f.oneofIndex].name;
    });
}

/** Return the type name. */
function toTypeName(field: FieldDescriptorProto): TypeName {
  const type = basicTypeName(field);
  if (field.label === FieldDescriptorProto.Label.LABEL_REPEATED) {
    return TypeNames.arrayType(type);
  }
  return type;
}

/** Maps `.some_proto_namespace.Message` to a TypeName. */
export function mapMessageType(protoType: string): TypeName {
  const [module, type] = toModuleAndType(protoType);
  return TypeNames.importedType(`${type}@${module}`);
}

/** Breaks `.some_proto_namespace.Some.Message` into `['some_proto_namespace', 'Some_Message']. */
export function toModuleAndType(protoType: string): [string, string] {
  const parts = protoType.split('.');
  parts.shift(); // drop the empty space before the first dot
  const namespace = parts.shift() || fail(`No namespace found for ${protoType}`);
  let message = parts.shift() || fail(`No message found for ${protoType}`);
  while (parts.length > 0) {
    message += '_' + parts.shift();
  }
  return [namespace, message];
}

function snakeToCamel(s: string): string {
  return s.replace(/(\_\w)/g, m => m[1].toUpperCase());
}
