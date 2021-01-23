/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';

export const protobufPackage = 'simple';

export enum EnumWithoutZero {
  A = 1,
  B = 2,
  UNRECOGNIZED = -1,
}

export function enumWithoutZeroFromJSON(object: any): EnumWithoutZero {
  switch (object) {
    case 1:
    case 'A':
      return EnumWithoutZero.A;
    case 2:
    case 'B':
      return EnumWithoutZero.B;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return EnumWithoutZero.UNRECOGNIZED;
  }
}

export function enumWithoutZeroToJSON(object: EnumWithoutZero): string {
  switch (object) {
    case EnumWithoutZero.A:
      return 'A';
    case EnumWithoutZero.B:
      return 'B';
    default:
      return 'UNKNOWN';
  }
}

export interface Issue56 {
  test: EnumWithoutZero;
}

const baseIssue56: object = { test: 1 };

export const Issue56 = {
  encode(message: Issue56, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.test);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Issue56 {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseIssue56 } as Issue56;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.test = reader.int32() as any;
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
    return message;
  },

  fromPartial(object: DeepPartial<Issue56>): Issue56 {
    const message = { ...baseIssue56 } as Issue56;
    if (object.test !== undefined && object.test !== null) {
      message.test = object.test;
    } else {
      message.test = 1;
    }
    return message;
  },

  toJSON(message: Issue56): unknown {
    const obj: any = {};
    message.test !== undefined && (obj.test = enumWithoutZeroToJSON(message.test));
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
