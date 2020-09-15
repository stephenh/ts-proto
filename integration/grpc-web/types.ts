import * as Long from 'long';
import { Writer, Reader, util, configure } from 'protobufjs/minimal';


export interface Timestamp {
  /**
   *  Represents seconds of UTC time since Unix epoch
   *  1970-01-01T00:00:00Z. Must be from from 0001-01-01T00:00:00Z to
   *  9999-12-31T23:59:59Z inclusive.
   */
  seconds: number;
  /**
   *  Non-negative fractions of a second at nanosecond resolution. Negative
   *  second values with fractions must still have non-negative nanos values
   *  that count forward in time. Must be from 0 to 999,999,999
   *  inclusive.
   */
  nanos: number;
}

export interface Duration {
  nanos: number;
}

/**
 *  Empty is only used as a message for rpc calls that
 *  return no data.
 */
export interface Empty {
}

/**
 *  An optional string value used for RPCs that update a record.
 *  If the Optional is undefined, the updating code will not change
 *  the field.
 */
export interface OptString {
  /**
   * should be private, but conflicts with field tags
   */
  val: string;
}

export interface OptInt64 {
  val: number;
}

export interface OptBool {
  val: boolean;
}

export interface IPNet {
  ip: Uint8Array;
  mask: Uint8Array;
}

export interface ID {
  id: string;
}

const baseTimestamp: object = {
  seconds: 0,
  nanos: 0,
};

const baseDuration: object = {
  nanos: 0,
};

const baseEmpty: object = {
};

const baseOptString: object = {
  val: "",
};

const baseOptInt64: object = {
  val: 0,
};

const baseOptBool: object = {
  val: false,
};

const baseIPNet: object = {
};

const baseID: object = {
  id: "",
};

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const Timestamp = {
  encode(message: Timestamp, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.seconds);
    writer.uint32(16).int64(message.nanos);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Timestamp {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseTimestamp } as Timestamp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.seconds = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.nanos = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Timestamp {
    const message = { ...baseTimestamp } as Timestamp;
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = Number(object.seconds);
    } else {
      message.seconds = 0;
    }
    if (object.nanos !== undefined && object.nanos !== null) {
      message.nanos = Number(object.nanos);
    } else {
      message.nanos = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Timestamp>): Timestamp {
    const message = { ...baseTimestamp } as Timestamp;
    if (object.seconds !== undefined && object.seconds !== null) {
      message.seconds = object.seconds;
    } else {
      message.seconds = 0;
    }
    if (object.nanos !== undefined && object.nanos !== null) {
      message.nanos = object.nanos;
    } else {
      message.nanos = 0;
    }
    return message;
  },
  toJSON(message: Timestamp): unknown {
    const obj: any = {};
    message.seconds !== undefined && (obj.seconds = message.seconds);
    message.nanos !== undefined && (obj.nanos = message.nanos);
    return obj;
  },
};

export const Duration = {
  encode(message: Duration, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.nanos);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Duration {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDuration } as Duration;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.nanos = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Duration {
    const message = { ...baseDuration } as Duration;
    if (object.nanos !== undefined && object.nanos !== null) {
      message.nanos = Number(object.nanos);
    } else {
      message.nanos = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Duration>): Duration {
    const message = { ...baseDuration } as Duration;
    if (object.nanos !== undefined && object.nanos !== null) {
      message.nanos = object.nanos;
    } else {
      message.nanos = 0;
    }
    return message;
  },
  toJSON(message: Duration): unknown {
    const obj: any = {};
    message.nanos !== undefined && (obj.nanos = message.nanos);
    return obj;
  },
};

export const Empty = {
  encode(_: Empty, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Empty {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEmpty } as Empty;
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
  fromJSON(_: any): Empty {
    const message = { ...baseEmpty } as Empty;
    return message;
  },
  fromPartial(_: DeepPartial<Empty>): Empty {
    const message = { ...baseEmpty } as Empty;
    return message;
  },
  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },
};

export const OptString = {
  encode(message: OptString, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.val);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): OptString {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOptString } as OptString;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.val = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): OptString {
    const message = { ...baseOptString } as OptString;
    if (object.val !== undefined && object.val !== null) {
      message.val = String(object.val);
    } else {
      message.val = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<OptString>): OptString {
    const message = { ...baseOptString } as OptString;
    if (object.val !== undefined && object.val !== null) {
      message.val = object.val;
    } else {
      message.val = "";
    }
    return message;
  },
  toJSON(message: OptString): unknown {
    const obj: any = {};
    message.val !== undefined && (obj.val = message.val);
    return obj;
  },
};

