/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';


export interface Issue56 {
  test: EnumWithoutZero;
  foo?: number;
}

const baseIssue56: object = {
  test: 1,
  foo: 0,
};

export const protobufPackage = 'simple'

export enum EnumWithoutZero {
  A = 1,
  B = 2,
  UNRECOGNIZED = -1,
}

export function enumWithoutZeroFromJSON(object: any): EnumWithoutZero {
  switch (object) {
    case 1:
    case "A":
      return EnumWithoutZero.A;
    case 2:
    case "B":
      return EnumWithoutZero.B;
    case -1:
    case "UNRECOGNIZED":
    default:
      return EnumWithoutZero.UNRECOGNIZED;
  }
}

export function enumWithoutZeroToJSON(object: EnumWithoutZero): string {
  switch (object) {
    case EnumWithoutZero.A:
      return "A";
    case EnumWithoutZero.B:
      return "B";
    default:
      return "UNKNOWN";
  }
}

export const Issue56 = {
  encode(message: Issue56, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.test);
    if (message.foo !== undefined) {
      writer.uint32(16).int32(message.foo);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Issue56 {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIssue56 } as Issue56;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.test = reader.int32() as any;
          break;
        case 2:
          message.foo = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Issue56 {
    const message = { ...baseIssue56 } as Issue56;
    if (object.test !== undefined && object.test !== null) {
      message.test = enumWithoutZeroFromJSON(object.test);
    } else {
      message.test = 1;
    }
    if (object.foo !== undefined && object.foo !== null) {
      message.foo = Number(object.foo);
    }
    return message;
  },
  fromPartial(object: DeepPartial<Issue56>): Issue56 {
    const message = { ...baseIssue56 } as Issue56;
    if (object.test !== undefined && object.test !== null) {
      message.test = object.test;
    } else {
      message.test = 1;
    }
    if (object.foo !== undefined && object.foo !== null) {
      message.foo = object.foo;
    }
    return message;
  },
  toJSON(message: Issue56): unknown {
    const obj: any = {};
    message.test !== undefined && (obj.test = enumWithoutZeroToJSON(message.test));
    message.foo !== undefined && (obj.foo = message.foo);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;