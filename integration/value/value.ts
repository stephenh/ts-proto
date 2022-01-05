/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Value, ListValue, Struct } from './google/protobuf/struct';
import { StringValue } from './google/protobuf/wrappers';

export const protobufPackage = '';

export interface ValueMessage {
  value: any | undefined;
  anyList: Array<any> | undefined;
  repeatedAny: any[];
  repeatedStrings: string[];
  structValue: { [key: string]: any } | undefined;
}

function createBaseValueMessage(): ValueMessage {
  return { value: undefined, anyList: undefined, repeatedAny: [], repeatedStrings: [], structValue: undefined };
}

export const ValueMessage = {
  encode(message: ValueMessage, writer: Writer = Writer.create()): Writer {
    if (message.value !== undefined) {
      Value.encode(Value.wrap(message.value), writer.uint32(10).fork()).ldelim();
    }
    if (message.anyList !== undefined) {
      ListValue.encode(ListValue.wrap(message.anyList), writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.repeatedAny) {
      Value.encode(Value.wrap(v!), writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.repeatedStrings) {
      StringValue.encode({ value: v!! }, writer.uint32(34).fork()).ldelim();
    }
    if (message.structValue !== undefined) {
      Struct.encode(Struct.wrap(message.structValue), writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ValueMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValueMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = Value.unwrap(Value.decode(reader, reader.uint32()));
          break;
        case 2:
          message.anyList = ListValue.unwrap(ListValue.decode(reader, reader.uint32()));
          break;
        case 3:
          message.repeatedAny.push(Value.unwrap(Value.decode(reader, reader.uint32())));
          break;
        case 4:
          message.repeatedStrings.push(StringValue.decode(reader, reader.uint32()).value);
          break;
        case 5:
          message.structValue = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValueMessage {
    const message = createBaseValueMessage();
    message.value = isSet(object?.value) ? object.value : undefined;
    message.anyList = Array.isArray(object.anyList) ? [...object.anyList] : undefined;
    message.repeatedAny = Array.isArray(object?.repeatedAny) ? [...object.repeatedAny] : [];
    message.repeatedStrings = Array.isArray(object?.repeatedStrings)
      ? object.repeatedStrings.map((e: any) => String(e))
      : [];
    message.structValue = isObject(object.structValue) ? object.structValue : undefined;
    return message;
  },

  toJSON(message: ValueMessage): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    message.anyList !== undefined && (obj.anyList = message.anyList);
    if (message.repeatedAny) {
      obj.repeatedAny = message.repeatedAny.map((e) => e);
    } else {
      obj.repeatedAny = [];
    }
    if (message.repeatedStrings) {
      obj.repeatedStrings = message.repeatedStrings.map((e) => e);
    } else {
      obj.repeatedStrings = [];
    }
    message.structValue !== undefined && (obj.structValue = message.structValue);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ValueMessage>, I>>(object: I): ValueMessage {
    const message = createBaseValueMessage();
    message.value = object.value ?? undefined;
    message.anyList = object.anyList ?? undefined;
    message.repeatedAny = object.repeatedAny?.map((e) => e) || [];
    message.repeatedStrings = object.repeatedStrings?.map((e) => e) || [];
    message.structValue = object.structValue ?? undefined;
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

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
