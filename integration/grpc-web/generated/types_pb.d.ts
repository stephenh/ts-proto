// package: pb
// file: types.proto

import * as jspb from "google-protobuf";
import * as github_com_gogo_protobuf_gogoproto_gogo_pb from "./github.com/gogo/protobuf/gogoproto/gogo_pb";

export class Timestamp extends jspb.Message {
  getSeconds(): number;
  setSeconds(value: number): void;

  getNanos(): number;
  setNanos(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Timestamp.AsObject;
  static toObject(includeInstance: boolean, msg: Timestamp): Timestamp.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Timestamp, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Timestamp;
  static deserializeBinaryFromReader(message: Timestamp, reader: jspb.BinaryReader): Timestamp;
}

export namespace Timestamp {
  export type AsObject = {
    seconds: number,
    nanos: number,
  }
}

export class Duration extends jspb.Message {
  getNanos(): number;
  setNanos(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Duration.AsObject;
  static toObject(includeInstance: boolean, msg: Duration): Duration.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Duration, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Duration;
  static deserializeBinaryFromReader(message: Duration, reader: jspb.BinaryReader): Duration;
}

export namespace Duration {
  export type AsObject = {
    nanos: number,
  }
}

export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class OptString extends jspb.Message {
  getVal(): string;
  setVal(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OptString.AsObject;
  static toObject(includeInstance: boolean, msg: OptString): OptString.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OptString, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OptString;
  static deserializeBinaryFromReader(message: OptString, reader: jspb.BinaryReader): OptString;
}

export namespace OptString {
  export type AsObject = {
    val: string,
  }
}

export class OptInt64 extends jspb.Message {
  getVal(): number;
  setVal(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OptInt64.AsObject;
  static toObject(includeInstance: boolean, msg: OptInt64): OptInt64.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OptInt64, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OptInt64;
  static deserializeBinaryFromReader(message: OptInt64, reader: jspb.BinaryReader): OptInt64;
}

export namespace OptInt64 {
  export type AsObject = {
    val: number,
  }
}

export class OptBool extends jspb.Message {
  getVal(): boolean;
  setVal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OptBool.AsObject;
  static toObject(includeInstance: boolean, msg: OptBool): OptBool.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OptBool, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OptBool;
  static deserializeBinaryFromReader(message: OptBool, reader: jspb.BinaryReader): OptBool;
}

export namespace OptBool {
  export type AsObject = {
    val: boolean,
  }
}

export class IPNet extends jspb.Message {
  getIp(): Uint8Array | string;
  getIp_asU8(): Uint8Array;
  getIp_asB64(): string;
  setIp(value: Uint8Array | string): void;

  getMask(): Uint8Array | string;
  getMask_asU8(): Uint8Array;
  getMask_asB64(): string;
  setMask(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IPNet.AsObject;
  static toObject(includeInstance: boolean, msg: IPNet): IPNet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IPNet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IPNet;
  static deserializeBinaryFromReader(message: IPNet, reader: jspb.BinaryReader): IPNet;
}

export namespace IPNet {
  export type AsObject = {
    ip: Uint8Array | string,
    mask: Uint8Array | string,
  }
}

export class ID extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ID.AsObject;
  static toObject(includeInstance: boolean, msg: ID): ID.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ID, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ID;
  static deserializeBinaryFromReader(message: ID, reader: jspb.BinaryReader): ID;
}

export namespace ID {
  export type AsObject = {
    id: string,
  }
}

