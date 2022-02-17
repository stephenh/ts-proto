/* eslint-disable */
import { FileDescriptorProto as FileDescriptorProto1 } from 'ts-proto-descriptors';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { protoMetadata as protoMetadata1 } from '../google/protobuf/descriptor';

export const protobufPackage = 'something';

export interface Something {
  hello: string;
  foo: number[];
}

function createBaseSomething(): Something {
  return { hello: '', foo: [] };
}

export const Something = {
  encode(message: Something, writer: Writer = Writer.create()): Writer {
    if (message.hello !== '') {
      writer.uint32(10).string(message.hello);
    }
    writer.uint32(18).fork();
    for (const v of message.foo) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Something {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSomething();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.hello = reader.string();
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.foo.push(reader.int32());
            }
          } else {
            message.foo.push(reader.int32());
          }
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
  fileDescriptor: FileDescriptorProto1;
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
  fileDescriptor: FileDescriptorProto1.fromPartial({
    name: 'something/something.proto',
    package: 'something',
    dependency: ['google/protobuf/descriptor.proto'],
    publicDependency: [],
    weakDependency: [],
    messageType: [
      {
        name: 'Something',
        field: [
          {
            name: 'hello',
            number: 1,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'hello',
            proto3Optional: false,
          },
          {
            name: 'foo',
            number: 2,
            label: 3,
            type: 5,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'foo',
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
      },
    ],
    enumType: [],
    service: [],
    extension: [
      {
        name: 'something',
        number: 1000,
        label: 1,
        type: 11,
        typeName: '.something.Something',
        extendee: '.google.protobuf.FieldOptions',
        defaultValue: '',
        oneofIndex: 0,
        jsonName: 'something',
        proto3Optional: true,
      },
    ],
    sourceCodeInfo: { location: [] },
    syntax: 'proto3',
  }),
  references: { '.something.Something': Something },
  dependencies: [protoMetadata1],
};

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
