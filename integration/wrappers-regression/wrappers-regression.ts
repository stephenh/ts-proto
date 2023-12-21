/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Empty } from "./google/protobuf/empty";
import { Timestamp } from "./google/protobuf/timestamp";
import { BoolValue, StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "";

export interface Clock {
  Now(request: Empty): Promise<Timestamp>;
  NowString(request: string | undefined): Promise<StringValue>;
  NowStringStream(request: Observable<StringValue>): Observable<StringValue>;
  NowBool(request: Empty): Promise<BoolValue>;
}

export const ClockServiceName = "Clock";
export class ClockClientImpl implements Clock {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || ClockServiceName;
    this.rpc = rpc;
    this.Now = this.Now.bind(this);
    this.NowString = this.NowString.bind(this);
    this.NowStringStream = this.NowStringStream.bind(this);
    this.NowBool = this.NowBool.bind(this);
  }
  Now(request: Empty): Promise<Timestamp> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(this.service, "Now", data);
    return promise.then((data) => Timestamp.decode(_m0.Reader.create(data)));
  }

  NowString(request: string | undefined): Promise<StringValue> {
    const data = StringValue.encode({ value: request }).finish();
    const promise = this.rpc.request(this.service, "NowString", data);
    return promise.then((data) => StringValue.decode(_m0.Reader.create(data)));
  }

  NowStringStream(request: Observable<StringValue>): Observable<StringValue> {
    const data = request.pipe(map((request) => StringValue.encode({ value: request }).finish()));
    const result = this.rpc.bidirectionalStreamingRequest(this.service, "NowStringStream", data);
    return result.pipe(map((data) => StringValue.decode(_m0.Reader.create(data))));
  }

  NowBool(request: Empty): Promise<BoolValue> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(this.service, "NowBool", data);
    return promise.then((data) => BoolValue.decode(_m0.Reader.create(data)));
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
      requestType: StringValue,
      requestStream: false,
      responseType: StringValue,
      responseStream: false,
      options: {},
    },
    nowStringStream: {
      name: "NowStringStream",
      requestType: StringValue,
      requestStream: true,
      responseType: StringValue,
      responseStream: true,
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
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
}
