import { code, Code, imp, joinCode } from 'ts-poet';
import { google } from '../build/pbjs';
import {
  basicLongWireType,
  basicTypeName,
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
  isWithinOneOfThatShouldBeUnion,
  packedType,
  toReaderCall,
  toTypeName,
  TypeMap,
} from './types';
import SourceInfo, { Fields } from './sourceInfo';
import { maybeAddComment, optionsFromParameter } from './utils';
import { camelCase, camelToSnake, maybeSnakeToCamel } from './case';
import {
  generateNestjsGrpcServiceMethodsDecorator,
  generateNestjsServiceClient,
  generateNestjsServiceController,
} from './generate-nestjs';
import {
  generateDataLoaderOptionsType,
  generateDataLoadersType,
  generateRpcType,
  generateService,
  generateServiceClientImpl,
} from './generate-services';
import { addGrpcWebMisc, generateGrpcClientImpl, generateGrpcMethodDesc } from './generate-grpc-web';
import DescriptorProto = google.protobuf.DescriptorProto;
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import FileDescriptorProto = google.protobuf.FileDescriptorProto;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;
import ServiceDescriptorProto = google.protobuf.ServiceDescriptorProto;

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

export type Options = {
  useContext: boolean;
  snakeToCamel: boolean;
  forceLong: LongOption;
  useOptionals: boolean;
  useDate: boolean;
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

export function generateFile(typeMap: TypeMap, fileDesc: FileDescriptorProto, parameter: string): [string, Code] {
  const options = optionsFromParameter(parameter);

  // Google's protofiles are organized like Java, where package == the folder the file
  // is in, and file == a specific service within the package. I.e. you can have multiple
  // company/foo.proto and company/bar.proto files, where package would be 'company'.
  //
  // We'll match that structure by setting up the module path as:
  //
  // company/foo.proto --> company/foo.ts
  // company/bar.proto --> company/bar.ts
  //
  // We'll also assume that the fileDesc.name is already the `company/foo.proto` path, with
  // the package already implicitly in it, so we won't re-append/strip/etc. it out/back in.
  const moduleName = fileDesc.name.replace('.proto', '.ts');
  const chunks: Code[] = [];

  chunks.push(code`/* eslint-disable */`);

  // Indicate this file's source protobuf package for reflective use with google.protobuf.Any
  chunks.push(code`export const protobufPackage = '${fileDesc.package}';`);

  // Syntax, unlike most fields, is not repeated and thus does not use an index
  const sourceInfo = SourceInfo.fromDescriptor(fileDesc);
  const headerComment = sourceInfo.lookup(Fields.file.syntax, undefined);
  maybeAddComment(headerComment, (text) => chunks.push(code`${text}`));

  // first make all the type declarations
  visit(
    fileDesc,
    sourceInfo,
    (fullName, message, sInfo) => {
      chunks.push(generateInterfaceDeclaration(typeMap, fullName, message, sInfo, options));
    },
    options,
    (fullName, enumDesc, sInfo) => {
      chunks.push(generateEnum(options, fullName, enumDesc, sInfo));
    }
  );

  // If nestJs=true export [package]_PACKAGE_NAME and [service]_SERVICE_NAME const
  if (options.nestJs) {
    const prefix = camelToSnake(fileDesc.package.replace(/\./g, '_'));
    chunks.push(code`export const ${prefix}_PACKAGE_NAME = '${fileDesc.package}';`);
  }

  if (options.outputEncodeMethods || options.outputJsonMethods) {
    // then add the encoder/decoder/base instance
    visit(
      fileDesc,
      sourceInfo,
      (fullName, message) => {
        chunks.push(generateBaseInstance(typeMap, fullName, message, options));

        /*
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
         */
      },
      options
    );
  }

  let hasStreamingMethods = false;

  visitServices(fileDesc, sourceInfo, (serviceDesc, sInfo) => {
    if (options.nestJs) {
      // NestJS is sufficiently different that we special case all of the client/server interfaces

      // generate nestjs grpc client interface
      chunks.push(generateNestjsServiceClient(typeMap, fileDesc, sInfo, serviceDesc, options));
      // and the service controller interface
      chunks.push(generateNestjsServiceController(typeMap, fileDesc, sInfo, serviceDesc, options));
      // generate nestjs grpc service controller decorator
      chunks.push(generateNestjsGrpcServiceMethodsDecorator(serviceDesc, options));

      let serviceConstName = `${camelToSnake(serviceDesc.name)}_NAME`;
      if (!serviceDesc.name.toLowerCase().endsWith('service')) {
        serviceConstName = `${camelToSnake(serviceDesc.name)}_SERVICE_NAME`;
      }

      chunks.push(code`export const ${serviceConstName} = "${serviceDesc.name}";`);
    } else {
      // This service could be Twirp or grpc-web or JSON (maybe). So far all of their
      // interfaces are fairly similar so we share the same service interface.
      chunks.push(generateService(typeMap, fileDesc, sInfo, serviceDesc, options));

      if (options.outputClientImpl === true) {
        chunks.push(generateServiceClientImpl(typeMap, fileDesc, serviceDesc, options));
      } else if (options.outputClientImpl === 'grpc-web') {
        chunks.push(generateGrpcClientImpl(typeMap, fileDesc, serviceDesc, options));
        // chunks.push(generateGrpcServiceDesc(fileDesc, serviceDesc));
        serviceDesc.method.forEach((method) => {
          chunks.push(generateGrpcMethodDesc(options, typeMap, serviceDesc, method));
          if (method.serverStreaming) {
            hasStreamingMethods = true;
          }
        });
      }
    }
  });

  if (options.outputClientImpl && fileDesc.service.length > 0) {
    if (options.outputClientImpl === true) {
      chunks.push(generateRpcType(options));
    } else if (options.outputClientImpl === 'grpc-web') {
      chunks.push(addGrpcWebMisc(options, hasStreamingMethods));
    }
  }

  if (options.useContext) {
    chunks.push(generateDataLoaderOptionsType());
    chunks.push(generateDataLoadersType());
  }

  /*
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
   */

  return [moduleName, joinCode(chunks, '\n\n')];
}

/*
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
 */

/*
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
 */

/*
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
export type DeepPartial<T> = T extends Builtin
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
 */

/*
function addTimestampMethods(file: FileSpec, options: Options): FileSpec {
  const timestampType = 'Timestamp@./google/protobuf/timestamp';

  let secondsCodeLine = 'const seconds = date.getTime() / 1_000';
  let toNumberCode = 't.seconds';
  if (options.forceLong === LongOption.LONG) {
    toNumberCode = 't.seconds.toNumber()';
    secondsCodeLine = 'const seconds = numberToLong(date.getTime() / 1_000)';
  } else if (options.forceLong === LongOption.STRING) {
    toNumberCode = 'Number(t.seconds)';
    secondsCodeLine = 'const seconds = (date.getTime() / 1_000).toString()';
  }

  if (options.outputJsonMethods) {
    file = file.addFunction(
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
    );
}

 */

const UNRECOGNIZED_ENUM_NAME = 'UNRECOGNIZED';
const UNRECOGNIZED_ENUM_VALUE = -1;

// Output the `enum { Foo, A = 0, B = 1 }`
function generateEnum(options: Options, fullName: string, enumDesc: EnumDescriptorProto, sourceInfo: SourceInfo): Code {
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, (text) => chunks.push(code`${text}`));
  chunks.push(code`export enum ${fullName} {`);

  enumDesc.value.forEach((valueDesc, index) => {
    const info = sourceInfo.lookup(Fields.enum.value, index);
    maybeAddComment(info, (text) => chunks.push(code`${text}`), `${valueDesc.name} - `);
    chunks.push(
      code`${valueDesc.name} = ${options.stringEnums ? `"${valueDesc.name}"` : valueDesc.number.toString()},`
    );
  });

  if (options.addUnrecognizedEnum)
    chunks.push(code`
      ${UNRECOGNIZED_ENUM_NAME} = ${
      options.stringEnums ? `"${UNRECOGNIZED_ENUM_NAME}"` : UNRECOGNIZED_ENUM_VALUE.toString()
    },`);
  chunks.push(code`}`);

  if (options.outputJsonMethods) {
    chunks.push(code`\n`);
    chunks.push(generateEnumFromJson(fullName, enumDesc, options));
    chunks.push(code`\n`);
    chunks.push(generateEnumToJson(fullName, enumDesc));
  }

  return code`${chunks}`;
}

