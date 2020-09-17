import { Job } from './aws/aws';
import { Job } from './gcp/gcp';
import { Writer, Reader } from 'protobufjs/minimal';


export interface Aws {
  swf: Job | undefined;
}

export interface Gcp {
  dag: Job | undefined;
}

const baseAws: object = {
};

const baseGcp: object = {
};

export const Aws = {
  encode(message: Aws, writer: Writer = Writer.create()): Writer {
    if (message.swf !== undefined && message.swf !== undefined) {
      Job.encode(message.swf, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Aws {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseAws } as Aws;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.swf = Job.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Aws {
    const message = { ...baseAws } as Aws;
    if (object.swf !== undefined && object.swf !== null) {
      message.swf = Job.fromJSON(object.swf);
    } else {
      message.swf = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Aws>): Aws {
    const message = { ...baseAws } as Aws;
    if (object.swf !== undefined && object.swf !== null) {
      message.swf = Job.fromPartial(object.swf);
    } else {
      message.swf = undefined;
    }
    return message;
  },
  toJSON(message: Aws): unknown {
    const obj: any = {};
    message.swf !== undefined && (obj.swf = message.swf ? Job.toJSON(message.swf) : undefined);
    return obj;
  },
};

export const Gcp = {
  encode(message: Gcp, writer: Writer = Writer.create()): Writer {
    if (message.dag !== undefined && message.dag !== undefined) {
      Job.encode(message.dag, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Gcp {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGcp } as Gcp;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.dag = Job.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Gcp {
    const message = { ...baseGcp } as Gcp;
    if (object.dag !== undefined && object.dag !== null) {
      message.dag = Job.fromJSON(object.dag);
    } else {
      message.dag = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Gcp>): Gcp {
    const message = { ...baseGcp } as Gcp;
    if (object.dag !== undefined && object.dag !== null) {
      message.dag = Job.fromPartial(object.dag);
    } else {
      message.dag = undefined;
    }
    return message;
  },
  toJSON(message: Gcp): unknown {
    const obj: any = {};
    message.dag !== undefined && (obj.dag = message.dag ? Job.toJSON(message.dag) : undefined);
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