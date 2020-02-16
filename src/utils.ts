import ReadStream = NodeJS.ReadStream;
import { Options } from './main';

export function readToBuffer(stream: ReadStream): Promise<Buffer> {
  return new Promise(resolve => {
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

export function optionsFromParameter(parameter: string): Options {
  const options: Options = { 
    useContext: false, 
    snakeToCamel: true, 
    forceLong: false,
    outputEncodeMethods: true,
    outputJsonMethods: true,
    outputServiceImpl: true,
  };

  if (parameter) {
    if (parameter.includes('context=true')) {
      options.useContext = true;
    }
    if (parameter.includes('snakeToCamel=false')) {
      options.snakeToCamel = false;
    }
    if (parameter.includes('forceLong=true')) {
      options.forceLong = true;
    }
    if (parameter.includes('outputEncodeMethods=false')) {
      options.outputEncodeMethods = false;
    }
    if (parameter.includes('outputJsonMethods=false')) {
      options.outputJsonMethods = false;
    }
    if (parameter.includes('outputServiceImpl=false')) {
      options.outputServiceImpl = false;
    }
  }
  return options;
}
