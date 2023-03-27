import { code, Code, conditionalOutput, def, imp, joinCode } from "ts-poet";
import {
  DescriptorProto,
  FieldDescriptorProto,
  FieldDescriptorProto_Type,
  FileDescriptorProto,
} from "ts-proto-descriptors";
import {
  basicLongWireType,
  basicTypeName,
  basicWireType,
  defaultValue,
  detectMapType,
  getEnumMethod,
  isAnyValueType,
  isAnyValueTypeName,
  isBytes,
  isBytesValueType,
  isEnum,
  isFieldMaskType,
  isFieldMaskTypeName,
  isListValueType,
  isListValueTypeName,
  isLong,
  isLongValueType,
  isMapType,
  isMessage,
  isObjectId,
  isOptionalProperty,
  isPrimitive,
  isRepeated,
  isScalar,
  isStructType,
  isStructTypeName,
  isTimestamp,
  isValueType,
  isWholeNumber,
  isWithinOneOf,
  isWithinOneOfThatShouldBeUnion,
  notDefaultCheck,
  packedType,
  toReaderCall,
  toTypeName,
  valueTypeName,
} from "./types";
import SourceInfo, { Fields } from "./sourceInfo";
import {
  assertInstanceOf,
  getFieldJsonName,
  FormattedMethodDescriptor,
  impProto,
  maybeAddComment,
  maybePrefixPackage,
  getPropertyAccessor,
  impFile,
} from "./utils";
import { camelToSnake, capitalize, maybeSnakeToCamel } from "./case";
import {
  generateNestjsGrpcServiceMethodsDecorator,
  generateNestjsServiceClient,
  generateNestjsServiceController,
} from "./generate-nestjs";
import {
  generateDataLoaderOptionsType,
  generateDataLoadersType,
  generateRpcType,
  generateService,
  generateServiceClientImpl,
} from "./generate-services";
import {
  addGrpcWebMisc,
  generateGrpcClientImpl,
  generateGrpcMethodDesc,
  generateGrpcServiceDesc,
} from "./generate-grpc-web";
import { generateEncodeTransform, generateDecodeTransform } from "./generate-async-iterable";
import { generateEnum } from "./enums";
import { visit, visitServices } from "./visit";
import { DateOption, EnvOption, LongOption, OneofOption, Options, ServiceOption } from "./options";
import { Context } from "./context";
import { generateSchema } from "./schema";
import { ConditionalOutput } from "ts-poet/build/ConditionalOutput";
import { generateGrpcJsService } from "./generate-grpc-js";
import { generateGenericServiceDefinition } from "./generate-generic-service-definition";
import { generateNiceGrpcService } from "./generate-nice-grpc";
import {
  generateUnwrapDeep,
  generateUnwrapShallow,
  generateWrapDeep,
  generateWrapShallow,
  isWrapperType,
} from "./generate-struct-wrappers";

export function generateFile(ctx: Context, fileDesc: FileDescriptorProto): [string, Code] {
  const { options, utils } = ctx;

  if (options.useOptionals === false) {
    console.warn(
      "ts-proto: Passing useOptionals as a boolean option is deprecated and will be removed in a future version. Please pass the string 'none' instead of false."
    );
    options.useOptionals = "none";
  } else if (options.useOptionals === true) {
    console.warn(
      "ts-proto: Passing useOptionals as a boolean option is deprecated and will be removed in a future version. Please pass the string 'messages' instead of true."
    );
    options.useOptionals = "messages";
  }

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
  const suffix = `${options.fileSuffix}.ts`;
  const moduleName = fileDesc.name.replace(".proto", suffix);
  const chunks: Code[] = [];

  // Indicate this file's source protobuf package for reflective use with google.protobuf.Any
  if (options.exportCommonSymbols) {
    chunks.push(code`export const protobufPackage = '${fileDesc.package}';`);
  }

  // Syntax, unlike most fields, is not repeated and thus does not use an index
  const sourceInfo = SourceInfo.fromDescriptor(fileDesc);
  const headerComment = sourceInfo.lookup(Fields.file.syntax, undefined);
  maybeAddComment(headerComment, chunks, fileDesc.options?.deprecated);

  // Apply formatting to methods here, so they propagate globally
  for (let svc of fileDesc.service) {
    for (let i = 0; i < svc.method.length; i++) {
      svc.method[i] = new FormattedMethodDescriptor(svc.method[i], options);
    }
  }

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
    const prefix = camelToSnake(fileDesc.package.replace(/\./g, "_"));
    chunks.push(code`export const ${prefix}_PACKAGE_NAME = '${fileDesc.package}';`);

    if (
      options.useDate === DateOption.DATE &&
      fileDesc.messageType.find((message) =>
        message.field.find((field) => field.typeName === ".google.protobuf.Timestamp")
      )
    ) {
      chunks.push(makeProtobufTimestampWrapper());
    }
  }

  // We add `nestJs` here because enough though it doesn't use our encode/decode methods
  // for most/vanilla messages, we do generate static wrap/unwrap methods for the special
  // Struct/Value/wrapper types and use the `wrappers[...]` to have NestJS know about them.
  if (options.outputEncodeMethods || options.outputJsonMethods || options.outputTypeRegistry || options.nestJs) {
    // then add the encoder/decoder/base instance
    visit(
      fileDesc,
      sourceInfo,
      (fullName, message, _sInfo, fullProtoTypeName) => {
        const fullTypeName = maybePrefixPackage(fileDesc, fullProtoTypeName);
        const outputWrapAndUnwrap = isWrapperType(fullTypeName);

        // Only decode, fromPartial, and wrap use the createBase method
        if (
          (options.outputEncodeMethods && options.outputEncodeMethods !== "encode-no-creation") ||
          options.outputPartialMethods ||
          outputWrapAndUnwrap
        ) {
          chunks.push(generateBaseInstanceFactory(ctx, fullName, message, fullTypeName));
        }

        const staticMembers: Code[] = [];

        if (options.outputTypeRegistry) {
          staticMembers.push(code`$type: '${fullTypeName}' as const`);
        }

        if (options.outputEncodeMethods) {
          if (
            options.outputEncodeMethods === true ||
            options.outputEncodeMethods === "encode-only" ||
            options.outputEncodeMethods === "encode-no-creation"
          ) {
            staticMembers.push(generateEncode(ctx, fullName, message));
          }
          if (options.outputEncodeMethods === true || options.outputEncodeMethods === "decode-only") {
            staticMembers.push(generateDecode(ctx, fullName, message));
          }
        }
        if (options.useAsyncIterable) {
          staticMembers.push(generateEncodeTransform(fullName));
          staticMembers.push(generateDecodeTransform(fullName));
        }
        if (options.outputJsonMethods) {
          staticMembers.push(generateFromJson(ctx, fullName, fullTypeName, message));
          staticMembers.push(generateToJson(ctx, fullName, fullTypeName, message));
        }
        if (options.outputPartialMethods) {
          staticMembers.push(generateFromPartial(ctx, fullName, message));
        }

        const structFieldNames = {
          nullValue: maybeSnakeToCamel("null_value", ctx.options),
          numberValue: maybeSnakeToCamel("number_value", ctx.options),
          stringValue: maybeSnakeToCamel("string_value", ctx.options),
          boolValue: maybeSnakeToCamel("bool_value", ctx.options),
          structValue: maybeSnakeToCamel("struct_value", ctx.options),
          listValue: maybeSnakeToCamel("list_value", ctx.options),
        };
        if (options.nestJs) {
          staticMembers.push(...generateWrapDeep(ctx, fullTypeName, structFieldNames));
          staticMembers.push(...generateUnwrapDeep(ctx, fullTypeName, structFieldNames));
        } else {
          staticMembers.push(...generateWrapShallow(ctx, fullTypeName, structFieldNames));
          staticMembers.push(...generateUnwrapShallow(ctx, fullTypeName, structFieldNames));
        }

        if (staticMembers.length > 0) {
          chunks.push(code`
            export const ${def(fullName)} = {
              ${joinCode(staticMembers, { on: ",\n\n" })}
            };
          `);
        }

        if (options.outputTypeRegistry) {
          const messageTypeRegistry = impFile(options, "messageTypeRegistry@./typeRegistry");
          chunks.push(code`
            ${messageTypeRegistry}.set(${fullName}.$type, ${fullName});
          `);
        }
      },
      options
    );
  }

  if (options.nestJs) {
    if (fileDesc.messageType.find((message) => message.field.find(isStructType))) {
      chunks.push(makeProtobufStructWrapper(options));
    }
  }

  let hasServerStreamingMethods = false;
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
      if (!serviceDesc.name.toLowerCase().endsWith("service")) {
        serviceConstName = `${camelToSnake(serviceDesc.name)}_SERVICE_NAME`;
      }

      chunks.push(code`export const ${serviceConstName} = "${serviceDesc.name}";`);
    } else {
      const uniqueServices = [...new Set(options.outputServices)].sort();
      uniqueServices.forEach((outputService) => {
        if (outputService === ServiceOption.GRPC) {
          chunks.push(generateGrpcJsService(ctx, fileDesc, sInfo, serviceDesc));
        } else if (outputService === ServiceOption.NICE_GRPC) {
          chunks.push(generateNiceGrpcService(ctx, fileDesc, sInfo, serviceDesc));
        } else if (outputService === ServiceOption.GENERIC) {
          chunks.push(generateGenericServiceDefinition(ctx, fileDesc, sInfo, serviceDesc));
        } else if (outputService === ServiceOption.DEFAULT) {
          // This service could be Twirp or grpc-web or JSON (maybe). So far all of their
          // interfaces are fairly similar so we share the same service interface.
          chunks.push(generateService(ctx, fileDesc, sInfo, serviceDesc));

          if (options.outputClientImpl === true) {
            chunks.push(generateServiceClientImpl(ctx, fileDesc, serviceDesc));
          } else if (options.outputClientImpl === "grpc-web") {
            chunks.push(generateGrpcClientImpl(ctx, fileDesc, serviceDesc));
            chunks.push(generateGrpcServiceDesc(fileDesc, serviceDesc));
            serviceDesc.method.forEach((method) => {
              if (!method.clientStreaming) {
                chunks.push(generateGrpcMethodDesc(ctx, serviceDesc, method));
              }
              if (method.serverStreaming) {
                hasServerStreamingMethods = true;
              }
            });
          }
        }
      });
    }
    serviceDesc.method.forEach((methodDesc, _index) => {
      if (methodDesc.serverStreaming || methodDesc.clientStreaming) {
        hasStreamingMethods = true;
      }
    });
  });

  if (
    options.outputServices.includes(ServiceOption.DEFAULT) &&
    options.outputClientImpl &&
    fileDesc.service.length > 0
  ) {
    if (options.outputClientImpl === true) {
      chunks.push(generateRpcType(ctx, hasStreamingMethods));
    } else if (options.outputClientImpl === "grpc-web") {
      chunks.push(addGrpcWebMisc(ctx, hasServerStreamingMethods));
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
      } else {
        return code``;
      }
    })
  );

  // Finally, reset method definitions to their original state (unformatted)
  // This is mainly so that the `meta-typings` tests pass
  for (let svc of fileDesc.service) {
    for (let i = 0; i < svc.method.length; i++) {
      const methodInfo = svc.method[i];
      assertInstanceOf(methodInfo, FormattedMethodDescriptor);
      svc.method[i] = methodInfo.getSource();
    }
  }

  return [moduleName, joinCode(chunks, { on: "\n\n" })];
}

