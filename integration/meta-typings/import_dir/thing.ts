/* eslint-disable */
import { FileDescriptorProto } from 'ts-proto-descriptors';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { protoMetadata as protoMetadata1, Timestamp } from '../google/protobuf/timestamp';

export const protobufPackage = 'simple';

export interface ImportedThing {
  createdAt: Date | undefined;
}

const baseImportedThing: object = {};

export const ImportedThing = {
  encode(message: ImportedThing, writer: Writer = Writer.create()): Writer {
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ImportedThing {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseImportedThing } as ImportedThing;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export interface ProtoMetadata {
  fileDescriptor: FileDescriptorProto;
  references: { [key: string]: any };
  dependencies?: ProtoMetadata[];
}

export const protoMetadata: ProtoMetadata = {
  fileDescriptor: FileDescriptorProto.fromPartial({
    dependency: ['google/protobuf/timestamp.proto'],
    publicDependency: [],
    weakDependency: [],
    messageType: [
      {
        field: [
          {
            name: 'created_at',
            number: 1,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.Timestamp',
            jsonName: 'createdAt',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'ImportedThing',
      },
    ],
    enumType: [],
    service: [],
    extension: [],
    name: 'import_dir/thing.proto',
    package: 'simple',
    sourceCodeInfo: { location: [] },
    syntax: 'proto3',
  }),
  references: { '.simple.ImportedThing': ImportedThing },
  dependencies: [protoMetadata1],
};

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
