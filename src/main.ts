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
import { basicTypeName, basicWireType, defaultValue, packedType, toReaderCall } from './types';
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

function generateEnum(file: FileSpec, enumDesc: EnumDescriptorProto, prefix: string = ''): FileSpec {
  let spec = EnumSpec.create(prefix + enumDesc.name).addModifiers(Modifier.EXPORT);
  for (const valueDesc of enumDesc.value) {
    spec = spec.addConstant(valueDesc.name, valueDesc.number.toString());
  }
  return file.addEnum(spec);
}

function generateMessage(file: FileSpec, messageDesc: DescriptorProto, prefix: string = ''): FileSpec {
  const fullName = prefix + messageDesc.name;
  let message = InterfaceSpec.create(fullName).addModifiers(Modifier.EXPORT);
  for (const fieldDesc of messageDesc.field) {
    const type = toTypeName(fieldDesc);
    message = message.addProperty(PropertySpec.create(fieldDesc.name!, type));
  }
  // Create default values for decode to use as a prototype
  let baseMessage = PropertySpec.create('base' + fullName, TypeNames.anyType('object')).addModifiers(Modifier.CONST);
  let baseMessageInit = CodeBlock.empty().beginHash();
  for (const fieldDesc of messageDesc.field) {
    baseMessageInit = baseMessageInit.addHashEntry(fieldDesc.name, defaultValue(fieldDesc.type));
  }
  file = file.addProperty(baseMessage.initializerBlock(baseMessageInit.endHash()));
  // TODO not handling oneOfs
  for (const nestedDesc of messageDesc.nestedType) {
    file = generateMessage(file, nestedDesc, prefix + messageDesc.name + '_');
  }
  file = file
    .addFunction(generateDecode(prefix, messageDesc))
    .addFunction(generateEncode(prefix, messageDesc))
    .addInterface(message);
  for (const enumDesc of messageDesc.enumType) {
    file = generateEnum(file, enumDesc, prefix + messageDesc.name + '_');
  }
  return file;
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(prefix: string, messageDesc: DescriptorProto): FunctionSpec {
  const fullName = prefix + messageDesc.name;
  // create the basic function declaration
  let func = FunctionSpec.create('decode' + fullName)
    .addModifiers(Modifier.EXPORT)
    .addParameter('reader', 'Reader@protobufjs')
    .addParameter('length?', 'number')
    .returns(fullName);

  // add the initial end/message
  func = func
    .addStatement('let end = length === undefined ? reader.len : reader.pos + length')
    .addStatement('const message = Object.create(base%L) as %L', fullName, fullName);

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
    func = func.addCode('case %L:%>\n', field.number);

    let readSnippet: string;
    if (isPrimitive(field)) {
      readSnippet = `reader.${toReaderCall(field)}()`;
    } else if (isMessage(field)) {
      const [module, type] = toModuleAndType(field.typeName);
      readSnippet = `decode${type}(reader, reader.uint32())`;
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    if (field.label === FieldDescriptorProto.Label.LABEL_REPEATED) {
      if (packedType(field.type) === undefined) {
        func = func.addStatement('message.%L.push(%L)', field.name, readSnippet);
      } else {
        func = func
          .beginControlFlow('if ((tag & 7) === 2)')
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
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    if (field.label === FieldDescriptorProto.Label.LABEL_REPEATED) {
      if (packedType(field.type) === undefined) {
        func = func
          .beginControlFlow('for (const v of message.%L)', field.name)
          .addStatement(writeSnippet, 'v')
          .endControlFlow();
      } else {
        const tag = ((field.number << 3) | 2) >>> 0;
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
  return !isMessage(field);
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
