import { CodeBlock, FileSpec, FunctionSpec, InterfaceSpec, Member, Modifier, PropertySpec, TypeNames } from 'ts-poet';
import { google } from '../build/pbjs';
import {
  basicLongWireType,
  basicTypeName,
  basicWireType,
  defaultValue,
  detectMapType,
  getEnumMethod,
  isBytes,
  isEnum,
  isLong,
  isLongValueType,
  isMapType,
  isMessage,
  isPrimitive,
  isProcessableTimestamp,
  isRepeated,
  isTimestamp,
  isValueType,
  isWithinOneOf,
  isWithinOneOfThatShouldBeUnion,
  packedType,
  toReaderCall,
  toTypeName,
  TypeMap,
  valueTypeName,
} from './types';
import SourceInfo, { Fields } from './sourceInfo';
import { maybeAddComment, optionsFromParameter } from './utils';
import { camelCase, camelToSnake, capitalize, maybeSnakeToCamel } from './case';
import {
  generateNestjsGrpcServiceMethodsDecorator,
  generateNestjsServiceClient,
  generateNestjsServiceController,
} from './generate-nestjs';
import {
  generateDataLoadersType,
  generateDataLoaderOptionsType,
  generateRpcType,
  generateService,
  generateServiceClientImpl,
} from './generate-services';
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;
import {
  addGrpcWebMisc,
  generateGrpcClientImpl,
  generateGrpcMethodDesc,
  generateGrpcServiceDesc,
} from './generate-grpc-web';

export enum LongOption {
  NUMBER = 'number',
  LONG = 'long',
  STRING = 'string',
}

export enum EnvOption {
  NODE = 'node',
  BROWSER = 'browser',
  BOTH = 'both',
}

export enum OneofOption {
  PROPERTIES = 'properties',
  UNIONS = 'unions',
}

export enum DateOption {
  DATE = 'date',
  TIMESTAMP = 'timestamp',
  STRING = 'string',
}

