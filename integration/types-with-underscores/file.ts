import { Writer, Reader } from 'protobufjs/minimal';


export interface Baz {
  foo: FooBar | undefined;
}

export interface FooBar {
}

const baseBaz: object = {
};

const baseFooBar: object = {
};

export const Baz = {
  encode(message: Baz, writer: Writer = Writer.create()): Writer {
    if (message.foo !== undefined && message.foo !== undefined) {
      FooBar.encode(message.foo, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },
  decode(reader: Reader, length?: number): Baz {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseBaz) as Baz;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.foo = FooBar.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): Baz {
    const message = Object.create(baseBaz) as Baz;
    if (object.foo !== undefined && object.foo !== null) {
      message.foo = FooBar.fromJSON(object.foo);
    } else {
      message.foo = undefined;
    }
    return message;
  },
  fromPartial(object: DeepPartial<Baz>): Baz {
    const message = Object.create(baseBaz) as Baz;
    if (object.foo !== undefined && object.foo !== null) {
      message.foo = FooBar.fromPartial(object.foo);
    } else {
      message.foo = undefined;
    }
    return message;
  },
  toJSON(message: Baz): unknown {
    const obj: any = {};
    obj.foo = message.foo ? FooBar.toJSON(message.foo) : undefined;
    return obj;
  },
};

export const FooBar = {
  encode(message: FooBar, writer: Writer = Writer.create()): Writer {
    return writer;
  },
  decode(reader: Reader, length?: number): FooBar {
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = Object.create(baseFooBar) as FooBar;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): FooBar {
    const message = Object.create(baseFooBar) as FooBar;
    return message;
  },
  fromPartial(object: DeepPartial<FooBar>): FooBar {
    const message = Object.create(baseFooBar) as FooBar;
    return message;
  },
  toJSON(message: FooBar): unknown {
    const obj: any = {};
    return obj;
  },
};

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T[P] extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T[P] extends Date | Function | Uint8Array | undefined
  ? T[P]
  : T[P] extends infer U | undefined
  ? DeepPartial<U>
  : T[P] extends object
  ? DeepPartial<T[P]>
  : T[P]
};