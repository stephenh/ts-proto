/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "simple";

export interface ImportedThing {
  created_at: Date | undefined;
}

function createBaseImportedThing(): ImportedThing {
  return { created_at: undefined };
}

export const ImportedThing = {
  encode(message: ImportedThing, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.created_at !== undefined) {
      Timestamp.encode(toTimestamp(message.created_at), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ImportedThing {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseImportedThing();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.created_at = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ImportedThing {
    return { created_at: isSet(object.created_at) ? fromJsonTimestamp(object.created_at) : undefined };
  },

  toJSON(message: ImportedThing): unknown {
    const obj: any = {};
    if (message.created_at !== undefined) {
      obj.created_at = message.created_at.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ImportedThing>, I>>(base?: I): ImportedThing {
    return ImportedThing.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ImportedThing>, I>>(object: I): ImportedThing {
    const message = createBaseImportedThing();
    message.created_at = object.created_at ?? undefined;
    return message;
  },
};

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new tsProtoGlobalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof tsProtoGlobalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new tsProtoGlobalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
