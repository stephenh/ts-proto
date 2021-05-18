import { code, Code, conditionalOutput, def, imp, joinCode } from 'ts-poet';
import {
  DescriptorProto,
  FieldDescriptorProto,
  FileDescriptorProto,
  FieldDescriptorProto_Type,
} from 'ts-proto-descriptors';
import {
  basicLongWireType,
  basicTypeName,
  basicWireType,
  notDefaultCheck,
  defaultValue,
  detectMapType,
  getEnumMethod,
  isBytes,
  isBytesValueType,
  isEnum,
  isLong,
  isLongValueType,
  isMapType,
  isMessage,
  isPrimitive,
  isRepeated,
  isScalar,
  isTimestamp,
  isValueType,
  isWithinOneOf,
  isWithinOneOfThatShouldBeUnion,
  packedType,
  toReaderCall,
  toTypeName,
  valueTypeName,
} from './types';
import SourceInfo, { Fields } from './sourceInfo';
import { maybeAddComment, maybePrefixPackage } from './utils';
import { camelToSnake, capitalize, maybeSnakeToCamel } from './case';
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
import {
  addGrpcWebMisc,
  generateGrpcClientImpl,
  generateGrpcMethodDesc,
  generateGrpcServiceDesc,
} from './generate-grpc-web';
import { generateEnum } from './enums';
import { visit, visitServices } from './visit';
import { EnvOption, LongOption, OneofOption, Options, DateOption } from './options';
import { Context } from './context';
import { generateSchema } from './schema';
import { ConditionalOutput } from 'ts-poet/build/ConditionalOutput';
import { generateGrpcJsService } from './generate-grpc-js';

export function generateFile(ctx: Context, fileDesc: FileDescriptorProto): [string, Code] {
  const { options, utils } = ctx;

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

  // Indicate this file's source protobuf package for reflective use with google.protobuf.Any
  if (options.exportCommonSymbols) {
    chunks.push(code`export const protobufPackage = '${fileDesc.package}';`);
  }

  // Syntax, unlike most fields, is not repeated and thus does not use an index
  const sourceInfo = SourceInfo.fromDescriptor(fileDesc);
  const headerComment = sourceInfo.lookup(Fields.file.syntax, undefined);
  maybeAddComment(headerComment, chunks, fileDesc.options?.deprecated);

  // first make all the type declarations
  visit(
    fileDesc,
    sourceInfo,
    (fullName, message, sInfo, fullProtoTypeName) => {
      chunks.push(
        generateInterfaceDeclaration(ctx, fullName, message, sInfo, maybePrefixPackage(fileDesc, fullProtoTypeName))
      );
    },
    options,
    (fullName, enumDesc, sInfo) => {
      chunks.push(generateEnum(ctx, fullName, enumDesc, sInfo));
    }
  );

  // If nestJs=true export [package]_PACKAGE_NAME and [service]_SERVICE_NAME const
  if (options.nestJs) {
    const prefix = camelToSnake(fileDesc.package.replace(/\./g, '_'));
    chunks.push(code`export const ${prefix}_PACKAGE_NAME = '${fileDesc.package}';`);
  }

  if (options.outputEncodeMethods || options.outputJsonMethods || options.outputTypeRegistry) {
    // then add the encoder/decoder/base instance
    visit(
      fileDesc,
      sourceInfo,
      (fullName, message, sInfo, fullProtoTypeName) => {
        const fullTypeName = maybePrefixPackage(fileDesc, fullProtoTypeName);

        chunks.push(generateBaseInstance(ctx, fullName, message, fullTypeName));

        const staticMembers: Code[] = [];

        if (options.outputTypeRegistry) {
          staticMembers.push(code`$type: '${fullTypeName}' as const`);
        }

        if (options.outputEncodeMethods) {
          staticMembers.push(generateEncode(ctx, fullName, message));
          staticMembers.push(generateDecode(ctx, fullName, message));
        }
        if (options.outputJsonMethods) {
          staticMembers.push(generateFromJson(ctx, fullName, message));
          staticMembers.push(generateToJson(ctx, fullName, message));
        }
        if (options.outputPartialMethods) {
          staticMembers.push(generateFromPartial(ctx, fullName, message));
        }

        chunks.push(code`
          export const ${def(fullName)} = {
            ${joinCode(staticMembers, { on: ',\n\n' })}
          };
        `);

        if (options.outputTypeRegistry) {
          const messageTypeRegistry = imp('messageTypeRegistry@./typeRegistry');

          chunks.push(code`
            ${messageTypeRegistry}.set(${fullName}.$type, ${fullName});
          `);
        }
      },
      options
    );
  }

  let hasStreamingMethods = false;

  visitServices(fileDesc, sourceInfo, (serviceDesc, sInfo) => {
    if (options.nestJs) {
      // NestJS is sufficiently different that we special case all of the client/server interfaces

      // generate nestjs grpc client interface
      chunks.push(generateNestjsServiceClient(ctx, fileDesc, sInfo, serviceDesc));
      // and the service controller interface
      chunks.push(generateNestjsServiceController(ctx, fileDesc, sInfo, serviceDesc));
      // generate nestjs grpc service controller decorator
      chunks.push(generateNestjsGrpcServiceMethodsDecorator(ctx, serviceDesc));

      let serviceConstName = `${camelToSnake(serviceDesc.name)}_NAME`;
      if (!serviceDesc.name.toLowerCase().endsWith('service')) {
        serviceConstName = `${camelToSnake(serviceDesc.name)}_SERVICE_NAME`;
      }

      chunks.push(code`export const ${serviceConstName} = "${serviceDesc.name}";`);
    } else if (options.outputServices === 'grpc-js') {
      chunks.push(generateGrpcJsService(ctx, fileDesc, sInfo, serviceDesc));
    } else {
      // This service could be Twirp or grpc-web or JSON (maybe). So far all of their
      // interfaces are fairly similar so we share the same service interface.
      chunks.push(generateService(ctx, fileDesc, sInfo, serviceDesc));

      if (options.outputClientImpl === true) {
        chunks.push(generateServiceClientImpl(ctx, fileDesc, serviceDesc));
      } else if (options.outputClientImpl === 'grpc-web') {
        chunks.push(generateGrpcClientImpl(ctx, fileDesc, serviceDesc));
        chunks.push(generateGrpcServiceDesc(fileDesc, serviceDesc));
        serviceDesc.method.forEach((method) => {
          chunks.push(generateGrpcMethodDesc(ctx, serviceDesc, method));
          if (method.serverStreaming) {
            hasStreamingMethods = true;
          }
        });
      }
    }
  });

  if (!options.outputServices && options.outputClientImpl && fileDesc.service.length > 0) {
    if (options.outputClientImpl === true) {
      chunks.push(generateRpcType(ctx));
    } else if (options.outputClientImpl === 'grpc-web') {
      chunks.push(addGrpcWebMisc(ctx, hasStreamingMethods));
    }
  }

  if (options.context) {
    chunks.push(generateDataLoaderOptionsType());
    chunks.push(generateDataLoadersType());
  }

  if (options.outputSchema) {
    chunks.push(...generateSchema(ctx, fileDesc, sourceInfo));
  }

  chunks.push(
    ...Object.values(utils).map((v) => {
      if (v instanceof ConditionalOutput) {
        return code`${v.ifUsed}`;
      } else if (v instanceof Code) {
        return v;
      } else {
        return code``;
      }
    })
  );

  return [moduleName, joinCode(chunks, { on: '\n\n' })];
}

