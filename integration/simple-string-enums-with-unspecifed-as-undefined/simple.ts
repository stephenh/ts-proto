/* eslint-disable */
import { NullValue, nullValueToNumber, nullValueFromJSON, nullValueToJSON } from './google/protobuf/struct';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'simple';

export enum StateEnum {
  ON = 'ON',
  OFF = 'OFF',
  UNRECOGNIZED = 'UNRECOGNIZED',
}

export function stateEnumFromJSON(object: any): StateEnum | undefined {
  switch (object) {
    case 0:
    case undefined:
      return undefined;
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

export function stateEnumToJSON(object: StateEnum | undefined): string | undefined {
  switch (object) {
    case undefined:
      return undefined;
    case StateEnum.ON:
      return 'ON';
    case StateEnum.OFF:
      return 'OFF';
    case StateEnum.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
  }
}

export function stateEnumToNumber(object: StateEnum | undefined): number {
  switch (object) {
    case undefined:
      return 0;
    case StateEnum.ON:
      return 2;
    case StateEnum.OFF:
      return 3;
    case StateEnum.UNRECOGNIZED:
    default:
      return -1;
  }
}

export interface Simple {
  name: string;
  state: StateEnum | undefined;
  states: (StateEnum | undefined)[];
  nullValue: NullValue | undefined;
  stateMap: { [key: string]: StateEnum | undefined };
}

export interface Simple_StateMapEntry {
  key: string;
  value: StateEnum | undefined;
}

function createBaseSimple(): Simple {
  return { name: '', state: undefined, states: [], nullValue: undefined, stateMap: {} };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.state !== undefined) {
      writer.uint32(32).int32(stateEnumToNumber(message.state));
    }
    writer.uint32(42).fork();
    for (const v of message.states) {
      writer.int32(stateEnumToNumber(v));
    }
    writer.ldelim();
    if (message.nullValue !== undefined) {
      writer.uint32(48).int32(nullValueToNumber(message.nullValue));
    }
    Object.entries(message.stateMap).forEach(([key, value]) => {
      Simple_StateMapEntry.encode({ key: key as any, value }, writer.uint32(58).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple();
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
        case 7:
          const entry7 = Simple_StateMapEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.stateMap[entry7.key] = entry7.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Simple {
    return {
      name: isSet(object.name) ? String(object.name) : '',
      state: isSet(object.state) ? stateEnumFromJSON(object.state) : undefined,
      states: Array.isArray(object?.states) ? object.states.map((e: any) => stateEnumFromJSON(e)) : [],
      nullValue: isSet(object.nullValue) ? nullValueFromJSON(object.nullValue) : undefined,
      stateMap: isObject(object.stateMap)
        ? Object.entries(object.stateMap).reduce<{ [key: string]: StateEnum | undefined }>((acc, [key, value]) => {
            acc[key] = stateEnumFromJSON(value);
            return acc;
          }, {})
        : {},
    };
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
    obj.stateMap = {};
    if (message.stateMap) {
      Object.entries(message.stateMap).forEach(([k, v]) => {
        obj.stateMap[k] = stateEnumToJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? '';
    message.state = object.state ?? undefined;
    message.states = object.states?.map((e) => e) || [];
    message.nullValue = object.nullValue ?? undefined;
    message.stateMap = Object.entries(object.stateMap ?? {}).reduce<{ [key: string]: StateEnum | undefined }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value as StateEnum | undefined;
        }
        return acc;
      },
      {}
    );
    return message;
  },
};

function createBaseSimple_StateMapEntry(): Simple_StateMapEntry {
  return { key: '', value: undefined };
}

export const Simple_StateMapEntry = {
  encode(message: Simple_StateMapEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      writer.uint32(16).int32(stateEnumToNumber(message.value));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple_StateMapEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple_StateMapEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = stateEnumFromJSON(reader.int32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Simple_StateMapEntry {
    return {
      key: isSet(object.key) ? String(object.key) : '',
      value: isSet(object.value) ? stateEnumFromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Simple_StateMapEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = stateEnumToJSON(message.value));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Simple_StateMapEntry>, I>>(object: I): Simple_StateMapEntry {
    const message = createBaseSimple_StateMapEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? undefined;
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

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
