/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Timestamp } from './google/protobuf/timestamp';
import { ImportedThing } from './import_dir/thing';
import { DateMessage } from './google/type/date';
import { StringValue, Int32Value, BoolValue, BytesValue } from './google/protobuf/wrappers';

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

export function stateEnumFromJSON(object: any): StateEnum {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return StateEnum.UNKNOWN;
    case 2:
    case 'ON':
      return StateEnum.ON;
    case 3:
    case 'OFF':
      return StateEnum.OFF;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return StateEnum.UNRECOGNIZED;
  }
}

export function stateEnumToJSON(object: StateEnum): string {
  switch (object) {
    case StateEnum.UNKNOWN:
      return 'UNKNOWN';
    case StateEnum.ON:
      return 'ON';
    case StateEnum.OFF:
      return 'OFF';
    default:
      return 'UNKNOWN';
  }
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

export function child_TypeFromJSON(object: any): Child_Type {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return Child_Type.UNKNOWN;
    case 1:
    case 'GOOD':
      return Child_Type.GOOD;
    case 2:
    case 'BAD':
      return Child_Type.BAD;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Child_Type.UNRECOGNIZED;
  }
}

export function child_TypeToJSON(object: Child_Type): string {
  switch (object) {
    case Child_Type.UNKNOWN:
      return 'UNKNOWN';
    case Child_Type.GOOD:
      return 'GOOD';
    case Child_Type.BAD:
      return 'BAD';
    default:
      return 'UNKNOWN';
  }
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

export function nested_InnerEnumFromJSON(object: any): Nested_InnerEnum {
  switch (object) {
    case 0:
    case 'UNKNOWN_INNER':
      return Nested_InnerEnum.UNKNOWN_INNER;
    case 100:
    case 'GOOD':
      return Nested_InnerEnum.GOOD;
    case 1000:
    case 'BAD':
      return Nested_InnerEnum.BAD;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return Nested_InnerEnum.UNRECOGNIZED;
  }
}

export function nested_InnerEnumToJSON(object: Nested_InnerEnum): string {
  switch (object) {
    case Nested_InnerEnum.UNKNOWN_INNER:
      return 'UNKNOWN_INNER';
    case Nested_InnerEnum.GOOD:
      return 'GOOD';
    case Nested_InnerEnum.BAD:
      return 'BAD';
    default:
      return 'UNKNOWN';
  }
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
  id: Uint8Array | undefined;
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
  mapOfStringValues: { [key: string]: string | undefined };
  longLookup: { [key: number]: number };
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

export interface SimpleWithMap_MapOfStringValuesEntry {
  key: string;
  value: string | undefined;
}

export interface SimpleWithMap_LongLookupEntry {
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

  decode(input: Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimple } as Simple;
    message.grandChildren = [];
    message.coins = [];
    message.snacks = [];
    message.oldStates = [];
    message.blobs = [];
    message.blob = new Uint8Array();
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

  fromJSON(object: any): Simple {
    const message = { ...baseSimple } as Simple;
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    message.age = object.age !== undefined && object.age !== null ? Number(object.age) : 0;
    message.createdAt =
      object.createdAt !== undefined && object.createdAt !== null ? fromJsonTimestamp(object.createdAt) : undefined;
    message.child = object.child !== undefined && object.child !== null ? Child.fromJSON(object.child) : undefined;
    message.state = object.state !== undefined && object.state !== null ? stateEnumFromJSON(object.state) : 0;
    message.grandChildren = (object.grandChildren ?? []).map((e: any) => Child.fromJSON(e));
    message.coins = (object.coins ?? []).map((e: any) => Number(e));
    message.snacks = (object.snacks ?? []).map((e: any) => String(e));
    message.oldStates = (object.oldStates ?? []).map((e: any) => stateEnumFromJSON(e));
    message.thing =
      object.thing !== undefined && object.thing !== null ? ImportedThing.fromJSON(object.thing) : undefined;
    message.blobs = (object.blobs ?? []).map((e: any) => bytesFromBase64(e));
    message.birthday =
      object.birthday !== undefined && object.birthday !== null ? DateMessage.fromJSON(object.birthday) : undefined;
    message.blob = object.blob !== undefined && object.blob !== null ? bytesFromBase64(object.blob) : new Uint8Array();
    return message;
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = message.age);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.child !== undefined && (obj.child = message.child ? Child.toJSON(message.child) : undefined);
    message.state !== undefined && (obj.state = stateEnumToJSON(message.state));
    if (message.grandChildren) {
      obj.grandChildren = message.grandChildren.map((e) => (e ? Child.toJSON(e) : undefined));
    } else {
      obj.grandChildren = [];
    }
    if (message.coins) {
      obj.coins = message.coins.map((e) => e);
    } else {
      obj.coins = [];
    }
    if (message.snacks) {
      obj.snacks = message.snacks.map((e) => e);
    } else {
      obj.snacks = [];
    }
    if (message.oldStates) {
      obj.oldStates = message.oldStates.map((e) => stateEnumToJSON(e));
    } else {
      obj.oldStates = [];
    }
    message.thing !== undefined && (obj.thing = message.thing ? ImportedThing.toJSON(message.thing) : undefined);
    if (message.blobs) {
      obj.blobs = message.blobs.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.blobs = [];
    }
    message.birthday !== undefined &&
      (obj.birthday = message.birthday ? DateMessage.toJSON(message.birthday) : undefined);
    message.blob !== undefined &&
      (obj.blob = base64FromBytes(message.blob !== undefined ? message.blob : new Uint8Array()));
    return obj;
  },

  fromPartial(object: DeepPartial<Simple>): Simple {
    const message = { ...baseSimple } as Simple;
    message.name = object.name ?? '';
    message.age = object.age ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.child = object.child !== undefined && object.child !== null ? Child.fromPartial(object.child) : undefined;
    message.state = object.state ?? 0;
    message.grandChildren = (object.grandChildren ?? []).map((e) => Child.fromPartial(e));
    message.coins = (object.coins ?? []).map((e) => e);
    message.snacks = (object.snacks ?? []).map((e) => e);
    message.oldStates = (object.oldStates ?? []).map((e) => e);
    message.thing =
      object.thing !== undefined && object.thing !== null ? ImportedThing.fromPartial(object.thing) : undefined;
    message.blobs = (object.blobs ?? []).map((e) => e);
    message.birthday =
      object.birthday !== undefined && object.birthday !== null ? DateMessage.fromPartial(object.birthday) : undefined;
    message.blob = object.blob ?? new Uint8Array();
    return message;
  },
};

const baseChild: object = { name: '', type: 0 };

export const Child = {
  encode(message: Child, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Child {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    message.type = object.type !== undefined && object.type !== null ? child_TypeFromJSON(object.type) : 0;
    return message;
  },

  toJSON(message: Child): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.type !== undefined && (obj.type = child_TypeToJSON(message.type));
    return obj;
  },

  fromPartial(object: DeepPartial<Child>): Child {
    const message = { ...baseChild } as Child;
    message.name = object.name ?? '';
    message.type = object.type ?? 0;
    return message;
  },
};

const baseNested: object = { name: '', state: 0 };

export const Nested = {
  encode(message: Nested, writer: Writer = Writer.create()): Writer {
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

  decode(input: Reader | Uint8Array, length?: number): Nested {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    message.message =
      object.message !== undefined && object.message !== null
        ? Nested_InnerMessage.fromJSON(object.message)
        : undefined;
    message.state = object.state !== undefined && object.state !== null ? nested_InnerEnumFromJSON(object.state) : 0;
    return message;
  },

  toJSON(message: Nested): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.message !== undefined &&
      (obj.message = message.message ? Nested_InnerMessage.toJSON(message.message) : undefined);
    message.state !== undefined && (obj.state = nested_InnerEnumToJSON(message.state));
    return obj;
  },

  fromPartial(object: DeepPartial<Nested>): Nested {
    const message = { ...baseNested } as Nested;
    message.name = object.name ?? '';
    message.message =
      object.message !== undefined && object.message !== null
        ? Nested_InnerMessage.fromPartial(object.message)
        : undefined;
    message.state = object.state ?? 0;
    return message;
  },
};

const baseNested_InnerMessage: object = { name: '' };

export const Nested_InnerMessage = {
  encode(message: Nested_InnerMessage, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.deep !== undefined) {
      Nested_InnerMessage_DeepMessage.encode(message.deep, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Nested_InnerMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    message.deep =
      object.deep !== undefined && object.deep !== null
        ? Nested_InnerMessage_DeepMessage.fromJSON(object.deep)
        : undefined;
    return message;
  },

  toJSON(message: Nested_InnerMessage): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.deep !== undefined &&
      (obj.deep = message.deep ? Nested_InnerMessage_DeepMessage.toJSON(message.deep) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Nested_InnerMessage>): Nested_InnerMessage {
    const message = { ...baseNested_InnerMessage } as Nested_InnerMessage;
    message.name = object.name ?? '';
    message.deep =
      object.deep !== undefined && object.deep !== null
        ? Nested_InnerMessage_DeepMessage.fromPartial(object.deep)
        : undefined;
    return message;
  },
};

const baseNested_InnerMessage_DeepMessage: object = { name: '' };

export const Nested_InnerMessage_DeepMessage = {
  encode(message: Nested_InnerMessage_DeepMessage, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Nested_InnerMessage_DeepMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : '';
    return message;
  },

  toJSON(message: Nested_InnerMessage_DeepMessage): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },

  fromPartial(object: DeepPartial<Nested_InnerMessage_DeepMessage>): Nested_InnerMessage_DeepMessage {
    const message = { ...baseNested_InnerMessage_DeepMessage } as Nested_InnerMessage_DeepMessage;
    message.name = object.name ?? '';
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
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.first = object.first !== undefined && object.first !== null ? String(object.first) : undefined;
    message.last = object.last !== undefined && object.last !== null ? String(object.last) : undefined;
    return message;
  },

  toJSON(message: OneOfMessage): unknown {
    const obj: any = {};
    message.first !== undefined && (obj.first = message.first);
    message.last !== undefined && (obj.last = message.last);
    return obj;
  },

  fromPartial(object: DeepPartial<OneOfMessage>): OneOfMessage {
    const message = { ...baseOneOfMessage } as OneOfMessage;
    message.first = object.first ?? undefined;
    message.last = object.last ?? undefined;
    return message;
  },
};

const baseSimpleWithWrappers: object = {};

export const SimpleWithWrappers = {
  encode(message: SimpleWithWrappers, writer: Writer = Writer.create()): Writer {
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
    if (message.id !== undefined) {
      BytesValue.encode({ value: message.id! }, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithWrappers {
    const reader = input instanceof Reader ? input : new Reader(input);
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
        case 8:
          message.id = BytesValue.decode(reader, reader.uint32()).value;
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
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.age = object.age !== undefined && object.age !== null ? Number(object.age) : undefined;
    message.enabled = object.enabled !== undefined && object.enabled !== null ? Boolean(object.enabled) : undefined;
    message.coins = (object.coins ?? []).map((e: any) => Number(e));
    message.snacks = (object.snacks ?? []).map((e: any) => String(e));
    message.id = object.id !== undefined && object.id !== null ? new Uint8Array(object.id) : undefined;
    return message;
  },

  toJSON(message: SimpleWithWrappers): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = message.age);
    message.enabled !== undefined && (obj.enabled = message.enabled);
    if (message.coins) {
      obj.coins = message.coins.map((e) => e);
    } else {
      obj.coins = [];
    }
    if (message.snacks) {
      obj.snacks = message.snacks.map((e) => e);
    } else {
      obj.snacks = [];
    }
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithWrappers>): SimpleWithWrappers {
    const message = { ...baseSimpleWithWrappers } as SimpleWithWrappers;
    message.name = object.name ?? undefined;
    message.age = object.age ?? undefined;
    message.enabled = object.enabled ?? undefined;
    message.coins = (object.coins ?? []).map((e) => e);
    message.snacks = (object.snacks ?? []).map((e) => e);
    message.id = object.id ?? undefined;
    return message;
  },
};

const baseEntity: object = { id: 0 };

export const Entity = {
  encode(message: Entity, writer: Writer = Writer.create()): Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Entity {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.id = object.id !== undefined && object.id !== null ? Number(object.id) : 0;
    return message;
  },

  toJSON(message: Entity): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    return obj;
  },

  fromPartial(object: DeepPartial<Entity>): Entity {
    const message = { ...baseEntity } as Entity;
    message.id = object.id ?? 0;
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
    Object.entries(message.mapOfStringValues).forEach(([key, value]) => {
      if (value !== undefined) {
        SimpleWithMap_MapOfStringValuesEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).ldelim();
      }
    });
    Object.entries(message.longLookup).forEach(([key, value]) => {
      SimpleWithMap_LongLookupEntry.encode({ key: key as any, value }, writer.uint32(58).fork()).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap } as SimpleWithMap;
    message.entitiesById = {};
    message.nameLookup = {};
    message.intLookup = {};
    message.mapOfTimestamps = {};
    message.mapOfBytes = {};
    message.mapOfStringValues = {};
    message.longLookup = {};
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
        case 6:
          const entry6 = SimpleWithMap_MapOfStringValuesEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.mapOfStringValues[entry6.key] = entry6.value;
          }
          break;
        case 7:
          const entry7 = SimpleWithMap_LongLookupEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.longLookup[entry7.key] = entry7.value;
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
    message.entitiesById = Object.entries(object.entitiesById ?? {}).reduce<{ [key: number]: Entity }>(
      (acc, [key, value]) => {
        acc[Number(key)] = Entity.fromJSON(value);
        return acc;
      },
      {}
    );
    message.nameLookup = Object.entries(object.nameLookup ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      },
      {}
    );
    message.intLookup = Object.entries(object.intLookup ?? {}).reduce<{ [key: number]: number }>(
      (acc, [key, value]) => {
        acc[Number(key)] = Number(value);
        return acc;
      },
      {}
    );
    message.mapOfTimestamps = Object.entries(object.mapOfTimestamps ?? {}).reduce<{ [key: string]: Date }>(
      (acc, [key, value]) => {
        acc[key] = fromJsonTimestamp(value);
        return acc;
      },
      {}
    );
    message.mapOfBytes = Object.entries(object.mapOfBytes ?? {}).reduce<{ [key: string]: Uint8Array }>(
      (acc, [key, value]) => {
        acc[key] = bytesFromBase64(value as string);
        return acc;
      },
      {}
    );
    message.mapOfStringValues = Object.entries(object.mapOfStringValues ?? {}).reduce<{
      [key: string]: string | undefined;
    }>((acc, [key, value]) => {
      acc[key] = value as string | undefined;
      return acc;
    }, {});
    message.longLookup = Object.entries(object.longLookup ?? {}).reduce<{ [key: number]: number }>(
      (acc, [key, value]) => {
        acc[Number(key)] = Number(value);
        return acc;
      },
      {}
    );
    return message;
  },

  toJSON(message: SimpleWithMap): unknown {
    const obj: any = {};
    obj.entitiesById = {};
    if (message.entitiesById) {
      Object.entries(message.entitiesById).forEach(([k, v]) => {
        obj.entitiesById[k] = Entity.toJSON(v);
      });
    }
    obj.nameLookup = {};
    if (message.nameLookup) {
      Object.entries(message.nameLookup).forEach(([k, v]) => {
        obj.nameLookup[k] = v;
      });
    }
    obj.intLookup = {};
    if (message.intLookup) {
      Object.entries(message.intLookup).forEach(([k, v]) => {
        obj.intLookup[k] = v;
      });
    }
    obj.mapOfTimestamps = {};
    if (message.mapOfTimestamps) {
      Object.entries(message.mapOfTimestamps).forEach(([k, v]) => {
        obj.mapOfTimestamps[k] = v.toISOString();
      });
    }
    obj.mapOfBytes = {};
    if (message.mapOfBytes) {
      Object.entries(message.mapOfBytes).forEach(([k, v]) => {
        obj.mapOfBytes[k] = base64FromBytes(v);
      });
    }
    obj.mapOfStringValues = {};
    if (message.mapOfStringValues) {
      Object.entries(message.mapOfStringValues).forEach(([k, v]) => {
        obj.mapOfStringValues[k] = v;
      });
    }
    obj.longLookup = {};
    if (message.longLookup) {
      Object.entries(message.longLookup).forEach(([k, v]) => {
        obj.longLookup[k] = v;
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap>): SimpleWithMap {
    const message = { ...baseSimpleWithMap } as SimpleWithMap;
    message.entitiesById = Object.entries(object.entitiesById ?? {}).reduce<{ [key: number]: Entity }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = Entity.fromPartial(value);
        }
        return acc;
      },
      {}
    );
    message.nameLookup = Object.entries(object.nameLookup ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {}
    );
    message.intLookup = Object.entries(object.intLookup ?? {}).reduce<{ [key: number]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = Number(value);
        }
        return acc;
      },
      {}
    );
    message.mapOfTimestamps = Object.entries(object.mapOfTimestamps ?? {}).reduce<{ [key: string]: Date }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    message.mapOfBytes = Object.entries(object.mapOfBytes ?? {}).reduce<{ [key: string]: Uint8Array }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    message.mapOfStringValues = Object.entries(object.mapOfStringValues ?? {}).reduce<{
      [key: string]: string | undefined;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }
      return acc;
    }, {});
    message.longLookup = Object.entries(object.longLookup ?? {}).reduce<{ [key: number]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = Number(value);
        }
        return acc;
      },
      {}
    );
    return message;
  },
};

