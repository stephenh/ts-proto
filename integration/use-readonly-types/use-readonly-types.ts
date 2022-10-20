/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "";

export interface Entity {
  readonly intVal: number;
  readonly stringVal: string;
  readonly intArray: number[];
  readonly stringArray: string[];
  readonly subEntity: SubEntity | undefined;
  readonly subEntityArray: SubEntity[];
}

export interface SubEntity {
  readonly subVal: number;
}

function createBaseEntity(): Entity {
  return { intVal: 0, stringVal: "", intArray: [], stringArray: [], subEntity: undefined, subEntityArray: [] };
}

export const Entity = {
  encode(message: Entity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.intVal !== 0) {
      writer.uint32(8).int32(message.intVal);
    }
    if (message.stringVal !== "") {
      writer.uint32(18).string(message.stringVal);
    }
    writer.uint32(26).fork();
    for (const v of message.intArray) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.stringArray) {
      writer.uint32(34).string(v!);
    }
    if (message.subEntity !== undefined) {
      SubEntity.encode(message.subEntity, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.subEntityArray) {
      SubEntity.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Entity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEntity() as any;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.intVal = reader.int32();
          break;
        case 2:
          message.stringVal = reader.string();
          break;
        case 3:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.intArray.push(reader.int32());
            }
          } else {
            message.intArray.push(reader.int32());
          }
          break;
        case 4:
          message.stringArray.push(reader.string());
          break;
        case 5:
          message.subEntity = SubEntity.decode(reader, reader.uint32());
          break;
        case 6:
          message.subEntityArray.push(SubEntity.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Entity {
    return {
      intVal: isSet(object.intVal) ? Number(object.intVal) : 0,
      stringVal: isSet(object.stringVal) ? String(object.stringVal) : "",
      intArray: Array.isArray(object?.intArray) ? object.intArray.map((e: any) => Number(e)) : [],
      stringArray: Array.isArray(object?.stringArray) ? object.stringArray.map((e: any) => String(e)) : [],
      subEntity: isSet(object.subEntity) ? SubEntity.fromJSON(object.subEntity) : undefined,
      subEntityArray: Array.isArray(object?.subEntityArray)
        ? object.subEntityArray.map((e: any) => SubEntity.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Entity): unknown {
    const obj: any = {};
    message.intVal !== undefined && (obj.intVal = Math.round(message.intVal));
    message.stringVal !== undefined && (obj.stringVal = message.stringVal);
    if (message.intArray) {
      obj.intArray = message.intArray.map((e) => Math.round(e));
    } else {
      obj.intArray = [];
    }
    if (message.stringArray) {
      obj.stringArray = message.stringArray.map((e) => e);
    } else {
      obj.stringArray = [];
    }
    message.subEntity !== undefined &&
      (obj.subEntity = message.subEntity ? SubEntity.toJSON(message.subEntity) : undefined);
    if (message.subEntityArray) {
      obj.subEntityArray = message.subEntityArray.map((e) => e ? SubEntity.toJSON(e) : undefined);
    } else {
      obj.subEntityArray = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Entity>, I>>(object: I): Entity {
    const message = createBaseEntity() as any;
    message.intVal = object.intVal ?? 0;
    message.stringVal = object.stringVal ?? "";
    message.intArray = object.intArray?.map((e) => e) || [];
    message.stringArray = object.stringArray?.map((e) => e) || [];
    message.subEntity = (object.subEntity !== undefined && object.subEntity !== null)
      ? SubEntity.fromPartial(object.subEntity)
      : undefined;
    message.subEntityArray = object.subEntityArray?.map((e) => SubEntity.fromPartial(e)) || [];
    return message;
  },
};

function createBaseSubEntity(): SubEntity {
  return { subVal: 0 };
}

export const SubEntity = {
  encode(message: SubEntity, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.subVal !== 0) {
      writer.uint32(8).int32(message.subVal);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SubEntity {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSubEntity() as any;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.subVal = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): SubEntity {
    return { subVal: isSet(object.subVal) ? Number(object.subVal) : 0 };
  },

  toJSON(message: SubEntity): unknown {
    const obj: any = {};
    message.subVal !== undefined && (obj.subVal = Math.round(message.subVal));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<SubEntity>, I>>(object: I): SubEntity {
    const message = createBaseSubEntity() as any;
    message.subVal = object.subVal ?? 0;
    return message;
  },
};

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
