//  Adding a comment to the syntax will become the first
//  comment in the output source file.
//
import { ImportedThing } from './import_dir/thing';
import * as Long from 'long';
import { Reader, Writer, util, configure } from 'protobufjs/minimal';
import { Timestamp } from './google/protobuf/timestamp';
import { StringValue, Int32Value, BoolValue, Int64Value } from './google/protobuf/wrappers';


/**
 * * Example comment on the Simple message  */
export interface Simple {
  /**
   *  Name field
   */
  name: string;
  /**
   *  Age  */
  age: number;
  /**
   *  This comment will also attach
   */
  createdAt: Date | undefined;
  child: Child | undefined;
  state: StateEnum;
  grandChildren: Child[];
  coins: number[];
  snacks: string[];
  oldStates: StateEnum[];
  /**
   *  A thing (imported from thing)
   */
  thing: ImportedThing | undefined;
}

export interface Child {
  name: string;
  type: Child_Type;
}

export interface Nested {
  name: string;
  message: Nested_InnerMessage | undefined;
  state: Nested_InnerEnum;
}

/**
 *  Comment for a nested message * /
 */
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
  bananas: Long | undefined;
  coins: number[];
  snacks: string[];
}

export interface Entity {
  id: number;
}

export interface SimpleWithMap {
  entitiesById: { [key: number]: Entity };
  nameLookup: { [key: string]: string };
  intLookup: { [key: number]: number };
}

export interface SimpleWithMap_EntitiesByIdEntry {
  key: number;
  value: Entity | undefined;
}

export interface SimpleWithMap_NameLookupEntry {
  key: string;
  value: string;
}

export interface SimpleWithMap_IntLookupEntry {
  key: number;
  value: number;
}

export interface SimpleWithSnakeCaseMap {
  entitiesById: { [key: number]: Entity };
}

export interface SimpleWithSnakeCaseMap_EntitiesByIdEntry {
  key: number;
  value: Entity | undefined;
}

export interface PingRequest {
  input: string;
}

export interface PingResponse {
  output: string;
}

export interface Numbers {
  double: number;
  float: number;
  int32: number;
  int64: Long;
  uint32: number;
  uint64: Long;
  sint32: number;
  sint64: Long;
  fixed32: number;
  fixed64: Long;
  sfixed32: number;
  sfixed64: Long;
}

const baseSimple: object = {
  name: "",
  age: 0,
  state: 0,
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
  state: 0,
};

const baseNested_InnerMessage: object = {
  name: "",
};

const baseNested_InnerMessage_DeepMessage: object = {
  name: "",
};

const baseOneOfMessage: object = {
};

const baseSimpleWithWrappers: object = {
};

const baseEntity: object = {
  id: 0,
};

const baseSimpleWithMap: object = {
};

const baseSimpleWithMap_EntitiesByIdEntry: object = {
  key: 0,
};

const baseSimpleWithMap_NameLookupEntry: object = {
  key: "",
  value: "",
};

const baseSimpleWithMap_IntLookupEntry: object = {
  key: 0,
  value: 0,
};

const baseSimpleWithSnakeCaseMap: object = {
};

const baseSimpleWithSnakeCaseMap_EntitiesByIdEntry: object = {
  key: 0,
};

const basePingRequest: object = {
  input: "",
};

const basePingResponse: object = {
  output: "",
};

const baseNumbers: object = {
  double: 0,
  float: 0,
  int32: 0,
  int64: Long.ZERO,
  uint32: 0,
  uint64: Long.UZERO,
  sint32: 0,
  sint64: Long.ZERO,
  fixed32: 0,
  fixed64: Long.UZERO,
  sfixed32: 0,
  sfixed64: Long.ZERO,
};

export interface PingService {

  ping(request: PingRequest): Promise<PingResponse>;

}