export const OptInt64 = {
  encode(message: OptInt64, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int64(message.val);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): OptInt64 {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOptInt64 } as OptInt64;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.val = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): OptInt64 {
    const message = { ...baseOptInt64 } as OptInt64;
    if (object.val !== undefined && object.val !== null) {
      message.val = Number(object.val);
    } else {
      message.val = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<OptInt64>): OptInt64 {
    const message = { ...baseOptInt64 } as OptInt64;
    if (object.val !== undefined && object.val !== null) {
      message.val = object.val;
    } else {
      message.val = 0;
    }
    return message;
  },
  toJSON(message: OptInt64): unknown {
    const obj: any = {};
    message.val !== undefined && (obj.val = message.val);
    return obj;
  },
};

export const OptBool = {
  encode(message: OptBool, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).bool(message.val);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): OptBool {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOptBool } as OptBool;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.val = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): OptBool {
    const message = { ...baseOptBool } as OptBool;
    if (object.val !== undefined && object.val !== null) {
      message.val = Boolean(object.val);
    } else {
      message.val = false;
    }
    return message;
  },
  fromPartial(object: DeepPartial<OptBool>): OptBool {
    const message = { ...baseOptBool } as OptBool;
    if (object.val !== undefined && object.val !== null) {
      message.val = object.val;
    } else {
      message.val = false;
    }
    return message;
  },
  toJSON(message: OptBool): unknown {
    const obj: any = {};
    message.val !== undefined && (obj.val = message.val);
    return obj;
  },
};

export const IPNet = {
  encode(message: IPNet, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.ip);
    writer.uint32(18).bytes(message.mask);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): IPNet {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIPNet } as IPNet;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ip = reader.bytes();
          break;
        case 2:
          message.mask = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): IPNet {
    const message = { ...baseIPNet } as IPNet;
    if (object.ip !== undefined && object.ip !== null) {
      message.ip = bytesFromBase64(object.ip);
    }
    if (object.mask !== undefined && object.mask !== null) {
      message.mask = bytesFromBase64(object.mask);
    }
    return message;
  },
  fromPartial(object: DeepPartial<IPNet>): IPNet {
    const message = { ...baseIPNet } as IPNet;
    if (object.ip !== undefined && object.ip !== null) {
      message.ip = object.ip;
    } else {
      message.ip = new Uint8Array();
    }
    if (object.mask !== undefined && object.mask !== null) {
      message.mask = object.mask;
    } else {
      message.mask = new Uint8Array();
    }
    return message;
  },
  toJSON(message: IPNet): unknown {
    const obj: any = {};
    message.ip !== undefined && (obj.ip = base64FromBytes(message.ip !== undefined ? message.ip : new Uint8Array()));
    message.mask !== undefined && (obj.mask = base64FromBytes(message.mask !== undefined ? message.mask : new Uint8Array()));
    return obj;
  },
};

export const ID = {
  encode(message: ID, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): ID {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseID } as ID;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): ID {
    const message = { ...baseID } as ID;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<ID>): ID {
    const message = { ...baseID } as ID;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
  toJSON(message: ID): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
};

if (util.Long !== Long as any) {
  util.Long = Long as any;
  configure();
}

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;