/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "omit";

export interface TestMessage {
  field1: boolean;
  field2?: boolean | undefined;
}

function createBaseTestMessage(): TestMessage {
  return { field1: false };
}

export const TestMessage = {
  encode(message: TestMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field1 === true) {
      writer.uint32(8).bool(message.field1);
    }
    if (message.field2 !== undefined) {
      writer.uint32(16).bool(message.field2);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TestMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTestMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.field1 = reader.bool();
          break;
        case 2:
          message.field2 = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TestMessage {
    return {
      field1: isSet(object.field1) ? Boolean(object.field1) : false,
      field2: isSet(object.field2) ? Boolean(object.field2) : undefined,
    };
  },

  toJSON(message: TestMessage): unknown {
    const obj: any = {};
    message.field1 !== undefined && (obj.field1 = message.field1);
    message.field2 !== undefined && (obj.field2 = message.field2);
    return obj;
  },

  create<I extends Exact<DeepPartial<TestMessage>, I>>(base?: I): TestMessage {
    return TestMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<TestMessage>, I>>(object: I): TestMessage {
    const message = createBaseTestMessage();
    message.field1 = object.field1 ?? false;
    message.field2 = object.field2 ?? undefined;
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
