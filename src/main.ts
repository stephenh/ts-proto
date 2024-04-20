import { code, Code, conditionalOutput, def, imp, joinCode } from "ts-poet";
import { ConditionalOutput } from "ts-poet/build/ConditionalOutput";
import {
  DescriptorProto,
  FieldDescriptorProto,
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
  FieldOptions_JSType,
  FileDescriptorProto,
} from "ts-proto-descriptors";
import { camelToSnake, capitalize, maybeSnakeToCamel } from "./case";
import { Context } from "./context";
import { generateEnum } from "./enums";
import { generateDecodeTransform, generateEncodeTransform } from "./generate-async-iterable";
import { generateGenericServiceDefinition } from "./generate-generic-service-definition";
import { generateGrpcJsService } from "./generate-grpc-js";
import {
  addGrpcWebMisc,
  generateGrpcClientImpl,
  generateGrpcMethodDesc,
  generateGrpcServiceDesc,
} from "./generate-grpc-web";
import {
  generateNestjsGrpcServiceMethodsDecorator,
  generateNestjsServiceClient,
  generateNestjsServiceController,
} from "./generate-nestjs";
import { generateNiceGrpcService } from "./generate-nice-grpc";
import {
  generateDataLoaderOptionsType,
  generateDataLoadersType,
  generateRpcType,
  generateService,
  generateServiceClientImpl,
} from "./generate-services";
import {
  generateUnwrapDeep,
  generateUnwrapShallow,
  generateWrapDeep,
  generateWrapShallow,
  isWrapperType,
} from "./generate-struct-wrappers";
import {
  addTypeToMessages,
  DateOption,
  EnvOption,
  JsonTimestampOption,
  LongOption,
  OneofOption,
  Options,
  ServiceOption,
} from "./options";
import { generateSchema } from "./schema";
import SourceInfo, { Fields } from "./sourceInfo";
import {
  basicLongWireType,
  basicTypeName,
  basicWireType,
  defaultValue,
  detectMapType,
  getEnumMethod,
  getFieldOptionsJsType,
  isAnyValueType,
  isBytes,
  isBytesValueType,
  isEnum,
  isFieldMaskType,
  isFieldMaskTypeName,
  isJsTypeFieldOption,
  isListValueType,
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
  isTimestamp,
  isValueType,
  isWholeNumber,
  isWithinOneOf,
  isWithinOneOfThatShouldBeUnion,
  notDefaultCheck,
  packedType,
  shouldGenerateJSMapType,
  toReaderCall,
  toTypeName,
  valueTypeName,
} from "./types";
import {
  assertInstanceOf,
  FormattedMethodDescriptor,
  getFieldJsonName,
  getFieldName,
  getPropertyAccessor,
  impFile,
  impProto,
  maybeAddComment,
  nullOrUndefined,
  maybePrefixPackage,
  safeAccessor,
  withOrMaybeCheckIsNull,
  withAndMaybeCheckIsNotNull,
  withOrMaybeCheckIsNotNull,
  withAndMaybeCheckIsNull,
} from "./utils";
import { visit, visitServices } from "./visit";

