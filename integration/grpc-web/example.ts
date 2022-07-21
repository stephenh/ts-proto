/* eslint-disable */
import { grpc } from '@improbable-eng/grpc-web';
import { BrowserHeaders } from 'browser-headers';
import { share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as _m0 from 'protobufjs/minimal';

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
    case DashFlash_Type.UNRECOGNIZED:
    default:
      return 'UNRECOGNIZED';
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
  UserSettings(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<DashUserSettingsState>;
  ActiveUserSettingsStream(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Observable<DashUserSettingsState>;
  ManyUserSettingsStream(
    request: Observable<DeepPartial<DashUserSettingsState>>,
    options?: {
      metadata?: grpc.Metadata;
      rpcOptions?: grpc.RpcOptions;
    }
  ): Observable<DashUserSettingsState>;
  ChangeUserSettingsStream(
    request: Observable<DeepPartial<DashUserSettingsState>>,
    options?: {
      metadata?: grpc.Metadata;
      rpcOptions?: grpc.RpcOptions;
    }
  ): Observable<DashUserSettingsState>;
}

export class DashStateClientImpl implements DashState {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.UserSettings = this.UserSettings.bind(this);
    this.ActiveUserSettingsStream = this.ActiveUserSettingsStream.bind(this);
    this.ManyUserSettingsStream = this.ManyUserSettingsStream.bind(this);
    this.ChangeUserSettingsStream = this.ChangeUserSettingsStream.bind(this);
  }

  UserSettings(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Promise<DashUserSettingsState> {
    return this.rpc.unary(DashStateUserSettingsDesc, Empty.fromPartial(request), metadata);
  }

  ActiveUserSettingsStream(request: DeepPartial<Empty>, metadata?: grpc.Metadata): Observable<DashUserSettingsState> {
    return this.rpc.invoke(DashStateActiveUserSettingsStreamDesc, Empty.fromPartial(request), metadata);
  }

  ManyUserSettingsStream(
    request: Observable<DeepPartial<DashUserSettingsState>>,
    options?: {
      metadata?: grpc.Metadata;
      rpcOptions?: grpc.RpcOptions;
    }
  ): Observable<DashUserSettingsState> {
    return this.rpc.stream(DashStateManyUserSettingsStreamDesc, request, options?.metadata, options?.rpcOptions);
  }

  ChangeUserSettingsStream(
    request: Observable<DeepPartial<DashUserSettingsState>>,
    options?: {
      metadata?: grpc.Metadata;
      rpcOptions?: grpc.RpcOptions;
    }
  ): Observable<DashUserSettingsState> {
    return this.rpc.stream(DashStateChangeUserSettingsStreamDesc, request, options?.metadata, options?.rpcOptions);
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

export const DashStateActiveUserSettingsStreamDesc: MethodDefinitionish = {
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

export const DashStateManyUserSettingsStreamDesc: MethodDefinitionish = {
  methodName: 'ManyUserSettingsStream',
  service: DashStateDesc,
  requestStream: true,
  responseStream: false,
  requestType: {
    serializeBinary() {
      return DashUserSettingsState.encode(this).finish();
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

export const DashStateChangeUserSettingsStreamDesc: MethodDefinitionish = {
  methodName: 'ChangeUserSettingsStream',
  service: DashStateDesc,
  requestStream: true,
  responseStream: true,
  requestType: {
    serializeBinary() {
      return DashUserSettingsState.encode(this).finish();
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

interface MethodDefinitionishR extends grpc.MethodDefinition<any, any> {
  requestStream: any;
  responseStream: any;
}

type MethodDefinitionish = MethodDefinitionishR;

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
  stream<T extends MethodDefinitionish>(
    methodDesc: T,
    request: Observable<any>,
    metadata: grpc.Metadata | undefined,
    rpcOptions: grpc.RpcOptions | undefined
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
    const upStreamCodes = this.options.upStreamRetryCodes || [];
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
        observer.add(() => client.close());
      };
      upStream();
    }).pipe(share());
  }

  stream<T extends MethodDefinitionish>(
    methodDesc: T,
    _request: Observable<any>,
    metadata: grpc.Metadata | undefined,
    rpcOptions: grpc.RpcOptions | undefined
  ): Observable<any> {
    const defaultOptions = {
      host: this.host,
      debug: rpcOptions?.debug || this.options.debug,
      transport: rpcOptions?.transport || this.options.streamingTransport || this.options.transport,
    };

    let started = false;
    const client = grpc.client(methodDesc, defaultOptions);

    const subscription = _request.subscribe((_req: any) => {
      const request = { ..._req, ...methodDesc.requestType };
      if (!started) {
        client.start(metadata);
        started = true;
      }
      client.send(request);
    });

    subscription.add(() => {
      client.finishSend();
    });

    return new Observable((observer) => {
      client.onEnd((code: grpc.Code, message: string, trailers: grpc.Metadata) => {
        subscription.unsubscribe();
        if (code === 0) {
          observer.complete();
        } else {
          observer.error(new Error(`Error ${code} ${message}`));
        }
      });
      client.onMessage((res: any) => {
        observer.next(res);
      });
      observer.add(() => client.close());
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

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
