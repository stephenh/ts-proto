import { code, Code } from 'ts-poet';
import { CodeGeneratorRequest, FileDescriptorProto, MethodDescriptorProto, MethodOptions } from 'ts-proto-descriptors';
import ReadStream = NodeJS.ReadStream;
import { SourceDescription } from './sourceInfo';
import { Options } from './options';
import { camelCase } from './case';

export function protoFilesToGenerate(request: CodeGeneratorRequest): FileDescriptorProto[] {
  return request.protoFile.filter((f) => request.fileToGenerate.includes(f.name));
}

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

export function maybePrefixPackage(fileDesc: FileDescriptorProto, rest: string): string {
  const prefix = fileDesc.package === '' ? '' : `${fileDesc.package}.`;
  return `${prefix}${rest}`;
}

/**
 * A MethodDescriptorProto subclass that applies formatting rules.
 */
export class FormattedMethodDescriptor implements MethodDescriptorProto {
  public name: string;
  public inputType: string;
  public outputType: string;
  public options: MethodOptions | undefined;
  public clientStreaming: boolean;
  public serverStreaming: boolean;

  /** The source object before any formatting was applied */
  public original: MethodDescriptorProto;

  constructor(src: MethodDescriptorProto, options: Options) {
    this.original = src;
    this.inputType = src.name;
    this.outputType = src.outputType;
    this.options = src.options;
    this.clientStreaming = src.clientStreaming;
    this.serverStreaming = src.serverStreaming;

    this.name = FormattedMethodDescriptor.formatMethodName(src.name, options);
  }

  /**
   * Applies formatting rules to a gRPC method name.
   * @param methodName The original method name
   * @param options The options object containing rules to apply
   * @returns The formatted method name
   */
  public static formatMethodName(methodName: string, options: Options) {
    let result = methodName;

    if (options.lowerCaseServiceMethods || options.outputServices === 'grpc-js') {
      result = camelCase(result);
    }

    return result;
  }

  /**
   * Asserts that the passed object is an instance of FormattedMethodDescriptor
   * @param obj The object to check
   */
  public static assert(obj: unknown): asserts obj is FormattedMethodDescriptor {
    if (!(obj instanceof FormattedMethodDescriptor)) {
      throw new Error('Expected instance of FormattedMethodDescriptor');
    }
  }
}
