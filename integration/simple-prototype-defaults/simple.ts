/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";
import { BoolValue, BytesValue, Int32Value, StringValue } from "./google/protobuf/wrappers";
import { DateMessage } from "./google/type/date";
import { ImportedThing } from "./import_dir/thing";

export const protobufPackage = "simple";

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
    case StateEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
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
    case Child_Type.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
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
    case Nested_InnerEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
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
  first?: string | undefined;
  last?: string | undefined;
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
  name?:
    | string
    | undefined;
  /** Age */
  age?:
    | number
    | undefined;
  /** This comment will also attach */
  createdAt?: Date | undefined;
  child?: Child | undefined;
  state?:
    | StateEnum
    | undefined;
  /** A thing (imported from thing) */
  thing?: ImportedThing | undefined;
  birthday?: DateMessage | undefined;
}

export interface Empty {
}

function createBaseSimple(): Simple {
  return {
    name: "",
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
    blob: new Uint8Array(0),
  };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimple()) as Simple;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.age = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.child = Child.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.grandChildren.push(Child.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag === 48) {
            message.coins.push(reader.int32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.coins.push(reader.int32());
            }

            continue;
          }

          break;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.snacks.push(reader.string());
          continue;
        case 8:
          if (tag === 64) {
            message.oldStates.push(reader.int32() as any);

            continue;
          }

          if (tag === 66) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.oldStates.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.thing = ImportedThing.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.blobs.push(reader.bytes());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.birthday = DateMessage.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.blob = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Simple {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      age: isSet(object.age) ? Number(object.age) : 0,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      child: isSet(object.child) ? Child.fromJSON(object.child) : undefined,
      state: isSet(object.state) ? stateEnumFromJSON(object.state) : 0,
      grandChildren: Array.isArray(object?.grandChildren)
        ? object.grandChildren.map((e: any) => Child.fromJSON(e))
        : [],
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Number(e)) : [],
      snacks: Array.isArray(object?.snacks) ? object.snacks.map((e: any) => String(e)) : [],
      oldStates: Array.isArray(object?.oldStates) ? object.oldStates.map((e: any) => stateEnumFromJSON(e)) : [],
      thing: isSet(object.thing) ? ImportedThing.fromJSON(object.thing) : undefined,
      blobs: Array.isArray(object?.blobs) ? object.blobs.map((e: any) => bytesFromBase64(e)) : [],
      birthday: isSet(object.birthday) ? DateMessage.fromJSON(object.birthday) : undefined,
      blob: isSet(object.blob) ? bytesFromBase64(object.blob) : new Uint8Array(0),
    };
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.age !== 0) {
      obj.age = Math.round(message.age);
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.child !== undefined) {
      obj.child = message.child ? Child.toJSON(message.child) : undefined;
    }
    if (message.state !== 0) {
      obj.state = stateEnumToJSON(message.state);
    }
    if (message.grandChildren?.length) {
      obj.grandChildren = message.grandChildren.map((e) => e ? Child.toJSON(e) : undefined);
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => Math.round(e));
    }
    if (message.snacks?.length) {
      obj.snacks = message.snacks.map((e) => e);
    }
    if (message.oldStates?.length) {
      obj.oldStates = message.oldStates.map((e) => stateEnumToJSON(e));
    }
    if (message.thing !== undefined) {
      obj.thing = message.thing ? ImportedThing.toJSON(message.thing) : undefined;
    }
    if (message.blobs?.length) {
      obj.blobs = message.blobs.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array(0)));
    }
    if (message.birthday !== undefined) {
      obj.birthday = message.birthday ? DateMessage.toJSON(message.birthday) : undefined;
    }
    if (message.blob.length !== 0) {
      obj.blob = base64FromBytes(message.blob !== undefined ? message.blob : new Uint8Array(0));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple>, I>>(base?: I): Simple {
    return Simple.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = Object.create(createBaseSimple()) as Simple;
    message.name = object.name ?? "";
    message.age = object.age ?? 0;
    message.createdAt = object.createdAt ?? undefined;
    message.child = (object.child !== undefined && object.child !== null) ? Child.fromPartial(object.child) : undefined;
    message.state = object.state ?? 0;
    message.grandChildren = object.grandChildren?.map((e) => Child.fromPartial(e)) || [];
    message.coins = object.coins?.map((e) => e) || [];
    message.snacks = object.snacks?.map((e) => e) || [];
    message.oldStates = object.oldStates?.map((e) => e) || [];
    message.thing = (object.thing !== undefined && object.thing !== null)
      ? ImportedThing.fromPartial(object.thing)
      : undefined;
    message.blobs = object.blobs?.map((e) => e) || [];
    message.birthday = (object.birthday !== undefined && object.birthday !== null)
      ? DateMessage.fromPartial(object.birthday)
      : undefined;
    message.blob = object.blob ?? new Uint8Array(0);
    return message;
  },
};

function createBaseChild(): Child {
  return { name: "", type: 0 };
}

