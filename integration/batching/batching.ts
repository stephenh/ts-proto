import { Reader, Writer } from 'protobufjs/minimal';


export interface BatchQueryRequest {
  ids: string[];
}

export interface BatchQueryResponse {
  entities: Entity[];
}

export interface BatchMapQueryRequest {
  ids: string[];
}

export interface BatchMapQueryResponse {
  entities: { [key: string]: Entity };
}

export interface BatchMapQueryResponse_EntitiesEntry {
  key: string;
  value: Entity | undefined;
}

export interface GetOnlyMethodRequest {
  id: string;
}

export interface GetOnlyMethodResponse {
  entity: Entity | undefined;
}

export interface WriteMethodRequest {
  id: string;
}

export interface WriteMethodResponse {
}

export interface Entity {
  id: string;
  name: string;
}

const baseBatchQueryRequest: object = {
  ids: "",
};

const baseBatchQueryResponse: object = {
  entities: undefined,
};

const baseBatchMapQueryRequest: object = {
  ids: "",
};

const baseBatchMapQueryResponse: object = {
  entities: undefined,
};

const baseBatchMapQueryResponse_EntitiesEntry: object = {
  key: "",
  value: undefined,
};

const baseGetOnlyMethodRequest: object = {
  id: "",
};

const baseGetOnlyMethodResponse: object = {
  entity: undefined,
};

const baseWriteMethodRequest: object = {
  id: "",
};

const baseWriteMethodResponse: object = {
};

const baseEntity: object = {
  id: "",
  name: "",
};

export interface EntityService {

  BatchQuery(request: BatchQueryRequest): Promise<BatchQueryResponse>;

  BatchMapQuery(request: BatchMapQueryRequest): Promise<BatchMapQueryResponse>;

  /**
   *  Add a method that is not batchable to show it's still cached
   */
  GetOnlyMethod(request: GetOnlyMethodRequest): Promise<GetOnlyMethodResponse>;

  /**
   *  Add a method that won't get cached
   */
  WriteMethod(request: WriteMethodRequest): Promise<WriteMethodResponse>;

}

export class EntityServiceClientImpl implements EntityService {

  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  BatchQuery(request: BatchQueryRequest): Promise<BatchQueryResponse> {
    const data = BatchQueryRequest.encode(request).finish();
    const promise = this.rpc.request("batching.EntityService", "BatchQuery", data);
    return promise.then(data => BatchQueryResponse.decode(new Reader(data)));
  }

  BatchMapQuery(request: BatchMapQueryRequest): Promise<BatchMapQueryResponse> {
    const data = BatchMapQueryRequest.encode(request).finish();
    const promise = this.rpc.request("batching.EntityService", "BatchMapQuery", data);
    return promise.then(data => BatchMapQueryResponse.decode(new Reader(data)));
  }

  GetOnlyMethod(request: GetOnlyMethodRequest): Promise<GetOnlyMethodResponse> {
    const data = GetOnlyMethodRequest.encode(request).finish();
    const promise = this.rpc.request("batching.EntityService", "GetOnlyMethod", data);
    return promise.then(data => GetOnlyMethodResponse.decode(new Reader(data)));
  }

  WriteMethod(request: WriteMethodRequest): Promise<WriteMethodResponse> {
    const data = WriteMethodRequest.encode(request).finish();
    const promise = this.rpc.request("batching.EntityService", "WriteMethod", data);
    return promise.then(data => WriteMethodResponse.decode(new Reader(data)));
  }

}

interface Rpc {

  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;

}

export const BatchQueryRequest = {
  encode(message: BatchQueryRequest, writer: Writer = Writer.create()): Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): BatchQueryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBatchQueryRequest) as BatchQueryRequest;
    message.ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BatchQueryRequest {
    const message = Object.create(baseBatchQueryRequest) as BatchQueryRequest;
    message.ids = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<BatchQueryRequest>): BatchQueryRequest {
    const message = Object.create(baseBatchQueryRequest) as BatchQueryRequest;
    message.ids = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(e);
      }
    }
    return message;
  },
  toJSON(message: BatchQueryRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map(e => e || "");
    } else {
      obj.ids = [];
    }
    return obj;
  },
};

