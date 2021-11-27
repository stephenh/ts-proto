/* eslint-disable */
import { Writer, Reader } from 'protobufjs/minimal';

export interface MessageType<Message extends UnknownMessage = UnknownMessage> {
  $type: Message['$type'];
  encode(message: Message, writer?: Writer): Writer;
  decode(input: Reader | Uint8Array, length?: number): Message;
  fromJSON(object: any): Message;
  toJSON(message: Message): unknown;
  fromPartial(object: DeepPartial<Message>): Message;
}

export type UnknownMessage = { $type: string };

export const messageTypeRegistry = new Map<string, MessageType>();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in Exclude<keyof T, '$type'>]?: DeepPartial<T[K]> }
  : Partial<T>;
