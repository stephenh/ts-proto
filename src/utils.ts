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
    serializers: true,
    toFromJson: true,
    serviceStub: true,
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
    if (parameter.includes('serializers=false')) {
      options.serializers = false;
    }
    if (parameter.includes('toFromJson=false')) {
      options.toFromJson = false;
    }
    if (parameter.includes('serviceStub=false')) {
      options.serviceStub = false;
    }
  }
  return options;
}
