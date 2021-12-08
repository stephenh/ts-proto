/* eslint-disable */
import { FileDescriptorProto as FileDescriptorProto1 } from 'ts-proto-descriptors';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { protoMetadata as protoMetadata1 } from './google/protobuf/descriptor';

export const protobufPackage = '';

export enum MyEnum {
  FOO = 0,
  BAR = 1,
  UNRECOGNIZED = -1,
}

export interface MyMessage {
  foo?: number | undefined;
  foo2?: number | undefined;
  bar?: string | undefined;
  quux: string | undefined;
}

export interface RequestType {}

export interface ResponseType {}

const baseMyMessage: object = {};

export const MyMessage = {
  encode(message: MyMessage, writer: Writer = Writer.create()): Writer {
    if (message.foo !== undefined) {
      writer.uint32(8).int32(message.foo);
    }
    if (message.foo2 !== undefined) {
      writer.uint32(16).int32(message.foo2);
    }
    if (message.bar !== undefined) {
      writer.uint32(26).string(message.bar);
    }
    if (message.quux !== undefined) {
      writer.uint32(34).string(message.quux);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MyMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMyMessage } as MyMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.foo = reader.int32();
          break;
        case 2:
          message.foo2 = reader.int32();
          break;
        case 3:
          message.bar = reader.string();
          break;
        case 4:
          message.quux = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseRequestType: object = {};

export const RequestType = {
  encode(_: RequestType, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): RequestType {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseRequestType } as RequestType;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseResponseType: object = {};

export const ResponseType = {
  encode(_: ResponseType, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ResponseType {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseResponseType } as ResponseType;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export interface MyService {
  MyMethod(request: RequestType): Promise<ResponseType>;
}

export class MyServiceClientImpl implements MyService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.MyMethod = this.MyMethod.bind(this);
  }
  MyMethod(request: RequestType): Promise<ResponseType> {
    const data = RequestType.encode(request).finish();
    const promise = this.rpc.request('MyService', 'MyMethod', data);
    return promise.then((data) => ResponseType.decode(new Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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
    dependency: ['google/protobuf/descriptor.proto'],
    publicDependency: [],
    weakDependency: [],
    messageType: [
      {
        field: [
          {
            name: 'foo',
            number: 1,
            label: 1,
            type: 5,
            options: { uninterpretedOption: [] },
            oneofIndex: 1,
            jsonName: 'foo',
            proto3Optional: true,
          },
          { name: 'foo_2', number: 2, label: 1, type: 5, oneofIndex: 2, jsonName: 'foo2', proto3Optional: true },
          { name: 'bar', number: 3, label: 1, type: 9, oneofIndex: 3, jsonName: 'bar', proto3Optional: true },
          { name: 'quux', number: 4, label: 1, type: 9, oneofIndex: 0, jsonName: 'quux' },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [
          { name: 'qux', options: { uninterpretedOption: [] } },
          { name: '_foo' },
          { name: '_foo_2' },
          { name: '_bar' },
        ],
        reservedRange: [],
        reservedName: [],
        name: 'MyMessage',
        options: { uninterpretedOption: [] },
      },
      {
        field: [],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'RequestType',
      },
      {
        field: [],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'ResponseType',
      },
    ],
    enumType: [
      {
        value: [
          { name: 'FOO', number: 0, options: { uninterpretedOption: [] } },
          { name: 'BAR', number: 1 },
        ],
        reservedRange: [],
        reservedName: [],
        name: 'MyEnum',
        options: { uninterpretedOption: [] },
      },
    ],
    service: [
      {
        method: [
          {
            name: 'MyMethod',
            inputType: '.RequestType',
            outputType: '.ResponseType',
            options: { uninterpretedOption: [] },
          },
        ],
        name: 'MyService',
        options: { uninterpretedOption: [] },
      },
    ],
    extension: [
      {
        name: 'my_file_option',
        extendee: '.google.protobuf.FileOptions',
        number: 50000,
        label: 1,
        type: 9,
        jsonName: 'myFileOption',
        proto3Optional: true,
      },
      {
        name: 'my_message_option',
        extendee: '.google.protobuf.MessageOptions',
        number: 50001,
        label: 1,
        type: 5,
        jsonName: 'myMessageOption',
        proto3Optional: true,
      },
      {
        name: 'my_field_option',
        extendee: '.google.protobuf.FieldOptions',
        number: 50002,
        label: 1,
        type: 2,
        jsonName: 'myFieldOption',
        proto3Optional: true,
      },
      {
        name: 'my_oneof_option',
        extendee: '.google.protobuf.OneofOptions',
        number: 50003,
        label: 1,
        type: 3,
        jsonName: 'myOneofOption',
        proto3Optional: true,
      },
      {
        name: 'my_enum_option',
        extendee: '.google.protobuf.EnumOptions',
        number: 50004,
        label: 1,
        type: 8,
        jsonName: 'myEnumOption',
        proto3Optional: true,
      },
      {
        name: 'my_enum_value_option',
        extendee: '.google.protobuf.EnumValueOptions',
        number: 50005,
        label: 1,
        type: 13,
        jsonName: 'myEnumValueOption',
        proto3Optional: true,
      },
      {
        name: 'my_service_option',
        extendee: '.google.protobuf.ServiceOptions',
        number: 50006,
        label: 1,
        type: 14,
        typeName: '.MyEnum',
        jsonName: 'myServiceOption',
        proto3Optional: true,
      },
      {
        name: 'my_method_option',
        extendee: '.google.protobuf.MethodOptions',
        number: 50007,
        label: 1,
        type: 11,
        typeName: '.MyMessage',
        jsonName: 'myMethodOption',
        proto3Optional: true,
      },
    ],
    name: 'options.proto',
    options: { uninterpretedOption: [] },
    sourceCodeInfo: { location: [] },
    syntax: 'proto3',
  }),
  references: {
    '.MyEnum': MyEnum,
    '.MyMessage': MyMessage,
    '.RequestType': RequestType,
    '.ResponseType': ResponseType,
    '.MyService': MyServiceClientImpl,
  },
  dependencies: [protoMetadata1],

  options: {
    options: { my_file_option: 'Hello world!' },
    messages: {
      MyMessage: {
        options: { my_message_option: 1234 },
        fields: { foo: { my_field_option: 4.5 } },
        oneof: { qux: { my_oneof_option: 42 } },
      },
    },
    services: {
      MyService: {
        options: { my_service_option: 0 },
        methods: {
          MyMethod: {
            my_method_option: MyMessage.decode(Buffer.from('CJYBEJYBGgtTb21lIHN0cmluZyILU29tZSBzdHJpbmc=', 'base64')),
          },
        },
      },
    },
    enums: {
      MyEnum: {
        options: { my_enum_option: true },
        values: { FOO: { my_enum_value_option: 321 } },
      },
    },
  },
};

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