const baseSimpleWithMap_EntitiesByIdEntry: object = { key: 0 };

export const SimpleWithMap_EntitiesByIdEntry = {
  encode(message: SimpleWithMap_EntitiesByIdEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_EntitiesByIdEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.key = object.key !== undefined && object.key !== null ? Number(object.key) : 0;
    message.value = object.value !== undefined && object.value !== null ? Entity.fromJSON(object.value) : undefined;
    return message;
  },

  toJSON(message: SimpleWithMap_EntitiesByIdEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Entity.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_EntitiesByIdEntry>): SimpleWithMap_EntitiesByIdEntry {
    const message = { ...baseSimpleWithMap_EntitiesByIdEntry } as SimpleWithMap_EntitiesByIdEntry;
    message.key = object.key ?? 0;
    message.value = object.value !== undefined && object.value !== null ? Entity.fromPartial(object.value) : undefined;
    return message;
  },
};

const baseSimpleWithMap_NameLookupEntry: object = { key: '', value: '' };

export const SimpleWithMap_NameLookupEntry = {
  encode(message: SimpleWithMap_NameLookupEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_NameLookupEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.key = object.key !== undefined && object.key !== null ? String(object.key) : '';
    message.value = object.value !== undefined && object.value !== null ? String(object.value) : '';
    return message;
  },

  toJSON(message: SimpleWithMap_NameLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_NameLookupEntry>): SimpleWithMap_NameLookupEntry {
    const message = { ...baseSimpleWithMap_NameLookupEntry } as SimpleWithMap_NameLookupEntry;
    message.key = object.key ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

const baseSimpleWithMap_IntLookupEntry: object = { key: 0, value: 0 };

export const SimpleWithMap_IntLookupEntry = {
  encode(message: SimpleWithMap_IntLookupEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_IntLookupEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.key = object.key !== undefined && object.key !== null ? Number(object.key) : 0;
    message.value = object.value !== undefined && object.value !== null ? Number(object.value) : 0;
    return message;
  },

  toJSON(message: SimpleWithMap_IntLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_IntLookupEntry>): SimpleWithMap_IntLookupEntry {
    const message = { ...baseSimpleWithMap_IntLookupEntry } as SimpleWithMap_IntLookupEntry;
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

const baseSimpleWithMap_MapOfTimestampsEntry: object = { key: '' };

export const SimpleWithMap_MapOfTimestampsEntry = {
  encode(message: SimpleWithMap_MapOfTimestampsEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_MapOfTimestampsEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
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

  fromJSON(object: any): SimpleWithMap_MapOfTimestampsEntry {
    const message = { ...baseSimpleWithMap_MapOfTimestampsEntry } as SimpleWithMap_MapOfTimestampsEntry;
    message.key = object.key !== undefined && object.key !== null ? String(object.key) : '';
    message.value = object.value !== undefined && object.value !== null ? fromJsonTimestamp(object.value) : undefined;
    return message;
  },

  toJSON(message: SimpleWithMap_MapOfTimestampsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value.toISOString());
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_MapOfTimestampsEntry>): SimpleWithMap_MapOfTimestampsEntry {
    const message = { ...baseSimpleWithMap_MapOfTimestampsEntry } as SimpleWithMap_MapOfTimestampsEntry;
    message.key = object.key ?? '';
    message.value = object.value ?? undefined;
    return message;
  },
};

const baseSimpleWithMap_MapOfBytesEntry: object = { key: '' };

export const SimpleWithMap_MapOfBytesEntry = {
  encode(message: SimpleWithMap_MapOfBytesEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_MapOfBytesEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_MapOfBytesEntry } as SimpleWithMap_MapOfBytesEntry;
    message.value = new Uint8Array();
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

  fromJSON(object: any): SimpleWithMap_MapOfBytesEntry {
    const message = { ...baseSimpleWithMap_MapOfBytesEntry } as SimpleWithMap_MapOfBytesEntry;
    message.key = object.key !== undefined && object.key !== null ? String(object.key) : '';
    message.value =
      object.value !== undefined && object.value !== null ? bytesFromBase64(object.value) : new Uint8Array();
    return message;
  },

  toJSON(message: SimpleWithMap_MapOfBytesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array()));
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_MapOfBytesEntry>): SimpleWithMap_MapOfBytesEntry {
    const message = { ...baseSimpleWithMap_MapOfBytesEntry } as SimpleWithMap_MapOfBytesEntry;
    message.key = object.key ?? '';
    message.value = object.value ?? new Uint8Array();
    return message;
  },
};

const baseSimpleWithMap_MapOfStringValuesEntry: object = { key: '' };

export const SimpleWithMap_MapOfStringValuesEntry = {
  encode(message: SimpleWithMap_MapOfStringValuesEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      StringValue.encode({ value: message.value! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_MapOfStringValuesEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_MapOfStringValuesEntry } as SimpleWithMap_MapOfStringValuesEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = StringValue.decode(reader, reader.uint32()).value;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_MapOfStringValuesEntry {
    const message = { ...baseSimpleWithMap_MapOfStringValuesEntry } as SimpleWithMap_MapOfStringValuesEntry;
    message.key = object.key !== undefined && object.key !== null ? String(object.key) : '';
    message.value = object.value !== undefined && object.value !== null ? String(object.value) : undefined;
    return message;
  },

  toJSON(message: SimpleWithMap_MapOfStringValuesEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_MapOfStringValuesEntry>): SimpleWithMap_MapOfStringValuesEntry {
    const message = { ...baseSimpleWithMap_MapOfStringValuesEntry } as SimpleWithMap_MapOfStringValuesEntry;
    message.key = object.key ?? '';
    message.value = object.value ?? undefined;
    return message;
  },
};

const baseSimpleWithMap_LongLookupEntry: object = { key: 0, value: 0 };

export const SimpleWithMap_LongLookupEntry = {
  encode(message: SimpleWithMap_LongLookupEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== 0) {
      writer.uint32(8).int64(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap_LongLookupEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithMap_LongLookupEntry } as SimpleWithMap_LongLookupEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = longToNumber(reader.int64() as Long);
          break;
        case 2:
          message.value = longToNumber(reader.int64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_LongLookupEntry {
    const message = { ...baseSimpleWithMap_LongLookupEntry } as SimpleWithMap_LongLookupEntry;
    message.key = object.key !== undefined && object.key !== null ? Number(object.key) : 0;
    message.value = object.value !== undefined && object.value !== null ? Number(object.value) : 0;
    return message;
  },

  toJSON(message: SimpleWithMap_LongLookupEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_LongLookupEntry>): SimpleWithMap_LongLookupEntry {
    const message = { ...baseSimpleWithMap_LongLookupEntry } as SimpleWithMap_LongLookupEntry;
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
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
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.entitiesById = Object.entries(object.entitiesById ?? {}).reduce<{ [key: number]: Entity }>(
      (acc, [key, value]) => {
        acc[Number(key)] = Entity.fromJSON(value);
        return acc;
      },
      {}
    );
    return message;
  },

  toJSON(message: SimpleWithSnakeCaseMap): unknown {
    const obj: any = {};
    obj.entitiesById = {};
    if (message.entitiesById) {
      Object.entries(message.entitiesById).forEach(([k, v]) => {
        obj.entitiesById[k] = Entity.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithSnakeCaseMap>): SimpleWithSnakeCaseMap {
    const message = { ...baseSimpleWithSnakeCaseMap } as SimpleWithSnakeCaseMap;
    message.entitiesById = Object.entries(object.entitiesById ?? {}).reduce<{ [key: number]: Entity }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = Entity.fromPartial(value);
        }
        return acc;
      },
      {}
    );
    return message;
  },
};

const baseSimpleWithSnakeCaseMap_EntitiesByIdEntry: object = { key: 0 };

export const SimpleWithSnakeCaseMap_EntitiesByIdEntry = {
  encode(message: SimpleWithSnakeCaseMap_EntitiesByIdEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== undefined) {
      Entity.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.key = object.key !== undefined && object.key !== null ? Number(object.key) : 0;
    message.value = object.value !== undefined && object.value !== null ? Entity.fromJSON(object.value) : undefined;
    return message;
  },

  toJSON(message: SimpleWithSnakeCaseMap_EntitiesByIdEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Entity.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithSnakeCaseMap_EntitiesByIdEntry>): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    const message = { ...baseSimpleWithSnakeCaseMap_EntitiesByIdEntry } as SimpleWithSnakeCaseMap_EntitiesByIdEntry;
    message.key = object.key ?? 0;
    message.value = object.value !== undefined && object.value !== null ? Entity.fromPartial(object.value) : undefined;
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
    const reader = input instanceof Reader ? input : new Reader(input);
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

  fromJSON(object: any): SimpleWithMapOfEnums {
    const message = { ...baseSimpleWithMapOfEnums } as SimpleWithMapOfEnums;
    message.enumsById = Object.entries(object.enumsById ?? {}).reduce<{ [key: number]: StateEnum }>(
      (acc, [key, value]) => {
        acc[Number(key)] = value as number;
        return acc;
      },
      {}
    );
    return message;
  },

  toJSON(message: SimpleWithMapOfEnums): unknown {
    const obj: any = {};
    obj.enumsById = {};
    if (message.enumsById) {
      Object.entries(message.enumsById).forEach(([k, v]) => {
        obj.enumsById[k] = stateEnumToJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMapOfEnums>): SimpleWithMapOfEnums {
    const message = { ...baseSimpleWithMapOfEnums } as SimpleWithMapOfEnums;
    message.enumsById = Object.entries(object.enumsById ?? {}).reduce<{ [key: number]: StateEnum }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = value as number;
        }
        return acc;
      },
      {}
    );
    return message;
  },
};

const baseSimpleWithMapOfEnums_EnumsByIdEntry: object = { key: 0, value: 0 };

export const SimpleWithMapOfEnums_EnumsByIdEntry = {
  encode(message: SimpleWithMapOfEnums_EnumsByIdEntry, writer: Writer = Writer.create()): Writer {
    if (message.key !== 0) {
      writer.uint32(8).int32(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int32(message.value);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMapOfEnums_EnumsByIdEntry {
    const reader = input instanceof Reader ? input : new Reader(input);
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

  fromJSON(object: any): SimpleWithMapOfEnums_EnumsByIdEntry {
    const message = { ...baseSimpleWithMapOfEnums_EnumsByIdEntry } as SimpleWithMapOfEnums_EnumsByIdEntry;
    message.key = object.key !== undefined && object.key !== null ? Number(object.key) : 0;
    message.value = object.value !== undefined && object.value !== null ? stateEnumFromJSON(object.value) : 0;
    return message;
  },

  toJSON(message: SimpleWithMapOfEnums_EnumsByIdEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = stateEnumToJSON(message.value));
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMapOfEnums_EnumsByIdEntry>): SimpleWithMapOfEnums_EnumsByIdEntry {
    const message = { ...baseSimpleWithMapOfEnums_EnumsByIdEntry } as SimpleWithMapOfEnums_EnumsByIdEntry;
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

const basePingRequest: object = { input: '' };

export const PingRequest = {
  encode(message: PingRequest, writer: Writer = Writer.create()): Writer {
    if (message.input !== '') {
      writer.uint32(10).string(message.input);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PingRequest {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.input = object.input !== undefined && object.input !== null ? String(object.input) : '';
    return message;
  },

  toJSON(message: PingRequest): unknown {
    const obj: any = {};
    message.input !== undefined && (obj.input = message.input);
    return obj;
  },

  fromPartial(object: DeepPartial<PingRequest>): PingRequest {
    const message = { ...basePingRequest } as PingRequest;
    message.input = object.input ?? '';
    return message;
  },
};

const basePingResponse: object = { output: '' };

export const PingResponse = {
  encode(message: PingResponse, writer: Writer = Writer.create()): Writer {
    if (message.output !== '') {
      writer.uint32(10).string(message.output);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): PingResponse {
    const reader = input instanceof Reader ? input : new Reader(input);
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
    message.output = object.output !== undefined && object.output !== null ? String(object.output) : '';
    return message;
  },

  toJSON(message: PingResponse): unknown {
    const obj: any = {};
    message.output !== undefined && (obj.output = message.output);
    return obj;
  },

  fromPartial(object: DeepPartial<PingResponse>): PingResponse {
    const message = { ...basePingResponse } as PingResponse;
    message.output = object.output ?? '';
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

  decode(input: Reader | Uint8Array, length?: number): Numbers {
    const reader = input instanceof Reader ? input : new Reader(input);
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

  fromJSON(object: any): Numbers {
    const message = { ...baseNumbers } as Numbers;
    message.double = object.double !== undefined && object.double !== null ? Number(object.double) : 0;
    message.float = object.float !== undefined && object.float !== null ? Number(object.float) : 0;
    message.int32 = object.int32 !== undefined && object.int32 !== null ? Number(object.int32) : 0;
    message.int64 = object.int64 !== undefined && object.int64 !== null ? Number(object.int64) : 0;
    message.uint32 = object.uint32 !== undefined && object.uint32 !== null ? Number(object.uint32) : 0;
    message.uint64 = object.uint64 !== undefined && object.uint64 !== null ? Number(object.uint64) : 0;
    message.sint32 = object.sint32 !== undefined && object.sint32 !== null ? Number(object.sint32) : 0;
    message.sint64 = object.sint64 !== undefined && object.sint64 !== null ? Number(object.sint64) : 0;
    message.fixed32 = object.fixed32 !== undefined && object.fixed32 !== null ? Number(object.fixed32) : 0;
    message.fixed64 = object.fixed64 !== undefined && object.fixed64 !== null ? Number(object.fixed64) : 0;
    message.sfixed32 = object.sfixed32 !== undefined && object.sfixed32 !== null ? Number(object.sfixed32) : 0;
    message.sfixed64 = object.sfixed64 !== undefined && object.sfixed64 !== null ? Number(object.sfixed64) : 0;
    return message;
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    message.double !== undefined && (obj.double = message.double);
    message.float !== undefined && (obj.float = message.float);
    message.int32 !== undefined && (obj.int32 = message.int32);
    message.int64 !== undefined && (obj.int64 = message.int64);
    message.uint32 !== undefined && (obj.uint32 = message.uint32);
    message.uint64 !== undefined && (obj.uint64 = message.uint64);
    message.sint32 !== undefined && (obj.sint32 = message.sint32);
    message.sint64 !== undefined && (obj.sint64 = message.sint64);
    message.fixed32 !== undefined && (obj.fixed32 = message.fixed32);
    message.fixed64 !== undefined && (obj.fixed64 = message.fixed64);
    message.sfixed32 !== undefined && (obj.sfixed32 = message.sfixed32);
    message.sfixed64 !== undefined && (obj.sfixed64 = message.sfixed64);
    return obj;
  },

  fromPartial(object: DeepPartial<Numbers>): Numbers {
    const message = { ...baseNumbers } as Numbers;
    message.double = object.double ?? 0;
    message.float = object.float ?? 0;
    message.int32 = object.int32 ?? 0;
    message.int64 = object.int64 ?? 0;
    message.uint32 = object.uint32 ?? 0;
    message.uint64 = object.uint64 ?? 0;
    message.sint32 = object.sint32 ?? 0;
    message.sint64 = object.sint64 ?? 0;
    message.fixed32 = object.fixed32 ?? 0;
    message.fixed64 = object.fixed64 ?? 0;
    message.sfixed32 = object.sfixed32 ?? 0;
    message.sfixed64 = object.sfixed64 ?? 0;
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
    const reader = input instanceof Reader ? input : new Reader(input);
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

  fromJSON(object: any): SimpleButOptional {
    const message = { ...baseSimpleButOptional } as SimpleButOptional;
    message.name = object.name !== undefined && object.name !== null ? String(object.name) : undefined;
    message.age = object.age !== undefined && object.age !== null ? Number(object.age) : undefined;
    message.createdAt =
      object.createdAt !== undefined && object.createdAt !== null ? fromJsonTimestamp(object.createdAt) : undefined;
    message.child = object.child !== undefined && object.child !== null ? Child.fromJSON(object.child) : undefined;
    message.state = object.state !== undefined && object.state !== null ? stateEnumFromJSON(object.state) : undefined;
    message.thing =
      object.thing !== undefined && object.thing !== null ? ImportedThing.fromJSON(object.thing) : undefined;
    message.birthday =
      object.birthday !== undefined && object.birthday !== null ? DateMessage.fromJSON(object.birthday) : undefined;
    return message;
  },

  toJSON(message: SimpleButOptional): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = message.age);
    message.createdAt !== undefined && (obj.createdAt = message.createdAt.toISOString());
    message.child !== undefined && (obj.child = message.child ? Child.toJSON(message.child) : undefined);
    message.state !== undefined &&
      (obj.state = message.state !== undefined ? stateEnumToJSON(message.state) : undefined);
    message.thing !== undefined && (obj.thing = message.thing ? ImportedThing.toJSON(message.thing) : undefined);
    message.birthday !== undefined &&
      (obj.birthday = message.birthday ? DateMessage.toJSON(message.birthday) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleButOptional>): SimpleButOptional {
    const message = { ...baseSimpleButOptional } as SimpleButOptional;
    message.name = object.name ?? undefined;
    message.age = object.age ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.child = object.child !== undefined && object.child !== null ? Child.fromPartial(object.child) : undefined;
    message.state = object.state ?? undefined;
    message.thing =
      object.thing !== undefined && object.thing !== null ? ImportedThing.fromPartial(object.thing) : undefined;
    message.birthday =
      object.birthday !== undefined && object.birthday !== null ? DateMessage.fromPartial(object.birthday) : undefined;
    return message;
  },
};

const baseEmpty: object = {};

export const Empty = {
  encode(_: Empty, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Empty {
    const reader = input instanceof Reader ? input : new Reader(input);
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

  fromJSON(_: any): Empty {
    const message = { ...baseEmpty } as Empty;
    return message;
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial(_: DeepPartial<Empty>): Empty {
    const message = { ...baseEmpty } as Empty;
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
    return promise.then((data) => PingResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

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

const atob: (b64: string) => string =
  globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(''));
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
  } else if (typeof o === 'string') {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
