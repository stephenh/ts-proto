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
  esModuleInterop: boolean;
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
  exportCommonSymbols: boolean;
};

export function defaultOptions(): Options {
  return {
    useContext: false,
    snakeToCamel: true,
    forceLong: LongOption.NUMBER,
    useOptionals: false,
    useDate: true,
    oneof: OneofOption.PROPERTIES,
    esModuleInterop: false,
    lowerCaseServiceMethods: false,
    outputEncodeMethods: true,
    outputJsonMethods: true,
    stringEnums: false,
    outputClientImpl: true,
    returnObservable: false,
    addGrpcMetadata: false,
    addNestjsRestParameter: false,
    nestJs: false,
    env: EnvOption.BOTH,
    addUnrecognizedEnum: true,
    exportCommonSymbols: true,
  };
}

export function optionsFromParameter(parameter: string): Options {
  const options = defaultOptions();

  if (parameter) {
    if (parameter.includes('context=true')) {
      options.useContext = true;
    }
    if (parameter.includes('snakeToCamel=false')) {
      options.snakeToCamel = false;
    }
    if (parameter.includes('forceLong=true') || parameter.includes('forceLong=long')) {
      options.forceLong = LongOption.LONG;
    }
    if (parameter.includes('forceLong=string')) {
      options.forceLong = LongOption.STRING;
    }
    if (parameter.includes('useOptionals=true')) {
      options.useOptionals = true;
    }
    if (parameter.includes('useDate=false')) {
      options.useDate = false;
    }
    if (parameter.includes('esModuleInterop=true')) {
      options.esModuleInterop = true;
    }
    if (parameter.includes('oneof=properties')) {
      options.oneof = OneofOption.PROPERTIES;
    }
    if (parameter.includes('oneof=unions')) {
      options.oneof = OneofOption.UNIONS;
    }
    if (parameter.includes('lowerCaseServiceMethods=true')) {
      options.lowerCaseServiceMethods = true;
    }
    if (parameter.includes('outputEncodeMethods=false')) {
      options.outputEncodeMethods = false;
      if (parameter.includes('stringEnums=true')) {
        options.stringEnums = true;
      }
    }
    if (parameter.includes('outputJsonMethods=false')) {
      options.outputJsonMethods = false;
    }
    if (parameter.includes('outputClientImpl=false')) {
      options.outputClientImpl = false;
    }
    if (parameter.includes('outputClientImpl=grpc-web')) {
      options.outputClientImpl = 'grpc-web';
      if (parameter.includes('returnObservable=true')) {
        options.returnObservable = true;
      }
    }
    // Even if not using grpc-web/nestJs output
    if (parameter.includes('addGrpcMetadata=true')) {
      options.addGrpcMetadata = true;
    }
    if (parameter.includes('exportCommonSymbols=false')) {
      options.exportCommonSymbols = false;
    }

    if (parameter.includes('nestJs=true')) {
      options.nestJs = true;
      options.lowerCaseServiceMethods = true;
      options.outputEncodeMethods = false;
      options.outputJsonMethods = false;
      options.outputClientImpl = false;
      options.useDate = false;
      if (parameter.includes('addNestjsRestParameter=true')) {
        options.addNestjsRestParameter = true;
      }
      if (parameter.includes('returnObservable=true')) {
        options.returnObservable = true;
      }
    }

    if (parameter.includes('env=node')) {
      options.env = EnvOption.NODE;
    }
    if (parameter.includes('env=browser')) {
      options.env = EnvOption.BROWSER;
    }
    if (parameter.includes('unrecognizedEnum=true')) {
      options.addUnrecognizedEnum = true;
    }
    if (parameter.includes('unrecognizedEnum=false')) {
      options.addUnrecognizedEnum = false;
    }
  }
  return options;
}

export function getTsPoetOpts(options: Options): { forceDefaultImport?: string[] } {
  if (options.esModuleInterop) {
    return { forceDefaultImport: ['protobufjs/minimal'] };
  } else {
    return {};
  }
}
