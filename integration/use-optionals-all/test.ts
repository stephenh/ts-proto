/* eslint-disable */
import * as Long from 'long';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'optionalstest';

export enum StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
  UNRECOGNIZED = -1,
}

export function stateEnumFromJSON(object: any): StateEnum {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return StateEnum.UNKNOWN;
    case 2:
    case 'ON':
      return StateEnum.ON;
    case 3:
    case 'OFF':
      return StateEnum.OFF;
    case -1:
    case 'UNRECOGNIZED':
    default:
      return StateEnum.UNRECOGNIZED;
  }
}

export function stateEnumToJSON(object: StateEnum): string {
  switch (object) {
    case StateEnum.UNKNOWN:
      return 'UNKNOWN';
    case StateEnum.ON:
      return 'ON';
    case StateEnum.OFF:
      return 'OFF';
    default:
      return 'UNKNOWN';
  }
}

export interface OptionalsTest {
  id?: number;
  child?: Child;
  state?: StateEnum;
  long?: number;
  truth?: boolean;
  description?: string;
  data?: Uint8Array;
  repId?: number[];
  repChild?: Child[];
  repState?: StateEnum[];
  repLong?: number[];
  repTruth?: boolean[];
  repDescription?: string[];
  repData?: Uint8Array[];
  optId?: number | undefined;
  optChild?: Child | undefined;
  optState?: StateEnum | undefined;
  optLong?: number | undefined;
  optTruth?: boolean | undefined;
  optDescription?: string | undefined;
  optData?: Uint8Array | undefined;
  translations?: { [key: string]: string };
}

export interface OptionalsTest_TranslationsEntry {
  key: string;
  value: string;
}

export interface Child {}

function createBaseOptionalsTest(): OptionalsTest {
  return {
    id: 0,
    child: undefined,
    state: 0,
    long: 0,
    truth: false,
    description: '',
    data: new Uint8Array(),
    repId: [],
    repChild: [],
    repState: [],
    repLong: [],
    repTruth: [],
    repDescription: [],
    repData: [],
    optId: undefined,
    optChild: undefined,
    optState: undefined,
    optLong: undefined,
    optTruth: undefined,
    optDescription: undefined,
    optData: undefined,
    translations: {},
  };
}