export type Options = {
  useContext: boolean;
  snakeToCamel: boolean;
  forceLong: LongOption;
  useOptionals: boolean;
  useDate: boolean | DateOption;
  oneof: OneofOption;
  outputEncodeMethods: boolean;
  outputJsonMethods: boolean;
  stringEnums: boolean;
  outputClientImpl: boolean | 'grpc-web';
  addGrpcMetadata: boolean;
  addNestjsRestParameter: boolean;
  returnObservable: boolean;
  lowerCaseServiceMethods: boolean;
  nestJs: boolean;
  env: EnvOption;
  addUnrecognizedEnum: boolean;
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

  // Indicate this file's source protobuf package for reflective use with google.protobuf.Any
  file = file.addCode(CodeBlock.empty().add(`export const protobufPackage = '%L'\n`, fileDesc.package));

  const sourceInfo = SourceInfo.fromDescriptor(fileDesc);

  // Syntax, unlike most fields, is not repeated and thus does not use an index
  const headerComment = sourceInfo.lookup(Fields.file.syntax, undefined);
  maybeAddComment(headerComment, (text) => (file = file.addComment(text)));

  // first make all the type declarations
  visit(
    fileDesc,
    sourceInfo,
    (fullName, message, sInfo) => {
      file = file.addInterface(generateInterfaceDeclaration(typeMap, fullName, message, sInfo, options));
    },
    options,
    (fullName, enumDesc, sInfo) => {
      file = file.addCode(generateEnum(options, fullName, enumDesc, sInfo));
    }
  );

  // If nestJs=true export [package]_PACKAGE_NAME and [service]_SERVICE_NAME const
  if (options.nestJs) {
    file = file.addCode(
      CodeBlock.empty().add(
        `export const %L = '%L'`,
        `${camelToSnake(fileDesc.package.replace(/\./g, '_'))}_PACKAGE_NAME`,
        fileDesc.package
      )
    );
  }

  if (options.outputEncodeMethods || options.outputJsonMethods) {
    // then add the encoder/decoder/base instance
    visit(
      fileDesc,
      sourceInfo,
      (fullName, message) => {
        file = file.addProperty(generateBaseInstance(typeMap, fullName, message, options));
        let staticMethods = CodeBlock.empty().add('export const %L = ', fullName).beginHash();

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

        staticMethods = staticMethods.endHash().add(';').newLine();
        file = file.addCode(staticMethods);
      },
      options
    );
  }

  visitServices(fileDesc, sourceInfo, (serviceDesc, sInfo) => {
    if (options.nestJs) {
      // NestJS is sufficiently different that we special case all of the client/server interfaces

      // generate nestjs grpc client interface
      file = file.addInterface(generateNestjsServiceClient(typeMap, fileDesc, sInfo, serviceDesc, options));
      // and the service controller interface
      file = file.addInterface(generateNestjsServiceController(typeMap, fileDesc, sInfo, serviceDesc, options));
      // generate nestjs grpc service controller decorator
      file = file.addFunction(generateNestjsGrpcServiceMethodsDecorator(serviceDesc, options));

      let serviceConstName = `${camelToSnake(serviceDesc.name)}_NAME`;
      if (!serviceDesc.name.toLowerCase().endsWith('service')) {
        serviceConstName = `${camelToSnake(serviceDesc.name)}_SERVICE_NAME`;
      }

      file = file.addCode(CodeBlock.empty().add(`export const %L = '%L';`, serviceConstName, serviceDesc.name));
    } else {
      // This could be twirp or grpc-web or JSON (maybe). So far all of their interaces
      // are fairly similar.
      file = file.addInterface(generateService(typeMap, fileDesc, sInfo, serviceDesc, options));

      if (options.outputClientImpl === true) {
        file = file.addClass(generateServiceClientImpl(typeMap, fileDesc, serviceDesc, options));
      } else if (options.outputClientImpl === 'grpc-web') {
        file = file.addClass(generateGrpcClientImpl(typeMap, fileDesc, serviceDesc, options));
        file = file.addCode(generateGrpcServiceDesc(fileDesc, serviceDesc));
        serviceDesc.method.forEach((method) => {
          file = file.addCode(generateGrpcMethodDesc(options, typeMap, serviceDesc, method));
        });
      }
    }
  });

  if (options.outputClientImpl && fileDesc.service.length > 0) {
    if (options.outputClientImpl === true) {
      file = file.addInterface(generateRpcType(options));
    } else if (options.outputClientImpl === 'grpc-web') {
      file = addGrpcWebMisc(options, file);
    }
  }

  if (options.useContext) {
    file = file.addInterface(generateDataLoaderOptionsType());
    file = file.addInterface(generateDataLoadersType());
  }

  let hasAnyTimestamps = false;
  visit(
    fileDesc,
    sourceInfo,
    (_, messageType) => {
      hasAnyTimestamps = hasAnyTimestamps || messageType.field.some(isTimestamp);
    },
    options
  );
  if (hasAnyTimestamps && (options.outputJsonMethods || options.outputEncodeMethods)) {
    file = addTimestampMethods(file, options);
  }

  const initialOutput = file.toString();
  // This `.includes(...)` is a pretty fuzzy way of detecting whether we use these utility
  // methods (to prevent outputting them if its not necessary). In theory, we should be able
  // to lean on the code generation library more to do this sort of "output only if used",
  // similar to what it does for auto-imports.
  if (
    initialOutput.includes('longToNumber') ||
    initialOutput.includes('numberToLong') ||
    initialOutput.includes('longToString')
  ) {
    file = addLongUtilityMethod(file, options);
  }
  if (initialOutput.includes('bytesFromBase64') || initialOutput.includes('base64FromBytes')) {
    file = addBytesUtilityMethods(file);
  }
  if (initialOutput.includes('DeepPartial')) {
    file = addDeepPartialType(file, options);
  }

  return file;
}

function addLongUtilityMethod(_file: FileSpec, options: Options): FileSpec {
  // Regardless of which `forceLong` config option we're using, we always use
  // the `long` library to either represent or at least sanity-check 64-bit values
  const util = TypeNames.anyType('util@protobufjs/minimal');
  const configure = TypeNames.anyType('configure@protobufjs/minimal');
  let file = _file.addCode(
    CodeBlock.empty()
      .beginControlFlow('if (%T.Long !== %T as any)', util, 'Long*long')
      .addStatement('%T.Long = %T as any', util, 'Long*long')
      .addStatement('%T()', configure)
      .endControlFlow()
  );

  if (options.forceLong === LongOption.LONG) {
    return file.addFunction(
      FunctionSpec.create('numberToLong')
        .addParameter('number', 'number')
        .addCodeBlock(CodeBlock.empty().addStatement('return %T.fromNumber(number)', 'Long*long'))
    );
  } else if (options.forceLong === LongOption.STRING) {
    return file.addFunction(
      FunctionSpec.create('longToString')
        .addParameter('long', 'Long*long')
        .addCodeBlock(CodeBlock.empty().addStatement('return long.toString()'))
    );
  } else {
    return file.addFunction(
      FunctionSpec.create('longToNumber').addParameter('long', 'Long*long').addCodeBlock(
        CodeBlock.empty()
          .beginControlFlow('if (long.gt(Number.MAX_SAFE_INTEGER))')
          // We use globalThis to avoid conflicts on protobuf types named `Error`.
          .addStatement('throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER")')
          .endControlFlow()
          .addStatement('return long.toNumber()')
      )
    );
  }
}

function addBytesUtilityMethods(file: FileSpec): FileSpec {
  return file.addCode(
    CodeBlock.of(`interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}`)
  );
}

