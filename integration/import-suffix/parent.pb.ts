/* eslint-disable */
import { ChildEnum, Child, childEnumFromJSON, childEnumToJSON } from './child.pb.js';
import { Timestamp } from './google/protobuf/timestamp.pb.js';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'file_suffix';

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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.child = Child.decode(reader, reader.uint32());
          break;
        case 2:
          message.childEnum = reader.int32() as any;
          break;
        case 3:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
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
    message.child !== undefined && (obj.child = message.child ? Child.toJSON(message.child) : undefined);
    message.childEnum !== undefined && (obj.childEnum = childEnumToJSON(message.childEnum));
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Parent>, I>>(object: I): Parent {
    const message = createBaseParent();
    message.child = object.child !== undefined && object.child !== null ? Child.fromPartial(object.child) : undefined;
    message.childEnum = object.childEnum ?? 0;
    message.createdAt = object.createdAt ?? undefined;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
