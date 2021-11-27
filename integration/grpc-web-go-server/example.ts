/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
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

const baseDashFlash: object = { msg: '', type: 0 };

export const DashFlash = {
  encode(message: DashFlash, writer: Writer = Writer.create()): Writer {
    if (message.msg !== '') {
      writer.uint32(10).string(message.msg);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DashFlash {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDashFlash } as DashFlash;
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
    const message = { ...baseDashFlash } as DashFlash;
    message.msg = object.msg !== undefined && object.msg !== null ? String(object.msg) : '';
    message.type = object.type !== undefined && object.type !== null ? dashFlash_TypeFromJSON(object.type) : 0;
    return message;
  },

  toJSON(message: DashFlash): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.type !== undefined && (obj.type = dashFlash_TypeToJSON(message.type));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashFlash>, I>>(object: I): DashFlash {
    const message = { ...baseDashFlash } as DashFlash;
    message.msg = object.msg ?? '';
    message.type = object.type ?? 0;
    return message;
  },
};

const baseDashUserSettingsState: object = { email: '' };

export const DashUserSettingsState = {
  encode(message: DashUserSettingsState, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): DashUserSettingsState {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDashUserSettingsState } as DashUserSettingsState;
    message.flashes = [];
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
    const message = { ...baseDashUserSettingsState } as DashUserSettingsState;
    message.email = object.email !== undefined && object.email !== null ? String(object.email) : '';
    message.urls =
      object.urls !== undefined && object.urls !== null ? DashUserSettingsState_URLs.fromJSON(object.urls) : undefined;
    message.flashes = (object.flashes ?? []).map((e: any) => DashFlash.fromJSON(e));
    return message;
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
    const message = { ...baseDashUserSettingsState } as DashUserSettingsState;
    message.email = object.email ?? '';
    message.urls =
      object.urls !== undefined && object.urls !== null
        ? DashUserSettingsState_URLs.fromPartial(object.urls)
        : undefined;
    message.flashes = object.flashes?.map((e) => DashFlash.fromPartial(e)) || [];
    return message;
  },
};

const baseDashUserSettingsState_URLs: object = { connectGoogle: '', connectGithub: '' };

