/* eslint-disable */
import * as DataLoader from "dataloader";
import * as hash from "object-hash";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "batching";

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

function createBaseBatchQueryRequest(): BatchQueryRequest {
  return { ids: [] };
}

export const BatchQueryRequest = {
  encode(message: BatchQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchQueryRequest {
    return { ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [] };
  },

  toJSON(message: BatchQueryRequest): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchQueryRequest>, I>>(base?: I): BatchQueryRequest {
    return BatchQueryRequest.fromPartial(base ?? ({} as any));
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
  encode(message: BatchQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entities) {
      Entity.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entities.push(Entity.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchQueryResponse {
    return { entities: Array.isArray(object?.entities) ? object.entities.map((e: any) => Entity.fromJSON(e)) : [] };
  },

  toJSON(message: BatchQueryResponse): unknown {
    const obj: any = {};
    if (message.entities?.length) {
      obj.entities = message.entities.map((e) => Entity.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchQueryResponse>, I>>(base?: I): BatchQueryResponse {
    return BatchQueryResponse.fromPartial(base ?? ({} as any));
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
  encode(message: BatchMapQueryRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchMapQueryRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchMapQueryRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.ids.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchMapQueryRequest {
    return { ids: Array.isArray(object?.ids) ? object.ids.map((e: any) => String(e)) : [] };
  },

  toJSON(message: BatchMapQueryRequest): unknown {
    const obj: any = {};
    if (message.ids?.length) {
      obj.ids = message.ids;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchMapQueryRequest>, I>>(base?: I): BatchMapQueryRequest {
    return BatchMapQueryRequest.fromPartial(base ?? ({} as any));
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
  encode(message: BatchMapQueryResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.entities).forEach(([key, value]) => {
      BatchMapQueryResponse_EntitiesEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchMapQueryResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchMapQueryResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = BatchMapQueryResponse_EntitiesEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.entities[entry1.key] = entry1.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchMapQueryResponse {
    return {
      entities: isObject(object.entities)
        ? Object.entries(object.entities).reduce<{ [key: string]: Entity }>((acc, [key, value]) => {
          acc[key] = Entity.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: BatchMapQueryResponse): unknown {
    const obj: any = {};
    if (message.entities) {
      const entries = Object.entries(message.entities);
      if (entries.length > 0) {
        obj.entities = {};
        entries.forEach(([k, v]) => {
          obj.entities[k] = Entity.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchMapQueryResponse>, I>>(base?: I): BatchMapQueryResponse {
    return BatchMapQueryResponse.fromPartial(base ?? ({} as any));
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
  return { key: "", value: undefined };
}

export const BatchMapQueryResponse_EntitiesEntry = {
  encode(message: BatchMapQueryResponse_EntitiesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): BatchMapQueryResponse_EntitiesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBatchMapQueryResponse_EntitiesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = Entity.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BatchMapQueryResponse_EntitiesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Entity.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: BatchMapQueryResponse_EntitiesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = Entity.toJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BatchMapQueryResponse_EntitiesEntry>, I>>(
    base?: I,
  ): BatchMapQueryResponse_EntitiesEntry {
    return BatchMapQueryResponse_EntitiesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BatchMapQueryResponse_EntitiesEntry>, I>>(
    object: I,
  ): BatchMapQueryResponse_EntitiesEntry {
    const message = createBaseBatchMapQueryResponse_EntitiesEntry();
    message.key = object.key ?? "";
    message.value = (object.value !== undefined && object.value !== null)
      ? Entity.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseGetOnlyMethodRequest(): GetOnlyMethodRequest {
  return { id: "" };
}

export const GetOnlyMethodRequest = {
  encode(message: GetOnlyMethodRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOnlyMethodRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOnlyMethodRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): GetOnlyMethodRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: GetOnlyMethodRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetOnlyMethodRequest>, I>>(base?: I): GetOnlyMethodRequest {
    return GetOnlyMethodRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetOnlyMethodRequest>, I>>(object: I): GetOnlyMethodRequest {
    const message = createBaseGetOnlyMethodRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseGetOnlyMethodResponse(): GetOnlyMethodResponse {
  return { entity: undefined };
}

export const GetOnlyMethodResponse = {
  encode(message: GetOnlyMethodResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.entity !== undefined) {
      Entity.encode(message.entity, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetOnlyMethodResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetOnlyMethodResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.entity = Entity.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): GetOnlyMethodResponse {
    return { entity: isSet(object.entity) ? Entity.fromJSON(object.entity) : undefined };
  },

  toJSON(message: GetOnlyMethodResponse): unknown {
    const obj: any = {};
    if (message.entity !== undefined) {
      obj.entity = Entity.toJSON(message.entity);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<GetOnlyMethodResponse>, I>>(base?: I): GetOnlyMethodResponse {
    return GetOnlyMethodResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<GetOnlyMethodResponse>, I>>(object: I): GetOnlyMethodResponse {
    const message = createBaseGetOnlyMethodResponse();
    message.entity = (object.entity !== undefined && object.entity !== null)
      ? Entity.fromPartial(object.entity)
      : undefined;
    return message;
  },
};

function createBaseWriteMethodRequest(): WriteMethodRequest {
  return { id: "" };
}

export const WriteMethodRequest = {
  encode(message: WriteMethodRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteMethodRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteMethodRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): WriteMethodRequest {
    return { id: isSet(object.id) ? String(object.id) : "" };
  },

  toJSON(message: WriteMethodRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteMethodRequest>, I>>(base?: I): WriteMethodRequest {
    return WriteMethodRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteMethodRequest>, I>>(object: I): WriteMethodRequest {
    const message = createBaseWriteMethodRequest();
    message.id = object.id ?? "";
    return message;
  },
};

function createBaseWriteMethodResponse(): WriteMethodResponse {
  return {};
}

export const WriteMethodResponse = {
  encode(_: WriteMethodResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): WriteMethodResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWriteMethodResponse();
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

  fromJSON(_: any): WriteMethodResponse {
    return {};
  },

  toJSON(_: WriteMethodResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<WriteMethodResponse>, I>>(base?: I): WriteMethodResponse {
    return WriteMethodResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<WriteMethodResponse>, I>>(_: I): WriteMethodResponse {
    const message = createBaseWriteMethodResponse();
    return message;
  },
};

function createBaseEntity(): Entity {
  return { id: "", name: "" };
}

export const Entity = {
  encode(message: Entity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Entity {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntity();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Entity {
    return { id: isSet(object.id) ? String(object.id) : "", name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: Entity): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Entity>, I>>(base?: I): Entity {
    return Entity.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Entity>, I>>(object: I): Entity {
    const message = createBaseEntity();
    message.id = object.id ?? "";
    message.name = object.name ?? "";
    return message;
  },
};

export interface EntityService<Context extends DataLoaders> {
  BatchQuery(ctx: Context, request: BatchQueryRequest): Promise<BatchQueryResponse>;
  GetQuery(ctx: Context, id: string): Promise<Entity>;
  BatchMapQuery(ctx: Context, request: BatchMapQueryRequest): Promise<BatchMapQueryResponse>;
  GetMapQuery(ctx: Context, id: string): Promise<Entity>;
  /** Add a method that is not batchable to show it's still cached */
  GetOnlyMethod(ctx: Context, request: GetOnlyMethodRequest): Promise<GetOnlyMethodResponse>;
  /** Add a method that won't get cached */
  WriteMethod(ctx: Context, request: WriteMethodRequest): Promise<WriteMethodResponse>;
}

export const EntityServiceServiceName = "batching.EntityService";
export class EntityServiceClientImpl<Context extends DataLoaders> implements EntityService<Context> {
  private readonly rpc: Rpc<Context>;
  private readonly service: string;
  constructor(rpc: Rpc<Context>, opts?: { service?: string }) {
    this.service = opts?.service || EntityServiceServiceName;
    this.rpc = rpc;
    this.BatchQuery = this.BatchQuery.bind(this);
    this.BatchMapQuery = this.BatchMapQuery.bind(this);
    this.GetOnlyMethod = this.GetOnlyMethod.bind(this);
    this.WriteMethod = this.WriteMethod.bind(this);
  }
  GetQuery(ctx: Context, id: string): Promise<Entity> {
    const dl = ctx.getDataLoader("batching.EntityService.BatchQuery", () => {
      return new DataLoader<string, Entity, string>((ids) => {
        const request = { ids };
        return this.BatchQuery(ctx, request as any).then((res) => res.entities);
      }, { cacheKeyFn: hash, ...ctx.rpcDataLoaderOptions });
    });
    return dl.load(id);
  }

  BatchQuery(ctx: Context, request: BatchQueryRequest): Promise<BatchQueryResponse> {
    const data = BatchQueryRequest.encode(request).finish();
    const promise = this.rpc.request(ctx, this.service, "BatchQuery", data);
    return promise.then((data) => BatchQueryResponse.decode(_m0.Reader.create(data)));
  }

  GetMapQuery(ctx: Context, id: string): Promise<Entity> {
    const dl = ctx.getDataLoader("batching.EntityService.BatchMapQuery", () => {
      return new DataLoader<string, Entity, string>((ids) => {
        const request = { ids };
        return this.BatchMapQuery(ctx, request as any).then((res) => {
          return ids.map((key) => res.entities[key] ?? fail());
        });
      }, { cacheKeyFn: hash, ...ctx.rpcDataLoaderOptions });
    });
    return dl.load(id);
  }

  BatchMapQuery(ctx: Context, request: BatchMapQueryRequest): Promise<BatchMapQueryResponse> {
    const data = BatchMapQueryRequest.encode(request).finish();
    const promise = this.rpc.request(ctx, this.service, "BatchMapQuery", data);
    return promise.then((data) => BatchMapQueryResponse.decode(_m0.Reader.create(data)));
  }

  GetOnlyMethod(ctx: Context, request: GetOnlyMethodRequest): Promise<GetOnlyMethodResponse> {
    const dl = ctx.getDataLoader("batching.EntityService.GetOnlyMethod", () => {
      return new DataLoader<GetOnlyMethodRequest, GetOnlyMethodResponse, string>((requests) => {
        const responses = requests.map(async (request) => {
          const data = GetOnlyMethodRequest.encode(request).finish();
          const response = await this.rpc.request(ctx, "batching.EntityService", "GetOnlyMethod", data);
          return GetOnlyMethodResponse.decode(_m0.Reader.create(response));
        });
        return Promise.all(responses);
      }, { cacheKeyFn: hash, ...ctx.rpcDataLoaderOptions });
    });
    return dl.load(request);
  }

  WriteMethod(ctx: Context, request: WriteMethodRequest): Promise<WriteMethodResponse> {
    const data = WriteMethodRequest.encode(request).finish();
    const promise = this.rpc.request(ctx, this.service, "WriteMethod", data);
    return promise.then((data) => WriteMethodResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc<Context> {
  request(ctx: Context, service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

export interface DataLoaderOptions {
  cache?: boolean;
}

export interface DataLoaders {
  rpcDataLoaderOptions?: DataLoaderOptions;
  getDataLoader<T>(identifier: string, constructorFn: () => T): T;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

function fail(message?: string): never {
  throw new Error(message ?? "Failed");
}