function addDeepPartialType(file: FileSpec, options: Options): FileSpec {
  let oneofCase = '';
  if (options.oneof === OneofOption.UNIONS) {
    oneofCase = `
  : T extends { $case: string }
  ? { [K in keyof Omit<T, '$case'>]?: DeepPartial<T[K]> } & { $case: T['$case'] }`;
  }
  // Based on the type from ts-essentials
  return file.addCode(
    CodeBlock.empty().add(`type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>${oneofCase}
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;`)
  );
}

function addTimestampMethods(file: FileSpec, options: Options): FileSpec {
  const timestampType = 'Timestamp@./google/protobuf/timestamp';

  let toNumberCode = 'value.seconds';
  let secondsCodeLine = 'const seconds = value.getTime() / 1_000';
  if (options.forceLong === LongOption.LONG) {
    toNumberCode = 'value.seconds.toNumber()';
    secondsCodeLine = 'const seconds = numberToLong(value.getTime() / 1_000)';
  } else if (options.forceLong === LongOption.STRING) {
    toNumberCode = 'Number(value.seconds)';
    secondsCodeLine = 'const seconds = (value.getTime() / 1_000).toString()';
  }

  let returnType = 'Date';
  let toTimestampCodeBlock = CodeBlock.empty()
    .addStatement(secondsCodeLine)
    .addStatement('const nanos = (value.getTime() %% 1_000) * 1_000_000')
    .addStatement('return { seconds, nanos }');
  let fromTimestampCodeBlock = CodeBlock.empty()
    .addStatement('let millis = %L * 1_000', toNumberCode)
    .addStatement('millis += value.nanos / 1_000_000')
    .addStatement('return new Date(millis)');

  if (options.outputJsonMethods) {
    let fromJsonTimestampCodeBlock = CodeBlock.empty()
      .beginControlFlow('if (o instanceof Date)')
      .addStatement('return o')
      .nextControlFlow('else if (typeof o === "string")')
      .addStatement('return new Date(o)')
      .nextControlFlow('else')
      .addStatement('return fromTimestamp(Timestamp.fromJSON(o))')
      .endControlFlow();

    if (options.useDate === DateOption.STRING) {
      returnType = 'string';
      fromJsonTimestampCodeBlock = CodeBlock.empty()
        .beginControlFlow('if (o instanceof Date)')
        .addStatement('return o.toISOString()')
        .nextControlFlow('else if (typeof o === "string")')
        .addStatement('return o')
        .nextControlFlow('else')
        .addStatement('return fromTimestamp(Timestamp.fromJSON(o))')
        .endControlFlow();
      toTimestampCodeBlock = CodeBlock.empty()
        .addStatement('const date = new Date(value)')
        .addStatement('const seconds = date.getTime() / 1_000')
        .addStatement('const nanos = (date.getTime() %% 1_000) * 1_000_000')
        .addStatement('return { seconds, nanos }');
      fromTimestampCodeBlock = CodeBlock.empty()
        .addStatement('let millis = %L * 1_000', toNumberCode)
        .addStatement('millis += value.nanos / 1_000_000')
        .addStatement('return new Date(millis).toISOString()');
    }

    file = file.addFunction(
      FunctionSpec.create('fromJsonTimestamp')
        .addParameter('o', 'any')
        .returns(returnType)
        .addCodeBlock(fromJsonTimestampCodeBlock)
    );
  }

  return file
    .addFunction(
      FunctionSpec.create('toTimestamp')
        .addParameter('value', returnType)
        .returns(timestampType)
        .addCodeBlock(toTimestampCodeBlock)
    )
    .addFunction(
      FunctionSpec.create('fromTimestamp')
        .addParameter('value', timestampType)
        .returns(returnType)
        .addCodeBlock(fromTimestampCodeBlock)
    );
}

const UNRECOGNIZED_ENUM_NAME = 'UNRECOGNIZED';
const UNRECOGNIZED_ENUM_VALUE = -1;

function generateEnum(
  options: Options,
  fullName: string,
  enumDesc: EnumDescriptorProto,
  sourceInfo: SourceInfo
): CodeBlock {
  let code = CodeBlock.empty();

  // Output the `enum { Foo, A = 0, B = 1 }`
  maybeAddComment(sourceInfo, (text) => (code = code.add(`/** %L */\n`, text)));
  code = code.beginControlFlow('export enum %L', fullName);
  enumDesc.value.forEach((valueDesc, index) => {
    const info = sourceInfo.lookup(Fields.enum.value, index);
    maybeAddComment(info, (text) => (code = code.add(`/** ${valueDesc.name} - ${text} */\n`)));
    code = code.add(
      '%L = %L,\n',
      valueDesc.name,
      options.stringEnums ? `"${valueDesc.name}"` : valueDesc.number.toString()
    );
  });
  if (options.addUnrecognizedEnum)
    code = code.add(
      '%L = %L,\n',
      UNRECOGNIZED_ENUM_NAME,
      options.stringEnums ? `"${UNRECOGNIZED_ENUM_NAME}"` : UNRECOGNIZED_ENUM_VALUE.toString()
    );
  code = code.endControlFlow();

  if (options.outputJsonMethods) {
    code = code.add('\n');
    code = code.addFunction(generateEnumFromJson(fullName, enumDesc, options));
    code = code.add('\n');
    code = code.addFunction(generateEnumToJson(fullName, enumDesc));
  }

  return code;
}

