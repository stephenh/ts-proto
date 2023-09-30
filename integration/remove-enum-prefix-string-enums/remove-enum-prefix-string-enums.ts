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
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum Foo");
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
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum Foo");
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
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum Foo");
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
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum Bar");
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
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum Bar");
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
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum Bar");
  }
}

export interface WithNestedEnum {
  foo: Foo;
  Bar: Bar;
  baz: WithNestedEnum_Baz;
  qux: WithNestedEnum_Qux;
}

export enum WithNestedEnum_Baz {
  UNSPECIFIED = "BAZ_UNSPECIFIED",
  ONE = "BAZ_ONE",
  TWO = "BAZ_TWO",
}

export function withNestedEnum_BazFromJSON(object: any): WithNestedEnum_Baz {
  switch (object) {
    case 0:
    case "BAZ_UNSPECIFIED":
      return WithNestedEnum_Baz.UNSPECIFIED;
    case 1:
    case "BAZ_ONE":
      return WithNestedEnum_Baz.ONE;
    case 2:
    case "BAZ_TWO":
      return WithNestedEnum_Baz.TWO;
    default:
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum WithNestedEnum_Baz");
  }
}

export function withNestedEnum_BazToJSON(object: WithNestedEnum_Baz): string {
  switch (object) {
    case WithNestedEnum_Baz.UNSPECIFIED:
      return "BAZ_UNSPECIFIED";
    case WithNestedEnum_Baz.ONE:
      return "BAZ_ONE";
    case WithNestedEnum_Baz.TWO:
      return "BAZ_TWO";
    default:
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum WithNestedEnum_Baz");
  }
}

export function withNestedEnum_BazToNumber(object: WithNestedEnum_Baz): number {
  switch (object) {
    case WithNestedEnum_Baz.UNSPECIFIED:
      return 0;
    case WithNestedEnum_Baz.ONE:
      return 1;
    case WithNestedEnum_Baz.TWO:
      return 2;
    default:
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum WithNestedEnum_Baz");
  }
}

export enum WithNestedEnum_Qux {
  UNSPECIFIED = "QUX_UNSPECIFIED",
  ONE = "ONE",
  TWO = "TWO",
}

export function withNestedEnum_QuxFromJSON(object: any): WithNestedEnum_Qux {
  switch (object) {
    case 0:
    case "QUX_UNSPECIFIED":
      return WithNestedEnum_Qux.UNSPECIFIED;
    case 1:
    case "ONE":
      return WithNestedEnum_Qux.ONE;
    case 2:
    case "TWO":
      return WithNestedEnum_Qux.TWO;
    default:
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum WithNestedEnum_Qux");
  }
}

export function withNestedEnum_QuxToJSON(object: WithNestedEnum_Qux): string {
  switch (object) {
    case WithNestedEnum_Qux.UNSPECIFIED:
      return "QUX_UNSPECIFIED";
    case WithNestedEnum_Qux.ONE:
      return "ONE";
    case WithNestedEnum_Qux.TWO:
      return "TWO";
    default:
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum WithNestedEnum_Qux");
  }
}

export function withNestedEnum_QuxToNumber(object: WithNestedEnum_Qux): number {
  switch (object) {
    case WithNestedEnum_Qux.UNSPECIFIED:
      return 0;
    case WithNestedEnum_Qux.ONE:
      return 1;
    case WithNestedEnum_Qux.TWO:
      return 2;
    default:
      throw new globalThis.Error("Unrecognized enum value " + object + " for enum WithNestedEnum_Qux");
  }
}

function createBaseWithNestedEnum(): WithNestedEnum {
  return {
    foo: Foo.UNSPECIFIED,
    Bar: Bar.UNSPECIFIED,
    baz: WithNestedEnum_Baz.UNSPECIFIED,
    qux: WithNestedEnum_Qux.UNSPECIFIED,
  };
}

export const WithNestedEnum = {
  encode(message: WithNestedEnum, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.foo !== Foo.UNSPECIFIED) {
      writer.uint32(8).int32(fooToNumber(message.foo));
    }
    if (message.Bar !== Bar.UNSPECIFIED) {
      writer.uint32(16).int32(barToNumber(message.Bar));
    }
    if (message.baz !== WithNestedEnum_Baz.UNSPECIFIED) {
      writer.uint32(24).int32(withNestedEnum_BazToNumber(message.baz));
    }
    if (message.qux !== WithNestedEnum_Qux.UNSPECIFIED) {
      writer.uint32(32).int32(withNestedEnum_QuxToNumber(message.qux));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WithNestedEnum {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWithNestedEnum();
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

          message.Bar = barFromJSON(reader.int32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.baz = withNestedEnum_BazFromJSON(reader.int32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.qux = withNestedEnum_QuxFromJSON(reader.int32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): WithNestedEnum {
    return {
      foo: isSet(object.foo) ? fooFromJSON(object.foo) : Foo.UNSPECIFIED,
      Bar: isSet(object.Bar) ? barFromJSON(object.Bar) : Bar.UNSPECIFIED,
      baz: isSet(object.baz) ? withNestedEnum_BazFromJSON(object.baz) : WithNestedEnum_Baz.UNSPECIFIED,
      qux: isSet(object.qux) ? withNestedEnum_QuxFromJSON(object.qux) : WithNestedEnum_Qux.UNSPECIFIED,
    };
  },

  toJSON(message: WithNestedEnum): unknown {
    const obj: any = {};
    if (message.foo !== Foo.UNSPECIFIED) {
      obj.foo = fooToJSON(message.foo);
    }
    if (message.Bar !== Bar.UNSPECIFIED) {
      obj.Bar = barToJSON(message.Bar);
    }
    if (message.baz !== WithNestedEnum_Baz.UNSPECIFIED) {
      obj.baz = withNestedEnum_BazToJSON(message.baz);
    }
    if (message.qux !== WithNestedEnum_Qux.UNSPECIFIED) {
      obj.qux = withNestedEnum_QuxToJSON(message.qux);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WithNestedEnum>, I>>(base?: I): WithNestedEnum {
    return WithNestedEnum.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WithNestedEnum>, I>>(object: I): WithNestedEnum {
    const message = createBaseWithNestedEnum();
    message.foo = object.foo ?? Foo.UNSPECIFIED;
    message.Bar = object.Bar ?? Bar.UNSPECIFIED;
    message.baz = object.baz ?? WithNestedEnum_Baz.UNSPECIFIED;
    message.qux = object.qux ?? WithNestedEnum_Qux.UNSPECIFIED;
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