/** Generates a function with a big switch statement to decode JSON -> our enum. */
function generateEnumFromJson(fullName: string, enumDesc: EnumDescriptorProto, options: Options): Code {
  const chunks: Code[] = [];

  chunks.push(code`export function ${camelCase(fullName)}FromJSON(object: any): ${fullName} {`);
  chunks.push(code`switch (object) {`);

  for (const valueDesc of enumDesc.value) {
    chunks.push(code`
      case ${valueDesc.number}:
      case "${valueDesc.name}":
        return ${fullName}.${valueDesc.name};
    `);
  }

  if (options.addUnrecognizedEnum) {
    chunks.push(code`
      case ${UNRECOGNIZED_ENUM_VALUE}:
      case "${UNRECOGNIZED_ENUM_NAME}":
      default:
        return ${fullName}.${UNRECOGNIZED_ENUM_NAME};
    `);
  } else {
    // We use globalThis to avoid conflicts on protobuf types named `Error`.
    chunks.push(code`
      default:
        throw new globalThis.Error("Unrecognized enum value " + object + " for enum ${fullName}");
    `);
  }

  chunks.push(code`}`);
  chunks.push(code`}`);
  return code`${chunks}`;
}

/** Generates a function with a big switch statement to encode our enum -> JSON. */
function generateEnumToJson(fullName: string, enumDesc: EnumDescriptorProto): Code {
  const chunks: Code[] = [];

  chunks.push(code`export function ${camelCase(fullName)}ToJSON(object: ${fullName}): string {`);
  chunks.push(code`switch (object) {`);

  for (const valueDesc of enumDesc.value) {
    chunks.push(code`case ${fullName}.${valueDesc.name}: return "${valueDesc.name}";`);
  }
  chunks.push(code`default: return "UNKNOWN";`);

  chunks.push(code`}`);
  chunks.push(code`}`);
  return code`${chunks}`;
}

