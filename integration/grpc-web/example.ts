/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { grpc } from '@improbable-eng/grpc-web';
import { Observable } from 'rxjs';
import { BrowserHeaders } from 'browser-headers';
import { share } from 'rxjs/operators';

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

  toJSON(message: DashFlash): unknown {
    const obj: any = {};
    message.msg !== undefined && (obj.msg = message.msg);
    message.type !== undefined && (obj.type = dashFlash_TypeToJSON(message.type));
    return obj;
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

  fromPartial(object: DeepPartial<DashUserSettingsState>): DashUserSettingsState {
    const message = { ...baseDashUserSettingsState } as DashUserSettingsState;
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
    message.flashes = [];
    if (object.flashes !== undefined && object.flashes !== null) {
      for (const e of object.flashes) {
        message.flashes.push(DashFlash.fromPartial(e));
      }
    }
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

  toJSON(message: DashUserSettingsState_URLs): unknown {
    const obj: any = {};
    message.connectGoogle !== undefined && (obj.connectGoogle = message.connectGoogle);
    message.connectGithub !== undefined && (obj.connectGithub = message.connectGithub);
    return obj;
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

  toJSON(message: DashCred): unknown {
    const obj: any = {};
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.token !== undefined && (obj.token = message.token);
    message.id !== undefined && (obj.id = message.id);
    return obj;
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

  toJSON(message: DashAPICredsCreateReq): unknown {
    const obj: any = {};
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    return obj;
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

  toJSON(message: DashAPICredsUpdateReq): unknown {
    const obj: any = {};
    message.credSid !== undefined && (obj.credSid = message.credSid);
    message.description !== undefined && (obj.description = message.description);
    message.metadata !== undefined && (obj.metadata = message.metadata);
    message.id !== undefined && (obj.id = message.id);
    return obj;
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

  toJSON(message: DashAPICredsDeleteReq): unknown {
    const obj: any = {};
    message.credSid !== undefined && (obj.credSid = message.credSid);
    message.id !== undefined && (obj.id = message.id);
    return obj;
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

  fromPartial(_: DeepPartial<Empty>): Empty {
    const message = { ...baseEmpty } as Empty;
    return message;
  },
};

export interface DashState {
  UserSettings(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<DashUserSettingsState>;
  ActiveUserSettingsStream(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Observable<DashUserSettingsState>;
}

export class DashStateClientImpl implements DashState {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UserSettings = this.UserSettings.bind(this);
    this.ActiveUserSettingsStream = this.ActiveUserSettingsStream.bind(this);
  }

  UserSettings(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<DashUserSettingsState> {
    return this.rpc.unary(DashStateUserSettingsDesc, Empty.fromPartial(request), metadata);
  }

  ActiveUserSettingsStream(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Observable<DashUserSettingsState> {
    return this.rpc.invoke(DashStateActiveUserSettingsStreamDesc, Empty.fromPartial(request), metadata);
  }
}

export const DashStateDesc = {
  serviceName: 'rpx.DashState',
};

export const DashStateUserSettingsDesc: UnaryMethodDefinitionish = {
  methodName: 'UserSettings',
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
      return {
        ...DashUserSettingsState.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const DashStateActiveUserSettingsStreamDesc: UnaryMethodDefinitionish = {
  methodName: 'ActiveUserSettingsStream',
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
      return {
        ...DashUserSettingsState.decode(data),
        toObject() {
          return this;
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
  Create(request: DeepPartial<DashAPICredsCreateReq>, metadata?: grpc.Metadata): Promise<DashCred>;
  Update(request: DeepPartial<DashAPICredsUpdateReq>, metadata?: grpc.Metadata): Promise<DashCred>;
  Delete(request: DeepPartial<DashAPICredsDeleteReq>, metadata?: grpc.Metadata): Promise<DashCred>;
}

export class DashAPICredsClientImpl implements DashAPICreds {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.Create = this.Create.bind(this);
    this.Update = this.Update.bind(this);
    this.Delete = this.Delete.bind(this);
  }

  Create(request: DeepPartial<DashAPICredsCreateReq>, metadata?: grpc.Metadata): Promise<DashCred> {
    return this.rpc.unary(DashAPICredsCreateDesc, DashAPICredsCreateReq.fromPartial(request), metadata);
  }

  Update(request: DeepPartial<DashAPICredsUpdateReq>, metadata?: grpc.Metadata): Promise<DashCred> {
    return this.rpc.unary(DashAPICredsUpdateDesc, DashAPICredsUpdateReq.fromPartial(request), metadata);
  }

  Delete(request: DeepPartial<DashAPICredsDeleteReq>, metadata?: grpc.Metadata): Promise<DashCred> {
    return this.rpc.unary(DashAPICredsDeleteDesc, DashAPICredsDeleteReq.fromPartial(request), metadata);
  }
}

export const DashAPICredsDesc = {
  serviceName: 'rpx.DashAPICreds',
};

export const DashAPICredsCreateDesc: UnaryMethodDefinitionish = {
  methodName: 'Create',
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
      return {
        ...DashCred.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const DashAPICredsUpdateDesc: UnaryMethodDefinitionish = {
  methodName: 'Update',
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
      return {
        ...DashCred.decode(data),
        toObject() {
          return this;
        },
      };
    },
  } as any,
};

export const DashAPICredsDeleteDesc: UnaryMethodDefinitionish = {
  methodName: 'Delete',
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
      return {
        ...DashCred.decode(data),
        toObject() {
          return this;
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
    metadata: grpc.Metadata | undefined
  ): Promise<any>;
  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    request: any,
    metadata: grpc.Metadata | undefined
  ): Observable<any>;
}

export class GrpcWebImpl {
  private host: string;
  private options: {
    transport?: grpc.TransportFactory;
    streamingTransport?: grpc.TransportFactory;
    debug?: boolean;
    metadata?: grpc.Metadata;
  };

  constructor(
    host: string,
    options: {
      transport?: grpc.TransportFactory;
      streamingTransport?: grpc.TransportFactory;
      debug?: boolean;
      metadata?: grpc.Metadata;
    }
  ) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Promise<any> {
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
    return new Promise((resolve, reject) => {
      grpc.unary(methodDesc, {
        request,
        host: this.host,
        metadata: maybeCombinedMetadata,
        transport: this.options.transport,
        debug: this.options.debug,
        onEnd: function (response) {
          if (response.status === grpc.Code.OK) {
            resolve(response.message);
          } else {
            const err = new Error(response.statusMessage) as any;
            err.code = response.status;
            err.metadata = response.trailers;
            reject(err);
          }
        },
      });
    });
  }

  invoke<T extends UnaryMethodDefinitionish>(
    methodDesc: T,
    _request: any,
    metadata: grpc.Metadata | undefined
  ): Observable<any> {
    // Status Response Codes (https://developers.google.com/maps-booking/reference/grpc-api/status_codes)
    const upStreamCodes = [2, 4, 8, 9, 10, 13, 14, 15];
    const DEFAULT_TIMEOUT_TIME: number = 3_000;
    const request = { ..._request, ...methodDesc.requestType };
    const maybeCombinedMetadata =
      metadata && this.options.metadata
        ? new BrowserHeaders({ ...this.options?.metadata.headersMap, ...metadata?.headersMap })
        : metadata || this.options.metadata;
    return new Observable((observer) => {
      const upStream = () => {
        const client = grpc.invoke(methodDesc, {
          host: this.host,
          request,
          transport: this.options.streamingTransport || this.options.transport,
          metadata: maybeCombinedMetadata,
          debug: this.options.debug,
          onMessage: (next) => observer.next(next),
          onEnd: (code: grpc.Code, message: string) => {
            if (code === 0) {
              observer.complete();
            } else if (upStreamCodes.includes(code)) {
              setTimeout(upStream, DEFAULT_TIMEOUT_TIME);
            } else {
              observer.error(new Error(`Error ${code} ${message}`));
            }
          },
        });
        observer.add(() => client.close());
      };
      upStream();
    }).pipe(share());
  }
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
