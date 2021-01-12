//  Adding a comment to the syntax will become the first
//  comment in the output source file.
//
import { ImportedThing } from './import_dir/thing';
import { DateMessage } from './google/type/date';
import { Timestamp } from './google/protobuf/timestamp';
import * as Long from 'long';
import { Writer, Reader, util, configure } from 'protobufjs/minimal';
import { StringValue, Int32Value, BoolValue } from './google/protobuf/wrappers';


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
  blobs: Uint8Array[];
  birthday: DateMessage | undefined;
  blob: Uint8Array;
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
  mapOfTimestamps: { [key: string]: Date };
  mapOfBytes: { [key: string]: Uint8Array };
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

export interface SimpleWithMap_MapOfTimestampsEntry {
  key: string;
  value: Date | undefined;
}

export interface SimpleWithMap_MapOfBytesEntry {
  key: string;
  value: Uint8Array;
}

export interface SimpleWithSnakeCaseMap {
  entitiesById: { [key: number]: Entity };
}

export interface SimpleWithSnakeCaseMap_EntitiesByIdEntry {
  key: number;
  value: Entity | undefined;
}

export interface SimpleWithMapOfEnums {
  enumsById: { [key: number]: StateEnum };
}

export interface SimpleWithMapOfEnums_EnumsByIdEntry {
  key: number;
  value: StateEnum;
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
  int64: number;
  uint32: number;
  uint64: number;
  sint32: number;
  sint64: number;
  fixed32: number;
  fixed64: number;
  sfixed32: number;
  sfixed64: number;
}

/**
 * * For testing proto3's field presence feature.  */
export interface SimpleButOptional {
  /**
   *  Name field
   */
  name?: string | undefined;
  /**
   *  Age  */
  age?: number | undefined;
  /**
   *  This comment will also attach
   */
  createdAt?: Date | undefined;
  child?: Child | undefined;
  state?: StateEnum | undefined;
  /**
   *  A thing (imported from thing)
   */
  thing?: ImportedThing | undefined;
  birthday?: DateMessage | undefined;
}

export interface Empty {
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

const baseSimpleWithMap_MapOfTimestampsEntry: object = {
  key: "",
};

const baseSimpleWithMap_MapOfBytesEntry: object = {
  key: "",
};

const baseSimpleWithSnakeCaseMap: object = {
};

const baseSimpleWithSnakeCaseMap_EntitiesByIdEntry: object = {
  key: 0,
};

const baseSimpleWithMapOfEnums: object = {
};

const baseSimpleWithMapOfEnums_EnumsByIdEntry: object = {
  key: 0,
  value: 0,
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
  int64: 0,
  uint32: 0,
  uint64: 0,
  sint32: 0,
  sint64: 0,
  fixed32: 0,
  fixed64: 0,
  sfixed32: 0,
  sfixed64: 0,
};

const baseSimpleButOptional: object = {
};

const baseEmpty: object = {
};

export interface PingService {

