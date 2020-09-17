import { Writer, Reader } from 'protobufjs/minimal';


export interface Job {
  id: number;
  state: Job_State;
}

const baseJob: object = {
  id: 0,
  state: 0,
};

export enum Job_State {
  PENDING = 0,
  STARTED = 1,
  EXITED = 2,
  UNRECOGNIZED = -1,
}

export function job_StateFromJSON(object: any): Job_State {
  switch (object) {
    case 0:
    case "PENDING":
      return Job_State.PENDING;
    case 1:
    case "STARTED":
      return Job_State.STARTED;
    case 2:
    case "EXITED":
      return Job_State.EXITED;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Job_State.UNRECOGNIZED;
  }
}

export function job_StateToJSON(object: Job_State): string {
  switch (object) {
    case Job_State.PENDING:
      return "PENDING";
    case Job_State.STARTED:
      return "STARTED";
    case Job_State.EXITED:
      return "EXITED";
    default:
      return "UNKNOWN";
  }
}

export const Job = {
  encode(message: Job, writer: Writer = Writer.create()): Writer {
    writer.uint32(8).int32(message.id);
    writer.uint32(16).int32(message.state);
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
          message.state = reader.int32() as any;
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
    if (object.state !== undefined && object.state !== null) {
      message.state = job_StateFromJSON(object.state);
    } else {
      message.state = 0;
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
    if (object.state !== undefined && object.state !== null) {
      message.state = object.state;
    } else {
      message.state = 0;
    }
    return message;
  },
  toJSON(message: Job): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = message.id);
    message.state !== undefined && (obj.state = job_StateToJSON(message.state));
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