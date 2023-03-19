/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { BytesValue } from "./google/protobuf/wrappers";

export const protobufPackage = "";

export interface Point {
  data: Buffer;
  dataWrapped: Buffer | undefined;
}

function createBasePoint(): Point {
  return { data: Buffer.alloc(0), dataWrapped: undefined };
}

export const Point = {
  encode(message: Point, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.data.length !== 0) {
      writer.uint32(10).bytes(message.data);
    }
    if (message.dataWrapped !== undefined) {
      BytesValue.encode({ value: message.dataWrapped! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Point {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePoint();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag != 10) {
            break;
          }

          message.data = reader.bytes() as Buffer;
          continue;
        case 2:
          if (tag != 18) {
            break;
          }

          message.dataWrapped = BytesValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) == 4 || tag == 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Point {
    return {
      data: isSet(object.data) ? Buffer.from(bytesFromBase64(object.data)) : Buffer.alloc(0),
      dataWrapped: isSet(object.dataWrapped) ? new Buffer(object.dataWrapped) : undefined,
    };
  },

  toJSON(message: Point): unknown {
    const obj: any = {};
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : Buffer.alloc(0)));
    message.dataWrapped !== undefined && (obj.dataWrapped = message.dataWrapped);
    return obj;
  },

  create<I extends Exact<DeepPartial<Point>, I>>(base?: I): Point {
    return Point.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Point>, I>>(object: I): Point {
    const message = createBasePoint();
    message.data = object.data ?? Buffer.alloc(0);
    message.dataWrapped = object.dataWrapped ?? undefined;
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var tsProtoGlobalThis: any = (() => {
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

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
