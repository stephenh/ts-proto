import { Reader, Writer } from 'protobufjs/minimal';
import * as Long from 'long';
import { Timestamp } from './google/protobuf/timestamp';
import { StringValue, Int32Value, BoolValue } from './google/protobuf/wrappers';


export enum StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
}

export interface Simple {
  name: string;
  age: number;
  createdAt: Date | undefined | undefined;
  child: Child | undefined;
  state: StateEnum;
  grandChildren: Child[];
  coins: number[];
  snacks: string[];
  oldStates: StateEnum[];
}

export interface Child {
  name: string;
  type: Child_Type;
}

export enum Child_Type {
  UNKNOWN = 0,
  GOOD = 1,
  BAD = 2,
}

export interface Nested {
  name: string;
  message: Nested_InnerMessage | undefined;
  state: Nested_InnerEnum;
}

export enum Nested_InnerEnum {
  UNKNOWN_INNER = 0,
  GOOD = 100,
  BAD = 1000,
}

export interface Nested_InnerMessage {
  name: string;
  deep: Nested_InnerMessage_DeepMessage | undefined;
}

export interface Nested_InnerMessage_DeepMessage {
  name: string;
}

export interface OneOfMessage {
  first: string | undefined;
  last: string | undefined;
}

export interface SimpleWithWrappers {
  name: string | undefined;
  age: number | undefined;
  enabled: boolean | undefined;
  coins: Array<number | undefined>;
  snacks: Array<string | undefined>;
}

export interface Entity {
  id: number;
}

export interface SimpleWithMap {
  entitiesById: { [key: number]: Entity };
}

export interface SimpleWithMap_EntitiesByIdEntry {
  key: number;
  value: Entity | undefined;
}

export interface PingRequest {
  input: string;
}

export interface PingResponse {
  output: string;
}

const baseSimple: object = {
  name: "",
  age: 0,
  createdAt: null,
  child: null,
  state: 0,
  grandChildren: null,
  coins: 0,
  snacks: "",
  oldStates: 0,
};

const baseChild: object = {
  name: "",
  type: 0,
};

const baseNested: object = {
  name: "",
  message: null,
  state: 0,
};

const baseNested_InnerMessage: object = {
  name: "",
  deep: null,
};

const baseNested_InnerMessage_DeepMessage: object = {
  name: "",
};

const baseOneOfMessage: object = {
};

const baseSimpleWithWrappers: object = {
  name: null,
  age: null,
  enabled: null,
  coins: null,
  snacks: null,
};

const baseEntity: object = {
  id: 0,
};

const baseSimpleWithMap: object = {
  entitiesById: null,
};

const baseSimpleWithMap_EntitiesByIdEntry: object = {
  key: 0,
  value: null,
};

const basePingRequest: object = {
  input: "",
};

const basePingResponse: object = {
  output: "",
};

export interface PingService {

  ping(request: PingRequest): Promise<PingResponse>;

}

export class PingServiceClientImpl {

  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  ping(request: PingRequest): Promise<PingResponse> {
    const data = PingRequest.encode(request).finish();
    const promise = this.rpc.request("simple.PingService", "ping", data);
    return promise.then(data => PingResponse.decode(new Reader(data)));
  }

}

interface Rpc {

  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;

}

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new global.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

export namespace StateEnum {
  export function fromJSON(object: any): StateEnum {
    switch (object) {
      case 0:
      case "UNKNOWN":
        return StateEnum.UNKNOWN;
      case 2:
      case "ON":
        return StateEnum.ON;
      case 3:
      case "OFF":
        return StateEnum.OFF;
      default:
        throw new global.Error(`Invalid value ${object}`);
    }
  }
  export function toJSON(object: StateEnum): string {
    switch (object) {
      case StateEnum.UNKNOWN:
        return "UNKNOWN";
      case StateEnum.ON:
        return "ON";
      case StateEnum.OFF:
        return "OFF";
      default:
        return "UNKNOWN";
    }
  }
}