export class PingServiceClientImpl implements PingService {

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

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function toTimestamp(date: Date): Timestamp {
  const seconds = numberToLong(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds.toNumber() * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function numberToLong(number: number) {
  return Long.fromNumber(number);
}

export const protobufPackage = 'simple'

export enum StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
  UNRECOGNIZED = -1,
}

export function stateEnumFromJSON(object: any): StateEnum {
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
    case -1:
    case "UNRECOGNIZED":
    default:
      return StateEnum.UNRECOGNIZED;
  }
}

export function stateEnumToJSON(object: StateEnum): string {
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

export enum Child_Type {
  UNKNOWN = 0,
  GOOD = 1,
  BAD = 2,
  UNRECOGNIZED = -1,
}

export function child_TypeFromJSON(object: any): Child_Type {
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
    case -1:
    case "UNRECOGNIZED":
    default:
      return Child_Type.UNRECOGNIZED;
  }
}

export function child_TypeToJSON(object: Child_Type): string {
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

export enum Nested_InnerEnum {
  UNKNOWN_INNER = 0,
  GOOD = 100,
  BAD = 1000,
  UNRECOGNIZED = -1,
}

export function nested_InnerEnumFromJSON(object: any): Nested_InnerEnum {
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
    case -1:
    case "UNRECOGNIZED":
    default:
      return Nested_InnerEnum.UNRECOGNIZED;
  }
}

export function nested_InnerEnumToJSON(object: Nested_InnerEnum): string {
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

export const Simple = {
  name: 'Simple',
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(16).int32(message.age);
    if (message.createdAt !== undefined && message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.child !== undefined && message.child !== undefined) {
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
    if (message.thing !== undefined && message.thing !== undefined) {
      ImportedThing.encode(message.thing, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Simple {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimple } as Simple;
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
          message.state = reader.int32() as any;
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
              message.oldStates.push(reader.int32() as any);
            }
          } else {
            message.oldStates.push(reader.int32() as any);
          }
          break;
        case 10:
          message.thing = ImportedThing.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Simple {
    const message = { ...baseSimple } as Simple;
    message.grandChildren = [];
    message.coins = [];
    message.snacks = [];
    message.oldStates = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = Number(object.age);
    } else {
      message.age = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = fromJsonTimestamp(object.createdAt);
    } else {
      message.createdAt = undefined;
    }
    if (object.child !== undefined && object.child !== null) {
      message.child = Child.fromJSON(object.child);
    } else {
      message.child = undefined;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = stateEnumFromJSON(object.state);
    } else {
      message.state = 0;
    }
    if (object.grandChildren !== undefined && object.grandChildren !== null) {
      for (const e of object.grandChildren) {
        message.grandChildren.push(Child.fromJSON(e));
      }
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Number(e));
      }
    }
    if (object.snacks !== undefined && object.snacks !== null) {
      for (const e of object.snacks) {
        message.snacks.push(String(e));
      }
    }
    if (object.oldStates !== undefined && object.oldStates !== null) {
      for (const e of object.oldStates) {
        message.oldStates.push(stateEnumFromJSON(e));
      }
    }
    if (object.thing !== undefined && object.thing !== null) {
      message.thing = ImportedThing.fromJSON(object.thing);
    } else {
      message.thing = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Simple>): Simple {
    const message = { ...baseSimple } as Simple;
    message.grandChildren = [];
    message.coins = [];
    message.snacks = [];
    message.oldStates = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = object.age;
    } else {
      message.age = 0;
    }
    if (object.createdAt !== undefined && object.createdAt !== null) {
      message.createdAt = object.createdAt;
    } else {
      message.createdAt = undefined;
    }
    if (object.child !== undefined && object.child !== null) {
      message.child = Child.fromPartial(object.child);
    } else {
      message.child = undefined;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    if (object.grandChildren !== undefined && object.grandChildren !== null) {
      for (const e of object.grandChildren) {
        message.grandChildren.push(Child.fromPartial(e));
      }
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(e);
      }
    }
    if (object.snacks !== undefined && object.snacks !== null) {
      for (const e of object.snacks) {
        message.snacks.push(e);
      }
    }
    if (object.oldStates !== undefined && object.oldStates !== null) {
      for (const e of object.oldStates) {
        message.oldStates.push(e);
      }
    }
    if (object.thing !== undefined && object.thing !== null) {
      message.thing = ImportedThing.fromPartial(object.thing);
    } else {
      message.thing = undefined;
    }
    return message;
  },
  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = message.age);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt !== undefined ? message.createdAt.toISOString() : null);
    message.child !== undefined && (obj.child = message.child ? Child.toJSON(message.child) : undefined);
    message.state !== undefined && (obj.state = stateEnumToJSON(message.state));
    if (message.grandChildren) {
      obj.grandChildren = message.grandChildren.map(e => e ? Child.toJSON(e) : undefined);
    } else {
      obj.grandChildren = [];
    }
    if (message.coins) {
      obj.coins = message.coins.map(e => e);
    } else {
      obj.coins = [];
    }
    if (message.snacks) {
      obj.snacks = message.snacks.map(e => e);
    } else {
      obj.snacks = [];
    }
    if (message.oldStates) {
      obj.oldStates = message.oldStates.map(e => stateEnumToJSON(e));
    } else {
      obj.oldStates = [];
    }
    message.thing !== undefined && (obj.thing = message.thing ? ImportedThing.toJSON(message.thing) : undefined);
    return obj;
  },
};

