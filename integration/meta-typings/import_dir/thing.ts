/* eslint-disable */
import { FileDescriptorProto } from 'ts-proto-descriptors';
import { protoMetadata as protoMetadata1 } from '../google/protobuf/timestamp';
import { Timestamp } from '../google/protobuf/timestamp.js';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'simple';

export interface ImportedThing {
  createdAt: Date | undefined;
}

function createBaseImportedThing(): ImportedThing {
  return { createdAt: undefined };
}

export const ImportedThing = {
  encode(message: ImportedThing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportedThing {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportedThing();
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

type ProtoMetaMessageOptions = {
  options?: { [key: string]: any };
  fields?: { [key: string]: { [key: string]: any } };
  oneof?: { [key: string]: { [key: string]: any } };
  nested?: { [key: string]: ProtoMetaMessageOptions };
};

export interface ProtoMetadata {
  fileDescriptor: FileDescriptorProto;
  references: { [key: string]: any };
  dependencies?: ProtoMetadata[];
  options?: {
    options?: { [key: string]: any };
    services?: {
      [key: string]: {
        options?: { [key: string]: any };
        methods?: { [key: string]: { [key: string]: any } };
      };
    };
    messages?: {
      [key: string]: ProtoMetaMessageOptions;
    };
    enums?: {
      [key: string]: {
        options?: { [key: string]: any };
        values?: { [key: string]: { [key: string]: any } };
      };
    };
  };
}

export const protoMetadata: ProtoMetadata = {
  fileDescriptor: FileDescriptorProto.fromPartial({
    name: 'import_dir/thing.proto',
    package: 'simple',
    dependency: ['google/protobuf/timestamp.proto'],
    publicDependency: [],
    weakDependency: [],
    messageType: [
      {
        name: 'ImportedThing',
        field: [
          {
            name: 'created_at',
            number: 1,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.Timestamp',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'createdAt',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
    ],
    enumType: [],
    service: [],
    extension: [],
    options: undefined,
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
