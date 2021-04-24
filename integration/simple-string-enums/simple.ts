/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

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
}

const baseSimple: object = { name: '', state: StateEnum.UNKNOWN, states: StateEnum.UNKNOWN };

export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.state !== StateEnum.UNKNOWN) {
      writer.uint32(32).int32(stateEnumToNumber(message.state));
    }
    writer.uint32(40).fork();
    for (const v of message.states) {
      writer.int32(stateEnumToNumber(v));
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimple } as Simple;
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
          const end2 = reader.uint32() + reader.pos;
          while (reader.pos < end2) {
            message.states.push(stateEnumFromJSON(reader.int32()));
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
    const message = { ...baseSimple } as Simple;
    message.states = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = stateEnumFromJSON(object.state);
    } else {
      message.state = StateEnum.UNKNOWN;
    }
    if (object.states !== undefined && object.states !== null) {
      for (const e of object.states) {
        message.states.push(stateEnumFromJSON(e));
      }
    }
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
    return obj;
  },

  fromPartial(object: DeepPartial<Simple>): Simple {
    const message = { ...baseSimple } as Simple;
    message.states = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = '';
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = StateEnum.UNKNOWN;
    }
    if (object.states !== undefined && object.states !== null) {
      for (const e of object.states) {
        message.states.push(e);
      }
    }
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
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
