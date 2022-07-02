/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';
import { FieldMask } from './google/protobuf/field_mask.js';

export const protobufPackage = '';

export interface FieldMaskMessage {
  fieldMask: string[] | undefined;
}

function createBaseFieldMaskMessage(): FieldMaskMessage {
  return { fieldMask: undefined };
}

export const FieldMaskMessage = {
  encode(message: FieldMaskMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.fieldMask !== undefined) {
      FieldMask.encode(FieldMask.wrap(message.fieldMask), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldMaskMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldMaskMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.fieldMask = FieldMask.unwrap(FieldMask.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): FieldMaskMessage {
    return {
      fieldMask: isSet(object.fieldMask) ? FieldMask.unwrap(FieldMask.fromJSON(object.fieldMask)) : undefined,
    };
  },

  toJSON(message: FieldMaskMessage): unknown {
    const obj: any = {};
    message.fieldMask !== undefined && (obj.fieldMask = FieldMask.toJSON(FieldMask.wrap(message.fieldMask)));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<FieldMaskMessage>, I>>(object: I): FieldMaskMessage {
    const message = createBaseFieldMaskMessage();
    message.fieldMask = object.fieldMask ?? undefined;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