// When useOptionals=true, non-scalar fields are translated into optional properties.
function isOptionalProperty(field: FieldDescriptorProto, options: Options): boolean {
  return (options.useOptionals && isMessage(field) && !isRepeated(field)) || field.proto3Optional;
}

// Create the interface with properties
function generateInterfaceDeclaration(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  sourceInfo: SourceInfo,
  options: Options
): Code {
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, (text) => chunks.push(code`${text}`));
  chunks.push(code`export interface ${fullName} {`);

  // When oneof=unions, we generate a single property with an ADT per `oneof` clause.
  const processedOneofs = new Set<number>();

  messageDesc.field.forEach((fieldDesc, index) => {
    if (isWithinOneOfThatShouldBeUnion(options, fieldDesc)) {
      const { oneofIndex } = fieldDesc;
      if (!processedOneofs.has(oneofIndex)) {
        processedOneofs.add(oneofIndex);
        chunks.push(generateOneofProperty(typeMap, messageDesc, oneofIndex, sourceInfo, options));
      }
      return;
    }

    const info = sourceInfo.lookup(Fields.message.field, index);
    maybeAddComment(info, (text) => chunks.push(code`${text}`));

    const name = maybeSnakeToCamel(fieldDesc.name, options);
    const type = toTypeName(typeMap, messageDesc, fieldDesc, options);
    const q = isOptionalProperty(fieldDesc, options) ? '?' : '';
    chunks.push(code`${name}${q}: ${type}, `);
  });

  chunks.push(code`}`);
  return code`${chunks}`;
}

function generateOneofProperty(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  oneofIndex: number,
  sourceInfo: SourceInfo,
  options: Options
): Code {
  const fields = messageDesc.field.filter((field) => isWithinOneOf(field) && field.oneofIndex === oneofIndex);
  const unionType = joinCode(
    fields.map((f) => {
      let fieldName = maybeSnakeToCamel(f.name, options);
      let typeName = toTypeName(typeMap, messageDesc, f, options);
      return code`{ $case: "${fieldName}, ${fieldName}: ${typeName} }`;
    }),
    ' | '
  );

  const name = maybeSnakeToCamel(messageDesc.oneofDecl[oneofIndex].name, options);
  return code`${name}?: ${unionType}`;

  /*
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
  */
}

