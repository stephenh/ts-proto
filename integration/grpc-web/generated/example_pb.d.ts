// package: rpx
// file: example.proto

import * as jspb from "google-protobuf";
import * as github_com_gogo_protobuf_gogoproto_gogo_pb from "./github.com/gogo/protobuf/gogoproto/gogo_pb";
import * as types_pb from "./types_pb";

export class DashFlash extends jspb.Message {
  getMsg(): string;
  setMsg(value: string): void;

  getType(): DashFlash.TypeMap[keyof DashFlash.TypeMap];
  setType(value: DashFlash.TypeMap[keyof DashFlash.TypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DashFlash.AsObject;
  static toObject(includeInstance: boolean, msg: DashFlash): DashFlash.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DashFlash, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DashFlash;
  static deserializeBinaryFromReader(message: DashFlash, reader: jspb.BinaryReader): DashFlash;
}

export namespace DashFlash {
  export type AsObject = {
    msg: string,
    type: DashFlash.TypeMap[keyof DashFlash.TypeMap],
  }

  export interface TypeMap {
    UNDEFINED: 0;
    SUCCESS: 1;
    WARN: 2;
    ERROR: 3;
  }

  export const Type: TypeMap;
}

export class DashUserSettingsState extends jspb.Message {
  getEmail(): string;
  setEmail(value: string): void;

  hasUrls(): boolean;
  clearUrls(): void;
  getUrls(): DashUserSettingsState.URLs | undefined;
  setUrls(value?: DashUserSettingsState.URLs): void;

  clearFlashesList(): void;
  getFlashesList(): Array<DashFlash>;
  setFlashesList(value: Array<DashFlash>): void;
  addFlashes(value?: DashFlash, index?: number): DashFlash;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DashUserSettingsState.AsObject;
  static toObject(includeInstance: boolean, msg: DashUserSettingsState): DashUserSettingsState.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DashUserSettingsState, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DashUserSettingsState;
  static deserializeBinaryFromReader(message: DashUserSettingsState, reader: jspb.BinaryReader): DashUserSettingsState;
}

export namespace DashUserSettingsState {
  export type AsObject = {
    email: string,
    urls?: DashUserSettingsState.URLs.AsObject,
    flashesList: Array<DashFlash.AsObject>,
  }

  export class URLs extends jspb.Message {
    getConnectGoogle(): string;
    setConnectGoogle(value: string): void;

    getConnectGithub(): string;
    setConnectGithub(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): URLs.AsObject;
    static toObject(includeInstance: boolean, msg: URLs): URLs.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: URLs, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): URLs;
    static deserializeBinaryFromReader(message: URLs, reader: jspb.BinaryReader): URLs;
  }

  export namespace URLs {
    export type AsObject = {
      connectGoogle: string,
      connectGithub: string,
    }
  }
}

export class DashCred extends jspb.Message {
  getDescription(): string;
  setDescription(value: string): void;

  getMetadata(): string;
  setMetadata(value: string): void;

  getToken(): string;
  setToken(value: string): void;

  hasId(): boolean;
  clearId(): void;
  getId(): types_pb.ID | undefined;
  setId(value?: types_pb.ID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DashCred.AsObject;
  static toObject(includeInstance: boolean, msg: DashCred): DashCred.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DashCred, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DashCred;
  static deserializeBinaryFromReader(message: DashCred, reader: jspb.BinaryReader): DashCred;
}

export namespace DashCred {
  export type AsObject = {
    description: string,
    metadata: string,
    token: string,
    id?: types_pb.ID.AsObject,
  }
}

export class DashAPICredsCreateReq extends jspb.Message {
  getDescription(): string;
  setDescription(value: string): void;

  getMetadata(): string;
  setMetadata(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DashAPICredsCreateReq.AsObject;
  static toObject(includeInstance: boolean, msg: DashAPICredsCreateReq): DashAPICredsCreateReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DashAPICredsCreateReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DashAPICredsCreateReq;
  static deserializeBinaryFromReader(message: DashAPICredsCreateReq, reader: jspb.BinaryReader): DashAPICredsCreateReq;
}

export namespace DashAPICredsCreateReq {
  export type AsObject = {
    description: string,
    metadata: string,
  }
}

export class DashAPICredsUpdateReq extends jspb.Message {
  getCredSid(): string;
  setCredSid(value: string): void;

  getDescription(): string;
  setDescription(value: string): void;

  getMetadata(): string;
  setMetadata(value: string): void;

  hasId(): boolean;
  clearId(): void;
  getId(): types_pb.ID | undefined;
  setId(value?: types_pb.ID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DashAPICredsUpdateReq.AsObject;
  static toObject(includeInstance: boolean, msg: DashAPICredsUpdateReq): DashAPICredsUpdateReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DashAPICredsUpdateReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DashAPICredsUpdateReq;
  static deserializeBinaryFromReader(message: DashAPICredsUpdateReq, reader: jspb.BinaryReader): DashAPICredsUpdateReq;
}

export namespace DashAPICredsUpdateReq {
  export type AsObject = {
    credSid: string,
    description: string,
    metadata: string,
    id?: types_pb.ID.AsObject,
  }
}

export class DashAPICredsDeleteReq extends jspb.Message {
  getCredSid(): string;
  setCredSid(value: string): void;

  hasId(): boolean;
  clearId(): void;
  getId(): types_pb.ID | undefined;
  setId(value?: types_pb.ID): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DashAPICredsDeleteReq.AsObject;
  static toObject(includeInstance: boolean, msg: DashAPICredsDeleteReq): DashAPICredsDeleteReq.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DashAPICredsDeleteReq, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DashAPICredsDeleteReq;
  static deserializeBinaryFromReader(message: DashAPICredsDeleteReq, reader: jspb.BinaryReader): DashAPICredsDeleteReq;
}

export namespace DashAPICredsDeleteReq {
  export type AsObject = {
    credSid: string,
    id?: types_pb.ID.AsObject,
  }
}

