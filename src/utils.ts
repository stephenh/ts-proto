import ReadStream = NodeJS.ReadStream;
import { Options, LongOption, EnvOption, OneofOption } from './main';
import { SourceDescription } from './sourceInfo';
import { code, Code } from 'ts-poet';

export function readToBuffer(stream: ReadStream): Promise<Buffer> {
  return new Promise((resolve) => {
    const ret: Array<Buffer | string> = [];
    let len = 0;
    stream.on('readable', () => {
      let chunk;
      while ((chunk = stream.read())) {
        ret.push(chunk);
        len += chunk.length;
      }
    });
    stream.on('end', () => {
      resolve(Buffer.concat(ret as any, len));
    });
  });
}

export function fail(message: string): never {
  throw new Error(message);
}

export function singular(name: string): string {
  return name.substring(0, name.length - 1); // drop the 's', which is extremely naive
}

export function lowerFirst(name: string): string {
  return name.substring(0, 1).toLowerCase() + name.substring(1);
}

export function upperFirst(name: string): string {
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

export function defaultOptions(): Options {
  return {
    useContext: false,
    snakeToCamel: true,
    forceLong: LongOption.NUMBER,
    useOptionals: false,
    useDate: true,
    oneof: OneofOption.PROPERTIES,
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

    if (parameter.includes('nestJs=true')) {
      options.nestJs = true;

      options.lowerCaseServiceMethods = true;
      options.outputEncodeMethods = false;
      options.outputJsonMethods = false;
      options.outputClientImpl = false;
      options.useDate = false;

      if (parameter.includes('addGrpcMetadata=true')) {
        options.addGrpcMetadata = true;
      }
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

// Since we don't know what form the comment originally took, it may contain closing block comments.
const CloseComment = /\*\//g;

/** Removes potentially harmful characters from comments and pushes it into chunks. */
export function maybeAddComment(
  desc: Partial<Pick<SourceDescription, 'leadingComments' | 'trailingComments'>>,
  chunks: Code[],
  deprecated?: boolean,
  prefix: string = ''
): void {
  let lines: string[] = [];
  if (desc.leadingComments || desc.trailingComments) {
    let content = (desc.leadingComments || desc.trailingComments || '').replace(CloseComment, '* /').trim();

    // Detect /** ... */ comments
    const isDoubleStar = content.startsWith('*');
    if (isDoubleStar) {
      content = content.substring(1).trim();
    }

    // Prefix things like the enum name.
    if (prefix) {
      content = prefix + content;
    }

    lines = content.split('\n').map((l) => l.replace(/^ /, '').replace(/\n/, ''));
  }
  // Deprecated comment should be added even if no other comment was added
  if (deprecated) {
    if (lines.length > 0) {
      lines.push('');
    }
    lines.push('@deprecated');
  }

  let comment: Code;
  if (lines.length === 1) {
    comment = code`/** ${lines[0]} */`;
  } else {
    comment = code`/**\n * ${lines.join('\n * ')}\n */`;
  }
  if (lines.length > 0) {
    chunks.push(code`\n\n${comment}\n\n`);
  }
}

// Comment block at the top of every source file, since these comments require specific
// syntax incompatible with ts-poet, we will hard-code the string and prepend to the
// generator output.
export function prefixDisableLinter(spec: string): string {
  return `/* eslint-disable */\n${spec}`;
}
