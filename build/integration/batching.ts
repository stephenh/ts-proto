import DataLoader from 'dataloader';
import { Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';


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

const baseBatchMapQueryRequest: object = {
  ids: "",
};

const baseBatchMapQueryResponse: object = {
  entities: null,
};

const baseBatchMapQueryResponse_EntitiesEntry: object = {
  key: "",
  value: null,
};

const baseEntity: object = {
  id: "",
  name: "",
};

export interface EntityService {

  BatchQuery(request: BatchQueryRequest): Promise<BatchQueryResponse>;

  GetQuery(id: string): Promise<Entity>;

  BatchMapQuery(request: BatchMapQueryRequest): Promise<BatchMapQueryResponse>;

  GetMapQuery(id: string): Promise<Entity>;

}

export class EntityServiceClientImpl {

  private readonly rpc: Rpc;

  private queryLoader = new DataLoader<string, Entity>((ids) => {
    const request = { ids };
    return this.BatchQuery(request).then(res => res.entities);
  });

  private mapQueryLoader = new DataLoader<string, Entity>((ids) => {
    const request = { ids };
    return this.BatchMapQuery(request).then(res => {
      return ids.map(e => res.entities[e]);
    })
  });

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  GetQuery(id: string): Promise<Entity> {
    return this.queryLoader.load(id);
  }

  BatchQuery(request: BatchQueryRequest): Promise<BatchQueryResponse> {
    const data = BatchQueryRequest.encode(request).finish();
    const promise = this.rpc.request("batching.EntityService", "BatchQuery", data);
    return promise.then(data => BatchQueryResponse.decode(new Reader(data)));
  }

  GetMapQuery(id: string): Promise<Entity> {
    return this.mapQueryLoader.load(id);
  }

  BatchMapQuery(request: BatchMapQueryRequest): Promise<BatchMapQueryResponse> {
    const data = BatchMapQueryRequest.encode(request).finish();
    const promise = this.rpc.request("batching.EntityService", "BatchMapQuery", data);
    return promise.then(data => BatchMapQueryResponse.decode(new Reader(data)));
  }

}

interface Rpc {

  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;

}

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const BatchQueryRequest = {
  encode(message: BatchQueryRequest, writer: Writer = Writer.create()): Writer {
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
  fromJSON(object: any): BatchQueryRequest {
    const message = Object.create(baseBatchQueryRequest) as BatchQueryRequest;
    message.ids = [];
    if (object.ids) {
      for (const e of object.ids) {
        message.ids.push(String(e));
      }
    }
    return message;
  },
};

export const BatchQueryResponse = {
  encode(message: BatchQueryResponse, writer: Writer = Writer.create()): Writer {
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
  fromJSON(object: any): BatchQueryResponse {
    const message = Object.create(baseBatchQueryResponse) as BatchQueryResponse;
    message.entities = [];
    if (object.entities) {
      for (const e of object.entities) {
        message.entities.push(Entity.fromJSON(e));
      }
    }
    return message;
  },
};

export const BatchMapQueryRequest = {
  encode(message: BatchMapQueryRequest, writer: Writer = Writer.create()): Writer {
    for (const v of message.ids) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },
  decode(reader: Reader, length?: number): BatchMapQueryRequest {
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
    if (object.ids) {
      for (const e of object.ids) {
        message.ids.push(String(e));
      }
    }
    return message;
  },
};

export const BatchMapQueryResponse = {
  encode(message: BatchMapQueryResponse, writer: Writer = Writer.create()): Writer {
    Object.entries(message.entities).forEach(([key, value]) => {
      BatchMapQueryResponse_EntitiesEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    })
    return writer;
  },
  decode(reader: Reader, length?: number): BatchMapQueryResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBatchMapQueryResponse) as BatchMapQueryResponse;
    message.entities = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry = BatchMapQueryResponse_EntitiesEntry.decode(reader, reader.uint32());
          if (entry.value) {
            message.entities[entry.key] = entry.value;
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
    if (object.entities) {
      const entry = BatchMapQueryResponse_EntitiesEntry.fromJSON(object.entities);
      if (entry.value) {
        message.entities[entry.key] = entry.value;
      }
    }
    return message;
  },
};

export const BatchMapQueryResponse_EntitiesEntry = {
  encode(message: BatchMapQueryResponse_EntitiesEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    if (message.value !== undefined && message.value !== null) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): BatchMapQueryResponse_EntitiesEntry {
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
    if (object.key) {
      message.key = String(object.key);
    }
    if (object.value) {
      message.value = Entity.fromJSON(object.value);
    }
    return message;
  },
};

export const Entity = {
  encode(message: Entity, writer: Writer = Writer.create()): Writer {
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
  fromJSON(object: any): Entity {
    const message = Object.create(baseEntity) as Entity;
    if (object.id) {
      message.id = String(object.id);
    }
    if (object.name) {
      message.name = String(object.name);
    }
    return message;
  },
};
