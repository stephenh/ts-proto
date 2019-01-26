import { CodeBlock, FileSpec, FunctionSpec, InterfaceSpec, Modifier, PropertySpec, TypeName, TypeNames } from "ts-poet";
import { google } from "../build/pbjs";
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import { basicWireType } from "./types";

export function generateFile(fileDesc: FileDescriptorProto): FileSpec {
  let file = FileSpec.create(fileDesc.package);
  if (fileDesc.messageType) {
    for (const messageDesc of fileDesc.messageType) {
      file = generateMessage(file, messageDesc);
    }
  }
  return file;
}

function generateMessage(file: FileSpec, messageDesc: DescriptorProto, outerMessagePrefix: string = ""): FileSpec {
  let message = InterfaceSpec.create(outerMessagePrefix + messageDesc.name!).addModifiers(Modifier.EXPORT);
  for (const fieldDesc of messageDesc.field) {
    const type = toTypeName(fieldDesc);
    message = message.addProperty(PropertySpec.create(fieldDesc.name!, type));
  }
  if (messageDesc.nestedType) {
    for (const nestedDesc of messageDesc.nestedType) {
      file = generateMessage(file, nestedDesc, outerMessagePrefix + messageDesc.name + "_");
    }
  }
  return file.addFunction(generateDecode(messageDesc)).addFunction(generateEncode(messageDesc)).addInterface(message);
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(messageDesc: DescriptorProto): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('decode' + messageDesc.name)
    .addModifiers(Modifier.EXPORT)
    .addParameter('reader', 'Reader@protobufjs')
    .addParameter('length?', 'number')
    .returns(messageDesc.name);
  // now add the initial end/message/while setup
  func = func
    .addStatement("let end = length === undefined ? reader.len : reader.pos + length")
    .addStatement("const message = {} as %L", messageDesc.name)
    .beginControlFlow("while (reader.pos < end)")
    .addStatement("const tag = reader.uint32()")
    .beginControlFlow('switch (tag >>> 3)');
  // then add a case for each field
  messageDesc.field.forEach(field => {
    func = func.addCode('case %L:\n', field.number);
    if (isPrimitive(field)) {
      func = func.addStatement('message.%L = reader.%L()', field.name, toReaderCall(field))
    } else if (isMessage(field)) {
      const [module, type] = toModuleAndType(field.typeName);
      func = func.addStatement('message.%L = %L(reader, reader.uint32())', field.name, 'decode' + type);
    }
    func = func.addStatement('break');
  });
  func = func
    .addCode('default:\n')
    .addStatement('reader.skipType(tag & 7)')
    .addStatement('break');
  // and then wrap up the switch/while/return
  func = func.endControlFlow()
    .endControlFlow()
    .addStatement("return message");
  return func;
}

/** Creates a function to encode a message by loop overing the tags. */
function generateEncode(messageDesc: DescriptorProto): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('encode' + messageDesc.name)
    .addModifiers(Modifier.EXPORT)
    .addParameter('message', messageDesc.name)
    .addParameter('writer', 'Writer@protobufjs', { defaultValueField: CodeBlock.of('new Writer()') })
    .returns('Writer@protobufjs');
  // then add a case for each field
  messageDesc.field.forEach(field => {
    if (isPrimitive(field)) {
      const tag = (field.number << 3 | basicWireType(field.type)) >>> 0;
      func = func.addStatement('writer.uint32(%L).%L(message.%L)', tag, toReaderCall(field), field.name)
    } else if (isMessage(field)) {
      const tag = (field.number << 3 | 2) >>> 0;
      const [module, type] = toModuleAndType(field.typeName);
      func = func.addStatement('%L(message.%L, writer.uint32(%L).fork()).ldelim()', 'encode' + type, field.name, tag);
    }
  });
  return func.addStatement("return writer");
}


function isPrimitive(field: FieldDescriptorProto): boolean {
  return !isEnum(field) && !isMessage(field);
}

function isEnum(field: FieldDescriptorProto): boolean {
  return field.type == FieldDescriptorProto.Type.TYPE_ENUM;
}

function isMessage(field: FieldDescriptorProto): boolean {
  return field.type == FieldDescriptorProto.Type.TYPE_MESSAGE;
}

/** Return the type name. */
function toTypeName(field: FieldDescriptorProto): TypeName {
  const type = toBaseTypeName(field);
  if (field.label === FieldDescriptorProto.Label.LABEL_REPEATED) {
    return TypeNames.arrayType(type);
  }
  return type;
}

/** Returns the type name without any repeated/required/etc. labels. */
function toBaseTypeName(field: FieldDescriptorProto): TypeName {
  switch (field.type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
    case FieldDescriptorProto.Type.TYPE_FLOAT:
    case FieldDescriptorProto.Type.TYPE_INT32:
    case FieldDescriptorProto.Type.TYPE_UINT32:
    case FieldDescriptorProto.Type.TYPE_SINT32:
    case FieldDescriptorProto.Type.TYPE_FIXED32:
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return TypeNames.NUMBER;
    case FieldDescriptorProto.Type.TYPE_INT64:
    case FieldDescriptorProto.Type.TYPE_UINT64:
    case FieldDescriptorProto.Type.TYPE_SINT64:
    case FieldDescriptorProto.Type.TYPE_FIXED64:
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      // type = config.forceLong ? "Long" : config.forceNumber ? "number" : "number|Long";
      return TypeNames.NUMBER;
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return TypeNames.BOOLEAN;
    case FieldDescriptorProto.Type.TYPE_STRING:
      return TypeNames.STRING;
    case FieldDescriptorProto.Type.TYPE_BYTES:
      return TypeNames.anyType("Uint8Array");
    case FieldDescriptorProto.Type.TYPE_MESSAGE:
      return mapMessageType(field.typeName);
    default:
      return TypeNames.anyType(field.typeName);
  }
}

/** Returns the type name without any repeated/required/etc. labels. */
function toReaderCall(field: FieldDescriptorProto): string {
  switch (field.type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
      return 'double';
    case FieldDescriptorProto.Type.TYPE_FLOAT:
      return 'float';
    case FieldDescriptorProto.Type.TYPE_INT32:
      return 'int32';
    case FieldDescriptorProto.Type.TYPE_UINT32:
      return 'uint32';
    case FieldDescriptorProto.Type.TYPE_SINT32:
      return 'sint32';
    case FieldDescriptorProto.Type.TYPE_FIXED32:
      return 'fixed32';
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return 'sfixed32';
    case FieldDescriptorProto.Type.TYPE_INT64:
      return 'int64';
    case FieldDescriptorProto.Type.TYPE_UINT64:
      return 'uint64';
    case FieldDescriptorProto.Type.TYPE_SINT64:
      return 'sint64';
    case FieldDescriptorProto.Type.TYPE_FIXED64:
      return 'fixed64';
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      return 'sfixed64';
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return 'bool';
    case FieldDescriptorProto.Type.TYPE_STRING:
      return 'string';
    case FieldDescriptorProto.Type.TYPE_BYTES:
      return 'bytes';
    default:
      throw new Error(`Not a primitive field ${field}`);
  }
}

/** Maps `.some_proto_namespace.Message` to a TypeName. */
export function mapMessageType(protoType: string): TypeName {
  const [ module, type ] = toModuleAndType(protoType);
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