export type Utils = ReturnType<typeof makeDeepPartial> &
  ReturnType<typeof makeObjectIdMethods> &
  ReturnType<typeof makeTimestampMethods> &
  ReturnType<typeof makeByteUtils> &
  ReturnType<typeof makeLongUtils> &
  ReturnType<typeof makeComparisonUtils> &
  ReturnType<typeof makeNiceGrpcServerStreamingMethodResult> &
  ReturnType<typeof makeGrpcWebErrorClass>;

/** These are runtime utility methods used by the generated code. */
export function makeUtils(options: Options): Utils {
  const bytes = makeByteUtils();
  const longs = makeLongUtils(options, bytes);
  return {
    ...bytes,
    ...makeDeepPartial(options, longs),
    ...makeObjectIdMethods(),
    ...makeTimestampMethods(options, longs),
    ...longs,
    ...makeComparisonUtils(),
    ...makeNiceGrpcServerStreamingMethodResult(),
    ...makeGrpcWebErrorClass(bytes),
  };
}

function makeProtobufTimestampWrapper() {
  const wrappers = imp("wrappers@protobufjs");
  return code`
      ${wrappers}['.google.protobuf.Timestamp'] = {
        fromObject(value: Date) {
          return {
            seconds: value.getTime() / 1000,
            nanos: (value.getTime() % 1000) * 1e6,
          };
        },
        toObject(message: { seconds: number; nanos: number }) {
          return new Date(message.seconds * 1000 + message.nanos / 1e6);
        },
      } as any;`;
}

function makeProtobufStructWrapper(options: Options) {
  const wrappers = imp("wrappers@protobufjs");
  const Struct = impProto(options, "google/protobuf/struct", "Struct");
  return code`
    ${wrappers}['.google.protobuf.Struct'] = {
      fromObject: ${Struct}.wrap,
      toObject: ${Struct}.unwrap,
    } as any;`;
}

function makeLongUtils(options: Options, bytes: ReturnType<typeof makeByteUtils>) {
  // Regardless of which `forceLong` config option we're using, we always use
  // the `long` library to either represent or at least sanity-check 64-bit values
  const util = impFile(options, "util@protobufjs/minimal");
  const configure = impFile(options, "configure@protobufjs/minimal");

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
  const LongImp = options.esModuleInterop ? imp("Long=long") : imp("Long*long");

  const disclaimer = options.esModuleInterop
    ? ""
    : `
    // If you get a compile-error about 'Constructor<Long> and ... have no overlap',
    // add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.`;

  // Instead of exposing `LongImp` directly, let callers think that they are getting the
  // `imp(Long)` but really it is that + our long initialization snippet. This means the
  // initialization code will only be emitted in files that actually use the Long import.
  const Long = conditionalOutput(
    "Long",
    code`
      ${disclaimer}
      if (${util}.Long !== ${LongImp}) {
        ${util}.Long = ${LongImp} as any;
        ${configure}();
      }
    `
  );

  // TODO This is unused?
  const numberToLong = conditionalOutput(
    "numberToLong",
    code`
      function numberToLong(number: number) {
        return ${Long}.fromNumber(number);
      }
    `
  );

  const longToString = conditionalOutput(
    "longToString",
    code`
      function longToString(long: ${Long}) {
        return long.toString();
      }
    `
  );

  const longToBigint = conditionalOutput(
    "longToBigint",
    code`
      function longToBigint(long: ${Long}) {
        return BigInt(long.toString());
      }
    `
  );

  const longToNumber = conditionalOutput(
    "longToNumber",
    code`
      function longToNumber(long: ${Long}): number {
        if (long.gt(Number.MAX_SAFE_INTEGER)) {
          throw new ${bytes.globalThis}.Error("Value is larger than Number.MAX_SAFE_INTEGER")
        }
        return long.toNumber();
      }
    `
  );

  return { numberToLong, longToNumber, longToString, longToBigint, Long };
}

