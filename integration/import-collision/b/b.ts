import { Writer, Reader } from 'protobufjs/minimal';


export interface Job {
  id: number;
  exitCode: number;
}

const baseJob: object = {
  id: 0,
  exitCode: 0,
};

export const Job = {
  encode(message: Job, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.id);
    writer.uint32(16).int32(message.exitCode);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Job {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseJob } as Job;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.exitCode = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Job {
    const message = { ...baseJob } as Job;
    if (object.id !== undefined && object.id !== null) {
      message.id = Number(object.id);
    } else {
      message.id = 0;
    }
    if (object.exitCode !== undefined && object.exitCode !== null) {
      message.exitCode = Number(object.exitCode);
    } else {
      message.exitCode = 0;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Job>): Job {
    const message = { ...baseJob } as Job;
    if (object.id !== undefined && object.id !== null) {
      message.id = object.id;
    } else {
      message.id = 0;
    }
    if (object.exitCode !== undefined && object.exitCode !== null) {
      message.exitCode = object.exitCode;
    } else {
      message.exitCode = 0;
    }
    return message;
  },
  toJSON(message: Job): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.exitCode !== undefined && (obj.exitCode = message.exitCode);
    return obj;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | undefined;
type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;