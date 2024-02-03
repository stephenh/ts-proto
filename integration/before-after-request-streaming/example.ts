/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { StringValue } from "./google/protobuf/wrappers";

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

export interface Empty {}

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
      msg: isSet(object.msg) ? globalThis.String(object.msg) : "",
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
      email: isSet(object.email) ? globalThis.String(object.email) : "",
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
    message.urls =
      object.urls !== undefined && object.urls !== null
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
      connectGoogle: isSet(object.connectGoogle) ? globalThis.String(object.connectGoogle) : "",
      connectGithub: isSet(object.connectGithub) ? globalThis.String(object.connectGithub) : "",
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
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      token: isSet(object.token) ? globalThis.String(object.token) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
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
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
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
      credSid: isSet(object.credSid) ? globalThis.String(object.credSid) : "",
      description: isSet(object.description) ? globalThis.String(object.description) : "",
      metadata: isSet(object.metadata) ? globalThis.String(object.metadata) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
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
      credSid: isSet(object.credSid) ? globalThis.String(object.credSid) : "",
      id: isSet(object.id) ? globalThis.String(object.id) : "",
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
  UserSettings(request: Empty): Promise<DashUserSettingsState>;
  ActiveUserSettingsStream(request: Empty): Observable<DashUserSettingsState>;
  /** not supported in grpc-web, but should still compile */
  ChangeUserSettingsStream(request: Observable<DashUserSettingsState>): Observable<DashUserSettingsState>;
}

export const DashStateServiceName = "rpx.DashState";
export class DashStateClientImpl implements DashState {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || DashStateServiceName;
    this.rpc = rpc;
    this.UserSettings = this.UserSettings.bind(this);
    this.ActiveUserSettingsStream = this.ActiveUserSettingsStream.bind(this);
    this.ChangeUserSettingsStream = this.ChangeUserSettingsStream.bind(this);
  }
  UserSettings(request: Empty): Promise<DashUserSettingsState> {
    const data = Empty.encode(request).finish();
    if (this.rpc.beforeRequest) {
      this.rpc.beforeRequest(this.service, "UserSettings", request);
    }
    const promise = this.rpc.request(this.service, "UserSettings", data);
    return promise
      .then((data) => {
        try {
          const response = DashUserSettingsState.decode(_m0.Reader.create(data));
          if (this.rpc.afterResponse) {
            this.rpc.afterResponse(this.service, "UserSettings", response);
          }
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        if (this.rpc.handleError) {
          return Promise.reject(this.rpc.handleError(this.service, "UserSettings", error));
        }
        return Promise.reject(error);
      });
  }

  ActiveUserSettingsStream(request: Empty): Observable<DashUserSettingsState> {
    const data = Empty.encode(request).finish();
    if (this.rpc.beforeRequest) {
      this.rpc.beforeRequest(this.service, "ActiveUserSettingsStream", request);
    }
    const result = this.rpc.serverStreamingRequest(this.service, "ActiveUserSettingsStream", data);
    return result.pipe(
      map((data) => {
        const response = DashUserSettingsState.decode(_m0.Reader.create(data));
        if (this.rpc.afterResponse) {
          this.rpc.afterResponse(this.service, "ActiveUserSettingsStream", response);
        }
        return response;
      }),
    );
  }

  ChangeUserSettingsStream(request: Observable<DashUserSettingsState>): Observable<DashUserSettingsState> {
    const data = request.pipe(
      map((request) => {
        const encodedRequest = DashUserSettingsState.encode(request).finish();
        if (this.rpc.beforeRequest) {
          this.rpc.beforeRequest(this.service, "ChangeUserSettingsStream", encodedRequest);
        }
        return encodedRequest;
      }),
    );
    const result = this.rpc.bidirectionalStreamingRequest(this.service, "ChangeUserSettingsStream", data);
    return result.pipe(
      map((data) => {
        const response = DashUserSettingsState.decode(_m0.Reader.create(data));
        if (this.rpc.afterResponse) {
          this.rpc.afterResponse(this.service, "ChangeUserSettingsStream", response);
        }
        return response;
      }),
    );
  }
}

export type DashStateDefinition = typeof DashStateDefinition;
export const DashStateDefinition = {
  name: "DashState",
  fullName: "rpx.DashState",
  methods: {
    userSettings: {
      name: "UserSettings",
      requestType: Empty,
      requestStream: false,
      responseType: DashUserSettingsState,
      responseStream: false,
      options: {},
    },
    activeUserSettingsStream: {
      name: "ActiveUserSettingsStream",
      requestType: Empty,
      requestStream: false,
      responseType: DashUserSettingsState,
      responseStream: true,
      options: {},
    },
    /** not supported in grpc-web, but should still compile */
    changeUserSettingsStream: {
      name: "ChangeUserSettingsStream",
      requestType: DashUserSettingsState,
      requestStream: true,
      responseType: DashUserSettingsState,
      responseStream: true,
      options: {},
    },
  },
} as const;