function makeByteUtils() {
  const globalThis = conditionalOutput(
    "tsProtoGlobalThis",
    code`
      declare var self: any | undefined;
      declare var window: any | undefined;
      declare var global: any | undefined;
      var tsProtoGlobalThis: any = (() => {
        if (typeof globalThis !== "undefined") return globalThis;
        if (typeof self !== "undefined") return self;
        if (typeof window !== "undefined") return window;
        if (typeof global !== "undefined") return global;
        throw "Unable to locate global object";
      })();
    `
  );

  const bytesFromBase64 = conditionalOutput(
    "bytesFromBase64",
    code`
      function bytesFromBase64(b64: string): Uint8Array {
        if (${globalThis}.Buffer) {
          return Uint8Array.from(${globalThis}.Buffer.from(b64, 'base64'));
        } else {
          const bin = ${globalThis}.atob(b64);
          const arr = new Uint8Array(bin.length);
          for (let i = 0; i < bin.length; ++i) {
              arr[i] = bin.charCodeAt(i);
          }
          return arr;
        }
      }
    `
  );
  const base64FromBytes = conditionalOutput(
    "base64FromBytes",
    code`
      function base64FromBytes(arr: Uint8Array): string {
        if (${globalThis}.Buffer) {
          return ${globalThis}.Buffer.from(arr).toString('base64')
        } else {
          const bin: string[] = [];
          arr.forEach((byte) => {
            bin.push(String.fromCharCode(byte));
          });
          return ${globalThis}.btoa(bin.join(''));
        }
      }
    `
  );
  return { globalThis, bytesFromBase64, base64FromBytes };
}

function makeDeepPartial(options: Options, longs: ReturnType<typeof makeLongUtils>) {
  let oneofCase = "";
  if (options.oneof === OneofOption.UNIONS) {
    oneofCase = `
      : T extends { ${maybeReadonly(options)}$case: string }
      ? { [K in keyof Omit<T, '$case'>]?: DeepPartial<T[K]> } & { ${maybeReadonly(options)}$case: T['$case'] }
    `;
  }

  const maybeExport = options.exportCommonSymbols ? "export" : "";
  // Allow passing longs as numbers or strings, nad we'll convert them
  const maybeLong =
    options.forceLong === LongOption.LONG ? code` : T extends ${longs.Long} ? string | number | Long ` : "";

  const Builtin = conditionalOutput(
    "Builtin",
    code`type Builtin = Date | Function | Uint8Array | string | number | boolean |${
      options.forceLong === LongOption.BIGINT ? " bigint |" : ""
    } undefined;`
  );

  // Based on https://github.com/sindresorhus/type-fest/pull/259
  const maybeExcludeType = options.outputTypeRegistry ? `| '$type'` : "";
  const Exact = conditionalOutput(
    "Exact",
    code`
      type KeysOfUnion<T> = T extends T ? keyof T : never;
      ${maybeExport} type Exact<P, I extends P> = P extends ${Builtin}
        ? P
        : P &
        { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> ${maybeExcludeType}>]: never };
    `
  );

  // Based on the type from ts-essentials
  const keys = options.outputTypeRegistry ? code`Exclude<keyof T, '$type'>` : code`keyof T`;
  const DeepPartial = conditionalOutput(
    "DeepPartial",
    code`
      ${maybeExport} type DeepPartial<T> =  T extends ${Builtin}
        ? T
        ${maybeLong}
        : T extends Array<infer U>
        ? Array<DeepPartial<U>>
        : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>${oneofCase}
        : T extends {}
        ? { [K in ${keys}]?: DeepPartial<T[K]> }
        : Partial<T>;
    `
  );

  return { Builtin, DeepPartial, Exact };
}

function makeObjectIdMethods() {
  const mongodb = imp("mongodb*mongodb");

  const fromProtoObjectId = conditionalOutput(
    "fromProtoObjectId",
    code`
      function fromProtoObjectId(oid: ObjectId): ${mongodb}.ObjectId {
        return new ${mongodb}.ObjectId(oid.value);
      }
    `
  );

  const fromJsonObjectId = conditionalOutput(
    "fromJsonObjectId",
    code`
      function fromJsonObjectId(o: any): ${mongodb}.ObjectId {
        if (o instanceof ${mongodb}.ObjectId) {
          return o;
        } else if (typeof o === "string") {
          return new ${mongodb}.ObjectId(o);
        } else {
          return ${fromProtoObjectId}(ObjectId.fromJSON(o));
        }
      }
    `
  );

  const toProtoObjectId = conditionalOutput(
    "toProtoObjectId",
    code`
      function toProtoObjectId(oid: ${mongodb}.ObjectId): ObjectId {
        const value = oid.toString();
        return { value };
      }
    `
  );

  return { fromJsonObjectId, fromProtoObjectId, toProtoObjectId };
}