export const BatchQueryResponse = {
  encode(message: BatchQueryResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.entities) {
      Entity.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): BatchQueryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBatchQueryResponse) as BatchQueryResponse;
    message.entities = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entities.push(Entity.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BatchQueryResponse {
    const message = Object.create(baseBatchQueryResponse) as BatchQueryResponse;
    message.entities = [];
    if (object.entities !== undefined && object.entities !== null) {
      for (const e of object.entities) {
        message.entities.push(Entity.fromJSON(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<BatchQueryResponse>): BatchQueryResponse {
    const message = Object.create(baseBatchQueryResponse) as BatchQueryResponse;
    message.entities = [];
    if (object.entities !== undefined && object.entities !== null) {
      for (const e of object.entities) {
        message.entities.push(Entity.fromPartial(e));
      }
    }
    return message;
  },
  toJSON(message: BatchQueryResponse): unknown {
    const obj: any = {};
    if (message.entities) {
      obj.entities = message.entities.map(e => e ? Entity.toJSON(e) : undefined);
    } else {
      obj.entities = [];
    }
    return obj;
  },
};

export const BatchMapQueryRequest = {
  encode(message: BatchMapQueryRequest, writer: Writer = Writer.create()): Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): BatchMapQueryRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBatchMapQueryRequest) as BatchMapQueryRequest;
    message.ids = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ids.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BatchMapQueryRequest {
    const message = Object.create(baseBatchMapQueryRequest) as BatchMapQueryRequest;
    message.ids = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<BatchMapQueryRequest>): BatchMapQueryRequest {
    const message = Object.create(baseBatchMapQueryRequest) as BatchMapQueryRequest;
    message.ids = [];
    if (object.ids !== undefined && object.ids !== null) {
      for (const e of object.ids) {
        message.ids.push(e);
      }
    }
    return message;
  },
  toJSON(message: BatchMapQueryRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map(e => e || "");
    } else {
      obj.ids = [];
    }
    return obj;
  },
};

export const BatchMapQueryResponse = {
  encode(message: BatchMapQueryResponse, writer: Writer = Writer.create()): Writer {
    Object.entries(message.entities).forEach(([key, value]) => {
      BatchMapQueryResponse_EntitiesEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): BatchMapQueryResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBatchMapQueryResponse) as BatchMapQueryResponse;
    message.entities = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = BatchMapQueryResponse_EntitiesEntry.decode(reader, reader.uint32());
          if (entry1.value) {
            message.entities[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BatchMapQueryResponse {
    const message = Object.create(baseBatchMapQueryResponse) as BatchMapQueryResponse;
    message.entities = {};
    if (object.entities !== undefined && object.entities !== null) {
      Object.entries(object.entities).forEach(([key, value]) => {
        message.entities[key] = Entity.fromJSON(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<BatchMapQueryResponse>): BatchMapQueryResponse {
    const message = Object.create(baseBatchMapQueryResponse) as BatchMapQueryResponse;
    message.entities = {};
    if (object.entities !== undefined && object.entities !== null) {
      Object.entries(object.entities).forEach(([key, value]) => {
        if (value) {
          message.entities[key] = Entity.fromPartial(value);
        }
      })
    }
    return message;
  },
  toJSON(message: BatchMapQueryResponse): unknown {
    const obj: any = {};
    obj.entities = message.entities || undefined;
    return obj;
  },
};

export const BatchMapQueryResponse_EntitiesEntry = {
  encode(message: BatchMapQueryResponse_EntitiesEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    if (message.value !== undefined && message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): BatchMapQueryResponse_EntitiesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBatchMapQueryResponse_EntitiesEntry) as BatchMapQueryResponse_EntitiesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Entity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BatchMapQueryResponse_EntitiesEntry {
    const message = Object.create(baseBatchMapQueryResponse_EntitiesEntry) as BatchMapQueryResponse_EntitiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Entity.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<BatchMapQueryResponse_EntitiesEntry>): BatchMapQueryResponse_EntitiesEntry {
    const message = Object.create(baseBatchMapQueryResponse_EntitiesEntry) as BatchMapQueryResponse_EntitiesEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Entity.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
  toJSON(message: BatchMapQueryResponse_EntitiesEntry): unknown {
    const obj: any = {};
    obj.key = message.key || "";
    obj.value = message.value ? Entity.toJSON(message.value) : undefined;
    return obj;
  },
};

export const GetOnlyMethodRequest = {
  encode(message: GetOnlyMethodRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): GetOnlyMethodRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetOnlyMethodRequest) as GetOnlyMethodRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetOnlyMethodRequest {
    const message = Object.create(baseGetOnlyMethodRequest) as GetOnlyMethodRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetOnlyMethodRequest>): GetOnlyMethodRequest {
    const message = Object.create(baseGetOnlyMethodRequest) as GetOnlyMethodRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
  toJSON(message: GetOnlyMethodRequest): unknown {
    const obj: any = {};
    obj.id = message.id || "";
    return obj;
  },
};

export const GetOnlyMethodResponse = {
  encode(message: GetOnlyMethodResponse, writer: Writer = Writer.create()): Writer {
    if (message.entity !== undefined && message.entity !== undefined) {
      Entity.encode(message.entity, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): GetOnlyMethodResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseGetOnlyMethodResponse) as GetOnlyMethodResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entity = Entity.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): GetOnlyMethodResponse {
    const message = Object.create(baseGetOnlyMethodResponse) as GetOnlyMethodResponse;
    if (object.entity !== undefined && object.entity !== null) {
      message.entity = Entity.fromJSON(object.entity);
    } else {
      message.entity = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<GetOnlyMethodResponse>): GetOnlyMethodResponse {
    const message = Object.create(baseGetOnlyMethodResponse) as GetOnlyMethodResponse;
    if (object.entity !== undefined && object.entity !== null) {
      message.entity = Entity.fromPartial(object.entity);
    } else {
      message.entity = undefined;
    }
    return message;
  },
  toJSON(message: GetOnlyMethodResponse): unknown {
    const obj: any = {};
    obj.entity = message.entity ? Entity.toJSON(message.entity) : undefined;
    return obj;
  },
};

export const WriteMethodRequest = {
  encode(message: WriteMethodRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): WriteMethodRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseWriteMethodRequest) as WriteMethodRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): WriteMethodRequest {
    const message = Object.create(baseWriteMethodRequest) as WriteMethodRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<WriteMethodRequest>): WriteMethodRequest {
    const message = Object.create(baseWriteMethodRequest) as WriteMethodRequest;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    return message;
  },
  toJSON(message: WriteMethodRequest): unknown {
    const obj: any = {};
    obj.id = message.id || "";
    return obj;
  },
};

export const WriteMethodResponse = {
  encode(_: WriteMethodResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): WriteMethodResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseWriteMethodResponse) as WriteMethodResponse;
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
  fromJSON(_: any): WriteMethodResponse {
    const message = Object.create(baseWriteMethodResponse) as WriteMethodResponse;
    return message;
  },
  fromPartial(_: DeepPartial<WriteMethodResponse>): WriteMethodResponse {
    const message = Object.create(baseWriteMethodResponse) as WriteMethodResponse;
    return message;
  },
  toJSON(_: WriteMethodResponse): unknown {
    const obj: any = {};
    return obj;
  },
};

export const Entity = {
  encode(message: Entity, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.id);
    writer.uint32(18).string(message.name);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Entity {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseEntity) as Entity;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Entity {
    const message = Object.create(baseEntity) as Entity;
    if (object.id !== undefined && object.id !== null) {
      message.id = String(object.id);
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Entity>): Entity {
    const message = Object.create(baseEntity) as Entity;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = "";
    }
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
  toJSON(message: Entity): unknown {
    const obj: any = {};
    obj.id = message.id || "";
    obj.name = message.name || "";
    return obj;
  },
};

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