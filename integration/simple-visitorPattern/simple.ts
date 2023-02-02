/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "simple";

export interface PBVisitable {
  accept(visitor: Visitor): void;
}

export interface Simple extends PBVisitable {
  /** Name field */
  name: string;
  /** Age field */
  age: number;
  child: Child[];
  testField: string;
  testSecondField: string;
}

export interface Child extends PBVisitable {
  name: string;
  child: Child[];
}

function createBaseSimple(): Simple {
  return {
    accept(visitor: Visitor) {
      visitor.visitSimple(this);
    },
    name: "",
    age: 0,
    child: [],
    testField: "",
    testSecondField: "",
  };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== 0) {
      writer.uint32(16).int32(message.age);
    }
    for (const v of message.child) {
      Child.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    if (message.testField !== "") {
      writer.uint32(34).string(message.testField);
    }
    if (message.testSecondField !== "") {
      writer.uint32(42).string(message.testSecondField);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.age = reader.int32();
          break;
        case 3:
          message.child.push(Child.decode(reader, reader.uint32()));
          break;
        case 4:
          message.testField = reader.string();
          break;
        case 5:
          message.testSecondField = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Simple {
    return {
      accept(visitor: Visitor) {
        visitor.visitSimple(this);
      },
      name: isSet(object.name) ? String(object.name) : "",
      age: isSet(object.age) ? Number(object.age) : 0,
      child: Array.isArray(object?.child) ? object.child.map((e: any) => Child.fromJSON(e)) : [],
      testField: isSet(object.testField) ? String(object.testField) : "",
      testSecondField: isSet(object.testSecondField) ? String(object.testSecondField) : "",
    };
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.age !== undefined && (obj.age = Math.round(message.age));
    if (message.child) {
      obj.child = message.child.map((e) => e ? Child.toJSON(e) : undefined);
    } else {
      obj.child = [];
    }
    message.testField !== undefined && (obj.testField = message.testField);
    message.testSecondField !== undefined && (obj.testSecondField = message.testSecondField);
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple>, I>>(base?: I): Simple {
    return Simple.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? "";
    message.age = object.age ?? 0;
    message.child = object.child?.map((e) => Child.fromPartial(e)) || [];
    message.testField = object.testField ?? "";
    message.testSecondField = object.testSecondField ?? "";
    return message;
  },
};

function createBaseChild(): Child {
  return {
    accept(visitor: Visitor) {
      visitor.visitChild(this);
    },
    name: "",
    child: [],
  };
}

export const Child = {
  encode(message: Child, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.child) {
      Child.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Child {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.child.push(Child.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Child {
    return {
      accept(visitor: Visitor) {
        visitor.visitChild(this);
      },
      name: isSet(object.name) ? String(object.name) : "",
      child: Array.isArray(object?.child) ? object.child.map((e: any) => Child.fromJSON(e)) : [],
    };
  },

  toJSON(message: Child): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    if (message.child) {
      obj.child = message.child.map((e) => e ? Child.toJSON(e) : undefined);
    } else {
      obj.child = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Child>, I>>(base?: I): Child {
    return Child.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<Child>, I>>(object: I): Child {
    const message = createBaseChild();
    message.name = object.name ?? "";
    message.child = object.child?.map((e) => Child.fromPartial(e)) || [];
    return message;
  },
};

export interface Visitor {
  visitSimple(obj: Simple): void;

  visitChild(obj: Child): void;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