export function generateFile(ctx: Context, fileDesc: FileDescriptorProto): [string, Code] {
  const { options, utils } = ctx;

  if (options.useOptionals === false) {
    console.warn(
      "ts-proto: Passing useOptionals as a boolean option is deprecated and will be removed in a future version. Please pass the string 'none' instead of false.",
    );
    options.useOptionals = "none";
  } else if (options.useOptionals === true) {
    console.warn(
      "ts-proto: Passing useOptionals as a boolean option is deprecated and will be removed in a future version. Please pass the string 'messages' instead of true.",
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
  maybeAddComment(options, headerComment, chunks, fileDesc.options?.deprecated);

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
        generateInterfaceDeclaration(ctx, fullName, message, sInfo, maybePrefixPackage(fileDesc, fullProtoTypeName)),
      );
    },
    options,
    (fullName, enumDesc, sInfo) => {
      chunks.push(generateEnum(ctx, fullName, enumDesc, sInfo));
    },
  );

  // If nestJs=true export [package]_PACKAGE_NAME and [service]_SERVICE_NAME const
  if (options.nestJs) {
    if (options.exportCommonSymbols) {
      const prefix = camelToSnake(fileDesc.package.replace(/\./g, "_"));
      chunks.push(code`export const ${prefix}_PACKAGE_NAME = '${fileDesc.package}';`);
    }
    if (
      options.useDate === DateOption.DATE &&
      fileDesc.messageType.find((message) =>
        message.field.find((field) => field.typeName === ".google.protobuf.Timestamp"),
      )
    ) {
      chunks.push(makeProtobufTimestampWrapper());
    }
  }

  // We add `nestJs` here because enough though it doesn't use our encode/decode methods
  // for most/vanilla messages, we do generate static wrap/unwrap methods for the special
  // Struct/Value/wrapper types and use the `wrappers[...]` to have NestJS know about them.
  if (
    options.outputEncodeMethods ||
    options.outputJsonMethods ||
    options.outputTypeAnnotations ||
    options.outputTypeRegistry ||
    options.nestJs
  ) {
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

        if (options.outputTypeAnnotations || options.outputTypeRegistry) {
          staticMembers.push(code`$type: '${fullTypeName}' as const`);
        }

        if (options.outputExtensions) {
          for (const extension of message.extension) {
            const { name, type, extensionInfo } = generateExtension(ctx, message, extension);

            staticMembers.push(code`${name}: <${ctx.utils.Extension}<${type}>> ${extensionInfo}`);
          }
        }

        if (options.outputEncodeMethods) {
          if (
            options.outputEncodeMethods === true ||
            options.outputEncodeMethods === "encode-only" ||
            options.outputEncodeMethods === "encode-no-creation"
          ) {
            staticMembers.push(generateEncode(ctx, fullName, message));

            if (options.outputExtensions && options.unknownFields && message.extensionRange.length) {
              staticMembers.push(generateSetExtension(ctx, fullName));
            }
          }
          if (options.outputEncodeMethods === true || options.outputEncodeMethods === "decode-only") {
            staticMembers.push(generateDecode(ctx, fullName, message));

            if (options.outputExtensions && options.unknownFields && message.extensionRange.length) {
              staticMembers.push(generateGetExtension(ctx, fullName));
            }
          }
        }
        if (options.useAsyncIterable) {
          staticMembers.push(generateEncodeTransform(ctx.utils, fullName));
          staticMembers.push(generateDecodeTransform(ctx.utils, fullName));
        }
        if (options.outputJsonMethods) {
          if (options.outputJsonMethods === true || options.outputJsonMethods === "from-only") {
            staticMembers.push(generateFromJson(ctx, fullName, fullTypeName, message));
          }
          if (options.outputJsonMethods === true || options.outputJsonMethods === "to-only") {
            staticMembers.push(generateToJson(ctx, fullName, fullTypeName, message));
          }
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
      options,
    );
  }

  if (options.outputExtensions) {
    for (const extension of fileDesc.extension) {
      const { name, type, extensionInfo } = generateExtension(ctx, undefined, extension);

      chunks.push(code`export const ${name}: ${ctx.utils.Extension}<${type}> = ${extensionInfo};`);
    }
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
      // NestJS is sufficiently different that we special case the client/server interfaces
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
    }

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

  // https://www.typescriptlang.org/docs/handbook/2/modules.html:
  // > In TypeScript, just as in ECMAScript 2015, any file containing a top-level import or export is considered a module.
  // > Conversely, a file without any top-level import or export declarations is treated as a script whose contents are available in the global scope (and therefore to modules as well).
  //
  // Thus, to mark an empty file a module, we need to add `export {}` to it.
  if (options.esModuleInterop && chunks.length === 0) {
    chunks.push(code`export {};`);
  }

  chunks.push(
    ...Object.values(utils).map((v) => {
      if (v instanceof ConditionalOutput) {
        return code`${v.ifUsed}`;
      } else {
        return code``;
      }
    }),
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
  ReturnType<typeof makeGrpcWebErrorClass> &
  ReturnType<typeof makeExtensionClass> &
  ReturnType<typeof makeAssertionUtils>;

/** These are runtime utility methods used by the generated code. */
export function makeUtils(options: Options): Utils {
  const bytes = makeByteUtils(options);
  const longs = makeLongUtils(options, bytes);
  return {
    ...bytes,
    ...makeDeepPartial(options, longs),
    ...makeObjectIdMethods(),
    ...makeTimestampMethods(options, longs, bytes),
    ...longs,
    ...makeComparisonUtils(),
    ...makeNiceGrpcServerStreamingMethodResult(options),
    ...makeGrpcWebErrorClass(bytes),
    ...makeExtensionClass(options),
    ...makeAssertionUtils(bytes),
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
  const util = impFile(options, `util@protobufjs/minimal`);
  const configure = impFile(options, `configure@protobufjs/minimal`);
  const LongImp = imp("Long=long");

  // Instead of exposing `LongImp` directly, let callers think that they are getting the
  // `imp(Long)` but really it is that + our long initialization snippet. This means the
  // initialization code will only be emitted in files that actually use the Long import.
  const Long = conditionalOutput(
    "Long",
    code`
      if (${util}.Long !== ${LongImp}) {
        ${util}.Long = ${LongImp} as any;
        ${configure}();
      }
    `,
  );

  // TODO This is unused?
  const numberToLong = conditionalOutput(
    "numberToLong",
    code`
      function numberToLong(number: number) {
        return ${Long}.fromNumber(number);
      }
    `,
  );

  const longToString = conditionalOutput(
    "longToString",
    code`
      function longToString(long: ${Long}) {
        return long.toString();
      }
    `,
  );

  const longToBigint = conditionalOutput(
    "longToBigint",
    code`
      function longToBigint(long: ${Long}) {
        return BigInt(long.toString());
      }
    `,
  );

  const longToNumber = conditionalOutput(
    "longToNumber",
    code`
      function longToNumber(long: ${Long}): number {
        if (long.gt(${bytes.globalThis}.Number.MAX_SAFE_INTEGER)) {
          throw new ${bytes.globalThis}.Error("Value is larger than Number.MAX_SAFE_INTEGER")
        }
        return long.toNumber();
      }
    `,
  );

  return { numberToLong, longToNumber, longToString, longToBigint, Long };
}

function makeByteUtils(options: Options) {
  const globalThisPolyfill = conditionalOutput(
    "gt",
    code`
      declare const self: any | undefined;
      declare const window: any | undefined;
      declare const global: any | undefined;
      const gt: any = (() => {
        if (typeof globalThis !== "undefined") return globalThis;
        if (typeof self !== "undefined") return self;
        if (typeof window !== "undefined") return window;
        if (typeof global !== "undefined") return global;
        throw "Unable to locate global object";
      })();
    `,
  );
  const globalThis = options.globalThisPolyfill ? globalThisPolyfill : conditionalOutput("globalThis", code``);

  function getBytesFromBase64Snippet() {
    const bytesFromBase64NodeSnippet = code`
      return Uint8Array.from(${globalThis}.Buffer.from(b64, 'base64'));
    `;

    const bytesFromBase64BrowserSnippet = code`
      const bin = ${globalThis}.atob(b64);
      const arr = new Uint8Array(bin.length);
      for (let i = 0; i < bin.length; ++i) {
          arr[i] = bin.charCodeAt(i);
      }
      return arr;
    `;

    switch (options.env) {
      case EnvOption.NODE:
        return bytesFromBase64NodeSnippet;
      case EnvOption.BROWSER:
        return bytesFromBase64BrowserSnippet;
      default:
        return code`
        if ((${globalThis} as any).Buffer) {
          ${bytesFromBase64NodeSnippet}
          } else {
            ${bytesFromBase64BrowserSnippet}
          }
        `;
    }
  }

  const bytesFromBase64 = conditionalOutput(
    "bytesFromBase64",
    code`
      function bytesFromBase64(b64: string): Uint8Array {
        ${getBytesFromBase64Snippet()}
      }
    `,
  );

  function getBase64FromBytesSnippet() {
    const base64FromBytesNodeSnippet = code`
      return ${globalThis}.Buffer.from(arr).toString('base64');
    `;

    const base64FromBytesBrowserSnippet = code`
      const bin: string[] = [];
      arr.forEach((byte) => {
        bin.push(${globalThis}.String.fromCharCode(byte));
      });
      return ${globalThis}.btoa(bin.join(''));
    `;

    switch (options.env) {
      case EnvOption.NODE:
        return base64FromBytesNodeSnippet;
      case EnvOption.BROWSER:
        return base64FromBytesBrowserSnippet;
      default:
        return code`
          if ((${globalThis} as any).Buffer) {
            ${base64FromBytesNodeSnippet}
          } else {
            ${base64FromBytesBrowserSnippet}
          }
        `;
    }
  }

  const base64FromBytes = conditionalOutput(
    "base64FromBytes",
    code`
      function base64FromBytes(arr: Uint8Array): string {
        ${getBase64FromBytesSnippet()}
      }
    `,
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
    } undefined;`,
  );

  // Based on https://github.com/sindresorhus/type-fest/pull/259
  const maybeExcludeType = addTypeToMessages(options) ? `| '$type'` : "";
  const Exact = conditionalOutput(
    "Exact",
    code`
      type KeysOfUnion<T> = T extends T ? keyof T : never;
      ${maybeExport} type Exact<P, I extends P> = P extends ${Builtin}
        ? P
        : P &
        { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P> ${maybeExcludeType}>]: never };
    `,
  );

  // Based on the type from ts-essentials
  const keys = addTypeToMessages(options) ? code`Exclude<keyof T, '$type'>` : code`keyof T`;
  const DeepPartial = conditionalOutput(
    "DeepPartial",
    code`
      ${maybeExport} type DeepPartial<T> =  T extends ${Builtin}
        ? T
        ${maybeLong}
        : T extends globalThis.Array<infer U>
        ? globalThis.Array<DeepPartial<U>>
        : T extends ReadonlyArray<infer U>
        ? ReadonlyArray<DeepPartial<U>>${oneofCase}
        : T extends {}
        ? { [K in ${keys}]?: DeepPartial<T[K]> }
        : Partial<T>;
    `,
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
    `,
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
    `,
  );

  const toProtoObjectId = conditionalOutput(
    "toProtoObjectId",
    code`
      function toProtoObjectId(oid: ${mongodb}.ObjectId): ObjectId {
        const value = oid.toString();
        return { value };
      }
    `,
  );

  return { fromJsonObjectId, fromProtoObjectId, toProtoObjectId };
}

function makeTimestampMethods(
  options: Options,
  longs: ReturnType<typeof makeLongUtils>,
  bytes: ReturnType<typeof makeByteUtils>,
) {
  const Timestamp = impProto(options, "google/protobuf/timestamp", "Timestamp");
  const NanoDate = imp("NanoDate=nano-date");

  let seconds: string | Code = "Math.trunc(date.getTime() / 1_000)";
  let toNumberCode: string | Code = "t.seconds";
  const makeToNumberCode = (methodCall: string) =>
    `t.seconds${options.useOptionals === "all" ? "?" : ""}.${methodCall}`;

  if (options.forceLong === LongOption.LONG) {
    toNumberCode = makeToNumberCode("toNumber()");
    seconds = code`${longs.numberToLong}(${seconds})`;
  } else if (options.forceLong === LongOption.BIGINT) {
    toNumberCode = code`${bytes.globalThis}.Number(${makeToNumberCode("toString()")})`;
    seconds = code`BigInt(${seconds})`;
  } else if (options.forceLong === LongOption.STRING) {
    toNumberCode = code`${bytes.globalThis}.Number(t.seconds)`;
    seconds = code`${seconds}.toString()`;
  }

  const maybeTypeField = addTypeToMessages(options) ? `$type: 'google.protobuf.Timestamp',` : "";

  const toTimestamp = conditionalOutput(
    "toTimestamp",
    options.useDate === DateOption.STRING
      ? code`
          function toTimestamp(dateStr: string): ${Timestamp} {
            const date = new ${bytes.globalThis}.Date(dateStr);
            const seconds = ${seconds};
            const nanos = (date.getTime() % 1_000) * 1_000_000;
            return { ${maybeTypeField} seconds, nanos };
          }
        `
      : options.useDate === DateOption.STRING_NANO
      ? code`
          function toTimestamp(dateStr: string): ${Timestamp} {
            const nanoDate = new ${NanoDate}(dateStr);

            const date = {
              getTime: (): number => nanoDate.valueOf(),
            } as const;
            const seconds = ${seconds};

            let nanos = nanoDate.getMilliseconds() * 1_000_000;
            nanos += nanoDate.getMicroseconds() * 1_000;
            nanos += nanoDate.getNanoseconds();

            return { ${maybeTypeField} seconds, nanos };
          }
        `
      : code`
          function toTimestamp(date: Date): ${Timestamp} {
            const seconds = ${seconds};
            const nanos = (date.getTime() % 1_000) * 1_000_000;
            return { ${maybeTypeField} seconds, nanos };
          }
        `,
  );

  const fromTimestamp = conditionalOutput(
    "fromTimestamp",
    options.useDate === DateOption.STRING
      ? code`
          function fromTimestamp(t: ${Timestamp}): string {
            let millis = (${toNumberCode} || 0) * 1_000;
            millis += (t.nanos || 0) / 1_000_000;
            return new ${bytes.globalThis}.Date(millis).toISOString();
          }
        `
      : options.useDate === DateOption.STRING_NANO
      ? code`
          function fromTimestamp(t: ${Timestamp}): string {
            const seconds = ${toNumberCode} || 0;
            const nanos = (t.nanos || 0) % 1_000;
            const micros = Math.trunc(((t.nanos || 0) % 1_000_000) / 1_000)
            let millis = seconds * 1_000;
            millis += Math.trunc((t.nanos || 0) / 1_000_000);

            const nanoDate = new ${NanoDate}(millis);
            nanoDate.setMicroseconds(micros);
            nanoDate.setNanoseconds(nanos);

            return nanoDate.toISOStringFull();
          }
        `
      : code`
          function fromTimestamp(t: ${Timestamp}): Date {
            let millis = (${toNumberCode} || 0) * 1_000;
            millis += (t.nanos || 0) / 1_000_000;
            return new ${bytes.globalThis}.Date(millis);
          }
        `,
  );

  const fromJsonTimestamp = conditionalOutput(
    "fromJsonTimestamp",
    options.useDate === DateOption.DATE
      ? code`
        function fromJsonTimestamp(o: any): Date {
          if (o instanceof ${bytes.globalThis}.Date) {
            return o;
          } else if (typeof o === "string") {
            return new ${bytes.globalThis}.Date(o);
          } else {
            return ${fromTimestamp}(Timestamp.fromJSON(o));
          }
        }
      `
      : code`
        function fromJsonTimestamp(o: any): Timestamp {
          if (o instanceof ${bytes.globalThis}.Date) {
            return ${toTimestamp}(o);
          } else if (typeof o === "string") {
            return ${toTimestamp}(new ${bytes.globalThis}.Date(o));
          } else {
            return Timestamp.fromJSON(o);
          }
        }
      `,
  );

  return { toTimestamp, fromTimestamp, fromJsonTimestamp };
}

function makeComparisonUtils() {
  const isObject = conditionalOutput(
    "isObject",
    code`
    function isObject(value: any): boolean {
      return typeof value === 'object' && value !== null;
    }`,
  );

  const isSet = conditionalOutput(
    "isSet",
    code`
    function isSet(value: any): boolean {
      return value !== null && value !== undefined;
    }`,
  );

  return { isObject, isSet };
}

function makeNiceGrpcServerStreamingMethodResult(options: Options) {
  const NiceGrpcServerStreamingMethodResult = conditionalOutput(
    "ServerStreamingMethodResult",
    options.outputIndex
      ? code`
        type ServerStreamingMethodResult<Response> = {
          [Symbol.asyncIterator](): AsyncIterator<Response, void>;
        };
      `
      : code`
        export type ServerStreamingMethodResult<Response> = {
          [Symbol.asyncIterator](): AsyncIterator<Response, void>;
        };
      `,
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
    `,
  );

  return { GrpcWebError };
}

