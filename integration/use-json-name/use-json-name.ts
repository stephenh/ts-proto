/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import { Timestamp } from "./google/protobuf/timestamp";

export const protobufPackage = "json_name";

export interface JsonName {
  other_name: string;
  other_age?: number | undefined;
  createdAt?: Date | undefined;
  "hyphened-name": string;
  "name with spaces": string;
  $dollar: string;
  dollar$: string;
  "hyphen-list": string[];
  A?: string | undefined;
  b?: string | undefined;
  _C?: string | undefined;
  d?: NstedOneOf | undefined;
  noJsonName: string;
}

export interface NstedOneOf {
  nestedOneOfField?: string | undefined;
}

function createBaseJsonName(): JsonName {
  return {
    other_name: "",
    other_age: undefined,
    createdAt: undefined,
    "hyphened-name": "",
    "name with spaces": "",
    $dollar: "",
    dollar$: "",
    "hyphen-list": [],
    A: undefined,
    b: undefined,
    _C: undefined,
    d: undefined,
    noJsonName: "",
  };
}

export const JsonName = {
  encode(message: JsonName, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.other_name !== "") {
      writer.uint32(10).string(message.other_name);
    }
    if (message.other_age !== undefined) {
      writer.uint32(16).int32(message.other_age);
    }
    if (message.createdAt !== undefined) {
      Timestamp.encode(toTimestamp(message.createdAt), writer.uint32(74).fork()).ldelim();
    }
    if (message["hyphened-name"] !== "") {
      writer.uint32(26).string(message["hyphened-name"]);
    }
    if (message["name with spaces"] !== "") {
      writer.uint32(34).string(message["name with spaces"]);
    }
    if (message.$dollar !== "") {
      writer.uint32(42).string(message.$dollar);
    }
    if (message.dollar$ !== "") {
      writer.uint32(50).string(message.dollar$);
    }
    for (const v of message["hyphen-list"]) {
      writer.uint32(58).string(v!);
    }
    if (message.A !== undefined) {
      writer.uint32(82).string(message.A);
    }
    if (message.b !== undefined) {
      writer.uint32(90).string(message.b);
    }
    if (message._C !== undefined) {
      writer.uint32(98).string(message._C);
    }
    if (message.d !== undefined) {
      NstedOneOf.encode(message.d, writer.uint32(106).fork()).ldelim();
    }
    if (message.noJsonName !== "") {
      writer.uint32(114).string(message.noJsonName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): JsonName {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseJsonName();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.other_name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.other_age = reader.int32();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.createdAt = fromTimestamp(Timestamp.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message["hyphened-name"] = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message["name with spaces"] = reader.string();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.$dollar = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.dollar$ = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message["hyphen-list"].push(reader.string());
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.A = reader.string();
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.b = reader.string();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message._C = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.d = NstedOneOf.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.noJsonName = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): JsonName {
    return {
      other_name: isSet(object.other_name) ? globalThis.String(object.other_name) : "",
      other_age: isSet(object.other_age) ? globalThis.Number(object.other_age) : undefined,
      createdAt: isSet(object.createdAt) ? fromJsonTimestamp(object.createdAt) : undefined,
      "hyphened-name": isSet(object["hyphened-name"]) ? globalThis.String(object["hyphened-name"]) : "",
      "name with spaces": isSet(object["name with spaces"]) ? globalThis.String(object["name with spaces"]) : "",
      $dollar: isSet(object.$dollar) ? globalThis.String(object.$dollar) : "",
      dollar$: isSet(object.dollar$) ? globalThis.String(object.dollar$) : "",
      "hyphen-list": globalThis.Array.isArray(object?.["hyphen-list"])
        ? object["hyphen-list"].map((e: any) => globalThis.String(e))
        : [],
      A: isSet(object.A) ? globalThis.String(object.A) : undefined,
      b: isSet(object.b) ? globalThis.String(object.b) : undefined,
      _C: isSet(object._C) ? globalThis.String(object._C) : undefined,
      d: isSet(object.d) ? NstedOneOf.fromJSON(object.d) : undefined,
      noJsonName: isSet(object.noJsonName) ? globalThis.String(object.noJsonName) : "",
    };
  },

  toJSON(message: JsonName): unknown {
    const obj: any = {};
    if (message.other_name !== "") {
      obj.other_name = message.other_name;
    }
    if (message.other_age !== undefined) {
      obj.other_age = Math.round(message.other_age);
    }
    if (message.createdAt !== undefined) {
      obj.createdAt = message.createdAt.toISOString();
    }
    if (message["hyphened-name"] !== "") {
      obj["hyphened-name"] = message["hyphened-name"];
    }
    if (message["name with spaces"] !== "") {
      obj["name with spaces"] = message["name with spaces"];
    }
    if (message.$dollar !== "") {
      obj.$dollar = message.$dollar;
    }
    if (message.dollar$ !== "") {
      obj.dollar$ = message.dollar$;
    }
    if (message["hyphen-list"]?.length) {
      obj["hyphen-list"] = message["hyphen-list"];
    }
    if (message.A !== undefined) {
      obj.A = message.A;
    }
    if (message.b !== undefined) {
      obj.b = message.b;
    }
    if (message._C !== undefined) {
      obj._C = message._C;
    }
    if (message.d !== undefined) {
      obj.d = NstedOneOf.toJSON(message.d);
    }
    if (message.noJsonName !== "") {
      obj.noJsonName = message.noJsonName;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<JsonName>, I>>(base?: I): JsonName {
    return JsonName.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<JsonName>, I>>(object: I): JsonName {
    const message = createBaseJsonName();
    message.other_name = object.other_name ?? "";
    message.other_age = object.other_age ?? undefined;
    message.createdAt = object.createdAt ?? undefined;
    message["hyphened-name"] = object["hyphened-name"] ?? "";
    message["name with spaces"] = object["name with spaces"] ?? "";
    message.$dollar = object.$dollar ?? "";
    message.dollar$ = object.dollar$ ?? "";
    message["hyphen-list"] = object["hyphen-list"]?.map((e) => e) || [];
    message.A = object.A ?? undefined;
    message.b = object.b ?? undefined;
    message._C = object._C ?? undefined;
    message.d = (object.d !== undefined && object.d !== null) ? NstedOneOf.fromPartial(object.d) : undefined;
    message.noJsonName = object.noJsonName ?? "";
    return message;
  },
};

function createBaseNstedOneOf(): NstedOneOf {
  return { nestedOneOfField: undefined };
}

export const NstedOneOf = {
  encode(message: NstedOneOf, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.nestedOneOfField !== undefined) {
      writer.uint32(10).string(message.nestedOneOfField);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): NstedOneOf {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNstedOneOf();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.nestedOneOfField = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): NstedOneOf {
    return {
      nestedOneOfField: isSet(object.nestedOneOfField) ? globalThis.String(object.nestedOneOfField) : undefined,
    };
  },

  toJSON(message: NstedOneOf): unknown {
    const obj: any = {};
    if (message.nestedOneOfField !== undefined) {
      obj.nestedOneOfField = message.nestedOneOfField;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NstedOneOf>, I>>(base?: I): NstedOneOf {
    return NstedOneOf.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NstedOneOf>, I>>(object: I): NstedOneOf {
    const message = createBaseNstedOneOf();
    message.nestedOneOfField = object.nestedOneOfField ?? undefined;
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

function toTimestamp(date: Date): Timestamp {
  const seconds = Math.trunc(date.getTime() / 1_000);
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = (t.seconds || 0) * 1_000;
  millis += (t.nanos || 0) / 1_000_000;
  return new globalThis.Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof globalThis.Date) {
    return o;
  } else if (typeof o === "string") {
    return new globalThis.Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
