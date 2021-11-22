/* eslint-disable */
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';
import { Struct } from './google/protobuf/struct';

export const protobufPackage = '';

export interface StructMessage {
  value: { [key: string]: any } | undefined;
}

const baseStructMessage: object = {};

export const StructMessage = {
  encode(message: StructMessage, writer: Writer = Writer.create()): Writer {
    if (message.value !== undefined) {
      Struct.encode(wrapStruct(message.value), writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): StructMessage {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseStructMessage } as StructMessage;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = unwrapStruct(Struct.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): StructMessage {
    const message = { ...baseStructMessage } as StructMessage;
    message.value = typeof object.value === 'object' ? object.value : undefined;
    return message;
  },

  toJSON(message: StructMessage): unknown {
    const obj: any = {};
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial(object: DeepPartial<StructMessage>): StructMessage {
    const message = { ...baseStructMessage } as StructMessage;
    message.value = object.value ?? undefined;
    return message;
  },
};

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

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}

function wrapStruct(object: { [key: string]: any }): Struct {
  const struct = Struct.fromPartial({});
  Object.keys(object).forEach((key) => {
    struct.fields[key] = object[key];
  });
  return struct;
}

function unwrapStruct(struct: Struct): { [key: string]: any } {
  const object: { [key: string]: any } = {};
  Object.keys(struct.fields).forEach((key) => {
    object[key] = struct.fields[key];
  });
  return object;
}
