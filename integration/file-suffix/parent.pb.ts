/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { ChildEnum, Child, childEnumFromJSON, childEnumToJSON } from './child.pb';
import { Timestamp } from './google/protobuf/timestamp.pb';

export const protobufPackage = 'file_suffix';

export interface Parent {
  child: Child | undefined;
  childEnum: ChildEnum;
  createdAt: Date | undefined;
}

const createBaseParent = (): Parent => ({ childEnum: 0 });

export const Parent = {
  encode(message: Parent, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): Parent {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    const message = createBaseParent();
    message.child = object.child !== undefined && object.child !== null ? Child.fromJSON(object.child) : undefined;
    message.childEnum =
      object.childEnum !== undefined && object.childEnum !== null ? childEnumFromJSON(object.childEnum) : 0;
    message.createdAt =
      object.createdAt !== undefined && object.createdAt !== null ? fromJsonTimestamp(object.createdAt) : undefined;
    return message;
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
