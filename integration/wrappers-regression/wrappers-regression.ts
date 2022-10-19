/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Empty } from "./google/protobuf/empty";
import { Timestamp } from "./google/protobuf/timestamp";
import { BoolValue, StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "";

export interface Clock {
  Now(request: Empty): Promise<Date>;
  NowString(request: Empty): Promise<string | undefined>;
  NowBool(request: Empty): Promise<boolean | undefined>;
}

export class ClockClientImpl implements Clock {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "Clock";
    this.rpc = rpc;
    this.Now = this.Now.bind(this);
    this.NowString = this.NowString.bind(this);
    this.NowBool = this.NowBool.bind(this);
  }
  Now(request: Empty): Promise<Date> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(this.service, "Now", data);
    return promise.then((data) => fromTimestamp(Timestamp.decode(new _m0.Reader(data))));
  }

  NowString(request: Empty): Promise<string | undefined> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(this.service, "NowString", data);
    return promise.then((data) => string | undefined.decode(new _m0.Reader(data)));
  }

  NowBool(request: Empty): Promise<boolean | undefined> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(this.service, "NowBool", data);
    return promise.then((data) => boolean | undefined.decode(new _m0.Reader(data)));
  }
}

export type ClockDefinition = typeof ClockDefinition;
export const ClockDefinition = {
  name: "Clock",
  fullName: "Clock",
  methods: {
    now: {
      name: "Now",
      requestType: Empty,
      requestStream: false,
      responseType: Timestamp,
      responseStream: false,
      options: {},
    },
    nowString: {
      name: "NowString",
      requestType: Empty,
      requestStream: false,
      responseType: StringValue,
      responseStream: false,
      options: {},
    },
    nowBool: {
      name: "NowBool",
      requestType: Empty,
      requestStream: false,
      responseType: BoolValue,
      responseStream: false,
      options: {},
    },
  },
} as const;

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}
