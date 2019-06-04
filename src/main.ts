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
  TypeNames
} from 'ts-poet';
import { google } from '../build/pbjs';
import {
  basicLongWireType,
  basicTypeName,
  basicWireType,
  defaultValue,
  detectMapType,
  isMapType,
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
import { lowerFirst, singular } from './utils';
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;
import MethodDescriptorProto = google.protobuf.MethodDescriptorProto;

const dataloader = TypeNames.anyType('DataLoader=dataloader');

export function generateFile(typeMap: TypeMap, fileDesc: FileDescriptorProto): FileSpec {
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
  visit(fileDesc, (fullName, message) => {
    file = file.addProperty(generateBaseInstance(fullName, message));
    let staticMethods = CodeBlock.empty()
      .add('export const %L = ', fullName)
      .beginHash()
      .addHashEntry(generateEncode(typeMap, fullName, message))
      .addHashEntry(generateDecode(typeMap, fullName, message))
      .endHash()
      .add(';')
      .newLine();
    file = file.addCode(staticMethods);
  });

  visitServices(fileDesc, serviceDesc => {
    file = file.addInterface(generateService(typeMap, fileDesc, serviceDesc));
    file = file.addClass(generateServiceClientImpl(typeMap, fileDesc, serviceDesc));
  });

  if (fileDesc.service.length > 0) {
    file = file.addInterface(generateRpcType());
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

function generateService(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto
): InterfaceSpec {
  let service = InterfaceSpec.create(serviceDesc.name).addModifiers(Modifier.EXPORT);
  for (const methodDesc of serviceDesc.method) {
    service = service.addFunction(
      FunctionSpec.create(methodDesc.name)
        .addParameter('request', requestType(typeMap, methodDesc))
        .returns(responsePromise(typeMap, methodDesc))
    );
    const batchMethod = detectBatchMethod(typeMap, fileDesc, methodDesc);
    if (batchMethod) {
      const name = batchMethod.methodDesc.name.replace('Batch', 'Get');
      service = service.addFunction(
        FunctionSpec.create(name)
          .addParameter(singular(batchMethod.inputFieldName), batchMethod.inputType)
          .returns(TypeNames.PROMISE.param(batchMethod.outputType))
      );
    }
  }
  return service;
}

interface BatchMethod {
  methodDesc: MethodDescriptorProto;
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
  serviceDesc: ServiceDescriptorProto
): ClassSpec {
  let client = ClassSpec.create(`${serviceDesc.name}ClientImpl`).addModifiers(Modifier.EXPORT);
  client = client.addFunction(
    FunctionSpec.createConstructor()
      .addParameter('rpc', 'Rpc')
      .addStatement('this.rpc = rpc')
  );
  client = client.addProperty('rpc', 'Rpc', { modifiers: [Modifier.PRIVATE, Modifier.READONLY] });
  for (const methodDesc of serviceDesc.method) {
    // add a batch method if this fuzzy matches to a batch lookup method
    const arrayBatchMethod = detectBatchMethod(typeMap, fileDesc, methodDesc);
    if (arrayBatchMethod) {
      client = generateBatchingMethod(typeMap, client, arrayBatchMethod);
    }
    // generate the regular method
    client = client.addFunction(
      FunctionSpec.create(methodDesc.name)
        .addParameter('request', requestType(typeMap, methodDesc))
        .addStatement('const data = %L.encode(request).finish()', requestType(typeMap, methodDesc))
        .addStatement(
          'const promise = this.rpc.request("%L.%L", %S, %L)',
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
        .returns(responsePromise(typeMap, methodDesc))
    );
  }
  return client;
}

function detectBatchMethod(
  typeMap: TypeMap,
  fileDesc: FileDescriptorProto,
  methodDesc: MethodDescriptorProto
): BatchMethod | undefined {
  const nameMatches = methodDesc.name.startsWith('Batch');
  const inputTypeDesc = fileDesc.messageType.find(m => `.${fileDesc.package}.${m.name}` === methodDesc.inputType);
  const outputTypeDesc = fileDesc.messageType.find(m => `.${fileDesc.package}.${m.name}` === methodDesc.outputType);
  if (nameMatches && inputTypeDesc && outputTypeDesc) {
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
      return {
        methodDesc,
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
  const loaderFieldName = `${lowerFirst(name)}Loader`;
  const { methodDesc, singleMethodName, inputFieldName, inputType, outputFieldName, outputType, mapType } = batchMethod;
  // add a dataloader field
  let lambda = CodeBlock.lambda(inputFieldName) // e.g. keys
    .addStatement('const request = { %L }', inputFieldName);
  if (mapType) {
    lambda = lambda
      .beginLambda('return this.%L(request).then(res =>', methodDesc.name)
      .addStatement('return %L.map(e => res.%L[e])', inputFieldName, outputFieldName)
      .endLambda(')');
  } else {
    lambda = lambda.addStatement('return this.%L(request).then(res => res.%L)', methodDesc.name, outputFieldName);
  }
  client = client.addProperty(
    PropertySpec.create(loaderFieldName, dataloader.param(inputType, outputType))
      .addModifiers(Modifier.PRIVATE)
      .setImplicitlyTyped()
      .initializer('new %T(%L)', dataloader.param(inputType, outputType), lambda)
  );
  client = client.addFunction(
    FunctionSpec.create(singleMethodName)
      .addParameter(singular(inputFieldName), inputType)
      .addStatement('return this.%L.load(%L)', loaderFieldName, singular(inputFieldName))
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
function generateRpcType(): InterfaceSpec {
  const data = TypeNames.anyType('Uint8Array');
  return InterfaceSpec.create('Rpc').addFunction(
    FunctionSpec.create('request')
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