function makeTimestampMethods(options: Options, longs: ReturnType<typeof makeLongUtils>) {
  const Timestamp = impProto(options, "google/protobuf/timestamp", "Timestamp");

  let seconds: string | Code = "date.getTime() / 1_000";
  let toNumberCode = "t.seconds";
  if (options.forceLong === LongOption.LONG) {
    toNumberCode = "t.seconds.toNumber()";
    seconds = code`${longs.numberToLong}(date.getTime() / 1_000)`;
  } else if (options.forceLong === LongOption.BIGINT) {
    toNumberCode = "Number(t.seconds.toString())";
    seconds = code`BigInt(Math.trunc(date.getTime() / 1_000))`;
  } else if (options.forceLong === LongOption.STRING) {
    toNumberCode = "Number(t.seconds)";
    // Must discard the fractional piece here
    // Otherwise the fraction ends up on the seconds when parsed as a Long
    // (note this only occurs when the string is > 8 characters)
    seconds = "Math.trunc(date.getTime() / 1_000).toString()";
  }

  const maybeTypeField = options.outputTypeRegistry ? `$type: 'google.protobuf.Timestamp',` : "";

  const toTimestamp = conditionalOutput(
    "toTimestamp",
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
    "fromTimestamp",
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
    "fromJsonTimestamp",
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

function makeComparisonUtils() {
  const isObject = conditionalOutput(
    "isObject",
    code`
    function isObject(value: any): boolean {
      return typeof value === 'object' && value !== null;
    }`
  );

  const isSet = conditionalOutput(
    "isSet",
    code`
    function isSet(value: any): boolean {
      return value !== null && value !== undefined;
    }`
  );

  return { isObject, isSet };
}

function makeNiceGrpcServerStreamingMethodResult() {
  const NiceGrpcServerStreamingMethodResult = conditionalOutput(
    "ServerStreamingMethodResult",
    code`
      export type ServerStreamingMethodResult<Response> = {
        [Symbol.asyncIterator](): AsyncIterator<Response, void>;
      };
    `
  );

  return { NiceGrpcServerStreamingMethodResult };
}

function makeGrpcWebErrorClass(bytes: ReturnType<typeof makeByteUtils>) {
  const GrpcWebError = conditionalOutput(
    "GrpcWebError",
    code`
      export class GrpcWebError extends ${bytes.globalThis}.Error {
        constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
          super(message);
        }
      }
    `
  );

  return { GrpcWebError };
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
    const q = isOptionalProperty(fieldDesc, messageDesc.options, options) ? "?" : "";
    chunks.push(code`${maybeReadonly(options)}${name}${q}: ${type}, `);
  });

  if (ctx.options.unknownFields) {
    chunks.push(code`_unknownFields?: {[key: number]: Uint8Array[]},`);
  }

  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

function generateOneofProperty(
  ctx: Context,
  messageDesc: DescriptorProto,
  oneofIndex: number,
  sourceInfo: SourceInfo
): Code {
  const { options } = ctx;
  const fields = messageDesc.field.filter((field) => isWithinOneOf(field) && field.oneofIndex === oneofIndex);
  const mbReadonly = maybeReadonly(options);
  const unionType = joinCode(
    fields.map((f) => {
      let fieldName = maybeSnakeToCamel(f.name, options);
      let typeName = toTypeName(ctx, messageDesc, f);
      return code`{ ${mbReadonly}$case: '${fieldName}', ${mbReadonly}${fieldName}: ${typeName} }`;
    }),
    { on: " | " }
  );

  const name = maybeSnakeToCamel(messageDesc.oneofDecl[oneofIndex].name, options);
  return code`${mbReadonly}${name}?: ${unionType},`;

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

// Create a function that constructs 'base' instance with default values for decode to use as a prototype
function generateBaseInstanceFactory(
  ctx: Context,
  fullName: string,
  messageDesc: DescriptorProto,
  fullTypeName: string
): Code {
  const { options } = ctx;
  const fields: Code[] = [];

  // When oneof=unions, we generate a single property with an ADT per `oneof` clause.
  const processedOneofs = new Set<number>();

  for (const field of messageDesc.field) {
    if (isWithinOneOfThatShouldBeUnion(ctx.options, field)) {
      const { oneofIndex } = field;
      if (!processedOneofs.has(oneofIndex)) {
        processedOneofs.add(oneofIndex);

        const name = maybeSnakeToCamel(messageDesc.oneofDecl[oneofIndex].name, ctx.options);
        fields.push(code`${name}: undefined`);
      }
      continue;
    }

    if (!options.initializeFieldsAsUndefined && isOptionalProperty(field, messageDesc.options, options)) {
      continue;
    }

    const name = maybeSnakeToCamel(field.name, ctx.options);
    const val = isWithinOneOf(field)
      ? "undefined"
      : isMapType(ctx, messageDesc, field)
      ? ctx.options.useMapType
        ? "new Map()"
        : "{}"
      : isRepeated(field)
      ? "[]"
      : defaultValue(ctx, field);

    fields.push(code`${name}: ${val}`);
  }

  if (ctx.options.outputTypeRegistry) {
    fields.unshift(code`$type: '${fullTypeName}'`);
  }

  if (ctx.options.unknownFields && ctx.options.initializeFieldsAsUndefined) {
    fields.push(code`_unknownFields: {}`);
  }

  return code`
    function createBase${fullName}(): ${fullName} {
      return { ${joinCode(fields, { on: "," })} };
    }
  `;
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];

  let createBase = code`createBase${fullName}()`;
  if (options.usePrototypeForDefaults) {
    createBase = code`Object.create(${createBase}) as ${fullName}`;
  }

  const Reader = impFile(ctx.options, "Reader@protobufjs/minimal");

  // create the basic function declaration
  chunks.push(code`
    decode(
      input: ${Reader} | Uint8Array,
      length?: number,
    ): ${fullName} {
      const reader = input instanceof ${Reader} ? input : ${Reader}.create(input);
      let end = length === undefined ? reader.len : reader.pos + length;
  `);

  chunks.push(code`const message = ${createBase}${maybeAsAny(options)};`);

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

    const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
    const tagCheck = code`
      if(tag != ${tag})
        break;
    `;

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
        } else if (options.forceLong === LongOption.BIGINT) {
          readSnippet = code`${utils.longToBigint}(${readSnippet} as Long)`;
        } else {
          readSnippet = code`${utils.longToNumber}(${readSnippet} as Long)`;
        }
      } else if (isEnum(field)) {
        if (options.stringEnums) {
          const fromJson = getEnumMethod(ctx, field.typeName, "FromJSON");
          readSnippet = code`${fromJson}(${readSnippet})`;
        } else {
          readSnippet = code`${readSnippet} as any`;
        }
      }
    } else if (isValueType(ctx, field)) {
      const type = basicTypeName(ctx, field, { keepValueType: true });
      const unwrap = (decodedValue: any): Code => {
        if (isListValueType(field) || isStructType(field) || isAnyValueType(field) || isFieldMaskType(field)) {
          return code`${type}.unwrap(${decodedValue})`;
        }
        return code`${decodedValue}.value`;
      };
      const decoder = code`${type}.decode(reader, reader.uint32())`;
      readSnippet = code`${unwrap(decoder)}`;
    } else if (isTimestamp(field) && (options.useDate === DateOption.DATE || options.useDate === DateOption.STRING)) {
      const type = basicTypeName(ctx, field, { keepValueType: true });
      readSnippet = code`${utils.fromTimestamp}(${type}.decode(reader, reader.uint32()))`;
    } else if (isObjectId(field) && options.useMongoObjectId) {
      const type = basicTypeName(ctx, field, { keepValueType: true });
      readSnippet = code`${utils.fromProtoObjectId}(${type}.decode(reader, reader.uint32()))`;
    } else if (isMessage(field)) {
      const type = basicTypeName(ctx, field);

      if (field.type == FieldDescriptorProto_Type.TYPE_GROUP) readSnippet = code`${type}.decode(reader)`;
      else readSnippet = code`${type}.decode(reader, reader.uint32())`;
    } else {
      throw new Error(`Unhandled field ${field}`);
    }

    // and then use the snippet to handle repeated fields if necessary
    const initializerNecessary =
      !options.initializeFieldsAsUndefined && isOptionalProperty(field, messageDesc.options, options);

    if (isRepeated(field)) {
      const maybeNonNullAssertion = ctx.options.useOptionals === "all" ? "!" : "";

      if (isMapType(ctx, messageDesc, field)) {
        // We need a unique const within the `cast` statement
        const varName = `entry${field.number}`;

        const valueSetterSnippet = ctx.options.useMapType
          ? `message.${fieldName}${maybeNonNullAssertion}.set(${varName}.key, ${varName}.value)`
          : `message.${fieldName}${maybeNonNullAssertion}[${varName}.key] = ${varName}.value`;
        const initializerSnippet = initializerNecessary
          ? `
            if(message.${fieldName} === undefined)
              message.${fieldName} = ${ctx.options.useMapType ? "new Map()" : "{}"};
            `
          : "";
        chunks.push(code`
          ${tagCheck}
          const ${varName} = ${readSnippet};
          if (${varName}.value !== undefined) {
            ${initializerSnippet}
            ${valueSetterSnippet};
          }
        `);
      } else {
        const initializerSnippet = initializerNecessary
          ? `if(message.${fieldName} === undefined)
              message.${fieldName} = [];`
          : "";
        if (packedType(field.type) === undefined) {
          chunks.push(code`
            ${tagCheck}
            ${initializerSnippet}
            message.${fieldName}${maybeNonNullAssertion}.push(${readSnippet});
          `);
        } else {
          const packedTag = ((field.number << 3) | 2) >>> 0;

          chunks.push(code`
            if(tag == ${tag}){
              ${initializerSnippet}
              message.${fieldName}${maybeNonNullAssertion}.push(${readSnippet});
              continue;
            }

            if(tag == ${packedTag}){
              ${initializerSnippet}
              const end2 = reader.uint32() + reader.pos;
              while (reader.pos < end2) {
                message.${fieldName}${maybeNonNullAssertion}.push(${readSnippet});
              }

              continue;
            }

            break;
          `);
        }
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      let oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      chunks.push(code`
        ${tagCheck}
        message.${oneofName} = { $case: '${fieldName}', ${fieldName}: ${readSnippet} };
      `);
    } else {
      chunks.push(code`
        ${tagCheck}
        message.${fieldName} = ${readSnippet};
      `);
    }

    if (!isRepeated(field) || packedType(field.type) === undefined) chunks.push(code`continue;`);
  });

  chunks.push(code`}`);
  chunks.push(code`
      if((tag & 7) == 4 || tag == 0)
        break;
  `);

  if (options.unknownFields) {
    let unknownFieldsInitializerSnippet = "";
    let maybeNonNullAssertion = options.initializeFieldsAsUndefined ? "!" : "";

    if (!options.initializeFieldsAsUndefined) {
      unknownFieldsInitializerSnippet = `
        if(message._unknownFields === undefined)
          message._unknownFields = {};
      `;
    }

    chunks.push(code`
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      ${unknownFieldsInitializerSnippet}
      const list = message._unknownFields${maybeNonNullAssertion}[tag];

      if(list === undefined)
        message._unknownFields${maybeNonNullAssertion}[tag] = [buf];
      else
        list.push(buf);
    `);
  } else {
    chunks.push(code`
        reader.skipType(tag & 7);
    `);
  }

  // and then wrap up the while/return
  chunks.push(code`}`);
  chunks.push(code`return message;`);

  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