export type Utils = ReturnType<typeof makeDeepPartial> &
  ReturnType<typeof makeTimestampMethods> &
  ReturnType<typeof makeByteUtils> &
  ReturnType<typeof makeLongUtils>;

/** These are runtime utility methods used by the generated code. */
export function makeUtils(options: Options): Utils {
  const bytes = makeByteUtils();
  const longs = makeLongUtils(options, bytes);
  return {
    ...bytes,
    ...makeDeepPartial(options, longs),
    ...makeTimestampMethods(options, longs),
    ...longs,
  };
}

function makeLongUtils(options: Options, bytes: ReturnType<typeof makeByteUtils>) {
  // Regardless of which `forceLong` config option we're using, we always use
  // the `long` library to either represent or at least sanity-check 64-bit values
  const util = imp('util@protobufjs/minimal');
  const configure = imp('configure@protobufjs/minimal');

  // Before esModuleInterop, we had to use 'import * as Long from long` b/c long is
  // an `export =` module and exports only the Long constructor (which is callable).
  // See https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require.
  //
  // With esModuleInterop on, `* as Long` is no longer the constructor, it's the module,
  // so we want to go back to `import { Long } from long`, which is specifically forbidden
  // due to `export =` w/o esModuleInterop.
  //
  // I.e there is not an import for long that "just works" in both esModuleInterop and
  // not esModuleInterop.
  const Long = options.esModuleInterop ? imp('Long=long') : imp('Long*long');

  const disclaimer = options.esModuleInterop
    ? ''
    : `
    // If you get a compile-error about 'Constructor<Long> and ... have no overlap',
    // add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.`;

  // Kinda hacky, but we always init long until in onlyTypes mode. I'd rather do
  // this more implicitly, like if `Long@long` is imported or something like that.
  const longInit = options.onlyTypes
    ? code``
    : code`
      ${disclaimer}
      if (${util}.Long !== ${Long}) {
        ${util}.Long = ${Long} as any;
        ${configure}();
      }
    `;

  // TODO This is unused?
  const numberToLong = conditionalOutput(
    'numberToLong',
    code`
      function numberToLong(number: number) {
        return ${Long}.fromNumber(number);
      }
    `
  );

  const longToString = conditionalOutput(
    'longToString',
    code`
      function longToString(long: ${Long}) {
        return long.toString();
      }
    `
  );

  const longToNumber = conditionalOutput(
    'longToNumber',
    code`
      function longToNumber(long: ${Long}): number {
        if (long.gt(Number.MAX_SAFE_INTEGER)) {
          throw new ${bytes.globalThis}.Error("Value is larger than Number.MAX_SAFE_INTEGER")
        }
        return long.toNumber();
      }
    `
  );

  return { numberToLong, longToNumber, longToString, longInit, Long };
}

