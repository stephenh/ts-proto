import { parse } from "path";
import { Code } from "ts-poet";
import { ToStringOpts } from "ts-poet/build/Code";

export enum LongOption {
  NUMBER = "number",
  LONG = "long",
  STRING = "string",
  BIGINT = "bigint",
}

export enum DateOption {
  DATE = "date",
  STRING = "string",
  TIMESTAMP = "timestamp",
}

export enum EnvOption {
  NODE = "node",
  BROWSER = "browser",
  BOTH = "both",
}

export enum OneofOption {
  PROPERTIES = "properties",
  UNIONS = "unions",
}

export enum ServiceOption {
  GRPC = "grpc-js",
  NICE_GRPC = "nice-grpc",
  GENERIC = "generic-definitions",
  DEFAULT = "default",
  NONE = "none",
}

export type Options = {
  context: boolean;
  snakeToCamel: Array<"json" | "keys">;
  forceLong: LongOption;
  useOptionals: boolean | "none" | "messages" | "all"; // boolean is deprecated
  useDate: DateOption;
  useMongoObjectId: boolean;
  oneof: OneofOption;
  esModuleInterop: boolean;
  fileSuffix: string;
  importSuffix: string;
  outputEncodeMethods: true | false | "encode-only" | "decode-only" | "encode-no-creation";
  outputJsonMethods: boolean;
  outputPartialMethods: boolean;
  outputTypeRegistry: boolean;
  stringEnums: boolean;
  constEnums: boolean;
  removeEnumPrefix: boolean;
  enumsAsLiterals: boolean;
  outputClientImpl: boolean | "grpc-web";
  outputServices: ServiceOption[];
  addGrpcMetadata: boolean;
  metadataType: string | undefined;
  addNestjsRestParameter: boolean;
  returnObservable: boolean;
  lowerCaseServiceMethods: boolean;
  nestJs: boolean;
  env: EnvOption;
  unrecognizedEnum: boolean;
  exportCommonSymbols: boolean;
  outputSchema: boolean;
  onlyTypes: boolean;
  emitImportedFiles: boolean;
  useAbortSignal: boolean;
  useExactTypes: boolean;
  useAsyncIterable: boolean;
  unknownFields: boolean;
  usePrototypeForDefaults: boolean;
  useJsonWireFormat: boolean;
  useNumericEnumForJson: boolean;
  initializeFieldsAsUndefined: boolean;
  useMapType: boolean;
  useReadonlyTypes: boolean;
  useSnakeTypeName: boolean;
  outputExtensions: boolean;
  M: { [from: string]: string };
};

export function defaultOptions(): Options {
  return {
    context: false,
    snakeToCamel: ["json", "keys"],
    forceLong: LongOption.NUMBER,
    useOptionals: "none",
    useDate: DateOption.DATE,
    useMongoObjectId: false,
    oneof: OneofOption.PROPERTIES,
    esModuleInterop: false,
    fileSuffix: "",
    importSuffix: "",
    lowerCaseServiceMethods: false,
    outputEncodeMethods: true,
    outputJsonMethods: true,
    outputPartialMethods: true,
    outputTypeRegistry: false,
    stringEnums: false,
    constEnums: false,
    removeEnumPrefix: false,
    enumsAsLiterals: false,
    outputClientImpl: true,
    outputServices: [],
    returnObservable: false,
    addGrpcMetadata: false,
    metadataType: undefined,
    addNestjsRestParameter: false,
    nestJs: false,
    env: EnvOption.BOTH,
    unrecognizedEnum: true,
    exportCommonSymbols: true,
    outputSchema: false,
    onlyTypes: false,
    emitImportedFiles: true,
    useExactTypes: true,
    useAbortSignal: false,
    useAsyncIterable: false,
    unknownFields: false,
    usePrototypeForDefaults: false,
    useJsonWireFormat: false,
    useNumericEnumForJson: false,
    initializeFieldsAsUndefined: true,
    useMapType: false,
    useReadonlyTypes: false,
    useSnakeTypeName: true,
    outputExtensions: false,
    M: {},
  };
}

const nestJsOptions: Partial<Options> = {
  lowerCaseServiceMethods: true,
  outputEncodeMethods: false,
  outputJsonMethods: false,
  outputPartialMethods: false,
  outputClientImpl: false,
  useDate: DateOption.TIMESTAMP,
};

