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
  encode(message: Encode, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.encode !== "") {
      writer.uint32(10).string(message.encode);
    }
    return writer;
  },
};
