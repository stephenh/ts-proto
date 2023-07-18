/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Baz {
  foo?: FooBar | undefined;
}

export interface FooBar {
}

function createBaseBaz(): Baz {
  return { foo: undefined };
}

export const Baz = {
  encode(message: Baz, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.foo !== undefined) {
      FooBar.encode(message.foo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Baz {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBaz();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.foo = FooBar.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  toJSON(message: Baz): unknown {
    const obj: any = {};
    if (message.foo !== undefined) {
      obj.foo = FooBar.toJSON(message.foo);
    }
    return obj;
  },

  fromJSON(object: any): Baz {
    return { foo: isSet(object.foo) ? FooBar.fromJSON(object.foo) : undefined };
  },

  create<I extends Exact<DeepPartial<Baz>, I>>(base?: I): Baz {
    return Baz.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Baz>, I>>(object: I): Baz {
    const message = createBaseBaz();
    message.foo = (object.foo !== undefined && object.foo !== null) ? FooBar.fromPartial(object.foo) : undefined;
    return message;
  },
};

function createBaseFooBar(): FooBar {
  return {};
}

export const FooBar = {
  encode(_: FooBar, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FooBar {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFooBar();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  toJSON(_: FooBar): unknown {
    const obj: any = {};
    return obj;
  },

  fromJSON(_: any): FooBar {
    return {};
  },

  create<I extends Exact<DeepPartial<FooBar>, I>>(base?: I): FooBar {
    return FooBar.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<FooBar>, I>>(_: I): FooBar {
    const message = createBaseFooBar();
    return message;
  },
};

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
