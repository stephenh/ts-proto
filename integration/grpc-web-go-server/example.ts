/* eslint-disable */
import { Observable } from 'rxjs';
import { Reader, Writer } from 'protobufjs/minimal';

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
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = String(object.msg);
    } else {
      message.msg = '';
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = dashFlash_TypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    return message;
  },

  fromPartial(object: DeepPartial<DashFlash>): DashFlash {
    const message = { ...baseDashFlash } as DashFlash;
    if (object.msg !== undefined && object.msg !== null) {
      message.msg = object.msg;
    } else {
      message.msg = '';
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    return message;
  },

  toJSON(message: DashFlash): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.type !== undefined && (obj.type = dashFlash_TypeToJSON(message.type));
    return obj;
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
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    message.flashes = [];
    if (object.email !== undefined && object.email !== null) {
      message.email = String(object.email);
    } else {
      message.email = '';
    }
    if (object.urls !== undefined && object.urls !== null) {
      message.urls = DashUserSettingsState_URLs.fromJSON(object.urls);
    } else {
      message.urls = undefined;
    }
    if (object.flashes !== undefined && object.flashes !== null) {
      for (const e of object.flashes) {
        message.flashes.push(DashFlash.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(object: DeepPartial<DashUserSettingsState>): DashUserSettingsState {
    const message = { ...baseDashUserSettingsState } as DashUserSettingsState;
    message.flashes = [];
    if (object.email !== undefined && object.email !== null) {
      message.email = object.email;
    } else {
      message.email = '';
    }
    if (object.urls !== undefined && object.urls !== null) {
      message.urls = DashUserSettingsState_URLs.fromPartial(object.urls);
    } else {
      message.urls = undefined;
    }
    if (object.flashes !== undefined && object.flashes !== null) {
      for (const e of object.flashes) {
        message.flashes.push(DashFlash.fromPartial(e));
      }
    }
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
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    if (object.connectGoogle !== undefined && object.connectGoogle !== null) {
      message.connectGoogle = String(object.connectGoogle);
    } else {
      message.connectGoogle = '';
    }
    if (object.connectGithub !== undefined && object.connectGithub !== null) {
      message.connectGithub = String(object.connectGithub);
    } else {
      message.connectGithub = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<DashUserSettingsState_URLs>): DashUserSettingsState_URLs {
    const message = { ...baseDashUserSettingsState_URLs } as DashUserSettingsState_URLs;
    if (object.connectGoogle !== undefined && object.connectGoogle !== null) {
      message.connectGoogle = object.connectGoogle;
    } else {
      message.connectGoogle = '';
    }
    if (object.connectGithub !== undefined && object.connectGithub !== null) {
      message.connectGithub = object.connectGithub;
    } else {
      message.connectGithub = '';
    }
    return message;
  },

  toJSON(message: DashUserSettingsState_URLs): unknown {
    const obj: any = {};
    message.connectGoogle !== undefined && (obj.connectGoogle = message.connectGoogle);
    message.connectGithub !== undefined && (obj.connectGithub = message.connectGithub);
    return obj;
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
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = '';
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    } else {
      message.metadata = '';
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = '';
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<DashCred>): DashCred {
    const message = { ...baseDashCred } as DashCred;
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = '';
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    } else {
      message.metadata = '';
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = '';
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = '';
    }
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
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = '';
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    } else {
      message.metadata = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<DashAPICredsCreateReq>): DashAPICredsCreateReq {
    const message = { ...baseDashAPICredsCreateReq } as DashAPICredsCreateReq;
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = '';
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    } else {
      message.metadata = '';
    }
    return message;
  },

  toJSON(message: DashAPICredsCreateReq): unknown {
    const obj: any = {};
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
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
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    if (object.credSid !== undefined && object.credSid !== null) {
      message.credSid = String(object.credSid);
    } else {
      message.credSid = '';
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = '';
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    } else {
      message.metadata = '';
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<DashAPICredsUpdateReq>): DashAPICredsUpdateReq {
    const message = { ...baseDashAPICredsUpdateReq } as DashAPICredsUpdateReq;
    if (object.credSid !== undefined && object.credSid !== null) {
      message.credSid = object.credSid;
    } else {
      message.credSid = '';
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = '';
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    } else {
      message.metadata = '';
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = '';
    }
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
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
    if (object.credSid !== undefined && object.credSid !== null) {
      message.credSid = String(object.credSid);
    } else {
      message.credSid = '';
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = '';
    }
    return message;
  },

  fromPartial(object: DeepPartial<DashAPICredsDeleteReq>): DashAPICredsDeleteReq {
    const message = { ...baseDashAPICredsDeleteReq } as DashAPICredsDeleteReq;
    if (object.credSid !== undefined && object.credSid !== null) {
      message.credSid = object.credSid;
    } else {
      message.credSid = '';
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = '';
    }
    return message;
  },

  toJSON(message: DashAPICredsDeleteReq): unknown {
    const obj: any = {};
    message.credSid !== undefined && (obj.credSid = message.credSid);
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
};

const baseEmpty: object = {};

export const Empty = {
  encode(_: Empty, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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

  fromPartial(_: DeepPartial<Empty>): Empty {
    const message = { ...baseEmpty } as Empty;
    return message;
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
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
  }
  UserSettings(request: Empty): Promise<DashUserSettingsState> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request('rpx.DashState', 'UserSettings', data);
    return promise.then((data) => DashUserSettingsState.decode(new Reader(data)));
  }

  ActiveUserSettingsStream(request: Empty): Promise<DashUserSettingsState> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request('rpx.DashState', 'ActiveUserSettingsStream', data);
    return promise.then((data) => DashUserSettingsState.decode(new Reader(data)));
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
}

type Builtin = Date | Function | Uint8Array | string | number | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
