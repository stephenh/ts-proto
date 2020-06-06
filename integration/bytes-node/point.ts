import { Writer, Reader } from 'protobufjs/minimal';


export interface Point {
  data: Buffer;
}

const basePoint: object = {
  data: undefined,
};

export const Point = {
  encode(message: Point, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).bytes(message.data);
    return writer;
  },
  decode(input: Uint8Array | Reader, length?: number): Point {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(basePoint) as Point;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.data = reader.bytes() as Buffer;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Point {
    const message = Object.create(basePoint) as Point;
    if (object.data !== undefined && object.data !== null) {
      message.data = Buffer.from(bytesFromBase64(object.data));
    }
    return message;
  },
  fromPartial(object: DeepPartial<Point>): Point {
    const message = Object.create(basePoint) as Point;
    if (object.data !== undefined && object.data !== null) {
      message.data = object.data;
    }
    return message;
  },
  toJSON(message: Point): unknown {
    const obj: any = {};
    obj.data = message.data !== undefined ? base64FromBytes(message.data) : undefined;
    return obj;
  },
};

interface WindowBase64 {
  atob(b64: string): string;
  btoa(bin: string): string;
}

const windowBase64 = (globalThis as unknown as WindowBase64);
const atob = windowBase64.atob || ((b64: string) => Buffer.from(b64, 'base64').toString('binary'));
const btoa = windowBase64.btoa || ((bin: string) => Buffer.from(bin, 'binary').toString('base64'));

function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(''));
}
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