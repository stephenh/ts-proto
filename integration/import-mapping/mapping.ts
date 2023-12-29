/* eslint-disable */
import { Duration } from "@google/protobuf/duration";
import { Empty } from "@google/protobuf/empty";
import { VeryVerySecret } from "@myorg/proto-npm-package";
import * as _m0 from "protobufjs/minimal";
import { Struct } from "wkt/google/protobuf/struct";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "import_mapping";

export interface WithEmtpy {
  empty: Empty | undefined;
}

export interface WithStruct {
  strut: { [key: string]: any } | undefined;
}

export interface WithTimestamp {
  timestamp: Date | undefined;
}

export interface WithAll {
  empty: Empty | undefined;
  strut: { [key: string]: any } | undefined;
  timestamp: Date | undefined;
  duration: Duration | undefined;
  veryVerySecret: VeryVerySecret | undefined;
}

function createBaseWithEmtpy(): WithEmtpy {
  return { empty: undefined };
}

export const WithEmtpy = {
  encode(message: WithEmtpy, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.empty !== undefined) {
      Empty.encode(message.empty, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithEmtpy {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithEmtpy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.empty = Empty.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WithEmtpy {
    return { empty: isSet(object.empty) ? Empty.fromJSON(object.empty) : undefined };
  },

  toJSON(message: WithEmtpy): unknown {
    const obj: any = {};
    if (message.empty !== undefined) {
      obj.empty = Empty.toJSON(message.empty);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithEmtpy>, I>>(base?: I): WithEmtpy {
    return WithEmtpy.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WithEmtpy>, I>>(object: I): WithEmtpy {
    const message = createBaseWithEmtpy();
    message.empty = (object.empty !== undefined && object.empty !== null) ? Empty.fromPartial(object.empty) : undefined;
    return message;
  },
};

function createBaseWithStruct(): WithStruct {
  return { strut: undefined };
}

export const WithStruct = {
  encode(message: WithStruct, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.strut !== undefined) {
      Struct.encode(Struct.wrap(message.strut), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithStruct {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithStruct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.strut = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WithStruct {
    return { strut: isObject(object.strut) ? object.strut : undefined };
  },

  toJSON(message: WithStruct): unknown {
    const obj: any = {};
    if (message.strut !== undefined) {
      obj.strut = message.strut;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithStruct>, I>>(base?: I): WithStruct {
    return WithStruct.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WithStruct>, I>>(object: I): WithStruct {
    const message = createBaseWithStruct();
    message.strut = object.strut ?? undefined;
    return message;
  },
};

function createBaseWithTimestamp(): WithTimestamp {
  return { timestamp: undefined };
}

export const WithTimestamp = {
  encode(message: WithTimestamp, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithTimestamp {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithTimestamp();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WithTimestamp {
    return { timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined };
  },

  toJSON(message: WithTimestamp): unknown {
    const obj: any = {};
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithTimestamp>, I>>(base?: I): WithTimestamp {
    return WithTimestamp.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WithTimestamp>, I>>(object: I): WithTimestamp {
    const message = createBaseWithTimestamp();
    message.timestamp = object.timestamp ?? undefined;
    return message;
  },
};

function createBaseWithAll(): WithAll {
  return { empty: undefined, strut: undefined, timestamp: undefined, duration: undefined, veryVerySecret: undefined };
}

export const WithAll = {
  encode(message: WithAll, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.empty !== undefined) {
      Empty.encode(message.empty, writer.uint32(10).fork()).ldelim();
    }
    if (message.strut !== undefined) {
      Struct.encode(Struct.wrap(message.strut), writer.uint32(18).fork()).ldelim();
    }
    if (message.timestamp !== undefined) {
      Timestamp.encode(toTimestamp(message.timestamp), writer.uint32(26).fork()).ldelim();
    }
    if (message.duration !== undefined) {
      Duration.encode(message.duration, writer.uint32(34).fork()).ldelim();
    }
    if (message.veryVerySecret !== undefined) {
      VeryVerySecret.encode(message.veryVerySecret, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithAll {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithAll();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.empty = Empty.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.strut = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.timestamp = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.duration = Duration.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.veryVerySecret = VeryVerySecret.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WithAll {
    return {
      empty: isSet(object.empty) ? Empty.fromJSON(object.empty) : undefined,
      strut: isObject(object.strut) ? object.strut : undefined,
      timestamp: isSet(object.timestamp) ? fromJsonTimestamp(object.timestamp) : undefined,
      duration: isSet(object.duration) ? Duration.fromJSON(object.duration) : undefined,
      veryVerySecret: isSet(object.veryVerySecret) ? VeryVerySecret.fromJSON(object.veryVerySecret) : undefined,
    };
  },

  toJSON(message: WithAll): unknown {
    const obj: any = {};
    if (message.empty !== undefined) {
      obj.empty = Empty.toJSON(message.empty);
    }
    if (message.strut !== undefined) {
      obj.strut = message.strut;
    }
    if (message.timestamp !== undefined) {
      obj.timestamp = message.timestamp.toISOString();
    }
    if (message.duration !== undefined) {
      obj.duration = Duration.toJSON(message.duration);
    }
    if (message.veryVerySecret !== undefined) {
      obj.veryVerySecret = VeryVerySecret.toJSON(message.veryVerySecret);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithAll>, I>>(base?: I): WithAll {
    return WithAll.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WithAll>, I>>(object: I): WithAll {
    const message = createBaseWithAll();
    message.empty = (object.empty !== undefined && object.empty !== null) ? Empty.fromPartial(object.empty) : undefined;
    message.strut = object.strut ?? undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.duration = (object.duration !== undefined && object.duration !== null)
      ? Duration.fromPartial(object.duration)
      : undefined;
    message.veryVerySecret = (object.veryVerySecret !== undefined && object.veryVerySecret !== null)
      ? VeryVerySecret.fromPartial(object.veryVerySecret)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