export const Child = {
  name: 'Child',
  encode(message: Child, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(16).int32(message.type);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Child {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseChild } as Child;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
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
  fromJSON(object: any): Child {
    const message = { ...baseChild } as Child;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = child_TypeFromJSON(object.type);
    } else {
      message.type = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Child>): Child {
    const message = { ...baseChild } as Child;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = object.type;
    } else {
      message.type = 0;
    }
    return message;
  },
  toJSON(message: Child): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = child_TypeToJSON(message.type));
    return obj;
  },
};

export const Nested = {
  name: 'Nested',
  encode(message: Nested, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    if (message.message !== undefined && message.message !== undefined) {
      Nested_InnerMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int32(message.state);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Nested {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNested } as Nested;
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
          message.state = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Nested {
    const message = { ...baseNested } as Nested;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = Nested_InnerMessage.fromJSON(object.message);
    } else {
      message.message = undefined;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = nested_InnerEnumFromJSON(object.state);
    } else {
      message.state = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Nested>): Nested {
    const message = { ...baseNested } as Nested;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.message !== undefined && object.message !== null) {
      message.message = Nested_InnerMessage.fromPartial(object.message);
    } else {
      message.message = undefined;
    }
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    return message;
  },
  toJSON(message: Nested): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.message !== undefined && (obj.message = message.message ? Nested_InnerMessage.toJSON(message.message) : undefined);
    message.state !== undefined && (obj.state = nested_InnerEnumToJSON(message.state));
    return obj;
  },
};

export const Nested_InnerMessage = {
  name: 'Nested_InnerMessage',
  encode(message: Nested_InnerMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    if (message.deep !== undefined && message.deep !== undefined) {
      Nested_InnerMessage_DeepMessage.encode(message.deep, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Nested_InnerMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNested_InnerMessage } as Nested_InnerMessage;
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
    const message = { ...baseNested_InnerMessage } as Nested_InnerMessage;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    if (object.deep !== undefined && object.deep !== null) {
      message.deep = Nested_InnerMessage_DeepMessage.fromJSON(object.deep);
    } else {
      message.deep = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Nested_InnerMessage>): Nested_InnerMessage {
    const message = { ...baseNested_InnerMessage } as Nested_InnerMessage;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    if (object.deep !== undefined && object.deep !== null) {
      message.deep = Nested_InnerMessage_DeepMessage.fromPartial(object.deep);
    } else {
      message.deep = undefined;
    }
    return message;
  },
  toJSON(message: Nested_InnerMessage): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.deep !== undefined && (obj.deep = message.deep ? Nested_InnerMessage_DeepMessage.toJSON(message.deep) : undefined);
    return obj;
  },
};

export const Nested_InnerMessage_DeepMessage = {
  name: 'Nested_InnerMessage_DeepMessage',
  encode(message: Nested_InnerMessage_DeepMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Nested_InnerMessage_DeepMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNested_InnerMessage_DeepMessage } as Nested_InnerMessage_DeepMessage;
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
    const message = { ...baseNested_InnerMessage_DeepMessage } as Nested_InnerMessage_DeepMessage;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<Nested_InnerMessage_DeepMessage>): Nested_InnerMessage_DeepMessage {
    const message = { ...baseNested_InnerMessage_DeepMessage } as Nested_InnerMessage_DeepMessage;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },
  toJSON(message: Nested_InnerMessage_DeepMessage): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },
};