function makeExtensionClass(options: Options) {
  const Reader = impFile(options, "Reader@protobufjs/minimal");
  const Writer = impFile(options, "Writer@protobufjs/minimal");
  const Extension = conditionalOutput(
    "Extension",
    code`
      export interface Extension <T> {
        number: number;
        tag: number;
        singularTag?: number;
        encode?: (message: T) => Uint8Array[];
        decode?: (tag: number, input: Uint8Array[]) => T;
        repeated: boolean;
        packed: boolean;
      }
    `,
  );

  return { Extension };
}

function makeAssertionUtils(bytes: ReturnType<typeof makeByteUtils>) {
  const fail = conditionalOutput(
    "fail",
    code`
      function fail(message?: string): never {
        throw new ${bytes.globalThis}.Error(message ?? "Failed");
      }
    `,
  );

  return { fail };
}

// Create the interface with properties
function generateInterfaceDeclaration(
  ctx: Context,
  fullName: string,
  messageDesc: DescriptorProto,
  sourceInfo: SourceInfo,
  fullTypeName: string,
): Code {
  const { options, currentFile } = ctx;
  const chunks: Code[] = [];

  maybeAddComment(options, sourceInfo, chunks, messageDesc.options?.deprecated);
  // interface name should be defined to avoid import collisions
  chunks.push(code`export interface ${def(fullName)} {`);

  if (addTypeToMessages(options)) {
    chunks.push(code`$type${options.outputTypeAnnotations === "optional" ? "?" : ""}: '${fullTypeName}',`);
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
    maybeAddComment(options, info, chunks, fieldDesc.options?.deprecated);
    const fieldKey = safeAccessor(getFieldName(fieldDesc, options));
    const isOptional = isOptionalProperty(fieldDesc, messageDesc.options, options, currentFile.isProto3Syntax);
    const type = toTypeName(ctx, messageDesc, fieldDesc, isOptional);
    chunks.push(code`${maybeReadonly(options)}${fieldKey}${isOptional ? "?" : ""}: ${type}, `);
  });

  if (ctx.options.unknownFields) {
    chunks.push(code`_unknownFields?: {[key: number]: Uint8Array[]} | undefined,`);
  }

  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

