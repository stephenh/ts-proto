/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { NullValue, nullValueToNumber, nullValueFromJSON, nullValueToJSON } from './google/protobuf/struct';

export const protobufPackage = 'simple';

export enum StateEnum {
  UNKNOWN = 'UNKNOWN',
  ON = 'ON',
  OFF = 'OFF',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function stateEnumFromJSON(object: any): StateEnum {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return StateEnum.UNKNOWN;
    case 2:
    case 'ON':
      return StateEnum.ON;
    case 3:
    case 'OFF':
      return StateEnum.OFF;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return StateEnum.UNRECOGNIZED;
  }
}

export function stateEnumToJSON(object: StateEnum): string {
  switch (object) {
    case StateEnum.UNKNOWN:
      return 'UNKNOWN';
    case StateEnum.ON:
      return 'ON';
    case StateEnum.OFF:
      return 'OFF';
    default:
      return 'UNKNOWN';
  }
}

export function stateEnumToNumber(object: StateEnum): number {
  switch (object) {
    case StateEnum.UNKNOWN:
      return 0;
    case StateEnum.ON:
      return 2;
    case StateEnum.OFF:
      return 3;
    default:
      return 0;
  }
}

export interface Simple {
  name: string;
  state: StateEnum;
  states: StateEnum[];
  nullValue: NullValue;
}

const createBaseSimple = (): Simple => ({
  name: '',
  state: StateEnum.UNKNOWN,
  states: StateEnum.UNKNOWN,
  nullValue: NullValue.NULL_VALUE,
});

export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.state !== StateEnum.UNKNOWN) {
      writer.uint32(32).int32(stateEnumToNumber(message.state));
    }
    writer.uint32(42).fork();
    for (const v of message.states) {
      writer.int32(stateEnumToNumber(v));
    }
    writer.ldelim();
    if (message.nullValue !== NullValue.NULL_VALUE) {
      writer.uint32(48).int32(nullValueToNumber(message.nullValue));
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple();
    message.states = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 4:
          message.state = stateEnumFromJSON(reader.int32());
          break;
        case 5:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.states.push(stateEnumFromJSON(reader.int32()));
            }
          } else {
            message.states.push(stateEnumFromJSON(reader.int32()));
          }
          break;
        case 6:
          message.nullValue = nullValueFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Simple {
    const message = createBaseSimple();
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    message.state =
      object.state !== undefined && object.state !== null ? stateEnumFromJSON(object.state) : StateEnum.UNKNOWN;
    message.states = (object.states ?? []).map((e: any) => stateEnumFromJSON(e));
    message.nullValue =
      object.nullValue !== undefined && object.nullValue !== null
        ? nullValueFromJSON(object.nullValue)
        : NullValue.NULL_VALUE;
    return message;
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.state !== undefined && (obj.state = stateEnumToJSON(message.state));
    if (message.states) {
      obj.states = message.states.map((e) => stateEnumToJSON(e));
    } else {
      obj.states = [];
    }
    message.nullValue !== undefined && (obj.nullValue = nullValueToJSON(message.nullValue));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? '';
    message.state = object.state ?? StateEnum.UNKNOWN;
    message.states = object.states?.map((e) => e) || [];
    message.nullValue = object.nullValue ?? NullValue.NULL_VALUE;
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
