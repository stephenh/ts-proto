/* eslint-disable */
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'angular';

export interface SimpleMessage {
  numberField: number;
}

function createBaseSimpleMessage(): SimpleMessage {
  return { numberField: 0 };
}

export const SimpleMessage = {
  encode(message: SimpleMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.numberField !== 0) {
      writer.uint32(8).int32(message.numberField);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.numberField = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleMessage {
    return {
      numberField: isSet(object.numberField) ? Number(object.numberField) : 0,
    };
  },

  toJSON(message: SimpleMessage): unknown {
    const obj: any = {};
    message.numberField !== undefined && (obj.numberField = Math.round(message.numberField));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleMessage>, I>>(object: I): SimpleMessage {
    const message = createBaseSimpleMessage();
    message.numberField = object.numberField ?? 0;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