  ping(request: PingRequest): Promise<PingResponse>;

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

export interface MetaBase {
  readonly kind: 'object' | 'array' | 'map' | 'union' | 'builtin';
}

export interface MetaMessage extends MetaBase {
  readonly kind: 'object';
  readonly type: string;
  readonly name: string;
}

export interface MetaArray extends MetaBase {
  readonly kind: 'array';
  readonly type: MetaBase | string;
}

export interface MetaMap extends MetaBase {
  readonly kind: 'map';
  readonly key: string;
  readonly value: MetaBase | string;
}

export interface MetaUnion extends MetaBase {
  readonly kind: 'union';
  readonly choices: Array<MetaBase | string | undefined>;
}

export interface MetaService<T, R> {
  readonly request: MetaMessage;
  readonly response: MetaMessage;
  readonly clientStreaming: boolean;
  readonly serverStreaming: boolean;
  readonly encodeRequest?: (message: T, writer: Writer) => Writer;
  readonly decodeResponse?: (input: Uint8Array | Reader, length?: number) => R;
}

export interface MetaPrimitive extends MetaBase {
  readonly kind: 'builtin';
  readonly type: string;
  readonly original: string;
}

function longToNumber(long: Long) {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

export const protobufPackage = 'simple'

export enum StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
  UNRECOGNIZED = -1,
}

export enum Child_Type {
  UNKNOWN = 0,
  GOOD = 1,
  BAD = 2,
  UNRECOGNIZED = -1,
}

export enum Nested_InnerEnum {
  UNKNOWN_INNER = 0,
  GOOD = 100,
  BAD = 1000,
  UNRECOGNIZED = -1,
}

export const Simple = {
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
    for (const v of message.blobs) {
      writer.uint32(90).bytes(v!);
    }
    if (message.birthday !== undefined && message.birthday !== undefined) {
      DateMessage.encode(message.birthday, writer.uint32(98).fork()).ldelim();
    }
    writer.uint32(106).bytes(message.blob);
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
    message.blobs = [];
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
        case 11:
          message.blobs.push(reader.bytes());
          break;
        case 12:
          message.birthday = DateMessage.decode(reader, reader.uint32());
          break;
        case 13:
          message.blob = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const Child = {
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
};

export const Nested = {
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
};

export const Nested_InnerMessage = {
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
};

export const Nested_InnerMessage_DeepMessage = {
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
};

export const OneOfMessage = {
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
};

export const SimpleWithWrappers = {
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
};

export const Entity = {
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
};

export const SimpleWithMap = {
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
    Object.entries(message.mapOfTimestamps).forEach(([key, value]) => {
      SimpleWithMap_MapOfTimestampsEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    })
    Object.entries(message.mapOfBytes).forEach(([key, value]) => {
      SimpleWithMap_MapOfBytesEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
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
    message.mapOfTimestamps = {};
    message.mapOfBytes = {};
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
        case 4:
          const entry4 = SimpleWithMap_MapOfTimestampsEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.mapOfTimestamps[entry4.key] = entry4.value;
          }
          break;
        case 5:
          const entry5 = SimpleWithMap_MapOfBytesEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.mapOfBytes[entry5.key] = entry5.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const SimpleWithMap_EntitiesByIdEntry = {
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
};

export const SimpleWithMap_NameLookupEntry = {
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
};

export const SimpleWithMap_IntLookupEntry = {
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
};

export const SimpleWithMap_MapOfTimestampsEntry = {
  encode(message: SimpleWithMap_MapOfTimestampsEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    if (message.value !== undefined && message.value !== undefined) {
      Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithMap_MapOfTimestampsEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_MapOfTimestampsEntry } as SimpleWithMap_MapOfTimestampsEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const SimpleWithMap_MapOfBytesEntry = {
  encode(message: SimpleWithMap_MapOfBytesEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).bytes(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithMap_MapOfBytesEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_MapOfBytesEntry } as SimpleWithMap_MapOfBytesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const SimpleWithSnakeCaseMap = {
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
};

export const SimpleWithSnakeCaseMap_EntitiesByIdEntry = {
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
};

export const SimpleWithMapOfEnums = {
  encode(message: SimpleWithMapOfEnums, writer: Writer = Writer.create()): Writer {
    Object.entries(message.enumsById).forEach(([key, value]) => {
      SimpleWithMapOfEnums_EnumsByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    })
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithMapOfEnums {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMapOfEnums } as SimpleWithMapOfEnums;
    message.enumsById = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = SimpleWithMapOfEnums_EnumsByIdEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.enumsById[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const SimpleWithMapOfEnums_EnumsByIdEntry = {
  encode(message: SimpleWithMapOfEnums_EnumsByIdEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    writer.uint32(16).int32(message.value);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleWithMapOfEnums_EnumsByIdEntry {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMapOfEnums_EnumsByIdEntry } as SimpleWithMapOfEnums_EnumsByIdEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.int32();
          break;
        case 2:
          message.value = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const PingRequest = {
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
};

export const PingResponse = {
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
};

export const Numbers = {
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
          message.int64 = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.uint32 = reader.uint32();
          break;
        case 6:
          message.uint64 = longToNumber(reader.uint64() as Long);
          break;
        case 7:
          message.sint32 = reader.sint32();
          break;
        case 8:
          message.sint64 = longToNumber(reader.sint64() as Long);
          break;
        case 9:
          message.fixed32 = reader.fixed32();
          break;
        case 10:
          message.fixed64 = longToNumber(reader.fixed64() as Long);
          break;
        case 11:
          message.sfixed32 = reader.sfixed32();
          break;
        case 12:
          message.sfixed64 = longToNumber(reader.sfixed64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const SimpleButOptional = {
  encode(message: SimpleButOptional, writer: Writer = Writer.create()): Writer {
    if (message.name !== undefined) {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== undefined) {
      writer.uint32(16).int32(message.age);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.child !== undefined) {
      Child.encode(message.child, writer.uint32(26).fork()).ldelim();
    }
    if (message.state !== undefined) {
      writer.uint32(32).int32(message.state);
    }
    if (message.thing !== undefined) {
      ImportedThing.encode(message.thing, writer.uint32(82).fork()).ldelim();
    }
    if (message.birthday !== undefined) {
      DateMessage.encode(message.birthday, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): SimpleButOptional {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleButOptional } as SimpleButOptional;
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
        case 10:
          message.thing = ImportedThing.decode(reader, reader.uint32());
          break;
        case 12:
          message.birthday = DateMessage.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

export const Empty = {
  encode(_: Empty, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Empty {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
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
};

export const metaSimple: { [key in keyof Required<Simple>]: MetaBase | string } = {
  name: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
  age: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
  createdAt: {kind:'union', choices: [undefined, {kind:'builtin', type:'Date', original:'.google.protobuf.Timestamp'} as MetaPrimitive]} as MetaUnion,
  child: {kind:'union', choices: [undefined, {kind:'object', type:'.simple.Child', name:'Child'} as MetaMessage]} as MetaUnion,
  state: {kind:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaMessage,
  grandChildren: {kind:'array', type:{kind:'object', type:'.simple.Child', name:'Child'} as MetaMessage} as MetaArray,
  coins: {kind:'array', type:{kind:'builtin', type:'number', original:'int32'} as MetaPrimitive} as MetaArray,
  snacks: {kind:'array', type:{kind:'builtin', type:'string', original:'string'} as MetaPrimitive} as MetaArray,
  oldStates: {kind:'array', type:{kind:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaMessage} as MetaArray,
  thing: {kind:'union', choices: [undefined, {kind:'object', type:'.simple.ImportedThing', name:'ImportedThing'} as MetaMessage]} as MetaUnion,
  blobs: {kind:'array', type:{kind:'builtin', type:'Uint8Array', original:'bytes'} as MetaPrimitive} as MetaArray,
  birthday: {kind:'union', choices: [undefined, {kind:'object', type:'.google.type.Date', name:'DateMessage'} as MetaMessage]} as MetaUnion,
  blob: {kind:'builtin', type:'Uint8Array', original:'bytes'} as MetaPrimitive,
}
export const metaChild: { [key in keyof Required<Child>]: MetaBase | string } = {
  name: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
  type: {kind:'object', type:'.simple.Child.Type', name:'Child_Type'} as MetaMessage,
}
export const metaNested: { [key in keyof Required<Nested>]: MetaBase | string } = {
  name: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
  message: {kind:'union', choices: [undefined, {kind:'object', type:'.simple.Nested.InnerMessage', name:'Nested_InnerMessage'} as MetaMessage]} as MetaUnion,
  state: {kind:'object', type:'.simple.Nested.InnerEnum', name:'Nested_InnerEnum'} as MetaMessage,
}
export const metaNested_InnerMessage: { [key in keyof Required<Nested_InnerMessage>]: MetaBase | string } = {
  name: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
  deep: {kind:'union', choices: [undefined, {kind:'object', type:'.simple.Nested.InnerMessage.DeepMessage', name:'Nested_InnerMessage_DeepMessage'} as MetaMessage]} as MetaUnion,
}
export const metaNested_InnerMessage_DeepMessage: { [key in keyof Required<Nested_InnerMessage_DeepMessage>]: MetaBase | string } = {
  name: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
}
export const metaOneOfMessage: { [key in keyof Required<OneOfMessage>]: MetaBase | string } = {
  first: {kind:'union', choices: [undefined, {kind:'builtin', type:'string', original:'string'} as MetaPrimitive]} as MetaUnion,
  last: {kind:'union', choices: [undefined, {kind:'builtin', type:'string', original:'string'} as MetaPrimitive]} as MetaUnion,
}
export const metaSimpleWithWrappers: { [key in keyof Required<SimpleWithWrappers>]: MetaBase | string } = {
  name: {kind:'union', choices: [undefined, {kind:'union', choices: ['string', 'undefined']} as MetaUnion]} as MetaUnion,
  age: {kind:'union', choices: [undefined, {kind:'union', choices: ['number', 'undefined']} as MetaUnion]} as MetaUnion,
  enabled: {kind:'union', choices: [undefined, {kind:'union', choices: ['boolean', 'undefined']} as MetaUnion]} as MetaUnion,
  coins: {kind:'array', type:{kind:'builtin', type:'number', original:'.google.protobuf.Int32Value'} as MetaPrimitive} as MetaArray,
  snacks: {kind:'array', type:{kind:'builtin', type:'string', original:'.google.protobuf.StringValue'} as MetaPrimitive} as MetaArray,
}
export const metaEntity: { [key in keyof Required<Entity>]: MetaBase | string } = {
  id: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
}
export const metaSimpleWithMap: { [key in keyof Required<SimpleWithMap>]: MetaBase | string } = {
  entitiesById: {kind:'map', key:'number', value:{kind:'object', type:'.simple.Entity', name:'Entity'} as MetaMessage} as MetaMap,
  nameLookup: {kind:'map', key:'string', value:{kind:'builtin', type:'string', original:'string'} as MetaPrimitive} as MetaMap,
  intLookup: {kind:'map', key:'number', value:{kind:'builtin', type:'number', original:'int32'} as MetaPrimitive} as MetaMap,
  mapOfTimestamps: {kind:'map', key:'string', value:{kind:'builtin', type:'Date', original:'.google.protobuf.Timestamp'} as MetaPrimitive} as MetaMap,
  mapOfBytes: {kind:'map', key:'string', value:{kind:'builtin', type:'Uint8Array', original:'bytes'} as MetaPrimitive} as MetaMap,
}
export const metaSimpleWithMap_EntitiesByIdEntry: { [key in keyof Required<SimpleWithMap_EntitiesByIdEntry>]: MetaBase | string } = {
  key: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
  value: {kind:'union', choices: [undefined, {kind:'object', type:'.simple.Entity', name:'Entity'} as MetaMessage]} as MetaUnion,
}
export const metaSimpleWithMap_NameLookupEntry: { [key in keyof Required<SimpleWithMap_NameLookupEntry>]: MetaBase | string } = {
  key: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
  value: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
}
export const metaSimpleWithMap_IntLookupEntry: { [key in keyof Required<SimpleWithMap_IntLookupEntry>]: MetaBase | string } = {
  key: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
  value: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
}
export const metaSimpleWithMap_MapOfTimestampsEntry: { [key in keyof Required<SimpleWithMap_MapOfTimestampsEntry>]: MetaBase | string } = {
  key: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
  value: {kind:'union', choices: [undefined, {kind:'builtin', type:'Date', original:'.google.protobuf.Timestamp'} as MetaPrimitive]} as MetaUnion,
}
export const metaSimpleWithMap_MapOfBytesEntry: { [key in keyof Required<SimpleWithMap_MapOfBytesEntry>]: MetaBase | string } = {
  key: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
  value: {kind:'builtin', type:'Uint8Array', original:'bytes'} as MetaPrimitive,
}
export const metaSimpleWithSnakeCaseMap: { [key in keyof Required<SimpleWithSnakeCaseMap>]: MetaBase | string } = {
  entitiesById: {kind:'map', key:'number', value:{kind:'object', type:'.simple.Entity', name:'Entity'} as MetaMessage} as MetaMap,
}
export const metaSimpleWithSnakeCaseMap_EntitiesByIdEntry: { [key in keyof Required<SimpleWithSnakeCaseMap_EntitiesByIdEntry>]: MetaBase | string } = {
  key: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
  value: {kind:'union', choices: [undefined, {kind:'object', type:'.simple.Entity', name:'Entity'} as MetaMessage]} as MetaUnion,
}
export const metaSimpleWithMapOfEnums: { [key in keyof Required<SimpleWithMapOfEnums>]: MetaBase | string } = {
  enumsById: {kind:'map', key:'number', value:{kind:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaMessage} as MetaMap,
}
export const metaSimpleWithMapOfEnums_EnumsByIdEntry: { [key in keyof Required<SimpleWithMapOfEnums_EnumsByIdEntry>]: MetaBase | string } = {
  key: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
  value: {kind:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaMessage,
}
export const metaPingRequest: { [key in keyof Required<PingRequest>]: MetaBase | string } = {
  input: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
}
export const metaPingResponse: { [key in keyof Required<PingResponse>]: MetaBase | string } = {
  output: {kind:'builtin', type:'string', original:'string'} as MetaPrimitive,
}
export const metaNumbers: { [key in keyof Required<Numbers>]: MetaBase | string } = {
  double: {kind:'builtin', type:'number', original:'double'} as MetaPrimitive,
  float: {kind:'builtin', type:'number', original:'float'} as MetaPrimitive,
  int32: {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive,
  int64: {kind:'builtin', type:'number', original:'int64'} as MetaPrimitive,
  uint32: {kind:'builtin', type:'number', original:'uint32'} as MetaPrimitive,
  uint64: {kind:'builtin', type:'number', original:'uint64'} as MetaPrimitive,
  sint32: {kind:'builtin', type:'number', original:'sint32'} as MetaPrimitive,
  sint64: {kind:'builtin', type:'number', original:'sint64'} as MetaPrimitive,
  fixed32: {kind:'builtin', type:'number', original:'fixed32'} as MetaPrimitive,
  fixed64: {kind:'builtin', type:'number', original:'fixed64'} as MetaPrimitive,
  sfixed32: {kind:'builtin', type:'number', original:'sfixed32'} as MetaPrimitive,
  sfixed64: {kind:'builtin', type:'number', original:'sfixed64'} as MetaPrimitive,
}
export const metaSimpleButOptional: { [key in keyof Required<SimpleButOptional>]: MetaBase | string } = {
  name: {kind:'union', choices: [undefined, {kind:'builtin', type:'string', original:'string'} as MetaPrimitive]} as MetaUnion,
  age: {kind:'union', choices: [undefined, {kind:'builtin', type:'number', original:'int32'} as MetaPrimitive]} as MetaUnion,
  createdAt: {kind:'union', choices: [undefined, {kind:'builtin', type:'Date', original:'.google.protobuf.Timestamp'} as MetaPrimitive]} as MetaUnion,
  child: {kind:'union', choices: [undefined, {kind:'object', type:'.simple.Child', name:'Child'} as MetaMessage]} as MetaUnion,
  state: {kind:'union', choices: [undefined, {kind:'object', type:'.simple.StateEnum', name:'StateEnum'} as MetaMessage]} as MetaUnion,
  thing: {kind:'union', choices: [undefined, {kind:'object', type:'.simple.ImportedThing', name:'ImportedThing'} as MetaMessage]} as MetaUnion,
  birthday: {kind:'union', choices: [undefined, {kind:'object', type:'.google.type.Date', name:'DateMessage'} as MetaMessage]} as MetaUnion,
}
export const metaEmpty: { [key in keyof Required<Empty>]: MetaBase | string } = {
}
export const metaPingService: { [key in keyof PingService]: MetaService<any, any> } = {
  ping: {request: {kind:'object', type:'.simple.PingRequest', name:'PingRequest'} as MetaMessage, response: {kind:'object', type:'.simple.PingResponse', name:'PingResponse'} as MetaMessage, clientStreaming: false, serverStreaming: false, encodeRequest: PingRequest.encode, decodeResponse: PingResponse.decode} as MetaService<PingRequest, PingResponse>,
}
export const metadata: { [key: string]: ['service', string, any, { [key: string]: MetaService<any, any> }] | ['enum', string, any, any] | ['message', string, any, { [key: string]: MetaBase | string }] } = {
  StateEnum: ['enum', '.simple.StateEnum', StateEnum, undefined],
  Simple: ['message', '.simple.Simple', Simple, metaSimple],
  Child: ['message', '.simple.Child', Child, metaChild],
  Child_Type: ['enum', '.simple.Child.Type', Child_Type, undefined],
  Nested: ['message', '.simple.Nested', Nested, metaNested],
  Nested_InnerEnum: ['enum', '.simple.Nested.InnerEnum', Nested_InnerEnum, undefined],
  Nested_InnerMessage: ['message', '.simple.Nested.InnerMessage', Nested_InnerMessage, metaNested_InnerMessage],
  Nested_InnerMessage_DeepMessage: ['message', '.simple.Nested.InnerMessage.DeepMessage', Nested_InnerMessage_DeepMessage, metaNested_InnerMessage_DeepMessage],
  OneOfMessage: ['message', '.simple.OneOfMessage', OneOfMessage, metaOneOfMessage],
  SimpleWithWrappers: ['message', '.simple.SimpleWithWrappers', SimpleWithWrappers, metaSimpleWithWrappers],
  Entity: ['message', '.simple.Entity', Entity, metaEntity],
  SimpleWithMap: ['message', '.simple.SimpleWithMap', SimpleWithMap, metaSimpleWithMap],
  SimpleWithMap_EntitiesByIdEntry: ['message', '.simple.SimpleWithMap.EntitiesByIdEntry', SimpleWithMap_EntitiesByIdEntry, metaSimpleWithMap_EntitiesByIdEntry],
  SimpleWithMap_NameLookupEntry: ['message', '.simple.SimpleWithMap.NameLookupEntry', SimpleWithMap_NameLookupEntry, metaSimpleWithMap_NameLookupEntry],
  SimpleWithMap_IntLookupEntry: ['message', '.simple.SimpleWithMap.IntLookupEntry', SimpleWithMap_IntLookupEntry, metaSimpleWithMap_IntLookupEntry],
  SimpleWithMap_MapOfTimestampsEntry: ['message', '.simple.SimpleWithMap.MapOfTimestampsEntry', SimpleWithMap_MapOfTimestampsEntry, metaSimpleWithMap_MapOfTimestampsEntry],
  SimpleWithMap_MapOfBytesEntry: ['message', '.simple.SimpleWithMap.MapOfBytesEntry', SimpleWithMap_MapOfBytesEntry, metaSimpleWithMap_MapOfBytesEntry],
  SimpleWithSnakeCaseMap: ['message', '.simple.SimpleWithSnakeCaseMap', SimpleWithSnakeCaseMap, metaSimpleWithSnakeCaseMap],
  SimpleWithSnakeCaseMap_EntitiesByIdEntry: ['message', '.simple.SimpleWithSnakeCaseMap.EntitiesByIdEntry', SimpleWithSnakeCaseMap_EntitiesByIdEntry, metaSimpleWithSnakeCaseMap_EntitiesByIdEntry],
  SimpleWithMapOfEnums: ['message', '.simple.SimpleWithMapOfEnums', SimpleWithMapOfEnums, metaSimpleWithMapOfEnums],
  SimpleWithMapOfEnums_EnumsByIdEntry: ['message', '.simple.SimpleWithMapOfEnums.EnumsByIdEntry', SimpleWithMapOfEnums_EnumsByIdEntry, metaSimpleWithMapOfEnums_EnumsByIdEntry],
  PingRequest: ['message', '.simple.PingRequest', PingRequest, metaPingRequest],
  PingResponse: ['message', '.simple.PingResponse', PingResponse, metaPingResponse],
  Numbers: ['message', '.simple.Numbers', Numbers, metaNumbers],
  SimpleButOptional: ['message', '.simple.SimpleButOptional', SimpleButOptional, metaSimpleButOptional],
  Empty: ['message', '.simple.Empty', Empty, metaEmpty],
  PingService: ['service', '.simple.PingService', undefined, metaPingService],
}
if (util.Long !== Long as any) {
  util.Long = Long as any;
  configure();
}
