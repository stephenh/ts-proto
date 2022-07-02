/* eslint-disable */
import * as Long from 'long';
import { FileDescriptorProto, GeneratedCodeInfo } from '../descriptor.js';
import * as _m0 from 'protobufjs/minimal';

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

function createBaseVersion(): Version {
  return { major: 0, minor: 0, patch: 0, suffix: '' };
}

export const Version = {
  encode(message: Version, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.major !== 0) {
      writer.uint32(8).int32(message.major);
    }
    if (message.minor !== 0) {
      writer.uint32(16).int32(message.minor);
    }
    if (message.patch !== 0) {
      writer.uint32(24).int32(message.patch);
    }
    if (message.suffix !== '') {
      writer.uint32(34).string(message.suffix);
    }
    if ('_unknownFields' in message) {
      const msgUnknownFields: any = (message as any)['_unknownFields'];
      for (const key of Object.keys(msgUnknownFields)) {
        const values = msgUnknownFields[key] as Uint8Array[];
        for (const value of values) {
          writer.uint32(parseInt(key, 10));
          (writer as any)['_push'](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Version {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVersion();
    (message as any)._unknownFields = {};
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
          const startPos = reader.pos;
          reader.skipType(tag & 7);
          (message as any)._unknownFields[tag] = [
            ...((message as any)._unknownFields[tag] || []),
            reader.buf.slice(startPos, reader.pos),
          ];
          break;
      }
    }
    return message;
  },
};

function createBaseCodeGeneratorRequest(): CodeGeneratorRequest {
  return { fileToGenerate: [], parameter: '', protoFile: [], compilerVersion: undefined };
}

export const CodeGeneratorRequest = {
  encode(message: CodeGeneratorRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.fileToGenerate) {
      writer.uint32(10).string(v!);
    }
    if (message.parameter !== '') {
      writer.uint32(18).string(message.parameter);
    }
    for (const v of message.protoFile) {
      FileDescriptorProto.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    if (message.compilerVersion !== undefined) {
      Version.encode(message.compilerVersion, writer.uint32(26).fork()).ldelim();
    }
    if ('_unknownFields' in message) {
      const msgUnknownFields: any = (message as any)['_unknownFields'];
      for (const key of Object.keys(msgUnknownFields)) {
        const values = msgUnknownFields[key] as Uint8Array[];
        for (const value of values) {
          writer.uint32(parseInt(key, 10));
          (writer as any)['_push'](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodeGeneratorRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodeGeneratorRequest();
    (message as any)._unknownFields = {};
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
          const startPos = reader.pos;
          reader.skipType(tag & 7);
          (message as any)._unknownFields[tag] = [
            ...((message as any)._unknownFields[tag] || []),
            reader.buf.slice(startPos, reader.pos),
          ];
          break;
      }
    }
    return message;
  },
};

function createBaseCodeGeneratorResponse(): CodeGeneratorResponse {
  return { error: '', supportedFeatures: 0, file: [] };
}

export const CodeGeneratorResponse = {
  encode(message: CodeGeneratorResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.error !== '') {
      writer.uint32(10).string(message.error);
    }
    if (message.supportedFeatures !== 0) {
      writer.uint32(16).uint64(message.supportedFeatures);
    }
    for (const v of message.file) {
      CodeGeneratorResponse_File.encode(v!, writer.uint32(122).fork()).ldelim();
    }
    if ('_unknownFields' in message) {
      const msgUnknownFields: any = (message as any)['_unknownFields'];
      for (const key of Object.keys(msgUnknownFields)) {
        const values = msgUnknownFields[key] as Uint8Array[];
        for (const value of values) {
          writer.uint32(parseInt(key, 10));
          (writer as any)['_push'](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodeGeneratorResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodeGeneratorResponse();
    (message as any)._unknownFields = {};
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
          const startPos = reader.pos;
          reader.skipType(tag & 7);
          (message as any)._unknownFields[tag] = [
            ...((message as any)._unknownFields[tag] || []),
            reader.buf.slice(startPos, reader.pos),
          ];
          break;
      }
    }
    return message;
  },
};

function createBaseCodeGeneratorResponse_File(): CodeGeneratorResponse_File {
  return { name: '', insertionPoint: '', content: '', generatedCodeInfo: undefined };
}

export const CodeGeneratorResponse_File = {
  encode(message: CodeGeneratorResponse_File, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.insertionPoint !== '') {
      writer.uint32(18).string(message.insertionPoint);
    }
    if (message.content !== '') {
      writer.uint32(122).string(message.content);
    }
    if (message.generatedCodeInfo !== undefined) {
      GeneratedCodeInfo.encode(message.generatedCodeInfo, writer.uint32(130).fork()).ldelim();
    }
    if ('_unknownFields' in message) {
      const msgUnknownFields: any = (message as any)['_unknownFields'];
      for (const key of Object.keys(msgUnknownFields)) {
        const values = msgUnknownFields[key] as Uint8Array[];
        for (const value of values) {
          writer.uint32(parseInt(key, 10));
          (writer as any)['_push'](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CodeGeneratorResponse_File {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCodeGeneratorResponse_File();
    (message as any)._unknownFields = {};
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
          const startPos = reader.pos;
          reader.skipType(tag & 7);
          (message as any)._unknownFields[tag] = [
            ...((message as any)._unknownFields[tag] || []),
            reader.buf.slice(startPos, reader.pos),
          ];
          break;
      }
    }
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
