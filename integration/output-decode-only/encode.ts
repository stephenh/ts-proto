/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Encode {
  encode: string;
}

function createBaseEncode(): Encode {
  return { encode: "" };
}

export const Encode = {
  decode(input: _m0.Reader | Uint8Array, length?: number): Encode {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncode();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag) {
        case 10:
          message.encode = reader.string();
          break;
        default:
          if ((tag & 7) == 4 || tag == 0) {
            return message;
          }
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};
