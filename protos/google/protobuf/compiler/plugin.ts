/* eslint-disable */
import * as Long from 'long';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import { FileDescriptorProto, GeneratedCodeInfo } from '../../../google/protobuf/descriptor';

export const protobufPackage = 'google.protobuf.compiler';

/** The version number of protocol compiler. */
export interface Version {
  major: number;
  minor: number;
  patch: number;
  /**
   * A suffix for alpha, beta or rc release, e.g., "alpha-1", "rc2". It should
   * be empty for mainline stable releases.
   */
  suffix: string;
}

/** An encoded CodeGeneratorRequest is written to the plugin's stdin. */
export interface CodeGeneratorRequest {
  /**
   * The .proto files that were explicitly listed on the command-line.  The
   * code generator should generate code only for these files.  Each file's
   * descriptor will be included in proto_file, below.
   */
  fileToGenerate: string[];
  /** The generator parameter passed on the command-line. */
  parameter: string;
  /**
   * FileDescriptorProtos for all files in files_to_generate and everything
   * they import.  The files will appear in topological order, so each file
   * appears before any file that imports it.
   *
   * protoc guarantees that all proto_files will be written after
   * the fields above, even though this is not technically guaranteed by the
   * protobuf wire format.  This theoretically could allow a plugin to stream
   * in the FileDescriptorProtos and handle them one by one rather than read
   * the entire set into memory at once.  However, as of this writing, this
   * is not similarly optimized on protoc's end -- it will store all fields in
   * memory at once before sending them to the plugin.
   *
   * Type names of fields and extensions in the FileDescriptorProto are always
   * fully qualified.
   */
  protoFile: FileDescriptorProto[];
  /** The version number of protocol compiler. */
  compilerVersion: Version | undefined;
}

/** The plugin writes an encoded CodeGeneratorResponse to stdout. */
export interface CodeGeneratorResponse {
  /**
   * Error message.  If non-empty, code generation failed.  The plugin process
   * should exit with status code zero even if it reports an error in this way.
   *
   * This should be used to indicate errors in .proto files which prevent the
   * code generator from generating correct code.  Errors which indicate a
   * problem in protoc itself -- such as the input CodeGeneratorRequest being
   * unparseable -- should be reported by writing a message to stderr and
   * exiting with a non-zero status code.
   */
  error: string;
  /**
   * A bitmask of supported features that the code generator supports.
   * This is a bitwise "or" of values from the Feature enum.
   */
  supportedFeatures: number;
  file: CodeGeneratorResponse_File[];
}

/** Sync with code_generator.h. */
export enum CodeGeneratorResponse_Feature {
  FEATURE_NONE = 0,
  FEATURE_PROTO3_OPTIONAL = 1,
  UNRECOGNIZED = -1,
}

export function codeGeneratorResponse_FeatureFromJSON(object: any): CodeGeneratorResponse_Feature {
  switch (object) {
    case 0:
    case 'FEATURE_NONE':
      return CodeGeneratorResponse_Feature.FEATURE_NONE;
    case 1:
    case 'FEATURE_PROTO3_OPTIONAL':
      return CodeGeneratorResponse_Feature.FEATURE_PROTO3_OPTIONAL;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return CodeGeneratorResponse_Feature.UNRECOGNIZED;
  }
}

export function codeGeneratorResponse_FeatureToJSON(object: CodeGeneratorResponse_Feature): string {
  switch (object) {
    case CodeGeneratorResponse_Feature.FEATURE_NONE:
      return 'FEATURE_NONE';
    case CodeGeneratorResponse_Feature.FEATURE_PROTO3_OPTIONAL:
      return 'FEATURE_PROTO3_OPTIONAL';
    default:
      return 'UNKNOWN';
  }
}

