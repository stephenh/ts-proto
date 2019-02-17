import {
  ClassSpec,
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
import {
  basicLongWireType,
  basicTypeName,
  basicWireType,
  defaultValue,
  isMessage,
  isPrimitive,
  isRepeated,
  isValueType,
  isWithinOneOf,
  messageToTypeName,
  packedType,
  toReaderCall,
  toTypeName,
  TypeMap
} from './types';
import { asSequence } from 'sequency';
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;
import MethodDescriptorProto = google.protobuf.MethodDescriptorProto;

export function generateFile(typeMap: TypeMap, fileDesc: FileDescriptorProto): FileSpec {
  const moduleName = fileDesc.name.replace('.proto', '').replace(/\//g, '_');
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
  visit(fileDesc, (fullName, message) => {
    file = file.addProperty(generateBaseInstance(fullName, message));
    let staticMethods = CodeBlock.empty()
      .add('export const %L = ', fullName)
      .beginHash()
      .addHashEntry('encode', generateEncode(typeMap, fullName, message))
      .addHashEntry('decode', generateDecode(typeMap, fullName, message))
      .endHash()
      .add(';')
      .newLine();
    file = file.addCode(staticMethods);
  });

  visitServices(fileDesc, serviceDesc => {
    file = file.addInterface(generateService(typeMap, serviceDesc));
    file = file.addClass(generateServiceClientImpl(typeMap, serviceDesc));
  });
  file = file.addInterface(generateRpcType());

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

function generateEnum(fullName: string, enumDesc: EnumDescriptorProto): EnumSpec {
  let spec = EnumSpec.create(fullName).addModifiers(Modifier.EXPORT);
  for (const valueDesc of enumDesc.value) {
    spec = spec.addConstant(valueDesc.name, valueDesc.number.toString());
  }
  return spec;
}

// Create the interface with properties
function generateInterfaceDeclaration(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto) {
  let message = InterfaceSpec.create(fullName).addModifiers(Modifier.EXPORT);
  for (const fieldDesc of messageDesc.field) {
    message = message.addProperty(PropertySpec.create(snakeToCamel(fieldDesc.name), toTypeName(typeMap, fieldDesc)));
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
  let func = FunctionSpec.create('decode' + fullName)
    .addParameter('reader', 'Reader@protobufjs/minimal')
    .addParameter('length?', 'number')
    .returns(fullName);

  // add the initial end/message
  func = func
    .addStatement('let end = length === undefined ? reader.len : reader.pos + length')
    .addStatement('const message = Object.create(base%L) as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach(field => {
    func = func.addStatement('message.%L = []', snakeToCamel(field.name));
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
    } else if (isMessage(field)) {
      readSnippet = CodeBlock.of('%T.decode(reader, reader.uint32())', basicTypeName(typeMap, field));
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    // and then use the snippet to handle repeated fields if necessary
    if (isRepeated(field)) {
      if (packedType(field.type) === undefined) {
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
  let func = FunctionSpec.create('encode' + fullName)
    .addParameter('message', fullName)
    .addParameter('writer', 'Writer@protobufjs/minimal', { defaultValueField: CodeBlock.of('new Writer()') })
    .returns('Writer@protobufjs/minimal');
  // then add a case for each field
  messageDesc.field.forEach(field => {
    const fieldName = snakeToCamel(field.name);

    // get a generic writer.doSomething based on the basic type
    let writeSnippet: (place: string) => CodeBlock;
    if (isPrimitive(field)) {
      const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
      writeSnippet = place => CodeBlock.of('writer.uint32(%L).%L(%L)', tag, toReaderCall(field), place);
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
      if (packedType(field.type) === undefined) {
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

function generateService(typeMap: TypeMap, serviceDesc: ServiceDescriptorProto): InterfaceSpec {
  let service = InterfaceSpec.create(serviceDesc.name).addModifiers(Modifier.EXPORT);
  for (const methodDesc of serviceDesc.method) {
    service = service.addFunction(
      FunctionSpec.create(methodDesc.name)
        .addModifiers(Modifier.ABSTRACT)
        .addParameter('request', requestType(typeMap, methodDesc))
        .returns(responsePromise(typeMap, methodDesc))
    );
  }
  return service;
}

function generateServiceClientImpl(typeMap: TypeMap, serviceDesc: ServiceDescriptorProto): ClassSpec {
  let client = ClassSpec.create(`${serviceDesc.name}ClientImpl`).addModifiers(Modifier.EXPORT);
  client = client.addFunction(
    FunctionSpec.createConstructor()
      .addParameter('rpc', 'Rpc')
      .addStatement('this.rpc = rpc')
  );
  client = client.addProperty('rpc', 'Rpc', { modifiers: [Modifier.PRIVATE, Modifier.READONLY] });
  for (const methodDesc of serviceDesc.method) {
    client = client.addFunction(
      FunctionSpec.create(methodDesc.name)
        .addParameter('request', requestType(typeMap, methodDesc))
        .addStatement('const data = %L.encode(request).finish()', requestType(typeMap, methodDesc))
        .addStatement('const promise = this.rpc.request(%S, %S, %L)', serviceDesc.name, methodDesc.name, 'data')
        .addStatement('return promise.then(data => %L.decode(new Reader(data)))', responseType(typeMap, methodDesc))
        .returns(responsePromise(typeMap, methodDesc))
    );
  }
  return client;
}

function generateRpcType(): InterfaceSpec {
  const data = TypeNames.anyType('Uint8Array');
  return InterfaceSpec.create('Rpc')
    .addModifiers(Modifier.EXPORT)
    .addFunction(
      FunctionSpec.create('request')
        .addModifiers(Modifier.ABSTRACT)
        .addParameter('service', TypeNames.STRING)
        .addParameter('method', TypeNames.STRING)
        .addParameter('data', data)
        .returns(TypeNames.PROMISE.param(data))
    );
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

function generateOneOfProperty(typeMap: TypeMap, name: string, fields: FieldDescriptorProto[]): PropertySpec {
  const adtType = TypeNames.unionType(
    ...fields.map(f => {
      const kind = new Member('field', TypeNames.anyType(`'${f.name}'`), false);
      const value = new Member('value', toTypeName(typeMap, f), false);
      return TypeNames.anonymousType(kind, value);
    })
  );
  return PropertySpec.create(snakeToCamel(name), adtType);
}

function snakeToCamel(s: string): string {
  return s.replace(/(\_\w)/g, m => m[1].toUpperCase());
}
