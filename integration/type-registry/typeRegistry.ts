/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';

export interface MessageType<Message> {
  encode(message: Message, writer?: Writer): Writer;
  decode(input: Reader | Uint8Array, length?: number): Message;
  fromJSON(object: any): Message;
  toJSON(message: Message): unknown;
  fromPartial(object: DeepPartial<Message>): Message;
}

export const messageTypeRegistry = new Map<string, MessageType<unknown>>();

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
