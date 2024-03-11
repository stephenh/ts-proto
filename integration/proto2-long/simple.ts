/* eslint-disable */
import Long = require("long");
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "simple";

export enum StateEnum {
  UNKNOWN = 0,
  ON = 2,
  OFF = 3,
  UNRECOGNIZED = -1,
}

export function stateEnumFromJSON(object: any): StateEnum {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return StateEnum.UNKNOWN;
    case 2:
    case "ON":
      return StateEnum.ON;
    case 3:
    case "OFF":
      return StateEnum.OFF;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StateEnum.UNRECOGNIZED;
  }
}

export function stateEnumToJSON(object: StateEnum): string {
  switch (object) {
    case StateEnum.UNKNOWN:
      return "UNKNOWN";
    case StateEnum.ON:
      return "ON";
    case StateEnum.OFF:
      return "OFF";
    case StateEnum.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface OptionalsTest {
  repId: number[];
  repChild: Child[];
  repState: StateEnum[];
  repLong: Long[];
  repTruth: boolean[];
  repDescription: string[];
  repData: Uint8Array[];
  repFloat: number[];
  optId?: number | undefined;
  optChild?: Child | undefined;
  optState?: StateEnum | undefined;
  optLong?: Long | undefined;
  optTruth?: boolean | undefined;
  optDescription?: string | undefined;
  optData?: Uint8Array | undefined;
  optFloat?: number | undefined;
  reqId: number;
  reqChild: Child | undefined;
  reqState: StateEnum;
  reqLong: Long;
  reqTruth: boolean;
  reqDescription: string;
  reqData: Uint8Array;
  reqFloat: number;
  reqDefvalId: number;
  reqDefvalState: StateEnum;
  reqDefvalLong: Long;
  reqDefvalTruth: boolean;
  reqDefvalDescription: string;
  reqDefvalData: Uint8Array;
  reqDefvalFloat: number;
  optDefvalId?: number | undefined;
  optDefvalState?: StateEnum | undefined;
  optDefvalLong?: Long | undefined;
  optDefvalTruth?: boolean | undefined;
  optDefvalDescription?: string | undefined;
  optDefvalData?: Uint8Array | undefined;
  optDefvalFloat?: number | undefined;
  translations: { [key: string]: string };
}

export interface OptionalsTest_TranslationsEntry {
  key: string;
  value: string;
}

export interface Child {
}

function createBaseOptionalsTest(): OptionalsTest {
  return {
    repId: [],
    repChild: [],
    repState: [],
    repLong: [],
    repTruth: [],
    repDescription: [],
    repData: [],
    repFloat: [],
    reqId: 0,
    reqChild: undefined,
    reqState: 0,
    reqLong: Long.ZERO,
    reqTruth: false,
    reqDescription: "",
    reqData: new Uint8Array(0),
    reqFloat: 0,
    reqDefvalId: 100,
    reqDefvalState: 2,
    reqDefvalLong: Long.fromNumber(7812378193),
    reqDefvalTruth: true,
    reqDefvalDescription: "Some description",
    reqDefvalData: new Uint8Array(0),
    reqDefvalFloat: 0.12354,
    translations: {},
  };
}

export const OptionalsTest = {
  encode(message: OptionalsTest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.repId) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.repChild) {
      Child.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(26).fork();
    for (const v of message.repState) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(34).fork();
    for (const v of message.repLong) {
      writer.int64(v);
    }
    writer.ldelim();
    writer.uint32(42).fork();
    for (const v of message.repTruth) {
      writer.bool(v);
    }
    writer.ldelim();
    for (const v of message.repDescription) {
      writer.uint32(50).string(v!);
    }
    for (const v of message.repData) {
      writer.uint32(58).bytes(v!);
    }
    writer.uint32(66).fork();
    for (const v of message.repFloat) {
      writer.float(v);
    }
    writer.ldelim();
    if (message.optId !== undefined && message.optId !== 0) {
      writer.uint32(88).int32(message.optId);
    }
    if (message.optChild !== undefined) {
      Child.encode(message.optChild, writer.uint32(98).fork()).ldelim();
    }
    if (message.optState !== undefined && message.optState !== 0) {
      writer.uint32(104).int32(message.optState);
    }
    if (message.optLong !== undefined && !message.optLong.equals(Long.ZERO)) {
      writer.uint32(112).int64(message.optLong);
    }
    if (message.optTruth !== undefined && message.optTruth !== false) {
      writer.uint32(120).bool(message.optTruth);
    }
    if (message.optDescription !== undefined && message.optDescription !== "") {
      writer.uint32(130).string(message.optDescription);
    }
    if (message.optData !== undefined && message.optData.length !== 0) {
      writer.uint32(138).bytes(message.optData);
    }
    if (message.optFloat !== undefined && message.optFloat !== 0) {
      writer.uint32(149).float(message.optFloat);
    }
    if (message.reqId !== 0) {
      writer.uint32(168).int32(message.reqId);
    }
    if (message.reqChild !== undefined) {
      Child.encode(message.reqChild, writer.uint32(178).fork()).ldelim();
    }
    if (message.reqState !== 0) {
      writer.uint32(184).int32(message.reqState);
    }
    if (!message.reqLong.equals(Long.ZERO)) {
      writer.uint32(192).int64(message.reqLong);
    }
    if (message.reqTruth !== false) {
      writer.uint32(200).bool(message.reqTruth);
    }
    if (message.reqDescription !== "") {
      writer.uint32(210).string(message.reqDescription);
    }
    if (message.reqData.length !== 0) {
      writer.uint32(218).bytes(message.reqData);
    }
    if (message.reqFloat !== 0) {
      writer.uint32(229).float(message.reqFloat);
    }
    if (message.reqDefvalId !== 100) {
      writer.uint32(248).int32(message.reqDefvalId);
    }
    if (message.reqDefvalState !== 2) {
      writer.uint32(264).int32(message.reqDefvalState);
    }
    if (!message.reqDefvalLong.equals(Long.fromNumber(7812378193))) {
      writer.uint32(272).int64(message.reqDefvalLong);
    }
    if (message.reqDefvalTruth !== true) {
      writer.uint32(280).bool(message.reqDefvalTruth);
    }
    if (message.reqDefvalDescription !== "Some description") {
      writer.uint32(290).string(message.reqDefvalDescription);
    }
    if (message.reqDefvalData.length !== 0) {
      writer.uint32(298).bytes(message.reqDefvalData);
    }
    if (message.reqDefvalFloat !== 0.12354) {
      writer.uint32(309).float(message.reqDefvalFloat);
    }
    if (message.optDefvalId !== undefined && message.optDefvalId !== 100) {
      writer.uint32(328).int32(message.optDefvalId);
    }
    if (message.optDefvalState !== undefined && message.optDefvalState !== 2) {
      writer.uint32(344).int32(message.optDefvalState);
    }
    if (message.optDefvalLong !== undefined && !message.optDefvalLong.equals(Long.fromNumber(7812378193))) {
      writer.uint32(352).int64(message.optDefvalLong);
    }
    if (message.optDefvalTruth !== undefined && message.optDefvalTruth !== true) {
      writer.uint32(360).bool(message.optDefvalTruth);
    }
    if (message.optDefvalDescription !== undefined && message.optDefvalDescription !== "Some description") {
      writer.uint32(370).string(message.optDefvalDescription);
    }
    if (message.optDefvalData !== undefined && message.optDefvalData.length !== 0) {
      writer.uint32(378).bytes(message.optDefvalData);
    }
    if (message.optDefvalFloat !== undefined && message.optDefvalFloat !== 0.12354) {
      writer.uint32(389).float(message.optDefvalFloat);
    }
    Object.entries(message.translations).forEach(([key, value]) => {
      OptionalsTest_TranslationsEntry.encode({ key: key as any, value }, writer.uint32(402).fork()).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionalsTest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOptionalsTest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.repId.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repId.push(reader.int32());
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.repChild.push(Child.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag === 24) {
            message.repState.push(reader.int32() as any);

            continue;
          }

          if (tag === 26) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repState.push(reader.int32() as any);
            }

            continue;
          }

          break;
        case 4:
          if (tag === 32) {
            message.repLong.push(reader.int64() as Long);

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repLong.push(reader.int64() as Long);
            }

            continue;
          }

          break;
        case 5:
          if (tag === 40) {
            message.repTruth.push(reader.bool());

            continue;
          }

          if (tag === 42) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repTruth.push(reader.bool());
            }

            continue;
          }

          break;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.repDescription.push(reader.string());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.repData.push(reader.bytes());
          continue;
        case 8:
          if (tag === 69) {
            message.repFloat.push(reader.float());

            continue;
          }

          if (tag === 66) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repFloat.push(reader.float());
            }

            continue;
          }

          break;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.optId = reader.int32();
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.optChild = Child.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.optState = reader.int32() as any;
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.optLong = reader.int64() as Long;
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.optTruth = reader.bool();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.optDescription = reader.string();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.optData = reader.bytes();
          continue;
        case 18:
          if (tag !== 149) {
            break;
          }

          message.optFloat = reader.float();
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.reqId = reader.int32();
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.reqChild = Child.decode(reader, reader.uint32());
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.reqState = reader.int32() as any;
          continue;
        case 24:
          if (tag !== 192) {
            break;
          }

          message.reqLong = reader.int64() as Long;
          continue;
        case 25:
          if (tag !== 200) {
            break;
          }

          message.reqTruth = reader.bool();
          continue;
        case 26:
          if (tag !== 210) {
            break;
          }

          message.reqDescription = reader.string();
          continue;
        case 27:
          if (tag !== 218) {
            break;
          }

          message.reqData = reader.bytes();
          continue;
        case 28:
          if (tag !== 229) {
            break;
          }

          message.reqFloat = reader.float();
          continue;
        case 31:
          if (tag !== 248) {
            break;
          }

          message.reqDefvalId = reader.int32();
          continue;
        case 33:
          if (tag !== 264) {
            break;
          }

          message.reqDefvalState = reader.int32() as any;
          continue;
        case 34:
          if (tag !== 272) {
            break;
          }

          message.reqDefvalLong = reader.int64() as Long;
          continue;
        case 35:
          if (tag !== 280) {
            break;
          }

          message.reqDefvalTruth = reader.bool();
          continue;
        case 36:
          if (tag !== 290) {
            break;
          }

          message.reqDefvalDescription = reader.string();
          continue;
        case 37:
          if (tag !== 298) {
            break;
          }

          message.reqDefvalData = reader.bytes();
          continue;
        case 38:
          if (tag !== 309) {
            break;
          }

          message.reqDefvalFloat = reader.float();
          continue;
        case 41:
          if (tag !== 328) {
            break;
          }

          message.optDefvalId = reader.int32();
          continue;
        case 43:
          if (tag !== 344) {
            break;
          }

          message.optDefvalState = reader.int32() as any;
          continue;
        case 44:
          if (tag !== 352) {
            break;
          }

          message.optDefvalLong = reader.int64() as Long;
          continue;
        case 45:
          if (tag !== 360) {
            break;
          }

          message.optDefvalTruth = reader.bool();
          continue;
        case 46:
          if (tag !== 370) {
            break;
          }

          message.optDefvalDescription = reader.string();
          continue;
        case 47:
          if (tag !== 378) {
            break;
          }

          message.optDefvalData = reader.bytes();
          continue;
        case 48:
          if (tag !== 389) {
            break;
          }

          message.optDefvalFloat = reader.float();
          continue;
        case 50:
          if (tag !== 402) {
            break;
          }

          const entry50 = OptionalsTest_TranslationsEntry.decode(reader, reader.uint32());
          if (entry50.value !== undefined) {
            message.translations[entry50.key] = entry50.value;
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

  fromJSON(object: any): OptionalsTest {
    return {
      repId: globalThis.Array.isArray(object?.repId) ? object.repId.map((e: any) => globalThis.Number(e)) : [],
      repChild: globalThis.Array.isArray(object?.repChild) ? object.repChild.map((e: any) => Child.fromJSON(e)) : [],
      repState: globalThis.Array.isArray(object?.repState) ? object.repState.map((e: any) => stateEnumFromJSON(e)) : [],
      repLong: globalThis.Array.isArray(object?.repLong) ? object.repLong.map((e: any) => Long.fromValue(e)) : [],
      repTruth: globalThis.Array.isArray(object?.repTruth)
        ? object.repTruth.map((e: any) => globalThis.Boolean(e))
        : [],
      repDescription: globalThis.Array.isArray(object?.repDescription)
        ? object.repDescription.map((e: any) => globalThis.String(e))
        : [],
      repData: globalThis.Array.isArray(object?.repData) ? object.repData.map((e: any) => bytesFromBase64(e)) : [],
      repFloat: globalThis.Array.isArray(object?.repFloat) ? object.repFloat.map((e: any) => globalThis.Number(e)) : [],
      optId: isSet(object.optId) ? globalThis.Number(object.optId) : undefined,
      optChild: isSet(object.optChild) ? Child.fromJSON(object.optChild) : undefined,
      optState: isSet(object.optState) ? stateEnumFromJSON(object.optState) : undefined,
      optLong: isSet(object.optLong) ? Long.fromValue(object.optLong) : undefined,
      optTruth: isSet(object.optTruth) ? globalThis.Boolean(object.optTruth) : undefined,
      optDescription: isSet(object.optDescription) ? globalThis.String(object.optDescription) : undefined,
      optData: isSet(object.optData) ? bytesFromBase64(object.optData) : undefined,
      optFloat: isSet(object.optFloat) ? globalThis.Number(object.optFloat) : undefined,
      reqId: isSet(object.reqId) ? globalThis.Number(object.reqId) : 0,
      reqChild: isSet(object.reqChild) ? Child.fromJSON(object.reqChild) : undefined,
      reqState: isSet(object.reqState) ? stateEnumFromJSON(object.reqState) : 0,
      reqLong: isSet(object.reqLong) ? Long.fromValue(object.reqLong) : Long.ZERO,
      reqTruth: isSet(object.reqTruth) ? globalThis.Boolean(object.reqTruth) : false,
      reqDescription: isSet(object.reqDescription) ? globalThis.String(object.reqDescription) : "",
      reqData: isSet(object.reqData) ? bytesFromBase64(object.reqData) : new Uint8Array(0),
      reqFloat: isSet(object.reqFloat) ? globalThis.Number(object.reqFloat) : 0,
      reqDefvalId: isSet(object.reqDefvalId) ? globalThis.Number(object.reqDefvalId) : 100,
      reqDefvalState: isSet(object.reqDefvalState) ? stateEnumFromJSON(object.reqDefvalState) : 2,
      reqDefvalLong: isSet(object.reqDefvalLong) ? Long.fromValue(object.reqDefvalLong) : Long.fromNumber(7812378193),
      reqDefvalTruth: isSet(object.reqDefvalTruth) ? globalThis.Boolean(object.reqDefvalTruth) : true,
      reqDefvalDescription: isSet(object.reqDefvalDescription)
        ? globalThis.String(object.reqDefvalDescription)
        : "Some description",
      reqDefvalData: isSet(object.reqDefvalData) ? bytesFromBase64(object.reqDefvalData) : new Uint8Array(0),
      reqDefvalFloat: isSet(object.reqDefvalFloat) ? globalThis.Number(object.reqDefvalFloat) : 0.12354,
      optDefvalId: isSet(object.optDefvalId) ? globalThis.Number(object.optDefvalId) : undefined,
      optDefvalState: isSet(object.optDefvalState) ? stateEnumFromJSON(object.optDefvalState) : undefined,
      optDefvalLong: isSet(object.optDefvalLong) ? Long.fromValue(object.optDefvalLong) : undefined,
      optDefvalTruth: isSet(object.optDefvalTruth) ? globalThis.Boolean(object.optDefvalTruth) : undefined,
      optDefvalDescription: isSet(object.optDefvalDescription)
        ? globalThis.String(object.optDefvalDescription)
        : undefined,
      optDefvalData: isSet(object.optDefvalData) ? bytesFromBase64(object.optDefvalData) : undefined,
      optDefvalFloat: isSet(object.optDefvalFloat) ? globalThis.Number(object.optDefvalFloat) : undefined,
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
    if (message.repId?.length) {
      obj.repId = message.repId.map((e) => Math.round(e));
    }
    if (message.repChild?.length) {
      obj.repChild = message.repChild.map((e) => Child.toJSON(e));
    }
    if (message.repState?.length) {
      obj.repState = message.repState.map((e) => stateEnumToJSON(e));
    }
    if (message.repLong?.length) {
      obj.repLong = message.repLong.map((e) => (e || Long.ZERO).toString());
    }
    if (message.repTruth?.length) {
      obj.repTruth = message.repTruth;
    }
    if (message.repDescription?.length) {
      obj.repDescription = message.repDescription;
    }
    if (message.repData?.length) {
      obj.repData = message.repData.map((e) => base64FromBytes(e));
    }
    if (message.repFloat?.length) {
      obj.repFloat = message.repFloat;
    }
    if (message.optId !== undefined && message.optId !== 0) {
      obj.optId = Math.round(message.optId);
    }
    if (message.optChild !== undefined) {
      obj.optChild = Child.toJSON(message.optChild);
    }
    if (message.optState !== undefined && message.optState !== 0) {
      obj.optState = stateEnumToJSON(message.optState);
    }
    if (message.optLong !== undefined && !message.optLong.equals(Long.ZERO)) {
      obj.optLong = (message.optLong || Long.ZERO).toString();
    }
    if (message.optTruth !== undefined && message.optTruth !== false) {
      obj.optTruth = message.optTruth;
    }
    if (message.optDescription !== undefined && message.optDescription !== "") {
      obj.optDescription = message.optDescription;
    }
    if (message.optData !== undefined && message.optData.length !== 0) {
      obj.optData = base64FromBytes(message.optData);
    }
    if (message.optFloat !== undefined && message.optFloat !== 0) {
      obj.optFloat = message.optFloat;
    }
    if (message.reqId !== 0) {
      obj.reqId = Math.round(message.reqId);
    }
    if (message.reqChild !== undefined) {
      obj.reqChild = Child.toJSON(message.reqChild);
    }
    if (message.reqState !== 0) {
      obj.reqState = stateEnumToJSON(message.reqState);
    }
    if (!message.reqLong.equals(Long.ZERO)) {
      obj.reqLong = (message.reqLong || Long.ZERO).toString();
    }
    if (message.reqTruth !== false) {
      obj.reqTruth = message.reqTruth;
    }
    if (message.reqDescription !== "") {
      obj.reqDescription = message.reqDescription;
    }
    if (message.reqData.length !== 0) {
      obj.reqData = base64FromBytes(message.reqData);
    }
    if (message.reqFloat !== 0) {
      obj.reqFloat = message.reqFloat;
    }
    if (message.reqDefvalId !== 100) {
      obj.reqDefvalId = Math.round(message.reqDefvalId);
    }
    if (message.reqDefvalState !== 2) {
      obj.reqDefvalState = stateEnumToJSON(message.reqDefvalState);
    }
    if (!message.reqDefvalLong.equals(Long.fromNumber(7812378193))) {
      obj.reqDefvalLong = (message.reqDefvalLong || Long.fromNumber(7812378193)).toString();
    }
    if (message.reqDefvalTruth !== true) {
      obj.reqDefvalTruth = message.reqDefvalTruth;
    }
    if (message.reqDefvalDescription !== "Some description") {
      obj.reqDefvalDescription = message.reqDefvalDescription;
    }
    if (message.reqDefvalData.length !== 0) {
      obj.reqDefvalData = base64FromBytes(message.reqDefvalData);
    }
    if (message.reqDefvalFloat !== 0.12354) {
      obj.reqDefvalFloat = message.reqDefvalFloat;
    }
    if (message.optDefvalId !== undefined && message.optDefvalId !== 100) {
      obj.optDefvalId = Math.round(message.optDefvalId);
    }
    if (message.optDefvalState !== undefined && message.optDefvalState !== 2) {
      obj.optDefvalState = stateEnumToJSON(message.optDefvalState);
    }
    if (message.optDefvalLong !== undefined && !message.optDefvalLong.equals(Long.fromNumber(7812378193))) {
      obj.optDefvalLong = (message.optDefvalLong || Long.fromNumber(7812378193)).toString();
    }
    if (message.optDefvalTruth !== undefined && message.optDefvalTruth !== true) {
      obj.optDefvalTruth = message.optDefvalTruth;
    }
    if (message.optDefvalDescription !== undefined && message.optDefvalDescription !== "Some description") {
      obj.optDefvalDescription = message.optDefvalDescription;
    }
    if (message.optDefvalData !== undefined && message.optDefvalData.length !== 0) {
      obj.optDefvalData = base64FromBytes(message.optDefvalData);
    }
    if (message.optDefvalFloat !== undefined && message.optDefvalFloat !== 0.12354) {
      obj.optDefvalFloat = message.optDefvalFloat;
    }
    if (message.translations) {
      const entries = Object.entries(message.translations);
      if (entries.length > 0) {
        obj.translations = {};
        entries.forEach(([k, v]) => {
          obj.translations[k] = v;
        });
      }
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OptionalsTest>, I>>(base?: I): OptionalsTest {
    return OptionalsTest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OptionalsTest>, I>>(object: I): OptionalsTest {
    const message = createBaseOptionalsTest();
    message.repId = object.repId?.map((e) => e) || [];
    message.repChild = object.repChild?.map((e) => Child.fromPartial(e)) || [];
    message.repState = object.repState?.map((e) => e) || [];
    message.repLong = object.repLong?.map((e) => Long.fromValue(e)) || [];
    message.repTruth = object.repTruth?.map((e) => e) || [];
    message.repDescription = object.repDescription?.map((e) => e) || [];
    message.repData = object.repData?.map((e) => e) || [];
    message.repFloat = object.repFloat?.map((e) => e) || [];
    message.optId = object.optId ?? 0;
    message.optChild = (object.optChild !== undefined && object.optChild !== null)
      ? Child.fromPartial(object.optChild)
      : undefined;
    message.optState = object.optState ?? 0;
    message.optLong = (object.optLong !== undefined && object.optLong !== null)
      ? Long.fromValue(object.optLong)
      : Long.ZERO;
    message.optTruth = object.optTruth ?? false;
    message.optDescription = object.optDescription ?? "";
    message.optData = object.optData ?? new Uint8Array(0);
    message.optFloat = object.optFloat ?? 0;
    message.reqId = object.reqId ?? 0;
    message.reqChild = (object.reqChild !== undefined && object.reqChild !== null)
      ? Child.fromPartial(object.reqChild)
      : undefined;
    message.reqState = object.reqState ?? 0;
    message.reqLong = (object.reqLong !== undefined && object.reqLong !== null)
      ? Long.fromValue(object.reqLong)
      : Long.ZERO;
    message.reqTruth = object.reqTruth ?? false;
    message.reqDescription = object.reqDescription ?? "";
    message.reqData = object.reqData ?? new Uint8Array(0);
    message.reqFloat = object.reqFloat ?? 0;
    message.reqDefvalId = object.reqDefvalId ?? 100;
    message.reqDefvalState = object.reqDefvalState ?? 2;
    message.reqDefvalLong = (object.reqDefvalLong !== undefined && object.reqDefvalLong !== null)
      ? Long.fromValue(object.reqDefvalLong)
      : Long.fromNumber(7812378193);
    message.reqDefvalTruth = object.reqDefvalTruth ?? true;
    message.reqDefvalDescription = object.reqDefvalDescription ?? "Some description";
    message.reqDefvalData = object.reqDefvalData ?? new Uint8Array(0);
    message.reqDefvalFloat = object.reqDefvalFloat ?? 0.12354;
    message.optDefvalId = object.optDefvalId ?? 100;
    message.optDefvalState = object.optDefvalState ?? 2;
    message.optDefvalLong = (object.optDefvalLong !== undefined && object.optDefvalLong !== null)
      ? Long.fromValue(object.optDefvalLong)
      : Long.fromNumber(7812378193);
    message.optDefvalTruth = object.optDefvalTruth ?? true;
    message.optDefvalDescription = object.optDefvalDescription ?? "Some description";
    message.optDefvalData = object.optDefvalData ?? new Uint8Array(0);
    message.optDefvalFloat = object.optDefvalFloat ?? 0.12354;
    message.translations = Object.entries(object.translations ?? {}).reduce<{ [key: string]: string }>(
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

function createBaseOptionalsTest_TranslationsEntry(): OptionalsTest_TranslationsEntry {
  return { key: "", value: "" };
}

export const OptionalsTest_TranslationsEntry = {
  encode(message: OptionalsTest_TranslationsEntry, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OptionalsTest_TranslationsEntry {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOptionalsTest_TranslationsEntry();
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

  fromJSON(object: any): OptionalsTest_TranslationsEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: OptionalsTest_TranslationsEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OptionalsTest_TranslationsEntry>, I>>(base?: I): OptionalsTest_TranslationsEntry {
    return OptionalsTest_TranslationsEntry.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OptionalsTest_TranslationsEntry>, I>>(
    object: I,
  ): OptionalsTest_TranslationsEntry {
    const message = createBaseOptionalsTest_TranslationsEntry();
    message.key = object.key ?? "";
    message.value = object.value ?? "";
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
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
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

  create<I extends Exact<DeepPartial<Child>, I>>(base?: I): Child {
    return Child.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Child>, I>>(_: I): Child {
    const message = createBaseChild();
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
  : T extends Long ? string | number | Long : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
