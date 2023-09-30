/* eslint-disable */
import { grpc } from "@improbable-eng/grpc-web";
import { BrowserHeaders } from "browser-headers";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { share } from "rxjs/operators";

export const protobufPackage = "rpx";

export interface DashFlash {
  msg: string;
  type: DashFlash_Type;
}

export enum DashFlash_Type {
  Undefined = 0,
  Success = 1,
  Warn = 2,
  Error = 3,
  UNRECOGNIZED = -1,
}

export function dashFlash_TypeFromJSON(object: any): DashFlash_Type {
  switch (object) {
    case 0:
    case "Undefined":
      return DashFlash_Type.Undefined;
    case 1:
    case "Success":
      return DashFlash_Type.Success;
    case 2:
    case "Warn":
      return DashFlash_Type.Warn;
    case 3:
    case "Error":
      return DashFlash_Type.Error;
    case -1:
    case "UNRECOGNIZED":
    default:
      return DashFlash_Type.UNRECOGNIZED;
  }
}

export function dashFlash_TypeToJSON(object: DashFlash_Type): string {
  switch (object) {
    case DashFlash_Type.Undefined:
      return "Undefined";
    case DashFlash_Type.Success:
      return "Success";
    case DashFlash_Type.Warn:
      return "Warn";
    case DashFlash_Type.Error:
      return "Error";
    case DashFlash_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface DashUserSettingsState {
  email: string;
  urls: DashUserSettingsState_URLs | undefined;
  flashes: DashFlash[];
}

export interface DashUserSettingsState_URLs {
  connectGoogle: string;
  connectGithub: string;
}

export interface DashCred {
  description: string;
  metadata: string;
  token: string;
  id: string;
}

export interface DashAPICredsCreateReq {
  description: string;
  metadata: string;
}

export interface DashAPICredsUpdateReq {
  credSid: string;
  description: string;
  metadata: string;
  id: string;
}

export interface DashAPICredsDeleteReq {
  credSid: string;
  id: string;
}

export interface Empty {
}

function createBaseDashFlash(): DashFlash {
  return { msg: "", type: 0 };
}

export const DashFlash = {
  encode(message: DashFlash, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.msg !== "") {
      writer.uint32(10).string(message.msg);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashFlash {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashFlash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.msg = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DashFlash {
    return {
      msg: isSet(object.msg) ? String(object.msg) : "",
      type: isSet(object.type) ? dashFlash_TypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: DashFlash): unknown {
    const obj: any = {};
    if (message.msg !== "") {
      obj.msg = message.msg;
    }
    if (message.type !== 0) {
      obj.type = dashFlash_TypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DashFlash>, I>>(base?: I): DashFlash {
    return DashFlash.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DashFlash>, I>>(object: I): DashFlash {
    const message = createBaseDashFlash();
    message.msg = object.msg ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseDashUserSettingsState(): DashUserSettingsState {
  return { email: "", urls: undefined, flashes: [] };
}

export const DashUserSettingsState = {
  encode(message: DashUserSettingsState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== "") {
      writer.uint32(10).string(message.email);
    }
    if (message.urls !== undefined) {
      DashUserSettingsState_URLs.encode(message.urls, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.flashes) {
      DashFlash.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashUserSettingsState {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashUserSettingsState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.email = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.urls = DashUserSettingsState_URLs.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.flashes.push(DashFlash.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DashUserSettingsState {
    return {
      email: isSet(object.email) ? String(object.email) : "",
      urls: isSet(object.urls) ? DashUserSettingsState_URLs.fromJSON(object.urls) : undefined,
      flashes: globalThis.Array.isArray(object?.flashes) ? object.flashes.map((e: any) => DashFlash.fromJSON(e)) : [],
    };
  },

  toJSON(message: DashUserSettingsState): unknown {
    const obj: any = {};
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.urls !== undefined) {
      obj.urls = DashUserSettingsState_URLs.toJSON(message.urls);
    }
    if (message.flashes?.length) {
      obj.flashes = message.flashes.map((e) => DashFlash.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DashUserSettingsState>, I>>(base?: I): DashUserSettingsState {
    return DashUserSettingsState.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DashUserSettingsState>, I>>(object: I): DashUserSettingsState {
    const message = createBaseDashUserSettingsState();
    message.email = object.email ?? "";
    message.urls = (object.urls !== undefined && object.urls !== null)
      ? DashUserSettingsState_URLs.fromPartial(object.urls)
      : undefined;
    message.flashes = object.flashes?.map((e) => DashFlash.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDashUserSettingsState_URLs(): DashUserSettingsState_URLs {
  return { connectGoogle: "", connectGithub: "" };
}

export const DashUserSettingsState_URLs = {
  encode(message: DashUserSettingsState_URLs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectGoogle !== "") {
      writer.uint32(10).string(message.connectGoogle);
    }
    if (message.connectGithub !== "") {
      writer.uint32(18).string(message.connectGithub);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashUserSettingsState_URLs {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashUserSettingsState_URLs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.connectGoogle = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.connectGithub = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DashUserSettingsState_URLs {
    return {
      connectGoogle: isSet(object.connectGoogle) ? String(object.connectGoogle) : "",
      connectGithub: isSet(object.connectGithub) ? String(object.connectGithub) : "",
    };
  },

  toJSON(message: DashUserSettingsState_URLs): unknown {
    const obj: any = {};
    if (message.connectGoogle !== "") {
      obj.connectGoogle = message.connectGoogle;
    }
    if (message.connectGithub !== "") {
      obj.connectGithub = message.connectGithub;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DashUserSettingsState_URLs>, I>>(base?: I): DashUserSettingsState_URLs {
    return DashUserSettingsState_URLs.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DashUserSettingsState_URLs>, I>>(object: I): DashUserSettingsState_URLs {
    const message = createBaseDashUserSettingsState_URLs();
    message.connectGoogle = object.connectGoogle ?? "";
    message.connectGithub = object.connectGithub ?? "";
    return message;
  },
};

function createBaseDashCred(): DashCred {
  return { description: "", metadata: "", token: "", id: "" };
}

export const DashCred = {
  encode(message: DashCred, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.token !== "") {
      writer.uint32(34).string(message.token);
    }
    if (message.id !== "") {
      writer.uint32(58).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashCred {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashCred();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.token = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DashCred {
    return {
      description: isSet(object.description) ? String(object.description) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      token: isSet(object.token) ? String(object.token) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: DashCred): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.token !== "") {
      obj.token = message.token;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DashCred>, I>>(base?: I): DashCred {
    return DashCred.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DashCred>, I>>(object: I): DashCred {
    const message = createBaseDashCred();
    message.description = object.description ?? "";
    message.metadata = object.metadata ?? "";
    message.token = object.token ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseDashAPICredsCreateReq(): DashAPICredsCreateReq {
  return { description: "", metadata: "" };
}

export const DashAPICredsCreateReq = {
  encode(message: DashAPICredsCreateReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== "") {
      writer.uint32(10).string(message.description);
    }
    if (message.metadata !== "") {
      writer.uint32(18).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashAPICredsCreateReq {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashAPICredsCreateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.description = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.metadata = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DashAPICredsCreateReq {
    return {
      description: isSet(object.description) ? String(object.description) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
    };
  },

  toJSON(message: DashAPICredsCreateReq): unknown {
    const obj: any = {};
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DashAPICredsCreateReq>, I>>(base?: I): DashAPICredsCreateReq {
    return DashAPICredsCreateReq.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DashAPICredsCreateReq>, I>>(object: I): DashAPICredsCreateReq {
    const message = createBaseDashAPICredsCreateReq();
    message.description = object.description ?? "";
    message.metadata = object.metadata ?? "";
    return message;
  },
};

function createBaseDashAPICredsUpdateReq(): DashAPICredsUpdateReq {
  return { credSid: "", description: "", metadata: "", id: "" };
}

export const DashAPICredsUpdateReq = {
  encode(message: DashAPICredsUpdateReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credSid !== "") {
      writer.uint32(10).string(message.credSid);
    }
    if (message.description !== "") {
      writer.uint32(18).string(message.description);
    }
    if (message.metadata !== "") {
      writer.uint32(26).string(message.metadata);
    }
    if (message.id !== "") {
      writer.uint32(42).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashAPICredsUpdateReq {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashAPICredsUpdateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.credSid = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.description = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.metadata = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DashAPICredsUpdateReq {
    return {
      credSid: isSet(object.credSid) ? String(object.credSid) : "",
      description: isSet(object.description) ? String(object.description) : "",
      metadata: isSet(object.metadata) ? String(object.metadata) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: DashAPICredsUpdateReq): unknown {
    const obj: any = {};
    if (message.credSid !== "") {
      obj.credSid = message.credSid;
    }
    if (message.description !== "") {
      obj.description = message.description;
    }
    if (message.metadata !== "") {
      obj.metadata = message.metadata;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DashAPICredsUpdateReq>, I>>(base?: I): DashAPICredsUpdateReq {
    return DashAPICredsUpdateReq.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DashAPICredsUpdateReq>, I>>(object: I): DashAPICredsUpdateReq {
    const message = createBaseDashAPICredsUpdateReq();
    message.credSid = object.credSid ?? "";
    message.description = object.description ?? "";
    message.metadata = object.metadata ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseDashAPICredsDeleteReq(): DashAPICredsDeleteReq {
  return { credSid: "", id: "" };
}

export const DashAPICredsDeleteReq = {
  encode(message: DashAPICredsDeleteReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credSid !== "") {
      writer.uint32(10).string(message.credSid);
    }
    if (message.id !== "") {
      writer.uint32(26).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashAPICredsDeleteReq {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashAPICredsDeleteReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.credSid = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.id = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DashAPICredsDeleteReq {
    return {
      credSid: isSet(object.credSid) ? String(object.credSid) : "",
      id: isSet(object.id) ? String(object.id) : "",
    };
  },

  toJSON(message: DashAPICredsDeleteReq): unknown {
    const obj: any = {};
    if (message.credSid !== "") {
      obj.credSid = message.credSid;
    }
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DashAPICredsDeleteReq>, I>>(base?: I): DashAPICredsDeleteReq {
    return DashAPICredsDeleteReq.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DashAPICredsDeleteReq>, I>>(object: I): DashAPICredsDeleteReq {
    const message = createBaseDashAPICredsDeleteReq();
    message.credSid = object.credSid ?? "";
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

export interface DashState {
  UserSettings(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Promise<DashUserSettingsState>;
  ActiveUserSettingsStream(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Observable<DashUserSettingsState>;
  /** not supported in grpc-web, but should still compile */
  ChangeUserSettingsStream(
    request: Observable<DeepPartial<DashUserSettingsState>>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Observable<DashUserSettingsState>;
}

export class DashStateClientImpl implements DashState {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UserSettings = this.UserSettings.bind(this);
    this.ActiveUserSettingsStream = this.ActiveUserSettingsStream.bind(this);
    this.ChangeUserSettingsStream = this.ChangeUserSettingsStream.bind(this);
  }

  UserSettings(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Promise<DashUserSettingsState> {
    return this.rpc.unary(DashStateUserSettingsDesc, Empty.fromPartial(request), metadata, abortSignal);
  }

  ActiveUserSettingsStream(
    request: DeepPartial<Empty>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Observable<DashUserSettingsState> {
    return this.rpc.invoke(DashStateActiveUserSettingsStreamDesc, Empty.fromPartial(request), metadata, abortSignal);
  }

  ChangeUserSettingsStream(
    request: Observable<DeepPartial<DashUserSettingsState>>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Observable<DashUserSettingsState> {
    throw new Error("ts-proto does not yet support client streaming!");
  }
}

export const DashStateDesc = { serviceName: "rpx.DashState" };

export const DashStateUserSettingsDesc: UnaryMethodDefinitionish = {
  methodName: "UserSettings",
  service: DashStateDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DashUserSettingsState.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const DashStateActiveUserSettingsStreamDesc: UnaryMethodDefinitionish = {
  methodName: "ActiveUserSettingsStream",
  service: DashStateDesc,
  requestStream: false,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return Empty.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DashUserSettingsState.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

/**
 * ----------------------
 * API Creds
 * ----------------------
 */
export interface DashAPICreds {
  Create(
    request: DeepPartial<DashAPICredsCreateReq>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Promise<DashCred>;
  Update(
    request: DeepPartial<DashAPICredsUpdateReq>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Promise<DashCred>;
  Delete(
    request: DeepPartial<DashAPICredsDeleteReq>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Promise<DashCred>;
}

export class DashAPICredsClientImpl implements DashAPICreds {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Create = this.Create.bind(this);
    this.Update = this.Update.bind(this);
    this.Delete = this.Delete.bind(this);
  }

  Create(
    request: DeepPartial<DashAPICredsCreateReq>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Promise<DashCred> {
    return this.rpc.unary(DashAPICredsCreateDesc, DashAPICredsCreateReq.fromPartial(request), metadata, abortSignal);
  }

  Update(
    request: DeepPartial<DashAPICredsUpdateReq>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Promise<DashCred> {
    return this.rpc.unary(DashAPICredsUpdateDesc, DashAPICredsUpdateReq.fromPartial(request), metadata, abortSignal);
  }

  Delete(
    request: DeepPartial<DashAPICredsDeleteReq>,
    metadata?: grpc.Metadata,
    abortSignal?: AbortSignal,
  ): Promise<DashCred> {
    return this.rpc.unary(DashAPICredsDeleteDesc, DashAPICredsDeleteReq.fromPartial(request), metadata, abortSignal);
  }
}

export const DashAPICredsDesc = { serviceName: "rpx.DashAPICreds" };

export const DashAPICredsCreateDesc: UnaryMethodDefinitionish = {
  methodName: "Create",
  service: DashAPICredsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DashAPICredsCreateReq.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DashCred.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const DashAPICredsUpdateDesc: UnaryMethodDefinitionish = {
  methodName: "Update",
  service: DashAPICredsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DashAPICredsUpdateReq.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DashCred.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

export const DashAPICredsDeleteDesc: UnaryMethodDefinitionish = {
  methodName: "Delete",
  service: DashAPICredsDesc,
  requestStream: false,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DashAPICredsDeleteReq.encode(this).finish();
    },
  } as any,
  responseType: {
    deserializeBinary(data: Uint8Array) {
      const value = DashCred.decode(data);
      return {
        ...value,
        toObject() {
          return value;
        },
      };
    },
  } as any,
};

interface UnaryMethodDefinitionishR extends grpc.UnaryMethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type UnaryMethodDefinitionish = UnaryMethodDefinitionishR;

interface Rpc {
  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
    abortSignal?: AbortSignal,
  ): Promise<any>;
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined,
    abortSignal?: AbortSignal,
  ): Observable<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;
    streamingTransport?: grpc.TransportFactory;
    debug?: boolean;
    metadata?: grpc.Metadata;
    upStreamRetryCodes?: number[];
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;
      streamingTransport?: grpc.TransportFactory;
      debug?: boolean;
      metadata?: grpc.Metadata;
      upStreamRetryCodes?: number[];
    },
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
    abortSignal?: AbortSignal,
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Promise((resolve, reject) => {
      const client = grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata ?? {},
        ...(this.options.transport !== undefined ? { transport: this.options.transport } : {}),
        debug: this.options.debug ?? false,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message!.toObject());
          } else {
            const err = new GrpcWebError(response.statusMessage, response.status, response.trailers);
            reject(err);
          }
        },
      });

      if (abortSignal) {
        abortSignal.addEventListener("abort", () => {
          client.close();
          reject(abortSignal.reason);
        });
      }
    });
  }

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined,
    abortSignal?: AbortSignal,
  ): Observable<any> {
    const upStreamCodes = this.options.upStreamRetryCodes ?? [];
    const DEFAULT_TIMEOUT_TIME: number = 3_000;
    const request = { ..._request, ...methodDesc.requestType };
    const transport = this.options.streamingTransport ?? this.options.transport;
    const maybeCombinedMetadata = metadata && this.options.metadata
      ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
      : metadata ?? this.options.metadata;
    return new Observable((observer) => {
      const upStream = (() => {
        const client = grpc.invoke(methodDesc, {
          host: this.host,
          request,
          ...(transport !== undefined ? { transport } : {}),
          metadata: maybeCombinedMetadata ?? {},
          debug: this.options.debug ?? false,
          onMessage: (next) => observer.next(next),
          onEnd: (code: grpc.Code, message: string, trailers: grpc.Metadata) => {
            if (code === 0) {
              observer.complete();
            } else if (upStreamCodes.includes(code)) {
              setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
            } else {
              const err = new Error(message) as any;
              err.code = code;
              err.metadata = trailers;
              observer.error(err);
            }
          },
        });
        observer.add(() => {
          if (!abortSignal || !abortSignal.aborted) {
            return client.close();
          }
        });

        if (abortSignal) {
          abortSignal.addEventListener("abort", () => {
            observer.error(abortSignal.reason);
            client.close();
          });
        }
      });
      upStream();
    }).pipe(share());
  }
}

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

export class GrpcWebError extends globalThis.Error {
  constructor(message: string, public code: grpc.Code, public metadata: grpc.Metadata) {
    super(message);
  }
}
