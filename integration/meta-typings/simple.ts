/* eslint-disable */
import { IFileDescriptorProto } from 'protobufjs/ext/descriptor';
import { Reader, util, configure, Writer } from 'protobufjs/minimal';
import { protoMetadata as google_type_date_protoMetadata, DateMessage } from './google/type/date';
import {
  protoMetadata as google_protobuf_wrappers_protoMetadata,
  StringValue,
  Int32Value,
  BoolValue,
} from './google/protobuf/wrappers';
import { protoMetadata as google_protobuf_timestamp_protoMetadata, Timestamp } from './google/protobuf/timestamp';
import { protoMetadata as import_dir_thing_protoMetadata, ImportedThing } from './import_dir/thing';
import * as Long from 'long';

export const protobufPackage = 'simple';

/**
 * Adding a comment to the syntax will become the first
 * comment in the output source file.
 */

export enum StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
  UNRECOGNIZED = -1,
}

/** Example comment on the Simple message */
export interface Simple {
  /** Name field */
  name: string;
  /** Age */
  age: number;
  /** This comment will also attach */
  createdAt: Date | undefined;
  child: Child | undefined;
  state: StateEnum;
  grandChildren: Child[];
  coins: number[];
  snacks: string[];
  oldStates: StateEnum[];
  /** A thing (imported from thing) */
  thing: ImportedThing | undefined;
  blobs: Uint8Array[];
  birthday: DateMessage | undefined;
  blob: Uint8Array;
}

export interface Child {
  name: string;
  type: Child_Type;
}

export enum Child_Type {
  UNKNOWN = 0,
  GOOD = 1,
  BAD = 2,
  UNRECOGNIZED = -1,
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
  UNRECOGNIZED = -1,
}

/** Comment for a nested message * / */
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

/** For testing proto3's field presence feature. */
export interface SimpleButOptional {
  /** Name field */
  name?: string | undefined;
  /** Age */
  age?: number | undefined;
  /** This comment will also attach */
  createdAt?: Date | undefined;
  child?: Child | undefined;
  state?: StateEnum | undefined;
  /** A thing (imported from thing) */
  thing?: ImportedThing | undefined;
  birthday?: DateMessage | undefined;
}

export interface Empty {}