export const OneOfMessage = {
  name: 'OneOfMessage',
  encode(message: OneOfMessage, writer: Writer = Writer.create()): Writer {
    if (message.first !== undefined) {
      writer.uint32(10).string(message.first);
    }
    if (message.last !== undefined) {
      writer.uint32(18).string(message.last);
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): OneOfMessage {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOneOfMessage } as OneOfMessage;
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
    const message = { ...baseOneOfMessage } as OneOfMessage;
    if (object.first !== undefined && object.first !== null) {
      message.first = String(object.first);
    } else {
      message.first = undefined;
    }
    if (object.last !== undefined && object.last !== null) {
      message.last = String(object.last);
    } else {
      message.last = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<OneOfMessage>): OneOfMessage {
    const message = { ...baseOneOfMessage } as OneOfMessage;
    if (object.first !== undefined && object.first !== null) {
      message.first = object.first;
    } else {
      message.first = undefined;
    }
    if (object.last !== undefined && object.last !== null) {
      message.last = object.last;
    } else {
      message.last = undefined;
    }
    return message;
  },
  toJSON(message: OneOfMessage): unknown {
    const obj: any = {};
    message.first !== undefined && (obj.first = message.first);
    message.last !== undefined && (obj.last = message.last);
    return obj;
  },
};

export const SimpleWithWrappers = {
  name: 'SimpleWithWrappers',
  encode(message: SimpleWithWrappers, writer: Writer = Writer.create()): Writer {
    if (message.name !== undefined && message.name !== undefined) {
      StringValue.encode({ value: message.name! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.age !== undefined && message.age !== undefined) {
      Int32Value.encode({ value: message.age! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.enabled !== undefined && message.enabled !== undefined) {
      BoolValue.encode({ value: message.enabled! }, writer.uint32(26).fork()).ldelim();
    }
    if (message.bananas !== undefined && message.bananas !== undefined) {
      Int64Value.encode({ value: message.bananas! }, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.coins) {
      Int32Value.encode({ value: v!! }, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.snacks) {
      StringValue.encode({ value: v!! }, writer.uint32(58).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithWrappers {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithWrappers } as SimpleWithWrappers;
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
        case 4:
          message.bananas = Int64Value.decode(reader, reader.uint32()).value;
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
    const message = { ...baseSimpleWithWrappers } as SimpleWithWrappers;
    message.coins = [];
    message.snacks = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = undefined;
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = Number(object.age);
    } else {
      message.age = undefined;
    }
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = Boolean(object.enabled);
    } else {
      message.enabled = undefined;
    }
    if (object.bananas !== undefined && object.bananas !== null) {
      message.bananas = Long.fromValue(object.bananas);
    } else {
      message.bananas = undefined;
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(Number(e));
      }
    }
    if (object.snacks !== undefined && object.snacks !== null) {
      for (const e of object.snacks) {
        message.snacks.push(String(e));
      }
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimpleWithWrappers>): SimpleWithWrappers {
    const message = { ...baseSimpleWithWrappers } as SimpleWithWrappers;
    message.coins = [];
    message.snacks = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = undefined;
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = object.age;
    } else {
      message.age = undefined;
    }
    if (object.enabled !== undefined && object.enabled !== null) {
      message.enabled = object.enabled;
    } else {
      message.enabled = undefined;
    }
    if (object.bananas !== undefined && object.bananas !== null) {
      message.bananas = object.bananas as Long | undefined;
    } else {
      message.bananas = undefined;
    }
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(e);
      }
    }
    if (object.snacks !== undefined && object.snacks !== null) {
      for (const e of object.snacks) {
        message.snacks.push(e);
      }
    }
    return message;
  },
  toJSON(message: SimpleWithWrappers): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = message.age);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    message.bananas !== undefined && (obj.bananas = message.bananas);
    if (message.coins) {
      obj.coins = message.coins.map(e => e);
    } else {
      obj.coins = [];
    }
    if (message.snacks) {
      obj.snacks = message.snacks.map(e => e);
    } else {
      obj.snacks = [];
    }
    return obj;
  },
};

export const Entity = {
  name: 'Entity',
  encode(message: Entity, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.id);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Entity {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEntity } as Entity;
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
    const message = { ...baseEntity } as Entity;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Entity>): Entity {
    const message = { ...baseEntity } as Entity;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    return message;
  },
  toJSON(message: Entity): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },
};

