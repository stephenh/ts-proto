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
  context: boolean;
  snakeToCamel: boolean;
  forceLong: LongOption;
  useOptionals: boolean;
  useDate: boolean;
  oneof: OneofOption;
  esModuleInterop: boolean;
  outputEncodeMethods: boolean;
  outputJsonMethods: boolean;
  outputPartialMethods: boolean;
  stringEnums: boolean;
  constEnums: boolean;
  outputClientImpl: boolean | 'grpc-web';
  addGrpcMetadata: boolean;
  addNestjsRestParameter: boolean;
  returnObservable: boolean;
  lowerCaseServiceMethods: boolean;
  nestJs: boolean;
  env: EnvOption;
  unrecognizedEnum: boolean;
  exportCommonSymbols: boolean;
  outputSchema: boolean;
};

export function defaultOptions(): Options {
  return {
    context: false,
    snakeToCamel: true,
    forceLong: LongOption.NUMBER,
    useOptionals: false,
    useDate: true,
    oneof: OneofOption.PROPERTIES,
    esModuleInterop: false,
    lowerCaseServiceMethods: false,
    outputEncodeMethods: true,
    outputJsonMethods: true,
    outputPartialMethods: true,
    stringEnums: false,
    constEnums: false,
    outputClientImpl: true,
    returnObservable: false,
    addGrpcMetadata: false,
    addNestjsRestParameter: false,
    nestJs: false,
    env: EnvOption.BOTH,
    unrecognizedEnum: true,
    exportCommonSymbols: true,
    outputSchema: false,
  };
}

const nestJsOptions: Partial<Options> = {
  lowerCaseServiceMethods: true,
  outputEncodeMethods: false,
  outputJsonMethods: false,
  outputPartialMethods: false,
  outputClientImpl: false,
  useDate: false,
};

export function optionsFromParameter(parameter: string): Options {
  const options = defaultOptions();
  if (parameter) {
    const parsed = parseParameter(parameter);
    if (parsed.nestJs) {
      Object.assign(options, nestJsOptions);
    }
    Object.assign(options, parsed);
  }
  // Treat forceLong=true as LONG
  if ((options.forceLong as any) === true) {
    options.forceLong = LongOption.LONG;
  }
  return options;
}

// A very naive parse function, eventually could/should use iots/runtypes
function parseParameter(parameter: string): Options {
  const options = {} as any;
  const pairs = parameter.split(',').map((s) => s.split('='));
  pairs.forEach(([key, value]) => {
    options[key] = value === 'true' ? true : value === 'false' ? false : value;
  });
  return options;
}

export function getTsPoetOpts(options: Options): { forceDefaultImport?: string[] } {
  if (options.esModuleInterop) {
    return { forceDefaultImport: ['protobufjs/minimal'] };
  } else {
    return {};
  }
}