function makeByteUtils() {
  const globalThis = conditionalOutput(
    'globalThis',
    code`
      declare var self: any | undefined;
      declare var window: any | undefined;
      var globalThis: any = (() => {
        if (typeof globalThis !== "undefined") return globalThis;
        if (typeof self !== "undefined") return self;
        if (typeof window !== "undefined") return window;
        if (typeof global !== "undefined") return global;
        throw "Unable to locate global object";
      })();
    `
  );

  const bytesFromBase64 = conditionalOutput(
    'bytesFromBase64',
    code`
      const atob: (b64: string) => string = ${globalThis}.atob || ((b64) => ${globalThis}.Buffer.from(b64, 'base64').toString('binary'));
      function bytesFromBase64(b64: string): Uint8Array {
        const bin = atob(b64);
        const arr = new Uint8Array(bin.length);
        for (let i = 0; i < bin.length; ++i) {
            arr[i] = bin.charCodeAt(i);
        }
        return arr;
      }
    `
  );
  const base64FromBytes = conditionalOutput(
    'base64FromBytes',
    code`
      const btoa : (bin: string) => string = ${globalThis}.btoa || ((bin) => ${globalThis}.Buffer.from(bin, 'binary').toString('base64'));
      function base64FromBytes(arr: Uint8Array): string {
        const bin: string[] = [];
        for (let i = 0; i < arr.byteLength; ++i) {
          bin.push(String.fromCharCode(arr[i]));
        }
        return btoa(bin.join(''));
      }
    `
  );
  return { globalThis, bytesFromBase64, base64FromBytes };
}

function makeDeepPartial(options: Options, longs: ReturnType<typeof makeLongUtils>) {
  let oneofCase = '';
  if (options.oneof === OneofOption.UNIONS) {
    oneofCase = `
      : T extends { $case: string }
      ? { [K in keyof Omit<T, '$case'>]?: DeepPartial<T[K]> } & { $case: T['$case'] }
    `;
  }

  const maybeExport = options.exportCommonSymbols ? 'export' : '';
  const maybeLong = options.forceLong === LongOption.LONG ? code` | ${longs.Long}` : '';
  const keys = options.outputTypeRegistry ? code`Exclude<keyof T, '$type'>` : code`keyof T`;

  // Based on the type from ts-essentials
  const DeepPartial = conditionalOutput(
    'DeepPartial',
    code`
      type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined${maybeLong};
      ${maybeExport} type DeepPartial<T> = T extends Builtin
        ? T
        : T extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>${oneofCase}
        : T extends {}
        ? { [K in ${keys}]?: DeepPartial<T[K]> }
        : Partial<T>;
    `
  );

  return { DeepPartial };
}

function makeTimestampMethods(options: Options, longs: ReturnType<typeof makeLongUtils>) {
  const Timestamp = imp('Timestamp@./google/protobuf/timestamp');

  let seconds: string | Code = 'date.getTime() / 1_000';
  let toNumberCode = 't.seconds';
  if (options.forceLong === LongOption.LONG) {
    toNumberCode = 't.seconds.toNumber()';
    seconds = code`${longs.numberToLong}(date.getTime() / 1_000)`;
  } else if (options.forceLong === LongOption.STRING) {
    toNumberCode = 'Number(t.seconds)';
    // Must discard the fractional piece here
    // Otherwise the fraction ends up on the seconds when parsed as a Long
    // (note this only occurs when the string is > 8 characters)
    seconds = 'Math.trunc(date.getTime() / 1_000).toString()';
  }

  const maybeTypeField = options.outputTypeRegistry ? `$type: 'google.protobuf.Timestamp',` : '';

  const toTimestamp = conditionalOutput(
    'toTimestamp',
    options.useDate === DateOption.STRING
      ? code`
          function toTimestamp(dateStr: string): ${Timestamp} {
            const date = new Date(dateStr);
            const seconds = ${seconds};
            const nanos = (date.getTime() % 1_000) * 1_000_000;
            return { ${maybeTypeField} seconds, nanos };
          }
        `
      : code`
          function toTimestamp(date: Date): ${Timestamp} {
            const seconds = ${seconds};
            const nanos = (date.getTime() % 1_000) * 1_000_000;
            return { ${maybeTypeField} seconds, nanos };
          }
        `
  );

  const fromTimestamp = conditionalOutput(
    'fromTimestamp',
    options.useDate === DateOption.STRING
      ? code`
          function fromTimestamp(t: ${Timestamp}): string {
            let millis = ${toNumberCode} * 1_000;
            millis += t.nanos / 1_000_000;
            return new Date(millis).toISOString();
          }
        `
      : code`
          function fromTimestamp(t: ${Timestamp}): Date {
            let millis = ${toNumberCode} * 1_000;
            millis += t.nanos / 1_000_000;
            return new Date(millis);
          }
        `
  );

  const fromJsonTimestamp = conditionalOutput(
    'fromJsonTimestamp',
    options.useDate === DateOption.DATE
      ? code`
        function fromJsonTimestamp(o: any): Date {
          if (o instanceof Date) {
            return o;
          } else if (typeof o === "string") {
            return new Date(o);
          } else {
            return ${fromTimestamp}(Timestamp.fromJSON(o));
          }
        }
      `
      : code`
        function fromJsonTimestamp(o: any): Timestamp {
          if (o instanceof Date) {
            return ${toTimestamp}(o);
          } else if (typeof o === "string") {
            return ${toTimestamp}(new Date(o));
          } else {
            return Timestamp.fromJSON(o);
          }
        }
      `
  );

  return { toTimestamp, fromTimestamp, fromJsonTimestamp };
}

