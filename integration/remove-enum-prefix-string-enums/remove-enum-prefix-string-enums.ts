/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum Foo {
  UNSPECIFIED = "FOO_UNSPECIFIED",
  BAR = "FOO_BAR",
  BAZ = "FOO_BAZ",
}

export function fooFromJSON(object: any): Foo {
  switch (object) {
    case 0:
    case "FOO_UNSPECIFIED":
      return Foo.UNSPECIFIED;
    case 1:
    case "FOO_BAR":
      return Foo.BAR;
    case 2:
    case "FOO_BAZ":
      return Foo.BAZ;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum Foo");
  }
}

export function fooToJSON(object: Foo): string {
  switch (object) {
    case Foo.UNSPECIFIED:
      return "FOO_UNSPECIFIED";
    case Foo.BAR:
      return "FOO_BAR";
    case Foo.BAZ:
      return "FOO_BAZ";
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum Foo");
  }
}

export function fooToNumber(object: Foo): number {
  switch (object) {
    case Foo.UNSPECIFIED:
      return 0;
    case Foo.BAR:
      return 1;
    case Foo.BAZ:
      return 2;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum Foo");
  }
}

export enum Bar {
  UNSPECIFIED = "BAR_UNSPECIFIED",
  BAZ = "BAZ",
  QUX = "QUX",
}

export function barFromJSON(object: any): Bar {
  switch (object) {
    case 0:
    case "BAR_UNSPECIFIED":
      return Bar.UNSPECIFIED;
    case 1:
    case "BAZ":
      return Bar.BAZ;
    case 2:
    case "QUX":
      return Bar.QUX;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum Bar");
  }
}

export function barToJSON(object: Bar): string {
  switch (object) {
    case Bar.UNSPECIFIED:
      return "BAR_UNSPECIFIED";
    case Bar.BAZ:
      return "BAZ";
    case Bar.QUX:
      return "QUX";
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum Bar");
  }
}

export function barToNumber(object: Bar): number {
  switch (object) {
    case Bar.UNSPECIFIED:
      return 0;
    case Bar.BAZ:
      return 1;
    case Bar.QUX:
      return 2;
    default:
      throw new tsProtoGlobalThis.Error("Unrecognized enum value " + object + " for enum Bar");
  }
}

export interface EnumFields {
  foo: Foo;
  bar: Bar;
}

function createBaseEnumFields(): EnumFields {
  return { foo: Foo.UNSPECIFIED, bar: Bar.UNSPECIFIED };
}

export const EnumFields = {
  encode(message: EnumFields, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.foo !== Foo.UNSPECIFIED) {
      writer.uint32(8).int32(fooToNumber(message.foo));
    }
    if (message.bar !== Bar.UNSPECIFIED) {
      writer.uint32(16).int32(barToNumber(message.bar));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnumFields {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnumFields();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.foo = fooFromJSON(reader.int32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.bar = barFromJSON(reader.int32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EnumFields {
    return {
      foo: isSet(object.foo) ? fooFromJSON(object.foo) : Foo.UNSPECIFIED,
      bar: isSet(object.bar) ? barFromJSON(object.bar) : Bar.UNSPECIFIED,
    };
  },

  toJSON(message: EnumFields): unknown {
    const obj: any = {};
    if (message.foo !== Foo.UNSPECIFIED) {
      obj.foo = fooToJSON(message.foo);
    }
    if (message.bar !== Bar.UNSPECIFIED) {
      obj.bar = barToJSON(message.bar);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EnumFields>, I>>(base?: I): EnumFields {
    return EnumFields.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EnumFields>, I>>(object: I): EnumFields {
    const message = createBaseEnumFields();
    message.foo = object.foo ?? Foo.UNSPECIFIED;
    message.bar = object.bar ?? Bar.UNSPECIFIED;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
