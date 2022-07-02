/* eslint-disable */
import { FileDescriptorProto } from 'ts-proto-descriptors';
import { protoMetadata as protoMetadata1 } from './google/type/date';
import { protoMetadata as protoMetadata2 } from './google/protobuf/wrappers';
import { protoMetadata as protoMetadata3 } from './google/protobuf/timestamp';
import { protoMetadata as protoMetadata4 } from './import_dir/thing';
import { Timestamp } from './google/protobuf/timestamp.js';
import * as Long from 'long';
import { ImportedThing } from './import_dir/thing.js';
import { DateMessage } from './google/type/date.js';
import * as _m0 from 'protobufjs/minimal';
import { StringValue, Int32Value, BoolValue } from './google/protobuf/wrappers.js';

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

function createBaseSimple(): Simple {
  return {
    name: '',
    age: 0,
    createdAt: undefined,
    child: undefined,
    state: 0,
    grandChildren: [],
    coins: [],
    snacks: [],
    oldStates: [],
    thing: undefined,
    blobs: [],
    birthday: undefined,
    blob: new Uint8Array(),
  };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
    }
    if (message.child !== undefined) {
      Child.encode(message.child, writer.uint32(26).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
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
    if (message.thing !== undefined) {
      ImportedThing.encode(message.thing, writer.uint32(82).fork()).ldelim();
    }
    for (const v of message.blobs) {
      writer.uint32(90).bytes(v!);
    }
    if (message.birthday !== undefined) {
      DateMessage.encode(message.birthday, writer.uint32(98).fork()).ldelim();
    }
    if (message.blob.length !== 0) {
      writer.uint32(106).bytes(message.blob);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple();
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

function createBaseChild(): Child {
  return { name: '', type: 0 };
}

export const Child = {
  encode(message: Child, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Child {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChild();
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

function createBaseNested(): Nested {
  return { name: '', message: undefined, state: 0 };
}

export const Nested = {
  encode(message: Nested, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.message !== undefined) {
      Nested_InnerMessage.encode(message.message, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(24).int32(message.state);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Nested {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNested();
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

function createBaseNested_InnerMessage(): Nested_InnerMessage {
  return { name: '', deep: undefined };
}

export const Nested_InnerMessage = {
  encode(message: Nested_InnerMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.deep !== undefined) {
      Nested_InnerMessage_DeepMessage.encode(message.deep, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Nested_InnerMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNested_InnerMessage();
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

function createBaseNested_InnerMessage_DeepMessage(): Nested_InnerMessage_DeepMessage {
  return { name: '' };
}

export const Nested_InnerMessage_DeepMessage = {
  encode(message: Nested_InnerMessage_DeepMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Nested_InnerMessage_DeepMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNested_InnerMessage_DeepMessage();
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

function createBaseOneOfMessage(): OneOfMessage {
  return { first: undefined, last: undefined };
}

export const OneOfMessage = {
  encode(message: OneOfMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.first !== undefined) {
      writer.uint32(10).string(message.first);
    }
    if (message.last !== undefined) {
      writer.uint32(18).string(message.last);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OneOfMessage {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOneOfMessage();
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

function createBaseSimpleWithWrappers(): SimpleWithWrappers {
  return { name: undefined, age: undefined, enabled: undefined, coins: [], snacks: [] };
}

export const SimpleWithWrappers = {
  encode(message: SimpleWithWrappers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== undefined) {
      StringValue.encode({ value: message.name! }, writer.uint32(10).fork()).ldelim();
    }
    if (message.age !== undefined) {
      Int32Value.encode({ value: message.age! }, writer.uint32(18).fork()).ldelim();
    }
    if (message.enabled !== undefined) {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithWrappers {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithWrappers();
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

function createBaseEntity(): Entity {
  return { id: 0 };
}

export const Entity = {
  encode(message: Entity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Entity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntity();
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

function createBaseSimpleWithMap(): SimpleWithMap {
  return { entitiesById: {}, nameLookup: {}, intLookup: {}, mapOfTimestamps: {}, mapOfBytes: {} };
}

export const SimpleWithMap = {
  encode(message: SimpleWithMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap();
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

function createBaseSimpleWithMap_EntitiesByIdEntry(): SimpleWithMap_EntitiesByIdEntry {
  return { key: 0, value: undefined };
}

export const SimpleWithMap_EntitiesByIdEntry = {
  encode(message: SimpleWithMap_EntitiesByIdEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_EntitiesByIdEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_EntitiesByIdEntry();
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

function createBaseSimpleWithMap_NameLookupEntry(): SimpleWithMap_NameLookupEntry {
  return { key: '', value: '' };
}

export const SimpleWithMap_NameLookupEntry = {
  encode(message: SimpleWithMap_NameLookupEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_NameLookupEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_NameLookupEntry();
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

function createBaseSimpleWithMap_IntLookupEntry(): SimpleWithMap_IntLookupEntry {
  return { key: 0, value: 0 };
}

export const SimpleWithMap_IntLookupEntry = {
  encode(message: SimpleWithMap_IntLookupEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_IntLookupEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_IntLookupEntry();
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

function createBaseSimpleWithMap_MapOfTimestampsEntry(): SimpleWithMap_MapOfTimestampsEntry {
  return { key: '', value: undefined };
}

export const SimpleWithMap_MapOfTimestampsEntry = {
  encode(message: SimpleWithMap_MapOfTimestampsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_MapOfTimestampsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_MapOfTimestampsEntry();
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

function createBaseSimpleWithMap_MapOfBytesEntry(): SimpleWithMap_MapOfBytesEntry {
  return { key: '', value: new Uint8Array() };
}

export const SimpleWithMap_MapOfBytesEntry = {
  encode(message: SimpleWithMap_MapOfBytesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_MapOfBytesEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMap_MapOfBytesEntry();
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

function createBaseSimpleWithSnakeCaseMap(): SimpleWithSnakeCaseMap {
  return { entitiesById: {} };
}

export const SimpleWithSnakeCaseMap = {
  encode(message: SimpleWithSnakeCaseMap, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.entitiesById).forEach(([key, value]) => {
      SimpleWithSnakeCaseMap_EntitiesByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithSnakeCaseMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithSnakeCaseMap();
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

function createBaseSimpleWithSnakeCaseMap_EntitiesByIdEntry(): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
  return { key: 0, value: undefined };
}

export const SimpleWithSnakeCaseMap_EntitiesByIdEntry = {
  encode(message: SimpleWithSnakeCaseMap_EntitiesByIdEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithSnakeCaseMap_EntitiesByIdEntry();
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

function createBaseSimpleWithMapOfEnums(): SimpleWithMapOfEnums {
  return { enumsById: {} };
}

export const SimpleWithMapOfEnums = {
  encode(message: SimpleWithMapOfEnums, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    Object.entries(message.enumsById).forEach(([key, value]) => {
      SimpleWithMapOfEnums_EnumsByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMapOfEnums {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMapOfEnums();
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

function createBaseSimpleWithMapOfEnums_EnumsByIdEntry(): SimpleWithMapOfEnums_EnumsByIdEntry {
  return { key: 0, value: 0 };
}

export const SimpleWithMapOfEnums_EnumsByIdEntry = {
  encode(message: SimpleWithMapOfEnums_EnumsByIdEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMapOfEnums_EnumsByIdEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleWithMapOfEnums_EnumsByIdEntry();
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

function createBasePingRequest(): PingRequest {
  return { input: '' };
}

export const PingRequest = {
  encode(message: PingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.input !== '') {
      writer.uint32(10).string(message.input);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingRequest();
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

function createBasePingResponse(): PingResponse {
  return { output: '' };
}

export const PingResponse = {
  encode(message: PingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.output !== '') {
      writer.uint32(10).string(message.output);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePingResponse();
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

function createBaseNumbers(): Numbers {
  return {
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
}

export const Numbers = {
  encode(message: Numbers, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.double !== 0) {
      writer.uint32(9).double(message.double);
    }
    if (message.float !== 0) {
      writer.uint32(21).float(message.float);
    }
    if (message.int32 !== 0) {
      writer.uint32(24).int32(message.int32);
    }
    if (message.int64 !== 0) {
      writer.uint32(32).int64(message.int64);
    }
    if (message.uint32 !== 0) {
      writer.uint32(40).uint32(message.uint32);
    }
    if (message.uint64 !== 0) {
      writer.uint32(48).uint64(message.uint64);
    }
    if (message.sint32 !== 0) {
      writer.uint32(56).sint32(message.sint32);
    }
    if (message.sint64 !== 0) {
      writer.uint32(64).sint64(message.sint64);
    }
    if (message.fixed32 !== 0) {
      writer.uint32(77).fixed32(message.fixed32);
    }
    if (message.fixed64 !== 0) {
      writer.uint32(81).fixed64(message.fixed64);
    }
    if (message.sfixed32 !== 0) {
      writer.uint32(93).sfixed32(message.sfixed32);
    }
    if (message.sfixed64 !== 0) {
      writer.uint32(97).sfixed64(message.sfixed64);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Numbers {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNumbers();
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

function createBaseSimpleButOptional(): SimpleButOptional {
  return {
    name: undefined,
    age: undefined,
    createdAt: undefined,
    child: undefined,
    state: undefined,
    thing: undefined,
    birthday: undefined,
  };
}

export const SimpleButOptional = {
  encode(message: SimpleButOptional, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleButOptional {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimpleButOptional();
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

function createBaseEmpty(): Empty {
  return {};
}

export const Empty = {
  encode(_: Empty, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmpty();
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
    this.ping = this.ping.bind(this);
  }
  ping(request: PingRequest): Promise<PingResponse> {
    const data = PingRequest.encode(request).finish();
    const promise = this.rpc.request('simple.PingService', 'ping', data);
    return promise.then((data) => PingResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type ProtoMetaMessageOptions = {
  options?: { [key: string]: any };
  fields?: { [key: string]: { [key: string]: any } };
  oneof?: { [key: string]: { [key: string]: any } };
  nested?: { [key: string]: ProtoMetaMessageOptions };
};

export interface ProtoMetadata {
  fileDescriptor: FileDescriptorProto;
  references: { [key: string]: any };
  dependencies?: ProtoMetadata[];
  options?: {
    options?: { [key: string]: any };
    services?: {
      [key: string]: {
        options?: { [key: string]: any };
        methods?: { [key: string]: { [key: string]: any } };
      };
    };
    messages?: {
      [key: string]: ProtoMetaMessageOptions;
    };
    enums?: {
      [key: string]: {
        options?: { [key: string]: any };
        values?: { [key: string]: { [key: string]: any } };
      };
    };
  };
}

export const protoMetadata: ProtoMetadata = {
  fileDescriptor: FileDescriptorProto.fromPartial({
    name: 'simple.proto',
    package: 'simple',
    dependency: [
      'google/type/date.proto',
      'google/protobuf/wrappers.proto',
      'google/protobuf/timestamp.proto',
      'import_dir/thing.proto',
    ],
    publicDependency: [],
    weakDependency: [],
    messageType: [
      {
        name: 'Simple',
        field: [
          {
            name: 'name',
            number: 1,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'name',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'age',
            number: 2,
            label: 1,
            type: 5,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'age',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'created_at',
            number: 9,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.Timestamp',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'createdAt',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'child',
            number: 3,
            label: 1,
            type: 11,
            typeName: '.simple.Child',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'child',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'state',
            number: 4,
            label: 1,
            type: 14,
            typeName: '.simple.StateEnum',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'state',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'grand_children',
            number: 5,
            label: 3,
            type: 11,
            typeName: '.simple.Child',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'grandChildren',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'coins',
            number: 6,
            label: 3,
            type: 5,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'coins',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'snacks',
            number: 7,
            label: 3,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'snacks',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'old_states',
            number: 8,
            label: 3,
            type: 14,
            typeName: '.simple.StateEnum',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'oldStates',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'thing',
            number: 10,
            label: 1,
            type: 11,
            typeName: '.simple.ImportedThing',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'thing',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'blobs',
            number: 11,
            label: 3,
            type: 12,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'blobs',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'birthday',
            number: 12,
            label: 1,
            type: 11,
            typeName: '.google.type.Date',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'birthday',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'blob',
            number: 13,
            label: 1,
            type: 12,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'blob',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'Child',
        field: [
          {
            name: 'name',
            number: 1,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'name',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'type',
            number: 2,
            label: 1,
            type: 14,
            typeName: '.simple.Child.Type',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'type',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [
          {
            name: 'Type',
            value: [
              { name: 'UNKNOWN', number: 0, options: undefined },
              { name: 'GOOD', number: 1, options: undefined },
              { name: 'BAD', number: 2, options: undefined },
            ],
            options: undefined,
            reservedRange: [],
            reservedName: [],
          },
        ],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'Nested',
        field: [
          {
            name: 'name',
            number: 1,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'name',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'message',
            number: 2,
            label: 1,
            type: 11,
            typeName: '.simple.Nested.InnerMessage',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'message',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'state',
            number: 3,
            label: 1,
            type: 14,
            typeName: '.simple.Nested.InnerEnum',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'state',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [
          {
            name: 'InnerMessage',
            field: [
              {
                name: 'name',
                number: 1,
                label: 1,
                type: 9,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'name',
                options: undefined,
                proto3Optional: false,
              },
              {
                name: 'deep',
                number: 2,
                label: 1,
                type: 11,
                typeName: '.simple.Nested.InnerMessage.DeepMessage',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'deep',
                options: undefined,
                proto3Optional: false,
              },
            ],
            extension: [],
            nestedType: [
              {
                name: 'DeepMessage',
                field: [
                  {
                    name: 'name',
                    number: 1,
                    label: 1,
                    type: 9,
                    typeName: '',
                    extendee: '',
                    defaultValue: '',
                    oneofIndex: 0,
                    jsonName: 'name',
                    options: undefined,
                    proto3Optional: false,
                  },
                ],
                extension: [],
                nestedType: [],
                enumType: [],
                extensionRange: [],
                oneofDecl: [],
                options: undefined,
                reservedRange: [],
                reservedName: [],
              },
            ],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            options: undefined,
            reservedRange: [],
            reservedName: [],
          },
        ],
        enumType: [
          {
            name: 'InnerEnum',
            value: [
              { name: 'UNKNOWN_INNER', number: 0, options: undefined },
              { name: 'GOOD', number: 100, options: undefined },
              { name: 'BAD', number: 1000, options: undefined },
            ],
            options: undefined,
            reservedRange: [],
            reservedName: [],
          },
        ],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'OneOfMessage',
        field: [
          {
            name: 'first',
            number: 1,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'first',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'last',
            number: 2,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'last',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [{ name: 'name_fields', options: undefined }],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'SimpleWithWrappers',
        field: [
          {
            name: 'name',
            number: 1,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.StringValue',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'name',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'age',
            number: 2,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.Int32Value',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'age',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'enabled',
            number: 3,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.BoolValue',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'enabled',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'coins',
            number: 6,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.Int32Value',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'coins',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'snacks',
            number: 7,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.StringValue',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'snacks',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'Entity',
        field: [
          {
            name: 'id',
            number: 1,
            label: 1,
            type: 5,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'id',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'SimpleWithMap',
        field: [
          {
            name: 'entitiesById',
            number: 1,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.EntitiesByIdEntry',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'entitiesById',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'nameLookup',
            number: 2,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.NameLookupEntry',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'nameLookup',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'intLookup',
            number: 3,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.IntLookupEntry',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'intLookup',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'mapOfTimestamps',
            number: 4,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.MapOfTimestampsEntry',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'mapOfTimestamps',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'mapOfBytes',
            number: 5,
            label: 3,
            type: 11,
            typeName: '.simple.SimpleWithMap.MapOfBytesEntry',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'mapOfBytes',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [
          {
            name: 'EntitiesByIdEntry',
            field: [
              {
                name: 'key',
                number: 1,
                label: 1,
                type: 5,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'key',
                options: undefined,
                proto3Optional: false,
              },
              {
                name: 'value',
                number: 2,
                label: 1,
                type: 11,
                typeName: '.simple.Entity',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'value',
                options: undefined,
                proto3Optional: false,
              },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            options: {
              messageSetWireFormat: false,
              noStandardDescriptorAccessor: false,
              deprecated: false,
              mapEntry: true,
              uninterpretedOption: [],
            },
            reservedRange: [],
            reservedName: [],
          },
          {
            name: 'NameLookupEntry',
            field: [
              {
                name: 'key',
                number: 1,
                label: 1,
                type: 9,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'key',
                options: undefined,
                proto3Optional: false,
              },
              {
                name: 'value',
                number: 2,
                label: 1,
                type: 9,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'value',
                options: undefined,
                proto3Optional: false,
              },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            options: {
              messageSetWireFormat: false,
              noStandardDescriptorAccessor: false,
              deprecated: false,
              mapEntry: true,
              uninterpretedOption: [],
            },
            reservedRange: [],
            reservedName: [],
          },
          {
            name: 'IntLookupEntry',
            field: [
              {
                name: 'key',
                number: 1,
                label: 1,
                type: 5,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'key',
                options: undefined,
                proto3Optional: false,
              },
              {
                name: 'value',
                number: 2,
                label: 1,
                type: 5,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'value',
                options: undefined,
                proto3Optional: false,
              },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            options: {
              messageSetWireFormat: false,
              noStandardDescriptorAccessor: false,
              deprecated: false,
              mapEntry: true,
              uninterpretedOption: [],
            },
            reservedRange: [],
            reservedName: [],
          },
          {
            name: 'MapOfTimestampsEntry',
            field: [
              {
                name: 'key',
                number: 1,
                label: 1,
                type: 9,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'key',
                options: undefined,
                proto3Optional: false,
              },
              {
                name: 'value',
                number: 2,
                label: 1,
                type: 11,
                typeName: '.google.protobuf.Timestamp',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'value',
                options: undefined,
                proto3Optional: false,
              },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            options: {
              messageSetWireFormat: false,
              noStandardDescriptorAccessor: false,
              deprecated: false,
              mapEntry: true,
              uninterpretedOption: [],
            },
            reservedRange: [],
            reservedName: [],
          },
          {
            name: 'MapOfBytesEntry',
            field: [
              {
                name: 'key',
                number: 1,
                label: 1,
                type: 9,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'key',
                options: undefined,
                proto3Optional: false,
              },
              {
                name: 'value',
                number: 2,
                label: 1,
                type: 12,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'value',
                options: undefined,
                proto3Optional: false,
              },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            options: {
              messageSetWireFormat: false,
              noStandardDescriptorAccessor: false,
              deprecated: false,
              mapEntry: true,
              uninterpretedOption: [],
            },
            reservedRange: [],
            reservedName: [],
          },
        ],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
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
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'entitiesById',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [
          {
            name: 'EntitiesByIdEntry',
            field: [
              {
                name: 'key',
                number: 1,
                label: 1,
                type: 5,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'key',
                options: undefined,
                proto3Optional: false,
              },
              {
                name: 'value',
                number: 2,
                label: 1,
                type: 11,
                typeName: '.simple.Entity',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'value',
                options: undefined,
                proto3Optional: false,
              },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            options: {
              messageSetWireFormat: false,
              noStandardDescriptorAccessor: false,
              deprecated: false,
              mapEntry: true,
              uninterpretedOption: [],
            },
            reservedRange: [],
            reservedName: [],
          },
        ],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
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
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'enumsById',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [
          {
            name: 'EnumsByIdEntry',
            field: [
              {
                name: 'key',
                number: 1,
                label: 1,
                type: 5,
                typeName: '',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'key',
                options: undefined,
                proto3Optional: false,
              },
              {
                name: 'value',
                number: 2,
                label: 1,
                type: 14,
                typeName: '.simple.StateEnum',
                extendee: '',
                defaultValue: '',
                oneofIndex: 0,
                jsonName: 'value',
                options: undefined,
                proto3Optional: false,
              },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            options: {
              messageSetWireFormat: false,
              noStandardDescriptorAccessor: false,
              deprecated: false,
              mapEntry: true,
              uninterpretedOption: [],
            },
            reservedRange: [],
            reservedName: [],
          },
        ],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'PingRequest',
        field: [
          {
            name: 'input',
            number: 1,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'input',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'PingResponse',
        field: [
          {
            name: 'output',
            number: 1,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'output',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'Numbers',
        field: [
          {
            name: 'double',
            number: 1,
            label: 1,
            type: 1,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'double',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'float',
            number: 2,
            label: 1,
            type: 2,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'float',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'int32',
            number: 3,
            label: 1,
            type: 5,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'int32',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'int64',
            number: 4,
            label: 1,
            type: 3,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'int64',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'uint32',
            number: 5,
            label: 1,
            type: 13,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'uint32',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'uint64',
            number: 6,
            label: 1,
            type: 4,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'uint64',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'sint32',
            number: 7,
            label: 1,
            type: 17,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'sint32',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'sint64',
            number: 8,
            label: 1,
            type: 18,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'sint64',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'fixed32',
            number: 9,
            label: 1,
            type: 7,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'fixed32',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'fixed64',
            number: 10,
            label: 1,
            type: 6,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'fixed64',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'sfixed32',
            number: 11,
            label: 1,
            type: 15,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'sfixed32',
            options: undefined,
            proto3Optional: false,
          },
          {
            name: 'sfixed64',
            number: 12,
            label: 1,
            type: 16,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'sfixed64',
            options: undefined,
            proto3Optional: false,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'SimpleButOptional',
        field: [
          {
            name: 'name',
            number: 1,
            label: 1,
            type: 9,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 0,
            jsonName: 'name',
            options: undefined,
            proto3Optional: true,
          },
          {
            name: 'age',
            number: 2,
            label: 1,
            type: 5,
            typeName: '',
            extendee: '',
            defaultValue: '',
            oneofIndex: 1,
            jsonName: 'age',
            options: undefined,
            proto3Optional: true,
          },
          {
            name: 'created_at',
            number: 9,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.Timestamp',
            extendee: '',
            defaultValue: '',
            oneofIndex: 2,
            jsonName: 'createdAt',
            options: undefined,
            proto3Optional: true,
          },
          {
            name: 'child',
            number: 3,
            label: 1,
            type: 11,
            typeName: '.simple.Child',
            extendee: '',
            defaultValue: '',
            oneofIndex: 3,
            jsonName: 'child',
            options: undefined,
            proto3Optional: true,
          },
          {
            name: 'state',
            number: 4,
            label: 1,
            type: 14,
            typeName: '.simple.StateEnum',
            extendee: '',
            defaultValue: '',
            oneofIndex: 4,
            jsonName: 'state',
            options: undefined,
            proto3Optional: true,
          },
          {
            name: 'thing',
            number: 10,
            label: 1,
            type: 11,
            typeName: '.simple.ImportedThing',
            extendee: '',
            defaultValue: '',
            oneofIndex: 5,
            jsonName: 'thing',
            options: undefined,
            proto3Optional: true,
          },
          {
            name: 'birthday',
            number: 12,
            label: 1,
            type: 11,
            typeName: '.google.type.Date',
            extendee: '',
            defaultValue: '',
            oneofIndex: 6,
            jsonName: 'birthday',
            options: undefined,
            proto3Optional: true,
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [
          { name: '_name', options: undefined },
          { name: '_age', options: undefined },
          { name: '_created_at', options: undefined },
          { name: '_child', options: undefined },
          { name: '_state', options: undefined },
          { name: '_thing', options: undefined },
          { name: '_birthday', options: undefined },
        ],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
      {
        name: 'Empty',
        field: [],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
    ],
    enumType: [
      {
        name: 'StateEnum',
        value: [
          { name: 'UNKNOWN', number: 0, options: undefined },
          { name: 'ON', number: 2, options: undefined },
          { name: 'OFF', number: 3, options: undefined },
        ],
        options: undefined,
        reservedRange: [],
        reservedName: [],
      },
    ],
    service: [
      {
        name: 'PingService',
        method: [
          {
            name: 'ping',
            inputType: '.simple.PingRequest',
            outputType: '.simple.PingResponse',
            options: undefined,
            clientStreaming: false,
            serverStreaming: false,
          },
        ],
        options: undefined,
      },
    ],
    extension: [],
    options: undefined,
    sourceCodeInfo: {
      location: [
        {
          path: [12],
          span: [2, 0, 18],
          leadingComments:
            ' Adding a comment to the syntax will become the first\n comment in the output source file.\n',
          trailingComments: '',
          leadingDetachedComments: [],
        },
        {
          path: [4, 0],
          span: [13, 0, 30, 1],
          leadingComments: '* Example comment on the Simple message ',
          trailingComments: '',
          leadingDetachedComments: [
            ' This comment is seperated by a blank non-comment line, and will detatch from \n the following comment on the message Simple.\n',
          ],
        },
        {
          path: [4, 0, 2, 0],
          span: [15, 2, 18],
          leadingComments: ' Name field\n',
          trailingComments: '',
          leadingDetachedComments: [],
        },
        {
          path: [4, 0, 2, 1],
          span: [17, 2, 16],
          leadingComments: ' Age ',
          trailingComments: '',
          leadingDetachedComments: [],
        },
        {
          path: [4, 0, 2, 2],
          span: [18, 2, 43],
          leadingComments: '',
          trailingComments: ' This comment will also attach\n',
          leadingDetachedComments: [],
        },
        {
          path: [4, 0, 2, 9],
          span: [26, 2, 27],
          leadingComments: ' A thing (imported from thing)\n',
          trailingComments: '',
          leadingDetachedComments: [],
        },
        {
          path: [4, 2, 3, 0],
          span: [54, 2, 61, 3],
          leadingComments: ' Comment for a nested message */\n',
          trailingComments: '',
          leadingDetachedComments: [],
        },
        {
          path: [4, 12],
          span: [133, 0, 144, 1],
          leadingComments: "* For testing proto3's field presence feature. ",
          trailingComments: '',
          leadingDetachedComments: [],
        },
        {
          path: [4, 12, 2, 0],
          span: [135, 2, 27],
          leadingComments: ' Name field\n',
          trailingComments: '',
          leadingDetachedComments: [],
        },
        {
          path: [4, 12, 2, 1],
          span: [137, 2, 25],
          leadingComments: ' Age ',
          trailingComments: '',
          leadingDetachedComments: [],
        },
        {
          path: [4, 12, 2, 2],
          span: [138, 2, 52],
          leadingComments: '',
          trailingComments: ' This comment will also attach\n',
          leadingDetachedComments: [],
        },
        {
          path: [4, 12, 2, 5],
          span: [142, 2, 36],
          leadingComments: ' A thing (imported from thing)\n',
          trailingComments: '',
          leadingDetachedComments: [],
        },
      ],
    },
    syntax: 'proto3',
  }),
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
  dependencies: [protoMetadata1, protoMetadata2, protoMetadata3, protoMetadata4],
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
