import {Reader, Writer} from 'protobufjs';


const baseSimple: object = {
  name: "",
  age: 0,
  child: null,
  state: 0,
  grandchildren: null,
  coins: 0,
  snacks: "",
  oldStates: 0,
}
;

export function decodeSimple(reader: Reader, length?: number): Simple {
  let end = length === undefined ? reader.len : reader.pos + length;
  const message = Object.create(baseSimple) as Simple;
  message.grandchildren = [];
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
      case 3:
        message.child = decodeChild(reader, reader.uint32());
        break;
      case 4:
        message.state = reader.int32();
        break;
      case 5:
        message.grandchildren.push(decodeChild(reader, reader.uint32()));
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
}

export function encodeSimple(message: Simple, writer: Writer = new Writer()): Writer {
  writer.uint32(10).string(message.name);
  writer.uint32(16).int32(message.age);
  encodeChild(message.child, writer.uint32(26).fork()).ldelim();
  writer.uint32(32).int32(message.state);
  for (const v of message.grandchildren) {
    encodeChild(v, writer.uint32(42).fork()).ldelim();
  }
  writer.uint32(50).fork();
  for (const v of message.coins) {
    writer.int32(v);
  }
  writer.ldelim();
  for (const v of message.snacks) {
    writer.uint32(58).string(v);
  }
  writer.uint32(66).fork();
  for (const v of message.oldStates) {
    writer.int32(v);
  }
  writer.ldelim();
  return writer;
}

export interface Simple {
  name: string;
  age: number;
  child: Child;
  state: StateEnum;
  grandchildren: Array<Child>;
  coins: Array<number>;
  snacks: Array<string>;
  oldStates: Array<StateEnum>;
}

const baseChild: object = {
  name: "",
}
;

export function decodeChild(reader: Reader, length?: number): Child {
  let end = length === undefined ? reader.len : reader.pos + length;
  const message = Object.create(baseChild) as Child;
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
}

export function encodeChild(message: Child, writer: Writer = new Writer()): Writer {
  writer.uint32(10).string(message.name);
  return writer;
}

export interface Child {
  name: string;
}

const baseNested: object = {
  name: "",
  message: null,
  state: 0,
}
;

const baseNested_InnerMessage: object = {
  name: "",
  deep: null,
}
;

const baseNested_InnerMessage_DeepMessage: object = {
  name: "",
}
;

export function decodeNested_InnerMessage_DeepMessage(reader: Reader, length?: number): Nested_InnerMessage_DeepMessage {
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
}

export function encodeNested_InnerMessage_DeepMessage(message: Nested_InnerMessage_DeepMessage, writer: Writer = new Writer()): Writer {
  writer.uint32(10).string(message.name);
  return writer;
}

export interface Nested_InnerMessage_DeepMessage {
  name: string;
}

export function decodeNested_InnerMessage(reader: Reader, length?: number): Nested_InnerMessage {
  let end = length === undefined ? reader.len : reader.pos + length;
  const message = Object.create(baseNested_InnerMessage) as Nested_InnerMessage;
  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        message.name = reader.string();
        break;
      case 2:
        message.deep = decodeNested_InnerMessage_DeepMessage(reader, reader.uint32());
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }
  return message;
}

export function encodeNested_InnerMessage(message: Nested_InnerMessage, writer: Writer = new Writer()): Writer {
  writer.uint32(10).string(message.name);
  encodeNested_InnerMessage_DeepMessage(message.deep, writer.uint32(18).fork()).ldelim();
  return writer;
}

export interface Nested_InnerMessage {
  name: string;
  deep: Nested_InnerMessage_DeepMessage;
}

export function decodeNested(reader: Reader, length?: number): Nested {
  let end = length === undefined ? reader.len : reader.pos + length;
  const message = Object.create(baseNested) as Nested;
  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        message.name = reader.string();
        break;
      case 2:
        message.message = decodeNested_InnerMessage(reader, reader.uint32());
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
}

export function encodeNested(message: Nested, writer: Writer = new Writer()): Writer {
  writer.uint32(10).string(message.name);
  encodeNested_InnerMessage(message.message, writer.uint32(18).fork()).ldelim();
  writer.uint32(24).int32(message.state);
  return writer;
}

export interface Nested {
  name: string;
  message: Nested_InnerMessage;
  state: Nested_InnerEnum;
}

export enum Nested_InnerEnum {
  UNKNOWN_INNER = 0,
  GOOD = 100,
  BAD = 1000,
}

export enum StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
}
