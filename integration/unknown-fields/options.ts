/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export enum MyEnum {
  FOO = 0,
  BAR = 1,
  UNRECOGNIZED = -1,
}

export interface MyMessage {
  foo?: number | undefined;
  foo2?: number | undefined;
  bar?: string | undefined;
  quux?: string | undefined;
  _unknownFields?: { [key: number]: Uint8Array[] };
}

export interface RequestType {
  _unknownFields?: { [key: number]: Uint8Array[] };
}

export interface ResponseType {
  _unknownFields?: { [key: number]: Uint8Array[] };
}

function createBaseMyMessage(): MyMessage {
  return { foo: undefined, foo2: undefined, bar: undefined, quux: undefined, _unknownFields: {} };
}

export const MyMessage = {
  encode(message: MyMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.foo !== undefined) {
      writer.uint32(8).int32(message.foo);
    }
    if (message.foo2 !== undefined) {
      writer.uint32(16).int32(message.foo2);
    }
    if (message.bar !== undefined) {
      writer.uint32(26).string(message.bar);
    }
    if (message.quux !== undefined) {
      writer.uint32(34).string(message.quux);
    }
    if (message._unknownFields !== undefined) {
      for (const key in message._unknownFields) {
        const values = message._unknownFields[key];
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MyMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMyMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.foo = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.foo2 = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bar = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.quux = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseRequestType(): RequestType {
  return { _unknownFields: {} };
}

export const RequestType = {
  encode(message: RequestType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message._unknownFields !== undefined) {
      for (const key in message._unknownFields) {
        const values = message._unknownFields[key];
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RequestType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseResponseType(): ResponseType {
  return { _unknownFields: {} };
}

export const ResponseType = {
  encode(message: ResponseType, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message._unknownFields !== undefined) {
      for (const key in message._unknownFields) {
        const values = message._unknownFields[key];
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ResponseType {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseResponseType();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

export interface MyService {
  MyMethod(request: RequestType): Promise<ResponseType>;
}

export const MyServiceServiceName = "MyService";
export class MyServiceClientImpl implements MyService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MyServiceServiceName;
    this.rpc = rpc;
    this.MyMethod = this.MyMethod.bind(this);
  }
  MyMethod(request: RequestType): Promise<ResponseType> {
    const data = RequestType.encode(request).finish();
    const promise = this.rpc.request(this.service, "MyMethod", data);
    return promise.then((data) => ResponseType.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
