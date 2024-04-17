/* eslint-disable */
import _m0 from "protobufjs/minimal";

export interface Extendable {
  field: string;
}

function createBaseExtendable(): Extendable {
  return { field: "" };
}

export const Extendable = {
  encode(message: Extendable, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Extendable {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtendable();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Extendable {
    return { field: isSet(object.field) ? globalThis.String(object.field) : "" };
  },

  toJSON(message: Extendable): unknown {
    const obj: any = {};
    if (message.field !== "") {
      obj.field = message.field;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Extendable>, I>>(base?: I): Extendable {
    return Extendable.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Extendable>, I>>(object: I): Extendable {
    const message = createBaseExtendable();
    message.field = object.field ?? "";
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
