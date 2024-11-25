// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// source: simple.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

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
  repLong: number[];
  repTruth: boolean[];
  repDescription: string[];
  repData: Uint8Array[];
  repFloat: number[];
  optId?: number | undefined;
  optChild?: Child | undefined;
  optState?: StateEnum | undefined;
  optLong?: number | undefined;
  optTruth?: boolean | undefined;
  optDescription?: string | undefined;
  optData?: Uint8Array | undefined;
  optFloat?: number | undefined;
  reqId: number;
  reqChild: Child;
  reqState: StateEnum;
  reqLong: number;
  reqTruth: boolean;
  reqDescription: string;
  reqData: Uint8Array;
  reqFloat: number;
  reqDefvalId: number;
  reqDefvalState: StateEnum;
  reqDefvalLong: number;
  reqDefvalTruth: boolean;
  reqDefvalDescription: string;
  reqDefvalData: Uint8Array;
  reqDefvalFloat: number;
  optDefvalId?: number | undefined;
  optDefvalState?: StateEnum | undefined;
  optDefvalLong?: number | undefined;
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
    optId: undefined,
    optChild: undefined,
    optState: undefined,
    optLong: undefined,
    optTruth: undefined,
    optDescription: undefined,
    optData: undefined,
    optFloat: undefined,
    reqId: 0,
    reqChild: createBaseChild(),
    reqState: 0,
    reqLong: 0,
    reqTruth: false,
    reqDescription: "",
    reqData: new Uint8Array(0),
    reqFloat: 0,
    reqDefvalId: 0,
    reqDefvalState: 0,
    reqDefvalLong: 0,
    reqDefvalTruth: false,
    reqDefvalDescription: "",
    reqDefvalData: new Uint8Array(0),
    reqDefvalFloat: 0,
    optDefvalId: undefined,
    optDefvalState: undefined,
    optDefvalLong: undefined,
    optDefvalTruth: undefined,
    optDefvalDescription: undefined,
    optDefvalData: undefined,
    optDefvalFloat: undefined,
    translations: {},
  };
}

