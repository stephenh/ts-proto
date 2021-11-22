/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Value, ListValue } from './google/protobuf/struct';

export const protobufPackage = '';

export interface ValueMessage {
  value: any | undefined;
  anyList: Array<any> | undefined;
  repeatedAny: any[];
}

const baseValueMessage: object = {};

export const ValueMessage = {
  encode(message: ValueMessage, writer: Writer = Writer.create()): Writer {
    if (message.value !== undefined) {
      Value.encode(wrapAnyValue(message.value), writer.uint32(10).fork()).ldelim();
    }
    if (message.anyList !== undefined) {
      ListValue.encode({ values: message.anyList }, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.repeatedAny) {
      Value.encode(wrapAnyValue(v!), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ValueMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseValueMessage } as ValueMessage;
    message.repeatedAny = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = unwrapAnyValue(Value.decode(reader, reader.uint32()));
          break;
        case 2:
          message.anyList = ListValue.decode(reader, reader.uint32()).values;
          break;
        case 3:
          message.repeatedAny.push(unwrapAnyValue(Value.decode(reader, reader.uint32())));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ValueMessage {
    const message = { ...baseValueMessage } as ValueMessage;
    message.value = object.value;
    message.anyList = Array.isArray(object?.anyList) ? [...object.anyList] : undefined;
    message.repeatedAny = Array.isArray(object?.repeatedAny) ? [...object.repeatedAny] : [];
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
    return obj;
  },

  fromPartial(object: DeepPartial<ValueMessage>): ValueMessage {
    const message = { ...baseValueMessage } as ValueMessage;
    message.value = object.value ?? undefined;
    message.anyList = object.anyList ?? undefined;
    message.repeatedAny = (object.repeatedAny ?? []).map((e) => e);
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

function wrapAnyValue(value: any): Value {
  if (value === null) {
    return { nullValue: 0 } as Value;
  } else if (typeof value === 'boolean') {
    return { boolValue: value } as Value;
  } else if (typeof value === 'number') {
    return { numberValue: value } as Value;
  } else if (typeof value === 'string') {
    return { stringValue: value } as Value;
  } else if (Array.isArray(value)) {
    return { listValue: value } as Value;
  } else if (typeof value === 'object') {
    return { structValue: value } as Value;
  } else if (typeof value === 'undefined') {
    return {} as Value;
  } else {
    throw new Error('Unsupported any value type: ' + typeof value);
  }
}

function unwrapAnyValue(value: Value): string | number | boolean | Object | null | Array<any> | undefined {
  if (value.stringValue !== undefined) {
    return value.stringValue;
  } else if (value.numberValue !== undefined) {
    return value.numberValue;
  } else if (value.boolValue !== undefined) {
    return value.boolValue;
  } else if (value.structValue !== undefined) {
    return value.structValue;
  } else if (value.listValue !== undefined) {
    return value.listValue;
  } else if (value.nullValue !== undefined) {
    return null;
  }
}