export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(16).int32(message.age);
    if (message.createdAt !== undefined && message.createdAt !== null) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.child !== undefined && message.child !== null) {
      Child.encode(message.child, writer.uint32(26).fork()).ldelim();
    }
    writer.uint32(32).int32(message.state);
    for (const v of message.grandChildren) {
      Child.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    writer.uint32(50).fork();
    for (const v of message.coins) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.snacks) {
      writer.uint32(58).string(v!);
    }
    writer.uint32(66).fork();
    for (const v of message.oldStates) {
      writer.int32(v);
    }
    writer.ldelim();
    return writer;
  },
  decode(reader: Reader, length?: number): Simple {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSimple) as Simple;
    message.grandChildren = [];
    message.coins = [];
    message.snacks = [];
    message.oldStates = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.age = reader.int32();
          break;
        case 9:
          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.child = Child.decode(reader, reader.uint32());
          break;
        case 4:
          message.state = reader.int32();
          break;
        case 5:
          message.grandChildren.push(Child.decode(reader, reader.uint32()));
          break;
        case 6:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.coins.push(reader.int32());
            }
          } else {
            message.coins.push(reader.int32());
          }
          break;
        case 7:
          message.snacks.push(reader.string());
          break;
        case 8:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.oldStates.push(reader.int32());
            }
          } else {
            message.oldStates.push(reader.int32());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Simple {
    const message = Object.create(baseSimple) as Simple;
    message.grandChildren = [];
    message.coins = [];
    message.snacks = [];
    message.oldStates = [];
    if (object.name) {
      message.name = String(object.name);
    }
    if (object.age) {
      message.age = Number(object.age);
    }
    if (object.createdAt) {
      message.createdAt = fromJsonTimestamp(object.createdAt);
    }
    if (object.child) {
      message.child = Child.fromJSON(object.child);
    }
    if (object.state) {
      message.state = StateEnum.fromJSON(object.state);
    }
    if (object.grandChildren) {
      for (const e of object.grandChildren) {
        message.grandChildren.push(Child.fromJSON(e));
      }
    }
    if (object.coins) {
      for (const e of object.coins) {
        message.coins.push(Number(e));
      }
    }
    if (object.snacks) {
      for (const e of object.snacks) {
        message.snacks.push(String(e));
      }
    }
    if (object.oldStates) {
      for (const e of object.oldStates) {
        message.oldStates.push(StateEnum.fromJSON(e));
      }
    }
    return message;
  },
  toJSON(message: Simple): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    obj.age = message.age || 0;
    obj.createdAt = message.createdAt !== undefined ? message.createdAt.toISOString() : null;
    obj.child = message.child ? Child.toJSON(message.child) : null;
    obj.state = StateEnum.toJSON(message.state);
    if (message.grandChildren) {
      obj.grandChildren = message.grandChildren.map(e => e ? Child.toJSON(e) : null);
    } else {
      obj.grandChildren = [];
    }
    if (message.coins) {
      obj.coins = message.coins.map(e => e || 0);
    } else {
      obj.coins = [];
    }
    if (message.snacks) {
      obj.snacks = message.snacks.map(e => e || "");
    } else {
      obj.snacks = [];
    }
    if (message.oldStates) {
      obj.oldStates = message.oldStates.map(e => StateEnum.toJSON(e));
    } else {
      obj.oldStates = [];
    }
    return obj;
  },
};

export const Child = {
  encode(message: Child, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(16).int32(message.type);
    return writer;
  },
  decode(reader: Reader, length?: number): Child {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseChild) as Child;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.type = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Child {
    const message = Object.create(baseChild) as Child;
    if (object.name) {
      message.name = String(object.name);
    }
    if (object.type) {
      message.type = Child_Type.fromJSON(object.type);
    }
    return message;
  },
  toJSON(message: Child): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    obj.type = Child_Type.toJSON(message.type);
    return obj;
  },
};

export namespace Child_Type {
  export function fromJSON(object: any): Child_Type {
    switch (object) {
      case 0:
      case "UNKNOWN":
        return Child_Type.UNKNOWN;
      case 1:
      case "GOOD":
        return Child_Type.GOOD;
      case 2:
      case "BAD":
        return Child_Type.BAD;
      default:
        throw new global.Error(`Invalid value ${object}`);
    }
  }
  export function toJSON(object: Child_Type): string {
    switch (object) {
      case Child_Type.UNKNOWN:
        return "UNKNOWN";
      case Child_Type.GOOD:
        return "GOOD";
      case Child_Type.BAD:
        return "BAD";
      default:
        return "UNKNOWN";
    }
  }
}

export const Nested = {
  encode(message: Nested, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    if (message.message !== undefined && message.message !== null) {
      Nested_InnerMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int32(message.state);
    return writer;
  },
  decode(reader: Reader, length?: number): Nested {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseNested) as Nested;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.message = Nested_InnerMessage.decode(reader, reader.uint32());
          break;
        case 3:
          message.state = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Nested {
    const message = Object.create(baseNested) as Nested;
    if (object.name) {
      message.name = String(object.name);
    }
    if (object.message) {
      message.message = Nested_InnerMessage.fromJSON(object.message);
    }
    if (object.state) {
      message.state = Nested_InnerEnum.fromJSON(object.state);
    }
    return message;
  },
  toJSON(message: Nested): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    obj.message = message.message ? Nested_InnerMessage.toJSON(message.message) : null;
    obj.state = Nested_InnerEnum.toJSON(message.state);
    return obj;
  },
};