/** Generates a function with a big switch statement to decode JSON -> our enum. */
function generateEnumFromJson(fullName: string, enumDesc: EnumDescriptorProto, options: Options): FunctionSpec {
  let func = FunctionSpec.create(`${camelCase(fullName)}FromJSON`)
    .addModifiers(Modifier.EXPORT)
    .addParameter('object', 'any')
    .returns(fullName);
  let body = CodeBlock.empty().beginControlFlow('switch (object)');
  for (const valueDesc of enumDesc.value) {
    body = body
      .add('case %L:\n', valueDesc.number)
      .add('case %S:%>\n', valueDesc.name)
      .addStatement('return %L.%L%<', fullName, valueDesc.name);
  }
  if (options.addUnrecognizedEnum) {
    body = body
      .add('case %L:\n', UNRECOGNIZED_ENUM_VALUE)
      .add('case %S:\n', UNRECOGNIZED_ENUM_NAME)
      .add('default:%>\n')
      .addStatement('return %L.%L%<', fullName, UNRECOGNIZED_ENUM_NAME);
  } else {
    body = body
      .add('default:%>\n')
      .addStatement('throw new Error("Unrecognized enum value " + %L + " for enum %L")%<', 'object', fullName);
  }
  body = body.endControlFlow();
  return func.addCodeBlock(body);
}

/** Generates a function with a big switch statement to encode our enum -> JSON. */
function generateEnumToJson(fullName: string, enumDesc: EnumDescriptorProto): FunctionSpec {
  let func = FunctionSpec.create(`${camelCase(fullName)}ToJSON`)
    .addModifiers(Modifier.EXPORT)
    .addParameter('object', fullName)
    .returns('string');
  let body = CodeBlock.empty().beginControlFlow('switch (object)');
  for (const valueDesc of enumDesc.value) {
    body = body.add('case %L.%L:%>\n', fullName, valueDesc.name).addStatement('return %S%<', valueDesc.name);
  }
  body = body.add('default:%>\n').addStatement('return "UNKNOWN"%<').endControlFlow();
  return func.addCodeBlock(body);
}

// When useOptionals=true, non-scalar fields are translated into optional properties.
function isOptionalProperty(field: FieldDescriptorProto, options: Options): boolean {
  return (
    (options.useOptionals && isMessage(field) && !isRepeated(field)) ||
    field.proto3Optional ||
    field.label === FieldDescriptorProto.Label.LABEL_OPTIONAL
  );
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
  maybeAddComment(sourceInfo, (text) => (message = message.addJavadoc(text)));

  let processedOneofs = new Set<number>();
  messageDesc.field.forEach((fieldDesc, index) => {
    // When oneof=unions, we generate a single property with an algebraic
    // datatype (ADT) per `oneof` clause.
    if (isWithinOneOfThatShouldBeUnion(options, fieldDesc)) {
      const { oneofIndex } = fieldDesc;
      if (!processedOneofs.has(oneofIndex)) {
        processedOneofs.add(oneofIndex);
        const prop = generateOneofProperty(typeMap, messageDesc, oneofIndex, sourceInfo, options);
        message = message.addProperty(prop);
      }
      return;
    }

    let prop = PropertySpec.create(
      maybeSnakeToCamel(fieldDesc.name, options),
      toTypeName(typeMap, messageDesc, fieldDesc, options),
      isOptionalProperty(fieldDesc, options)
    );

    const info = sourceInfo.lookup(Fields.message.field, index);
    maybeAddComment(info, (text) => (prop = prop.addJavadoc(text)));

    message = message.addProperty(prop);
  });
  return message;
}

function generateOneofProperty(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  oneofIndex: number,
  sourceInfo: SourceInfo,
  options: Options
): PropertySpec {
  let fields = messageDesc.field.filter((field) => {
    return isWithinOneOf(field) && field.oneofIndex === oneofIndex;
  });
  let unionType = TypeNames.unionType(
    ...fields.map((f) => {
      let fieldName = maybeSnakeToCamel(f.name, options);
      let typeName = toTypeName(typeMap, messageDesc, f, options);
      return TypeNames.anonymousType(
        new Member('$case', TypeNames.typeLiteral(fieldName), false),
        new Member(fieldName, typeName, /* optional */ false)
      );
    })
  );
  let prop = PropertySpec.create(
    maybeSnakeToCamel(messageDesc.oneofDecl[oneofIndex].name, options),
    unionType,
    true // optional
  );

  // Ideally we'd put the comments for each oneof field next to the anonymous
  // type we've created in the type union above, but ts-poet currently lacks
  // that ability. For now just concatenate all comments into one big one.
  let comments: Array<string> = [];
  const info = sourceInfo.lookup(Fields.message.oneof_decl, oneofIndex);
  maybeAddComment(info, (text) => comments.push(text));
  messageDesc.field.forEach((field, index) => {
    if (!isWithinOneOf(field) || field.oneofIndex !== oneofIndex) {
      return;
    }
    const info = sourceInfo.lookup(Fields.message.field, index);
    const name = maybeSnakeToCamel(field.name, options);
    maybeAddComment(info, (text) => comments.push(name + '\n' + text));
  });
  if (comments.length) {
    prop = prop.addJavadoc(comments.join('\n'));
  }
  return prop;
}