const baseSimple: object = { name: '', age: 0, state: 0, coins: 0, snacks: '', oldStates: 0 };

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

  decode(input: Reader | Uint8Array, length?: number): Simple {
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

const baseChild: object = { name: '', type: 0 };

export const Child = {
  encode(message: Child, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    writer.uint32(16).int32(message.type);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Child {
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

const baseNested: object = { name: '', state: 0 };

export const Nested = {
  encode(message: Nested, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    if (message.message !== undefined && message.message !== undefined) {
      Nested_InnerMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(24).int32(message.state);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Nested {
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

const baseNested_InnerMessage: object = { name: '' };

export const Nested_InnerMessage = {
  encode(message: Nested_InnerMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    if (message.deep !== undefined && message.deep !== undefined) {
      Nested_InnerMessage_DeepMessage.encode(message.deep, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Nested_InnerMessage {
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

const baseNested_InnerMessage_DeepMessage: object = { name: '' };

export const Nested_InnerMessage_DeepMessage = {
  encode(message: Nested_InnerMessage_DeepMessage, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.name);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Nested_InnerMessage_DeepMessage {
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

const baseOneOfMessage: object = {};

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

  decode(input: Reader | Uint8Array, length?: number): OneOfMessage {
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

const baseSimpleWithWrappers: object = {};

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

  decode(input: Reader | Uint8Array, length?: number): SimpleWithWrappers {
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

const baseEntity: object = { id: 0 };

export const Entity = {
  encode(message: Entity, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.id);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Entity {
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

const baseSimpleWithMap: object = {};

export const SimpleWithMap = {
  encode(message: SimpleWithMap, writer: Writer = Writer.create()): Writer {
    Object.entries(message.entitiesById).forEach(([key, value]) => {
      SimpleWithMap_EntitiesByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    Object.entries(message.nameLookup).forEach(([key, value]) => {
      SimpleWithMap_NameLookupEntry.encode({ key: key as any, value }, writer.uint32(18).fork()).ldelim();
    });
    Object.entries(message.intLookup).forEach(([key, value]) => {
      SimpleWithMap_IntLookupEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    Object.entries(message.mapOfTimestamps).forEach(([key, value]) => {
      SimpleWithMap_MapOfTimestampsEntry.encode({ key: key as any, value }, writer.uint32(34).fork()).ldelim();
    });
    Object.entries(message.mapOfBytes).forEach(([key, value]) => {
      SimpleWithMap_MapOfBytesEntry.encode({ key: key as any, value }, writer.uint32(42).fork()).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap {
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

const baseSimpleWithMap_EntitiesByIdEntry: object = { key: 0 };

export const SimpleWithMap_EntitiesByIdEntry = {
  encode(message: SimpleWithMap_EntitiesByIdEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    if (message.value !== undefined && message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_EntitiesByIdEntry {
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

const baseSimpleWithMap_NameLookupEntry: object = { key: '', value: '' };

export const SimpleWithMap_NameLookupEntry = {
  encode(message: SimpleWithMap_NameLookupEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).string(message.value);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_NameLookupEntry {
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

const baseSimpleWithMap_IntLookupEntry: object = { key: 0, value: 0 };

export const SimpleWithMap_IntLookupEntry = {
  encode(message: SimpleWithMap_IntLookupEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    writer.uint32(16).int32(message.value);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_IntLookupEntry {
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

const baseSimpleWithMap_MapOfTimestampsEntry: object = { key: '' };

export const SimpleWithMap_MapOfTimestampsEntry = {
  encode(message: SimpleWithMap_MapOfTimestampsEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    if (message.value !== undefined && message.value !== undefined) {
      Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_MapOfTimestampsEntry {
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

const baseSimpleWithMap_MapOfBytesEntry: object = { key: '' };

export const SimpleWithMap_MapOfBytesEntry = {
  encode(message: SimpleWithMap_MapOfBytesEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.key);
    writer.uint32(18).bytes(message.value);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_MapOfBytesEntry {
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

const baseSimpleWithSnakeCaseMap: object = {};

export const SimpleWithSnakeCaseMap = {
  encode(message: SimpleWithSnakeCaseMap, writer: Writer = Writer.create()): Writer {
    Object.entries(message.entitiesById).forEach(([key, value]) => {
      SimpleWithSnakeCaseMap_EntitiesByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithSnakeCaseMap {
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

const baseSimpleWithSnakeCaseMap_EntitiesByIdEntry: object = { key: 0 };

export const SimpleWithSnakeCaseMap_EntitiesByIdEntry = {
  encode(message: SimpleWithSnakeCaseMap_EntitiesByIdEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    if (message.value !== undefined && message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
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

const baseSimpleWithMapOfEnums: object = {};

export const SimpleWithMapOfEnums = {
  encode(message: SimpleWithMapOfEnums, writer: Writer = Writer.create()): Writer {
    Object.entries(message.enumsById).forEach(([key, value]) => {
      SimpleWithMapOfEnums_EnumsByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMapOfEnums {
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

const baseSimpleWithMapOfEnums_EnumsByIdEntry: object = { key: 0, value: 0 };

export const SimpleWithMapOfEnums_EnumsByIdEntry = {
  encode(message: SimpleWithMapOfEnums_EnumsByIdEntry, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.key);
    writer.uint32(16).int32(message.value);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMapOfEnums_EnumsByIdEntry {
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

const basePingRequest: object = { input: '' };

export const PingRequest = {
  encode(message: PingRequest, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.input);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PingRequest {
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

const basePingResponse: object = { output: '' };

export const PingResponse = {
  encode(message: PingResponse, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).string(message.output);
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PingResponse {
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

  decode(input: Reader | Uint8Array, length?: number): Numbers {
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

const baseSimpleButOptional: object = {};

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

  decode(input: Reader | Uint8Array, length?: number): SimpleButOptional {
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

const baseEmpty: object = {};

export const Empty = {
  encode(_: Empty, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Empty {
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
    const promise = this.rpc.request('simple.PingService', 'ping', data);
    return promise.then((data) => PingResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

export interface ProtoMetadata {
  fileDescriptor: IFileDescriptorProto;
  references: { [key: string]: any };
  dependencies?: ProtoMetadata[];
}

export const protoMetadata: ProtoMetadata = {
  fileDescriptor: {
    name: 'simple.proto',
    package: 'simple',
    dependency: [
      'google/type/date.proto',
      'google/protobuf/wrappers.proto',
      'google/protobuf/timestamp.proto',
      'import_dir/thing.proto',
    ],
    messageType: [
      {
        name: 'Simple',
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          { name: 'age', number: 2, label: 1, type: 5, jsonName: 'age' },
          {
            name: 'created_at',
            number: 9,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.Timestamp',
            jsonName: 'createdAt',
          },
          { name: 'child', number: 3, label: 1, type: 11, typeName: '.simple.Child', jsonName: 'child' },
          { name: 'state', number: 4, label: 1, type: 14, typeName: '.simple.StateEnum', jsonName: 'state' },
          {
            name: 'grand_children',
            number: 5,
            label: 3,
            type: 11,
            typeName: '.simple.Child',
            jsonName: 'grandChildren',
          },
          { name: 'coins', number: 6, label: 3, type: 5, jsonName: 'coins' },
          { name: 'snacks', number: 7, label: 3, type: 9, jsonName: 'snacks' },
          { name: 'old_states', number: 8, label: 3, type: 14, typeName: '.simple.StateEnum', jsonName: 'oldStates' },
          { name: 'thing', number: 10, label: 1, type: 11, typeName: '.simple.ImportedThing', jsonName: 'thing' },
          { name: 'blobs', number: 11, label: 3, type: 12, jsonName: 'blobs' },
          { name: 'birthday', number: 12, label: 1, type: 11, typeName: '.google.type.Date', jsonName: 'birthday' },
          { name: 'blob', number: 13, label: 1, type: 12, jsonName: 'blob' },
        ],
      },
      {
        name: 'Child',
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          { name: 'type', number: 2, label: 1, type: 14, typeName: '.simple.Child.Type', jsonName: 'type' },
        ],
        enumType: [
          {
            name: 'Type',
            value: [
              { name: 'UNKNOWN', number: 0 },
              { name: 'GOOD', number: 1 },
              { name: 'BAD', number: 2 },
            ],
          },
        ],
      },
      {
        name: 'Nested',
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          {
            name: 'message',
            number: 2,
            label: 1,
            type: 11,
            typeName: '.simple.Nested.InnerMessage',
            jsonName: 'message',
          },
          { name: 'state', number: 3, label: 1, type: 14, typeName: '.simple.Nested.InnerEnum', jsonName: 'state' },
        ],
        nestedType: [
          {
            name: 'InnerMessage',
            field: [
              { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
              {
                name: 'deep',
                number: 2,
                label: 1,
                type: 11,
                typeName: '.simple.Nested.InnerMessage.DeepMessage',
                jsonName: 'deep',
              },
            ],
            nestedType: [
              { name: 'DeepMessage', field: [{ name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' }] },
            ],
          },
        ],
        enumType: [
          {
            name: 'InnerEnum',
            value: [
              { name: 'UNKNOWN_INNER', number: 0 },
              { name: 'GOOD', number: 100 },
              { name: 'BAD', number: 1000 },
            ],
          },
        ],
      },
      {
        name: 'OneOfMessage',
        field: [
          { name: 'first', number: 1, label: 1, type: 9, oneofIndex: 0, jsonName: 'first' },
          { name: 'last', number: 2, label: 1, type: 9, oneofIndex: 0, jsonName: 'last' },
        ],
        oneofDecl: [{ name: 'name_fields' }],
      },
      {
        name: 'SimpleWithWrappers',
        field: [
          { name: 'name', number: 1, label: 1, type: 11, typeName: '.google.protobuf.StringValue', jsonName: 'name' },
          { name: 'age', number: 2, label: 1, type: 11, typeName: '.google.protobuf.Int32Value', jsonName: 'age' },
          {
            name: 'enabled',
            number: 3,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.BoolValue',
            jsonName: 'enabled',
          },
          { name: 'coins', number: 6, label: 3, type: 11, typeName: '.google.protobuf.Int32Value', jsonName: 'coins' },
          {
            name: 'snacks',
            number: 7,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.StringValue',
            jsonName: 'snacks',
          },
        ],
      },
      { name: 'Entity', field: [{ name: 'id', number: 1, label: 1, type: 5, jsonName: 'id' }] },
      {
        name: 'SimpleWithMap',
        field: [
          {
            name: 'entitiesById',
            number: 1,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.EntitiesByIdEntry',
            jsonName: 'entitiesById',
          },
          {
            name: 'nameLookup',
            number: 2,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.NameLookupEntry',
            jsonName: 'nameLookup',
          },
          {
            name: 'intLookup',
            number: 3,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.IntLookupEntry',
            jsonName: 'intLookup',
          },
          {
            name: 'mapOfTimestamps',
            number: 4,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.MapOfTimestampsEntry',
            jsonName: 'mapOfTimestamps',
          },
          {
            name: 'mapOfBytes',
            number: 5,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.MapOfBytesEntry',
            jsonName: 'mapOfBytes',
          },
        ],
        nestedType: [
          {
            name: 'EntitiesByIdEntry',
            field: [
              { name: 'key', number: 1, label: 1, type: 5, jsonName: 'key' },
              { name: 'value', number: 2, label: 1, type: 11, typeName: '.simple.Entity', jsonName: 'value' },
            ],
            options: { mapEntry: true },
          },
          {
            name: 'NameLookupEntry',
            field: [
              { name: 'key', number: 1, label: 1, type: 9, jsonName: 'key' },
              { name: 'value', number: 2, label: 1, type: 9, jsonName: 'value' },
            ],
            options: { mapEntry: true },
          },
          {
            name: 'IntLookupEntry',
            field: [
              { name: 'key', number: 1, label: 1, type: 5, jsonName: 'key' },
              { name: 'value', number: 2, label: 1, type: 5, jsonName: 'value' },
            ],
            options: { mapEntry: true },
          },
          {
            name: 'MapOfTimestampsEntry',
            field: [
              { name: 'key', number: 1, label: 1, type: 9, jsonName: 'key' },
              {
                name: 'value',
                number: 2,
                label: 1,
                type: 11,
                typeName: '.google.protobuf.Timestamp',
                jsonName: 'value',
              },
            ],
            options: { mapEntry: true },
          },
          {
            name: 'MapOfBytesEntry',
            field: [
              { name: 'key', number: 1, label: 1, type: 9, jsonName: 'key' },
              { name: 'value', number: 2, label: 1, type: 12, jsonName: 'value' },
            ],
            options: { mapEntry: true },
          },
        ],
      },
      {
        name: 'SimpleWithSnakeCaseMap',
        field: [
          {
            name: 'entities_by_id',
            number: 1,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithSnakeCaseMap.EntitiesByIdEntry',
            jsonName: 'entitiesById',
          },
        ],
        nestedType: [
          {
            name: 'EntitiesByIdEntry',
            field: [
              { name: 'key', number: 1, label: 1, type: 5, jsonName: 'key' },
              { name: 'value', number: 2, label: 1, type: 11, typeName: '.simple.Entity', jsonName: 'value' },
            ],
            options: { mapEntry: true },
          },
        ],
      },
      {
        name: 'SimpleWithMapOfEnums',
        field: [
          {
            name: 'enums_by_id',
            number: 1,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMapOfEnums.EnumsByIdEntry',
            jsonName: 'enumsById',
          },
        ],
        nestedType: [
          {
            name: 'EnumsByIdEntry',
            field: [
              { name: 'key', number: 1, label: 1, type: 5, jsonName: 'key' },
              { name: 'value', number: 2, label: 1, type: 14, typeName: '.simple.StateEnum', jsonName: 'value' },
            ],
            options: { mapEntry: true },
          },
        ],
      },
      { name: 'PingRequest', field: [{ name: 'input', number: 1, label: 1, type: 9, jsonName: 'input' }] },
      { name: 'PingResponse', field: [{ name: 'output', number: 1, label: 1, type: 9, jsonName: 'output' }] },
      {
        name: 'Numbers',
        field: [
          { name: 'double', number: 1, label: 1, type: 1, jsonName: 'double' },
          { name: 'float', number: 2, label: 1, type: 2, jsonName: 'float' },
          { name: 'int32', number: 3, label: 1, type: 5, jsonName: 'int32' },
          { name: 'int64', number: 4, label: 1, type: 3, jsonName: 'int64' },
          { name: 'uint32', number: 5, label: 1, type: 13, jsonName: 'uint32' },
          { name: 'uint64', number: 6, label: 1, type: 4, jsonName: 'uint64' },
          { name: 'sint32', number: 7, label: 1, type: 17, jsonName: 'sint32' },
          { name: 'sint64', number: 8, label: 1, type: 18, jsonName: 'sint64' },
          { name: 'fixed32', number: 9, label: 1, type: 7, jsonName: 'fixed32' },
          { name: 'fixed64', number: 10, label: 1, type: 6, jsonName: 'fixed64' },
          { name: 'sfixed32', number: 11, label: 1, type: 15, jsonName: 'sfixed32' },
          { name: 'sfixed64', number: 12, label: 1, type: 16, jsonName: 'sfixed64' },
        ],
      },
      {
        name: 'SimpleButOptional',
        field: [
          { name: 'name', number: 1, label: 1, type: 9, oneofIndex: 0, jsonName: 'name', proto3Optional: true },
          { name: 'age', number: 2, label: 1, type: 5, oneofIndex: 1, jsonName: 'age', proto3Optional: true },
          {
            name: 'created_at',
            number: 9,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.Timestamp',
            oneofIndex: 2,
            jsonName: 'createdAt',
            proto3Optional: true,
          },
          {
            name: 'child',
            number: 3,
            label: 1,
            type: 11,
            typeName: '.simple.Child',
            oneofIndex: 3,
            jsonName: 'child',
            proto3Optional: true,
          },
          {
            name: 'state',
            number: 4,
            label: 1,
            type: 14,
            typeName: '.simple.StateEnum',
            oneofIndex: 4,
            jsonName: 'state',
            proto3Optional: true,
          },
          {
            name: 'thing',
            number: 10,
            label: 1,
            type: 11,
            typeName: '.simple.ImportedThing',
            oneofIndex: 5,
            jsonName: 'thing',
            proto3Optional: true,
          },
          {
            name: 'birthday',
            number: 12,
            label: 1,
            type: 11,
            typeName: '.google.type.Date',
            oneofIndex: 6,
            jsonName: 'birthday',
            proto3Optional: true,
          },
        ],
        oneofDecl: [
          { name: '_name' },
          { name: '_age' },
          { name: '_created_at' },
          { name: '_child' },
          { name: '_state' },
          { name: '_thing' },
          { name: '_birthday' },
        ],
      },
      { name: 'Empty' },
    ],
    enumType: [
      {
        name: 'StateEnum',
        value: [
          { name: 'UNKNOWN', number: 0 },
          { name: 'ON', number: 2 },
          { name: 'OFF', number: 3 },
        ],
      },
    ],
    service: [
      {
        name: 'PingService',
        method: [{ name: 'ping', inputType: '.simple.PingRequest', outputType: '.simple.PingResponse' }],
      },
    ],
    sourceCodeInfo: {
      location: [
        {
          path: [12],
          span: [2, 0, 18],
          leadingComments:
            ' Adding a comment to the syntax will become the first\n comment in the output source file.\n',
        },
        {
          path: [4, 0],
          span: [13, 0, 30, 1],
          leadingComments: '* Example comment on the Simple message ',
          leadingDetachedComments: [
            ' This comment is seperated by a blank non-comment line, and will detatch from \n the following comment on the message Simple.\n',
          ],
        },
        { path: [4, 0, 2, 0], span: [15, 2, 18], leadingComments: ' Name field\n' },
        { path: [4, 0, 2, 1], span: [17, 2, 16], leadingComments: ' Age ' },
        { path: [4, 0, 2, 2], span: [18, 2, 43], trailingComments: ' This comment will also attach\n' },
        { path: [4, 0, 2, 9], span: [26, 2, 27], leadingComments: ' A thing (imported from thing)\n' },
        { path: [4, 2, 3, 0], span: [54, 2, 61, 3], leadingComments: ' Comment for a nested message */\n' },
        { path: [4, 12], span: [133, 0, 144, 1], leadingComments: "* For testing proto3's field presence feature. " },
        { path: [4, 12, 2, 0], span: [135, 2, 27], leadingComments: ' Name field\n' },
        { path: [4, 12, 2, 1], span: [137, 2, 25], leadingComments: ' Age ' },
        { path: [4, 12, 2, 2], span: [138, 2, 52], trailingComments: ' This comment will also attach\n' },
        { path: [4, 12, 2, 5], span: [142, 2, 36], leadingComments: ' A thing (imported from thing)\n' },
      ],
    },
    syntax: 'proto3',
  } as any,
  references: {
    '.simple.StateEnum': StateEnum,
    '.simple.Simple': Simple,
    '.simple.Child': Child,
    '.simple.Child.Type': Child_Type,
    '.simple.Nested': Nested,
    '.simple.Nested.InnerEnum': Nested_InnerEnum,
    '.simple.Nested.InnerMessage': Nested_InnerMessage,
    '.simple.Nested.InnerMessage.DeepMessage': Nested_InnerMessage_DeepMessage,
    '.simple.OneOfMessage': OneOfMessage,
    '.simple.SimpleWithWrappers': SimpleWithWrappers,
    '.simple.Entity': Entity,
    '.simple.SimpleWithMap': SimpleWithMap,
    '.simple.SimpleWithMap.EntitiesByIdEntry': SimpleWithMap_EntitiesByIdEntry,
    '.simple.SimpleWithMap.NameLookupEntry': SimpleWithMap_NameLookupEntry,
    '.simple.SimpleWithMap.IntLookupEntry': SimpleWithMap_IntLookupEntry,
    '.simple.SimpleWithMap.MapOfTimestampsEntry': SimpleWithMap_MapOfTimestampsEntry,
    '.simple.SimpleWithMap.MapOfBytesEntry': SimpleWithMap_MapOfBytesEntry,
    '.simple.SimpleWithSnakeCaseMap': SimpleWithSnakeCaseMap,
    '.simple.SimpleWithSnakeCaseMap.EntitiesByIdEntry': SimpleWithSnakeCaseMap_EntitiesByIdEntry,
    '.simple.SimpleWithMapOfEnums': SimpleWithMapOfEnums,
    '.simple.SimpleWithMapOfEnums.EnumsByIdEntry': SimpleWithMapOfEnums_EnumsByIdEntry,
    '.simple.PingRequest': PingRequest,
    '.simple.PingResponse': PingResponse,
    '.simple.Numbers': Numbers,
    '.simple.SimpleButOptional': SimpleButOptional,
    '.simple.Empty': Empty,
    '.simple.PingService': PingServiceClientImpl,
  },
  dependencies: [
    google_type_date_protoMetadata,
    google_protobuf_wrappers_protoMetadata,
    google_protobuf_timestamp_protoMetadata,
    import_dir_thing_protoMetadata,
  ],
};

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('Unable to locate global object');
})();

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
