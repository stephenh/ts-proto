import { FileSpec, FunctionSpec, InterfaceSpec, Modifier, PropertySpec, TypeName, TypeNames } from "ts-poet";
import { google } from "../build/pbjs";
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import IFileDescriptorProto = google.protobuf.IFileDescriptorProto;
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;

function readStdin(): Promise<Buffer> {
  return new Promise(resolve => {
    const ret: Array<Buffer | string> = [];
    let len = 0;
    const stdin = process.stdin;
    stdin.on('readable', () => {
      let chunk;
      while ((chunk = stdin.read())) {
        ret.push(chunk);
        len += chunk.length;
      }
    });
    stdin.on('end', () => {
      resolve(Buffer.concat(ret as any, len));
    });
  });
}

async function main() {
  const stdin = await readStdin();
  // const json = JSON.parse(stdin.toString());
  // const request = CodeGeneratorRequest.fromObject(json);
  const request = CodeGeneratorRequest.decode(stdin);
  for (let file of request.protoFile) {
    generateFile(file);
  }
}

export function generateFile(fileDesc: IFileDescriptorProto): FileSpec {
  let file = FileSpec.create(fileDesc.name!);
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
    const type = toJsType(fieldDesc);
    message = message.addProperty(PropertySpec.create(fieldDesc.name!, type));
  }
  if (messageDesc.nestedType) {
    for (const nestedDesc of messageDesc.nestedType) {
      file = generateMessage(file, nestedDesc, outerMessagePrefix + messageDesc.name + "_");
    }
  }
  return file.addFunction(generateDecode(messageDesc)).addInterface(message);
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(messageDesc: DescriptorProto): FunctionSpec {
  let func = FunctionSpec.create('decode')
    .addModifiers(Modifier.EXPORT)
    .addParameter('reader', 'Reader@protobufjs')
    .addParameter('length?', 'number')
    .returns(messageDesc.name)
    .addStatement("let end = length === undefined ? reader.len : reader.pos + length")
    .addStatement("const message = {} as %L", messageDesc.name)
    .beginControlFlow("while (reader.pos < end)")
    .addStatement("const tag = reader.uint32()")
    .beginControlFlow('switch (tag >>> 3)');
  messageDesc.field.forEach(field => {
    func = func
      .addCode('case %L:\n', field.number)
      .addStatement('message.%L = reader.string()', field.name)
      .addStatement('break')
  });
  func = func
    .addCode('default:\n')
    .addStatement('reader.skipType(tag & 7)')
    .addStatement('break');
  func = func.endControlFlow()
    .endControlFlow()
    .addStatement("return message");
  return func;
}

function toJsType(field: FieldDescriptorProto): TypeName {
  const type = toJsType2(field);
  if (field.label === FieldDescriptorProto.Label.LABEL_REPEATED) {
    return TypeNames.arrayType(type);
  }
  return type;
}

function toJsType2(field: FieldDescriptorProto): TypeName {
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
    // if (field.resolve().resolvedType)
    //   type = exportName(field.resolvedType, !(field.resolvedType instanceof protobuf.Enum || config.forceMessage));
    // else
    //   type = "*"; // should not happen
    // break;
  }
}

/** Maps `.some_proto_namespace.Message` to a TypeName. */
export function mapMessageType(protoType: string): TypeName {
  const parts = protoType.split('.');
  parts.shift(); // drop the empty space before the first dot
  const namespace = parts.shift();
  let message = parts.shift();
  while (parts.length > 0) {
    message += '_' + parts.shift();
  }
  return TypeNames.importedType(`${message}@${namespace}`);
}