function generateOneofProperty(
  ctx: Context,
  messageDesc: DescriptorProto,
  oneofIndex: number,
  sourceInfo: SourceInfo,
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
    { on: " | " },
  );

  const name = maybeSnakeToCamel(messageDesc.oneofDecl[oneofIndex].name, options);
  return code`${mbReadonly}${name}?: ${unionType} | ${nullOrUndefined(options)},`;

  /*
  // Ideally we'd put the comments for each oneof field next to the anonymous
  // type we've created in the type union above, but ts-poet currently lacks
  // that ability. For now just concatenate all comments into one big one.
  let comments: Array<string> = [];
  const info = sourceInfo.lookup(Fields.message.oneof_decl, oneofIndex);
  maybeAddComment(options, info, (text) => comments.push(text));
  messageDesc.field.forEach((field, index) => {
    if (!isWithinOneOf(field) || field.oneofIndex !== oneofIndex) {
      return;
    }
    const info = sourceInfo.lookup(Fields.message.field, index);
    const name = maybeSnakeToCamel(field.name, options);
    maybeAddComment(options, info, (text) => comments.push(name + '\n' + text));
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
  fullTypeName: string,
): Code {
  const { options, currentFile } = ctx;
  const fields: Code[] = [];

  // When oneof=unions, we generate a single property with an ADT per `oneof` clause.
  const processedOneofs = new Set<number>();

  for (const field of messageDesc.field) {
    if (isWithinOneOfThatShouldBeUnion(ctx.options, field)) {
      const { oneofIndex } = field;
      if (!processedOneofs.has(oneofIndex)) {
        processedOneofs.add(oneofIndex);

        const name = options.useJsonName
          ? getFieldName(field, options)
          : maybeSnakeToCamel(messageDesc.oneofDecl[oneofIndex].name, ctx.options);
        fields.push(code`${safeAccessor(name)}: ${nullOrUndefined(options)}`);
      }
      continue;
    }

    if (
      !options.initializeFieldsAsUndefined &&
      isOptionalProperty(field, messageDesc.options, options, currentFile.isProto3Syntax)
    ) {
      continue;
    }

    const fieldKey = safeAccessor(getFieldName(field, options));
    const val = isWithinOneOf(field)
      ? nullOrUndefined(options)
      : isMapType(ctx, messageDesc, field)
      ? shouldGenerateJSMapType(ctx, messageDesc, field)
        ? "new Map()"
        : "{}"
      : isRepeated(field)
      ? "[]"
      : defaultValue(ctx, field);

    fields.push(code`${fieldKey}: ${val}`);
  }

  if (addTypeToMessages(options)) {
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

function getDecodeReadSnippet(ctx: Context, field: FieldDescriptorProto) {
  const { options, utils } = ctx;

  let readSnippet: Code;

  if (isPrimitive(field)) {
    readSnippet = code`reader.${toReaderCall(field)}()`;
    if (isBytes(field)) {
      if (options.env === EnvOption.NODE) {
        readSnippet = code`${readSnippet} as Buffer`;
      }
    } else if (basicLongWireType(field.type) !== undefined) {
      if (isJsTypeFieldOption(options, field)) {
        switch (field!.options!.jstype) {
          case FieldOptions_JSType.JS_NUMBER:
            readSnippet = code`${utils.longToNumber}(${readSnippet} as Long)`;
            break;
          case FieldOptions_JSType.JS_STRING:
            readSnippet = code`${utils.longToString}(${readSnippet} as Long)`;
            break;
        }
      } else if (options.forceLong === LongOption.LONG) {
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
  } else if (
    isTimestamp(field) &&
    (options.useDate === DateOption.DATE ||
      options.useDate === DateOption.STRING ||
      options.useDate === DateOption.STRING_NANO)
  ) {
    const type = basicTypeName(ctx, field, { keepValueType: true });
    readSnippet = code`${utils.fromTimestamp}(${type}.decode(reader, reader.uint32()))`;
  } else if (isObjectId(field) && options.useMongoObjectId) {
    const type = basicTypeName(ctx, field, { keepValueType: true });
    readSnippet = code`${utils.fromProtoObjectId}(${type}.decode(reader, reader.uint32()))`;
  } else if (isMessage(field)) {
    const type = basicTypeName(ctx, field);

    if (field.type == FieldDescriptorProto_Type.TYPE_GROUP) {
      readSnippet = code`${type}.decode(reader)`;
    } else {
      readSnippet = code`${type}.decode(reader, reader.uint32())`;
    }
  } else {
    throw new Error(`Unhandled field ${field}`);
  }

  return readSnippet;
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, currentFile } = ctx;
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
    const fieldName = getFieldName(field, options);
    const messageProperty = getPropertyAccessor("message", fieldName);
    chunks.push(code`case ${field.number}:`);

    const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
    const tagCheck = code`
      if (tag !== ${tag}) {
        break;
      }
    `;

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    const readSnippet = getDecodeReadSnippet(ctx, field);

    // and then use the snippet to handle repeated fields if necessary
    const initializerNecessary =
      !options.initializeFieldsAsUndefined &&
      isOptionalProperty(field, messageDesc.options, options, currentFile.isProto3Syntax);

    if (isRepeated(field)) {
      const maybeNonNullAssertion =
        ctx.options.useOptionals === "all" || ctx.options.useOptionals === "deprecatedOnly" ? "!" : "";
      const mapType = detectMapType(ctx, messageDesc, field);
      if (mapType) {
        // We need a unique const within the `cast` statement
        const varName = `entry${field.number}`;
        const generateMapType = shouldGenerateJSMapType(ctx, messageDesc, field);

        let valueSetterSnippet: string;
        if (generateMapType) {
          valueSetterSnippet = `${messageProperty}${maybeNonNullAssertion}.set(${varName}.key, ${varName}.value)`;
        } else {
          valueSetterSnippet = `${messageProperty}${maybeNonNullAssertion}[${varName}.key] = ${varName}.value`;
        }
        const initializerSnippet = initializerNecessary
          ? `
            if (${messageProperty} === undefined ${withOrMaybeCheckIsNull(options, messageProperty)}) {
              ${messageProperty} = ${generateMapType ? "new Map()" : "{}"};
            }`
          : "";
        chunks.push(code`
          ${tagCheck}
          const ${varName} = ${readSnippet};
          if (${varName}.value !== undefined ${withAndMaybeCheckIsNotNull(options, `${varName}.value`)}) {
            ${initializerSnippet}
            ${valueSetterSnippet};
          }
        `);
      } else {
        const initializerSnippet = initializerNecessary
          ? `
            if (${messageProperty} === undefined ${withOrMaybeCheckIsNull(options, messageProperty)}) {
              ${messageProperty} = [];
            }`
          : "";
        if (packedType(field.type) === undefined) {
          chunks.push(code`
            ${tagCheck}
            ${initializerSnippet}
            ${messageProperty}${maybeNonNullAssertion}.push(${readSnippet});
          `);
        } else {
          const packedTag = ((field.number << 3) | 2) >>> 0;

          chunks.push(code`
            if (tag === ${tag}) {
              ${initializerSnippet}
              ${messageProperty}${maybeNonNullAssertion}.push(${readSnippet});

              continue;
            }

            if (tag === ${packedTag}) {
              ${initializerSnippet}
              const end2 = reader.uint32() + reader.pos;
              while (reader.pos < end2) {
                ${messageProperty}${maybeNonNullAssertion}.push(${readSnippet});
              }

              continue;
            }

            break;
          `);
        }
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      const oneofNameWithMessage = options.useJsonName
        ? messageProperty
        : getPropertyAccessor("message", maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options));
      chunks.push(code`
        ${tagCheck}
        ${oneofNameWithMessage} = { $case: '${fieldName}', ${fieldName}: ${readSnippet} };
      `);
    } else {
      chunks.push(code`
        ${tagCheck}
        ${messageProperty} = ${readSnippet};
      `);
    }

    if (!isRepeated(field) || packedType(field.type) === undefined) {
      chunks.push(code`continue;`);
    }
  });

  chunks.push(code`}`);
  chunks.push(code`
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
  `);

  if (options.unknownFields) {
    let unknownFieldsInitializerSnippet = "";
    let maybeNonNullAssertion = options.initializeFieldsAsUndefined ? "!" : "";

    if (!options.initializeFieldsAsUndefined) {
      unknownFieldsInitializerSnippet = `
        if (message._unknownFields === undefined ${withOrMaybeCheckIsNull(options, `message._unknownFields`)}) {
          message._unknownFields = {};
        }
      `;
    }

    chunks.push(code`
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      ${unknownFieldsInitializerSnippet}
      const list = message._unknownFields${maybeNonNullAssertion}[tag];

      if (list === undefined ${withOrMaybeCheckIsNull(options, `message._unknownFields`)}) {
        message._unknownFields${maybeNonNullAssertion}[tag] = [buf];
      } else {
        list.push(buf);
      }
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
function getEncodeWriteSnippet(ctx: Context, field: FieldDescriptorProto): (place: string, placeAlt?: string) => Code {
  const { options, utils } = ctx;
  if (isEnum(field) && options.stringEnums) {
    const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
    const toNumber = getEnumMethod(ctx, field.typeName, "ToNumber");
    return (place) => code`writer.uint32(${tag}).${toReaderCall(field)}(${toNumber}(${place}))`;
  } else if (isLong(field) && options.forceLong === LongOption.BIGINT) {
    const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
    const fieldType = toReaderCall(field);
    switch (fieldType) {
      case "int64":
      case "sint64":
      case "sfixed64":
        return (place, placeAlt) => code`if (BigInt.asIntN(64, ${place}) !== ${placeAlt ?? place}) {
          throw new ${utils.globalThis}.Error('value provided for field ${place} of type ${fieldType} too large');
        }
        writer.uint32(${tag}).${toReaderCall(field)}(${place}.toString())`;
      case "uint64":
      case "fixed64":
        return (place, placeAlt) => code`if (BigInt.asUintN(64, ${place}) !== ${placeAlt ?? place}) {
          throw new ${utils.globalThis}.Error('value provided for field ${place} of type ${fieldType} too large');
        }
        writer.uint32(${tag}).${toReaderCall(field)}(${place}.toString())`;
      default:
        throw new Error(`unexpected BigInt type: ${fieldType}`);
    }
  } else if (isScalar(field) || isEnum(field)) {
    const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
    return (place) => code`writer.uint32(${tag}).${toReaderCall(field)}(${place})`;
  } else if (isObjectId(field) && options.useMongoObjectId) {
    const tag = ((field.number << 3) | 2) >>> 0;
    const type = basicTypeName(ctx, field, { keepValueType: true });
    return (place) => code`${type}.encode(${utils.toProtoObjectId}(${place}), writer.uint32(${tag}).fork()).ldelim()`;
  } else if (
    isTimestamp(field) &&
    (options.useDate === DateOption.DATE ||
      options.useDate === DateOption.STRING ||
      options.useDate === DateOption.STRING_NANO)
  ) {
    const tag = ((field.number << 3) | 2) >>> 0;
    const type = basicTypeName(ctx, field, { keepValueType: true });
    return (place) => code`${type}.encode(${utils.toTimestamp}(${place}), writer.uint32(${tag}).fork()).ldelim()`;
  } else if (isValueType(ctx, field)) {
    const maybeTypeField = addTypeToMessages(options) ? `$type: '${field.typeName.slice(1)}',` : "";

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
  const { options, utils, typeMap, currentFile } = ctx;
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
      {},
    );

  // then add a case for each field
  messageDesc.field.forEach((field) => {
    const fieldName = getFieldName(field, options);
    const messageProperty = getPropertyAccessor("message", fieldName);

    // get a generic writer.doSomething based on the basic type
    const writeSnippet = getEncodeWriteSnippet(ctx, field);

    const isOptional = isOptionalProperty(field, messageDesc.options, options, currentFile.isProto3Syntax);
    if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        const valueType = (typeMap.get(field.typeName)![2] as DescriptorProto).field[1];
        const maybeTypeField = addTypeToMessages(options) ? `$type: '${field.typeName.slice(1)}',` : "";
        const entryWriteSnippet = isValueType(ctx, valueType)
          ? code`
              if (value !== undefined ${withOrMaybeCheckIsNotNull(options, `value`)}) {
                ${writeSnippet(`{ ${maybeTypeField} key: key as any, value }`)};
              }
            `
          : writeSnippet(`{ ${maybeTypeField} key: key as any, value }`);
        const useMapType = shouldGenerateJSMapType(ctx, messageDesc, field);
        const optionalAlternative = isOptional ? (useMapType ? " || new Map()" : " || {}") : "";

        if (useMapType) {
          chunks.push(code`
            (${messageProperty}${optionalAlternative}).forEach((value, key) => {
              ${entryWriteSnippet}
            });
          `);
        } else {
          chunks.push(code`
            Object.entries(${messageProperty}${optionalAlternative}).forEach(([key, value]) => {
              ${entryWriteSnippet}
            });
          `);
        }
      } else if (packedType(field.type) === undefined) {
        const listWriteSnippet = code`
          for (const v of ${messageProperty}) {
            ${writeSnippet("v!")};
          }
        `;
        if (isOptional) {
          chunks.push(code`
            if (${messageProperty} !== undefined && ${messageProperty}.length !== 0) {
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
          for (const v of ${messageProperty}) {
            writer.${toReaderCall(field)}(${toNumber}(v));
          }
          writer.ldelim();
        `;
        if (isOptional) {
          chunks.push(code`
            if (${messageProperty} !== undefined && ${messageProperty}.length !== 0) {
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
        let listWriteSnippet = code`
          writer.uint32(${tag}).fork();
          for (const v of ${messageProperty}) {
            writer.${toReaderCall(field)}(${rhs("v")});
          }
          writer.ldelim();
        `;

        if (isLong(field) && options.forceLong === LongOption.BIGINT) {
          const fieldType = toReaderCall(field);
          switch (fieldType) {
            case "int64":
            case "sint64":
            case "sfixed64":
              listWriteSnippet = code`
                writer.uint32(${tag}).fork();
                for (const v of ${messageProperty}) {
                  if (BigInt.asIntN(64, v) !== v) {
                    throw new ${
                      utils.globalThis
                    }.Error('a value provided in array field ${fieldName} of type ${fieldType} is too large');
                  }
                  writer.${toReaderCall(field)}(${rhs("v")});
                }
                writer.ldelim();
              `;
              break;
            case "uint64":
            case "fixed64":
              listWriteSnippet = code`
                writer.uint32(${tag}).fork();
                for (const v of ${messageProperty}) {
                  if (BigInt.asUintN(64, v) !== v) {
                    throw new ${
                      utils.globalThis
                    }.Error('a value provided in array field ${fieldName} of type ${fieldType} is too large');
                  }
                  writer.${toReaderCall(field)}(${rhs("v")});
                }
                writer.ldelim();
              `;
              break;
            default:
              throw new Error(`unexpected BigInt type: ${fieldType}`);
          }
        }
        if (isOptional) {
          chunks.push(code`
            if (${messageProperty} !== undefined ${withAndMaybeCheckIsNotNull(
            options,
            messageProperty,
          )} && ${messageProperty}.length !== 0) {
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

        const oneofNameWithMessage = options.useJsonName
          ? messageProperty
          : getPropertyAccessor("message", maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options));
        chunks.push(code`switch (${oneofNameWithMessage}?.$case) {`);
        for (const oneOfField of oneOfFieldsDict[field.oneofIndex]) {
          const writeSnippet = getEncodeWriteSnippet(ctx, oneOfField);
          const oneOfFieldName = maybeSnakeToCamel(oneOfField.name, ctx.options);
          chunks.push(code`case "${oneOfFieldName}":
            ${writeSnippet(`${oneofNameWithMessage}.${oneOfFieldName}`)};
            break;`);
        }
        chunks.push(code`}`);
      }
    } else if (isWithinOneOf(field)) {
      // Oneofs don't have a default value check b/c they need to denote which-oneof presence
      chunks.push(code`
        if (${messageProperty} !== undefined ${withAndMaybeCheckIsNotNull(options, messageProperty)}) {
          ${writeSnippet(`${messageProperty}`)};
        }
      `);
    } else if (isMessage(field)) {
      chunks.push(code`
        if (${messageProperty} !== undefined ${withAndMaybeCheckIsNotNull(options, messageProperty)}) {
          ${writeSnippet(`${messageProperty}`)};
        }
      `);
    } else if (isScalar(field) || isEnum(field)) {
      const isJsType = isScalar(field) && isJsTypeFieldOption(options, field);
      const body =
        isJsType && options.forceLong === LongOption.BIGINT
          ? writeSnippet(`BigInt(${messageProperty})`)
          : writeSnippet(`${messageProperty}`);

      chunks.push(code`
        if (${notDefaultCheck(ctx, field, messageDesc.options, `${messageProperty}`)}) {
          ${body};
        }
      `);
    } else {
      chunks.push(code`${writeSnippet(`${messageProperty}`)};`);
    }
  });

  if (options.unknownFields) {
    chunks.push(code`if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
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

function generateSetExtension(ctx: Context, fullName: string) {
  return code`
    setExtension <T> (message: ${fullName}, extension: ${ctx.utils.Extension}<T>, value: T): void {
      const encoded = extension.encode!(value);

      if (message._unknownFields !== undefined) {
        delete message._unknownFields[extension.tag];

        if (extension.singularTag !== undefined) {
          delete message._unknownFields[extension.singularTag];
        }
      }

      if (encoded.length !== 0) {
        if (message._unknownFields === undefined) {
          message._unknownFields = {};
        }

        message._unknownFields[extension.tag] = encoded;
      }
    }
  `;
}

function generateGetExtension(ctx: Context, fullName: string) {
  return code`
    getExtension <T> (message: ${fullName}, extension: ${ctx.utils.Extension}<T>): T | undefined {
      let results: T | undefined = undefined;

      if (message._unknownFields === undefined) {
        return undefined;
      }

      let list = message._unknownFields[extension.tag];

      if (list !== undefined) {
        results = extension.decode!(extension.tag, list);
      }

      if (extension.singularTag === undefined) {
        return results;
      }

      list = message._unknownFields[extension.singularTag];

      if (list !== undefined) {
        const results2 = extension.decode!(extension.singularTag, list);

        if (results !== undefined && (results as any).length !== 0) {
          results = (results as any).concat(results2);
        } else {
          results = results2;
        }
      }

      return results;
    }
  `;
}

function generateExtension(ctx: Context, message: DescriptorProto | undefined, extension: FieldDescriptorProto) {
  const type = toTypeName(ctx, message, extension);
  const packedTag =
    isRepeated(extension) && packedType(extension.type) !== undefined ? ((extension.number << 3) | 2) >>> 0 : undefined;
  const singularTag = ((extension.number << 3) | basicWireType(extension.type)) >>> 0;
  const tag = packedTag ?? singularTag;

  const chunks: Code[] = [];

  chunks.push(code`{`);

  chunks.push(code`number: ${extension.number},`);
  chunks.push(code`tag: ${tag},`);

  if (packedTag !== undefined) chunks.push(code`singularTag: ${singularTag},`);
  chunks.push(code`repeated: ${extension.label == FieldDescriptorProto_Label.LABEL_REPEATED},`);
  chunks.push(code`packed: ${extension.options?.packed ? true : false},`);

  const Reader = impFile(ctx.options, "Reader@protobufjs/minimal");
  const Writer = impFile(ctx.options, "Writer@protobufjs/minimal");

  if (
    ctx.options.outputEncodeMethods === true ||
    ctx.options.outputEncodeMethods === "encode-only" ||
    ctx.options.outputEncodeMethods === "encode-no-creation"
  ) {
    chunks.push(code`
      encode: (value: ${type}): Uint8Array[] => {
        const encoded: Uint8Array[] = [];
    `);

    function getEncodeSnippet(ctx: Context, field: FieldDescriptorProto): (place: string) => Code {
      const { options, utils } = ctx;

      if (isEnum(field) && options.stringEnums) {
        const toNumber = getEnumMethod(ctx, field.typeName, "ToNumber");
        return (place) => code`writer.${toReaderCall(field)}(${toNumber}(${place}))`;
      } else if (isLong(field) && options.forceLong === LongOption.BIGINT) {
        return (place) => code`writer.${toReaderCall(field)}(${place}.toString())`;
      } else if (isScalar(field) || isEnum(field)) {
        return (place) => code`writer.${toReaderCall(field)}(${place})`;
      } else if (isObjectId(field) && options.useMongoObjectId) {
        const type = basicTypeName(ctx, field, { keepValueType: true });

        return (place) => code`${type}.encode(${utils.toProtoObjectId}(${place}), writer.fork()).ldelim()`;
      } else if (
        isTimestamp(field) &&
        (options.useDate === DateOption.DATE ||
          options.useDate === DateOption.STRING ||
          options.useDate === DateOption.STRING_NANO)
      ) {
        const type = basicTypeName(ctx, field, { keepValueType: true });
        return (place) => code`${type}.encode(${utils.toTimestamp}(${place}), writer.fork()).ldelim()`;
      } else if (isValueType(ctx, field)) {
        const maybeTypeField = addTypeToMessages(options) ? `$type: '${field.typeName.slice(1)}',` : "";

        const type = basicTypeName(ctx, field, { keepValueType: true });
        const wrappedValue = (place: string): Code => {
          if (isAnyValueType(field) || isListValueType(field) || isStructType(field) || isFieldMaskType(field)) {
            return code`${type}.wrap(${place})`;
          }
          return code`{${maybeTypeField} value: ${place}!}`;
        };

        return (place) => code`${type}.encode(${wrappedValue(place)}, writer.fork()).ldelim()`;
      } else if (isMessage(field)) {
        const type = basicTypeName(ctx, field);

        if (field.type == FieldDescriptorProto_Type.TYPE_GROUP) {
          const endTag = ((field.number << 3) | 4) >>> 0;
          return (place) => code`${type}.encode(${place}, writer).uint32(${endTag})`;
        }

        return (place) => code`${type}.encode(${place}, writer.fork()).ldelim()`;
      } else {
        throw new Error(`Unhandled field ${field}`);
      }
    }

    const writeSnippet = getEncodeSnippet(ctx, extension);

    if (isRepeated(extension)) {
      if (packedTag === undefined) {
        chunks.push(code`
          for (const v of value) {
            const writer = ${Writer}.create();
            ${writeSnippet("v")};
            encoded.push(writer.finish());
          }
        `);
      } else {
        const rhs = (x: string) =>
          isLong(extension) && ctx.options.forceLong === LongOption.BIGINT ? `${x}.toString()` : x;

        chunks.push(code`
          const writer = ${Writer}.create();
          writer.fork();
          for (const v of value) {
            ${writeSnippet(rhs("v"))};
          }
          writer.ldelim();
          encoded.push(writer.finish());
        `);
      }
    } else if (isScalar(extension) || isEnum(extension)) {
      chunks.push(code`
        if (${notDefaultCheck(ctx, extension, message?.options, "value")}) {
          const writer = ${Writer}.create();
          ${writeSnippet("value")};
          encoded.push(writer.finish());
        }
      `);
    } else {
      chunks.push(code`
        const writer = ${Writer}.create();
        ${writeSnippet("value")};
        encoded.push(writer.finish());
      `);
    }

    chunks.push(code`
        return encoded;
      },
    `);
  }

  if (ctx.options.outputEncodeMethods === true || ctx.options.outputEncodeMethods === "decode-only") {
    chunks.push(code`decode: (tag: number, input: Uint8Array[]): ${type} => {`);

    // get a generic 'reader.doSomething' bit that is specific to the basic type
    const readSnippet = getDecodeReadSnippet(ctx, extension);

    if (isRepeated(extension)) {
      chunks.push(code`const values: ${type} = [];`);

      // start loop over all buffers
      chunks.push(code`
        for (const buffer of input) {
          const reader = ${Reader}.create(buffer);
      `);

      if (packedType(extension.type) === undefined) {
        chunks.push(code`
          values.push(${readSnippet});
        `);
      } else {
        chunks.push(code`
          if (tag == ${packedTag}) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              values.push(${readSnippet});
            }
          } else {
            values.push(${readSnippet});
          }
        `);
      }

      chunks.push(code`
          }

          return values;
        },
      `);
    } else {
      // pick the last entry, since it overrides all previous entries if not repeated
      chunks.push(code`
          const reader = ${Reader}.create(input[input.length -1] ?? ${ctx.utils.fail}());
          return ${readSnippet};
        },
      `);
    }
  }

  chunks.push(code`}`);

  return {
    name: maybeSnakeToCamel(extension.name, ctx.options),
    type,
    extensionInfo: joinCode(chunks, { on: "\n" }),
  };
}

/**
 * Creates a function to decode a message from JSON.
 *
 * This is very similar to decode, we loop through looking for properties, with
 * a few special cases for https://developers.google.com/protocol-buffers/docs/proto3#json.
 * */
