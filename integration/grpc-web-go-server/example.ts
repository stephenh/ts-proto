/* eslint-disable */
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const protobufPackage = 'rpx';

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
    case 'Undefined':
      return DashFlash_Type.Undefined;
    case 1:
    case 'Success':
      return DashFlash_Type.Success;
    case 2:
    case 'Warn':
      return DashFlash_Type.Warn;
    case 3:
    case 'Error':
      return DashFlash_Type.Error;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return DashFlash_Type.UNRECOGNIZED;
  }
}

export function dashFlash_TypeToJSON(object: DashFlash_Type): string {
  switch (object) {
    case DashFlash_Type.Undefined:
      return 'Undefined';
    case DashFlash_Type.Success:
      return 'Success';
    case DashFlash_Type.Warn:
      return 'Warn';
    case DashFlash_Type.Error:
      return 'Error';
    default:
      return 'UNKNOWN';
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
  return { msg: '', type: 0 };
}

export const DashFlash = {
  encode(message: DashFlash, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.msg !== '') {
      writer.uint32(10).string(message.msg);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashFlash {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashFlash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.msg = reader.string();
          break;
        case 2:
          message.type = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DashFlash {
    return {
      msg: isSet(object.msg) ? String(object.msg) : '',
      type: isSet(object.type) ? dashFlash_TypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: DashFlash): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.type !== undefined && (obj.type = dashFlash_TypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashFlash>, I>>(object: I): DashFlash {
    const message = createBaseDashFlash();
    message.msg = object.msg ?? '';
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseDashUserSettingsState(): DashUserSettingsState {
  return { email: '', urls: undefined, flashes: [] };
}

export const DashUserSettingsState = {
  encode(message: DashUserSettingsState, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.email !== '') {
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashUserSettingsState();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.email = reader.string();
          break;
        case 6:
          message.urls = DashUserSettingsState_URLs.decode(reader, reader.uint32());
          break;
        case 7:
          message.flashes.push(DashFlash.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DashUserSettingsState {
    return {
      email: isSet(object.email) ? String(object.email) : '',
      urls: isSet(object.urls) ? DashUserSettingsState_URLs.fromJSON(object.urls) : undefined,
      flashes: Array.isArray(object?.flashes) ? object.flashes.map((e: any) => DashFlash.fromJSON(e)) : [],
    };
  },

  toJSON(message: DashUserSettingsState): unknown {
    const obj: any = {};
    message.email !== undefined && (obj.email = message.email);
    message.urls !== undefined &&
      (obj.urls = message.urls ? DashUserSettingsState_URLs.toJSON(message.urls) : undefined);
    if (message.flashes) {
      obj.flashes = message.flashes.map((e) => (e ? DashFlash.toJSON(e) : undefined));
    } else {
      obj.flashes = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashUserSettingsState>, I>>(object: I): DashUserSettingsState {
    const message = createBaseDashUserSettingsState();
    message.email = object.email ?? '';
    message.urls =
      object.urls !== undefined && object.urls !== null
        ? DashUserSettingsState_URLs.fromPartial(object.urls)
        : undefined;
    message.flashes = object.flashes?.map((e) => DashFlash.fromPartial(e)) || [];
    return message;
  },
};

function createBaseDashUserSettingsState_URLs(): DashUserSettingsState_URLs {
  return { connectGoogle: '', connectGithub: '' };
}

export const DashUserSettingsState_URLs = {
  encode(message: DashUserSettingsState_URLs, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.connectGoogle !== '') {
      writer.uint32(10).string(message.connectGoogle);
    }
    if (message.connectGithub !== '') {
      writer.uint32(18).string(message.connectGithub);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashUserSettingsState_URLs {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashUserSettingsState_URLs();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.connectGoogle = reader.string();
          break;
        case 2:
          message.connectGithub = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DashUserSettingsState_URLs {
    return {
      connectGoogle: isSet(object.connectGoogle) ? String(object.connectGoogle) : '',
      connectGithub: isSet(object.connectGithub) ? String(object.connectGithub) : '',
    };
  },

  toJSON(message: DashUserSettingsState_URLs): unknown {
    const obj: any = {};
    message.connectGoogle !== undefined && (obj.connectGoogle = message.connectGoogle);
    message.connectGithub !== undefined && (obj.connectGithub = message.connectGithub);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashUserSettingsState_URLs>, I>>(object: I): DashUserSettingsState_URLs {
    const message = createBaseDashUserSettingsState_URLs();
    message.connectGoogle = object.connectGoogle ?? '';
    message.connectGithub = object.connectGithub ?? '';
    return message;
  },
};

function createBaseDashCred(): DashCred {
  return { description: '', metadata: '', token: '', id: '' };
}

export const DashCred = {
  encode(message: DashCred, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== '') {
      writer.uint32(18).string(message.description);
    }
    if (message.metadata !== '') {
      writer.uint32(26).string(message.metadata);
    }
    if (message.token !== '') {
      writer.uint32(34).string(message.token);
    }
    if (message.id !== '') {
      writer.uint32(58).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashCred {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashCred();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 4:
          message.token = reader.string();
          break;
        case 7:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DashCred {
    return {
      description: isSet(object.description) ? String(object.description) : '',
      metadata: isSet(object.metadata) ? String(object.metadata) : '',
      token: isSet(object.token) ? String(object.token) : '',
      id: isSet(object.id) ? String(object.id) : '',
    };
  },

  toJSON(message: DashCred): unknown {
    const obj: any = {};
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.token !== undefined && (obj.token = message.token);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashCred>, I>>(object: I): DashCred {
    const message = createBaseDashCred();
    message.description = object.description ?? '';
    message.metadata = object.metadata ?? '';
    message.token = object.token ?? '';
    message.id = object.id ?? '';
    return message;
  },
};

function createBaseDashAPICredsCreateReq(): DashAPICredsCreateReq {
  return { description: '', metadata: '' };
}

export const DashAPICredsCreateReq = {
  encode(message: DashAPICredsCreateReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.description !== '') {
      writer.uint32(10).string(message.description);
    }
    if (message.metadata !== '') {
      writer.uint32(18).string(message.metadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashAPICredsCreateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashAPICredsCreateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.description = reader.string();
          break;
        case 2:
          message.metadata = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DashAPICredsCreateReq {
    return {
      description: isSet(object.description) ? String(object.description) : '',
      metadata: isSet(object.metadata) ? String(object.metadata) : '',
    };
  },

  toJSON(message: DashAPICredsCreateReq): unknown {
    const obj: any = {};
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashAPICredsCreateReq>, I>>(object: I): DashAPICredsCreateReq {
    const message = createBaseDashAPICredsCreateReq();
    message.description = object.description ?? '';
    message.metadata = object.metadata ?? '';
    return message;
  },
};

function createBaseDashAPICredsUpdateReq(): DashAPICredsUpdateReq {
  return { credSid: '', description: '', metadata: '', id: '' };
}

export const DashAPICredsUpdateReq = {
  encode(message: DashAPICredsUpdateReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credSid !== '') {
      writer.uint32(10).string(message.credSid);
    }
    if (message.description !== '') {
      writer.uint32(18).string(message.description);
    }
    if (message.metadata !== '') {
      writer.uint32(26).string(message.metadata);
    }
    if (message.id !== '') {
      writer.uint32(42).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashAPICredsUpdateReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashAPICredsUpdateReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credSid = reader.string();
          break;
        case 2:
          message.description = reader.string();
          break;
        case 3:
          message.metadata = reader.string();
          break;
        case 5:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DashAPICredsUpdateReq {
    return {
      credSid: isSet(object.credSid) ? String(object.credSid) : '',
      description: isSet(object.description) ? String(object.description) : '',
      metadata: isSet(object.metadata) ? String(object.metadata) : '',
      id: isSet(object.id) ? String(object.id) : '',
    };
  },

  toJSON(message: DashAPICredsUpdateReq): unknown {
    const obj: any = {};
    message.credSid !== undefined && (obj.credSid = message.credSid);
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashAPICredsUpdateReq>, I>>(object: I): DashAPICredsUpdateReq {
    const message = createBaseDashAPICredsUpdateReq();
    message.credSid = object.credSid ?? '';
    message.description = object.description ?? '';
    message.metadata = object.metadata ?? '';
    message.id = object.id ?? '';
    return message;
  },
};

function createBaseDashAPICredsDeleteReq(): DashAPICredsDeleteReq {
  return { credSid: '', id: '' };
}

export const DashAPICredsDeleteReq = {
  encode(message: DashAPICredsDeleteReq, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.credSid !== '') {
      writer.uint32(10).string(message.credSid);
    }
    if (message.id !== '') {
      writer.uint32(26).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DashAPICredsDeleteReq {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDashAPICredsDeleteReq();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.credSid = reader.string();
          break;
        case 3:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): DashAPICredsDeleteReq {
    return {
      credSid: isSet(object.credSid) ? String(object.credSid) : '',
      id: isSet(object.id) ? String(object.id) : '',
    };
  },

  toJSON(message: DashAPICredsDeleteReq): unknown {
    const obj: any = {};
    message.credSid !== undefined && (obj.credSid = message.credSid);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashAPICredsDeleteReq>, I>>(object: I): DashAPICredsDeleteReq {
    const message = createBaseDashAPICredsDeleteReq();
    message.credSid = object.credSid ?? '';
    message.id = object.id ?? '';
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
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
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

  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = createBaseEmpty();
    return message;
  },
};

export interface DashState {
  UserSettings(request: Empty): Promise<DashUserSettingsState>;
  ActiveUserSettingsStream(request: Empty): Observable<DashUserSettingsState>;
}

export class DashStateClientImpl implements DashState {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UserSettings = this.UserSettings.bind(this);
    this.ActiveUserSettingsStream = this.ActiveUserSettingsStream.bind(this);
  }
  UserSettings(request: Empty): Promise<DashUserSettingsState> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request('rpx.DashState', 'UserSettings', data);
    return promise.then((data) => DashUserSettingsState.decode(new _m0.Reader(data)));
  }

  ActiveUserSettingsStream(request: Empty): Observable<DashUserSettingsState> {
    const data = Empty.encode(request).finish();
    const result = this.rpc.serverStreamingRequest('rpx.DashState', 'ActiveUserSettingsStream', data);
    return result.pipe(map((data) => DashUserSettingsState.decode(new _m0.Reader(data))));
  }
}

/**
 * ----------------------
 * API Creds
 * ----------------------
 */
export interface DashAPICreds {
  Create(request: DashAPICredsCreateReq): Promise<DashCred>;
  Update(request: DashAPICredsUpdateReq): Promise<DashCred>;
  Delete(request: DashAPICredsDeleteReq): Promise<DashCred>;
}

export class DashAPICredsClientImpl implements DashAPICreds {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Create = this.Create.bind(this);
    this.Update = this.Update.bind(this);
    this.Delete = this.Delete.bind(this);
  }
  Create(request: DashAPICredsCreateReq): Promise<DashCred> {
    const data = DashAPICredsCreateReq.encode(request).finish();
    const promise = this.rpc.request('rpx.DashAPICreds', 'Create', data);
    return promise.then((data) => DashCred.decode(new _m0.Reader(data)));
  }

  Update(request: DashAPICredsUpdateReq): Promise<DashCred> {
    const data = DashAPICredsUpdateReq.encode(request).finish();
    const promise = this.rpc.request('rpx.DashAPICreds', 'Update', data);
    return promise.then((data) => DashCred.decode(new _m0.Reader(data)));
  }

  Delete(request: DashAPICredsDeleteReq): Promise<DashCred> {
    const data = DashAPICredsDeleteReq.encode(request).finish();
    const promise = this.rpc.request('rpx.DashAPICreds', 'Delete', data);
    return promise.then((data) => DashCred.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}

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