/** Returns a generic writer.doSomething based on the basic type */
function getEncodeWriteSnippet(ctx: Context, field: FieldDescriptorProto): (place: string) => Code {
  const { options, utils } = ctx;
  if (isEnum(field) && options.stringEnums) {
    const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
    const toNumber = getEnumMethod(ctx, field.typeName, "ToNumber");
    return (place) => code`writer.uint32(${tag}).${toReaderCall(field)}(${toNumber}(${place}))`;
  } else if (isLong(field) && options.forceLong === LongOption.BIGINT) {
    const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
    return (place) => code`writer.uint32(${tag}).${toReaderCall(field)}(${place}.toString())`;
  } else if (isScalar(field) || isEnum(field)) {
    const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
    return (place) => code`writer.uint32(${tag}).${toReaderCall(field)}(${place})`;
  } else if (isObjectId(field) && options.useMongoObjectId) {
    const tag = ((field.number << 3) | 2) >>> 0;
    const type = basicTypeName(ctx, field, { keepValueType: true });
    return (place) => code`${type}.encode(${utils.toProtoObjectId}(${place}), writer.uint32(${tag}).fork()).ldelim()`;
  } else if (isTimestamp(field) && (options.useDate === DateOption.DATE || options.useDate === DateOption.STRING)) {
    const tag = ((field.number << 3) | 2) >>> 0;
    const type = basicTypeName(ctx, field, { keepValueType: true });
    return (place) => code`${type}.encode(${utils.toTimestamp}(${place}), writer.uint32(${tag}).fork()).ldelim()`;
  } else if (isValueType(ctx, field)) {
    const maybeTypeField = options.outputTypeRegistry ? `$type: '${field.typeName.slice(1)}',` : "";

    const type = basicTypeName(ctx, field, { keepValueType: true });
    const wrappedValue = (place: string): Code => {
      if (isAnyValueType(field) || isListValueType(field) || isStructType(field) || isFieldMaskType(field)) {
        return code`${type}.wrap(${place})`;
      }
      return code`{${maybeTypeField} value: ${place}!}`;
    };

    const tag = ((field.number << 3) | 2) >>> 0;
    return (place) => code`${type}.encode(${wrappedValue(place)}, writer.uint32(${tag}).fork()).ldelim()`;
  } else if (isMessage(field)) {
    const type = basicTypeName(ctx, field);

    if (field.type == FieldDescriptorProto_Type.TYPE_GROUP) {
      const startTag = ((field.number << 3) | 3) >>> 0,
        endTag = ((field.number << 3) | 4) >>> 0;
      return (place) => code`${type}.encode(${place}, writer.uint32(${startTag})).uint32(${endTag})`;
    }

    const tag = ((field.number << 3) | 2) >>> 0;
    return (place) => code`${type}.encode(${place}, writer.uint32(${tag}).fork()).ldelim()`;
  } else {
    throw new Error(`Unhandled field ${field}`);
  }
}