export namespace Nested_InnerEnum {
  export function fromJSON(object: any): Nested_InnerEnum {
    switch (object) {
      case 0:
      case "UNKNOWN_INNER":
        return Nested_InnerEnum.UNKNOWN_INNER;
      case 100:
      case "GOOD":
        return Nested_InnerEnum.GOOD;
      case 1000:
      case "BAD":
        return Nested_InnerEnum.BAD;
      default:
        throw new global.Error(`Invalid value ${object}`);
    }
  }
  export function toJSON(object: Nested_InnerEnum): string {
    switch (object) {
      case Nested_InnerEnum.UNKNOWN_INNER:
        return "UNKNOWN_INNER";
      case Nested_InnerEnum.GOOD:
        return "GOOD";
      case Nested_InnerEnum.BAD:
        return "BAD";
      default:
        return "UNKNOWN";
    }
  }
}

export const Nested_InnerMessage = {
  encode(message: Nested_InnerMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    if (message.deep !== undefined && message.deep !== null) {
      Nested_InnerMessage_DeepMessage.encode(message.deep, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): Nested_InnerMessage {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseNested_InnerMessage) as Nested_InnerMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.deep = Nested_InnerMessage_DeepMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Nested_InnerMessage {
    const message = Object.create(baseNested_InnerMessage) as Nested_InnerMessage;
    if (object.name) {
      message.name = String(object.name);
    }
    if (object.deep) {
      message.deep = Nested_InnerMessage_DeepMessage.fromJSON(object.deep);
    }
    return message;
  },
  toJSON(message: Nested_InnerMessage): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    obj.deep = message.deep ? Nested_InnerMessage_DeepMessage.toJSON(message.deep) : null;
    return obj;
  },
};

export const Nested_InnerMessage_DeepMessage = {
  encode(message: Nested_InnerMessage_DeepMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    return writer;
  },
  decode(reader: Reader, length?: number): Nested_InnerMessage_DeepMessage {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseNested_InnerMessage_DeepMessage) as Nested_InnerMessage_DeepMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Nested_InnerMessage_DeepMessage {
    const message = Object.create(baseNested_InnerMessage_DeepMessage) as Nested_InnerMessage_DeepMessage;
    if (object.name) {
      message.name = String(object.name);
    }
    return message;
  },
  toJSON(message: Nested_InnerMessage_DeepMessage): unknown {
    const obj: any = {};
    obj.name = message.name || "";
    return obj;
  },
};

export const OneOfMessage = {
  encode(message: OneOfMessage, writer: Writer = Writer.create()): Writer {
    if (message.first !== undefined && message.first !== "") {
      writer.uint32(10).string(message.first);
    }
    if (message.last !== undefined && message.last !== "") {
      writer.uint32(18).string(message.last);
    }
    return writer;
  },
  decode(reader: Reader, length?: number): OneOfMessage {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseOneOfMessage) as OneOfMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.first = reader.string();
          break;
        case 2:
          message.last = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): OneOfMessage {
    const message = Object.create(baseOneOfMessage) as OneOfMessage;
    if (object.first) {
      message.first = String(object.first);
    }
    if (object.last) {
      message.last = String(object.last);
    }
    return message;
  },
  toJSON(message: OneOfMessage): unknown {
    const obj: any = {};
    obj.first = message.first || "";
    obj.last = message.last || "";
    return obj;
  },
};