// When useOptionals=true, non-scalar fields are translated into optional properties.
function isOptionalProperty(field: FieldDescriptorProto, options: Options): boolean {
  return (options.useOptionals && isMessage(field) && !isRepeated(field)) || field.proto3Optional;
}

// Create the interface with properties
function generateInterfaceDeclaration(
  ctx: Context,
  fullName: string,
  messageDesc: DescriptorProto,
  sourceInfo: SourceInfo,
  fullTypeName: string
): Code {
  const { options } = ctx;
  const chunks: Code[] = [];

  maybeAddComment(sourceInfo, chunks, messageDesc.options?.deprecated);
  // interface name should be defined to avoid import collisions
  chunks.push(code`export interface ${def(fullName)} {`);

  if (ctx.options.outputTypeRegistry) {
    chunks.push(code`$type: '${fullTypeName}',`);
  }

  // When oneof=unions, we generate a single property with an ADT per `oneof` clause.
  const processedOneofs = new Set<number>();

  messageDesc.field.forEach((fieldDesc, index) => {
    if (isWithinOneOfThatShouldBeUnion(options, fieldDesc)) {
      const { oneofIndex } = fieldDesc;
      if (!processedOneofs.has(oneofIndex)) {
        processedOneofs.add(oneofIndex);
        chunks.push(generateOneofProperty(ctx, messageDesc, oneofIndex, sourceInfo));
      }
      return;
    }

    const info = sourceInfo.lookup(Fields.message.field, index);
    maybeAddComment(info, chunks, fieldDesc.options?.deprecated);

    const name = maybeSnakeToCamel(fieldDesc.name, options);
    const type = toTypeName(ctx, messageDesc, fieldDesc);
    const q = isOptionalProperty(fieldDesc, options) ? '?' : '';
    chunks.push(code`${name}${q}: ${type}, `);
  });

  chunks.push(code`}`);
  return joinCode(chunks, { on: '\n' });
}

function generateOneofProperty(
  ctx: Context,
  messageDesc: DescriptorProto,
  oneofIndex: number,
  sourceInfo: SourceInfo
): Code {
  const { options } = ctx;
  const fields = messageDesc.field.filter((field) => isWithinOneOf(field) && field.oneofIndex === oneofIndex);
  const unionType = joinCode(
    fields.map((f) => {
      let fieldName = maybeSnakeToCamel(f.name, options);
      let typeName = toTypeName(ctx, messageDesc, f);
      return code`{ $case: '${fieldName}', ${fieldName}: ${typeName} }`;
    }),
    { on: ' | ' }
  );

  const name = maybeSnakeToCamel(messageDesc.oneofDecl[oneofIndex].name, options);
  return code`${name}?: ${unionType},`;

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
  ctx: Context,
  fullName: string,
  messageDesc: DescriptorProto,
  fullTypeName: string
): Code {
  const fields = messageDesc.field
    .filter((field) => !isWithinOneOf(field))
    .map((field) => [field, defaultValue(ctx, field)])
    .filter(([field, val]) => val !== 'undefined' && !isBytes(field))
    .map(([field, val]) => {
      const name = maybeSnakeToCamel(field.name, ctx.options);
      return code`${name}: ${val}`;
    });

  if (ctx.options.outputTypeRegistry) {
    fields.unshift(code`$type: '${fullTypeName}'`);
  }

  return code`const base${fullName}: object = { ${joinCode(fields, { on: ',' })} };`;
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];

  // create the basic function declaration
  chunks.push(code`
    decode(
      input: ${Reader} | Uint8Array,
      length?: number,
    ): ${fullName} {
      const reader = input instanceof ${Reader} ? input : new ${Reader}(input);
      let end = length === undefined ? reader.len : reader.pos + length;
      const message = { ...base${fullName} } as ${fullName};
  `);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach((field) => {
    const name = maybeSnakeToCamel(field.name, options);
    const value = isMapType(ctx, messageDesc, field) ? '{}' : '[]';
    chunks.push(code`message.${name} = ${value};`);
  });

  // initialize all buffers
  messageDesc.field
    .filter((field) => !isRepeated(field) && !isWithinOneOf(field) && isBytes(field))
    .forEach((field) => {
      const value = options.env === EnvOption.NODE ? 'Buffer.alloc(0)' : 'new Uint8Array()';
      const name = maybeSnakeToCamel(field.name, options);
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
          readSnippet = code`${utils.longToString}(${readSnippet} as Long)`;
        } else {
          readSnippet = code`${utils.longToNumber}(${readSnippet} as Long)`;
        }
      } else if (isEnum(field)) {
        if (options.stringEnums) {
          const fromJson = getEnumMethod(typeMap, field.typeName, 'FromJSON');
          readSnippet = code`${fromJson}(${readSnippet})`;
        } else {
          readSnippet = code`${readSnippet} as any`;
        }
      }
    } else if (isValueType(ctx, field)) {
      const type = basicTypeName(ctx, field, { keepValueType: true });
      readSnippet = code`${type}.decode(reader, reader.uint32()).value`;
    } else if (isTimestamp(field) && (options.useDate === DateOption.DATE || options.useDate === DateOption.STRING)) {
      const type = basicTypeName(ctx, field, { keepValueType: true });
      readSnippet = code`${utils.fromTimestamp}(${type}.decode(reader, reader.uint32()))`;
    } else if (isMessage(field)) {
      const type = basicTypeName(ctx, field);
      readSnippet = code`${type}.decode(reader, reader.uint32())`;
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    // and then use the snippet to handle repeated fields if necessary
    if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        // We need a unique const within the `cast` statement
        const varName = `entry${field.number}`;
        chunks.push(code`
          const ${varName} = ${readSnippet};
          if (${varName}.value !== undefined) {
            message.${fieldName}[${varName}.key] = ${varName}.value;
          }
        `);
      } else if (packedType(field.type) === undefined) {
        chunks.push(code`message.${fieldName}.push(${readSnippet});`);
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
      chunks.push(code`message.${fieldName} = ${readSnippet};`);
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
  return joinCode(chunks, { on: '\n' });
}