/** Represents a single generated file. */
export interface CodeGeneratorResponse_File {
  /**
   * The file name, relative to the output directory.  The name must not
   * contain "." or ".." components and must be relative, not be absolute (so,
   * the file cannot lie outside the output directory).  "/" must be used as
   * the path separator, not "\".
   *
   * If the name is omitted, the content will be appended to the previous
   * file.  This allows the generator to break large files into small chunks,
   * and allows the generated text to be streamed back to protoc so that large
   * files need not reside completely in memory at one time.  Note that as of
   * this writing protoc does not optimize for this -- it will read the entire
   * CodeGeneratorResponse before writing files to disk.
   */
  name: string;
  /**
   * If non-empty, indicates that the named file should already exist, and the
   * content here is to be inserted into that file at a defined insertion
   * point.  This feature allows a code generator to extend the output
   * produced by another code generator.  The original generator may provide
   * insertion points by placing special annotations in the file that look
   * like:
   *   @@protoc_insertion_point(NAME)
   * The annotation can have arbitrary text before and after it on the line,
   * which allows it to be placed in a comment.  NAME should be replaced with
   * an identifier naming the point -- this is what other generators will use
   * as the insertion_point.  Code inserted at this point will be placed
   * immediately above the line containing the insertion point (thus multiple
   * insertions to the same point will come out in the order they were added).
   * The double-@ is intended to make it unlikely that the generated code
   * could contain things that look like insertion points by accident.
   *
   * For example, the C++ code generator places the following line in the
   * .pb.h files that it generates:
   *   // @@protoc_insertion_point(namespace_scope)
   * This line appears within the scope of the file's package namespace, but
   * outside of any particular class.  Another plugin can then specify the
   * insertion_point "namespace_scope" to generate additional classes or
   * other declarations that should be placed in this scope.
   *
   * Note that if the line containing the insertion point begins with
   * whitespace, the same whitespace will be added to every line of the
   * inserted text.  This is useful for languages like Python, where
   * indentation matters.  In these languages, the insertion point comment
   * should be indented the same amount as any inserted code will need to be
   * in order to work correctly in that context.
   *
   * The code generator that generates the initial file and the one which
   * inserts into it must both run as part of a single invocation of protoc.
   * Code generators are executed in the order in which they appear on the
   * command line.
   *
   * If |insertion_point| is present, |name| must also be present.
   */
  insertionPoint: string;
  /** The file contents. */
  content: string;
  /**
   * Information describing the file content being inserted. If an insertion
   * point is used, this information will be appropriately offset and inserted
   * into the code generation metadata for the generated files.
   */
  generatedCodeInfo: GeneratedCodeInfo | undefined;
}

const baseVersion: object = { major: 0, minor: 0, patch: 0, suffix: '' };

