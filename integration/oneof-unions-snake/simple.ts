/* eslint-disable */
import * as _m0 from 'protobufjs/minimal';
import { Struct } from './google/protobuf/struct.js';

export const protobufPackage = 'simple';

/**
 * Adding a comment to the syntax will become the first
 * comment in the output source file.
 */

export interface SimpleStruct {
  simple_struct: { [key: string]: any } | undefined;
}

function createBaseSimpleStruct(): SimpleStruct {
  return { simple_struct: undefined };
}

export const SimpleStruct = {
  encode(message: SimpleStruct, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.simple_struct !== undefined) {
      Struct.encode(Struct.wrap(message.simple_struct), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleStruct {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleStruct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.simple_struct = Struct.unwrap(Struct.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleStruct {
    return {
      simple_struct: isObject(object.simple_struct) ? object.simple_struct : undefined,
    };
  },

  toJSON(message: SimpleStruct): unknown {
    const obj: any = {};
    message.simple_struct !== undefined && (obj.simple_struct = message.simple_struct);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SimpleStruct>, I>>(object: I): SimpleStruct {
    const message = createBaseSimpleStruct();
    message.simple_struct = object.simple_struct ?? undefined;
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
  : T extends { $case: string }
  ? { [K in keyof Omit<T, '$case'>]?: DeepPartial<T[K]> } & { $case: T['$case'] }
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}
