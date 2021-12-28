/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'batching';

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

export interface WriteMethodResponse {}

export interface Entity {
  id: string;
  name: string;
}

function createBaseBatchQueryRequest(): BatchQueryRequest {
  return { ids: [] };
}

export const BatchQueryRequest = {
  encode(message: BatchQueryRequest, writer: Writer = Writer.create()): Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BatchQueryRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchQueryRequest();
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
    const message = createBaseBatchQueryRequest();
    message.ids = (object.ids ?? []).map((e: any) => String(e));
    return message;
  },

  toJSON(message: BatchQueryRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BatchQueryRequest>, I>>(object: I): BatchQueryRequest {
    const message = createBaseBatchQueryRequest();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseBatchQueryResponse(): BatchQueryResponse {
  return { entities: [] };
}

export const BatchQueryResponse = {
  encode(message: BatchQueryResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.entities) {
      Entity.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BatchQueryResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchQueryResponse();
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
    const message = createBaseBatchQueryResponse();
    message.entities = (object.entities ?? []).map((e: any) => Entity.fromJSON(e));
    return message;
  },

  toJSON(message: BatchQueryResponse): unknown {
    const obj: any = {};
    if (message.entities) {
      obj.entities = message.entities.map((e) => (e ? Entity.toJSON(e) : undefined));
    } else {
      obj.entities = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BatchQueryResponse>, I>>(object: I): BatchQueryResponse {
    const message = createBaseBatchQueryResponse();
    message.entities = object.entities?.map((e) => Entity.fromPartial(e)) || [];
    return message;
  },
};

function createBaseBatchMapQueryRequest(): BatchMapQueryRequest {
  return { ids: [] };
}

export const BatchMapQueryRequest = {
  encode(message: BatchMapQueryRequest, writer: Writer = Writer.create()): Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BatchMapQueryRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchMapQueryRequest();
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
    const message = createBaseBatchMapQueryRequest();
    message.ids = (object.ids ?? []).map((e: any) => String(e));
    return message;
  },

  toJSON(message: BatchMapQueryRequest): unknown {
    const obj: any = {};
    if (message.ids) {
      obj.ids = message.ids.map((e) => e);
    } else {
      obj.ids = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BatchMapQueryRequest>, I>>(object: I): BatchMapQueryRequest {
    const message = createBaseBatchMapQueryRequest();
    message.ids = object.ids?.map((e) => e) || [];
    return message;
  },
};

function createBaseBatchMapQueryResponse(): BatchMapQueryResponse {
  return { entities: {} };
}

export const BatchMapQueryResponse = {
  encode(message: BatchMapQueryResponse, writer: Writer = Writer.create()): Writer {
    Object.entries(message.entities).forEach(([key, value]) => {
      BatchMapQueryResponse_EntitiesEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BatchMapQueryResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchMapQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = BatchMapQueryResponse_EntitiesEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
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
    const message = createBaseBatchMapQueryResponse();
    message.entities = Object.entries(object.entities ?? {}).reduce<{ [key: string]: Entity }>((acc, [key, value]) => {
      acc[key] = Entity.fromJSON(value);
      return acc;
    }, {});
    return message;
  },

  toJSON(message: BatchMapQueryResponse): unknown {
    const obj: any = {};
    obj.entities = {};
    if (message.entities) {
      Object.entries(message.entities).forEach(([k, v]) => {
        obj.entities[k] = Entity.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BatchMapQueryResponse>, I>>(object: I): BatchMapQueryResponse {
    const message = createBaseBatchMapQueryResponse();
    message.entities = Object.entries(object.entities ?? {}).reduce<{ [key: string]: Entity }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Entity.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseBatchMapQueryResponse_EntitiesEntry(): BatchMapQueryResponse_EntitiesEntry {
  return { key: '', value: undefined };
}

export const BatchMapQueryResponse_EntitiesEntry = {
  encode(message: BatchMapQueryResponse_EntitiesEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): BatchMapQueryResponse_EntitiesEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchMapQueryResponse_EntitiesEntry();
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
    const message = createBaseBatchMapQueryResponse_EntitiesEntry();
    message.key = object.key !== undefined && object.key !== null ? String(object.key) : '';
    message.value = object.value !== undefined && object.value !== null ? Entity.fromJSON(object.value) : undefined;
    return message;
  },

  toJSON(message: BatchMapQueryResponse_EntitiesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Entity.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<BatchMapQueryResponse_EntitiesEntry>, I>>(
    object: I
  ): BatchMapQueryResponse_EntitiesEntry {
    const message = createBaseBatchMapQueryResponse_EntitiesEntry();
    message.key = object.key ?? '';
    message.value = object.value !== undefined && object.value !== null ? Entity.fromPartial(object.value) : undefined;
    return message;
  },
};

function createBaseGetOnlyMethodRequest(): GetOnlyMethodRequest {
  return { id: '' };
}

export const GetOnlyMethodRequest = {
  encode(message: GetOnlyMethodRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetOnlyMethodRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOnlyMethodRequest();
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
    const message = createBaseGetOnlyMethodRequest();
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : '';
    return message;
  },

  toJSON(message: GetOnlyMethodRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetOnlyMethodRequest>, I>>(object: I): GetOnlyMethodRequest {
    const message = createBaseGetOnlyMethodRequest();
    message.id = object.id ?? '';
    return message;
  },
};

function createBaseGetOnlyMethodResponse(): GetOnlyMethodResponse {
  return { entity: undefined };
}

export const GetOnlyMethodResponse = {
  encode(message: GetOnlyMethodResponse, writer: Writer = Writer.create()): Writer {
    if (message.entity !== undefined) {
      Entity.encode(message.entity, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GetOnlyMethodResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOnlyMethodResponse();
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
    const message = createBaseGetOnlyMethodResponse();
    message.entity = object.entity !== undefined && object.entity !== null ? Entity.fromJSON(object.entity) : undefined;
    return message;
  },

  toJSON(message: GetOnlyMethodResponse): unknown {
    const obj: any = {};
    message.entity !== undefined && (obj.entity = message.entity ? Entity.toJSON(message.entity) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetOnlyMethodResponse>, I>>(object: I): GetOnlyMethodResponse {
    const message = createBaseGetOnlyMethodResponse();
    message.entity =
      object.entity !== undefined && object.entity !== null ? Entity.fromPartial(object.entity) : undefined;
    return message;
  },
};

function createBaseWriteMethodRequest(): WriteMethodRequest {
  return { id: '' };
}

export const WriteMethodRequest = {
  encode(message: WriteMethodRequest, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): WriteMethodRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteMethodRequest();
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
    const message = createBaseWriteMethodRequest();
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : '';
    return message;
  },

  toJSON(message: WriteMethodRequest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteMethodRequest>, I>>(object: I): WriteMethodRequest {
    const message = createBaseWriteMethodRequest();
    message.id = object.id ?? '';
    return message;
  },
};

function createBaseWriteMethodResponse(): WriteMethodResponse {
  return {};
}

export const WriteMethodResponse = {
  encode(_: WriteMethodResponse, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): WriteMethodResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteMethodResponse();
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
    const message = createBaseWriteMethodResponse();
    return message;
  },

  toJSON(_: WriteMethodResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<WriteMethodResponse>, I>>(_: I): WriteMethodResponse {
    const message = createBaseWriteMethodResponse();
    return message;
  },
};

function createBaseEntity(): Entity {
  return { id: '', name: '' };
}

export const Entity = {
  encode(message: Entity, writer: Writer = Writer.create()): Writer {
    if (message.id !== '') {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== '') {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Entity {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntity();
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
    const message = createBaseEntity();
    message.id = object.id !== undefined && object.id !== null ? String(object.id) : '';
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    return message;
  },

  toJSON(message: Entity): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Entity>, I>>(object: I): Entity {
    const message = createBaseEntity();
    message.id = object.id ?? '';
    message.name = object.name ?? '';
    return message;
  },
};

export interface EntityService {
  BatchQuery(request: BatchQueryRequest): Promise<BatchQueryResponse>;
  BatchMapQuery(request: BatchMapQueryRequest): Promise<BatchMapQueryResponse>;
  /** Add a method that is not batchable to show it's still cached */
  GetOnlyMethod(request: GetOnlyMethodRequest): Promise<GetOnlyMethodResponse>;
  /** Add a method that won't get cached */
  WriteMethod(request: WriteMethodRequest): Promise<WriteMethodResponse>;
}

export class EntityServiceClientImpl implements EntityService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.BatchQuery = this.BatchQuery.bind(this);
    this.BatchMapQuery = this.BatchMapQuery.bind(this);
    this.GetOnlyMethod = this.GetOnlyMethod.bind(this);
    this.WriteMethod = this.WriteMethod.bind(this);
  }
  BatchQuery(request: BatchQueryRequest): Promise<BatchQueryResponse> {
    const data = BatchQueryRequest.encode(request).finish();
    const promise = this.rpc.request('batching.EntityService', 'BatchQuery', data);
    return promise.then((data) => BatchQueryResponse.decode(new Reader(data)));
  }

  BatchMapQuery(request: BatchMapQueryRequest): Promise<BatchMapQueryResponse> {
    const data = BatchMapQueryRequest.encode(request).finish();
    const promise = this.rpc.request('batching.EntityService', 'BatchMapQuery', data);
    return promise.then((data) => BatchMapQueryResponse.decode(new Reader(data)));
  }

  GetOnlyMethod(request: GetOnlyMethodRequest): Promise<GetOnlyMethodResponse> {
    const data = GetOnlyMethodRequest.encode(request).finish();
    const promise = this.rpc.request('batching.EntityService', 'GetOnlyMethod', data);
    return promise.then((data) => GetOnlyMethodResponse.decode(new Reader(data)));
  }

  WriteMethod(request: WriteMethodRequest): Promise<WriteMethodResponse> {
    const data = WriteMethodRequest.encode(request).finish();
    const promise = this.rpc.request('batching.EntityService', 'WriteMethod', data);
    return promise.then((data) => WriteMethodResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
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
