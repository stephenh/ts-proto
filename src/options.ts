export enum LongOption {
  NUMBER = 'number',
  LONG = 'long',
  STRING = 'string',
}

export enum DateOption {
  DATE = 'date',
  STRING = 'string',
  TIMESTAMP = 'timestamp',
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

export enum ServiceOption {
  GRPC = 'grpc-js',
  GENERIC = 'generic-definitions',
  DEFAULT = 'default',
  NONE = 'none',
}

export type Options = {
  context: boolean;
  snakeToCamel: Array<'json' | 'keys'>;
  forceLong: LongOption;
  useOptionals: boolean | 'none' | 'messages' | 'all'; // boolean is deprecated
  useDate: DateOption;
  useMongoObjectId: boolean;
  oneof: OneofOption;
  esModuleInterop: boolean;
  fileSuffix: string;
  outputEncodeMethods: boolean;
  outputJsonMethods: boolean;
  outputPartialMethods: boolean;
  outputTypeRegistry: boolean;
  stringEnums: boolean;
  constEnums: boolean;
  enumsAsLiterals: boolean;
  outputClientImpl: boolean | 'grpc-web';
  outputServices: ServiceOption[];
  addGrpcMetadata: boolean;
  addNestjsRestParameter: boolean;
  returnObservable: boolean;
  lowerCaseServiceMethods: boolean;
  nestJs: boolean;
  env: EnvOption;
  unrecognizedEnum: boolean;
  exportCommonSymbols: boolean;
  outputSchema: boolean;
  // An alias of !output
  onlyTypes: boolean;
  emitImportedFiles: boolean;
  useExactTypes: boolean;
  unknownFields: boolean;
  usePrototypeForDefaults: boolean;
};

export function defaultOptions(): Options {
  return {
    context: false,
    snakeToCamel: ['json', 'keys'],
    forceLong: LongOption.NUMBER,
    useOptionals: 'none',
    useDate: DateOption.DATE,
    useMongoObjectId: false,
    oneof: OneofOption.PROPERTIES,
    esModuleInterop: false,
    fileSuffix: '',
    lowerCaseServiceMethods: false,
    outputEncodeMethods: true,
    outputJsonMethods: true,
    outputPartialMethods: true,
    outputTypeRegistry: false,
    stringEnums: false,
    constEnums: false,
    enumsAsLiterals: false,
    outputClientImpl: true,
    outputServices: [],
    returnObservable: false,
    addGrpcMetadata: false,
    addNestjsRestParameter: false,
    nestJs: false,
    env: EnvOption.BOTH,
    unrecognizedEnum: true,
    exportCommonSymbols: true,
    outputSchema: false,
    onlyTypes: false,
    emitImportedFiles: true,
    useExactTypes: true,
    unknownFields: false,
    usePrototypeForDefaults: false,
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
  // We should promote onlyTypes to its own documented flag, but just an alias for now
  if (!options.outputJsonMethods && !options.outputEncodeMethods && !options.outputClientImpl && !options.nestJs) {
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
  if (typeof options.outputServices == 'string') {
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
    options.snakeToCamel = ['keys', 'json'];
  } else if (typeof options.snakeToCamel === 'string') {
    options.snakeToCamel = [options.snakeToCamel];
  }

  return options;
}

// A very naive parse function, eventually could/should use iots/runtypes
function parseParameter(parameter: string): Options {
  const options = {} as any;
  const pairs = parameter.split(',').map((s) => s.split('='));
  pairs.forEach(([key, _value]) => {
    const value = _value === 'true' ? true : _value === 'false' ? false : _value;
    if (options[key]) {
      options[key] = [options[key], value];
    } else {
      options[key] = value;
    }
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