function generateFromJson(ctx: Context, fullName: string, fullTypeName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, currentFile } = ctx;
  const chunks: Code[] = [];

  // create the basic function declaration
  chunks.push(code`
    fromJSON(${messageDesc.field.length > 0 ? "object" : "_"}: any): ${fullName} {
      return {
  `);

  if (addTypeToMessages(options)) {
    chunks.push(code`$type: ${fullName}.$type,`);
  }

  const oneofFieldsCases = messageDesc.oneofDecl.map((oneof, oneofIndex) =>
    messageDesc.field.filter(isWithinOneOf).filter((field) => field.oneofIndex === oneofIndex),
  );

  const canonicalFromJson: { [key: string]: { [field: string]: (from: string) => Code } } = {
    ["google.protobuf.FieldMask"]: {
      paths: (from: string) => code`typeof(${from}) === 'string'
        ? ${from}.split(",").filter(${ctx.utils.globalThis}.Boolean)
        : ${ctx.utils.globalThis}.Array.isArray(${from}?.paths)
        ? ${from}.paths.map(${ctx.utils.globalThis}.String)
        : []`,
    },
  };

  // add a check for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = getFieldName(field, options);
    const fieldKey = safeAccessor(fieldName);
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
        } else if (isLong(field) && isJsTypeFieldOption(options, field)) {
          const fieldType = getFieldOptionsJsType(field, ctx.options) ?? field.type;
          const cstr = capitalize(
            basicTypeName(ctx, { ...field, type: fieldType }, { keepValueType: true }).toCodeString([]),
          );
          return code`${utils.globalThis}.${cstr}(${from})`;
        } else if (isLong(field) && options.forceLong === LongOption.LONG) {
          const cstr = capitalize(basicTypeName(ctx, field, { keepValueType: true }).toCodeString([]));
          return code`${cstr}.fromValue(${from})`;
        } else if (isLong(field) && options.forceLong === LongOption.BIGINT) {
          return code`BigInt(${from})`;
        } else {
          const cstr = capitalize(basicTypeName(ctx, field, { keepValueType: true }).toCodeString([]));
          return code`${utils.globalThis}.${cstr}(${from})`;
        }
      } else if (isObjectId(field) && options.useMongoObjectId) {
        return code`${utils.fromJsonObjectId}(${from})`;
      } else if (
        isTimestamp(field) &&
        (options.useDate === DateOption.STRING || options.useDate === DateOption.STRING_NANO)
      ) {
        return code`${utils.globalThis}.String(${from})`;
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
          } else if (
            isTimestamp(valueField) &&
            (options.useDate === DateOption.STRING || options.useDate === DateOption.STRING_NANO)
          ) {
            return code`${utils.globalThis}.String(${from})`;
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

    const noDefaultValue =
      !options.initializeFieldsAsUndefined &&
      isOptionalProperty(field, messageDesc.options, options, currentFile.isProto3Syntax);

    // and then use the snippet to handle repeated fields if necessary
    if (canonicalFromJson[fullTypeName]?.[fieldName]) {
      chunks.push(code`${fieldName}: ${canonicalFromJson[fullTypeName][fieldName]("object")},`);
    } else if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        const fieldType = toTypeName(ctx, messageDesc, field);
        const i = convertFromObjectKey(ctx, messageDesc, field, "key");

        if (shouldGenerateJSMapType(ctx, messageDesc, field)) {
          const fallback = noDefaultValue ? nullOrUndefined(options) : "new Map()";

          chunks.push(code`
            ${fieldKey}: ${ctx.utils.isObject}(${jsonProperty})
              ? Object.entries(${jsonProperty}).reduce<${fieldType}>((acc, [key, value]) => {
                  acc.set(${i}, ${readSnippet("value")});
                  return acc;
                }, new Map())
              : ${fallback},
          `);
        } else {
          const fallback = noDefaultValue ? nullOrUndefined(options) : "{}";

          chunks.push(code`
            ${fieldKey}: ${ctx.utils.isObject}(${jsonProperty})
              ? Object.entries(${jsonProperty}).reduce<${fieldType}>((acc, [key, value]) => {
                  acc[${i}] = ${readSnippet("value")};
                  return acc;
                }, {})
              : ${fallback},
          `);
        }
      } else {
        const fallback = noDefaultValue ? nullOrUndefined(options) : "[]";

        const readValueSnippet = readSnippet("e");
        if (readValueSnippet.toString() === code`e`.toString()) {
          chunks.push(
            code`${fieldKey}: ${ctx.utils.globalThis}.Array.isArray(${jsonPropertyOptional}) ? [...${jsonProperty}] : [],`,
          );
        } else {
          // Explicit `any` type required to make TS with noImplicitAny happy. `object` is also `any` here.
          chunks.push(code`
            ${fieldKey}: ${ctx.utils.globalThis}.Array.isArray(${jsonPropertyOptional}) ? ${jsonProperty}.map((e: any) => ${readValueSnippet}): ${fallback},
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
      const ternaryThen = code`{ $case: '${fieldName}', ${fieldKey}: ${readSnippet(`${jsonProperty}`)}`;
      chunks.push(code`${ternaryIf} ? ${ternaryThen}} : `);

      if (field === lastCase) {
        chunks.push(code`${nullOrUndefined(options)},`);
      }
    } else if (isAnyValueType(field)) {
      chunks.push(code`${fieldKey}: ${ctx.utils.isSet}(${jsonPropertyOptional})
        ? ${readSnippet(`${jsonProperty}`)}
        : ${nullOrUndefined(options)},
      `);
    } else if (isStructType(field)) {
      chunks.push(
        code`${fieldKey}: ${ctx.utils.isObject}(${jsonProperty})
          ? ${readSnippet(`${jsonProperty}`)}
          : ${nullOrUndefined(options)},`,
      );
    } else if (isListValueType(field)) {
      chunks.push(code`
        ${fieldKey}: ${ctx.utils.globalThis}.Array.isArray(${jsonProperty})
          ? ${readSnippet(`${jsonProperty}`)}
          : ${nullOrUndefined(options)},
      `);
    } else {
      const fallback = isWithinOneOf(field) || noDefaultValue ? nullOrUndefined(options) : defaultValue(ctx, field);
      chunks.push(code`
        ${fieldKey}: ${ctx.utils.isSet}(${jsonProperty})
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

function generateCanonicalToJson(
  fullName: string,
  fullProtobufTypeName: string,
  { useOptionals, useNullAsOptional }: Options,
): Code | undefined {
  if (isFieldMaskTypeName(fullProtobufTypeName)) {
    const returnType = useOptionals === "all" ? `string | ${nullOrUndefined({ useNullAsOptional })}` : "string";
    const pathModifier = useOptionals === "all" ? "?" : "";

    return code`
    toJSON(message: ${fullName}): ${returnType} {
      return message.paths${pathModifier}.join(',');
    }
  `;
  }
  return undefined;
}

function generateToJson(
  ctx: Context,
  fullName: string,
  fullProtobufTypeName: string,
  messageDesc: DescriptorProto,
): Code {
  const { options, utils, typeMap } = ctx;
  const chunks: Code[] = [];

  const canonicalToJson = generateCanonicalToJson(fullName, fullProtobufTypeName, options);
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
    const fieldName = getFieldName(field, options);
    const jsonName = getFieldJsonName(field, options);
    const jsonProperty = getPropertyAccessor("obj", jsonName);
    const messageProperty = getPropertyAccessor("message", fieldName);

    const readSnippet = (from: string): Code => {
      if (isEnum(field)) {
        const toJson = getEnumMethod(ctx, field.typeName, "ToJSON");
        return code`${toJson}(${from})`;
      } else if (isObjectId(field) && options.useMongoObjectId) {
        return code`${from}.toString()`;
      } else if (isTimestamp(field) && options.useDate === DateOption.DATE) {
        return code`${from}.toISOString()`;
      } else if (
        isTimestamp(field) &&
        (options.useDate === DateOption.STRING || options.useDate === DateOption.STRING_NANO)
      ) {
        return code`${from}`;
      } else if (isTimestamp(field) && options.useDate === DateOption.TIMESTAMP) {
        if (options.useJsonTimestamp === JsonTimestampOption.RAW) {
          return code`${from}`;
        }
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
        } else if (
          isTimestamp(valueType) &&
          (options.useDate === DateOption.STRING || options.useDate === DateOption.STRING_NANO)
        ) {
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
        return code`${type}.toJSON(${from})`;
      } else if (isBytes(field)) {
        return code`${utils.base64FromBytes}(${from})`;
      } else if (isLong(field) && isJsTypeFieldOption(options, field)) {
        const fieldType = getFieldOptionsJsType(field, ctx.options) ?? field.type;
        if (!fieldType) {
          return code`${from}`;
        }

        const cstr = capitalize(
          basicTypeName(ctx, { ...field, type: fieldType }, { keepValueType: true }).toCodeString([]),
        );
        return code`${utils.globalThis}.${cstr}(${from})`;
      } else if (isLong(field) && options.forceLong === LongOption.LONG) {
        return code`(${from} || ${defaultValue(ctx, field)}).toString()`;
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

      if (shouldGenerateJSMapType(ctx, messageDesc, field)) {
        chunks.push(code`
          if (${messageProperty}?.size) {
            ${jsonProperty} = {};
            ${messageProperty}.forEach((v, k) => {
              ${jsonProperty}[${i}] = ${readSnippet("v")};
            });
          }
        `);
      } else {
        chunks.push(code`
        if (${messageProperty}) {
            const entries = Object.entries(${messageProperty});
            if (entries.length > 0) {
              ${jsonProperty} = {};
              entries.forEach(([k, v]) => {
                ${jsonProperty}[${i}] = ${readSnippet("v")};
              });
            }
          }
        `);
      }
    } else if (isRepeated(field)) {
      // Arrays might need their elements transformed
      const transformElement = readSnippet("e");
      const maybeMap = transformElement.toCodeString([]) !== "e" ? code`.map(e => ${transformElement})` : "";
      chunks.push(code`
        if (${messageProperty}?.length) {
          ${jsonProperty} = ${messageProperty}${maybeMap};
        }
      `);
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      // oneofs in a union are only output as `oneof name = ...`
      const oneofNameWithMessage = options.useJsonName
        ? messageProperty
        : getPropertyAccessor("message", maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options));
      chunks.push(code`
        if (${oneofNameWithMessage}?.$case === '${fieldName}') {
          ${jsonProperty} = ${readSnippet(`${oneofNameWithMessage}.${fieldName}`)};
        }
      `);
    } else {
      let emitDefaultValuesForJson = ctx.options.emitDefaultValues.includes("json-methods");
      const check =
        (isScalar(field) || isEnum(field)) && !(isWithinOneOf(field) || emitDefaultValuesForJson)
          ? notDefaultCheck(ctx, field, messageDesc.options, `${messageProperty}`)
          : `${messageProperty} !== undefined ${withAndMaybeCheckIsNotNull(options, messageProperty)}`;

      chunks.push(code`
        if (${check}) {
          ${jsonProperty} = ${readSnippet(`${messageProperty}`)};
        }
      `);
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
        return ${fullName}.fromPartial(base ?? ({} as any));
      },
    `);
  } else {
    chunks.push(code`
      create(base?: ${utils.DeepPartial}<${fullName}>): ${fullName} {
        return ${fullName}.fromPartial(base ?? {});
      },
    `);
  }

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
    const fieldName = getFieldName(field, options);
    const messageProperty = getPropertyAccessor("message", fieldName);
    const objectProperty = getPropertyAccessor("object", fieldName);

    const readSnippet = (from: string): Code => {
      if (
        (isLong(field) || isLongValueType(field)) &&
        options.forceLong === LongOption.LONG &&
        !isJsTypeFieldOption(options, field)
      ) {
        return code`Long.fromValue(${from})`;
      } else if (isObjectId(field) && options.useMongoObjectId) {
        return code`${from} as mongodb.ObjectId`;
      } else if (
        isPrimitive(field) ||
        (isTimestamp(field) &&
          (options.useDate === DateOption.DATE ||
            options.useDate === DateOption.STRING ||
            options.useDate === DateOption.STRING_NANO)) ||
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
              return code`${utils.globalThis}.${cstr}(${from})`;
            }
          } else if (isAnyValueType(valueField)) {
            return code`${from}`;
          } else if (isObjectId(valueField) && options.useMongoObjectId) {
            return code`${from} as mongodb.ObjectId`;
          } else if (
            isTimestamp(valueField) &&
            (options.useDate === DateOption.DATE ||
              options.useDate === DateOption.STRING ||
              options.useDate === DateOption.STRING_NANO)
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

    const noDefaultValue =
      !options.initializeFieldsAsUndefined && isOptionalProperty(field, messageDesc.options, options, true);

    // and then use the snippet to handle repeated fields if necessary
    if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        const fieldType = toTypeName(ctx, messageDesc, field);
        const i = convertFromObjectKey(ctx, messageDesc, field, "key");

        const noValueSnippet = noDefaultValue
          ? `(${objectProperty} === undefined || ${objectProperty} === null) ? undefined : `
          : "";

        if (shouldGenerateJSMapType(ctx, messageDesc, field)) {
          chunks.push(code`
            ${messageProperty} = ${noValueSnippet} (() => {
              const m = new Map();
              (${objectProperty} as ${fieldType} ?? new Map()).forEach((value, key) => {
                if (value !== undefined) {
                  m.set(key, ${readSnippet("value")});
                }
              });
              return m;
            })();
          `);
        } else {
          chunks.push(code`
            ${messageProperty} = ${noValueSnippet} Object.entries(${objectProperty} ?? {}).reduce<${fieldType}>((acc, [key, value]) => {
              if (value !== undefined) {
                acc[${i}] = ${readSnippet("value")};
              }
              return acc;
            }, {});
          `);
        }
      } else {
        const fallback = noDefaultValue ? "undefined" : "[]";

        chunks.push(code`
          ${messageProperty} = ${objectProperty}?.map((e) => ${readSnippet("e")}) || ${fallback};
        `);
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      const oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      const oneofNameWithMessage = getPropertyAccessor("message", oneofName);
      const oneofNameWithObject = getPropertyAccessor("object", oneofName);
      const v = readSnippet(`${oneofNameWithObject}.${fieldName}`);
      chunks.push(code`
        if (
          ${oneofNameWithObject}?.$case === '${fieldName}'
          && ${oneofNameWithObject}?.${fieldName} !== undefined
          && ${oneofNameWithObject}?.${fieldName} !== null
        ) {
          ${oneofNameWithMessage} = { $case: '${fieldName}', ${fieldName}: ${v} };
        }
      `);
    } else if (readSnippet(`x`).toCodeString([]) == "x") {
      // An optimized case of the else below that works when `readSnippet` returns the plain input
      const fallback = isWithinOneOf(field) || noDefaultValue ? "undefined" : defaultValue(ctx, field);
      chunks.push(code`${messageProperty} = ${objectProperty} ?? ${fallback};`);
    } else {
      const fallback = isWithinOneOf(field) || noDefaultValue ? "undefined" : defaultValue(ctx, field);
      chunks.push(code`
        ${messageProperty} = (${objectProperty} !== undefined && ${objectProperty} !== null)
          ? ${readSnippet(`${objectProperty}`)}
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
  variableName: string,
): Code {
  const { keyType, keyField } = detectMapType(ctx, messageDesc, field)!;
  if (keyType.toCodeString([]) === "string") {
    return code`${variableName}`;
  } else if (isLong(keyField) && shouldGenerateJSMapType(ctx, messageDesc, field)) {
    if (ctx.options.forceLong === LongOption.LONG) {
      return code`${capitalize(keyType.toCodeString([]))}.fromValue(${variableName})`;
    } else if (ctx.options.forceLong === LongOption.BIGINT) {
      return code`BigInt(${variableName})`;
    } else if (ctx.options.forceLong === LongOption.STRING) {
      return code`${ctx.utils.globalThis}.String(${variableName})`;
    } else {
      return code`${ctx.utils.globalThis}.Number(${variableName})`;
    }
  } else if (keyField.type === FieldDescriptorProto_Type.TYPE_BOOL) {
    return code`${ctx.utils.globalThis}.Boolean(${variableName})`;
  } else {
    return code`${ctx.utils.globalThis}.Number(${variableName})`;
  }
}

function convertToObjectKey(
  ctx: Context,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  variableName: string,
): Code {
  const { keyType, keyField } = detectMapType(ctx, messageDesc, field)!;
  if (keyType.toCodeString([]) === "string") {
    return code`${variableName}`;
  } else if (isLong(keyField) && shouldGenerateJSMapType(ctx, messageDesc, field)) {
    if (ctx.options.forceLong === LongOption.LONG) {
      return code`${ctx.utils.longToNumber}(${variableName})`;
    } else if (ctx.options.forceLong === LongOption.BIGINT) {
      return code`${variableName}.toString()`;
    } else {
      return code`${variableName}`;
    }
  } else if (keyField.type === FieldDescriptorProto_Type.TYPE_BOOL) {
    return code`${ctx.utils.globalThis}.String(${variableName})`;
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