const Writer = imp('Writer@protobufjs/minimal');
const Reader = imp('Reader@protobufjs/minimal');

/** Creates a function to encode a message by loop overing the tags. */
function generateEncode(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];

  // create the basic function declaration
  chunks.push(code`
    encode(
      ${messageDesc.field.length > 0 ? 'message' : '_'}: ${fullName},
      writer: ${Writer} = ${Writer}.create(),
    ): ${Writer} {
  `);

  // then add a case for each field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    // get a generic writer.doSomething based on the basic type
    let writeSnippet: (place: string) => Code;
    if (isEnum(field) && options.stringEnums) {
      const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
      const toNumber = getEnumMethod(typeMap, field.typeName, 'ToNumber');
      writeSnippet = (place) => code`writer.uint32(${tag}).${toReaderCall(field)}(${toNumber}(${place}))`;
    } else if (isScalar(field) || isEnum(field)) {
      const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
      writeSnippet = (place) => code`writer.uint32(${tag}).${toReaderCall(field)}(${place})`;
    } else if (isTimestamp(field) && (options.useDate === DateOption.DATE || options.useDate === DateOption.STRING)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      const type = basicTypeName(ctx, field, { keepValueType: true });
      writeSnippet = (place) =>
        code`${type}.encode(${utils.toTimestamp}(${place}), writer.uint32(${tag}).fork()).ldelim()`;
    } else if (isValueType(ctx, field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      const type = basicTypeName(ctx, field, { keepValueType: true });
      const maybeTypeField = options.outputTypeRegistry ? `$type: '${field.typeName.slice(1)}',` : '';
      writeSnippet = (place) =>
        code`${type}.encode({ ${maybeTypeField} value: ${place}! }, writer.uint32(${tag}).fork()).ldelim()`;
    } else if (isMessage(field)) {
      const tag = ((field.number << 3) | 2) >>> 0;
      const type = basicTypeName(ctx, field);
      writeSnippet = (place) => code`${type}.encode(${place}, writer.uint32(${tag}).fork()).ldelim()`;
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        const maybeTypeField = options.outputTypeRegistry ? `$type: '${field.typeName.slice(1)}',` : '';
        chunks.push(code`
          Object.entries(message.${fieldName}).forEach(([key, value]) => {
            ${writeSnippet(`{ ${maybeTypeField} key: key as any, value }`)};
          });
        `);
      } else if (packedType(field.type) === undefined) {
        chunks.push(code`
          for (const v of message.${fieldName}) {
            ${writeSnippet('v!')};
          }
        `);
      } else if (isEnum(field) && options.stringEnums) {
        // This is a lot like the `else` clause, but we wrap `fooToNumber` around it.
        // Ideally we'd reuse `writeSnippet` here, but `writeSnippet` has the `writer.uint32(tag)`
        // embedded inside of it, and we want to drop that so that we can encode it packed
        // (i.e. just one tag and multiple values).
        const tag = ((field.number << 3) | 2) >>> 0;
        const toNumber = getEnumMethod(typeMap, field.typeName, 'ToNumber');
        chunks.push(code`
          writer.uint32(${tag}).fork();
          for (const v of message.${fieldName}) {
            writer.${toReaderCall(field)}(${toNumber}(v));
          }
          writer.ldelim();
        `);
      } else {
        // Ideally we'd reuse `writeSnippet` but it has tagging embedded inside of it.
        const tag = ((field.number << 3) | 2) >>> 0;
        chunks.push(code`
          writer.uint32(${tag}).fork();
          for (const v of message.${fieldName}) {
            writer.${toReaderCall(field)}(v);
          }
          writer.ldelim();
        `);
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      let oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      chunks.push(code`
        if (message.${oneofName}?.$case === '${fieldName}') {
          ${writeSnippet(`message.${oneofName}.${fieldName}`)};
        }
      `);
    } else if (isWithinOneOf(field)) {
      // Oneofs don't have a default value check b/c they need to denote which-oneof presence
      chunks.push(code`
        if (message.${fieldName} !== undefined) {
          ${writeSnippet(`message.${fieldName}`)};
        }
      `);
    } else if (isMessage(field)) {
      chunks.push(code`
        if (message.${fieldName} !== undefined) {
          ${writeSnippet(`message.${fieldName}`)};
        }
      `);
    } else if (isScalar(field) || isEnum(field)) {
      chunks.push(code`
        if (${notDefaultCheck(ctx, field, `message.${fieldName}`)}) {
          ${writeSnippet(`message.${fieldName}`)};
        }
      `);
    } else {
      chunks.push(code`${writeSnippet(`message.${fieldName}`)};`);
    }
  });

  chunks.push(code`return writer;`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: '\n' });
}