/** Creates a function to encode a message by loop overing the tags. */
function generateEncode(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];

  const Writer = impFile(ctx.options, "Writer@protobufjs/minimal");

  // create the basic function declaration
  chunks.push(code`
    encode(
      ${messageDesc.field.length > 0 || options.unknownFields ? "message" : "_"}: ${fullName},
      writer: ${Writer} = ${Writer}.create(),
    ): ${Writer} {
  `);

  const processedOneofs = new Set<number>();
  const oneOfFieldsDict = messageDesc.field
    .filter((field) => isWithinOneOfThatShouldBeUnion(options, field))
    .reduce<{ [key: number]: FieldDescriptorProto[] }>(
      (result, field) => ((result[field.oneofIndex] || (result[field.oneofIndex] = [])).push(field), result),
      {}
    );

  // then add a case for each field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    // get a generic writer.doSomething based on the basic type
    const writeSnippet = getEncodeWriteSnippet(ctx, field);

    const isOptional = isOptionalProperty(field, messageDesc.options, options);
    if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
        const maybeTypeField = options.outputTypeRegistry ? `$type: '${field.typeName.slice(1)}',` : "";
        const entryWriteSnippet = isValueType(ctx, valueType)
          ? code`
              if (value !== undefined) {
                ${writeSnippet(`{ ${maybeTypeField} key: key as any, value }`)};
              }
            `
          : writeSnippet(`{ ${maybeTypeField} key: key as any, value }`);
        const optionalAlternative = isOptional ? (ctx.options.useMapType ? " || new Map()" : " || {}") : "";

        if (ctx.options.useMapType) {
          chunks.push(code`
            (message.${fieldName}${optionalAlternative}).forEach((value, key) => {
              ${entryWriteSnippet}
            });
          `);
        } else {
          chunks.push(code`
            Object.entries(message.${fieldName}${optionalAlternative}).forEach(([key, value]) => {
              ${entryWriteSnippet}
            });
          `);
        }
      } else if (packedType(field.type) === undefined) {
        const listWriteSnippet = code`
          for (const v of message.${fieldName}) {
            ${writeSnippet("v!")};
          }
        `;
        if (isOptional) {
          chunks.push(code`
            if (message.${fieldName} !== undefined && message.${fieldName}.length !== 0) {
              ${listWriteSnippet}
            }
          `);
        } else {
          chunks.push(listWriteSnippet);
        }
      } else if (isEnum(field) && options.stringEnums) {
        // This is a lot like the `else` clause, but we wrap `fooToNumber` around it.
        // Ideally we'd reuse `writeSnippet` here, but `writeSnippet` has the `writer.uint32(tag)`
        // embedded inside of it, and we want to drop that so that we can encode it packed
        // (i.e. just one tag and multiple values).
        const tag = ((field.number << 3) | 2) >>> 0;
        const toNumber = getEnumMethod(ctx, field.typeName, "ToNumber");
        const listWriteSnippet = code`
          writer.uint32(${tag}).fork();
          for (const v of message.${fieldName}) {
            writer.${toReaderCall(field)}(${toNumber}(v));
          }
          writer.ldelim();
        `;
        if (isOptional) {
          chunks.push(code`
            if (message.${fieldName} !== undefined && message.${fieldName}.length !== 0) {
              ${listWriteSnippet}
            }
          `);
        } else {
          chunks.push(listWriteSnippet);
        }
      } else {
        // Ideally we'd reuse `writeSnippet` but it has tagging embedded inside of it.
        const tag = ((field.number << 3) | 2) >>> 0;
        const rhs = (x: string) => (isLong(field) && options.forceLong === LongOption.BIGINT ? `${x}.toString()` : x);
        const listWriteSnippet = code`
          writer.uint32(${tag}).fork();
          for (const v of message.${fieldName}) {
            writer.${toReaderCall(field)}(${rhs("v")});
          }
          writer.ldelim();
        `;
        if (isOptional) {
          chunks.push(code`
            if (message.${fieldName} !== undefined && message.${fieldName}.length !== 0) {
              ${listWriteSnippet}
            }
          `);
        } else {
          chunks.push(listWriteSnippet);
        }
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      if (!processedOneofs.has(field.oneofIndex)) {
        processedOneofs.add(field.oneofIndex);

        const oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
        chunks.push(code`switch (message.${oneofName}?.$case) {`);
        for (const oneOfField of oneOfFieldsDict[field.oneofIndex]) {
          const writeSnippet = getEncodeWriteSnippet(ctx, oneOfField);
          const oneOfFieldName = maybeSnakeToCamel(oneOfField.name, ctx.options);
          chunks.push(code`case "${oneOfFieldName}":
            ${writeSnippet(`message.${oneofName}.${oneOfFieldName}`)};
            break;`);
        }
        chunks.push(code`}`);
      }
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
        if (${notDefaultCheck(ctx, field, messageDesc.options, `message.${fieldName}`)}) {
          ${writeSnippet(`message.${fieldName}`)};
        }
      `);
    } else {
      chunks.push(code`${writeSnippet(`message.${fieldName}`)};`);
    }
  });

  if (options.unknownFields) {
    chunks.push(code`if (message._unknownFields !== undefined) {
      for (const key in message._unknownFields) {
        const values = message._unknownFields[key];
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)['_push'](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value
          );
        }
      }
    }`);
  }

  chunks.push(code`return writer;`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

/**
 * Creates a function to decode a message from JSON.
 *
 * This is very similar to decode, we loop through looking for properties, with
 * a few special cases for https://developers.google.com/protocol-buffers/docs/proto3#json.
 * */
function generateFromJson(ctx: Context, fullName: string, fullTypeName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];

  // create the basic function declaration
  chunks.push(code`
    fromJSON(${messageDesc.field.length > 0 ? "object" : "_"}: any): ${fullName} {
      return {
  `);

  if (ctx.options.outputTypeRegistry) {
    chunks.push(code`$type: ${fullName}.$type,`);
  }

  const oneofFieldsCases = messageDesc.oneofDecl.map((oneof, oneofIndex) =>
    messageDesc.field.filter(isWithinOneOf).filter((field) => field.oneofIndex === oneofIndex)
  );

  const canonicalFromJson: { [key: string]: { [field: string]: (from: string) => Code } } = {
    ["google.protobuf.FieldMask"]: {
      paths: (from: string) => code`typeof(${from}) === 'string'
        ? ${from}.split(",").filter(Boolean)
        : Array.isArray(${from}?.paths)
        ? ${from}.paths.map(String)
        : []`,
    },
  };

  // add a check for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);
    const jsonName = getFieldJsonName(field, options);
    const jsonProperty = getPropertyAccessor("object", jsonName);
    const jsonPropertyOptional = getPropertyAccessor("object", jsonName, true);

    // get code that extracts value from incoming object
    const readSnippet = (from: string): Code => {
      if (isEnum(field)) {
        const fromJson = getEnumMethod(ctx, field.typeName, "FromJSON");
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
          const cstr = capitalize(basicTypeName(ctx, field, { keepValueType: true }).toCodeString([]));
          return code`${cstr}.fromValue(${from})`;
        } else if (isLong(field) && options.forceLong === LongOption.BIGINT) {
          return code`BigInt(${from})`;
        } else {
          const cstr = capitalize(basicTypeName(ctx, field, { keepValueType: true }).toCodeString([]));
          return code`${cstr}(${from})`;
        }
      } else if (isObjectId(field) && options.useMongoObjectId) {
        return code`${utils.fromJsonObjectId}(${from})`;
      } else if (isTimestamp(field) && options.useDate === DateOption.STRING) {
        return code`String(${from})`;
      } else if (
        isTimestamp(field) &&
        (options.useDate === DateOption.DATE || options.useDate === DateOption.TIMESTAMP)
      ) {
        return code`${utils.fromJsonTimestamp}(${from})`;
      } else if (isAnyValueType(field) || isStructType(field)) {
        return code`${from}`;
      } else if (isFieldMaskType(field)) {
        const type = basicTypeName(ctx, field, { keepValueType: true });
        return code`${type}.unwrap(${type}.fromJSON(${from}))`;
      } else if (isListValueType(field)) {
        return code`[...${from}]`;
      } else if (isValueType(ctx, field)) {
        const valueType = valueTypeName(ctx, field.typeName)!;
        if (isLongValueType(field) && options.forceLong === LongOption.LONG) {
          return code`${capitalize(valueType.toCodeString([]))}.fromValue(${from})`;
        } else if (isLongValueType(field) && options.forceLong === LongOption.BIGINT) {
          return code`BigInt(${from})`;
        } else if (isBytesValueType(field)) {
          return code`new ${capitalize(valueType.toCodeString([]))}(${from})`;
        } else {
          return code`${capitalize(valueType.toCodeString([]))}(${from})`;
        }
      } else if (isMessage(field)) {
        if (isRepeated(field) && isMapType(ctx, messageDesc, field)) {
          const { valueField, valueType } = detectMapType(ctx, messageDesc, field)!;
          if (isPrimitive(valueField)) {
            // TODO Can we not copy/paste this from ^?
            if (isBytes(valueField)) {
              if (options.env === EnvOption.NODE) {
                return code`Buffer.from(${utils.bytesFromBase64}(${from} as string))`;
              } else {
                return code`${utils.bytesFromBase64}(${from} as string)`;
              }
            } else if (isLong(valueField) && options.forceLong === LongOption.LONG) {
              return code`Long.fromValue(${from} as Long | string)`;
            } else if (isLong(valueField) && options.forceLong === LongOption.BIGINT) {
              return code`BigInt(${from} as string | number | bigint | boolean)`;
            } else if (isEnum(valueField)) {
              const fromJson = getEnumMethod(ctx, valueField.typeName, "FromJSON");
              return code`${fromJson}(${from})`;
            } else {
              const cstr = capitalize(valueType.toCodeString([]));
              return code`${cstr}(${from})`;
            }
          } else if (isObjectId(valueField) && options.useMongoObjectId) {
            return code`${utils.fromJsonObjectId}(${from})`;
          } else if (isTimestamp(valueField) && options.useDate === DateOption.STRING) {
            return code`String(${from})`;
          } else if (
            isTimestamp(valueField) &&
            (options.useDate === DateOption.DATE || options.useDate === DateOption.TIMESTAMP)
          ) {
            return code`${utils.fromJsonTimestamp}(${from})`;
          } else if (isValueType(ctx, valueField)) {
            return code`${from} as ${valueType}`;
          } else if (isAnyValueType(valueField)) {
            return code`${from}`;
          } else {
            return code`${valueType}.fromJSON(${from})`;
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
    if (canonicalFromJson[fullTypeName]?.[fieldName]) {
      chunks.push(code`${fieldName}: ${canonicalFromJson[fullTypeName][fieldName]("object")},`);
    } else if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        const fieldType = toTypeName(ctx, messageDesc, field);
        const i = convertFromObjectKey(ctx, messageDesc, field, "key");

        if (ctx.options.useMapType) {
          chunks.push(code`
            ${fieldName}: ${ctx.utils.isObject}(${jsonProperty})
              ? Object.entries(${jsonProperty}).reduce<${fieldType}>((acc, [key, value]) => {
                  acc.set(${i}, ${readSnippet("value")});
                  return acc;
                }, new Map())
              : new Map(),
          `);
        } else {
          chunks.push(code`
            ${fieldName}: ${ctx.utils.isObject}(${jsonProperty})
              ? Object.entries(${jsonProperty}).reduce<${fieldType}>((acc, [key, value]) => {
                  acc[${i}] = ${readSnippet("value")};
                  return acc;
                }, {})
              : {},
          `);
        }
      } else {
        const readValueSnippet = readSnippet("e");
        if (readValueSnippet.toString() === code`e`.toString()) {
          chunks.push(code`${fieldName}: Array.isArray(${jsonPropertyOptional}) ? [...${jsonProperty}] : [],`);
        } else {
          // Explicit `any` type required to make TS with noImplicitAny happy. `object` is also `any` here.
          chunks.push(code`
            ${fieldName}: Array.isArray(${jsonPropertyOptional}) ? ${jsonProperty}.map((e: any) => ${readValueSnippet}): [],
          `);
        }
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      const cases = oneofFieldsCases[field.oneofIndex];
      const firstCase = cases[0];
      const lastCase = cases[cases.length - 1];

      if (field === firstCase) {
        const fieldName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
        chunks.push(code`${fieldName}: `);
      }

      const ternaryIf = code`${ctx.utils.isSet}(${jsonProperty})`;
      const ternaryThen = code`{ $case: '${fieldName}', ${fieldName}: ${readSnippet(`${jsonProperty}`)}`;
      chunks.push(code`${ternaryIf} ? ${ternaryThen}} : `);

      if (field === lastCase) {
        chunks.push(code`undefined,`);
      }
    } else if (isAnyValueType(field)) {
      chunks.push(code`${fieldName}: ${ctx.utils.isSet}(${jsonPropertyOptional})
        ? ${readSnippet(`${jsonProperty}`)}
        : undefined,
      `);
    } else if (isStructType(field)) {
      chunks.push(
        code`${fieldName}: ${ctx.utils.isObject}(${jsonProperty})
          ? ${readSnippet(`${jsonProperty}`)}
          : undefined,`
      );
    } else if (isListValueType(field)) {
      chunks.push(code`
        ${fieldName}: Array.isArray(${jsonProperty})
          ? ${readSnippet(`${jsonProperty}`)}
          : undefined,
      `);
    } else {
      const fallback = isWithinOneOf(field) ? "undefined" : defaultValue(ctx, field);
      chunks.push(code`
        ${fieldName}: ${ctx.utils.isSet}(${jsonProperty})
          ? ${readSnippet(`${jsonProperty}`)}
          : ${fallback},
      `);
    }
  });
  // and then wrap up the switch/while/return
  chunks.push(code`};`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

function generateCanonicalToJson(fullName: string, fullProtobufTypeName: string): Code | undefined {
  if (isFieldMaskTypeName(fullProtobufTypeName)) {
    return code`
    toJSON(message: ${fullName}): string {
      return message.paths.join(',');
    }
  `;
  }
  return undefined;
}

function generateToJson(
  ctx: Context,
  fullName: string,
  fullProtobufTypeName: string,
  messageDesc: DescriptorProto
): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];

  const canonicalToJson = generateCanonicalToJson(fullName, fullProtobufTypeName);
  if (canonicalToJson) {
    chunks.push(canonicalToJson);
    return joinCode(chunks, { on: "\n" });
  }

  // create the basic function declaration
  chunks.push(code`
    toJSON(${messageDesc.field.length > 0 ? "message" : "_"}: ${fullName}): unknown {
      const obj: any = {};
  `);

  // then add a case for each field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);
    const jsonName = getFieldJsonName(field, options);
    const jsonProperty = getPropertyAccessor("obj", jsonName);

    const readSnippet = (from: string): Code => {
      if (isEnum(field)) {
        const toJson = getEnumMethod(ctx, field.typeName, "ToJSON");
        return isWithinOneOf(field)
          ? code`${from} !== undefined ? ${toJson}(${from}) : undefined`
          : code`${toJson}(${from})`;
      } else if (isObjectId(field) && options.useMongoObjectId) {
        return code`${from}.toString()`;
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
          const toJson = getEnumMethod(ctx, valueType.typeName, "ToJSON");
          return code`${toJson}(${from})`;
        } else if (isBytes(valueType)) {
          return code`${utils.base64FromBytes}(${from})`;
        } else if (isObjectId(valueType) && options.useMongoObjectId) {
          return code`${from}.toString()`;
        } else if (isTimestamp(valueType) && options.useDate === DateOption.DATE) {
          return code`${from}.toISOString()`;
        } else if (isTimestamp(valueType) && options.useDate === DateOption.STRING) {
          return code`${from}`;
        } else if (isTimestamp(valueType) && options.useDate === DateOption.TIMESTAMP) {
          return code`${utils.fromTimestamp}(${from}).toISOString()`;
        } else if (isLong(valueType) && options.forceLong === LongOption.LONG) {
          return code`${from}.toString()`;
        } else if (isLong(valueType) && options.forceLong === LongOption.BIGINT) {
          return code`${from}.toString()`;
        } else if (isWholeNumber(valueType) && !(isLong(valueType) && options.forceLong === LongOption.STRING)) {
          return code`Math.round(${from})`;
        } else if (isScalar(valueType) || isValueType(ctx, valueType)) {
          return code`${from}`;
        } else if (isAnyValueType(valueType)) {
          return code`${from}`;
        } else {
          const type = basicTypeName(ctx, valueType);
          return code`${type}.toJSON(${from})`;
        }
      } else if (isAnyValueType(field)) {
        return code`${from}`;
      } else if (isFieldMaskType(field)) {
        const type = basicTypeName(ctx, field, { keepValueType: true });
        return code`${type}.toJSON(${type}.wrap(${from}))`;
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
        const v = isWithinOneOf(field) ? "undefined" : defaultValue(ctx, field);
        return code`(${from} || ${v}).toString()`;
      } else if (isLong(field) && options.forceLong === LongOption.BIGINT) {
        return code`${from}.toString()`;
      } else if (isWholeNumber(field) && !(isLong(field) && options.forceLong === LongOption.STRING)) {
        return code`Math.round(${from})`;
      } else {
        return code`${from}`;
      }
    };

    if (isMapType(ctx, messageDesc, field)) {
      // Maps might need their values transformed, i.e. bytes --> base64
      const i = convertToObjectKey(ctx, messageDesc, field, "k");

      if (ctx.options.useMapType) {
        chunks.push(code`
          ${jsonProperty} = {};
          if (message.${fieldName}) {
            message.${fieldName}.forEach((v, k) => {
              ${jsonProperty}[${i}] = ${readSnippet("v")};
            });
          }
        `);
      } else {
        chunks.push(code`
          ${jsonProperty} = {};
          if (message.${fieldName}) {
            Object.entries(message.${fieldName}).forEach(([k, v]) => {
              ${jsonProperty}[${i}] = ${readSnippet("v")};
            });
          }
        `);
      }
    } else if (isRepeated(field)) {
      // Arrays might need their elements transformed
      chunks.push(code`
        if (message.${fieldName}) {
          ${jsonProperty} = message.${fieldName}.map(e => ${readSnippet("e")});
        } else {
          ${jsonProperty} = [];
        }
      `);
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      // oneofs in a union are only output as `oneof name = ...`
      const oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      const v = readSnippet(`message.${oneofName}?.${fieldName}`);
      chunks.push(code`message.${oneofName}?.$case === '${fieldName}' && (${jsonProperty} = ${v});`);
    } else {
      const v = readSnippet(`message.${fieldName}`);
      chunks.push(code`message.${fieldName} !== undefined && (${jsonProperty} = ${v});`);
    }
  });
  chunks.push(code`return obj;`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

function generateFromPartial(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, utils } = ctx;
  const chunks: Code[] = [];

  // create the create function definition
  if (ctx.options.useExactTypes) {
    chunks.push(code`
      create<I extends ${utils.Exact}<${utils.DeepPartial}<${fullName}>, I>>(base?: I): ${fullName} {
    `);
  } else {
    chunks.push(code`
      create(base?: ${utils.DeepPartial}<${fullName}>): ${fullName} {
    `);
  }

  chunks.push(code`
    return ${fullName}.fromPartial(base ?? {})
  `);

  chunks.push(code`},`, code``);

  // create the fromPartial function declaration
  const paramName = messageDesc.field.length > 0 ? "object" : "_";

  if (ctx.options.useExactTypes) {
    chunks.push(code`
      fromPartial<I extends ${utils.Exact}<${utils.DeepPartial}<${fullName}>, I>>(${paramName}: I): ${fullName} {
    `);
  } else {
    chunks.push(code`
      fromPartial(${paramName}: ${utils.DeepPartial}<${fullName}>): ${fullName} {
    `);
  }

  let createBase = code`createBase${fullName}()`;
  if (options.usePrototypeForDefaults) {
    createBase = code`Object.create(${createBase}) as ${fullName}`;
  }

  chunks.push(code`const message = ${createBase}${maybeAsAny(options)};`);

  // add a check for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = maybeSnakeToCamel(field.name, options);

    const readSnippet = (from: string): Code => {
      if ((isLong(field) || isLongValueType(field)) && options.forceLong === LongOption.LONG) {
        return code`Long.fromValue(${from})`;
      } else if (isObjectId(field) && options.useMongoObjectId) {
        return code`${from} as mongodb.ObjectId`;
      } else if (
        isPrimitive(field) ||
        (isTimestamp(field) && (options.useDate === DateOption.DATE || options.useDate === DateOption.STRING)) ||
        isValueType(ctx, field)
      ) {
        return code`${from}`;
      } else if (isMessage(field)) {
        if (isRepeated(field) && isMapType(ctx, messageDesc, field)) {
          const { valueField, valueType } = detectMapType(ctx, messageDesc, field)!;
          if (isPrimitive(valueField)) {
            if (isBytes(valueField)) {
              return code`${from}`;
            } else if (isEnum(valueField)) {
              return code`${from} as ${valueType}`;
            } else if (isLong(valueField) && options.forceLong === LongOption.LONG) {
              return code`Long.fromValue(${from})`;
            } else if (isLong(valueField) && options.forceLong === LongOption.BIGINT) {
              return code`BigInt(${from} as string | number | bigint | boolean)`;
            } else {
              const cstr = capitalize(valueType.toCodeString([]));
              return code`${cstr}(${from})`;
            }
          } else if (isAnyValueType(valueField)) {
            return code`${from}`;
          } else if (isObjectId(valueField) && options.useMongoObjectId) {
            return code`${from} as mongodb.ObjectId`;
          } else if (
            isTimestamp(valueField) &&
            (options.useDate === DateOption.DATE || options.useDate === DateOption.STRING)
          ) {
            return code`${from}`;
          } else if (isValueType(ctx, valueField)) {
            return code`${from}`;
          } else {
            const type = basicTypeName(ctx, valueField);
            return code`${type}.fromPartial(${from})`;
          }
        } else if (isAnyValueType(field)) {
          return code`${from}`;
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
      if (isMapType(ctx, messageDesc, field)) {
        const fieldType = toTypeName(ctx, messageDesc, field);
        const i = convertFromObjectKey(ctx, messageDesc, field, "key");

        if (ctx.options.useMapType) {
          chunks.push(code`
            message.${fieldName} = (() => {
              const m = new Map();
              (object.${fieldName} as ${fieldType} ?? new Map()).forEach((value, key) => {
                if (value !== undefined) {
                  m.set(key, ${readSnippet("value")});
                }
              });
              return m;
            })();
          `);
        } else {
          chunks.push(code`
            message.${fieldName} = Object.entries(object.${fieldName} ?? {}).reduce<${fieldType}>((acc, [key, value]) => {
              if (value !== undefined) {
                acc[${i}] = ${readSnippet("value")};
              }
              return acc;
            }, {});
          `);
        }
      } else {
        chunks.push(code`
          message.${fieldName} = object.${fieldName}?.map((e) => ${readSnippet("e")}) || [];
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
        }
      `);
    } else if (readSnippet(`x`).toCodeString([]) == "x") {
      // An optimized case of the else below that works when `readSnippet` returns the plain input
      const fallback = isWithinOneOf(field) ? "undefined" : defaultValue(ctx, field);
      chunks.push(code`message.${fieldName} = object.${fieldName} ?? ${fallback};`);
    } else {
      const fallback = isWithinOneOf(field) ? "undefined" : defaultValue(ctx, field);
      chunks.push(code`
        message.${fieldName} = (object.${fieldName} !== undefined && object.${fieldName} !== null)
          ? ${readSnippet(`object.${fieldName}`)}
          : ${fallback};
      `);
    }
  });

  // and then wrap up the switch/while/return
  chunks.push(code`return message;`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

export const contextTypeVar = "Context extends DataLoaders";

function convertFromObjectKey(
  ctx: Context,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  variableName: string
): Code {
  const { keyType, keyField } = detectMapType(ctx, messageDesc, field)!;
  if (keyType.toCodeString([]) === "string") {
    return code`${variableName}`;
  } else if (isLong(keyField) && ctx.options.useMapType) {
    if (ctx.options.forceLong === LongOption.LONG) {
      return code`${capitalize(keyType.toCodeString([]))}.fromValue(${variableName})`;
    } else if (ctx.options.forceLong === LongOption.BIGINT) {
      return code`BigInt(${variableName})`;
    } else if (ctx.options.forceLong === LongOption.STRING) {
      return code`String(${variableName})`;
    } else {
      return code`Number(${variableName})`;
    }
  } else {
    return code`Number(${variableName})`;
  }
}

function convertToObjectKey(
  ctx: Context,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  variableName: string
): Code {
  const { keyType, keyField } = detectMapType(ctx, messageDesc, field)!;
  if (keyType.toCodeString([]) === "string") {
    return code`${variableName}`;
  } else if (isLong(keyField) && ctx.options.useMapType) {
    if (ctx.options.forceLong === LongOption.LONG) {
      return code`${ctx.utils.longToNumber}(${variableName})`;
    } else if (ctx.options.forceLong === LongOption.BIGINT) {
      return code`${variableName}.toString()`;
    } else {
      return code`${variableName}`;
    }
  } else {
    return code`${variableName}`;
  }
}

function maybeReadonly(options: Options): string {
  return options.useReadonlyTypes ? "readonly " : "";
}

function maybeAsAny(options: Options): string {
  return options.useReadonlyTypes ? " as any" : "";
}
