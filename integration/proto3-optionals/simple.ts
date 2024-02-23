/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "simple";

export interface Simple {
  name: string;
  age?:
    | number
    | undefined;
  /** @deprecated */
  oldAddress?: Simple_OldAddress | undefined;
  newAddress?: Simple_NewAddress | undefined;
  email?: string | undefined;
  hasLoggedInRecently?: boolean | undefined;
  profilePic?: Uint8Array | undefined;
  luckyNumbers: number[];
  properties: { [key: string]: string };
}

export interface Simple_OldAddress {
  street?: string | undefined;
  city: string;
}

export interface Simple_NewAddress {
  street: string;
  city: string;
  country: string;
}

export interface Simple_PropertiesEntry {
  key: string;
  value: string;
}

function createBaseSimple(): Simple {
  return {
    name: "",
    age: undefined,
    oldAddress: undefined,
    newAddress: undefined,
    email: undefined,
    hasLoggedInRecently: undefined,
    profilePic: undefined,
    luckyNumbers: [],
    properties: {},
  };
}

export const Simple = {
  encode(message: Simple, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.age !== undefined) {
      writer.uint32(16).int32(message.age);
    }
    if (message.oldAddress !== undefined) {
      Simple_OldAddress.encode(message.oldAddress, writer.uint32(34).fork()).ldelim();
    }
    if (message.newAddress !== undefined) {
      Simple_NewAddress.encode(message.newAddress, writer.uint32(42).fork()).ldelim();
    }
    if (message.email !== undefined) {
      writer.uint32(50).string(message.email);
    }
    if (message.hasLoggedInRecently !== undefined) {
      writer.uint32(56).bool(message.hasLoggedInRecently);
    }
    if (message.profilePic !== undefined) {
      writer.uint32(66).bytes(message.profilePic);
    }
    writer.uint32(74).fork();
    for (const v of message.luckyNumbers) {
      writer.int32(v);
    }
    writer.ldelim();
    Object.entries(message.properties).forEach(([key, value]) => {
      Simple_PropertiesEntry.encode({ key: key as any, value }, writer.uint32(82).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.age = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.oldAddress = Simple_OldAddress.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.newAddress = Simple_NewAddress.decode(reader, reader.uint32());
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.email = reader.string();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.hasLoggedInRecently = reader.bool();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.profilePic = reader.bytes();
          continue;
        case 9:
          if (tag === 72) {
            message.luckyNumbers.push(reader.int32());

            continue;
          }

          if (tag === 74) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.luckyNumbers.push(reader.int32());
            }

            continue;
          }

          break;
        case 10:
          if (tag !== 82) {
            break;
          }

          const entry10 = Simple_PropertiesEntry.decode(reader, reader.uint32());
          if (entry10.value !== undefined) {
            message.properties[entry10.key] = entry10.value;
          }
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Simple {
    return {
      name: isSet(object.name) ? globalThis.String(object.name) : "",
      age: isSet(object.age) ? globalThis.Number(object.age) : undefined,
      oldAddress: isSet(object.oldAddress) ? Simple_OldAddress.fromJSON(object.oldAddress) : undefined,
      newAddress: isSet(object.newAddress) ? Simple_NewAddress.fromJSON(object.newAddress) : undefined,
      email: isSet(object.email) ? globalThis.String(object.email) : undefined,
      hasLoggedInRecently: isSet(object.hasLoggedInRecently)
        ? globalThis.Boolean(object.hasLoggedInRecently)
        : undefined,
      profilePic: isSet(object.profilePic) ? bytesFromBase64(object.profilePic) : undefined,
      luckyNumbers: globalThis.Array.isArray(object?.luckyNumbers)
        ? object.luckyNumbers.map((e: any) => globalThis.Number(e))
        : [],
      properties: isObject(object.properties)
        ? Object.entries(object.properties).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: Simple): unknown {
    const obj: any = {};
    if (message.name !== "") {
      obj.name = message.name;
    }
    if (message.age !== undefined) {
      obj.age = Math.round(message.age);
    }
    if (message.oldAddress !== undefined) {
      obj.oldAddress = Simple_OldAddress.toJSON(message.oldAddress);
    }
    if (message.newAddress !== undefined) {
      obj.newAddress = Simple_NewAddress.toJSON(message.newAddress);
    }
    if (message.email !== undefined) {
      obj.email = message.email;
    }
    if (message.hasLoggedInRecently !== undefined) {
      obj.hasLoggedInRecently = message.hasLoggedInRecently;
    }
    if (message.profilePic !== undefined) {
      obj.profilePic = base64FromBytes(message.profilePic);
    }
    if (message.luckyNumbers?.length) {
      obj.luckyNumbers = message.luckyNumbers.map((e) => Math.round(e));
    }
    if (message.properties) {
      const entries = Object.entries(message.properties);
      if (entries.length > 0) {
        obj.properties = {};
        entries.forEach(([k, v]) => {
          obj.properties[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple>, I>>(base?: I): Simple {
    return Simple.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Simple>, I>>(object: I): Simple {
    const message = createBaseSimple();
    message.name = object.name ?? "";
    message.age = object.age ?? undefined;
    message.oldAddress = (object.oldAddress !== undefined && object.oldAddress !== null)
      ? Simple_OldAddress.fromPartial(object.oldAddress)
      : undefined;
    message.newAddress = (object.newAddress !== undefined && object.newAddress !== null)
      ? Simple_NewAddress.fromPartial(object.newAddress)
      : undefined;
    message.email = object.email ?? undefined;
    message.hasLoggedInRecently = object.hasLoggedInRecently ?? undefined;
    message.profilePic = object.profilePic ?? undefined;
    message.luckyNumbers = object.luckyNumbers?.map((e) => e) || [];
    message.properties = Object.entries(object.properties ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.String(value);
        }
        return acc;
      },
      {},
    );
    return message;
  },
};

function createBaseSimple_OldAddress(): Simple_OldAddress {
  return { street: undefined, city: "" };
}

export const Simple_OldAddress = {
  encode(message: Simple_OldAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.street !== undefined) {
      writer.uint32(10).string(message.street);
    }
    if (message.city !== "") {
      writer.uint32(18).string(message.city);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple_OldAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple_OldAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.street = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.city = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Simple_OldAddress {
    return {
      street: isSet(object.street) ? globalThis.String(object.street) : undefined,
      city: isSet(object.city) ? globalThis.String(object.city) : "",
    };
  },

  toJSON(message: Simple_OldAddress): unknown {
    const obj: any = {};
    if (message.street !== undefined) {
      obj.street = message.street;
    }
    if (message.city !== "") {
      obj.city = message.city;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple_OldAddress>, I>>(base?: I): Simple_OldAddress {
    return Simple_OldAddress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Simple_OldAddress>, I>>(object: I): Simple_OldAddress {
    const message = createBaseSimple_OldAddress();
    message.street = object.street ?? undefined;
    message.city = object.city ?? "";
    return message;
  },
};

function createBaseSimple_NewAddress(): Simple_NewAddress {
  return { street: "", city: "", country: "" };
}

export const Simple_NewAddress = {
  encode(message: Simple_NewAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.street !== "") {
      writer.uint32(10).string(message.street);
    }
    if (message.city !== "") {
      writer.uint32(18).string(message.city);
    }
    if (message.country !== "") {
      writer.uint32(26).string(message.country);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple_NewAddress {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple_NewAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.street = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.city = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.country = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Simple_NewAddress {
    return {
      street: isSet(object.street) ? globalThis.String(object.street) : "",
      city: isSet(object.city) ? globalThis.String(object.city) : "",
      country: isSet(object.country) ? globalThis.String(object.country) : "",
    };
  },

  toJSON(message: Simple_NewAddress): unknown {
    const obj: any = {};
    if (message.street !== "") {
      obj.street = message.street;
    }
    if (message.city !== "") {
      obj.city = message.city;
    }
    if (message.country !== "") {
      obj.country = message.country;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple_NewAddress>, I>>(base?: I): Simple_NewAddress {
    return Simple_NewAddress.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Simple_NewAddress>, I>>(object: I): Simple_NewAddress {
    const message = createBaseSimple_NewAddress();
    message.street = object.street ?? "";
    message.city = object.city ?? "";
    message.country = object.country ?? "";
    return message;
  },
};

function createBaseSimple_PropertiesEntry(): Simple_PropertiesEntry {
  return { key: "", value: "" };
}

export const Simple_PropertiesEntry = {
  encode(message: Simple_PropertiesEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Simple_PropertiesEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSimple_PropertiesEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Simple_PropertiesEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: Simple_PropertiesEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Simple_PropertiesEntry>, I>>(base?: I): Simple_PropertiesEntry {
    return Simple_PropertiesEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Simple_PropertiesEntry>, I>>(object: I): Simple_PropertiesEntry {
    const message = createBaseSimple_PropertiesEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  if ((globalThis as any).Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if ((globalThis as any).Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(globalThis.String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