export const DashUserSettingsState_URLs = {
  encode(message: DashUserSettingsState_URLs, writer: Writer = Writer.create()): Writer {
    if (message.connectGoogle !== '') {
      writer.uint32(10).string(message.connectGoogle);
    }
    if (message.connectGithub !== '') {
      writer.uint32(18).string(message.connectGithub);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DashUserSettingsState_URLs {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDashUserSettingsState_URLs } as DashUserSettingsState_URLs;
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
    const message = { ...baseDashUserSettingsState_URLs } as DashUserSettingsState_URLs;
    message.connectGoogle =
      object.connectGoogle !== undefined && object.connectGoogle !== null ? String(object.connectGoogle) : '';
    message.connectGithub =
      object.connectGithub !== undefined && object.connectGithub !== null ? String(object.connectGithub) : '';
    return message;
  },

  toJSON(message: DashUserSettingsState_URLs): unknown {
    const obj: any = {};
    message.connectGoogle !== undefined && (obj.connectGoogle = message.connectGoogle);
    message.connectGithub !== undefined && (obj.connectGithub = message.connectGithub);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashUserSettingsState_URLs>, I>>(object: I): DashUserSettingsState_URLs {
    const message = { ...baseDashUserSettingsState_URLs } as DashUserSettingsState_URLs;
    message.connectGoogle = object.connectGoogle ?? '';
    message.connectGithub = object.connectGithub ?? '';
    return message;
  },
};

const baseDashCred: object = { description: '', metadata: '', token: '', id: '' };

export const DashCred = {
  encode(message: DashCred, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): DashCred {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDashCred } as DashCred;
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
    const message = { ...baseDashCred } as DashCred;
    message.description =
      object.description !== undefined && object.description !== null ? String(object.description) : '';
    message.metadata = object.metadata !== undefined && object.metadata !== null ? String(object.metadata) : '';
    message.token = object.token !== undefined && object.token !== null ? String(object.token) : '';
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : '';
    return message;
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
    const message = { ...baseDashCred } as DashCred;
    message.description = object.description ?? '';
    message.metadata = object.metadata ?? '';
    message.token = object.token ?? '';
    message.id = object.id ?? '';
    return message;
  },
};

const baseDashAPICredsCreateReq: object = { description: '', metadata: '' };

export const DashAPICredsCreateReq = {
  encode(message: DashAPICredsCreateReq, writer: Writer = Writer.create()): Writer {
    if (message.description !== '') {
      writer.uint32(10).string(message.description);
    }
    if (message.metadata !== '') {
      writer.uint32(18).string(message.metadata);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DashAPICredsCreateReq {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDashAPICredsCreateReq } as DashAPICredsCreateReq;
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
    const message = { ...baseDashAPICredsCreateReq } as DashAPICredsCreateReq;
    message.description =
      object.description !== undefined && object.description !== null ? String(object.description) : '';
    message.metadata = object.metadata !== undefined && object.metadata !== null ? String(object.metadata) : '';
    return message;
  },

  toJSON(message: DashAPICredsCreateReq): unknown {
    const obj: any = {};
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashAPICredsCreateReq>, I>>(object: I): DashAPICredsCreateReq {
    const message = { ...baseDashAPICredsCreateReq } as DashAPICredsCreateReq;
    message.description = object.description ?? '';
    message.metadata = object.metadata ?? '';
    return message;
  },
};

const baseDashAPICredsUpdateReq: object = { credSid: '', description: '', metadata: '', id: '' };

export const DashAPICredsUpdateReq = {
  encode(message: DashAPICredsUpdateReq, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): DashAPICredsUpdateReq {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDashAPICredsUpdateReq } as DashAPICredsUpdateReq;
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
    const message = { ...baseDashAPICredsUpdateReq } as DashAPICredsUpdateReq;
    message.credSid = object.credSid !== undefined && object.credSid !== null ? String(object.credSid) : '';
    message.description =
      object.description !== undefined && object.description !== null ? String(object.description) : '';
    message.metadata = object.metadata !== undefined && object.metadata !== null ? String(object.metadata) : '';
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : '';
    return message;
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
    const message = { ...baseDashAPICredsUpdateReq } as DashAPICredsUpdateReq;
    message.credSid = object.credSid ?? '';
    message.description = object.description ?? '';
    message.metadata = object.metadata ?? '';
    message.id = object.id ?? '';
    return message;
  },
};

const baseDashAPICredsDeleteReq: object = { credSid: '', id: '' };

export const DashAPICredsDeleteReq = {
  encode(message: DashAPICredsDeleteReq, writer: Writer = Writer.create()): Writer {
    if (message.credSid !== '') {
      writer.uint32(10).string(message.credSid);
    }
    if (message.id !== '') {
      writer.uint32(26).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DashAPICredsDeleteReq {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDashAPICredsDeleteReq } as DashAPICredsDeleteReq;
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
    const message = { ...baseDashAPICredsDeleteReq } as DashAPICredsDeleteReq;
    message.credSid = object.credSid !== undefined && object.credSid !== null ? String(object.credSid) : '';
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : '';
    return message;
  },

  toJSON(message: DashAPICredsDeleteReq): unknown {
    const obj: any = {};
    message.credSid !== undefined && (obj.credSid = message.credSid);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<DashAPICredsDeleteReq>, I>>(object: I): DashAPICredsDeleteReq {
    const message = { ...baseDashAPICredsDeleteReq } as DashAPICredsDeleteReq;
    message.credSid = object.credSid ?? '';
    message.id = object.id ?? '';
    return message;
  },
};

const baseEmpty: object = {};

export const Empty = {
  encode(_: Empty, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEmpty } as Empty;
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
    const message = { ...baseEmpty } as Empty;
    return message;
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = { ...baseEmpty } as Empty;
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
    return promise.then((data) => DashUserSettingsState.decode(new Reader(data)));
  }

  ActiveUserSettingsStream(request: Empty): Observable<DashUserSettingsState> {
    const data = Empty.encode(request).finish();
    const result = this.rpc.serverStreamingRequest('rpx.DashState', 'ActiveUserSettingsStream', data);
    return result.pipe(map((data) => DashUserSettingsState.decode(new Reader(data))));
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
    return promise.then((data) => DashCred.decode(new Reader(data)));
  }

  Update(request: DashAPICredsUpdateReq): Promise<DashCred> {
    const data = DashAPICredsUpdateReq.encode(request).finish();
    const promise = this.rpc.request('rpx.DashAPICreds', 'Update', data);
    return promise.then((data) => DashCred.decode(new Reader(data)));
  }

  Delete(request: DashAPICredsDeleteReq): Promise<DashCred> {
    const data = DashAPICredsDeleteReq.encode(request).finish();
    const promise = this.rpc.request('rpx.DashAPICreds', 'Delete', data);
    return promise.then((data) => DashCred.decode(new Reader(data)));
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
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