function generateBaseInstance(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto, options: Options) {
  // Create a 'base' instance with default values for decode to use as a prototype
  let baseMessage = PropertySpec.create('base' + fullName, TypeNames.anyType('object')).addModifiers(Modifier.CONST);
  let initialValue = CodeBlock.empty().beginHash();
  messageDesc.field
    .filter(field => !isWithinOneOf(field))
    .forEach((field) => {
      let val = defaultValue(typeMap, field, options);
      if (val === 'undefined' || isBytes(field)) {
        return;
      }
      initialValue = initialValue.addHashEntry(maybeSnakeToCamel(field.name, options), val);
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

  proto.enumType.forEach((enumDesc, index) => {
    // I.e. Foo_Bar.Zaz_Inner
    const protoFullName = protoPrefix + enumDesc.name;
    // I.e. FooBar_ZazInner
    const tsFullName = tsPrefix + maybeSnakeToCamel(enumDesc.name, options);
    const nestedSourceInfo = sourceInfo.open(childEnumType, index);
    enumFn(tsFullName, enumDesc, nestedSourceInfo, protoFullName);
  });

  const messages = proto instanceof FileDescriptorProto ? proto.messageType : proto.nestedType;
  const childType = isRootFile ? Fields.file.message_type : Fields.message.nested_type;

  messages.forEach((message, index) => {
    // I.e. Foo_Bar.Zaz_Inner
    const protoFullName = protoPrefix + message.name;
    // I.e. FooBar_ZazInner
    const tsFullName = tsPrefix + maybeSnakeToCamel(messageName(message), options);
    const nestedSourceInfo = sourceInfo.open(childType, index);
    messageFn(tsFullName, message, nestedSourceInfo, protoFullName);
    visit(message, nestedSourceInfo, messageFn, options, enumFn, tsFullName + '_', protoFullName + '.');
  });
}

function visitServices(
  proto: FileDescriptorProto,
  sourceInfo: SourceInfo,
  serviceFn: (desc: ServiceDescriptorProto, sourceInfo: SourceInfo) => void
): void {
  proto.service.forEach((serviceDesc, index) => {
    const nestedSourceInfo = sourceInfo.open(Fields.file.service, index);
    serviceFn(serviceDesc, nestedSourceInfo);
  });
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
    .addParameter('input', TypeNames.unionType('Uint8Array', 'Reader@protobufjs/minimal'))
    .addParameter('length?', 'number')
    .returns(fullName);

  // add the initial end/message
  func = func
    .addStatement('const reader = input instanceof Uint8Array ? new Reader(input) : input')
    .addStatement('let end = length === undefined ? reader.len : reader.pos + length')
    .addStatement('const message = { ...base%L } as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach((field) => {
    const value = isMapType(typeMap, messageDesc, field, options) ? '{}' : '[]';
    func = func.addStatement('message.%L = %L', maybeSnakeToCamel(field.name, options), value);
  });

  // start the tag loop
  func = func
    .beginControlFlow('while (reader.pos < end)')
    .addStatement('const tag = reader.uint32()')
    .beginControlFlow('switch (tag >>> 3)');

  // add a case for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);
    func = func.addCode('case %L:%>\n', field.number);

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    let readSnippet: CodeBlock;
    if (isPrimitive(field)) {
      readSnippet = CodeBlock.of('reader.%L()', toReaderCall(field));
      if (isBytes(field)) {
        if (options.env === EnvOption.NODE) {
          readSnippet = readSnippet.add(' as Buffer');
        }
      } else if (basicLongWireType(field.type) !== undefined) {
        if (options.forceLong === LongOption.LONG) {
          readSnippet = CodeBlock.of('%L as Long', readSnippet);
        } else if (options.forceLong === LongOption.STRING) {
          readSnippet = CodeBlock.of('longToString(%L as Long)', readSnippet);
        } else {
          readSnippet = CodeBlock.of('longToNumber(%L as Long)', readSnippet);
        }
      } else if (isEnum(field)) {
        readSnippet = readSnippet.add(' as any');
      }
    } else if (isValueType(field)) {
      readSnippet = CodeBlock.of(
        '%T.decode(reader, reader.uint32()).value',
        basicTypeName(typeMap, field, options, { keepValueType: true })
      );
    } else if (isProcessableTimestamp(field, options)) {
      readSnippet = CodeBlock.of(
        'fromTimestamp(%T.decode(reader, reader.uint32()))',
        basicTypeName(typeMap, field, options, { keepValueType: true })
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
          .beginControlFlow('if (%L.value !== undefined)', entryVariableName)
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
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      let oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      func = func.addStatement(`message.%L = {$case: '%L', %L: %L}`, oneofName, fieldName, fieldName, readSnippet);
    } else {
      func = func.addStatement(`message.%L = %L`, fieldName, readSnippet);
    }
    func = func.addStatement('break%<');
  });
  func = func.addCode('default:%>\n').addStatement('reader.skipType(tag & 7)').addStatement('break%<');
  // and then wrap up the switch/while/return
  func = func.endControlFlow().endControlFlow().addStatement('return message');
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
    .addParameter(messageDesc.field.length > 0 ? 'message' : '_', fullName)
    .addParameter('writer', 'Writer@protobufjs/minimal', { defaultValueField: CodeBlock.of('Writer.create()') })
    .returns('Writer@protobufjs/minimal');
  // then add a case for each field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    // get a generic writer.doSomething based on the basic type
    let writeSnippet: (place: string) => CodeBlock;
    if (isPrimitive(field)) {
      const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
      writeSnippet = (place) => CodeBlock.of('writer.uint32(%L).%L(%L)', tag, toReaderCall(field), place);
    } else if (isTimestamp(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      writeSnippet = (place) => {
        let code = '%T.encode(toTimestamp(%L), writer.uint32(%L).fork()).ldelim()';
        if (options.useDate === DateOption.TIMESTAMP) {
          code = '%T.encode(%L, writer.uint32(%L).fork()).ldelim()';
        }
        return CodeBlock.of(code, basicTypeName(typeMap, field, options, { keepValueType: true }), place, tag);
      };
    } else if (isValueType(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      writeSnippet = (place) =>
        CodeBlock.of(
          '%T.encode({ value: %L! }, writer.uint32(%L).fork()).ldelim()',
          basicTypeName(typeMap, field, options, { keepValueType: true }),
          place,
          tag
        );
    } else if (isMessage(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      writeSnippet = (place) =>
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
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      let oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      func = func
        .beginControlFlow(`if (message.%L?.$case === '%L')`, oneofName, fieldName)
        .addStatement('%L', writeSnippet(`message.${oneofName}.${fieldName}`))
        .endControlFlow();
    } else if (isWithinOneOf(field)) {
      // Oneofs don't have a default value check b/c they need to denote which-oneof presence
      func = func
        .beginControlFlow('if (message.%L !== undefined)', fieldName)
        .addStatement('%L', writeSnippet(`message.${fieldName}`))
        .endControlFlow();
    } else if (isMessage(field)) {
      func = func
        .beginControlFlow(
          'if (message.%L !== undefined && message.%L !== %L)',
          fieldName,
          fieldName,
          defaultValue(typeMap, field, options)
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
    .addParameter(messageDesc.field.length > 0 ? 'object' : '_', 'any')
    .returns(fullName);

  // create the message
  func = func.addStatement('const message = { ...base%L } as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach((field) => {
    const value = isMapType(typeMap, messageDesc, field, options) ? '{}' : '[]';
    func = func.addStatement('message.%L = %L', maybeSnakeToCamel(field.name, options), value);
  });

  // add a check for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    const readSnippet = (from: string): CodeBlock => {
      if (isEnum(field)) {
        const fromJson = getEnumMethod(typeMap, field.typeName, 'FromJSON');
        return CodeBlock.of('%T(%L)', fromJson, from);
      } else if (isPrimitive(field)) {
        // Convert primitives using the String(value)/Number(value)/bytesFromBase64(value)
        if (isBytes(field)) {
          if (options.env === EnvOption.NODE) {
            return CodeBlock.of('Buffer.from(bytesFromBase64(%L))', from);
          } else {
            return CodeBlock.of('bytesFromBase64(%L)', from);
          }
        } else if (isLong(field) && options.forceLong === LongOption.LONG) {
          const cstr = capitalize(basicTypeName(typeMap, field, options, { keepValueType: true }).toString());
          return CodeBlock.of('%L.fromString(%L)', cstr, from);
        } else {
          const cstr = capitalize(basicTypeName(typeMap, field, options, { keepValueType: true }).toString());
          return CodeBlock.of('%L(%L)', cstr, from);
        }
      } else if (isTimestamp(field)) {
        let code = 'fromJsonTimestamp(%L)';
        if (options.useDate === DateOption.TIMESTAMP) {
          code = 'Timestamp.fromJSON(%L)';
        }
        return CodeBlock.of(code, from);
      } else if (isValueType(field)) {
        const valueType = valueTypeName(field.typeName, options)!;
        if (isLongValueType(field)) {
          return CodeBlock.of('%L.fromValue(%L)', capitalize(valueType.toString()), from);
        } else {
          return CodeBlock.of('%L(%L)', capitalize(valueType.toString()), from);
        }
      } else if (isMessage(field)) {
        if (isRepeated(field) && isMapType(typeMap, messageDesc, field, options)) {
          const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
          if (isPrimitive(valueType)) {
            // TODO Can we not copy/paste this from ^?
            if (isBytes(valueType)) {
              if (options.env === EnvOption.NODE) {
                return CodeBlock.of('Buffer.from(bytesFromBase64(%L as string))', from);
              } else {
                return CodeBlock.of('bytesFromBase64(%L as string)', from);
              }
            } else if (isEnum(valueType)) {
              return CodeBlock.of('%L as number', from);
            } else {
              const cstr = capitalize(basicTypeName(typeMap, valueType, options).toString());
              return CodeBlock.of('%L(%L)', cstr, from);
            }
          } else if (isProcessableTimestamp(valueType, options)) {
            return CodeBlock.of('fromJsonTimestamp(%L)', from);
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
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      let oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      func = func.addStatement(
        `message.%L = {$case: '%L', %L: %L}`,
        oneofName,
        fieldName,
        fieldName,
        readSnippet(`object.${fieldName}`)
      );
    } else {
      func = func.addStatement(`message.%L = %L`, fieldName, readSnippet(`object.${fieldName}`));
    }

    // set the default value (TODO Support bytes)
    if (
      !isRepeated(field) &&
      field.type !== FieldDescriptorProto.Type.TYPE_BYTES &&
      options.oneof !== OneofOption.UNIONS
    ) {
      func = func.nextControlFlow('else');
      func = func.addStatement(
        `message.%L = %L`,
        fieldName,
        isWithinOneOf(field) ? 'undefined' : defaultValue(typeMap, field, options)
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
    .addParameter(messageDesc.field.length > 0 ? 'message' : '_', fullName)
    .returns('unknown');
  func = func.addCodeBlock(CodeBlock.empty().addStatement('const obj: any = {}'));
  // then add a case for each field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    const readSnippet = (from: string): CodeBlock => {
      if (isEnum(field)) {
        const toJson = getEnumMethod(typeMap, field.typeName, 'ToJSON');
        return isWithinOneOf(field)
          ? CodeBlock.of('%L !== undefined ? %T(%L) : undefined', from, toJson, from)
          : CodeBlock.of('%T(%L)', toJson, from);
      } else if (isTimestamp(field)) {
        let code = '%L !== undefined ? %L.toISOString() : null';
        if (options.useDate !== DateOption.DATE) {
          code = '%L !== undefined ? %L : null';
        }
        return CodeBlock.of(code, from, from);
      } else if (isMapType(typeMap, messageDesc, field, options)) {
        // For map types, drill-in and then admittedly re-hard-code our per-value-type logic
        const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
        if (isEnum(valueType)) {
          const toJson = getEnumMethod(typeMap, valueType.typeName, 'ToJSON');
          return CodeBlock.of('%T(%L)', toJson, from);
        } else if (isBytes(valueType)) {
          return CodeBlock.of('base64FromBytes(%L)', from);
        } else if (isTimestamp(valueType)) {
          let code = '%L.toISOString()';
          if (options.useDate === DateOption.STRING) {
            code = '%L !== undefined ? %L : null';
          }
          if (options.useDate === DateOption.TIMESTAMP) {
            code = '%L !== undefined ? %L : null';
          }
          return CodeBlock.of(code, from);
        } else if (isPrimitive(valueType)) {
          return CodeBlock.of('%L', from);
        } else {
          return CodeBlock.of('%T.toJSON(%L)', basicTypeName(typeMap, valueType, options).toString(), from);
        }
      } else if (isMessage(field) && !isValueType(field) && !isMapType(typeMap, messageDesc, field, options)) {
        return CodeBlock.of(
          '%L ? %T.toJSON(%L) : %L',
          from,
          basicTypeName(typeMap, field, options, { keepValueType: true }),
          from,
          defaultValue(typeMap, field, options)
        );
      } else if (isBytes(field)) {
        if (isWithinOneOf(field)) {
          return CodeBlock.of('%L !== undefined ? base64FromBytes(%L) : undefined', from, from);
        } else {
          return CodeBlock.of(
            'base64FromBytes(%L !== undefined ? %L : %L)',
            from,
            from,
            defaultValue(typeMap, field, options)
          );
        }
      } else if (isLong(field) && options.forceLong === LongOption.LONG) {
        return CodeBlock.of(
          '(%L || %L).toString()',
          from,
          isWithinOneOf(field) ? 'undefined' : defaultValue(typeMap, field, options)
        );
      } else {
        return CodeBlock.of('%L', from);
      }
    };

    if (isMapType(typeMap, messageDesc, field, options)) {
      // Maps might need their values transformed, i.e. bytes --> base64
      func = func
        .addStatement('obj.%L = {}', fieldName)
        .beginControlFlow('if (message.%L)', fieldName)
        .beginLambda('Object.entries(message.%L).forEach(([k, v]) =>', fieldName)
        .addStatement('obj.%L[k] = %L', fieldName, readSnippet('v'))
        .endLambda(')')
        .endControlFlow();
    } else if (isRepeated(field)) {
      // Arrays might need their elements transformed
      func = func
        .beginControlFlow('if (message.%L)', fieldName)
        .addStatement('obj.%L = message.%L.map(e => %L)', fieldName, fieldName, readSnippet('e'))
        .nextControlFlow('else')
        .addStatement('obj.%L = []', fieldName)
        .endControlFlow();
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      // oneofs in a union are only output as `oneof name = ...`
      let oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      func = func.addStatement(
        `message.%L?.$case === '%L' && (obj.%L = %L)`,
        oneofName,
        fieldName,
        fieldName,
        readSnippet(`message.${oneofName}?.${fieldName}`)
      );
    } else {
      func = func.addStatement(
        'message.%L !== undefined && (obj.%L = %L)',
        fieldName,
        fieldName,
        readSnippet(`message.${fieldName}`)
      );
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
    .addParameter(messageDesc.field.length > 0 ? 'object' : '_', `DeepPartial<${fullName}>`)
    .returns(fullName);
  // create the message
  func = func.addStatement('const message = { ...base%L } as %L', fullName, fullName);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach((field) => {
    const value = isMapType(typeMap, messageDesc, field, options) ? '{}' : '[]';
    func = func.addStatement('message.%L = %L', maybeSnakeToCamel(field.name, options), value);
  });

  // add a check for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    const readSnippet = (from: string): CodeBlock => {
      if (isEnum(field) || isPrimitive(field) || isTimestamp(field) || isValueType(field)) {
        if (isTimestamp(field) && options.useDate === DateOption.TIMESTAMP) {
          return CodeBlock.of('%T.fromPartial(%L)', basicTypeName(typeMap, field, options), from);
        }
        return CodeBlock.of(from);
      } else if (isMessage(field)) {
        if (isRepeated(field) && isMapType(typeMap, messageDesc, field, options)) {
          const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
          if (isPrimitive(valueType)) {
            if (isBytes(valueType)) {
              return CodeBlock.of('%L', from);
            } else if (isEnum(valueType)) {
              return CodeBlock.of('%L as number', from);
            } else {
              const cstr = capitalize(basicTypeName(typeMap, valueType, options).toString());
              return CodeBlock.of('%L(%L)', cstr, from);
            }
          } else if (isProcessableTimestamp(valueType, options)) {
            return CodeBlock.of('%L', from);
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
    if (isRepeated(field)) {
      func = func.beginControlFlow('if (object.%L !== undefined && object.%L !== null)', fieldName, fieldName);
      if (isMapType(typeMap, messageDesc, field, options)) {
        func = func
          .beginLambda('Object.entries(object.%L).forEach(([key, value]) =>', fieldName)
          .beginControlFlow('if (value !== undefined)')
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
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      let oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      func = func
        .beginControlFlow(
          `if (object.%L?.$case === '%L' && object.%L?.%L !== undefined && object.%L?.%L !== null)`,
          oneofName,
          fieldName,
          oneofName,
          fieldName,
          oneofName,
          fieldName
        )
        .addStatement(
          `message.%L = {$case: '%L', %L: %L}`,
          oneofName,
          fieldName,
          fieldName,
          readSnippet(`object.${oneofName}.${fieldName}`)
        );
    } else {
      func = func.beginControlFlow('if (object.%L !== undefined && object.%L !== null)', fieldName, fieldName);
      if ((isLong(field) || isLongValueType(field)) && options.forceLong === LongOption.LONG) {
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

    if (!isRepeated(field) && options.oneof !== OneofOption.UNIONS) {
      func = func.nextControlFlow('else');
      func = func.addStatement(
        `message.%L = %L`,
        fieldName,
        isWithinOneOf(field) ? 'undefined' : defaultValue(typeMap, field, options)
      );
    }

    func = func.endControlFlow();
  });

  // and then wrap up the switch/while/return
  return func.addStatement('return message');
}

export const contextTypeVar = TypeNames.typeVariable('Context', TypeNames.bound('DataLoaders'));

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

const builtInNames = ['Date'];

/** Potentially suffixes `Message` to names to avoid conflicts, i.e. with `Date`. */
function messageName(message: DescriptorProto): string {
  const { name } = message;
  return builtInNames.includes(name) ? `${name}Message` : name;
}
