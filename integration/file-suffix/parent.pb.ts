/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Child, ChildEnum, childEnumFromJSON, childEnumToJSON } from "./child.pb";
import { Timestamp } from "./google/protobuf/timestamp.pb";

export const protobufPackage = "file_suffix";

export interface Parent {
  child: Child | undefined;
  childEnum: ChildEnum;
  createdAt: Date | undefined;
}

function createBaseParent(): Parent {
  return { child: undefined, childEnum: 0, createdAt: undefined };
}

export const Parent = {
  encode(message: Parent, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.child !== undefined) {
      Child.encode(message.child, writer.uint32(10).fork()).ldelim();
    }
    if (message.childEnum !== 0) {
      writer.uint32(16).int32(message.childEnum);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Parent {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.child = Child.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.childEnum = reader.int32() as any;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Parent {
    return {
      child: isSet(object.child) ? Child.fromJSON(object.child) : undefined,
      childEnum: isSet(object.childEnum) ? childEnumFromJSON(object.childEnum) : 0,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
    };
  },

  toJSON(message: Parent): unknown {
    const obj: any = {};
    if (message.child !== undefined) {
      obj.child = Child.toJSON(message.child);
    }
    if (message.childEnum !== 0) {
      obj.childEnum = childEnumToJSON(message.childEnum);
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Parent>, I>>(base?: I): Parent {
    return Parent.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Parent>, I>>(object: I): Parent {
    const message = createBaseParent();
    message.child = (object.child !== undefined && object.child !== null) ? Child.fromPartial(object.child) : undefined;
    message.childEnum = object.childEnum ?? 0;
    message.createdAt = object.createdAt ?? undefined;
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
