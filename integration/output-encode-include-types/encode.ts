// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// source: encode.proto

/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Encode {
  encode: string;
}

export interface DontGenerateEncode {
  dontGenerateEncode: string;
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

function createBaseDontGenerateEncode(): DontGenerateEncode {
  return { dontGenerateEncode: "" };
}
