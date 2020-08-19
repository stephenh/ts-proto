import { ID, Empty } from './types';
import { grpc } from '@improbable-eng/grpc-web';
import { Writer, Reader } from 'protobufjs/minimal';


export interface DashFlash {
  msg: string;
  type: DashFlash_Type;
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
  id: ID | undefined;
}

export interface DashAPICredsCreateReq {
  description: string;
  metadata: string;
}

export interface DashAPICredsUpdateReq {
  credSid: string;
  description: string;
  metadata: string;
  id: ID | undefined;
}

export interface DashAPICredsDeleteReq {
  credSid: string;
  id: ID | undefined;
}

const baseDashFlash: object = {
  msg: "",
  type: 0,
};

const baseDashUserSettingsState: object = {
  email: "",
};

const baseDashUserSettingsState_URLs: object = {
  connectGoogle: "",
  connectGithub: "",
};

const baseDashCred: object = {
  description: "",
  metadata: "",
  token: "",
};

const baseDashAPICredsCreateReq: object = {
  description: "",
  metadata: "",
};

const baseDashAPICredsUpdateReq: object = {
  credSid: "",
  description: "",
  metadata: "",
};

const baseDashAPICredsDeleteReq: object = {
  credSid: "",
};

export interface DashState {

  UserSettings(request: Empty): Promise<DashUserSettingsState>;

}

export class DashStateClientImpl implements DashState {

  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  UserSettings(request: Empty): Promise<DashUserSettingsState> {
    return this.rpc.unary(DashStateUserSettingsMetadata, request);
  }

}