export function optionsFromParameter(parameter: string | undefined): Options {
  const options = defaultOptions();
  if (parameter) {
    const parsed = parseParameter(parameter);
    if (parsed.nestJs) {
      Object.assign(options, nestJsOptions);
    }
    Object.assign(options, parsed);
  }

  // onlyTypes=true implies outputJsonMethods=false,outputEncodeMethods=false,outputClientImpl=false,nestJs=false
  if (options.onlyTypes) {
    options.outputJsonMethods = false;
    options.outputEncodeMethods = false;
    options.outputClientImpl = false;
    options.nestJs = false;
  } else if (
    !options.outputJsonMethods &&
    !options.outputEncodeMethods &&
    !options.outputClientImpl &&
    !options.nestJs
  ) {
    options.onlyTypes = true;
  }

  // Treat forceLong=true as LONG
  if ((options.forceLong as any) === true) {
    options.forceLong = LongOption.LONG;
  }

  // Treat outputServices=false as NONE
  if ((options.outputServices as any) === false) {
    options.outputServices = [ServiceOption.NONE];
  }

  // Existing type-coercion inside parseParameter leaves a little to be desired.
  if (typeof options.outputServices == "string") {
    options.outputServices = [options.outputServices];
  }

  if (options.outputServices.length == 0) {
    options.outputServices = [ServiceOption.DEFAULT];
  }

  if ((options.useDate as any) === true) {
    // Treat useDate=true as DATE
    options.useDate = DateOption.DATE;
  } else if ((options.useDate as any) === false) {
    // Treat useDate=false as TIMESTAMP
    options.useDate = DateOption.TIMESTAMP;
  }

  if ((options.snakeToCamel as any) === false) {
    options.snakeToCamel = [];
  } else if ((options.snakeToCamel as any) === true) {
    options.snakeToCamel = ["keys", "json"];
  } else if (typeof options.snakeToCamel === "string") {
    options.snakeToCamel = (options.snakeToCamel as string).split("_") as any;
  }

  if (options.useJsonWireFormat) {
    if (!options.onlyTypes) {
      // useJsonWireFormat requires onlyTypes=true
      options.useJsonWireFormat = false;
    } else {
      // useJsonWireFormat implies stringEnums=true and useDate=string
      options.stringEnums = true;
      options.useDate = DateOption.STRING;
    }
  }

  if (options.nestJs) {
    options.initializeFieldsAsUndefined = false;
  }

  return options;
}

// A very naive parse function, eventually could/should use iots/runtypes
function parseParameter(parameter: string): Options {
  const options = { M: {} } as any;
  parameter.split(",").forEach((param) => {
    // same as protoc-gen-go https://github.com/protocolbuffers/protobuf-go/blob/bf9455640daabb98c93b5b5e71628f3f813d57bb/compiler/protogen/protogen.go#L168-L171
    const optionSeparatorPos = param.indexOf("=");
    const key = param.substring(0, optionSeparatorPos);
    const value = parseParamValue(param.substring(optionSeparatorPos + 1));
    if (key.charAt(0) === "M") {
      if (typeof value !== "string") {
        console.warn(`ignoring invalid M option: '${param}'`);
      } else {
        const mKey = key.substring(1);
        if (options.M[mKey]) {
          console.warn(`received conflicting M options: '${param}' will override 'M${mKey}=${options.M[mKey]}'`);
        }
        if (param.endsWith(".ts")) {
          console.warn(`received M option '${param}' ending in '.ts' this is usually a mistake`);
        }
        options.M[mKey] = value;
      }
    } else if (options[key]) {
      options[key] = [options[key], value];
    } else {
      options[key] = value;
    }
  });
  return options;
}

function parseParamValue(value: string): string | boolean {
  return value === "true" ? true : value === "false" ? false : value;
}

export function getTsPoetOpts(_options: Options): ToStringOpts {
  const imports = ["protobufjs/minimal" + _options.importSuffix];
  return {
    prefix: `/* eslint-disable */`,
    dprintOptions: { preferSingleLine: true, lineWidth: 120 },
    ...(_options.esModuleInterop ? { forceDefaultImport: imports } : { forceModuleImport: imports }),
  };
}
