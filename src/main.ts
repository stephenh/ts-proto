import {
  CodeBlock,
  EnumSpec,
  FileSpec,
  FunctionSpec,
  InterfaceSpec,
  Modifier,
  PropertySpec,
  TypeName,
  TypeNames
} from 'ts-poet';
import { google } from '../build/pbjs';
import { basicTypeName, basicWireType, toReaderCall } from './types';
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;

export function generateFile(fileDesc: FileDescriptorProto): FileSpec {
  let file = FileSpec.create(fileDesc.package);
  for (const messageDesc of fileDesc.messageType) {
    file = generateMessage(file, messageDesc);
  }
  for (const enumDesc of fileDesc.enumType) {
    file = generateEnum(file, enumDesc);
  }
  return file;
}

function generateEnum(file: FileSpec, enumDesc: EnumDescriptorProto): FileSpec {
  let spec = EnumSpec.create(enumDesc.name).addModifiers(Modifier.EXPORT);
  for (const valueDesc of enumDesc.value) {
    spec = spec.addConstant(valueDesc.name, valueDesc.number.toString());
  }
  return file.addEnum(spec);
}

function generateMessage(file: FileSpec, messageDesc: DescriptorProto, outerMessagePrefix: string = ''): FileSpec {
  let message = InterfaceSpec.create(outerMessagePrefix + messageDesc.name!).addModifiers(Modifier.EXPORT);
  for (const fieldDesc of messageDesc.field) {
    const type = toTypeName(fieldDesc);
    message = message.addProperty(PropertySpec.create(fieldDesc.name!, type));
  }
  // TODO not handling other nested, like enums
  // TODO not handling oneOfs
  for (const nestedDesc of messageDesc.nestedType) {
    file = generateMessage(file, nestedDesc, outerMessagePrefix + messageDesc.name + '_');
  }
  return file
    .addFunction(generateDecode(messageDesc))
    .addFunction(generateEncode(messageDesc))
    .addInterface(message);
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(messageDesc: DescriptorProto): FunctionSpec {
  // create the basic function declaration
  let func = FunctionSpec.create('decode' + messageDesc.name)
    .addModifiers(Modifier.EXPORT)
    .addParameter('reader', 'Reader@protobufjs')
    .addParameter('length?', 'number')
    .returns(messageDesc.name);

  // add the initial end/message
  func = func
    .addStatement('let end = length === undefined ? reader.len : reader.pos + length')
    .addStatement('const message = {} as %L', messageDesc.name);

  // initialize all lists
  messageDesc.field.forEach(field => {
    if (field.label === FieldDescriptorProto.Label.LABEL_REPEATED) {
      func = func.addStatement('message.%L = []', field.name);
    }
  });

  // start the tag loop
  func = func
    .beginControlFlow('while (reader.pos < end)')
    .addStatement('const tag = reader.uint32()')
    .beginControlFlow('switch (tag >>> 3)');

  // add a case for each incoming field
  messageDesc.field.forEach(field => {
    func = func.addCode('case %L:\n', field.number);

    let readSnippet: string;
    if (isPrimitive(field)) {
      readSnippet = `reader.${toReaderCall(field)}()`;
    } else if (isMessage(field)) {
      const [module, type] = toModuleAndType(field.typeName);
      readSnippet = `decode${type}(reader, reader.uint32())`;
    } else if (isEnum(field)) {
      readSnippet = `reader.int32()`;
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    if (field.label === FieldDescriptorProto.Label.LABEL_REPEATED) {
      if (isMessage(field)) {
        func = func.addStatement('message.%L.push(%L)', field.name, readSnippet);
      } else {
        func = func.beginControlFlow('if ((tag & 7) === 2)')
          .addStatement('const end2 = reader.uint32() + reader.pos')
          .beginControlFlow('while (reader.pos < end2)')
          .addStatement('message.%L.push(%L)', field.name, readSnippet)
          .endControlFlow()
          .nextControlFlow('else')
          .addStatement('message.%L.push(%L)', field.name, readSnippet)
          .endControlFlow();
      }
    } else {
      func = func.addStatement('message.%L = %L', field.name, readSnippet);
    }
    func = func.addStatement('break');
  });
  func = func
    .addCode('default:\n')
    .addStatement('reader.skipType(tag & 7)')
    .addStatement('break');
  // and then wrap up the switch/while/return
  func = func
    .endControlFlow()
    .endControlFlow()
    .addStatement('return message');
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
    let writeSnippet: string;
    if (isPrimitive(field)) {
      const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
      writeSnippet = `writer.uint32(${tag}).${toReaderCall(field)}(%L)`;
    } else if (isMessage(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      const [module, type] = toModuleAndType(field.typeName);
      writeSnippet = `encode${type}(%L, writer.uint32(${tag}).fork()).ldelim()`;
    } else if (isEnum(field)) {
      const tag = ((field.number << 3) | basicWireType(FieldDescriptorProto.Type.TYPE_INT32)) >>> 0;
      writeSnippet = `writer.uint32(${tag}).int32(%L)`;
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    if (field.label === FieldDescriptorProto.Label.LABEL_REPEATED) {
      if (isMessage(field)) {
        func = func
          .beginControlFlow('for (const v of message.%L)', field.name)
          .addStatement(writeSnippet, 'v')
          .endControlFlow();
      } else {
        const tag = (field.number << 3 | 2) >>> 0;
        func = func
          .addStatement('writer.uint32(%L).fork()', tag)
          .beginControlFlow('for (const v of message.%L)', field.name)
          .addStatement('writer.%L(v)', toReaderCall(field))
          .endControlFlow()
          .addStatement('writer.ldelim()');
      }
    } else {
      func = func.addStatement(writeSnippet, `message.${field.name}`);
    }
  });
  return func.addStatement('return writer');
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
