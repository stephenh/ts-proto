import { Job } from './a/a';
import { Job } from './b/b';
import { Writer, Reader } from 'protobufjs/minimal';


export interface AJob {
  job: Job | undefined;
}

export interface BJob {
  job: Job | undefined;
}

const baseAJob: object = {
};

const baseBJob: object = {
};

export const AJob = {
  encode(message: AJob, writer: Writer = Writer.create()): Writer {
    if (message.job !== undefined && message.job !== undefined) {
      Job.encode(message.job, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): AJob {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAJob } as AJob;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.job = Job.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): AJob {
    const message = { ...baseAJob } as AJob;
    if (object.job !== undefined && object.job !== null) {
      message.job = Job.fromJSON(object.job);
    } else {
      message.job = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<AJob>): AJob {
    const message = { ...baseAJob } as AJob;
    if (object.job !== undefined && object.job !== null) {
      message.job = Job.fromPartial(object.job);
    } else {
      message.job = undefined;
    }
    return message;
  },
  toJSON(message: AJob): unknown {
    const obj: any = {};
    message.job !== undefined && (obj.job = message.job ? Job.toJSON(message.job) : undefined);
    return obj;
  },
};

export const BJob = {
  encode(message: BJob, writer: Writer = Writer.create()): Writer {
    if (message.job !== undefined && message.job !== undefined) {
      Job.encode(message.job, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): BJob {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseBJob } as BJob;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.job = Job.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BJob {
    const message = { ...baseBJob } as BJob;
    if (object.job !== undefined && object.job !== null) {
      message.job = Job.fromJSON(object.job);
    } else {
      message.job = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<BJob>): BJob {
    const message = { ...baseBJob } as BJob;
    if (object.job !== undefined && object.job !== null) {
      message.job = Job.fromPartial(object.job);
    } else {
      message.job = undefined;
    }
    return message;
  },
  toJSON(message: BJob): unknown {
    const obj: any = {};
    message.job !== undefined && (obj.job = message.job ? Job.toJSON(message.job) : undefined);
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