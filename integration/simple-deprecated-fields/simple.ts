/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'simple';

export interface Simple {
  /**
   * Name field
   *
   * @deprecated
   */
  name: string;
  /**
   * Age field
   *
   * @deprecated
   */
  age: number;
  /**
   * This comment will also attach;
   *
   * @deprecated
   */
  child: Child | undefined;
  /** @deprecated */
  testField: string;
  testNotDeprecated: string;
}

export interface Child {
  name: string;
}

const baseSimple: object = { name: '', age: 0, testField: '', testNotDeprecated: '' };

export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    if (message.child !== undefined) {
      Child.encode(message.child, writer.uint32(26).fork()).ldelim();
    }
    if (message.testField !== '') {
      writer.uint32(34).string(message.testField);
    }
    if (message.testNotDeprecated !== '') {
      writer.uint32(42).string(message.testNotDeprecated);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimple } as Simple;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.age = reader.int32();
          break;
        case 3:
          message.child = Child.decode(reader, reader.uint32());
          break;
        case 4:
          message.testField = reader.string();
          break;
        case 5:
          message.testNotDeprecated = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Simple {
    const message = { ...baseSimple } as Simple;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = Number(object.age);
    } else {
      message.age = 0;
    }
    if (object.child !== undefined && object.child !== null) {
      message.child = Child.fromJSON(object.child);
    } else {
      message.child = undefined;
    }
    if (object.testField !== undefined && object.testField !== null) {
      message.testField = String(object.testField);
    } else {
      message.testField = '';
    }
    if (object.testNotDeprecated !== undefined && object.testNotDeprecated !== null) {
      message.testNotDeprecated = String(object.testNotDeprecated);
    } else {
      message.testNotDeprecated = '';
    }
    return message;
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = message.age);
    message.child !== undefined && (obj.child = message.child ? Child.toJSON(message.child) : undefined);
    message.testField !== undefined && (obj.testField = message.testField);
    message.testNotDeprecated !== undefined && (obj.testNotDeprecated = message.testNotDeprecated);
    return obj;
  },

  fromPartial(object: DeepPartial<Simple>): Simple {
    const message = { ...baseSimple } as Simple;
    {
      message.name = object.name ?? '';
    }
    {
      message.age = object.age ?? 0;
    }
    if (object.child !== undefined && object.child !== null) {
      message.child = Child.fromPartial(object.child);
    } else {
      message.child = undefined;
    }
    {
      message.testField = object.testField ?? '';
    }
    {
      message.testNotDeprecated = object.testNotDeprecated ?? '';
    }
    return message;
  },
};

const baseChild: object = { name: '' };

export const Child = {
  encode(message: Child, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Child {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChild } as Child;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Child {
    const message = { ...baseChild } as Child;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    return message;
  },

  toJSON(message: Child): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<Child>): Child {
    const message = { ...baseChild } as Child;
    {
      message.name = object.name ?? '';
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