// Create a 'base' instance with default values for decode to use as a prototype
function generateBaseInstance(
  typeMap: TypeMap,
  fullName: string,
  messageDesc: DescriptorProto,
  options: Options
): Code {
  const fields = messageDesc.field
    .filter((field) => !isWithinOneOf(field))
    .map((field) => [field, defaultValue(typeMap, field, options)])
    .filter(([field, val]) => val !== 'undefined' && !isBytes(field))
    .map(([field, val]) => {
      const name = maybeSnakeToCamel(field.name, options);
      return code`${name}: ${val}`;
    });
  return code`const base${fullName}: object = { ${joinCode(fields, ',')} };`;
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

// TODO Move to visit.ts
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

const Reader = imp('Reader@protobufjs/minimal');

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto, options: Options): Code {
  const chunks: Code[] = [];

  // create the basic function declaration
  chunks.push(code`
    decode(
      input: ${Reader} | Uint8Array,
      length?: number,
    ): ${fullName} {
      const reader = input instanceof Uint8Array ? new Reader(input) : input;
      let end = length === undefined ? reader.len : reader.pos + length;
      const message = { ...base${fullName} } as ${fullName};
  `);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach((field) => {
    const name = maybeSnakeToCamel(field.name, options);
    const value = isMapType(typeMap, messageDesc, field, options) ? '{}' : '[]';
    chunks.push(code`message.${name} = ${value};`);
  });

  // start the tag loop
  chunks.push(code`
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
  `);

  // add a case for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);
    chunks.push(code`case ${field.number}:`);

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    let readSnippet: Code;
    if (isPrimitive(field)) {
      readSnippet = code`reader.${toReaderCall(field)}()`;
      if (isBytes(field)) {
        if (options.env === EnvOption.NODE) {
          readSnippet = code`${readSnippet} as Buffer`;
        }
      } else if (basicLongWireType(field.type) !== undefined) {
        if (options.forceLong === LongOption.LONG) {
          readSnippet = code`${readSnippet} as Long`;
        } else if (options.forceLong === LongOption.STRING) {
          readSnippet = code`longToString(${readSnippet} as Long)`;
        } else {
          readSnippet = code`longToNumber(${readSnippet} as Long)`;
        }
      } else if (isEnum(field)) {
        readSnippet = code`${readSnippet} as any`;
      }
    } else if (isValueType(field)) {
      const type = basicTypeName(typeMap, field, options, { keepValueType: true });
      readSnippet = code`${type}.decode(reader, reader.uint32()).value`;
    } else if (isTimestamp(field)) {
      const type = basicTypeName(typeMap, field, options, { keepValueType: true });
      readSnippet = code`fromTimestamp(${type}.decode(reader, reader.uint32()))`;
    } else if (isMessage(field)) {
      const type = basicTypeName(typeMap, field, options);
      readSnippet = code`${type}.decode(reader, reader.uint32())`;
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    // and then use the snippet to handle repeated fields if necessary
    if (isRepeated(field)) {
      if (isMapType(typeMap, messageDesc, field, options)) {
        // We need a unique const within the `cast` statement
        const varName = `entry${field.number}`;
        chunks.push(code`
          const ${varName} = ${readSnippet};
          if (${varName}.value !== undefined) {
            message.${fieldName}[${varName}.key] = ${varName}.value;
          }
        `);
      } else if (packedType(field.type) === undefined) {
        chunks.push(code`message.${fieldName}.push(${readSnippet})`);
      } else {
        chunks.push(code`
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.${fieldName}.push(${readSnippet});
            }
          } else {
            message.${fieldName}.push(${readSnippet});
          }
        `);
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      let oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      chunks.push(code`message.${oneofName} = { $case: '${fieldName}', ${fieldName}: ${readSnippet} };`);
    } else {
      chunks.push(code`message.${fieldName} = ${fieldName};`);
    }
    chunks.push(code`break;`);
  });

  chunks.push(code`
    default:
      reader.skipType(tag & 7);
      break;
  `);

  // and then wrap up the switch/while/return
  chunks.push(code`}`);
  chunks.push(code`}`);
  chunks.push(code`return message;`);

  chunks.push(code`}`);
  return code`${chunks};`;
}

/** Creates a function to encode a message by loop overing the tags. */
function generateEncode(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto, options: Options): Code {
  /*
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
      writeSnippet = (place) =>
        CodeBlock.of(
          '%T.encode(toTimestamp(%L), writer.uint32(%L).fork()).ldelim()',
          basicTypeName(typeMap, field, options, { keepValueType: true }),
          place,
          tag
        );
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

   */
  return code`todo`;
}

/**
 * Creates a function to decode a message from JSON.
 *
 * This is very similar to decode, we loop through looking for properties, with
 * a few special cases for https://developers.google.com/protocol-buffers/docs/proto3#json.
 * */
function generateFromJson(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto, options: Options): Code {
  /*
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
        return CodeBlock.of('fromJsonTimestamp(%L)', from);
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
          } else if (isTimestamp(valueType)) {
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
   */
  return code`todo`;
}

function generateToJson(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto, options: Options): Code {
  /*
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
        return CodeBlock.of('%L !== undefined ? %L.toISOString() : null', from, from);
      } else if (isMapType(typeMap, messageDesc, field, options)) {
        // For map types, drill-in and then admittedly re-hard-code our per-value-type logic
        const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
        if (isEnum(valueType)) {
          const toJson = getEnumMethod(typeMap, valueType.typeName, 'ToJSON');
          return CodeBlock.of('%T(%L)', toJson, from);
        } else if (isBytes(valueType)) {
          return CodeBlock.of('base64FromBytes(%L)', from);
        } else if (isTimestamp(valueType)) {
          return CodeBlock.of('%L.toISOString()', from);
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
   */
  return code`todo`;
}

function generateFromPartial(typeMap: TypeMap, fullName: string, messageDesc: DescriptorProto, options: Options): Code {
  /*
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
          } else if (isTimestamp(valueType)) {
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
   */
  return code`todo`;
}

export const contextTypeVar = 'Context extends DataLoaders';

function maybeCastToNumber(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  variableName: string,
  options: Options
): string {
  const { keyType } = detectMapType(typeMap, messageDesc, field, options)!;
  if (keyType.toString() === 'string') {
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