/**
 * Creates a function to decode a message from JSON.
 *
 * This is very similar to decode, we loop through looking for properties, with
 * a few special cases for https://developers.google.com/protocol-buffers/docs/proto3#json.
 * */
function generateFromJson(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];

  // create the basic function declaration
  chunks.push(code`
    fromJSON(${messageDesc.field.length > 0 ? 'object' : '_'}: any): ${fullName} {
      const message = { ...base${fullName} } as ${fullName};
  `);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach((field) => {
    const value = isMapType(ctx, messageDesc, field) ? '{}' : '[]';
    const name = maybeSnakeToCamel(field.name, options);
    chunks.push(code`message.${name} = ${value};`);
  });

  // initialize all buffers
  messageDesc.field
    .filter((field) => !isRepeated(field) && !isWithinOneOf(field) && isBytes(field))
    .forEach((field) => {
      const value = options.env === EnvOption.NODE ? 'Buffer.alloc(0)' : 'new Uint8Array()';
      const name = maybeSnakeToCamel(field.name, options);
      chunks.push(code`message.${name} = ${value};`);
    });

  // add a check for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    const readSnippet = (from: string): Code => {
      if (isEnum(field)) {
        const fromJson = getEnumMethod(typeMap, field.typeName, 'FromJSON');
        return code`${fromJson}(${from})`;
      } else if (isPrimitive(field)) {
        // Convert primitives using the String(value)/Number(value)/bytesFromBase64(value)
        if (isBytes(field)) {
          if (options.env === EnvOption.NODE) {
            return code`Buffer.from(${utils.bytesFromBase64}(${from}))`;
          } else {
            return code`${utils.bytesFromBase64}(${from})`;
          }
        } else if (isLong(field) && options.forceLong === LongOption.LONG) {
          const cstr = capitalize(basicTypeName(ctx, field, { keepValueType: true }).toCodeString());
          return code`${cstr}.fromString(${from})`;
        } else {
          const cstr = capitalize(basicTypeName(ctx, field, { keepValueType: true }).toCodeString());
          return code`${cstr}(${from})`;
        }
      } else if (isTimestamp(field) && options.useDate === DateOption.STRING) {
        return code`String(${from})`;
      } else if (
        isTimestamp(field) &&
        (options.useDate === DateOption.DATE || options.useDate === DateOption.TIMESTAMP)
      ) {
        return code`${utils.fromJsonTimestamp}(${from})`;
      } else if (isValueType(ctx, field)) {
        const valueType = valueTypeName(ctx, field.typeName)!;
        if (isLongValueType(field) && options.forceLong === LongOption.LONG) {
          return code`${capitalize(valueType.toCodeString())}.fromValue(${from})`;
        } else if (isBytesValueType(field)) {
          return code`new ${capitalize(valueType.toCodeString())}(${from})`;
        } else {
          return code`${capitalize(valueType.toCodeString())}(${from})`;
        }
      } else if (isMessage(field)) {
        if (isRepeated(field) && isMapType(ctx, messageDesc, field)) {
          const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
          if (isPrimitive(valueType)) {
            // TODO Can we not copy/paste this from ^?
            if (isBytes(valueType)) {
              if (options.env === EnvOption.NODE) {
                return code`Buffer.from(${utils.bytesFromBase64}(${from} as string))`;
              } else {
                return code`${utils.bytesFromBase64}(${from} as string)`;
              }
            } else if (isEnum(valueType)) {
              return code`${from} as number`;
            } else {
              const cstr = capitalize(basicTypeName(ctx, valueType).toCodeString());
              return code`${cstr}(${from})`;
            }
          } else if (isTimestamp(valueType) && options.useDate === DateOption.STRING) {
            return code`String(${from})`;
          } else if (
            isTimestamp(valueType) &&
            (options.useDate === DateOption.DATE || options.useDate === DateOption.TIMESTAMP)
          ) {
            return code`${utils.fromJsonTimestamp}(${from})`;
          } else {
            const type = basicTypeName(ctx, valueType);
            return code`${type}.fromJSON(${from})`;
          }
        } else {
          const type = basicTypeName(ctx, field);
          return code`${type}.fromJSON(${from})`;
        }
      } else {
        throw new Error(`Unhandled field ${field}`);
      }
    };

    // and then use the snippet to handle repeated fields if necessary
    chunks.push(code`if (object.${fieldName} !== undefined && object.${fieldName} !== null) {`);
    if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        const i = maybeCastToNumber(ctx, messageDesc, field, 'key');
        chunks.push(code`
          Object.entries(object.${fieldName}).forEach(([key, value]) => {
            message.${fieldName}[${i}] = ${readSnippet('value')};
          });
        `);
      } else {
        chunks.push(code`
          for (const e of object.${fieldName}) {
            message.${fieldName}.push(${readSnippet('e')});
          }
        `);
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      const oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      chunks.push(code`
        message.${oneofName} = { $case: '${fieldName}', ${fieldName}: ${readSnippet(`object.${fieldName}`)} }
      `);
    } else {
      chunks.push(code`message.${fieldName} = ${readSnippet(`object.${fieldName}`)};`);
    }

    // set the default value (TODO Support bytes)
    if (
      !isRepeated(field) &&
      field.type !== FieldDescriptorProto_Type.TYPE_BYTES &&
      options.oneof !== OneofOption.UNIONS
    ) {
      const v = isWithinOneOf(field) ? 'undefined' : defaultValue(ctx, field);
      chunks.push(code`} else {`);
      chunks.push(code`message.${fieldName} = ${v};`);
    }
    chunks.push(code`}`);
  });
  // and then wrap up the switch/while/return
  chunks.push(code`return message`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: '\n' });
}

