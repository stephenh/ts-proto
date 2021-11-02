/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Timestamp } from './google/protobuf/timestamp';
import { ImportedThing } from './import_dir/thing';
import { StringValue, Int32Value, BoolValue } from './google/protobuf/wrappers';

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
  created_at: Date | undefined;
  child: Child | undefined;
  state: StateEnum;
  grand_children: Child[];
  coins: number[];
  snacks: string[];
  old_states: StateEnum[];
  /** A thing (imported from thing) */
  thing: ImportedThing | undefined;
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
  entities_by_id: { [key: number]: Entity };
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

const baseSimple: object = { name: '', age: 0, state: 0, coins: 0, snacks: '', old_states: 0 };

export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    if (message.created_at !== undefined) {
      Timestamp.encode(toTimestamp(message.created_at), writer.uint32(74).fork()).ldelim();
    }
    if (message.child !== undefined) {
      Child.encode(message.child, writer.uint32(26).fork()).ldelim();
    }
    if (message.state !== 0) {
      writer.uint32(32).int32(message.state);
    }
    for (const v of message.grand_children) {
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
    for (const v of message.old_states) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.thing !== undefined) {
      ImportedThing.encode(message.thing, writer.uint32(82).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimple } as Simple;
    message.grand_children = [];
    message.coins = [];
    message.snacks = [];
    message.old_states = [];
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
          message.created_at = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          break;
        case 3:
          message.child = Child.decode(reader, reader.uint32());
          break;
        case 4:
          message.state = reader.int32() as any;
          break;
        case 5:
          message.grand_children.push(Child.decode(reader, reader.uint32()));
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
              message.old_states.push(reader.int32() as any);
            }
          } else {
            message.old_states.push(reader.int32() as any);
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
    message.grand_children = [];
    message.coins = [];
    message.snacks = [];
    message.old_states = [];
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.age !== undefined && object.age !== null) {
      message.age = Number(object.age);
    } else {
      message.age = 0;
    }
    if (object.created_at !== undefined && object.created_at !== null) {
      message.created_at = fromJsonTimestamp(object.created_at);
    } else {
      message.created_at = undefined;
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
    if (object.grand_children !== undefined && object.grand_children !== null) {
      for (const e of object.grand_children) {
        message.grand_children.push(Child.fromJSON(e));
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
    if (object.old_states !== undefined && object.old_states !== null) {
      for (const e of object.old_states) {
        message.old_states.push(stateEnumFromJSON(e));
      }
    }
    if (object.thing !== undefined && object.thing !== null) {
      message.thing = ImportedThing.fromJSON(object.thing);
    } else {
      message.thing = undefined;
    }
    return message;
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = message.age);
    message.created_at !== undefined && (obj.created_at = message.created_at.toISOString());
    message.child !== undefined && (obj.child = message.child ? Child.toJSON(message.child) : undefined);
    message.state !== undefined && (obj.state = stateEnumToJSON(message.state));
    if (message.grand_children) {
      obj.grand_children = message.grand_children.map((e) => (e ? Child.toJSON(e) : undefined));
    } else {
      obj.grand_children = [];
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
    if (message.old_states) {
      obj.old_states = message.old_states.map((e) => stateEnumToJSON(e));
    } else {
      obj.old_states = [];
    }
    message.thing !== undefined && (obj.thing = message.thing ? ImportedThing.toJSON(message.thing) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<Simple>): Simple {
    const message = { ...baseSimple } as Simple;
    message.name = object.name ?? '';
    message.age = object.age ?? 0;
    message.created_at = object.created_at ?? undefined;
    if (object.child !== undefined && object.child !== null) {
      message.child = Child.fromPartial(object.child);
    } else {
      message.child = undefined;
    }
    message.state = object.state ?? 0;
    message.grand_children = [];
    if (object.grand_children !== undefined && object.grand_children !== null) {
      for (const e of object.grand_children) {
        message.grand_children.push(Child.fromPartial(e));
      }
    }
    message.coins = [];
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(e);
      }
    }
    message.snacks = [];
    if (object.snacks !== undefined && object.snacks !== null) {
      for (const e of object.snacks) {
        message.snacks.push(e);
      }
    }
    message.old_states = [];
    if (object.old_states !== undefined && object.old_states !== null) {
      for (const e of object.old_states) {
        message.old_states.push(e);
      }
    }
    if (object.thing !== undefined && object.thing !== null) {
      message.thing = ImportedThing.fromPartial(object.thing);
    } else {
      message.thing = undefined;
    }
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.type !== undefined && object.type !== null) {
      message.type = child_TypeFromJSON(object.type);
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
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
    if (object.message !== undefined && object.message !== null) {
      message.message = Nested_InnerMessage.fromPartial(object.message);
    } else {
      message.message = undefined;
    }
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
    if (object.deep !== undefined && object.deep !== null) {
      message.deep = Nested_InnerMessage_DeepMessage.fromJSON(object.deep);
    } else {
      message.deep = undefined;
    }
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
    if (object.deep !== undefined && object.deep !== null) {
      message.deep = Nested_InnerMessage_DeepMessage.fromPartial(object.deep);
    } else {
      message.deep = undefined;
    }
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
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = '';
    }
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
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithWrappers>): SimpleWithWrappers {
    const message = { ...baseSimpleWithWrappers } as SimpleWithWrappers;
    message.name = object.name ?? undefined;
    message.age = object.age ?? undefined;
    message.enabled = object.enabled ?? undefined;
    message.coins = [];
    if (object.coins !== undefined && object.coins !== null) {
      for (const e of object.coins) {
        message.coins.push(e);
      }
    }
    message.snacks = [];
    if (object.snacks !== undefined && object.snacks !== null) {
      for (const e of object.snacks) {
        message.snacks.push(e);
      }
    }
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
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithMap {
    const reader = input instanceof Reader ? input : new Reader(input);
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
      });
    }
    if (object.nameLookup !== undefined && object.nameLookup !== null) {
      Object.entries(object.nameLookup).forEach(([key, value]) => {
        message.nameLookup[key] = String(value);
      });
    }
    if (object.intLookup !== undefined && object.intLookup !== null) {
      Object.entries(object.intLookup).forEach(([key, value]) => {
        message.intLookup[Number(key)] = Number(value);
      });
    }
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
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap>): SimpleWithMap {
    const message = { ...baseSimpleWithMap } as SimpleWithMap;
    message.entitiesById = {};
    if (object.entitiesById !== undefined && object.entitiesById !== null) {
      Object.entries(object.entitiesById).forEach(([key, value]) => {
        if (value !== undefined) {
          message.entitiesById[Number(key)] = Entity.fromPartial(value);
        }
      });
    }
    message.nameLookup = {};
    if (object.nameLookup !== undefined && object.nameLookup !== null) {
      Object.entries(object.nameLookup).forEach(([key, value]) => {
        if (value !== undefined) {
          message.nameLookup[key] = String(value);
        }
      });
    }
    message.intLookup = {};
    if (object.intLookup !== undefined && object.intLookup !== null) {
      Object.entries(object.intLookup).forEach(([key, value]) => {
        if (value !== undefined) {
          message.intLookup[Number(key)] = Number(value);
        }
      });
    }
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

  toJSON(message: SimpleWithMap_EntitiesByIdEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Entity.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithMap_EntitiesByIdEntry>): SimpleWithMap_EntitiesByIdEntry {
    const message = { ...baseSimpleWithMap_EntitiesByIdEntry } as SimpleWithMap_EntitiesByIdEntry;
    message.key = object.key ?? 0;
    if (object.value !== undefined && object.value !== null) {
      message.value = Entity.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
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
    if (object.key !== undefined && object.key !== null) {
      message.key = String(object.key);
    } else {
      message.key = '';
    }
    if (object.value !== undefined && object.value !== null) {
      message.value = String(object.value);
    } else {
      message.value = '';
    }
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

const baseSimpleWithSnakeCaseMap: object = {};

export const SimpleWithSnakeCaseMap = {
  encode(message: SimpleWithSnakeCaseMap, writer: Writer = Writer.create()): Writer {
    Object.entries(message.entities_by_id).forEach(([key, value]) => {
      SimpleWithSnakeCaseMap_EntitiesByIdEntry.encode({ key: key as any, value }, writer.uint32(10).fork()).ldelim();
    });
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SimpleWithSnakeCaseMap {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSimpleWithSnakeCaseMap } as SimpleWithSnakeCaseMap;
    message.entities_by_id = {};
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = SimpleWithSnakeCaseMap_EntitiesByIdEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.entities_by_id[entry1.key] = entry1.value;
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
    message.entities_by_id = {};
    if (object.entities_by_id !== undefined && object.entities_by_id !== null) {
      Object.entries(object.entities_by_id).forEach(([key, value]) => {
        message.entities_by_id[Number(key)] = Entity.fromJSON(value);
      });
    }
    return message;
  },

  toJSON(message: SimpleWithSnakeCaseMap): unknown {
    const obj: any = {};
    obj.entities_by_id = {};
    if (message.entities_by_id) {
      Object.entries(message.entities_by_id).forEach(([k, v]) => {
        obj.entities_by_id[k] = Entity.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithSnakeCaseMap>): SimpleWithSnakeCaseMap {
    const message = { ...baseSimpleWithSnakeCaseMap } as SimpleWithSnakeCaseMap;
    message.entities_by_id = {};
    if (object.entities_by_id !== undefined && object.entities_by_id !== null) {
      Object.entries(object.entities_by_id).forEach(([key, value]) => {
        if (value !== undefined) {
          message.entities_by_id[Number(key)] = Entity.fromPartial(value);
        }
      });
    }
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

  toJSON(message: SimpleWithSnakeCaseMap_EntitiesByIdEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value ? Entity.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial(object: DeepPartial<SimpleWithSnakeCaseMap_EntitiesByIdEntry>): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    const message = { ...baseSimpleWithSnakeCaseMap_EntitiesByIdEntry } as SimpleWithSnakeCaseMap_EntitiesByIdEntry;
    message.key = object.key ?? 0;
    if (object.value !== undefined && object.value !== null) {
      message.value = Entity.fromPartial(object.value);
    } else {
      message.value = undefined;
    }
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
    if (object.input !== undefined && object.input !== null) {
      message.input = String(object.input);
    } else {
      message.input = '';
    }
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
    if (object.output !== undefined && object.output !== null) {
      message.output = String(object.output);
    } else {
      message.output = '';
    }
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
      message.int64 = Number(object.int64);
    } else {
      message.int64 = 0;
    }
    if (object.uint32 !== undefined && object.uint32 !== null) {
      message.uint32 = Number(object.uint32);
    } else {
      message.uint32 = 0;
    }
    if (object.uint64 !== undefined && object.uint64 !== null) {
      message.uint64 = Number(object.uint64);
    } else {
      message.uint64 = 0;
    }
    if (object.sint32 !== undefined && object.sint32 !== null) {
      message.sint32 = Number(object.sint32);
    } else {
      message.sint32 = 0;
    }
    if (object.sint64 !== undefined && object.sint64 !== null) {
      message.sint64 = Number(object.sint64);
    } else {
      message.sint64 = 0;
    }
    if (object.fixed32 !== undefined && object.fixed32 !== null) {
      message.fixed32 = Number(object.fixed32);
    } else {
      message.fixed32 = 0;
    }
    if (object.fixed64 !== undefined && object.fixed64 !== null) {
      message.fixed64 = Number(object.fixed64);
    } else {
      message.fixed64 = 0;
    }
    if (object.sfixed32 !== undefined && object.sfixed32 !== null) {
      message.sfixed32 = Number(object.sfixed32);
    } else {
      message.sfixed32 = 0;
    }
    if (object.sfixed64 !== undefined && object.sfixed64 !== null) {
      message.sfixed64 = Number(object.sfixed64);
    } else {
      message.sfixed64 = 0;
    }
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