export const SimpleWithMap = {
  name: 'SimpleWithMap',
  encode(message: SimpleWithMap, writer: Writer = Writer.create()): Writer {
    Object.entries(message.entitiesById).forEach(([key, value]) => {
      SimpleWithMap_EntitiesByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    })
    Object.entries(message.nameLookup).forEach(([key, value]) => {
      SimpleWithMap_NameLookupEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    })
    Object.entries(message.intLookup).forEach(([key, value]) => {
      SimpleWithMap_IntLookupEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithMap {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap } as SimpleWithMap;
    message.entitiesById = {};
    message.nameLookup = {};
    message.intLookup = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = SimpleWithMap_EntitiesByIdEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.entitiesById[entry1.key] = entry1.value;
          }
          break;
        case 2:
          const entry2 = SimpleWithMap_NameLookupEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.nameLookup[entry2.key] = entry2.value;
          }
          break;
        case 3:
          const entry3 = SimpleWithMap_IntLookupEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.intLookup[entry3.key] = entry3.value;
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
    const message = { ...baseSimpleWithMap } as SimpleWithMap;
    message.entitiesById = {};
    message.nameLookup = {};
    message.intLookup = {};
    if (object.entitiesById !== undefined && object.entitiesById !== null) {
      Object.entries(object.entitiesById).forEach(([key, value]) => {
        message.entitiesById[Number(key)] = Entity.fromJSON(value);
      })
    }
    if (object.nameLookup !== undefined && object.nameLookup !== null) {
      Object.entries(object.nameLookup).forEach(([key, value]) => {
        message.nameLookup[key] = String(value);
      })
    }
    if (object.intLookup !== undefined && object.intLookup !== null) {
      Object.entries(object.intLookup).forEach(([key, value]) => {
        message.intLookup[Number(key)] = Number(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimpleWithMap>): SimpleWithMap {
    const message = { ...baseSimpleWithMap } as SimpleWithMap;
    message.entitiesById = {};
    message.nameLookup = {};
    message.intLookup = {};
    if (object.entitiesById !== undefined && object.entitiesById !== null) {
      Object.entries(object.entitiesById).forEach(([key, value]) => {
        if (value !== undefined) {
          message.entitiesById[Number(key)] = Entity.fromPartial(value);
        }
      })
    }
    if (object.nameLookup !== undefined && object.nameLookup !== null) {
      Object.entries(object.nameLookup).forEach(([key, value]) => {
        if (value !== undefined) {
          message.nameLookup[key] = String(value);
        }
      })
    }
    if (object.intLookup !== undefined && object.intLookup !== null) {
      Object.entries(object.intLookup).forEach(([key, value]) => {
        if (value !== undefined) {
          message.intLookup[Number(key)] = Number(value);
        }
      })
    }
    return message;
  },
  toJSON(message: SimpleWithMap): unknown {
    const obj: any = {};
    obj.entitiesById = {};
    if (message.entitiesById) {
      Object.entries(message.entitiesById).forEach(([k, v]) => {
        obj.entitiesById[k] = Entity.toJSON(v);
      })
    }
    obj.nameLookup = {};
    if (message.nameLookup) {
      Object.entries(message.nameLookup).forEach(([k, v]) => {
        obj.nameLookup[k] = v;
      })
    }
    obj.intLookup = {};
    if (message.intLookup) {
      Object.entries(message.intLookup).forEach(([k, v]) => {
        obj.intLookup[k] = v;
      })
    }
    return obj;
  },
};

export const SimpleWithMap_EntitiesByIdEntry = {
  name: 'SimpleWithMap_EntitiesByIdEntry',
  encode(message: SimpleWithMap_EntitiesByIdEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    if (message.value !== undefined && message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithMap_EntitiesByIdEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_EntitiesByIdEntry } as SimpleWithMap_EntitiesByIdEntry;
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
    const message = { ...baseSimpleWithMap_EntitiesByIdEntry } as SimpleWithMap_EntitiesByIdEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = Number(object.key);
    } else {
      message.key = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Entity.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimpleWithMap_EntitiesByIdEntry>): SimpleWithMap_EntitiesByIdEntry {
    const message = { ...baseSimpleWithMap_EntitiesByIdEntry } as SimpleWithMap_EntitiesByIdEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Entity.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
  toJSON(message: SimpleWithMap_EntitiesByIdEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Entity.toJSON(message.value) : undefined);
    return obj;
  },
};

export const SimpleWithMap_NameLookupEntry = {
  name: 'SimpleWithMap_NameLookupEntry',
  encode(message: SimpleWithMap_NameLookupEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithMap_NameLookupEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_NameLookupEntry } as SimpleWithMap_NameLookupEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SimpleWithMap_NameLookupEntry {
    const message = { ...baseSimpleWithMap_NameLookupEntry } as SimpleWithMap_NameLookupEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimpleWithMap_NameLookupEntry>): SimpleWithMap_NameLookupEntry {
    const message = { ...baseSimpleWithMap_NameLookupEntry } as SimpleWithMap_NameLookupEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = "";
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = "";
    }
    return message;
  },
  toJSON(message: SimpleWithMap_NameLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
};

export const SimpleWithMap_IntLookupEntry = {
  name: 'SimpleWithMap_IntLookupEntry',
  encode(message: SimpleWithMap_IntLookupEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    writer.uint32(16).int32(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithMap_IntLookupEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_IntLookupEntry } as SimpleWithMap_IntLookupEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SimpleWithMap_IntLookupEntry {
    const message = { ...baseSimpleWithMap_IntLookupEntry } as SimpleWithMap_IntLookupEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = Number(object.key);
    } else {
      message.key = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Number(object.value);
    } else {
      message.value = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimpleWithMap_IntLookupEntry>): SimpleWithMap_IntLookupEntry {
    const message = { ...baseSimpleWithMap_IntLookupEntry } as SimpleWithMap_IntLookupEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = object.value;
    } else {
      message.value = 0;
    }
    return message;
  },
  toJSON(message: SimpleWithMap_IntLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },
};

export const SimpleWithSnakeCaseMap = {
  name: 'SimpleWithSnakeCaseMap',
  encode(message: SimpleWithSnakeCaseMap, writer: Writer = Writer.create()): Writer {
    Object.entries(message.entitiesById).forEach(([key, value]) => {
      SimpleWithSnakeCaseMap_EntitiesByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithSnakeCaseMap {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithSnakeCaseMap } as SimpleWithSnakeCaseMap;
    message.entitiesById = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = SimpleWithSnakeCaseMap_EntitiesByIdEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.entitiesById[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): SimpleWithSnakeCaseMap {
    const message = { ...baseSimpleWithSnakeCaseMap } as SimpleWithSnakeCaseMap;
    message.entitiesById = {};
    if (object.entitiesById !== undefined && object.entitiesById !== null) {
      Object.entries(object.entitiesById).forEach(([key, value]) => {
        message.entitiesById[Number(key)] = Entity.fromJSON(value);
      })
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimpleWithSnakeCaseMap>): SimpleWithSnakeCaseMap {
    const message = { ...baseSimpleWithSnakeCaseMap } as SimpleWithSnakeCaseMap;
    message.entitiesById = {};
    if (object.entitiesById !== undefined && object.entitiesById !== null) {
      Object.entries(object.entitiesById).forEach(([key, value]) => {
        if (value !== undefined) {
          message.entitiesById[Number(key)] = Entity.fromPartial(value);
        }
      })
    }
    return message;
  },
  toJSON(message: SimpleWithSnakeCaseMap): unknown {
    const obj: any = {};
    obj.entitiesById = {};
    if (message.entitiesById) {
      Object.entries(message.entitiesById).forEach(([k, v]) => {
        obj.entitiesById[k] = Entity.toJSON(v);
      })
    }
    return obj;
  },
};

export const SimpleWithSnakeCaseMap_EntitiesByIdEntry = {
  name: 'SimpleWithSnakeCaseMap_EntitiesByIdEntry',
  encode(message: SimpleWithSnakeCaseMap_EntitiesByIdEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    if (message.value !== undefined && message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithSnakeCaseMap_EntitiesByIdEntry } as SimpleWithSnakeCaseMap_EntitiesByIdEntry;
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
  fromJSON(object: any): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    const message = { ...baseSimpleWithSnakeCaseMap_EntitiesByIdEntry } as SimpleWithSnakeCaseMap_EntitiesByIdEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = Number(object.key);
    } else {
      message.key = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Entity.fromJSON(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<SimpleWithSnakeCaseMap_EntitiesByIdEntry>): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    const message = { ...baseSimpleWithSnakeCaseMap_EntitiesByIdEntry } as SimpleWithSnakeCaseMap_EntitiesByIdEntry;
    if (object.key !== undefined && object.key !== null) {
      message.key = object.key;
    } else {
      message.key = 0;
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = Entity.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
    return message;
  },
  toJSON(message: SimpleWithSnakeCaseMap_EntitiesByIdEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Entity.toJSON(message.value) : undefined);
    return obj;
  },
};

export const PingRequest = {
  name: 'PingRequest',
  encode(message: PingRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.input);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PingRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePingRequest } as PingRequest;
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
    const message = { ...basePingRequest } as PingRequest;
    if (object.input !== undefined && object.input !== null) {
      message.input = String(object.input);
    } else {
      message.input = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<PingRequest>): PingRequest {
    const message = { ...basePingRequest } as PingRequest;
    if (object.input !== undefined && object.input !== null) {
      message.input = object.input;
    } else {
      message.input = "";
    }
    return message;
  },
  toJSON(message: PingRequest): unknown {
    const obj: any = {};
    message.input !== undefined && (obj.input = message.input);
    return obj;
  },
};

export const PingResponse = {
  name: 'PingResponse',
  encode(message: PingResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.output);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): PingResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...basePingResponse } as PingResponse;
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
    const message = { ...basePingResponse } as PingResponse;
    if (object.output !== undefined && object.output !== null) {
      message.output = String(object.output);
    } else {
      message.output = "";
    }
    return message;
  },
  fromPartial(object: DeepPartial<PingResponse>): PingResponse {
    const message = { ...basePingResponse } as PingResponse;
    if (object.output !== undefined && object.output !== null) {
      message.output = object.output;
    } else {
      message.output = "";
    }
    return message;
  },
  toJSON(message: PingResponse): unknown {
    const obj: any = {};
    message.output !== undefined && (obj.output = message.output);
    return obj;
  },
};

export const Numbers = {
  name: 'Numbers',
  encode(message: Numbers, writer: Writer = Writer.create()): Writer {
    writer.uint32(9).double(message.double);
    writer.uint32(21).float(message.float);
    writer.uint32(24).int32(message.int32);
    writer.uint32(32).int64(message.int64);
    writer.uint32(40).uint32(message.uint32);
    writer.uint32(48).uint64(message.uint64);
    writer.uint32(56).sint32(message.sint32);
    writer.uint32(64).sint64(message.sint64);
    writer.uint32(77).fixed32(message.fixed32);
    writer.uint32(81).fixed64(message.fixed64);
    writer.uint32(93).sfixed32(message.sfixed32);
    writer.uint32(97).sfixed64(message.sfixed64);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Numbers {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseNumbers } as Numbers;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.double = reader.double();
          break;
        case 2:
          message.float = reader.float();
          break;
        case 3:
          message.int32 = reader.int32();
          break;
        case 4:
          message.int64 = reader.int64() as Long;
          break;
        case 5:
          message.uint32 = reader.uint32();
          break;
        case 6:
          message.uint64 = reader.uint64() as Long;
          break;
        case 7:
          message.sint32 = reader.sint32();
          break;
        case 8:
          message.sint64 = reader.sint64() as Long;
          break;
        case 9:
          message.fixed32 = reader.fixed32();
          break;
        case 10:
          message.fixed64 = reader.fixed64() as Long;
          break;
        case 11:
          message.sfixed32 = reader.sfixed32();
          break;
        case 12:
          message.sfixed64 = reader.sfixed64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Numbers {
    const message = { ...baseNumbers } as Numbers;
    if (object.double !== undefined && object.double !== null) {
      message.double = Number(object.double);
    } else {
      message.double = 0;
    }
    if (object.float !== undefined && object.float !== null) {
      message.float = Number(object.float);
    } else {
      message.float = 0;
    }
    if (object.int32 !== undefined && object.int32 !== null) {
      message.int32 = Number(object.int32);
    } else {
      message.int32 = 0;
    }
    if (object.int64 !== undefined && object.int64 !== null) {
      message.int64 = Long.fromString(object.int64);
    } else {
      message.int64 = Long.ZERO;
    }
    if (object.uint32 !== undefined && object.uint32 !== null) {
      message.uint32 = Number(object.uint32);
    } else {
      message.uint32 = 0;
    }
    if (object.uint64 !== undefined && object.uint64 !== null) {
      message.uint64 = Long.fromString(object.uint64);
    } else {
      message.uint64 = Long.UZERO;
    }
    if (object.sint32 !== undefined && object.sint32 !== null) {
      message.sint32 = Number(object.sint32);
    } else {
      message.sint32 = 0;
    }
    if (object.sint64 !== undefined && object.sint64 !== null) {
      message.sint64 = Long.fromString(object.sint64);
    } else {
      message.sint64 = Long.ZERO;
    }
    if (object.fixed32 !== undefined && object.fixed32 !== null) {
      message.fixed32 = Number(object.fixed32);
    } else {
      message.fixed32 = 0;
    }
    if (object.fixed64 !== undefined && object.fixed64 !== null) {
      message.fixed64 = Long.fromString(object.fixed64);
    } else {
      message.fixed64 = Long.UZERO;
    }
    if (object.sfixed32 !== undefined && object.sfixed32 !== null) {
      message.sfixed32 = Number(object.sfixed32);
    } else {
      message.sfixed32 = 0;
    }
    if (object.sfixed64 !== undefined && object.sfixed64 !== null) {
      message.sfixed64 = Long.fromString(object.sfixed64);
    } else {
      message.sfixed64 = Long.ZERO;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Numbers>): Numbers {
    const message = { ...baseNumbers } as Numbers;
    if (object.double !== undefined && object.double !== null) {
      message.double = object.double;
    } else {
      message.double = 0;
    }
    if (object.float !== undefined && object.float !== null) {
      message.float = object.float;
    } else {
      message.float = 0;
    }
    if (object.int32 !== undefined && object.int32 !== null) {
      message.int32 = object.int32;
    } else {
      message.int32 = 0;
    }
    if (object.int64 !== undefined && object.int64 !== null) {
      message.int64 = object.int64 as Long;
    } else {
      message.int64 = Long.ZERO;
    }
    if (object.uint32 !== undefined && object.uint32 !== null) {
      message.uint32 = object.uint32;
    } else {
      message.uint32 = 0;
    }
    if (object.uint64 !== undefined && object.uint64 !== null) {
      message.uint64 = object.uint64 as Long;
    } else {
      message.uint64 = Long.UZERO;
    }
    if (object.sint32 !== undefined && object.sint32 !== null) {
      message.sint32 = object.sint32;
    } else {
      message.sint32 = 0;
    }
    if (object.sint64 !== undefined && object.sint64 !== null) {
      message.sint64 = object.sint64 as Long;
    } else {
      message.sint64 = Long.ZERO;
    }
    if (object.fixed32 !== undefined && object.fixed32 !== null) {
      message.fixed32 = object.fixed32;
    } else {
      message.fixed32 = 0;
    }
    if (object.fixed64 !== undefined && object.fixed64 !== null) {
      message.fixed64 = object.fixed64 as Long;
    } else {
      message.fixed64 = Long.UZERO;
    }
    if (object.sfixed32 !== undefined && object.sfixed32 !== null) {
      message.sfixed32 = object.sfixed32;
    } else {
      message.sfixed32 = 0;
    }
    if (object.sfixed64 !== undefined && object.sfixed64 !== null) {
      message.sfixed64 = object.sfixed64 as Long;
    } else {
      message.sfixed64 = Long.ZERO;
    }
    return message;
  },
  toJSON(message: Numbers): unknown {
    const obj: any = {};
    message.double !== undefined && (obj.double = message.double);
    message.float !== undefined && (obj.float = message.float);
    message.int32 !== undefined && (obj.int32 = message.int32);
    message.int64 !== undefined && (obj.int64 = (message.int64 || Long.ZERO).toString());
    message.uint32 !== undefined && (obj.uint32 = message.uint32);
    message.uint64 !== undefined && (obj.uint64 = (message.uint64 || Long.UZERO).toString());
    message.sint32 !== undefined && (obj.sint32 = message.sint32);
    message.sint64 !== undefined && (obj.sint64 = (message.sint64 || Long.ZERO).toString());
    message.fixed32 !== undefined && (obj.fixed32 = message.fixed32);
    message.fixed64 !== undefined && (obj.fixed64 = (message.fixed64 || Long.UZERO).toString());
    message.sfixed32 !== undefined && (obj.sfixed32 = message.sfixed32);
    message.sfixed64 !== undefined && (obj.sfixed64 = (message.sfixed64 || Long.ZERO).toString());
    return obj;
  },
};

if (util.Long !== Long as any) {
  util.Long = Long as any;
  configure();
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