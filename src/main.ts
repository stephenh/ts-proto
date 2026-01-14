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
import { camelToSnake, capitalize, maybeSnakeToCamel, snakeToCamel } from "./case";
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
  DurationOption,
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
  isAnyValueTypeName,
  isBytes,
  isBytesValueType,
  isEnum,
  isFieldMaskType,
  isFieldMaskTypeName,
  isJsTypeFieldOption,
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
  packedField,
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
  maybePrefixPackage,
  nullOrUndefined,
  oneofValueName,
  safeAccessor,
  withAndMaybeCheckIsNotNull,
  withOrMaybeCheckIsNotNull,
  withOrMaybeCheckIsNull,
  wrapTypeName,
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
          (options.outputEncodeMethods &&
            options.outputEncodeMethods !== "encode-no-creation" &&
            options.outputEncodeMethods !== "encode-only" &&
            (options.outputDecodeIncludeTypes === "" ||
              new RegExp(options.outputDecodeIncludeTypes).test(fullTypeName))) ||
          options.outputPartialMethods ||
          outputWrapAndUnwrap
        ) {
          chunks.push(generateBaseInstanceFactory(ctx, fullName, message, fullTypeName));
        }

        const staticMembers: Code[] = [];

        const hasTypeMember = options.outputTypeAnnotations || options.outputTypeRegistry;
        if (hasTypeMember) {
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
            if (
              options.outputEncodeIncludeTypes === "" ||
              new RegExp(options.outputEncodeIncludeTypes).test(fullTypeName)
            ) {
              staticMembers.push(generateEncode(ctx, fullName, message));

              if (options.outputExtensions && options.unknownFields && message.extensionRange.length) {
                staticMembers.push(generateSetExtension(ctx, fullName));
              }
            } else if (options.outputEncodeMethods === true) {
              staticMembers.push(generateEmptyEncode(fullName));
            }
          }

          if (options.outputEncodeMethods === true || options.outputEncodeMethods === "decode-only") {
            if (
              options.outputDecodeIncludeTypes === "" ||
              new RegExp(options.outputDecodeIncludeTypes).test(fullTypeName)
            ) {
              staticMembers.push(generateDecode(ctx, fullName, message));

              if (options.outputExtensions && options.unknownFields && message.extensionRange.length) {
                staticMembers.push(generateGetExtension(ctx, fullName));
              }
            } else if (options.outputEncodeMethods === true) {
              staticMembers.push(generateEmptyDecode(fullName));
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
          const messageFnsTypeParameters = [fullName, hasTypeMember && `'${fullTypeName}'`]
            .filter((p) => !!p)
            .join(", ");

          const interfaces: Code[] = [code`${utils.MessageFns}<${messageFnsTypeParameters}>`];
          if (
            options.outputEncodeMethods &&
            options.outputExtensions &&
            options.unknownFields &&
            message.extensionRange.length
          ) {
            interfaces.push(code`${utils.ExtensionFns}<${fullName}>`);
          }
          if (isStructTypeName(fullTypeName)) {
            interfaces.push(code`${utils.StructWrapperFns}`);
          } else if (isAnyValueTypeName(fullTypeName)) {
            interfaces.push(code`${utils.AnyValueWrapperFns}`);
          } else if (isListValueTypeName(fullTypeName)) {
            interfaces.push(code`${utils.ListValueWrapperFns}`);
          } else if (isFieldMaskTypeName(fullTypeName)) {
            interfaces.push(code`${utils.FieldMaskWrapperFns}`);
          }
          if (options.outputExtensions) {
            for (const extension of message.extension) {
              const name = maybeSnakeToCamel(extension.name, ctx.options);
              const type = toTypeName(ctx, message, extension);
              interfaces.push(code`${utils.ExtensionHolder}<"${name}", ${type}>`);
            }
          }

          chunks.push(code`
            export const ${def(fullName)}: ${joinCode(interfaces, { on: " & " })} = {
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
  ReturnType<typeof makeAssertionUtils> &
  ReturnType<typeof makeMessageFns>;

/** These are runtime utility methods used by the generated code. */
export function makeUtils(options: Options): Utils {
  const bytes = makeByteUtils(options);
  const longs = makeLongUtils(options, bytes);
  const deepPartial = makeDeepPartial(options, longs);
  const extension = makeExtensionClass(options);
  return {
    ...bytes,
    ...deepPartial,
    ...makeObjectIdMethods(),
    ...makeTimestampMethods(options, longs, bytes),
    ...longs,
    ...makeComparisonUtils(),
    ...makeNiceGrpcServerStreamingMethodResult(options),
    ...makeGrpcWebErrorClass(bytes),
    ...extension,
    ...makeAssertionUtils(bytes),
    ...makeMessageFns(options, deepPartial, extension),
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
  const Struct = impProto(options, "google/protobuf/struct", wrapTypeName(options, "Struct"));
  return code`
    ${wrappers}['.google.protobuf.Struct'] = {
      fromObject: ${Struct}.wrap,
      toObject: ${Struct}.unwrap,
    } as any;`;
}

function makeLongUtils(options: Options, bytes: ReturnType<typeof makeByteUtils>) {
  const Long = imp("Long=long");

  const numberToLong = conditionalOutput(
    "numberToLong",
    code`
      function numberToLong(number: number) {
        return ${Long}.fromNumber(number);
      }
    `,
  );

  const longToNumber = conditionalOutput(
    "longToNumber",
    code`
      function longToNumber(int64: { toString(): string }): number {
        const num = ${bytes.globalThis}.Number(int64.toString());
        if (num > ${bytes.globalThis}.Number.MAX_SAFE_INTEGER) {
          throw new ${bytes.globalThis}.Error("Value is larger than Number.MAX_SAFE_INTEGER")
        }
        if (num < ${bytes.globalThis}.Number.MIN_SAFE_INTEGER) {
          throw new ${bytes.globalThis}.Error("Value is smaller than Number.MIN_SAFE_INTEGER")
        }
        return num;
      }
    `,
  );

  return { numberToLong, longToNumber, Long };
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
  } else if (options.oneof === OneofOption.UNIONS_VALUE) {
    oneofCase = `
      : T extends { ${maybeReadonly(options)}$case: string; value: unknown; }
      ? { ${maybeReadonly(options)}$case: T['$case']; value?: DeepPartial<T['value']>; }
    `;
  }

  const maybeExport = options.exportCommonSymbols ? "export" : "";
  // Allow passing longs as numbers or strings, nad we'll convert them
  const maybeLong =
    options.forceLong === LongOption.LONG ? code` : T extends ${longs.Long} ? string | number | Long ` : "";

  const optionalBuiltins: string[] = [];
  if (options.forceLong === LongOption.BIGINT) {
    optionalBuiltins.push("bigint");
  }
  if (options.useDate === DateOption.TEMPORAL) {
    optionalBuiltins.push("Temporal.Instant");
  }

  const Builtin = conditionalOutput(
    "Builtin",
    code`type Builtin = Date | Function | Uint8Array | string | number | boolean ${
      optionalBuiltins.length ? `| ${optionalBuiltins.join(" | ")} ` : ""
    }| undefined;`,
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

function makeMessageFns(
  options: Options,
  deepPartial: ReturnType<typeof makeDeepPartial>,
  extension: ReturnType<typeof makeExtensionClass>,
) {
  const BinaryWriter = imp("t:BinaryWriter@@bufbuild/protobuf/wire");
  const BinaryReader = imp("t:BinaryReader@@bufbuild/protobuf/wire");
  const { Exact, DeepPartial } = deepPartial;
  const { Extension } = extension;
  const commonStaticMembers: Code[] = [];
  const extensionStaticMembers = [];

  const hasTypeMember = options.outputTypeAnnotations || options.outputTypeRegistry;
  if (hasTypeMember) {
    commonStaticMembers.push(code`readonly $type: V;`);
  }

  if (options.outputEncodeMethods) {
    if (
      options.outputEncodeMethods === true ||
      options.outputEncodeMethods === "encode-only" ||
      options.outputEncodeMethods === "encode-no-creation"
    ) {
      commonStaticMembers.push(code`
        encode(message: T, writer?: ${BinaryWriter}): ${BinaryWriter};
      `);

      if (options.outputExtensions && options.unknownFields) {
        extensionStaticMembers.push(code`
          setExtension<E>(message: T, extension: ${Extension}<E>, value: E): void;
        `);
      }
    }
    if (options.outputEncodeMethods === true || options.outputEncodeMethods === "decode-only") {
      commonStaticMembers.push(code`
        decode(input: ${BinaryReader} | Uint8Array, length?: number): T;
      `);
      if (options.outputExtensions && options.unknownFields) {
        extensionStaticMembers.push(code`
          getExtension<E>(message: T, extension: ${Extension}<E>): E | undefined;
        `);
      }
    }
  }

  if (options.useAsyncIterable) {
    commonStaticMembers.push(code`
      encodeTransform(
        source: AsyncIterable<T | T[]> | Iterable<T | T[]>
      ): AsyncIterable<Uint8Array>;
    `);
    commonStaticMembers.push(code`
      decodeTransform(
        source: AsyncIterable<Uint8Array | Uint8Array[]> | Iterable<Uint8Array | Uint8Array[]>
      ): AsyncIterable<T>;
    `);
  }

  if (options.outputJsonMethods) {
    if (options.outputJsonMethods === true || options.outputJsonMethods === "from-only") {
      commonStaticMembers.push(code`fromJSON(object: any): T;`);
    }
    if (options.outputJsonMethods === true || options.outputJsonMethods === "to-only") {
      commonStaticMembers.push(code`toJSON(message: T): unknown;`);
    }
  }

  if (options.outputPartialMethods) {
    if (options.useExactTypes) {
      commonStaticMembers.push(code`create<I extends ${Exact}<${DeepPartial}<T>, I>>(base?: I): T;`);
      commonStaticMembers.push(code`fromPartial<I extends ${Exact}<${DeepPartial}<T>, I>>(object: I): T;`);
    } else {
      commonStaticMembers.push(code`create(base?: DeepPartial<T>): T;`);
      commonStaticMembers.push(code`fromPartial(object: DeepPartial<T>): T;`);
    }
  }

  const maybeExport = options.exportCommonSymbols ? "export" : "";
  const MessageFns = conditionalOutput(
    "MessageFns",
    code`
      ${maybeExport} interface MessageFns<T${hasTypeMember ? ", V extends string" : ""}> {
        ${joinCode(commonStaticMembers, { on: "\n" })}
      }
    `,
  );

  const ExtensionFns = conditionalOutput(
    "ExtensionFns",
    code`
      ${maybeExport} interface ExtensionFns<T> {
        ${joinCode(extensionStaticMembers, { on: "\n" })}
      }
    `,
  );

  const ExtensionHolder = conditionalOutput(
    "ExtensionHolder",
    code`
      ${maybeExport} type ExtensionHolder<T extends string, V> = {
        [key in T]: Extension<V>;
      }
    `,
  );

  const StructWrapperFns = conditionalOutput(
    "StructWrapperFns",
    code`
      ${maybeExport} interface StructWrapperFns {
        wrap(object: {[key: string]: any} | undefined): ${wrapTypeName(options, "Struct")};
        unwrap(message: ${wrapTypeName(options, "Struct")}): {[key: string]: any};
      }
    `,
  );

  const AnyValueWrapperFns = conditionalOutput(
    "AnyValueWrapperFns",
    code`
      ${maybeExport} interface AnyValueWrapperFns {
        wrap(value: any): ${wrapTypeName(options, "Value")};
        unwrap(message: any): string | number | boolean | Object | null | Array<any> | undefined;
      }
    `,
  );

  const ListValueWrapperFns = conditionalOutput(
    "ListValueWrapperFns",
    code`
      ${maybeExport} interface ListValueWrapperFns {
        wrap(array: ${options.useReadonlyTypes ? "Readonly" : ""}Array<any> | undefined): ${wrapTypeName(
          options,
          "ListValue",
        )};
        unwrap(message: ${options.useReadonlyTypes ? "any" : wrapTypeName(options, "ListValue")}): Array<any>;
      }
    `,
  );

  const FieldMaskWrapperFns = conditionalOutput(
    "FieldMaskWrapperFns",
    code`
      ${maybeExport} interface FieldMaskWrapperFns {
        wrap(paths: ${options.useReadonlyTypes ? "readonly" : ""} string[]): ${wrapTypeName(options, "FieldMask")};
        unwrap(message: ${options.useReadonlyTypes ? "any" : wrapTypeName(options, "FieldMask")}): string[] ${
          options.useOptionals === "all" ? "| undefined" : ""
        };
      }
    `,
  );

  return {
    MessageFns,
    ExtensionFns,
    ExtensionHolder,
    StructWrapperFns,
    AnyValueWrapperFns,
    ListValueWrapperFns,
    FieldMaskWrapperFns,
  };
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
  const Timestamp = impProto(options, "google/protobuf/timestamp", wrapTypeName(options, "Timestamp"));
  const NanoDate = imp("NanoDate=nano-date");

  let seconds: string | Code = "Math.trunc(date.getTime() / 1_000)";
  let toNumberCode: string | Code = "t.seconds";
  const makeToNumberCode = (methodCall: string) =>
    `t.seconds${options.useOptionals === "all" || options.noDefaultsForOptionals ? "?" : ""}.${methodCall}`;

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
        : options.useDate === DateOption.TEMPORAL
          ? code`
            function toTimestamp(instant: Temporal.Instant): ${Timestamp} {
              const date = {
                getTime: (): number => instant.epochMilliseconds,
              } as const;
              const seconds = ${seconds};
              const remainder = instant.round({ smallestUnit: "seconds",  roundingMode: "floor" }).until(instant);
              const nanos = (remainder.milliseconds * 1_000_000) + (remainder.microseconds * 1_000) + remainder.nanoseconds;
            
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
        : options.useDate === DateOption.TEMPORAL
          ? code`
            function fromTimestamp(t: ${Timestamp}): Temporal.Instant {
              const seconds = ${toNumberCode} || 0;
              return ${bytes.globalThis}.Temporal.Instant
                .fromEpochMilliseconds(seconds * 1_000)
                .add(${bytes.globalThis}.Temporal.Duration.from({ nanoseconds: t.nanos }));
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
            return ${fromTimestamp}(${wrapTypeName(options, "Timestamp")}.fromJSON(o));
          }
        }
      `
      : options.useDate === DateOption.TEMPORAL
        ? code`
          function fromJsonTimestamp(o: any): Temporal.Instant {
            if (o instanceof ${bytes.globalThis}.Date) {
              return ${bytes.globalThis}.Temporal.Instant.fromEpochMilliseconds(o.getTime());
            } else if (typeof o === "string") {
              return ${bytes.globalThis}.Temporal.Instant.from(o);
            } else {
              return ${fromTimestamp}(${wrapTypeName(options, "Timestamp")}.fromJSON(o));
            }
          }
        `
        : code`
        function fromJsonTimestamp(o: any): ${wrapTypeName(options, "Timestamp")} {
          if (o instanceof ${bytes.globalThis}.Date) {
            return ${toTimestamp}(o);
          } else if (typeof o === "string") {
            return ${toTimestamp}(new ${bytes.globalThis}.Date(o));
          } else {
            return ${options.typePrefix}Timestamp${options.typeSuffix}.fromJSON(o);
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
  const Extension = conditionalOutput(
    "Extension",
    code`
      export interface Extension <T> {
        number: number;
        tag: number;
        singularTag?: number;
        packedTag?: number;
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
  const fields = messageDesc.field
    .map((field, index) => ({ index, field }))
    .filter((item) => isWithinOneOf(item.field) && item.field.oneofIndex === oneofIndex);

  const mbReadonly = maybeReadonly(options);
  const info = sourceInfo.lookup(Fields.message.oneof_decl, oneofIndex);
  let outerComments: Code[] = [];
  maybeAddComment(options, info, outerComments);

  const unionType = joinCode(
    fields.flatMap((f) => {
      const fieldInfo = sourceInfo.lookup(Fields.message.field, f.index);
      let fieldName = maybeSnakeToCamel(f.field.name, options);
      let typeName = toTypeName(ctx, messageDesc, f.field);
      let valueName = oneofValueName(fieldName, options);
      let fieldComments: Code[] = [];
      maybeAddComment(options, fieldInfo, fieldComments);

      const combinedComments = fieldComments.join("\n");
      return code`|${
        combinedComments ? " // " : ""
      }\n ${combinedComments} { ${mbReadonly}$case: '${fieldName}', ${mbReadonly}${valueName}: ${typeName} }`;
    }),
  );

  const name = maybeSnakeToCamel(messageDesc.oneofDecl[oneofIndex].name, options);
  return joinCode([...outerComments, code`${mbReadonly}${name}?:`, unionType, code`| ${nullOrUndefined(options)},`], {
    on: "\n",
  });
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
        readSnippet = code`Buffer.from(${readSnippet})`;
      }
    } else if (basicLongWireType(field.type) !== undefined) {
      if (isJsTypeFieldOption(options, field)) {
        switch (field!.options!.jstype) {
          case FieldOptions_JSType.JS_NUMBER:
            readSnippet = code`${utils.longToNumber}(${readSnippet})`;
            break;
          case FieldOptions_JSType.JS_STRING:
            readSnippet = code`${readSnippet}.toString()`;
            break;
        }
      } else if (options.forceLong === LongOption.LONG) {
        switch (field.type) {
          case FieldDescriptorProto_Type.TYPE_UINT64:
          case FieldDescriptorProto_Type.TYPE_FIXED64:
            readSnippet = code`${utils.Long}.fromString(${readSnippet}.toString(), true)`;
            break;
          default:
            readSnippet = code`${utils.Long}.fromString(${readSnippet}.toString())`;
            break;
        }
      } else if (options.forceLong === LongOption.STRING) {
        readSnippet = code`${readSnippet}.toString()`;
      } else if (options.forceLong === LongOption.BIGINT) {
        readSnippet = code`${readSnippet} as bigint`;
      } else {
        readSnippet = code`${utils.longToNumber}(${readSnippet})`;
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
      options.useDate === DateOption.STRING_NANO ||
      options.useDate === DateOption.TEMPORAL)
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

function generateEmptyDecode(fullName: string): Code {
  const BinaryReader = imp("t:BinaryReader@@bufbuild/protobuf/wire");

  return code`
    decode(
      _: ${BinaryReader} | Uint8Array,
      length?: number,
    ): ${fullName} {
      throw new Error('decode not generated for ${fullName}');
    }
  `;
}

/** Creates a function to decode a message by loop overing the tags. */
function generateDecode(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, currentFile } = ctx;
  const chunks: Code[] = [];

  let createBase = code`createBase${fullName}()`;
  if (options.usePrototypeForDefaults) {
    createBase = code`Object.create(${createBase}) as ${fullName}`;
  }

  const BinaryReader = imp("BinaryReader@@bufbuild/protobuf/wire");

  // create the basic function declaration
  chunks.push(code`
    decode(
      input: ${BinaryReader} | Uint8Array,
      length?: number,
    ): ${fullName} {
      const reader = input instanceof ${BinaryReader} ? input : new ${BinaryReader}(input);
      const end = length === undefined ? reader.len : reader.pos + length;
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
    chunks.push(code`case ${field.number}: {`);

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

        const ifValueCheck = `${varName}.value !== undefined ${withAndMaybeCheckIsNotNull(
          options,
          `${varName}.value`,
        )}`;
        const maybeIfKeyCheck = `${
          options.noDefaultsForOptionals
            ? ` && ${varName}.key !== undefined ${withAndMaybeCheckIsNotNull(options, `${varName}.key`)}`
            : ""
        }`;

        chunks.push(code`
          ${tagCheck}
          const ${varName} = ${readSnippet};
          if (${ifValueCheck}${maybeIfKeyCheck}) {
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
          if (options.useOptionals === "all") {
            chunks.push(code`
              ${tagCheck}
              ${initializerSnippet}
              const el = ${readSnippet};
              if (el !== undefined) {
                ${messageProperty}${maybeNonNullAssertion}.push(el);
              }
            `);
          } else {
            chunks.push(code`
              ${tagCheck}
              ${initializerSnippet}
              ${messageProperty}${maybeNonNullAssertion}.push(${readSnippet});
            `);
          }
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
          }`);
        }
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      const oneofNameWithMessage = options.useJsonName
        ? messageProperty
        : getPropertyAccessor("message", maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options));
      const valueName = oneofValueName(fieldName, options);
      chunks.push(code`
        ${tagCheck}
        ${oneofNameWithMessage} = { $case: '${fieldName}', ${valueName}: ${readSnippet} };
      `);
    } else {
      chunks.push(code`
        ${tagCheck}
        ${messageProperty} = ${readSnippet};
      `);
    }

    if (!isRepeated(field) || packedType(field.type) === undefined) {
      chunks.push(code`continue; }`);
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
      const buf = reader.skip(tag & 7);

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
        reader.skip(tag & 7);
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
        writer.uint32(${tag}).${toReaderCall(field)}(${place})`;
      case "uint64":
      case "fixed64":
        return (place, placeAlt) => code`if (BigInt.asUintN(64, ${place}) !== ${placeAlt ?? place}) {
          throw new ${utils.globalThis}.Error('value provided for field ${place} of type ${fieldType} too large');
        }
        writer.uint32(${tag}).${toReaderCall(field)}(${place})`;
      default:
        throw new Error(`unexpected BigInt type: ${fieldType}`);
    }
  } else if (isScalar(field) || isEnum(field)) {
    const tag = ((field.number << 3) | basicWireType(field.type)) >>> 0;
    if (isLong(field) && options.forceLong === LongOption.LONG) {
      return (place) => code`writer.uint32(${tag}).${toReaderCall(field)}(${place}.toString())`;
    }
    return (place) => code`writer.uint32(${tag}).${toReaderCall(field)}(${place})`;
  } else if (isObjectId(field) && options.useMongoObjectId) {
    const tag = ((field.number << 3) | 2) >>> 0;
    const type = basicTypeName(ctx, field, { keepValueType: true });
    return (place) => code`${type}.encode(${utils.toProtoObjectId}(${place}), writer.uint32(${tag}).fork()).join()`;
  } else if (
    isTimestamp(field) &&
    (options.useDate === DateOption.DATE ||
      options.useDate === DateOption.STRING ||
      options.useDate === DateOption.STRING_NANO ||
      options.useDate === DateOption.TEMPORAL)
  ) {
    const tag = ((field.number << 3) | 2) >>> 0;
    const type = basicTypeName(ctx, field, { keepValueType: true });
    return (place) => code`${type}.encode(${utils.toTimestamp}(${place}), writer.uint32(${tag}).fork()).join()`;
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
    return (place) => code`${type}.encode(${wrappedValue(place)}, writer.uint32(${tag}).fork()).join()`;
  } else if (isMessage(field)) {
    const type = basicTypeName(ctx, field);

    if (field.type == FieldDescriptorProto_Type.TYPE_GROUP) {
      const startTag = ((field.number << 3) | 3) >>> 0,
        endTag = ((field.number << 3) | 4) >>> 0;
      return (place) => code`${type}.encode(${place}, writer.uint32(${startTag})).uint32(${endTag})`;
    }

    const tag = ((field.number << 3) | 2) >>> 0;
    return (place) => code`${type}.encode(${place}, writer.uint32(${tag}).fork()).join()`;
  } else {
    throw new Error(`Unhandled field ${field}`);
  }
}

function generateEmptyEncode(fullName: string): Code {
  const BinaryWriter = imp("BinaryWriter@@bufbuild/protobuf/wire");

  return code`
  encode(
    _: ${fullName},
    writer: ${BinaryWriter} = new ${BinaryWriter}(),
  ): ${BinaryWriter} {
    throw new Error('encode not generated for ${fullName}');
  }
  `;
}

/** Creates a function to encode a message by loop overing the tags. */
function generateEncode(ctx: Context, fullName: string, messageDesc: DescriptorProto): Code {
  const { options, utils, typeMap, currentFile } = ctx;
  const chunks: Code[] = [];

  const BinaryWriter = imp("BinaryWriter@@bufbuild/protobuf/wire");

  // create the basic function declaration
  chunks.push(code`
    encode(
      ${messageDesc.field.length > 0 || options.unknownFields ? "message" : "_"}: ${fullName},
      writer: ${BinaryWriter} = new ${BinaryWriter}(),
    ): ${BinaryWriter} {
  `);

  const processedOneofs = new Set<number>();
  const oneOfFieldsDict = messageDesc.field
    .filter((field) => isWithinOneOfThatShouldBeUnion(options, field))
    .reduce<{
      [key: number]: FieldDescriptorProto[];
    }>((result, field) => ((result[field.oneofIndex] || (result[field.oneofIndex] = [])).push(field), result), {});

  // then add a case for each field
  messageDesc.field.forEach((field) => {
    const fieldName = getFieldName(field, options);
    const messageProperty = getPropertyAccessor("message", fieldName);

    // get a generic writer.doSomething based on the basic type
    const writeSnippet = getEncodeWriteSnippet(ctx, field);

    const isOptional = isOptionalProperty(field, messageDesc.options, options, currentFile.isProto3Syntax);
    if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        const mapInfo = detectMapType(ctx, messageDesc, field)!;
        const valueType = mapInfo.valueField;
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
            ${utils.globalThis}.Object.entries(${messageProperty}${optionalAlternative}).forEach(([key, value]: [string, ${mapInfo.valueType}]) => {
              ${entryWriteSnippet}
            });
          `);
        }
      } else if (packedField(field, currentFile.isProto3Syntax) === undefined) {
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
          writer.join();
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
        const rhs = (x: string) => (isLong(field) && options.forceLong === LongOption.LONG ? `${x}.toString()` : x);
        let listWriteSnippet = code`
          writer.uint32(${tag}).fork();
          for (const v of ${messageProperty}) {
            writer.${toReaderCall(field)}(${rhs("v")});
          }
          writer.join();
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
                writer.join();
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
                writer.join();
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
          const valueName = oneofValueName(oneOfFieldName, ctx.options);
          chunks.push(code`case "${oneOfFieldName}":
            ${writeSnippet(`${oneofNameWithMessage}.${valueName}`)};
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
      for (const [key, values] of ${utils.globalThis}.Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag).raw(value);
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
        if (extension.packedTag !== undefined) {
          delete message._unknownFields[extension.packedTag];
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

      if (extension.singularTag === undefined ||
          extension.packedTag === undefined) {
        return results;
      }

      const nonDefaultTag = (extension.singularTag === extension.tag) ?
          extension.packedTag : extension.singularTag;
      list = message._unknownFields[nonDefaultTag];

      if (list !== undefined) {
        const results2 = extension.decode!(nonDefaultTag, list);

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
  const { currentFile } = ctx;
  const packedTag =
    isRepeated(extension) && packedType(extension.type) !== undefined ? ((extension.number << 3) | 2) >>> 0 : undefined;
  const singularTag = ((extension.number << 3) | basicWireType(extension.type)) >>> 0;
  const packed = isRepeated(extension) && packedField(extension, currentFile.isProto3Syntax);
  const tag = packed ? packedTag : singularTag;

  const chunks: Code[] = [];

  chunks.push(code`{`);

  chunks.push(code`number: ${extension.number},`);
  chunks.push(code`tag: ${tag},`);

  if (packedTag !== undefined) {
    chunks.push(code`singularTag: ${singularTag},`);
    chunks.push(code`packedTag: ${packedTag},`);
  }
  chunks.push(code`repeated: ${extension.label == FieldDescriptorProto_Label.LABEL_REPEATED},`);
  chunks.push(code`packed: ${extension.options?.packed ? true : false},`);

  const BinaryReader = imp("BinaryReader@@bufbuild/protobuf/wire");
  const BinaryWriter = imp("BinaryWriter@@bufbuild/protobuf/wire");

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
        if (isLong(field) && options.forceLong === LongOption.LONG) {
          return (place) => code`writer.${toReaderCall(field)}(${place}.toString())`;
        } else {
          return (place) => code`writer.${toReaderCall(field)}(${place})`;
        }
      } else if (isObjectId(field) && options.useMongoObjectId) {
        const type = basicTypeName(ctx, field, { keepValueType: true });

        return (place) => code`${type}.encode(${utils.toProtoObjectId}(${place}), writer.fork()).join()`;
      } else if (
        isTimestamp(field) &&
        (options.useDate === DateOption.DATE ||
          options.useDate === DateOption.STRING ||
          options.useDate === DateOption.STRING_NANO ||
          options.useDate === DateOption.TEMPORAL)
      ) {
        const type = basicTypeName(ctx, field, { keepValueType: true });
        return (place) => code`${type}.encode(${utils.toTimestamp}(${place}), writer.fork()).join()`;
      } else if (isValueType(ctx, field)) {
        const maybeTypeField = addTypeToMessages(options) ? `$type: '${field.typeName.slice(1)}',` : "";

        const type = basicTypeName(ctx, field, { keepValueType: true });
        const wrappedValue = (place: string): Code => {
          if (isAnyValueType(field) || isListValueType(field) || isStructType(field) || isFieldMaskType(field)) {
            return code`${type}.wrap(${place})`;
          }
          return code`{${maybeTypeField} value: ${place}!}`;
        };

        return (place) => code`${type}.encode(${wrappedValue(place)}, writer.fork()).join()`;
      } else if (isMessage(field)) {
        const type = basicTypeName(ctx, field);

        if (field.type == FieldDescriptorProto_Type.TYPE_GROUP) {
          const endTag = ((field.number << 3) | 4) >>> 0;
          return (place) => code`${type}.encode(${place}, writer).uint32(${endTag})`;
        }

        return (place) => code`${type}.encode(${place}, writer.fork()).join()`;
      } else {
        throw new Error(`Unhandled field ${field}`);
      }
    }

    const writeSnippet = getEncodeSnippet(ctx, extension);

    if (isRepeated(extension)) {
      if (!packed) {
        chunks.push(code`
          for (const v of value) {
            const writer = new ${BinaryWriter}();
            ${writeSnippet("v")};
            encoded.push(writer.finish());
          }
        `);
      } else {
        const rhs = (x: string) =>
          isLong(extension) && ctx.options.forceLong === LongOption.LONG ? `${x}.toString()` : x;

        chunks.push(code`
          const writer = new ${BinaryWriter};
          writer.fork();
          for (const v of value) {
            ${writeSnippet(rhs("v"))};
          }
          writer.join();
          encoded.push(writer.finish());
        `);
      }
    } else if (isScalar(extension) || isEnum(extension)) {
      chunks.push(code`
        if (${notDefaultCheck(ctx, extension, message?.options, "value")}) {
          const writer = new ${BinaryWriter};
          ${writeSnippet("value")};
          encoded.push(writer.finish());
        }
      `);
    } else {
      chunks.push(code`
        const writer = new ${BinaryWriter};
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
          const reader = new ${BinaryReader}(buffer);
      `);

      if (packedTag === undefined) {
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
          const reader = new ${BinaryReader}(input[input.length -1] ?? ${ctx.utils.fail}());
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

  // Handle Duration string format as a special case
  if (fullTypeName === "google.protobuf.Duration" && ctx.options.useDuration === DurationOption.STRING) {
    return code`
      fromJSON(object: string): ${fullName} {
        const match = object.match(/^(-?[0-9.]+)s$/);
        if (!match) throw new Error('Invalid duration string');
        const seconds = Number(match[1]);
        const wholeSeconds = Math.trunc(seconds);
        const nanos = Math.round((seconds - wholeSeconds) * 1e9);
        return { seconds: wholeSeconds, nanos };
      }
    `;
  }

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
        (options.useDate === DateOption.DATE ||
          options.useDate === DateOption.TEMPORAL ||
          options.useDate === DateOption.TIMESTAMP)
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
              return code`${utils.globalThis}.${cstr}(${from})`;
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
            (options.useDate === DateOption.DATE ||
              options.useDate === DateOption.TEMPORAL ||
              options.useDate === DateOption.TIMESTAMP)
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

    // if the protoJsonFormat option is enabled and the field name is different from the json name, we need to
    // accept both formats in the fromJSON method.
    let protoJsonComparison = code``;
    // and then use the snippet to handle repeated fields if necessary
    if (canonicalFromJson[fullTypeName]?.[fieldName]) {
      chunks.push(code`${fieldName}: ${canonicalFromJson[fullTypeName][fieldName]("object")},`);
    } else if (isRepeated(field)) {
      if (isMapType(ctx, messageDesc, field)) {
        const mapInfo = detectMapType(ctx, messageDesc, field)!;
        const fieldType = toTypeName(ctx, messageDesc, field);
        const i = convertFromObjectKey(ctx, messageDesc, field, "key");

        if (shouldGenerateJSMapType(ctx, messageDesc, field)) {
          const fallback = noDefaultValue ? nullOrUndefined(options) : "new Map()";

          if (options.protoJsonFormat && field.name !== field.jsonName) {
            const protoJsonProperty = getPropertyAccessor("object", field.name);
            protoJsonComparison = code`
                : ${ctx.utils.isObject}(${protoJsonProperty})
                ? (${
                  ctx.utils.globalThis
                }.Object.entries(${protoJsonProperty}) as [string, any][]).reduce((acc: ${fieldType}, [key, value]: [string, any]) => {
                    acc.set(${i}, ${readSnippet("value")});
                    return acc;
                  }, new Map())
              `;
          }
          chunks.push(code`
            ${fieldKey}: ${ctx.utils.isObject}(${jsonProperty})
              ? (${
                ctx.utils.globalThis
              }.Object.entries(${jsonProperty}) as [string, any][]).reduce((acc: ${fieldType}, [key, value]: [string, any]) => {
                  acc.set(${i}, ${readSnippet("value")});
                  return acc;
                }, new Map())
              ${protoJsonComparison}
              : ${fallback},
          `);
        } else {
          const fallback = noDefaultValue ? nullOrUndefined(options) : "{}";

          if (options.protoJsonFormat && field.name !== field.jsonName) {
            const protoJsonProperty = getPropertyAccessor("object", field.name);
            protoJsonComparison = code`
                 : ${ctx.utils.isObject}(${protoJsonProperty})
                 ? (${
                   ctx.utils.globalThis
                 }.Object.entries(${protoJsonProperty}) as [string, any][]).reduce((acc: ${fieldType}, [key, value]: [string, any]) => {
                     acc[${i}] = ${readSnippet("value")};
                     return acc;
                   }, {})
               `;
          }
          chunks.push(code`
            ${fieldKey}: ${ctx.utils.isObject}(${jsonProperty})
              ? (${
                ctx.utils.globalThis
              }.Object.entries(${jsonProperty}) as [string, any][]).reduce((acc: ${fieldType}, [key, value]: [string, any]) => {
                  acc[${i}] = ${readSnippet("value")};
                  return acc;
                }, {})
              ${protoJsonComparison}
              : ${fallback},
          `);
        }
      } else {
        const fallback = noDefaultValue ? nullOrUndefined(options) : "[]";

        const needMap = readSnippet("e").toString() !== code`e`.toString();
        if (!needMap) {
          if (options.protoJsonFormat && field.name !== field.jsonName) {
            const protoJsonProperty = getPropertyAccessor("object", field.name);
            const protoJsonPropertyOptional = getPropertyAccessor("object", field.name, true);
            protoJsonComparison = code` : ${ctx.utils.globalThis}.Array.isArray(${protoJsonPropertyOptional}) ? [...${protoJsonProperty}]`;
          }
          chunks.push(
            code`${fieldKey}: ${ctx.utils.globalThis}.Array.isArray(${jsonPropertyOptional}) ? [...${jsonProperty}] ${protoJsonComparison} : [],`,
          );
        } else {
          // Explicit `any` type required to make TS with noImplicitAny happy. `object` is also `any` here.
          if (options.protoJsonFormat && field.name !== field.jsonName) {
            const protoJsonProperty = getPropertyAccessor("object", field.name);
            const protoJsonPropertyOptional = getPropertyAccessor("object", field.name, true);
            protoJsonComparison = code` : ${
              ctx.utils.globalThis
            }.Array.isArray(${protoJsonPropertyOptional}) ? ${protoJsonProperty}.map((e: any) => ${readSnippet("e")})`;
          }
          chunks.push(code`
            ${fieldKey}: ${
              ctx.utils.globalThis
            }.Array.isArray(${jsonPropertyOptional}) ? ${jsonProperty}.map((e: any) => ${readSnippet(
              "e",
            )}) ${protoJsonComparison} : ${fallback},
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

      const valueName = oneofValueName(fieldKey, options);
      const ternaryIf = code`${ctx.utils.isSet}(${jsonProperty})`;
      const ternaryThen = code`{ $case: '${fieldName}', ${valueName}: ${readSnippet(`${jsonProperty}`)}`;
      chunks.push(code`${ternaryIf} ? ${ternaryThen}} : `);

      if (options.protoJsonFormat && field.name !== field.jsonName) {
        const protoJsonProperty = getPropertyAccessor("object", field.name);
        const ternaryOriginalIf = code`${ctx.utils.isSet}(${protoJsonProperty})`;
        const ternaryOriginalThen = code`{ $case: '${fieldName}', ${valueName}: ${readSnippet(`${protoJsonProperty}`)}`;
        chunks.push(code`${ternaryOriginalIf} ? ${ternaryOriginalThen}} : `);
      }

      if (field === lastCase) {
        chunks.push(code`${nullOrUndefined(options)},`);
      }
    } else if (isAnyValueType(field)) {
      if (options.protoJsonFormat && field.name !== field.jsonName) {
        const protoJsonProperty = getPropertyAccessor("object", field.name);
        const protoJsonPropertyOptional = getPropertyAccessor("object", field.name, true);
        protoJsonComparison = code` : ${ctx.utils.isSet}(${protoJsonPropertyOptional}) ? ${readSnippet(
          `${protoJsonProperty}`,
        )}`;
      }
      chunks.push(code`${fieldKey}: ${ctx.utils.isSet}(${jsonPropertyOptional})
        ? ${readSnippet(`${jsonProperty}`)}
        ${protoJsonComparison}
        : ${nullOrUndefined(options)},
      `);
    } else if (isStructType(field)) {
      if (options.protoJsonFormat && field.name !== field.jsonName) {
        const protoJsonProperty = getPropertyAccessor("object", field.name);
        protoJsonComparison = code` : ${ctx.utils.isObject}(${protoJsonProperty}) ? ${readSnippet(
          `${protoJsonProperty}`,
        )}`;
      }
      chunks.push(
        code`${fieldKey}: ${ctx.utils.isObject}(${jsonProperty})
          ? ${readSnippet(`${jsonProperty}`)}
          ${protoJsonComparison}
          : ${nullOrUndefined(options)},`,
      );
    } else if (isListValueType(field)) {
      if (options.protoJsonFormat && field.name !== field.jsonName) {
        const protoJsonProperty = getPropertyAccessor("object", field.name);
        protoJsonComparison = code` : ${ctx.utils.globalThis}.Array.isArray(${protoJsonProperty}) ? ${readSnippet(
          `${protoJsonProperty}`,
        )}`;
      }
      chunks.push(code`
        ${fieldKey}: ${ctx.utils.globalThis}.Array.isArray(${jsonProperty})
          ? ${readSnippet(`${jsonProperty}`)}
          ${protoJsonComparison}
          : ${nullOrUndefined(options)},
      `);
    } else {
      const fallback = isWithinOneOf(field) || noDefaultValue ? nullOrUndefined(options) : defaultValue(ctx, field);
      if (options.protoJsonFormat && field.name !== field.jsonName) {
        const protoJsonProperty = getPropertyAccessor("object", field.name);
        protoJsonComparison = code` : ${ctx.utils.isSet}(${protoJsonProperty}) ? ${readSnippet(
          `${protoJsonProperty}`,
        )}`;
      }
      chunks.push(code`
        ${fieldKey}: ${ctx.utils.isSet}(${jsonProperty}) ? ${readSnippet(`${jsonProperty}`)}
        ${protoJsonComparison}
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
  { useOptionals, useNullAsOptional, useDuration }: Options,
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
  if (fullProtobufTypeName === "google.protobuf.Duration" && useDuration === DurationOption.STRING) {
    return code`
    toJSON(message: ${fullName}): string {
        const secs = Number(message.seconds);
        const nanos = message.nanos;
        return \`\${secs + nanos/1e9}s\`;
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

  let currentIfTarget = "";

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
      } else if (isTimestamp(field) && options.useDate === DateOption.TEMPORAL) {
        return code`${from}.toString()`;
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
        } else if (isTimestamp(valueType) && options.useDate === DateOption.TEMPORAL) {
          return code`${from}.toString()`;
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
        const mapInfo = detectMapType(ctx, messageDesc, field)!;
        chunks.push(code`
        if (${messageProperty}) {
            const entries = ${utils.globalThis}.Object.entries(${messageProperty}) as [string, ${mapInfo.valueType}][];
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
      const needMap = readSnippet("e").toCodeString([]) !== "e";
      const maybeMap = needMap ? code`.map(e => ${readSnippet("e")})` : "";
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
      const valueName = oneofValueName(fieldName, options);
      chunks.push(code`
        ${
          currentIfTarget === oneofNameWithMessage ? "else " : ""
        }if (${oneofNameWithMessage}?.$case === '${fieldName}') {
          ${jsonProperty} = ${readSnippet(`${oneofNameWithMessage}.${valueName}`)};
        }
      `);
      currentIfTarget = oneofNameWithMessage;
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

  let currentSwitchTarget: string | undefined;

  // add a check for each incoming field
  messageDesc.field.forEach((field) => {
    const fieldName = getFieldName(field, options);
    const messageProperty = getPropertyAccessor("message", fieldName);
    const objectProperty = getPropertyAccessor("object", fieldName);

    if (currentSwitchTarget && !isWithinOneOfThatShouldBeUnion(options, field)) {
      // We are exiting a switch, we need to close it
      chunks.push(code`}`);
      currentSwitchTarget = undefined;
    }

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
            options.useDate === DateOption.STRING_NANO ||
            options.useDate === DateOption.TEMPORAL)) ||
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
              options.useDate === DateOption.STRING_NANO ||
              options.useDate === DateOption.TEMPORAL)
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
        const mapInfo = detectMapType(ctx, messageDesc, field)!;
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
            ${messageProperty} = ${noValueSnippet} (${
              utils.globalThis
            }.Object.entries(${objectProperty} ?? {}) as [string, ${mapInfo.valueType}][]).reduce(
              (acc: ${fieldType}, [key, value]: [string, ${mapInfo.valueType}]) => {
                if (value !== undefined) {
                  acc[${i}] = ${readSnippet("value")};
                }
                return acc;
              },
              {},
            );
          `);
        }
      } else {
        const fallback = noDefaultValue ? "undefined" : "[]";

        chunks.push(code`
          ${messageProperty} = Array.isArray(${objectProperty})? ${objectProperty}.map((e) => ${readSnippet("e")}): ${fallback};
        `);
      }
    } else if (isWithinOneOfThatShouldBeUnion(options, field)) {
      const oneofName = maybeSnakeToCamel(messageDesc.oneofDecl[field.oneofIndex].name, options);
      const oneofNameWithMessage = getPropertyAccessor("message", oneofName);
      const oneofNameWithObject = getPropertyAccessor("object", oneofName);
      const valueName = oneofValueName(fieldName, options);
      const v = readSnippet(`${oneofNameWithObject}.${valueName}`);

      // If we are entering a new switch, close the previous one
      if (currentSwitchTarget !== undefined && currentSwitchTarget !== oneofNameWithObject) {
        chunks.push(code`}`);
        currentSwitchTarget = undefined;
      }
      if (currentSwitchTarget === undefined) {
        chunks.push(code`switch (${oneofNameWithObject}?.$case) {`);
      }
      chunks.push(code`
        case '${fieldName}': {
          if (${oneofNameWithObject}?.${valueName} !== undefined
              && ${oneofNameWithObject}?.${valueName} !== null) {
            ${oneofNameWithMessage} = { $case: '${fieldName}', ${valueName}: ${v} };
          }
          break;
        }
      `);
      currentSwitchTarget = oneofNameWithObject;
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

  if (currentSwitchTarget) {
    // We are exiting a switch, we need to close it
    chunks.push(code`}`);
    currentSwitchTarget = "";
  }

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