export const Version = {
  encode(message: Version, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.major);
    writer.uint32(16).int32(message.minor);
    writer.uint32(24).int32(message.patch);
    writer.uint32(34).string(message.suffix);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Version {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseVersion) as Version;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.major = reader.int32();
          break;
        case 2:
          message.minor = reader.int32();
          break;
        case 3:
          message.patch = reader.int32();
          break;
        case 4:
          message.suffix = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Version {
    const message = Object.create(baseVersion) as Version;
    if (object.major !== undefined && object.major !== null) {
      message.major = Number(object.major);
    } else {
      message.major = 0;
    }
    if (object.minor !== undefined && object.minor !== null) {
      message.minor = Number(object.minor);
    } else {
      message.minor = 0;
    }
    if (object.patch !== undefined && object.patch !== null) {
      message.patch = Number(object.patch);
    } else {
      message.patch = 0;
    }
    if (object.suffix !== undefined && object.suffix !== null) {
      message.suffix = String(object.suffix);
    } else {
      message.suffix = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<Version>): Version {
    const message = { ...baseVersion } as Version;
    if (object.major !== undefined && object.major !== null) {
      message.major = object.major;
    } else {
      message.major = 0;
    }
    if (object.minor !== undefined && object.minor !== null) {
      message.minor = object.minor;
    } else {
      message.minor = 0;
    }
    if (object.patch !== undefined && object.patch !== null) {
      message.patch = object.patch;
    } else {
      message.patch = 0;
    }
    if (object.suffix !== undefined && object.suffix !== null) {
      message.suffix = object.suffix;
    } else {
      message.suffix = '';
    }
    return message;
  },

  toJSON(message: Version): unknown {
    const obj: any = {};
    message.major !== undefined && (obj.major = message.major);
    message.minor !== undefined && (obj.minor = message.minor);
    message.patch !== undefined && (obj.patch = message.patch);
    message.suffix !== undefined && (obj.suffix = message.suffix);
    return obj;
  },
};

const baseCodeGeneratorRequest: object = { fileToGenerate: '', parameter: '' };

export const CodeGeneratorRequest = {
  encode(message: CodeGeneratorRequest, writer: Writer = Writer.create()): Writer {
    for (const v of message.fileToGenerate) {
      writer.uint32(10).string(v!);
    }
    writer.uint32(18).string(message.parameter);
    for (const v of message.protoFile) {
      FileDescriptorProto.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    if (message.compilerVersion !== undefined) {
      Version.encode(message.compilerVersion, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CodeGeneratorRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCodeGeneratorRequest) as CodeGeneratorRequest;
    message.fileToGenerate = [];
    message.protoFile = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fileToGenerate.push(reader.string());
          break;
        case 2:
          message.parameter = reader.string();
          break;
        case 15:
          message.protoFile.push(FileDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 3:
          message.compilerVersion = Version.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CodeGeneratorRequest {
    const message = Object.create(baseCodeGeneratorRequest) as CodeGeneratorRequest;
    message.fileToGenerate = [];
    message.protoFile = [];
    if (object.fileToGenerate !== undefined && object.fileToGenerate !== null) {
      for (const e of object.fileToGenerate) {
        message.fileToGenerate.push(String(e));
      }
    }
    if (object.parameter !== undefined && object.parameter !== null) {
      message.parameter = String(object.parameter);
    } else {
      message.parameter = '';
    }
    if (object.protoFile !== undefined && object.protoFile !== null) {
      for (const e of object.protoFile) {
        message.protoFile.push(FileDescriptorProto.fromJSON(e));
      }
    }
    if (object.compilerVersion !== undefined && object.compilerVersion !== null) {
      message.compilerVersion = Version.fromJSON(object.compilerVersion);
    } else {
      message.compilerVersion = undefined;
    }
    return message;
  },

  fromPartial(object: DeepPartial<CodeGeneratorRequest>): CodeGeneratorRequest {
    const message = { ...baseCodeGeneratorRequest } as CodeGeneratorRequest;
    message.fileToGenerate = [];
    message.protoFile = [];
    if (object.fileToGenerate !== undefined && object.fileToGenerate !== null) {
      for (const e of object.fileToGenerate) {
        message.fileToGenerate.push(e);
      }
    }
    if (object.parameter !== undefined && object.parameter !== null) {
      message.parameter = object.parameter;
    } else {
      message.parameter = '';
    }
    if (object.protoFile !== undefined && object.protoFile !== null) {
      for (const e of object.protoFile) {
        message.protoFile.push(FileDescriptorProto.fromPartial(e));
      }
    }
    if (object.compilerVersion !== undefined && object.compilerVersion !== null) {
      message.compilerVersion = Version.fromPartial(object.compilerVersion);
    } else {
      message.compilerVersion = undefined;
    }
    return message;
  },

  toJSON(message: CodeGeneratorRequest): unknown {
    const obj: any = {};
    if (message.fileToGenerate) {
      obj.fileToGenerate = message.fileToGenerate.map((e) => e);
    } else {
      obj.fileToGenerate = [];
    }
    message.parameter !== undefined && (obj.parameter = message.parameter);
    if (message.protoFile) {
      obj.protoFile = message.protoFile.map((e) => (e ? FileDescriptorProto.toJSON(e) : undefined));
    } else {
      obj.protoFile = [];
    }
    message.compilerVersion !== undefined &&
      (obj.compilerVersion = message.compilerVersion ? Version.toJSON(message.compilerVersion) : undefined);
    return obj;
  },
};

const baseCodeGeneratorResponse: object = { error: '', supportedFeatures: 0 };

export const CodeGeneratorResponse = {
  encode(message: CodeGeneratorResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.error);
    writer.uint32(16).uint64(message.supportedFeatures);
    for (const v of message.file) {
      CodeGeneratorResponse_File.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CodeGeneratorResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCodeGeneratorResponse) as CodeGeneratorResponse;
    message.file = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.error = reader.string();
          break;
        case 2:
          message.supportedFeatures = longToNumber(reader.uint64() as Long);
          break;
        case 15:
          message.file.push(CodeGeneratorResponse_File.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CodeGeneratorResponse {
    const message = Object.create(baseCodeGeneratorResponse) as CodeGeneratorResponse;
    message.file = [];
    if (object.error !== undefined && object.error !== null) {
      message.error = String(object.error);
    } else {
      message.error = '';
    }
    if (object.supportedFeatures !== undefined && object.supportedFeatures !== null) {
      message.supportedFeatures = Number(object.supportedFeatures);
    } else {
      message.supportedFeatures = 0;
    }
    if (object.file !== undefined && object.file !== null) {
      for (const e of object.file) {
        message.file.push(CodeGeneratorResponse_File.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(object: DeepPartial<CodeGeneratorResponse>): CodeGeneratorResponse {
    const message = { ...baseCodeGeneratorResponse } as CodeGeneratorResponse;
    message.file = [];
    if (object.error !== undefined && object.error !== null) {
      message.error = object.error;
    } else {
      message.error = '';
    }
    if (object.supportedFeatures !== undefined && object.supportedFeatures !== null) {
      message.supportedFeatures = object.supportedFeatures;
    } else {
      message.supportedFeatures = 0;
    }
    if (object.file !== undefined && object.file !== null) {
      for (const e of object.file) {
        message.file.push(CodeGeneratorResponse_File.fromPartial(e));
      }
    }
    return message;
  },

  toJSON(message: CodeGeneratorResponse): unknown {
    const obj: any = {};
    message.error !== undefined && (obj.error = message.error);
    message.supportedFeatures !== undefined && (obj.supportedFeatures = message.supportedFeatures);
    if (message.file) {
      obj.file = message.file.map((e) => (e ? CodeGeneratorResponse_File.toJSON(e) : undefined));
    } else {
      obj.file = [];
    }
    return obj;
  },
};

const baseCodeGeneratorResponse_File: object = { name: '', insertionPoint: '', content: '' };

export const CodeGeneratorResponse_File = {
  encode(message: CodeGeneratorResponse_File, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(18).string(message.insertionPoint);
    writer.uint32(122).string(message.content);
    if (message.generatedCodeInfo !== undefined) {
      GeneratedCodeInfo.encode(message.generatedCodeInfo, writer.uint32(130).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): CodeGeneratorResponse_File {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseCodeGeneratorResponse_File) as CodeGeneratorResponse_File;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.insertionPoint = reader.string();
          break;
        case 15:
          message.content = reader.string();
          break;
        case 16:
          message.generatedCodeInfo = GeneratedCodeInfo.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CodeGeneratorResponse_File {
    const message = Object.create(baseCodeGeneratorResponse_File) as CodeGeneratorResponse_File;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.insertionPoint !== undefined && object.insertionPoint !== null) {
      message.insertionPoint = String(object.insertionPoint);
    } else {
      message.insertionPoint = '';
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = String(object.content);
    } else {
      message.content = '';
    }
    if (object.generatedCodeInfo !== undefined && object.generatedCodeInfo !== null) {
      message.generatedCodeInfo = GeneratedCodeInfo.fromJSON(object.generatedCodeInfo);
    } else {
      message.generatedCodeInfo = undefined;
    }
    return message;
  },

  fromPartial(object: DeepPartial<CodeGeneratorResponse_File>): CodeGeneratorResponse_File {
    const message = { ...baseCodeGeneratorResponse_File } as CodeGeneratorResponse_File;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    if (object.insertionPoint !== undefined && object.insertionPoint !== null) {
      message.insertionPoint = object.insertionPoint;
    } else {
      message.insertionPoint = '';
    }
    if (object.content !== undefined && object.content !== null) {
      message.content = object.content;
    } else {
      message.content = '';
    }
    if (object.generatedCodeInfo !== undefined && object.generatedCodeInfo !== null) {
      message.generatedCodeInfo = GeneratedCodeInfo.fromPartial(object.generatedCodeInfo);
    } else {
      message.generatedCodeInfo = undefined;
    }
    return message;
  },

  toJSON(message: CodeGeneratorResponse_File): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.insertionPoint !== undefined && (obj.insertionPoint = message.insertionPoint);
    message.content !== undefined && (obj.content = message.content);
    message.generatedCodeInfo !== undefined &&
      (obj.generatedCodeInfo = message.generatedCodeInfo
        ? GeneratedCodeInfo.toJSON(message.generatedCodeInfo)
        : undefined);
    return obj;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('Unable to locate global object');
})();

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