function generateToJson(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];

  // create the basic function declaration
  chunks.push(code`
    toJSON(${messageDesc.field.length > 0 ? 'message' : '_'}: ${fullName}): unknown {
      const obj: any = {};
  `);

  // then add a case for each field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    const readSnippet = (from: string): Code => {
      if (isEnum(field)) {
        const toJson = getEnumMethod(typeMap, field.typeName, 'ToJSON');
        return isWithinOneOf(field)
          ? code`${from} !== undefined ? ${toJson}(${from}) : undefined`
          : code`${toJson}(${from})`;
      } else if (isTimestamp(field) && options.useDate === DateOption.DATE) {
        return code`${from}.toISOString()`;
      } else if (isTimestamp(field) && options.useDate === DateOption.STRING) {
        return code`${from}`;
      } else if (isTimestamp(field) && options.useDate === DateOption.TIMESTAMP) {
        return code`${utils.fromTimestamp}(${from}).toISOString()`;
      } else if (isMapType(ctx, messageDesc, field)) {
        // For map types, drill-in and then admittedly re-hard-code our per-value-type logic
        const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
        if (isEnum(valueType)) {
          const toJson = getEnumMethod(typeMap, valueType.typeName, 'ToJSON');
          return code`${toJson}(${from})`;
        } else if (isBytes(valueType)) {
          return code`${utils.base64FromBytes}(${from})`;
        } else if (isTimestamp(valueType) && options.useDate === DateOption.DATE) {
          return code`${from}.toISOString()`;
        } else if (isTimestamp(valueType) && options.useDate === DateOption.STRING) {
          return code`${from}`;
        } else if (isTimestamp(valueType) && options.useDate === DateOption.TIMESTAMP) {
          return code`${utils.fromTimestamp}(${from}).toISOString()`;
        } else if (isScalar(valueType)) {
          return code`${from}`;
        } else {
          const type = basicTypeName(ctx, valueType);
          return code`${type}.toJSON(${from})`;
        }
      } else if (isMessage(field) && !isValueType(ctx, field) && !isMapType(ctx, messageDesc, field)) {
        const type = basicTypeName(ctx, field, { keepValueType: true });
        return code`${from} ? ${type}.toJSON(${from}) : ${defaultValue(ctx, field)}`;
      } else if (isBytes(field)) {
        if (isWithinOneOf(field)) {
          return code`${from} !== undefined ? ${utils.base64FromBytes}(${from}) : undefined`;
        } else {
          return code`${utils.base64FromBytes}(${from} !== undefined ? ${from} : ${defaultValue(ctx, field)})`;
        }
      } else if (isLong(field) && options.forceLong === LongOption.LONG) {
        const v = isWithinOneOf(field) ? 'undefined' : defaultValue(ctx, field);
        return code`(${from} || ${v}).toString()`;
      } else {
        return code`${from}`;
      }
    };

    if (isMapType(ctx, messageDesc, field)) {
      // Maps might need their values transformed, i.e. bytes --> base64
      chunks.push(code`
        obj.${fieldName} = {};
        if (message.${fieldName}) {
          Object.entries(message.${fieldName}).forEach(([k, v]) => {
            obj.${fieldName}[k] = ${readSnippet('v')};
          });
        }
      `);
    } else if (isRepeated(field)) {
      // Arrays might need their elements transformed
      chunks.push(code`
        if (message.${fieldName}) {
          obj.${fieldName} = message.${fieldName}.map(e => ${readSnippet('e')});
        } else {
          obj.${fieldName} = [];
        }
      `);
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      // oneofs in a union are only output as `oneof name = ...`
      const oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      const v = readSnippet(`message.${oneofName}?.${fieldName}`);
      chunks.push(code`message.${oneofName}?.$case === '${fieldName}' && (obj.${fieldName} = ${v});`);
    } else {
      const v = readSnippet(`message.${fieldName}`);
      chunks.push(code`message.${fieldName} !== undefined && (obj.${fieldName} = ${v});`);
    }
  });

  chunks.push(code`return obj;`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: '\n' });
}