export const SimpleWithWrappers = {
  encode(message: SimpleWithWrappers, writer: Writer = Writer.create()): Writer {
    if (message.name !== undefined && message.name !== null) {
      StringValue.encode({ value: message.name! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.age !== undefined && message.age !== null) {
      Int32Value.encode({ value: message.age! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.enabled !== undefined && message.enabled !== null) {
      BoolValue.encode({ value: message.enabled! }, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.coins) {
      Int32Value.encode({ value: v!! }, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.snacks) {
      StringValue.encode({ value: v!! }, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): SimpleWithWrappers {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSimpleWithWrappers) as SimpleWithWrappers;
    message.coins = [];
    message.snacks = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = StringValue.decode(reader, reader.uint32()).value;
          break;
        case 2:
          message.age = Int32Value.decode(reader, reader.uint32()).value;
          break;
        case 3:
          message.enabled = BoolValue.decode(reader, reader.uint32()).value;
          break;
        case 6:
          message.coins.push(Int32Value.decode(reader, reader.uint32()).value);
          break;
        case 7:
          message.snacks.push(StringValue.decode(reader, reader.uint32()).value);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SimpleWithWrappers {
    const message = Object.create(baseSimpleWithWrappers) as SimpleWithWrappers;
    message.coins = [];
    message.snacks = [];
    if (object.name) {
      message.name = String(object.name);
    }
    if (object.age) {
      message.age = Number(object.age);
    }
    if (object.enabled) {
      message.enabled = Boolean(object.enabled);
    }
    if (object.coins) {
      for (const e of object.coins) {
        message.coins.push(Number(e));
      }
    }
    if (object.snacks) {
      for (const e of object.snacks) {
        message.snacks.push(String(e));
      }
    }
    return message;
  },
  toJSON(message: SimpleWithWrappers): unknown {
    const obj: any = {};
    obj.name = message.name || null;
    obj.age = message.age || null;
    obj.enabled = message.enabled || null;
    if (message.coins) {
      obj.coins = message.coins.map(e => e || null);
    } else {
      obj.coins = [];
    }
    if (message.snacks) {
      obj.snacks = message.snacks.map(e => e || null);
    } else {
      obj.snacks = [];
    }
    return obj;
  },
};

export const Entity = {
  encode(message: Entity, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.id);
    return writer;
  },
  decode(reader: Reader, length?: number): Entity {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseEntity) as Entity;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
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
      message.id = Number(object.id);
    }
    return message;
  },
  toJSON(message: Entity): unknown {
    const obj: any = {};
    obj.id = message.id || 0;
    return obj;
  },
};

export const SimpleWithMap = {
  encode(message: SimpleWithMap, writer: Writer = Writer.create()): Writer {
    Object.entries(message.entitiesById).forEach(([key, value]) => {
      SimpleWithMap_EntitiesByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    })
    return writer;
  },
  decode(reader: Reader, length?: number): SimpleWithMap {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSimpleWithMap) as SimpleWithMap;
    message.entitiesById = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry = SimpleWithMap_EntitiesByIdEntry.decode(reader, reader.uint32());
          if (entry.value) {
            message.entitiesById[entry.key] = entry.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SimpleWithMap {
    const message = Object.create(baseSimpleWithMap) as SimpleWithMap;
    message.entitiesById = {};
    if (object.entitiesById) {
      const entry = SimpleWithMap_EntitiesByIdEntry.fromJSON(object.entitiesById);
      if (entry.value) {
        message.entitiesById[entry.key] = entry.value;
      }
    }
    return message;
  },
  toJSON(message: SimpleWithMap): unknown {
    const obj: any = {};
    obj.entitiesById = message.entitiesById || null;
    return obj;
  },
};

export const SimpleWithMap_EntitiesByIdEntry = {
  encode(message: SimpleWithMap_EntitiesByIdEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    if (message.value !== undefined && message.value !== null) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): SimpleWithMap_EntitiesByIdEntry {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseSimpleWithMap_EntitiesByIdEntry) as SimpleWithMap_EntitiesByIdEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
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
  fromJSON(object: any): SimpleWithMap_EntitiesByIdEntry {
    const message = Object.create(baseSimpleWithMap_EntitiesByIdEntry) as SimpleWithMap_EntitiesByIdEntry;
    if (object.key) {
      message.key = Number(object.key);
    }
    if (object.value) {
      message.value = Entity.fromJSON(object.value);
    }
    return message;
  },
  toJSON(message: SimpleWithMap_EntitiesByIdEntry): unknown {
    const obj: any = {};
    obj.key = message.key || 0;
    obj.value = message.value ? Entity.toJSON(message.value) : null;
    return obj;
  },
};

export const PingRequest = {
  encode(message: PingRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.input);
    return writer;
  },
  decode(reader: Reader, length?: number): PingRequest {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePingRequest) as PingRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.input = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PingRequest {
    const message = Object.create(basePingRequest) as PingRequest;
    if (object.input) {
      message.input = String(object.input);
    }
    return message;
  },
  toJSON(message: PingRequest): unknown {
    const obj: any = {};
    obj.input = message.input || "";
    return obj;
  },
};

export const PingResponse = {
  encode(message: PingResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.output);
    return writer;
  },
  decode(reader: Reader, length?: number): PingResponse {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePingResponse) as PingResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.output = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): PingResponse {
    const message = Object.create(basePingResponse) as PingResponse;
    if (object.output) {
      message.output = String(object.output);
    }
    return message;
  },
  toJSON(message: PingResponse): unknown {
    const obj: any = {};
    obj.output = message.output || "";
    return obj;
  },
};