export const Child = {
  encode(message: Child, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.type !== 0) {
      writer.uint32(16).int32(message.type);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Child {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseChild()) as Child;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Child {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      type: isSet(object.type) ? child_TypeFromJSON(object.type) : 0,
    };
  },

  toJSON(message: Child): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.type !== 0) {
      obj.type = child_TypeToJSON(message.type);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Child>, I>>(base?: I): Child {
    return Child.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Child>, I>>(object: I): Child {
    const message = Object.create(createBaseChild()) as Child;
    message.name = object.name ?? "";
    message.type = object.type ?? 0;
    return message;
  },
};

function createBaseNested(): Nested {
  return { name: "", message: undefined, state: 0 };
}

export const Nested = {
  encode(message: Nested, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseNested()) as Nested;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = Nested_InnerMessage.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Nested {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      message: isSet(object.message) ? Nested_InnerMessage.fromJSON(object.message) : undefined,
      state: isSet(object.state) ? nested_InnerEnumFromJSON(object.state) : 0,
    };
  },

  toJSON(message: Nested): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.message !== undefined) {
      obj.message = message.message ? Nested_InnerMessage.toJSON(message.message) : undefined;
    }
    if (message.state !== 0) {
      obj.state = nested_InnerEnumToJSON(message.state);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Nested>, I>>(base?: I): Nested {
    return Nested.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Nested>, I>>(object: I): Nested {
    const message = Object.create(createBaseNested()) as Nested;
    message.name = object.name ?? "";
    message.message = (object.message !== undefined && object.message !== null)
      ? Nested_InnerMessage.fromPartial(object.message)
      : undefined;
    message.state = object.state ?? 0;
    return message;
  },
};

function createBaseNested_InnerMessage(): Nested_InnerMessage {
  return { name: "", deep: undefined };
}

export const Nested_InnerMessage = {
  encode(message: Nested_InnerMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.deep !== undefined) {
      Nested_InnerMessage_DeepMessage.encode(message.deep, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Nested_InnerMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseNested_InnerMessage()) as Nested_InnerMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.deep = Nested_InnerMessage_DeepMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Nested_InnerMessage {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      deep: isSet(object.deep) ? Nested_InnerMessage_DeepMessage.fromJSON(object.deep) : undefined,
    };
  },

  toJSON(message: Nested_InnerMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.deep !== undefined) {
      obj.deep = message.deep ? Nested_InnerMessage_DeepMessage.toJSON(message.deep) : undefined;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Nested_InnerMessage>, I>>(base?: I): Nested_InnerMessage {
    return Nested_InnerMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Nested_InnerMessage>, I>>(object: I): Nested_InnerMessage {
    const message = Object.create(createBaseNested_InnerMessage()) as Nested_InnerMessage;
    message.name = object.name ?? "";
    message.deep = (object.deep !== undefined && object.deep !== null)
      ? Nested_InnerMessage_DeepMessage.fromPartial(object.deep)
      : undefined;
    return message;
  },
};

function createBaseNested_InnerMessage_DeepMessage(): Nested_InnerMessage_DeepMessage {
  return { name: "" };
}

export const Nested_InnerMessage_DeepMessage = {
  encode(message: Nested_InnerMessage_DeepMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Nested_InnerMessage_DeepMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseNested_InnerMessage_DeepMessage()) as Nested_InnerMessage_DeepMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
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

  fromJSON(object: any): Nested_InnerMessage_DeepMessage {
    return { name: isSet(object.name) ? String(object.name) : "" };
  },

  toJSON(message: Nested_InnerMessage_DeepMessage): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Nested_InnerMessage_DeepMessage>, I>>(base?: I): Nested_InnerMessage_DeepMessage {
    return Nested_InnerMessage_DeepMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Nested_InnerMessage_DeepMessage>, I>>(
    object: I,
  ): Nested_InnerMessage_DeepMessage {
    const message = Object.create(createBaseNested_InnerMessage_DeepMessage()) as Nested_InnerMessage_DeepMessage;
    message.name = object.name ?? "";
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseOneOfMessage()) as OneOfMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.first = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.last = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OneOfMessage {
    return {
      first: isSet(object.first) ? String(object.first) : undefined,
      last: isSet(object.last) ? String(object.last) : undefined,
    };
  },

  toJSON(message: OneOfMessage): unknown {
    const obj: any = {};
    if (message.first !== undefined) {
      obj.first = message.first;
    }
    if (message.last !== undefined) {
      obj.last = message.last;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OneOfMessage>, I>>(base?: I): OneOfMessage {
    return OneOfMessage.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<OneOfMessage>, I>>(object: I): OneOfMessage {
    const message = Object.create(createBaseOneOfMessage()) as OneOfMessage;
    message.first = object.first ?? undefined;
    message.last = object.last ?? undefined;
    return message;
  },
};

function createBaseSimpleWithWrappers(): SimpleWithWrappers {
  return { name: undefined, age: undefined, enabled: undefined, coins: [], snacks: [], id: undefined };
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
    if (message.id !== undefined) {
      BytesValue.encode({ value: message.id! }, writer.uint32(66).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithWrappers {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithWrappers()) as SimpleWithWrappers;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = StringValue.decode(reader, reader.uint32()).value;
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.age = Int32Value.decode(reader, reader.uint32()).value;
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.enabled = BoolValue.decode(reader, reader.uint32()).value;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.coins.push(Int32Value.decode(reader, reader.uint32()).value);
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.snacks.push(StringValue.decode(reader, reader.uint32()).value);
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.id = BytesValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithWrappers {
    return {
      name: isSet(object.name) ? String(object.name) : undefined,
      age: isSet(object.age) ? Number(object.age) : undefined,
      enabled: isSet(object.enabled) ? Boolean(object.enabled) : undefined,
      coins: Array.isArray(object?.coins) ? object.coins.map((e: any) => Number(e)) : [],
      snacks: Array.isArray(object?.snacks) ? object.snacks.map((e: any) => String(e)) : [],
      id: isSet(object.id) ? new Uint8Array(object.id) : undefined,
    };
  },

  toJSON(message: SimpleWithWrappers): unknown {
    const obj: any = {};
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.age !== undefined) {
      obj.age = message.age;
    }
    if (message.enabled !== undefined) {
      obj.enabled = message.enabled;
    }
    if (message.coins?.length) {
      obj.coins = message.coins.map((e) => e);
    }
    if (message.snacks?.length) {
      obj.snacks = message.snacks.map((e) => e);
    }
    if (message.id !== undefined) {
      obj.id = message.id;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithWrappers>, I>>(base?: I): SimpleWithWrappers {
    return SimpleWithWrappers.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithWrappers>, I>>(object: I): SimpleWithWrappers {
    const message = Object.create(createBaseSimpleWithWrappers()) as SimpleWithWrappers;
    message.name = object.name ?? undefined;
    message.age = object.age ?? undefined;
    message.enabled = object.enabled ?? undefined;
    message.coins = object.coins?.map((e) => e) || [];
    message.snacks = object.snacks?.map((e) => e) || [];
    message.id = object.id ?? undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseEntity()) as Entity;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
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
    return { id: isSet(object.id) ? Number(object.id) : 0 };
  },

  toJSON(message: Entity): unknown {
    const obj: any = {};
    if (message.id !== 0) {
      obj.id = Math.round(message.id);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Entity>, I>>(base?: I): Entity {
    return Entity.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Entity>, I>>(object: I): Entity {
    const message = Object.create(createBaseEntity()) as Entity;
    message.id = object.id ?? 0;
    return message;
  },
};

function createBaseSimpleWithMap(): SimpleWithMap {
  return {
    entitiesById: {},
    nameLookup: {},
    intLookup: {},
    mapOfTimestamps: {},
    mapOfBytes: {},
    mapOfStringValues: {},
    longLookup: {},
  };
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

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithMap()) as SimpleWithMap;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = SimpleWithMap_EntitiesByIdEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.entitiesById[entry1.key] = entry1.value;
          }
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          const entry2 = SimpleWithMap_NameLookupEntry.decode(reader, reader.uint32());
          if (entry2.value !== undefined) {
            message.nameLookup[entry2.key] = entry2.value;
          }
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = SimpleWithMap_IntLookupEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            message.intLookup[entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          const entry4 = SimpleWithMap_MapOfTimestampsEntry.decode(reader, reader.uint32());
          if (entry4.value !== undefined) {
            message.mapOfTimestamps[entry4.key] = entry4.value;
          }
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          const entry5 = SimpleWithMap_MapOfBytesEntry.decode(reader, reader.uint32());
          if (entry5.value !== undefined) {
            message.mapOfBytes[entry5.key] = entry5.value;
          }
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          const entry6 = SimpleWithMap_MapOfStringValuesEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.mapOfStringValues[entry6.key] = entry6.value;
          }
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          const entry7 = SimpleWithMap_LongLookupEntry.decode(reader, reader.uint32());
          if (entry7.value !== undefined) {
            message.longLookup[entry7.key] = entry7.value;
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

  fromJSON(object: any): SimpleWithMap {
    return {
      entitiesById: isObject(object.entitiesById)
        ? Object.entries(object.entitiesById).reduce<{ [key: number]: Entity }>((acc, [key, value]) => {
          acc[Number(key)] = Entity.fromJSON(value);
          return acc;
        }, {})
        : {},
      nameLookup: isObject(object.nameLookup)
        ? Object.entries(object.nameLookup).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
      intLookup: isObject(object.intLookup)
        ? Object.entries(object.intLookup).reduce<{ [key: number]: number }>((acc, [key, value]) => {
          acc[Number(key)] = Number(value);
          return acc;
        }, {})
        : {},
      mapOfTimestamps: isObject(object.mapOfTimestamps)
        ? Object.entries(object.mapOfTimestamps).reduce<{ [key: string]: Date }>((acc, [key, value]) => {
          acc[key] = fromJsonTimestamp(value);
          return acc;
        }, {})
        : {},
      mapOfBytes: isObject(object.mapOfBytes)
        ? Object.entries(object.mapOfBytes).reduce<{ [key: string]: Uint8Array }>((acc, [key, value]) => {
          acc[key] = bytesFromBase64(value as string);
          return acc;
        }, {})
        : {},
      mapOfStringValues: isObject(object.mapOfStringValues)
        ? Object.entries(object.mapOfStringValues).reduce<{ [key: string]: string | undefined }>(
          (acc, [key, value]) => {
            acc[key] = value as string | undefined;
            return acc;
          },
          {},
        )
        : {},
      longLookup: isObject(object.longLookup)
        ? Object.entries(object.longLookup).reduce<{ [key: number]: number }>((acc, [key, value]) => {
          acc[Number(key)] = Number(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: SimpleWithMap): unknown {
    const obj: any = {};
    if (message.entitiesById) {
      const entries = Object.entries(message.entitiesById);
      if (entries.length > 0) {
        obj.entitiesById = {};
        entries.forEach(([k, v]) => {
          obj.entitiesById[k] = Entity.toJSON(v);
        });
      }
    }
    if (message.nameLookup) {
      const entries = Object.entries(message.nameLookup);
      if (entries.length > 0) {
        obj.nameLookup = {};
        entries.forEach(([k, v]) => {
          obj.nameLookup[k] = v;
        });
      }
    }
    if (message.intLookup) {
      const entries = Object.entries(message.intLookup);
      if (entries.length > 0) {
        obj.intLookup = {};
        entries.forEach(([k, v]) => {
          obj.intLookup[k] = Math.round(v);
        });
      }
    }
    if (message.mapOfTimestamps) {
      const entries = Object.entries(message.mapOfTimestamps);
      if (entries.length > 0) {
        obj.mapOfTimestamps = {};
        entries.forEach(([k, v]) => {
          obj.mapOfTimestamps[k] = v.toISOString();
        });
      }
    }
    if (message.mapOfBytes) {
      const entries = Object.entries(message.mapOfBytes);
      if (entries.length > 0) {
        obj.mapOfBytes = {};
        entries.forEach(([k, v]) => {
          obj.mapOfBytes[k] = base64FromBytes(v);
        });
      }
    }
    if (message.mapOfStringValues) {
      const entries = Object.entries(message.mapOfStringValues);
      if (entries.length > 0) {
        obj.mapOfStringValues = {};
        entries.forEach(([k, v]) => {
          obj.mapOfStringValues[k] = v;
        });
      }
    }
    if (message.longLookup) {
      const entries = Object.entries(message.longLookup);
      if (entries.length > 0) {
        obj.longLookup = {};
        entries.forEach(([k, v]) => {
          obj.longLookup[k] = Math.round(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap>, I>>(base?: I): SimpleWithMap {
    return SimpleWithMap.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap>, I>>(object: I): SimpleWithMap {
    const message = Object.create(createBaseSimpleWithMap()) as SimpleWithMap;
    message.entitiesById = Object.entries(object.entitiesById ?? {}).reduce<{ [key: number]: Entity }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = Entity.fromPartial(value);
        }
        return acc;
      },
      {},
    );
    message.nameLookup = Object.entries(object.nameLookup ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {},
    );
    message.intLookup = Object.entries(object.intLookup ?? {}).reduce<{ [key: number]: number }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = Number(value);
        }
        return acc;
      },
      {},
    );
    message.mapOfTimestamps = Object.entries(object.mapOfTimestamps ?? {}).reduce<{ [key: string]: Date }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    message.mapOfBytes = Object.entries(object.mapOfBytes ?? {}).reduce<{ [key: string]: Uint8Array }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );
    message.mapOfStringValues = Object.entries(object.mapOfStringValues ?? {}).reduce<
      { [key: string]: string | undefined }
    >((acc, [key, value]) => {
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
      {},
    );
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithMap_EntitiesByIdEntry()) as SimpleWithMap_EntitiesByIdEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = reader.int32();
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

  fromJSON(object: any): SimpleWithMap_EntitiesByIdEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? Entity.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: SimpleWithMap_EntitiesByIdEntry): unknown {
    const obj: any = {};
    if (message.key !== 0) {
      obj.key = Math.round(message.key);
    }
    if (message.value !== undefined) {
      obj.value = message.value ? Entity.toJSON(message.value) : undefined;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_EntitiesByIdEntry>, I>>(base?: I): SimpleWithMap_EntitiesByIdEntry {
    return SimpleWithMap_EntitiesByIdEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_EntitiesByIdEntry>, I>>(
    object: I,
  ): SimpleWithMap_EntitiesByIdEntry {
    const message = Object.create(createBaseSimpleWithMap_EntitiesByIdEntry()) as SimpleWithMap_EntitiesByIdEntry;
    message.key = object.key ?? 0;
    message.value = (object.value !== undefined && object.value !== null)
      ? Entity.fromPartial(object.value)
      : undefined;
    return message;
  },
};

function createBaseSimpleWithMap_NameLookupEntry(): SimpleWithMap_NameLookupEntry {
  return { key: "", value: "" };
}

export const SimpleWithMap_NameLookupEntry = {
  encode(message: SimpleWithMap_NameLookupEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_NameLookupEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithMap_NameLookupEntry()) as SimpleWithMap_NameLookupEntry;
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

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_NameLookupEntry {
    return { key: isSet(object.key) ? String(object.key) : "", value: isSet(object.value) ? String(object.value) : "" };
  },

  toJSON(message: SimpleWithMap_NameLookupEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_NameLookupEntry>, I>>(base?: I): SimpleWithMap_NameLookupEntry {
    return SimpleWithMap_NameLookupEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_NameLookupEntry>, I>>(
    object: I,
  ): SimpleWithMap_NameLookupEntry {
    const message = Object.create(createBaseSimpleWithMap_NameLookupEntry()) as SimpleWithMap_NameLookupEntry;
    message.key = object.key ?? "";
    message.value = object.value ?? "";
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithMap_IntLookupEntry()) as SimpleWithMap_IntLookupEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_IntLookupEntry {
    return { key: isSet(object.key) ? Number(object.key) : 0, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: SimpleWithMap_IntLookupEntry): unknown {
    const obj: any = {};
    if (message.key !== 0) {
      obj.key = Math.round(message.key);
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_IntLookupEntry>, I>>(base?: I): SimpleWithMap_IntLookupEntry {
    return SimpleWithMap_IntLookupEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_IntLookupEntry>, I>>(object: I): SimpleWithMap_IntLookupEntry {
    const message = Object.create(createBaseSimpleWithMap_IntLookupEntry()) as SimpleWithMap_IntLookupEntry;
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBaseSimpleWithMap_MapOfTimestampsEntry(): SimpleWithMap_MapOfTimestampsEntry {
  return { key: "", value: undefined };
}

export const SimpleWithMap_MapOfTimestampsEntry = {
  encode(message: SimpleWithMap_MapOfTimestampsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Timestamp.encode(toTimestamp(message.value), writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_MapOfTimestampsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithMap_MapOfTimestampsEntry()) as SimpleWithMap_MapOfTimestampsEntry;
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

          message.value = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_MapOfTimestampsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? fromJsonTimestamp(object.value) : undefined,
    };
  },

  toJSON(message: SimpleWithMap_MapOfTimestampsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value.toISOString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_MapOfTimestampsEntry>, I>>(
    base?: I,
  ): SimpleWithMap_MapOfTimestampsEntry {
    return SimpleWithMap_MapOfTimestampsEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_MapOfTimestampsEntry>, I>>(
    object: I,
  ): SimpleWithMap_MapOfTimestampsEntry {
    const message = Object.create(createBaseSimpleWithMap_MapOfTimestampsEntry()) as SimpleWithMap_MapOfTimestampsEntry;
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

function createBaseSimpleWithMap_MapOfBytesEntry(): SimpleWithMap_MapOfBytesEntry {
  return { key: "", value: new Uint8Array(0) };
}

export const SimpleWithMap_MapOfBytesEntry = {
  encode(message: SimpleWithMap_MapOfBytesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value.length !== 0) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_MapOfBytesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithMap_MapOfBytesEntry()) as SimpleWithMap_MapOfBytesEntry;
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

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_MapOfBytesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? bytesFromBase64(object.value) : new Uint8Array(0),
    };
  },

  toJSON(message: SimpleWithMap_MapOfBytesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value.length !== 0) {
      obj.value = base64FromBytes(message.value !== undefined ? message.value : new Uint8Array(0));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_MapOfBytesEntry>, I>>(base?: I): SimpleWithMap_MapOfBytesEntry {
    return SimpleWithMap_MapOfBytesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_MapOfBytesEntry>, I>>(
    object: I,
  ): SimpleWithMap_MapOfBytesEntry {
    const message = Object.create(createBaseSimpleWithMap_MapOfBytesEntry()) as SimpleWithMap_MapOfBytesEntry;
    message.key = object.key ?? "";
    message.value = object.value ?? new Uint8Array(0);
    return message;
  },
};

function createBaseSimpleWithMap_MapOfStringValuesEntry(): SimpleWithMap_MapOfStringValuesEntry {
  return { key: "", value: undefined };
}

export const SimpleWithMap_MapOfStringValuesEntry = {
  encode(message: SimpleWithMap_MapOfStringValuesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      StringValue.encode({ value: message.value! }, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_MapOfStringValuesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(
      createBaseSimpleWithMap_MapOfStringValuesEntry(),
    ) as SimpleWithMap_MapOfStringValuesEntry;
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

          message.value = StringValue.decode(reader, reader.uint32()).value;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_MapOfStringValuesEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? String(object.value) : undefined,
    };
  },

  toJSON(message: SimpleWithMap_MapOfStringValuesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_MapOfStringValuesEntry>, I>>(
    base?: I,
  ): SimpleWithMap_MapOfStringValuesEntry {
    return SimpleWithMap_MapOfStringValuesEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_MapOfStringValuesEntry>, I>>(
    object: I,
  ): SimpleWithMap_MapOfStringValuesEntry {
    const message = Object.create(
      createBaseSimpleWithMap_MapOfStringValuesEntry(),
    ) as SimpleWithMap_MapOfStringValuesEntry;
    message.key = object.key ?? "";
    message.value = object.value ?? undefined;
    return message;
  },
};

function createBaseSimpleWithMap_LongLookupEntry(): SimpleWithMap_LongLookupEntry {
  return { key: 0, value: 0 };
}

export const SimpleWithMap_LongLookupEntry = {
  encode(message: SimpleWithMap_LongLookupEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== 0) {
      writer.uint32(8).int64(message.key);
    }
    if (message.value !== 0) {
      writer.uint32(16).int64(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SimpleWithMap_LongLookupEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithMap_LongLookupEntry()) as SimpleWithMap_LongLookupEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = longToNumber(reader.int64() as Long);
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = longToNumber(reader.int64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMap_LongLookupEntry {
    return { key: isSet(object.key) ? Number(object.key) : 0, value: isSet(object.value) ? Number(object.value) : 0 };
  },

  toJSON(message: SimpleWithMap_LongLookupEntry): unknown {
    const obj: any = {};
    if (message.key !== 0) {
      obj.key = Math.round(message.key);
    }
    if (message.value !== 0) {
      obj.value = Math.round(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMap_LongLookupEntry>, I>>(base?: I): SimpleWithMap_LongLookupEntry {
    return SimpleWithMap_LongLookupEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMap_LongLookupEntry>, I>>(
    object: I,
  ): SimpleWithMap_LongLookupEntry {
    const message = Object.create(createBaseSimpleWithMap_LongLookupEntry()) as SimpleWithMap_LongLookupEntry;
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithSnakeCaseMap()) as SimpleWithSnakeCaseMap;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = SimpleWithSnakeCaseMap_EntitiesByIdEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.entitiesById[entry1.key] = entry1.value;
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

  fromJSON(object: any): SimpleWithSnakeCaseMap {
    return {
      entitiesById: isObject(object.entitiesById)
        ? Object.entries(object.entitiesById).reduce<{ [key: number]: Entity }>((acc, [key, value]) => {
          acc[Number(key)] = Entity.fromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: SimpleWithSnakeCaseMap): unknown {
    const obj: any = {};
    if (message.entitiesById) {
      const entries = Object.entries(message.entitiesById);
      if (entries.length > 0) {
        obj.entitiesById = {};
        entries.forEach(([k, v]) => {
          obj.entitiesById[k] = Entity.toJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithSnakeCaseMap>, I>>(base?: I): SimpleWithSnakeCaseMap {
    return SimpleWithSnakeCaseMap.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithSnakeCaseMap>, I>>(object: I): SimpleWithSnakeCaseMap {
    const message = Object.create(createBaseSimpleWithSnakeCaseMap()) as SimpleWithSnakeCaseMap;
    message.entitiesById = Object.entries(object.entitiesById ?? {}).reduce<{ [key: number]: Entity }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = Entity.fromPartial(value);
        }
        return acc;
      },
      {},
    );
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(
      createBaseSimpleWithSnakeCaseMap_EntitiesByIdEntry(),
    ) as SimpleWithSnakeCaseMap_EntitiesByIdEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = reader.int32();
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

  fromJSON(object: any): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? Entity.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: SimpleWithSnakeCaseMap_EntitiesByIdEntry): unknown {
    const obj: any = {};
    if (message.key !== 0) {
      obj.key = Math.round(message.key);
    }
    if (message.value !== undefined) {
      obj.value = message.value ? Entity.toJSON(message.value) : undefined;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithSnakeCaseMap_EntitiesByIdEntry>, I>>(
    base?: I,
  ): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    return SimpleWithSnakeCaseMap_EntitiesByIdEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithSnakeCaseMap_EntitiesByIdEntry>, I>>(
    object: I,
  ): SimpleWithSnakeCaseMap_EntitiesByIdEntry {
    const message = Object.create(
      createBaseSimpleWithSnakeCaseMap_EntitiesByIdEntry(),
    ) as SimpleWithSnakeCaseMap_EntitiesByIdEntry;
    message.key = object.key ?? 0;
    message.value = (object.value !== undefined && object.value !== null)
      ? Entity.fromPartial(object.value)
      : undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleWithMapOfEnums()) as SimpleWithMapOfEnums;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          const entry1 = SimpleWithMapOfEnums_EnumsByIdEntry.decode(reader, reader.uint32());
          if (entry1.value !== undefined) {
            message.enumsById[entry1.key] = entry1.value;
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

  fromJSON(object: any): SimpleWithMapOfEnums {
    return {
      enumsById: isObject(object.enumsById)
        ? Object.entries(object.enumsById).reduce<{ [key: number]: StateEnum }>((acc, [key, value]) => {
          acc[Number(key)] = stateEnumFromJSON(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: SimpleWithMapOfEnums): unknown {
    const obj: any = {};
    if (message.enumsById) {
      const entries = Object.entries(message.enumsById);
      if (entries.length > 0) {
        obj.enumsById = {};
        entries.forEach(([k, v]) => {
          obj.enumsById[k] = stateEnumToJSON(v);
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMapOfEnums>, I>>(base?: I): SimpleWithMapOfEnums {
    return SimpleWithMapOfEnums.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMapOfEnums>, I>>(object: I): SimpleWithMapOfEnums {
    const message = Object.create(createBaseSimpleWithMapOfEnums()) as SimpleWithMapOfEnums;
    message.enumsById = Object.entries(object.enumsById ?? {}).reduce<{ [key: number]: StateEnum }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[Number(key)] = value as StateEnum;
        }
        return acc;
      },
      {},
    );
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(
      createBaseSimpleWithMapOfEnums_EnumsByIdEntry(),
    ) as SimpleWithMapOfEnums_EnumsByIdEntry;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.key = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.value = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleWithMapOfEnums_EnumsByIdEntry {
    return {
      key: isSet(object.key) ? Number(object.key) : 0,
      value: isSet(object.value) ? stateEnumFromJSON(object.value) : 0,
    };
  },

  toJSON(message: SimpleWithMapOfEnums_EnumsByIdEntry): unknown {
    const obj: any = {};
    if (message.key !== 0) {
      obj.key = Math.round(message.key);
    }
    if (message.value !== 0) {
      obj.value = stateEnumToJSON(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleWithMapOfEnums_EnumsByIdEntry>, I>>(
    base?: I,
  ): SimpleWithMapOfEnums_EnumsByIdEntry {
    return SimpleWithMapOfEnums_EnumsByIdEntry.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleWithMapOfEnums_EnumsByIdEntry>, I>>(
    object: I,
  ): SimpleWithMapOfEnums_EnumsByIdEntry {
    const message = Object.create(
      createBaseSimpleWithMapOfEnums_EnumsByIdEntry(),
    ) as SimpleWithMapOfEnums_EnumsByIdEntry;
    message.key = object.key ?? 0;
    message.value = object.value ?? 0;
    return message;
  },
};

function createBasePingRequest(): PingRequest {
  return { input: "" };
}

export const PingRequest = {
  encode(message: PingRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.input !== "") {
      writer.uint32(10).string(message.input);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBasePingRequest()) as PingRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.input = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PingRequest {
    return { input: isSet(object.input) ? String(object.input) : "" };
  },

  toJSON(message: PingRequest): unknown {
    const obj: any = {};
    if (message.input !== "") {
      obj.input = message.input;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PingRequest>, I>>(base?: I): PingRequest {
    return PingRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PingRequest>, I>>(object: I): PingRequest {
    const message = Object.create(createBasePingRequest()) as PingRequest;
    message.input = object.input ?? "";
    return message;
  },
};

function createBasePingResponse(): PingResponse {
  return { output: "" };
}

export const PingResponse = {
  encode(message: PingResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.output !== "") {
      writer.uint32(10).string(message.output);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PingResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBasePingResponse()) as PingResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.output = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): PingResponse {
    return { output: isSet(object.output) ? String(object.output) : "" };
  },

  toJSON(message: PingResponse): unknown {
    const obj: any = {};
    if (message.output !== "") {
      obj.output = message.output;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<PingResponse>, I>>(base?: I): PingResponse {
    return PingResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<PingResponse>, I>>(object: I): PingResponse {
    const message = Object.create(createBasePingResponse()) as PingResponse;
    message.output = object.output ?? "";
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseNumbers()) as Numbers;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 9) {
            break;
          }

          message.double = reader.double();
          continue;
        case 2:
          if (tag !== 21) {
            break;
          }

          message.float = reader.float();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.int32 = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.int64 = longToNumber(reader.int64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.uint32 = reader.uint32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.uint64 = longToNumber(reader.uint64() as Long);
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.sint32 = reader.sint32();
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.sint64 = longToNumber(reader.sint64() as Long);
          continue;
        case 9:
          if (tag !== 77) {
            break;
          }

          message.fixed32 = reader.fixed32();
          continue;
        case 10:
          if (tag !== 81) {
            break;
          }

          message.fixed64 = longToNumber(reader.fixed64() as Long);
          continue;
        case 11:
          if (tag !== 93) {
            break;
          }

          message.sfixed32 = reader.sfixed32();
          continue;
        case 12:
          if (tag !== 97) {
            break;
          }

          message.sfixed64 = longToNumber(reader.sfixed64() as Long);
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Numbers {
    return {
      double: isSet(object.double) ? Number(object.double) : 0,
      float: isSet(object.float) ? Number(object.float) : 0,
      int32: isSet(object.int32) ? Number(object.int32) : 0,
      int64: isSet(object.int64) ? Number(object.int64) : 0,
      uint32: isSet(object.uint32) ? Number(object.uint32) : 0,
      uint64: isSet(object.uint64) ? Number(object.uint64) : 0,
      sint32: isSet(object.sint32) ? Number(object.sint32) : 0,
      sint64: isSet(object.sint64) ? Number(object.sint64) : 0,
      fixed32: isSet(object.fixed32) ? Number(object.fixed32) : 0,
      fixed64: isSet(object.fixed64) ? Number(object.fixed64) : 0,
      sfixed32: isSet(object.sfixed32) ? Number(object.sfixed32) : 0,
      sfixed64: isSet(object.sfixed64) ? Number(object.sfixed64) : 0,
    };
  },

  toJSON(message: Numbers): unknown {
    const obj: any = {};
    if (message.double !== 0) {
      obj.double = message.double;
    }
    if (message.float !== 0) {
      obj.float = message.float;
    }
    if (message.int32 !== 0) {
      obj.int32 = Math.round(message.int32);
    }
    if (message.int64 !== 0) {
      obj.int64 = Math.round(message.int64);
    }
    if (message.uint32 !== 0) {
      obj.uint32 = Math.round(message.uint32);
    }
    if (message.uint64 !== 0) {
      obj.uint64 = Math.round(message.uint64);
    }
    if (message.sint32 !== 0) {
      obj.sint32 = Math.round(message.sint32);
    }
    if (message.sint64 !== 0) {
      obj.sint64 = Math.round(message.sint64);
    }
    if (message.fixed32 !== 0) {
      obj.fixed32 = Math.round(message.fixed32);
    }
    if (message.fixed64 !== 0) {
      obj.fixed64 = Math.round(message.fixed64);
    }
    if (message.sfixed32 !== 0) {
      obj.sfixed32 = Math.round(message.sfixed32);
    }
    if (message.sfixed64 !== 0) {
      obj.sfixed64 = Math.round(message.sfixed64);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Numbers>, I>>(base?: I): Numbers {
    return Numbers.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Numbers>, I>>(object: I): Numbers {
    const message = Object.create(createBaseNumbers()) as Numbers;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseSimpleButOptional()) as SimpleButOptional;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.age = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.child = Child.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.state = reader.int32() as any;
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.thing = ImportedThing.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.birthday = DateMessage.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): SimpleButOptional {
    return {
      name: isSet(object.name) ? String(object.name) : undefined,
      age: isSet(object.age) ? Number(object.age) : undefined,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      child: isSet(object.child) ? Child.fromJSON(object.child) : undefined,
      state: isSet(object.state) ? stateEnumFromJSON(object.state) : undefined,
      thing: isSet(object.thing) ? ImportedThing.fromJSON(object.thing) : undefined,
      birthday: isSet(object.birthday) ? DateMessage.fromJSON(object.birthday) : undefined,
    };
  },

  toJSON(message: SimpleButOptional): unknown {
    const obj: any = {};
    if (message.name !== undefined) {
      obj.name = message.name;
    }
    if (message.age !== undefined) {
      obj.age = Math.round(message.age);
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message.child !== undefined) {
      obj.child = message.child ? Child.toJSON(message.child) : undefined;
    }
    if (message.state !== undefined) {
      obj.state = message.state !== undefined ? stateEnumToJSON(message.state) : undefined;
    }
    if (message.thing !== undefined) {
      obj.thing = message.thing ? ImportedThing.toJSON(message.thing) : undefined;
    }
    if (message.birthday !== undefined) {
      obj.birthday = message.birthday ? DateMessage.toJSON(message.birthday) : undefined;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<SimpleButOptional>, I>>(base?: I): SimpleButOptional {
    return SimpleButOptional.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<SimpleButOptional>, I>>(object: I): SimpleButOptional {
    const message = Object.create(createBaseSimpleButOptional()) as SimpleButOptional;
    message.name = object.name ?? undefined;
    message.age = object.age ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message.child = (object.child !== undefined && object.child !== null) ? Child.fromPartial(object.child) : undefined;
    message.state = object.state ?? undefined;
    message.thing = (object.thing !== undefined && object.thing !== null)
      ? ImportedThing.fromPartial(object.thing)
      : undefined;
    message.birthday = (object.birthday !== undefined && object.birthday !== null)
      ? DateMessage.fromPartial(object.birthday)
      : undefined;
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(createBaseEmpty()) as Empty;
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

  fromJSON(_: any): Empty {
    return {};
  },

  toJSON(_: Empty): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<Empty>, I>>(base?: I): Empty {
    return Empty.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Empty>, I>>(_: I): Empty {
    const message = Object.create(createBaseEmpty()) as Empty;
    return message;
  },
};

export interface PingService {
  ping(request: PingRequest): Promise<PingResponse>;
}

export const PingServiceServiceName = "simple.PingService";
export class PingServiceClientImpl implements PingService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || PingServiceServiceName;
    this.rpc = rpc;
    this.ping = this.ping.bind(this);
  }
  ping(request: PingRequest): Promise<PingResponse> {
    const data = PingRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ping", data);
    return promise.then((data) => PingResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare const self: any | undefined;
declare const window: any | undefined;
declare const global: any | undefined;
const tsProtoGlobalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (tsProtoGlobalThis.Buffer) {
    return Uint8Array.from(tsProtoGlobalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = tsProtoGlobalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (tsProtoGlobalThis.Buffer) {
    return tsProtoGlobalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return tsProtoGlobalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new tsProtoGlobalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
