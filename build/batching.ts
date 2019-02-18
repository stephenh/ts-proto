import DataLoader from 'dataloader';
import * as Long from 'long';
import { Writer, Reader } from 'protobufjs/minimal';


export interface BatchQueryRequest {
  ids: string[];
}

export interface BatchQueryResponse {
  entities: Entity[];
}

export interface Entity {
  id: string;
  name: string;
}

const baseBatchQueryRequest: object = {
  ids: "",
};

const baseBatchQueryResponse: object = {
  entities: null,
};

const baseEntity: object = {
  id: "",
  name: "",
};

export interface EntityService {

  BatchQuery(request: BatchQueryRequest): Promise<BatchQueryResponse>;

  GetQuery(id: string): Promise<Entity>;

}

export class EntityServiceClientImpl {

  private readonly rpc: Rpc;

  private queryLoader = new DataLoader<string, Entity>((ids) => {
    const request: BatchQueryRequest = { ids };
    return this.BatchQuery(request).then(res => res.entities);
  });

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  BatchQuery(request: BatchQueryRequest): Promise<BatchQueryResponse> {
    const data = BatchQueryRequest.encode(request).finish();
    const promise = this.rpc.request("EntityService", "BatchQuery", data);
    return promise.then(data => BatchQueryResponse.decode(new Reader(data)));
  }

  GetQuery(id: string): Promise<Entity> {
    return this.queryLoader.load(id);
  }

}

export interface Rpc {

  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;

}

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_VALUE)) {
    throw new Error("Value is larger than Number.MAX_VALUE");;
  }
  return long.toNumber();
}

export const BatchQueryRequest = {
  encode(message: BatchQueryRequest, writer: Writer = new Writer()): Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(reader: Reader, length?: number): BatchQueryRequest {
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
};

export const BatchQueryResponse = {
  encode(message: BatchQueryResponse, writer: Writer = new Writer()): Writer {
    for (const v of message.entities) {
      Entity.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): BatchQueryResponse {
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
};

export const Entity = {
  encode(message: Entity, writer: Writer = new Writer()): Writer {
    writer.uint32(10).string(message.id);
    writer.uint32(18).string(message.name);
    return writer;
  },
  decode(reader: Reader, length?: number): Entity {
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
};