/**
 * ----------------------
 * API Creds
 * ----------------------
 */
export interface DashAPICreds {
  Create(request: DashAPICredsCreateReq): Promise<DashCred>;
  Update(request: DashAPICredsUpdateReq): Promise<DashCred>;
  Delete(request: DashAPICredsDeleteReq): Promise<DashCred>;
  Uppercase(request: StringValue): Promise<StringValue>;
}

export const DashAPICredsServiceName = "rpx.DashAPICreds";
export class DashAPICredsClientImpl implements DashAPICreds {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || DashAPICredsServiceName;
    this.rpc = rpc;
    this.Create = this.Create.bind(this);
    this.Update = this.Update.bind(this);
    this.Delete = this.Delete.bind(this);
    this.Uppercase = this.Uppercase.bind(this);
  }
  Create(request: DashAPICredsCreateReq): Promise<DashCred> {
    const data = DashAPICredsCreateReq.encode(request).finish();
    if (this.rpc.beforeRequest) {
      this.rpc.beforeRequest(this.service, "Create", request);
    }
    const promise = this.rpc.request(this.service, "Create", data);
    return promise
      .then((data) => {
        try {
          const response = DashCred.decode(_m0.Reader.create(data));
          if (this.rpc.afterResponse) {
            this.rpc.afterResponse(this.service, "Create", response);
          }
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        if (this.rpc.handleError) {
          return Promise.reject(this.rpc.handleError(this.service, "Create", error));
        }
        return Promise.reject(error);
      });
  }

  Update(request: DashAPICredsUpdateReq): Promise<DashCred> {
    const data = DashAPICredsUpdateReq.encode(request).finish();
    if (this.rpc.beforeRequest) {
      this.rpc.beforeRequest(this.service, "Update", request);
    }
    const promise = this.rpc.request(this.service, "Update", data);
    return promise
      .then((data) => {
        try {
          const response = DashCred.decode(_m0.Reader.create(data));
          if (this.rpc.afterResponse) {
            this.rpc.afterResponse(this.service, "Update", response);
          }
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        if (this.rpc.handleError) {
          return Promise.reject(this.rpc.handleError(this.service, "Update", error));
        }
        return Promise.reject(error);
      });
  }

  Delete(request: DashAPICredsDeleteReq): Promise<DashCred> {
    const data = DashAPICredsDeleteReq.encode(request).finish();
    if (this.rpc.beforeRequest) {
      this.rpc.beforeRequest(this.service, "Delete", request);
    }
    const promise = this.rpc.request(this.service, "Delete", data);
    return promise
      .then((data) => {
        try {
          const response = DashCred.decode(_m0.Reader.create(data));
          if (this.rpc.afterResponse) {
            this.rpc.afterResponse(this.service, "Delete", response);
          }
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        if (this.rpc.handleError) {
          return Promise.reject(this.rpc.handleError(this.service, "Delete", error));
        }
        return Promise.reject(error);
      });
  }

  Uppercase(request: StringValue): Promise<StringValue> {
    const data = StringValue.encode(request).finish();
    if (this.rpc.beforeRequest) {
      this.rpc.beforeRequest(this.service, "Uppercase", request);
    }
    const promise = this.rpc.request(this.service, "Uppercase", data);
    return promise
      .then((data) => {
        try {
          const response = StringValue.decode(_m0.Reader.create(data));
          if (this.rpc.afterResponse) {
            this.rpc.afterResponse(this.service, "Uppercase", response);
          }
          return response;
        } catch (error) {
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        if (this.rpc.handleError) {
          return Promise.reject(this.rpc.handleError(this.service, "Uppercase", error));
        }
        return Promise.reject(error);
      });
  }
}

/**
 * ----------------------
 * API Creds
 * ----------------------
 */
export type DashAPICredsDefinition = typeof DashAPICredsDefinition;
export const DashAPICredsDefinition = {
  name: "DashAPICreds",
  fullName: "rpx.DashAPICreds",
  methods: {
    create: {
      name: "Create",
      requestType: DashAPICredsCreateReq,
      requestStream: false,
      responseType: DashCred,
      responseStream: false,
      options: {},
    },
    update: {
      name: "Update",
      requestType: DashAPICredsUpdateReq,
      requestStream: false,
      responseType: DashCred,
      responseStream: false,
      options: {},
    },
    delete: {
      name: "Delete",
      requestType: DashAPICredsDeleteReq,
      requestStream: false,
      responseType: DashCred,
      responseStream: false,
      options: {},
    },
    uppercase: {
      name: "Uppercase",
      requestType: StringValue,
      requestStream: false,
      responseType: StringValue,
      responseStream: false,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
  beforeRequest?<T extends { [k in keyof T]: unknown }>(service: string, method: string, request: T): void;
  afterResponse?<T extends { [k in keyof T]: unknown }>(service: string, method: string, response: T): void;
  handleError?(service: string, method: string, error: Error): Error;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends globalThis.Array<infer U>
  ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