/**
 * ----------------------
 *  API Creds
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
    return this.rpc.unary(DashAPICredsCreateMetadata, request);
  }

  Update(request: DashAPICredsUpdateReq): Promise<DashCred> {
    return this.rpc.unary(DashAPICredsUpdateMetadata, request);
  }

  Delete(request: DashAPICredsDeleteReq): Promise<DashCred> {
    return this.rpc.unary(DashAPICredsDeleteMetadata, request);
  }

}

interface Rpc {

  unary<T extends UnaryMethodDefinitionish>(metadata: T, request: any): Promise<any>;

}

export class GrpcWebImpl implements Rpc {

  private host: string;

  private options: { transport?: grpc.TransportFactory, debug?: boolean };

  constructor(host: string, options: { transport?: grpc.TransportFactory, debug?: boolean }) {
    this.host = host;
    this.options = options;
  }

  unary<T extends UnaryMethodDefinitionish>(metadata: T, _request: any): Promise<any> {
    const request = { ..._request, ...metadata.requestType };
    return new Promise((reject, resolve) => {
      grpc.unary(metadata, {
        request,
        host: this.host,
        metadata: metadata,
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
    default:
      return "UNKNOWN";
  }
}

export const DashFlash = {
  encode(message: DashFlash, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.msg);
    writer.uint32(16).int32(message.type);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DashFlash {
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
      message.msg = "";
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
      message.msg = "";
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
    obj.msg = message.msg || "";
    obj.type = dashFlash_TypeToJSON(message.type);
    return obj;
  },
};

export const DashUserSettingsState = {
  encode(message: DashUserSettingsState, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.email);
    if (message.urls !== undefined && message.urls !== undefined) {
      DashUserSettingsState_URLs.encode(message.urls, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.flashes) {
      DashFlash.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DashUserSettingsState {
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
      message.email = "";
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
      message.email = "";
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
    obj.email = message.email || "";
    obj.urls = message.urls ? DashUserSettingsState_URLs.toJSON(message.urls) : undefined;
    if (message.flashes) {
      obj.flashes = message.flashes.map(e => e ? DashFlash.toJSON(e) : undefined);
    } else {
      obj.flashes = [];
    }
    return obj;
  },
};

export const DashUserSettingsState_URLs = {
  encode(message: DashUserSettingsState_URLs, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.connectGoogle);
    writer.uint32(18).string(message.connectGithub);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DashUserSettingsState_URLs {
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
      message.connectGoogle = "";
    }
    if (object.connectGithub !== undefined && object.connectGithub !== null) {
      message.connectGithub = String(object.connectGithub);
    } else {
      message.connectGithub = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<DashUserSettingsState_URLs>): DashUserSettingsState_URLs {
    const message = { ...baseDashUserSettingsState_URLs } as DashUserSettingsState_URLs;
    if (object.connectGoogle !== undefined && object.connectGoogle !== null) {
      message.connectGoogle = object.connectGoogle;
    } else {
      message.connectGoogle = "";
    }
    if (object.connectGithub !== undefined && object.connectGithub !== null) {
      message.connectGithub = object.connectGithub;
    } else {
      message.connectGithub = "";
    }
    return message;
  },
  toJSON(message: DashUserSettingsState_URLs): unknown {
    const obj: any = {};
    obj.connectGoogle = message.connectGoogle || "";
    obj.connectGithub = message.connectGithub || "";
    return obj;
  },
};

export const DashCred = {
  encode(message: DashCred, writer: Writer = Writer.create()): Writer {
    writer.uint32(18).string(message.description);
    writer.uint32(26).string(message.metadata);
    writer.uint32(34).string(message.token);
    if (message.id !== undefined && message.id !== undefined) {
      ID.encode(message.id, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DashCred {
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
          message.id = ID.decode(reader, reader.uint32());
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
      message.description = "";
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    } else {
      message.metadata = "";
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = String(object.token);
    } else {
      message.token = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = ID.fromJSON(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DashCred>): DashCred {
    const message = { ...baseDashCred } as DashCred;
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    } else {
      message.metadata = "";
    }
    if (object.token !== undefined && object.token !== null) {
      message.token = object.token;
    } else {
      message.token = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = ID.fromPartial(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },
  toJSON(message: DashCred): unknown {
    const obj: any = {};
    obj.description = message.description || "";
    obj.metadata = message.metadata || "";
    obj.token = message.token || "";
    obj.id = message.id ? ID.toJSON(message.id) : undefined;
    return obj;
  },
};

export const DashAPICredsCreateReq = {
  encode(message: DashAPICredsCreateReq, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.description);
    writer.uint32(18).string(message.metadata);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DashAPICredsCreateReq {
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
      message.description = "";
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    } else {
      message.metadata = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<DashAPICredsCreateReq>): DashAPICredsCreateReq {
    const message = { ...baseDashAPICredsCreateReq } as DashAPICredsCreateReq;
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    } else {
      message.metadata = "";
    }
    return message;
  },
  toJSON(message: DashAPICredsCreateReq): unknown {
    const obj: any = {};
    obj.description = message.description || "";
    obj.metadata = message.metadata || "";
    return obj;
  },
};

export const DashAPICredsUpdateReq = {
  encode(message: DashAPICredsUpdateReq, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.credSid);
    writer.uint32(18).string(message.description);
    writer.uint32(26).string(message.metadata);
    if (message.id !== undefined && message.id !== undefined) {
      ID.encode(message.id, writer.uint32(42).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DashAPICredsUpdateReq {
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
          message.id = ID.decode(reader, reader.uint32());
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
      message.credSid = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = String(object.description);
    } else {
      message.description = "";
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = String(object.metadata);
    } else {
      message.metadata = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = ID.fromJSON(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DashAPICredsUpdateReq>): DashAPICredsUpdateReq {
    const message = { ...baseDashAPICredsUpdateReq } as DashAPICredsUpdateReq;
    if (object.credSid !== undefined && object.credSid !== null) {
      message.credSid = object.credSid;
    } else {
      message.credSid = "";
    }
    if (object.description !== undefined && object.description !== null) {
      message.description = object.description;
    } else {
      message.description = "";
    }
    if (object.metadata !== undefined && object.metadata !== null) {
      message.metadata = object.metadata;
    } else {
      message.metadata = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = ID.fromPartial(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },
  toJSON(message: DashAPICredsUpdateReq): unknown {
    const obj: any = {};
    obj.credSid = message.credSid || "";
    obj.description = message.description || "";
    obj.metadata = message.metadata || "";
    obj.id = message.id ? ID.toJSON(message.id) : undefined;
    return obj;
  },
};

export const DashAPICredsDeleteReq = {
  encode(message: DashAPICredsDeleteReq, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.credSid);
    if (message.id !== undefined && message.id !== undefined) {
      ID.encode(message.id, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): DashAPICredsDeleteReq {
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
          message.id = ID.decode(reader, reader.uint32());
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
      message.credSid = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = ID.fromJSON(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<DashAPICredsDeleteReq>): DashAPICredsDeleteReq {
    const message = { ...baseDashAPICredsDeleteReq } as DashAPICredsDeleteReq;
    if (object.credSid !== undefined && object.credSid !== null) {
      message.credSid = object.credSid;
    } else {
      message.credSid = "";
    }
    if (object.id !== undefined && object.id !== null) {
      message.id = ID.fromPartial(object.id);
    } else {
      message.id = undefined;
    }
    return message;
  },
  toJSON(message: DashAPICredsDeleteReq): unknown {
    const obj: any = {};
    obj.credSid = message.credSid || "";
    obj.id = message.id ? ID.toJSON(message.id) : undefined;
    return obj;
  },
};

const DashStateMetadata = {
  serviceName: "rpx.DashState",
}
const DashStateUserSettingsMetadata: UnaryMethodDefinitionish = {
  methodName: "UserSettings",
  service: DashStateMetadata,
  requestStream: false as const,
  responseStream: false as const,
  requestType: {
    serializeBinary: function serializeBinary() {
      return Empty.encode(this).finish();
    }
    ,
  } as any,
  responseType: {
    deserializeBinary: function deserializeBinary(data: Uint8Array) {
      return { ...DashUserSettingsState.decode(data), toObject() { return this; } };
    }
    ,
  } as any,
}
const DashAPICredsMetadata = {
  serviceName: "rpx.DashAPICreds",
}
const DashAPICredsCreateMetadata: UnaryMethodDefinitionish = {
  methodName: "Create",
  service: DashAPICredsMetadata,
  requestStream: false as const,
  responseStream: false as const,
  requestType: {
    serializeBinary: function serializeBinary() {
      return DashAPICredsCreateReq.encode(this).finish();
    }
    ,
  } as any,
  responseType: {
    deserializeBinary: function deserializeBinary(data: Uint8Array) {
      return { ...DashCred.decode(data), toObject() { return this; } };
    }
    ,
  } as any,
}
const DashAPICredsUpdateMetadata: UnaryMethodDefinitionish = {
  methodName: "Update",
  service: DashAPICredsMetadata,
  requestStream: false as const,
  responseStream: false as const,
  requestType: {
    serializeBinary: function serializeBinary() {
      return DashAPICredsUpdateReq.encode(this).finish();
    }
    ,
  } as any,
  responseType: {
    deserializeBinary: function deserializeBinary(data: Uint8Array) {
      return { ...DashCred.decode(data), toObject() { return this; } };
    }
    ,
  } as any,
}
const DashAPICredsDeleteMetadata: UnaryMethodDefinitionish = {
  methodName: "Delete",
  service: DashAPICredsMetadata,
  requestStream: false as const,
  responseStream: false as const,
  requestType: {
    serializeBinary: function serializeBinary() {
      return DashAPICredsDeleteReq.encode(this).finish();
    }
    ,
  } as any,
  responseType: {
    deserializeBinary: function deserializeBinary(data: Uint8Array) {
      return { ...DashCred.decode(data), toObject() { return this; } };
    }
    ,
  } as any,
}
import UnaryMethodDefinition = grpc.UnaryMethodDefinition;
type UnaryMethodDefinitionish = UnaryMethodDefinition<any, any>;

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;