export const OptionalsTest: MessageFns<OptionalsTest> = {
  encode(message: OptionalsTest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    writer.uint32(10).fork();
    for (const v of message.repId) {
      writer.int32(v);
    }
    writer.join();
    for (const v of message.repChild) {
      Child.encode(v!, writer.uint32(18).fork()).join();
    }
    writer.uint32(26).fork();
    for (const v of message.repState) {
      writer.int32(v);
    }
    writer.join();
    writer.uint32(34).fork();
    for (const v of message.repLong) {
      writer.int64(v);
    }
    writer.join();
    writer.uint32(42).fork();
    for (const v of message.repTruth) {
      writer.bool(v);
    }
    writer.join();
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
    writer.join();
    if (message.optId !== undefined && message.optId !== undefined) {
      writer.uint32(88).int32(message.optId);
    }
    if (message.optChild !== undefined) {
      Child.encode(message.optChild, writer.uint32(98).fork()).join();
    }
    if (message.optState !== undefined && message.optState !== 0) {
      writer.uint32(104).int32(message.optState);
    }
    if (message.optLong !== undefined && message.optLong !== undefined) {
      writer.uint32(112).int64(message.optLong);
    }
    if (message.optTruth !== undefined && message.optTruth !== undefined) {
      writer.uint32(120).bool(message.optTruth);
    }
    if (message.optDescription !== undefined && message.optDescription !== undefined) {
      writer.uint32(130).string(message.optDescription);
    }
    if (message.optData !== undefined && message.optData.length !== 0) {
      writer.uint32(138).bytes(message.optData);
    }
    if (message.optFloat !== undefined && message.optFloat !== undefined) {
      writer.uint32(149).float(message.optFloat);
    }
    if (message.reqId !== 0) {
      writer.uint32(168).int32(message.reqId);
    }
    if (message.reqChild !== undefined) {
      Child.encode(message.reqChild, writer.uint32(178).fork()).join();
    }
    if (message.reqState !== 0) {
      writer.uint32(184).int32(message.reqState);
    }
    if (message.reqLong !== 0) {
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
    if (message.reqDefvalId !== 0) {
      writer.uint32(248).int32(message.reqDefvalId);
    }
    if (message.reqDefvalState !== 0) {
      writer.uint32(264).int32(message.reqDefvalState);
    }
    if (message.reqDefvalLong !== 0) {
      writer.uint32(272).int64(message.reqDefvalLong);
    }
    if (message.reqDefvalTruth !== false) {
      writer.uint32(280).bool(message.reqDefvalTruth);
    }
    if (message.reqDefvalDescription !== "") {
      writer.uint32(290).string(message.reqDefvalDescription);
    }
    if (message.reqDefvalData.length !== 0) {
      writer.uint32(298).bytes(message.reqDefvalData);
    }
    if (message.reqDefvalFloat !== 0) {
      writer.uint32(309).float(message.reqDefvalFloat);
    }
    if (message.optDefvalId !== undefined && message.optDefvalId !== undefined) {
      writer.uint32(328).int32(message.optDefvalId);
    }
    if (message.optDefvalState !== undefined && message.optDefvalState !== 0) {
      writer.uint32(344).int32(message.optDefvalState);
    }
    if (message.optDefvalLong !== undefined && message.optDefvalLong !== undefined) {
      writer.uint32(352).int64(message.optDefvalLong);
    }
    if (message.optDefvalTruth !== undefined && message.optDefvalTruth !== undefined) {
      writer.uint32(360).bool(message.optDefvalTruth);
    }
    if (message.optDefvalDescription !== undefined && message.optDefvalDescription !== undefined) {
      writer.uint32(370).string(message.optDefvalDescription);
    }
    if (message.optDefvalData !== undefined && message.optDefvalData.length !== 0) {
      writer.uint32(378).bytes(message.optDefvalData);
    }
    if (message.optDefvalFloat !== undefined && message.optDefvalFloat !== undefined) {
      writer.uint32(389).float(message.optDefvalFloat);
    }
    Object.entries(message.translations).forEach(([key, value]) => {
      OptionalsTest_TranslationsEntry.encode({ key: key as any, value }, writer.uint32(402).fork()).join();
    });
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): OptionalsTest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOptionalsTest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
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
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.repChild.push(Child.decode(reader, reader.uint32()));
          continue;
        }
        case 3: {
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
        }
        case 4: {
          if (tag === 32) {
            message.repLong.push(longToNumber(reader.int64()));

            continue;
          }

          if (tag === 34) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.repLong.push(longToNumber(reader.int64()));
            }

            continue;
          }

          break;
        }
        case 5: {
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
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.repDescription.push(reader.string());
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.repData.push(reader.bytes());
          continue;
        }
        case 8: {
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
        }
        case 11: {
          if (tag !== 88) {
            break;
          }

          message.optId = reader.int32();
          continue;
        }
        case 12: {
          if (tag !== 98) {
            break;
          }

          message.optChild = Child.decode(reader, reader.uint32());
          continue;
        }
        case 13: {
          if (tag !== 104) {
            break;
          }

          message.optState = reader.int32() as any;
          continue;
        }
        case 14: {
          if (tag !== 112) {
            break;
          }

          message.optLong = longToNumber(reader.int64());
          continue;
        }
        case 15: {
          if (tag !== 120) {
            break;
          }

          message.optTruth = reader.bool();
          continue;
        }
        case 16: {
          if (tag !== 130) {
            break;
          }

          message.optDescription = reader.string();
          continue;
        }
        case 17: {
          if (tag !== 138) {
            break;
          }

          message.optData = reader.bytes();
          continue;
        }
        case 18: {
          if (tag !== 149) {
            break;
          }

          message.optFloat = reader.float();
          continue;
        }
        case 21: {
          if (tag !== 168) {
            break;
          }

          message.reqId = reader.int32();
          continue;
        }
        case 22: {
          if (tag !== 178) {
            break;
          }

          message.reqChild = Child.decode(reader, reader.uint32());
          continue;
        }
        case 23: {
          if (tag !== 184) {
            break;
          }

          message.reqState = reader.int32() as any;
          continue;
        }
        case 24: {
          if (tag !== 192) {
            break;
          }

          message.reqLong = longToNumber(reader.int64());
          continue;
        }
        case 25: {
          if (tag !== 200) {
            break;
          }

          message.reqTruth = reader.bool();
          continue;
        }
        case 26: {
          if (tag !== 210) {
            break;
          }

          message.reqDescription = reader.string();
          continue;
        }
        case 27: {
          if (tag !== 218) {
            break;
          }

          message.reqData = reader.bytes();
          continue;
        }
        case 28: {
          if (tag !== 229) {
            break;
          }

          message.reqFloat = reader.float();
          continue;
        }
        case 31: {
          if (tag !== 248) {
            break;
          }

          message.reqDefvalId = reader.int32();
          continue;
        }
        case 33: {
          if (tag !== 264) {
            break;
          }

          message.reqDefvalState = reader.int32() as any;
          continue;
        }
        case 34: {
          if (tag !== 272) {
            break;
          }

          message.reqDefvalLong = longToNumber(reader.int64());
          continue;
        }
        case 35: {
          if (tag !== 280) {
            break;
          }

          message.reqDefvalTruth = reader.bool();
          continue;
        }
        case 36: {
          if (tag !== 290) {
            break;
          }

          message.reqDefvalDescription = reader.string();
          continue;
        }
        case 37: {
          if (tag !== 298) {
            break;
          }

          message.reqDefvalData = reader.bytes();
          continue;
        }
        case 38: {
          if (tag !== 309) {
            break;
          }

          message.reqDefvalFloat = reader.float();
          continue;
        }
        case 41: {
          if (tag !== 328) {
            break;
          }

          message.optDefvalId = reader.int32();
          continue;
        }
        case 43: {
          if (tag !== 344) {
            break;
          }

          message.optDefvalState = reader.int32() as any;
          continue;
        }
        case 44: {
          if (tag !== 352) {
            break;
          }

          message.optDefvalLong = longToNumber(reader.int64());
          continue;
        }
        case 45: {
          if (tag !== 360) {
            break;
          }

          message.optDefvalTruth = reader.bool();
          continue;
        }
        case 46: {
          if (tag !== 370) {
            break;
          }

          message.optDefvalDescription = reader.string();
          continue;
        }
        case 47: {
          if (tag !== 378) {
            break;
          }

          message.optDefvalData = reader.bytes();
          continue;
        }
        case 48: {
          if (tag !== 389) {
            break;
          }

          message.optDefvalFloat = reader.float();
          continue;
        }
        case 50: {
          if (tag !== 402) {
            break;
          }

          const entry50 = OptionalsTest_TranslationsEntry.decode(reader, reader.uint32());
          if (entry50.value !== undefined) {
            message.translations[entry50.key] = entry50.value;
          }
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OptionalsTest {
    return {
      repId: globalThis.Array.isArray(object?.repId) ? object.repId.map((e: any) => globalThis.Number(e)) : [],
      repChild: globalThis.Array.isArray(object?.repChild) ? object.repChild.map((e: any) => Child.fromJSON(e)) : [],
      repState: globalThis.Array.isArray(object?.repState) ? object.repState.map((e: any) => stateEnumFromJSON(e)) : [],
      repLong: globalThis.Array.isArray(object?.repLong) ? object.repLong.map((e: any) => globalThis.Number(e)) : [],
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
      optLong: isSet(object.optLong) ? globalThis.Number(object.optLong) : undefined,
      optTruth: isSet(object.optTruth) ? globalThis.Boolean(object.optTruth) : undefined,
      optDescription: isSet(object.optDescription) ? globalThis.String(object.optDescription) : undefined,
      optData: isSet(object.optData) ? bytesFromBase64(object.optData) : undefined,
      optFloat: isSet(object.optFloat) ? globalThis.Number(object.optFloat) : undefined,
      reqId: globalThis.Number(assertSet("OptionalsTest.reqId", object.reqId)),
      reqChild: Child.fromJSON(assertSet("OptionalsTest.reqChild", object.reqChild)),
      reqState: stateEnumFromJSON(assertSet("OptionalsTest.reqState", object.reqState)),
      reqLong: globalThis.Number(assertSet("OptionalsTest.reqLong", object.reqLong)),
      reqTruth: globalThis.Boolean(assertSet("OptionalsTest.reqTruth", object.reqTruth)),
      reqDescription: globalThis.String(assertSet("OptionalsTest.reqDescription", object.reqDescription)),
      reqData: bytesFromBase64(assertSet("OptionalsTest.reqData", object.reqData)),
      reqFloat: globalThis.Number(assertSet("OptionalsTest.reqFloat", object.reqFloat)),
      reqDefvalId: globalThis.Number(assertSet("OptionalsTest.reqDefvalId", object.reqDefvalId)),
      reqDefvalState: stateEnumFromJSON(assertSet("OptionalsTest.reqDefvalState", object.reqDefvalState)),
      reqDefvalLong: globalThis.Number(assertSet("OptionalsTest.reqDefvalLong", object.reqDefvalLong)),
      reqDefvalTruth: globalThis.Boolean(assertSet("OptionalsTest.reqDefvalTruth", object.reqDefvalTruth)),
      reqDefvalDescription: globalThis.String(
        assertSet("OptionalsTest.reqDefvalDescription", object.reqDefvalDescription),
      ),
      reqDefvalData: bytesFromBase64(assertSet("OptionalsTest.reqDefvalData", object.reqDefvalData)),
      reqDefvalFloat: globalThis.Number(assertSet("OptionalsTest.reqDefvalFloat", object.reqDefvalFloat)),
      optDefvalId: isSet(object.optDefvalId) ? globalThis.Number(object.optDefvalId) : undefined,
      optDefvalState: isSet(object.optDefvalState) ? stateEnumFromJSON(object.optDefvalState) : undefined,
      optDefvalLong: isSet(object.optDefvalLong) ? globalThis.Number(object.optDefvalLong) : undefined,
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
      obj.repLong = message.repLong.map((e) => Math.round(e));
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
    if (message.optId !== undefined && message.optId !== undefined) {
      obj.optId = Math.round(message.optId);
    }
    if (message.optChild !== undefined) {
      obj.optChild = Child.toJSON(message.optChild);
    }
    if (message.optState !== undefined && message.optState !== 0) {
      obj.optState = stateEnumToJSON(message.optState);
    }
    if (message.optLong !== undefined && message.optLong !== undefined) {
      obj.optLong = Math.round(message.optLong);
    }
    if (message.optTruth !== undefined && message.optTruth !== undefined) {
      obj.optTruth = message.optTruth;
    }
    if (message.optDescription !== undefined && message.optDescription !== undefined) {
      obj.optDescription = message.optDescription;
    }
    if (message.optData !== undefined && message.optData.length !== 0) {
      obj.optData = base64FromBytes(message.optData);
    }
    if (message.optFloat !== undefined && message.optFloat !== undefined) {
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
    if (message.reqLong !== 0) {
      obj.reqLong = Math.round(message.reqLong);
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
    if (message.reqDefvalId !== 0) {
      obj.reqDefvalId = Math.round(message.reqDefvalId);
    }
    if (message.reqDefvalState !== 0) {
      obj.reqDefvalState = stateEnumToJSON(message.reqDefvalState);
    }
    if (message.reqDefvalLong !== 0) {
      obj.reqDefvalLong = Math.round(message.reqDefvalLong);
    }
    if (message.reqDefvalTruth !== false) {
      obj.reqDefvalTruth = message.reqDefvalTruth;
    }
    if (message.reqDefvalDescription !== "") {
      obj.reqDefvalDescription = message.reqDefvalDescription;
    }
    if (message.reqDefvalData.length !== 0) {
      obj.reqDefvalData = base64FromBytes(message.reqDefvalData);
    }
    if (message.reqDefvalFloat !== 0) {
      obj.reqDefvalFloat = message.reqDefvalFloat;
    }
    if (message.optDefvalId !== undefined && message.optDefvalId !== undefined) {
      obj.optDefvalId = Math.round(message.optDefvalId);
    }
    if (message.optDefvalState !== undefined && message.optDefvalState !== 0) {
      obj.optDefvalState = stateEnumToJSON(message.optDefvalState);
    }
    if (message.optDefvalLong !== undefined && message.optDefvalLong !== undefined) {
      obj.optDefvalLong = Math.round(message.optDefvalLong);
    }
    if (message.optDefvalTruth !== undefined && message.optDefvalTruth !== undefined) {
      obj.optDefvalTruth = message.optDefvalTruth;
    }
    if (message.optDefvalDescription !== undefined && message.optDefvalDescription !== undefined) {
      obj.optDefvalDescription = message.optDefvalDescription;
    }
    if (message.optDefvalData !== undefined && message.optDefvalData.length !== 0) {
      obj.optDefvalData = base64FromBytes(message.optDefvalData);
    }
    if (message.optDefvalFloat !== undefined && message.optDefvalFloat !== undefined) {
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
    message.repLong = object.repLong?.map((e) => e) || [];
    message.repTruth = object.repTruth?.map((e) => e) || [];
    message.repDescription = object.repDescription?.map((e) => e) || [];
    message.repData = object.repData?.map((e) => e) || [];
    message.repFloat = object.repFloat?.map((e) => e) || [];
    message.optId = object.optId ?? undefined;
    message.optChild = (object.optChild !== undefined && object.optChild !== null)
      ? Child.fromPartial(object.optChild)
      : undefined;
    message.optState = object.optState ?? undefined;
    message.optLong = object.optLong ?? undefined;
    message.optTruth = object.optTruth ?? undefined;
    message.optDescription = object.optDescription ?? undefined;
    message.optData = object.optData ?? undefined;
    message.optFloat = object.optFloat ?? undefined;
    message.reqId = object.reqId ?? 0;
    message.reqChild = (object.reqChild !== undefined && object.reqChild !== null)
      ? Child.fromPartial(object.reqChild)
      : createBaseChild();
    message.reqState = object.reqState ?? 0;
    message.reqLong = object.reqLong ?? 0;
    message.reqTruth = object.reqTruth ?? false;
    message.reqDescription = object.reqDescription ?? "";
    message.reqData = object.reqData ?? new Uint8Array(0);
    message.reqFloat = object.reqFloat ?? 0;
    message.reqDefvalId = object.reqDefvalId ?? 0;
    message.reqDefvalState = object.reqDefvalState ?? 0;
    message.reqDefvalLong = object.reqDefvalLong ?? 0;
    message.reqDefvalTruth = object.reqDefvalTruth ?? false;
    message.reqDefvalDescription = object.reqDefvalDescription ?? "";
    message.reqDefvalData = object.reqDefvalData ?? new Uint8Array(0);
    message.reqDefvalFloat = object.reqDefvalFloat ?? 0;
    message.optDefvalId = object.optDefvalId ?? undefined;
    message.optDefvalState = object.optDefvalState ?? undefined;
    message.optDefvalLong = object.optDefvalLong ?? undefined;
    message.optDefvalTruth = object.optDefvalTruth ?? undefined;
    message.optDefvalDescription = object.optDefvalDescription ?? undefined;
    message.optDefvalData = object.optDefvalData ?? undefined;
    message.optDefvalFloat = object.optDefvalFloat ?? undefined;
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

export const OptionalsTest_TranslationsEntry: MessageFns<OptionalsTest_TranslationsEntry> = {
  encode(message: OptionalsTest_TranslationsEntry, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.key !== undefined) {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): OptionalsTest_TranslationsEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOptionalsTest_TranslationsEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OptionalsTest_TranslationsEntry {
    return {
      key: globalThis.String(assertSet("OptionalsTest_TranslationsEntry.key", object.key)),
      value: globalThis.String(assertSet("OptionalsTest_TranslationsEntry.value", object.value)),
    };
  },

  toJSON(message: OptionalsTest_TranslationsEntry): unknown {
    const obj: any = {};
    if (message.key !== undefined) {
      obj.key = message.key;
    }
    if (message.value !== undefined) {
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

export const Child: MessageFns<Child> = {
  encode(_: Child, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Child {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseChild();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
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
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

function assertSet<T>(field: string, value: T | undefined): T {
  if (!isSet(value)) {
    throw new TypeError(`Required field ${field} is not set`);
  }

  return value as T;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