export const OptionalsTest = {
  encode(message: OptionalsTest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== undefined && message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.child !== undefined) {
      Child.encode(message.child, writer.uint32(18).fork()).ldelim();
    }
    if (message.state !== undefined && message.state !== 0) {
      writer.uint32(24).int32(message.state);
    }
    if (message.long !== undefined && message.long !== 0) {
      writer.uint32(32).int64(message.long);
    }
    if (message.truth === true) {
      writer.uint32(40).bool(message.truth);
    }
    if (message.description !== undefined && message.description !== '') {
      writer.uint32(50).string(message.description);
    }
    if (message.data !== undefined && message.data.length !== 0) {
      writer.uint32(58).bytes(message.data);
    }
    if (message.repId !== undefined && message.repId.length !== 0) {
      writer.uint32(90).fork();
      for (const v of message.repId) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.repChild !== undefined && message.repChild.length !== 0) {
      for (const v of message.repChild) {
        Child.encode(v!, writer.uint32(98).fork()).ldelim();
      }
    }
    if (message.repState !== undefined && message.repState.length !== 0) {
      writer.uint32(106).fork();
      for (const v of message.repState) {
        writer.int32(v);
      }
      writer.ldelim();
    }
    if (message.repLong !== undefined && message.repLong.length !== 0) {
      writer.uint32(114).fork();
      for (const v of message.repLong) {
        writer.int64(v);
      }
      writer.ldelim();
    }
    if (message.repTruth !== undefined && message.repTruth.length !== 0) {
      writer.uint32(122).fork();
      for (const v of message.repTruth) {
        writer.bool(v);
      }
      writer.ldelim();
    }
    if (message.repDescription !== undefined && message.repDescription.length !== 0) {
      for (const v of message.repDescription) {
        writer.uint32(130).string(v!);
      }
    }
    if (message.repData !== undefined && message.repData.length !== 0) {
      for (const v of message.repData) {
        writer.uint32(138).bytes(v!);
      }
    }
    if (message.optId !== undefined) {
      writer.uint32(168).int32(message.optId);
    }
    if (message.optChild !== undefined) {
      Child.encode(message.optChild, writer.uint32(178).fork()).ldelim();
    }
    if (message.optState !== undefined) {
      writer.uint32(184).int32(message.optState);
    }
    if (message.optLong !== undefined) {
      writer.uint32(192).int64(message.optLong);
    }
    if (message.optTruth !== undefined) {
      writer.uint32(200).bool(message.optTruth);
    }
    if (message.optDescription !== undefined) {
      writer.uint32(210).string(message.optDescription);
    }
    if (message.optData !== undefined) {
      writer.uint32(218).bytes(message.optData);
    }
    Object.entries(message.translations || {}).forEach(([key, value]) => {
      OptionalsTest_TranslationsEntry.encode({ key: key as any, value }, writer.uint32(242).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionalsTest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOptionalsTest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = reader.int32();
          break;
        case 2:
          message.child = Child.decode(reader, reader.uint32());
          break;
        case 3:
          message.state = reader.int32() as any;
          break;
        case 4:
          message.long = longToNumber(reader.int64() as Long);
          break;
        case 5:
          message.truth = reader.bool();
          break;
        case 6:
          message.description = reader.string();
          break;
        case 7:
          message.data = reader.bytes();
          break;
        case 11:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repId!.push(reader.int32());
            }
          } else {
            message.repId!.push(reader.int32());
          }
          break;
        case 12:
          message.repChild!.push(Child.decode(reader, reader.uint32()));
          break;
        case 13:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repState!.push(reader.int32() as any);
            }
          } else {
            message.repState!.push(reader.int32() as any);
          }
          break;
        case 14:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repLong!.push(longToNumber(reader.int64() as Long));
            }
          } else {
            message.repLong!.push(longToNumber(reader.int64() as Long));
          }
          break;
        case 15:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repTruth!.push(reader.bool());
            }
          } else {
            message.repTruth!.push(reader.bool());
          }
          break;
        case 16:
          message.repDescription!.push(reader.string());
          break;
        case 17:
          message.repData!.push(reader.bytes());
          break;
        case 21:
          message.optId = reader.int32();
          break;
        case 22:
          message.optChild = Child.decode(reader, reader.uint32());
          break;
        case 23:
          message.optState = reader.int32() as any;
          break;
        case 24:
          message.optLong = longToNumber(reader.int64() as Long);
          break;
        case 25:
          message.optTruth = reader.bool();
          break;
        case 26:
          message.optDescription = reader.string();
          break;
        case 27:
          message.optData = reader.bytes();
          break;
        case 30:
          const entry30 = OptionalsTest_TranslationsEntry.decode(reader, reader.uint32());
          if (entry30.value !== undefined) {
            message.translations![entry30.key] = entry30.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OptionalsTest {
    return {
      id: isSet(object.id) ? Number(object.id) : 0,
      child: isSet(object.child) ? Child.fromJSON(object.child) : undefined,
      state: isSet(object.state) ? stateEnumFromJSON(object.state) : 0,
      long: isSet(object.long) ? Number(object.long) : 0,
      truth: isSet(object.truth) ? Boolean(object.truth) : false,
      description: isSet(object.description) ? String(object.description) : '',
      data: isSet(object.data) ? bytesFromBase64(object.data) : new Uint8Array(),
      repId: Array.isArray(object?.repId) ? object.repId.map((e: any) => Number(e)) : [],
      repChild: Array.isArray(object?.repChild) ? object.repChild.map((e: any) => Child.fromJSON(e)) : [],
      repState: Array.isArray(object?.repState) ? object.repState.map((e: any) => stateEnumFromJSON(e)) : [],
      repLong: Array.isArray(object?.repLong) ? object.repLong.map((e: any) => Number(e)) : [],
      repTruth: Array.isArray(object?.repTruth) ? object.repTruth.map((e: any) => Boolean(e)) : [],
      repDescription: Array.isArray(object?.repDescription) ? object.repDescription.map((e: any) => String(e)) : [],
      repData: Array.isArray(object?.repData) ? object.repData.map((e: any) => bytesFromBase64(e)) : [],
      optId: isSet(object.optId) ? Number(object.optId) : undefined,
      optChild: isSet(object.optChild) ? Child.fromJSON(object.optChild) : undefined,
      optState: isSet(object.optState) ? stateEnumFromJSON(object.optState) : undefined,
      optLong: isSet(object.optLong) ? Number(object.optLong) : undefined,
      optTruth: isSet(object.optTruth) ? Boolean(object.optTruth) : undefined,
      optDescription: isSet(object.optDescription) ? String(object.optDescription) : undefined,
      optData: isSet(object.optData) ? bytesFromBase64(object.optData) : undefined,
      translations: isObject(object.translations)
        ? Object.entries(object.translations).reduce<{ [key: string]: string }>((acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: OptionalsTest): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = Math.round(message.id));
    message.child !== undefined && (obj.child = message.child ? Child.toJSON(message.child) : undefined);
    message.state !== undefined && (obj.state = stateEnumToJSON(message.state));
    message.long !== undefined && (obj.long = Math.round(message.long));
    message.truth !== undefined && (obj.truth = message.truth);
    message.description !== undefined && (obj.description = message.description);
    message.data !== undefined &&
      (obj.data = base64FromBytes(message.data !== undefined ? message.data : new Uint8Array()));
    if (message.repId) {
      obj.repId = message.repId.map((e) => Math.round(e));
    } else {
      obj.repId = [];
    }
    if (message.repChild) {
      obj.repChild = message.repChild.map((e) => (e ? Child.toJSON(e) : undefined));
    } else {
      obj.repChild = [];
    }
    if (message.repState) {
      obj.repState = message.repState.map((e) => stateEnumToJSON(e));
    } else {
      obj.repState = [];
    }
    if (message.repLong) {
      obj.repLong = message.repLong.map((e) => Math.round(e));
    } else {
      obj.repLong = [];
    }
    if (message.repTruth) {
      obj.repTruth = message.repTruth.map((e) => e);
    } else {
      obj.repTruth = [];
    }
    if (message.repDescription) {
      obj.repDescription = message.repDescription.map((e) => e);
    } else {
      obj.repDescription = [];
    }
    if (message.repData) {
      obj.repData = message.repData.map((e) => base64FromBytes(e !== undefined ? e : new Uint8Array()));
    } else {
      obj.repData = [];
    }
    message.optId !== undefined && (obj.optId = Math.round(message.optId));
    message.optChild !== undefined && (obj.optChild = message.optChild ? Child.toJSON(message.optChild) : undefined);
    message.optState !== undefined &&
      (obj.optState = message.optState !== undefined ? stateEnumToJSON(message.optState) : undefined);
    message.optLong !== undefined && (obj.optLong = Math.round(message.optLong));
    message.optTruth !== undefined && (obj.optTruth = message.optTruth);
    message.optDescription !== undefined && (obj.optDescription = message.optDescription);
    message.optData !== undefined &&
      (obj.optData = message.optData !== undefined ? base64FromBytes(message.optData) : undefined);
    obj.translations = {};
    if (message.translations) {
      Object.entries(message.translations).forEach(([k, v]) => {
        obj.translations[k] = v;
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OptionalsTest>, I>>(object: I): OptionalsTest {
    const message = createBaseOptionalsTest();
    message.id = object.id ?? 0;
    message.child = object.child !== undefined && object.child !== null ? Child.fromPartial(object.child) : undefined;
    message.state = object.state ?? 0;
    message.long = object.long ?? 0;
    message.truth = object.truth ?? false;
    message.description = object.description ?? '';
    message.data = object.data ?? new Uint8Array();
    message.repId = object.repId?.map((e) => e) || [];
    message.repChild = object.repChild?.map((e) => Child.fromPartial(e)) || [];
    message.repState = object.repState?.map((e) => e) || [];
    message.repLong = object.repLong?.map((e) => e) || [];
    message.repTruth = object.repTruth?.map((e) => e) || [];
    message.repDescription = object.repDescription?.map((e) => e) || [];
    message.repData = object.repData?.map((e) => e) || [];
    message.optId = object.optId ?? undefined;
    message.optChild =
      object.optChild !== undefined && object.optChild !== null ? Child.fromPartial(object.optChild) : undefined;
    message.optState = object.optState ?? undefined;
    message.optLong = object.optLong ?? undefined;
    message.optTruth = object.optTruth ?? undefined;
    message.optDescription = object.optDescription ?? undefined;
    message.optData = object.optData ?? undefined;
    message.translations = Object.entries(object.translations ?? {}).reduce<{ [key: string]: string }>(
      (acc, [key, value]) => {
        if (value !== undefined) {
          acc[key] = String(value);
        }
        return acc;
      },
      {}
    );
    return message;
  },
};

function createBaseOptionalsTest_TranslationsEntry(): OptionalsTest_TranslationsEntry {
  return { key: '', value: '' };
}

export const OptionalsTest_TranslationsEntry = {
  encode(message: OptionalsTest_TranslationsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== '') {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== '') {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionalsTest_TranslationsEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOptionalsTest_TranslationsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): OptionalsTest_TranslationsEntry {
    return {
      key: isSet(object.key) ? String(object.key) : '',
      value: isSet(object.value) ? String(object.value) : '',
    };
  },

  toJSON(message: OptionalsTest_TranslationsEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined && (obj.value = message.value);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<OptionalsTest_TranslationsEntry>, I>>(
    object: I
  ): OptionalsTest_TranslationsEntry {
    const message = createBaseOptionalsTest_TranslationsEntry();
    message.key = object.key ?? '';
    message.value = object.value ?? '';
    return message;
  },
};

function createBaseChild(): Child {
  return {};
}

export const Child = {
  encode(_: Child, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Child {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChild();
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

  fromJSON(_: any): Child {
    return {};
  },

  toJSON(_: Child): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Child>, I>>(_: I): Child {
    const message = createBaseChild();
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

const atob: (b64: string) => string =
  globalThis.atob || ((b64) => globalThis.Buffer.from(b64, 'base64').toString('binary'));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa || ((bin) => globalThis.Buffer.from(bin, 'binary').toString('base64'));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (const byte of arr) {
    bin.push(String.fromCharCode(byte));
  }
  return btoa(bin.join(''));
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & Record<Exclude<keyof I, KeysOfUnion<P>>, never>;

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === 'object' && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