function generateFromPartial(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];
  const Timestamp = imp('Timestamp@./google/protobuf/timestamp');

  // create the basic function declaration
  chunks.push(code`
    fromPartial(${messageDesc.field.length > 0 ? 'object' : '_'}: ${utils.DeepPartial}<${fullName}>): ${fullName} {
      const message = { ...base${fullName} } as ${fullName};
  `);

  // initialize all lists
  messageDesc.field.filter(isRepeated).forEach((field) => {
    const value = isMapType(ctx, messageDesc, field) ? '{}' : '[]';
    const name = maybeSnakeToCamel(field.name, options);
    chunks.push(code`message.${name} = ${value};`);
  });

  // add a check for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    const readSnippet = (from: string): Code => {
      if (
        isPrimitive(field) ||
        (isTimestamp(field) && (options.useDate === DateOption.DATE || options.useDate === DateOption.STRING)) ||
        isValueType(ctx, field)
      ) {
        return code`${from}`;
      } else if (isMessage(field)) {
        if (isRepeated(field) && isMapType(ctx, messageDesc, field)) {
          const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
          if (isPrimitive(valueType)) {
            if (isBytes(valueType)) {
              return code`${from}`;
            } else if (isEnum(valueType)) {
              return code`${from} as number`;
            } else {
              const cstr = capitalize(basicTypeName(ctx, valueType).toCodeString());
              return code`${cstr}(${from})`;
            }
          } else if (
            isTimestamp(valueType) &&
            (options.useDate === DateOption.DATE || options.useDate === DateOption.STRING)
          ) {
            return code`${from}`;
          } else {
            const type = basicTypeName(ctx, valueType);
            return code`${type}.fromPartial(${from})`;
          }
        } else {
          const type = basicTypeName(ctx, field);
          return code`${type}.fromPartial(${from})`;
        }
      } else {
        throw new Error(`Unhandled field ${field}`);
      }
    };

    // and then use the snippet to handle repeated fields if necessary
    if (isRepeated(field)) {
      chunks.push(code`if (object.${fieldName} !== undefined && object.${fieldName} !== null) {`);
      if (isMapType(ctx, messageDesc, field)) {
        const i = maybeCastToNumber(ctx, messageDesc, field, 'key');
        chunks.push(code`
          Object.entries(object.${fieldName}).forEach(([key, value]) => {
            if (value !== undefined) {
              message.${fieldName}[${i}] = ${readSnippet('value')};
            }
          });
        `);
      } else {
        chunks.push(code`
          for (const e of object.${fieldName}) {
            message.${fieldName}.push(${readSnippet('e')});
          }
        `);
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      let oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      const v = readSnippet(`object.${oneofName}.${fieldName}`);
      chunks.push(code`
        if (
          object.${oneofName}?.$case === '${fieldName}'
          && object.${oneofName}?.${fieldName} !== undefined
          && object.${oneofName}?.${fieldName} !== null
        ) {
          message.${oneofName} = { $case: '${fieldName}', ${fieldName}: ${v} };
      `);
    } else {
      chunks.push(code`if (object.${fieldName} !== undefined && object.${fieldName} !== null) {`);
      if ((isLong(field) || isLongValueType(field)) && options.forceLong === LongOption.LONG) {
        const v = readSnippet(`object.${fieldName}`);
        const type = basicTypeName(ctx, field);
        chunks.push(code`message.${fieldName} = ${v} as ${type};`);
      } else {
        chunks.push(code`message.${fieldName} = ${readSnippet(`object.${fieldName}`)};`);
      }
    }

    if (!isRepeated(field) && options.oneof !== OneofOption.UNIONS) {
      chunks.push(code`} else {`);
      const v = isWithinOneOf(field) ? 'undefined' : defaultValue(ctx, field);
      chunks.push(code`message.${fieldName} = ${v}`);
    }

    chunks.push(code`}`);
  });

  // and then wrap up the switch/while/return
  chunks.push(code`return message;`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: '\n' });
}

export const contextTypeVar = 'Context extends DataLoaders';

function maybeCastToNumber(
  ctx: Context,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  variableName: string
): string {
  const { keyType } = detectMapType(ctx, messageDesc, field)!;
  if (keyType.toCodeString() === 'string') {
    return variableName;
  } else {
    return `Number(${variableName})`;
  }
}
