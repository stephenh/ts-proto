// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// source: suffix-type.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { GRPCPTimestampGRPCS } from "./google/protobuf/timestamp";

export const protobufPackage = "";

export interface GRPCPSuffixTypeGRPCS {
  createdAt: Date | undefined;
}

function createBaseGRPCPSuffixTypeGRPCS(): GRPCPSuffixTypeGRPCS {
  return { createdAt: undefined };
}

export const GRPCPSuffixTypeGRPCS: MessageFns<GRPCPSuffixTypeGRPCS> = {
  encode(message: GRPCPSuffixTypeGRPCS, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.createdAt !== undefined) {
      GRPCPTimestampGRPCS.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GRPCPSuffixTypeGRPCS {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGRPCPSuffixTypeGRPCS();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 9: {
          if (tag !== 74) {
            break;
          }

          message.createdAt = fromTimestamp(GRPCPTimestampGRPCS.decode(reader, reader.uint32()));
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GRPCPSuffixTypeGRPCS {
    return { createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined };
  },

  toJSON(message: GRPCPSuffixTypeGRPCS): unknown {
    const obj: any = {};
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GRPCPSuffixTypeGRPCS>, I>>(base?: I): GRPCPSuffixTypeGRPCS {
    return GRPCPSuffixTypeGRPCS.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GRPCPSuffixTypeGRPCS>, I>>(object: I): GRPCPSuffixTypeGRPCS {
    const message = createBaseGRPCPSuffixTypeGRPCS();
    message.createdAt = object.createdAt ?? undefined;
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

function toTimestamp(date: Date): GRPCPTimestampGRPCS {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: GRPCPTimestampGRPCS): Date {
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
    return fromTimestamp(GRPCPTimestampGRPCS.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
