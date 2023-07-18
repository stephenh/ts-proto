/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Bar } from "./bar";

export interface Foo {
  name: string;
  bar: Bar | undefined;
}

function createBaseFoo(): Foo {
  return { name: "", bar: undefined };
}

export const Foo = {
  encode(message: Foo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.bar !== undefined) {
      Bar.encode(message.bar, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Foo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFoo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.bar = Bar.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  toJSON(message: Foo): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.bar !== undefined) {
      obj.bar = Bar.toJSON(message.bar);
    }
    return obj;
  },

  fromJSON(object: any): Foo {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      bar: isSet(object.bar) ? Bar.fromJSON(object.bar) : undefined,
    };
  },

  create<I extends Exact<DeepPartial<Foo>, I>>(base?: I): Foo {
    return Foo.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Foo>, I>>(object: I): Foo {
    const message = createBaseFoo();
    message.name = object.name ?? "";
    message.bar = (object.bar !== undefined && object.bar !== null) ? Bar.fromPartial(object.bar) : undefined;
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
