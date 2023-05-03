/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export interface A {
  a: string;
}

function createBaseA(): A {
  return { a: "" };
}

export const A = {
  encode(message: A, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.a !== "") {
      writer.uint32(10).string(message.a);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): A {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseA();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.a = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): A {
    return { a: isSet(object.a) ? String(object.a) : "" };
  },

  toJSON(message: A): unknown {
    const obj: any = {};
    message.a !== undefined && (obj.a = message.a);
    return obj;
  },

  create<I extends Exact<DeepPartial<A>, I>>(base?: I): A {
    return A.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<A>, I>>(object: I): A {
    const message = createBaseA();
    message.a = object.a ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
