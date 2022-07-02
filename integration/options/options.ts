/* eslint-disable */
import { FileDescriptorProto as FileDescriptorProto1 } from 'ts-proto-descriptors';
import { protoMetadata as protoMetadata1 } from './google/protobuf/descriptor';
import { protoMetadata as protoMetadata2 } from './something/something';
import * as _m0 from 'protobufjs/minimal';
import { Something } from './something/something.js';

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

function createBaseMyMessage(): MyMessage {
  return { foo: undefined, foo2: undefined, bar: undefined, quux: undefined };
}

export const MyMessage = {
  encode(message: MyMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): MyMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMyMessage();
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

function createBaseRequestType(): RequestType {
  return {};
}

export const RequestType = {
  encode(_: RequestType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestType {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestType();
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

function createBaseResponseType(): ResponseType {
  return {};
}

export const ResponseType = {
  encode(_: ResponseType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseType {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseType();
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
    return promise.then((data) => ResponseType.decode(new _m0.Reader(data)));
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
    name: 'options.proto',
    package: '',
    dependency: ['google/protobuf/descriptor.proto', 'something/something.proto'],
    publicDependency: [],
    weakDependency: [],
    messageType: [
      {
        name: 'MyMessage',
        field: [
          {
            name: 'foo',
            number: 1,
            label: 1,
            type: 5,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 1,
            jsonName: 'foo',
            options: {
              ctype: 0,
              packed: false,
              jstype: 0,
              lazy: false,
              deprecated: false,
              weak: false,
              uninterpretedOption: [],
            },
            proto3Optional: true,
          },
          {
            name: 'foo_2',
            number: 2,
            label: 1,
            type: 5,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 2,
            jsonName: 'foo2',
            options: {
              ctype: 0,
              packed: false,
              jstype: 0,
              lazy: false,
              deprecated: false,
              weak: false,
              uninterpretedOption: [],
            },
            proto3Optional: true,
          },
          {
            name: 'bar',
            number: 3,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 3,
            jsonName: 'bar',
            options: undefined,
            proto3Optional: true,
          },
          {
            name: 'quux',
            number: 4,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'quux',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [
          { name: 'qux', options: { uninterpretedOption: [] } },
          { name: '_foo', options: undefined },
          { name: '_foo_2', options: undefined },
          { name: '_bar', options: undefined },
        ],
        options: {
          messageSetWireFormat: false,
          noStandardDescriptorAccessor: false,
          deprecated: false,
          mapEntry: false,
          uninterpretedOption: [],
        },
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'RequestType',
        field: [],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'ResponseType',
        field: [],
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
    enumType: [
      {
        name: 'MyEnum',
        value: [
          { name: 'FOO', number: 0, options: { deprecated: false, uninterpretedOption: [] } },
          { name: 'BAR', number: 1, options: undefined },
        ],
        options: { allowAlias: false, deprecated: false, uninterpretedOption: [] },
        reservedRange: [],
        reservedName: [],
      },
    ],
    service: [
      {
        name: 'MyService',
        method: [
          {
            name: 'MyMethod',
            inputType: '.RequestType',
            outputType: '.ResponseType',
            options: { deprecated: false, idempotencyLevel: 0, uninterpretedOption: [] },
            clientStreaming: false,
            serverStreaming: false,
          },
        ],
        options: { deprecated: false, uninterpretedOption: [] },
      },
    ],
    extension: [
      {
        name: 'my_file_option',
        number: 50000,
        label: 1,
        type: 9,
        typeName: '',
        extendee: '.google.protobuf.FileOptions',
        defaultValue: '',
        oneofIndex: 0,
        jsonName: 'myFileOption',
        options: undefined,
        proto3Optional: true,
      },
      {
        name: 'my_message_option',
        number: 50001,
        label: 1,
        type: 5,
        typeName: '',
        extendee: '.google.protobuf.MessageOptions',
        defaultValue: '',
        oneofIndex: 0,
        jsonName: 'myMessageOption',
        options: undefined,
        proto3Optional: true,
      },
      {
        name: 'my_field_option',
        number: 50002,
        label: 1,
        type: 2,
        typeName: '',
        extendee: '.google.protobuf.FieldOptions',
        defaultValue: '',
        oneofIndex: 0,
        jsonName: 'myFieldOption',
        options: undefined,
        proto3Optional: true,
      },
      {
        name: 'my_oneof_option',
        number: 50003,
        label: 1,
        type: 3,
        typeName: '',
        extendee: '.google.protobuf.OneofOptions',
        defaultValue: '',
        oneofIndex: 0,
        jsonName: 'myOneofOption',
        options: undefined,
        proto3Optional: true,
      },
      {
        name: 'my_enum_option',
        number: 50004,
        label: 1,
        type: 8,
        typeName: '',
        extendee: '.google.protobuf.EnumOptions',
        defaultValue: '',
        oneofIndex: 0,
        jsonName: 'myEnumOption',
        options: undefined,
        proto3Optional: true,
      },
      {
        name: 'my_enum_value_option',
        number: 50005,
        label: 1,
        type: 13,
        typeName: '',
        extendee: '.google.protobuf.EnumValueOptions',
        defaultValue: '',
        oneofIndex: 0,
        jsonName: 'myEnumValueOption',
        options: undefined,
        proto3Optional: true,
      },
      {
        name: 'my_service_option',
        number: 50006,
        label: 1,
        type: 14,
        typeName: '.MyEnum',
        extendee: '.google.protobuf.ServiceOptions',
        defaultValue: '',
        oneofIndex: 0,
        jsonName: 'myServiceOption',
        options: undefined,
        proto3Optional: true,
      },
      {
        name: 'my_method_option',
        number: 50007,
        label: 1,
        type: 11,
        typeName: '.MyMessage',
        extendee: '.google.protobuf.MethodOptions',
        defaultValue: '',
        oneofIndex: 0,
        jsonName: 'myMethodOption',
        options: undefined,
        proto3Optional: true,
      },
    ],
    options: {
      javaPackage: '',
      javaOuterClassname: '',
      javaMultipleFiles: false,
      javaGenerateEqualsAndHash: false,
      javaStringCheckUtf8: false,
      optimizeFor: 1,
      goPackage: '',
      ccGenericServices: false,
      javaGenericServices: false,
      pyGenericServices: false,
      phpGenericServices: false,
      deprecated: false,
      ccEnableArenas: false,
      objcClassPrefix: '',
      csharpNamespace: '',
      swiftPrefix: '',
      phpClassPrefix: '',
      phpNamespace: '',
      phpMetadataNamespace: '',
      rubyPackage: '',
      uninterpretedOption: [],
    },
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
  dependencies: [protoMetadata1, protoMetadata2],
  options: {
    options: { my_file_option: 'Hello world!' },
    messages: {
      MyMessage: {
        options: { my_message_option: 1234 },
        fields: {
          foo: { my_field_option: 4.5 },
          foo_2: { something: Something.decode(Buffer.from('CgV3b3JsZBIDe9kC', 'base64')) },
        },
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
