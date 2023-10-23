/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface TPartialMessage {
  field?: string | undefined;
}

export interface TPartial {
  number?: number | undefined;
  string?: string | undefined;
  map?: { [key: string]: string } | undefined;
  message?: TPartialMessage | undefined;
  repeatedMessage?: TPartialMessage[] | undefined;
  repeatedString?: string[] | undefined;
  repeatedNumber?: number[] | undefined;
}

export interface TPartial_MapEntry {
  key: string;
  value: string;
}

function createBaseTPartialMessage(): TPartialMessage {
  return {};
}

export const TPartialMessage = {
  encode(message: TPartialMessage, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.field !== undefined && message.field !== "") {
      writer.uint32(10).string(message.field);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TPartialMessage {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTPartialMessage();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TPartialMessage {
    return { field: isSet(object.field) ? globalThis.String(object.field) : undefined };
  },

  toJSON(message: TPartialMessage): unknown {
    const obj: any = {};
    if (message.field !== undefined && message.field !== "") {
      obj.field = message.field;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TPartialMessage>, I>>(base?: I): TPartialMessage {
    return TPartialMessage.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TPartialMessage>, I>>(object: I): TPartialMessage {
    const message = createBaseTPartialMessage();
    message.field = object.field ?? undefined;
    return message;
  },
};

function createBaseTPartial(): TPartial {
  return {};
}

export const TPartial = {
  encode(message: TPartial, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.number !== undefined && message.number !== 0) {
      writer.uint32(8).int32(message.number);
    }
    if (message.string !== undefined && message.string !== "") {
      writer.uint32(18).string(message.string);
    }
    Object.entries(message.map || {}).forEach(([key, value]) => {
      TPartial_MapEntry.encode({ key: key as any, value }, writer.uint32(26).fork()).ldelim();
    });
    if (message.message !== undefined) {
      TPartialMessage.encode(message.message, writer.uint32(34).fork()).ldelim();
    }
    if (message.repeatedMessage !== undefined && message.repeatedMessage.length !== 0) {
      for (const v of message.repeatedMessage) {
        TPartialMessage.encode(v!, writer.uint32(42).fork()).ldelim();
      }
    }
    if (message.repeatedString !== undefined && message.repeatedString.length !== 0) {
      for (const v of message.repeatedString) {
        writer.uint32(50).string(v!);
      }
    }
    if (message.repeatedNumber !== undefined && message.repeatedNumber.length !== 0) {
      writer.uint32(58).fork();
      for (const v of message.repeatedNumber) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TPartial {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTPartial();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.number = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.string = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          const entry3 = TPartial_MapEntry.decode(reader, reader.uint32());
          if (entry3.value !== undefined) {
            if (message.map === undefined) {
              message.map = {};
            }
            message.map![entry3.key] = entry3.value;
          }
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.message = TPartialMessage.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          if (message.repeatedMessage === undefined) {
            message.repeatedMessage = [];
          }
          message.repeatedMessage!.push(TPartialMessage.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          if (message.repeatedString === undefined) {
            message.repeatedString = [];
          }
          message.repeatedString!.push(reader.string());
          continue;
        case 7:
          if (tag === 56) {
            if (message.repeatedNumber === undefined) {
              message.repeatedNumber = [];
            }
            message.repeatedNumber!.push(reader.int32());

            continue;
          }

          if (tag === 58) {
            if (message.repeatedNumber === undefined) {
              message.repeatedNumber = [];
            }
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repeatedNumber!.push(reader.int32());
            }

            continue;
          }

          break;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TPartial {
    return {
      number: isSet(object.number) ? globalThis.Number(object.number) : undefined,
      string: isSet(object.string) ? globalThis.String(object.string) : undefined,
      map: isObject(object.map)
        ? Object.entries(object.map).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : undefined,
      message: isSet(object.message) ? TPartialMessage.fromJSON(object.message) : undefined,
      repeatedMessage: globalThis.Array.isArray(object?.repeatedMessage)
        ? object.repeatedMessage.map((e: any) => TPartialMessage.fromJSON(e))
        : undefined,
      repeatedString: globalThis.Array.isArray(object?.repeatedString)
        ? object.repeatedString.map((e: any) => globalThis.String(e))
        : undefined,
      repeatedNumber: globalThis.Array.isArray(object?.repeatedNumber)
        ? object.repeatedNumber.map((e: any) => globalThis.Number(e))
        : undefined,
    };
  },

  toJSON(message: TPartial): unknown {
    const obj: any = {};
    if (message.number !== undefined && message.number !== 0) {
      obj.number = Math.round(message.number);
    }
    if (message.string !== undefined && message.string !== "") {
      obj.string = message.string;
    }
    if (message.map) {
      const entries = Object.entries(message.map);
      if (entries.length > 0) {
        obj.map = {};
        entries.forEach(([k, v]) => {
          obj.map[k] = v;
        });
      }
    }
    if (message.message !== undefined) {
      obj.message = TPartialMessage.toJSON(message.message);
    }
    if (message.repeatedMessage?.length) {
      obj.repeatedMessage = message.repeatedMessage.map((e) => TPartialMessage.toJSON(e));
    }
    if (message.repeatedString?.length) {
      obj.repeatedString = message.repeatedString;
    }
    if (message.repeatedNumber?.length) {
      obj.repeatedNumber = message.repeatedNumber.map((e) => Math.round(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TPartial>, I>>(base?: I): TPartial {
    return TPartial.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TPartial>, I>>(object: I): TPartial {
    const message = createBaseTPartial();
    message.number = object.number ?? undefined;
    message.string = object.string ?? undefined;
    message.map = (object.map === undefined || object.map === null)
      ? undefined
      : Object.entries(object.map ?? {}).reduce<{ [key: string]: string }>((acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = globalThis.String(value);
        }
        return acc;
      }, {});
    message.message = (object.message !== undefined && object.message !== null)
      ? TPartialMessage.fromPartial(object.message)
      : undefined;
    message.repeatedMessage = object.repeatedMessage?.map((e) => TPartialMessage.fromPartial(e)) || undefined;
    message.repeatedString = object.repeatedString?.map((e) => e) || undefined;
    message.repeatedNumber = object.repeatedNumber?.map((e) => e) || undefined;
    return message;
  },
};

function createBaseTPartial_MapEntry(): TPartial_MapEntry {
  return { key: "", value: "" };
}

export const TPartial_MapEntry = {
  encode(message: TPartial_MapEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TPartial_MapEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTPartial_MapEntry();
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

  fromJSON(object: any): TPartial_MapEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: TPartial_MapEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TPartial_MapEntry>, I>>(base?: I): TPartial_MapEntry {
    return TPartial_MapEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TPartial_MapEntry>, I>>(object: I): TPartial_MapEntry {
    const message = createBaseTPartial_MapEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
    return message;
  },
};

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
