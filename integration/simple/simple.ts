import { Reader } from 'protobufjs/minimal';
import { ImportedThing } from './import_dir/thing';
import { DateMessage } from './google/type/date';

/* eslint-disable */

export const protobufPackage = 'simple';

/** Adding a comment to the syntax will become the first
 *  comment in the output source file. */

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

/** * Example comment on the Simple message */
export interface Simple {
  /** Name field */
  name: string;
  /** Age */
  age: number;
  /** This comment will also attach */
  createdAt: Date | undefined;
  child: Child | undefined;
  state: StateEnum;
  grandChildren: Child[];
  coins: number[];
  snacks: string[];
  oldStates: StateEnum[];
  /** A thing (imported from thing) */
  thing: ImportedThing | undefined;
  blobs: Uint8Array[];
  birthday: DateMessage | undefined;
  blob: Uint8Array;
}

export interface Child {
  name: string;
  type: Child_Type;
}

export enum Child_Type {
  UNKNOWN = 0,
  GOOD = 1,
  BAD = 2,
  UNRECOGNIZED = -1,
}
export function child_TypeFromJSON(object: any): Child_Type {
  switch (object) {
    case 0:
    case 'UNKNOWN':
      return Child_Type.UNKNOWN;

    case 1:
    case 'GOOD':
      return Child_Type.GOOD;

    case 2:
    case 'BAD':
      return Child_Type.BAD;

    case -1:
    case 'UNRECOGNIZED':
    default:
      return Child_Type.UNRECOGNIZED;
  }
}
export function child_TypeToJSON(object: Child_Type): string {
  switch (object) {
    case Child_Type.UNKNOWN:
      return 'UNKNOWN';
    case Child_Type.GOOD:
      return 'GOOD';
    case Child_Type.BAD:
      return 'BAD';
    default:
      return 'UNKNOWN';
  }
}

export interface Nested {
  name: string;
  message: Nested_InnerMessage | undefined;
  state: Nested_InnerEnum;
}

export enum Nested_InnerEnum {
  UNKNOWN_INNER = 0,
  GOOD = 100,
  BAD = 1000,
  UNRECOGNIZED = -1,
}
export function nested_InnerEnumFromJSON(object: any): Nested_InnerEnum {
  switch (object) {
    case 0:
    case 'UNKNOWN_INNER':
      return Nested_InnerEnum.UNKNOWN_INNER;

    case 100:
    case 'GOOD':
      return Nested_InnerEnum.GOOD;

    case 1000:
    case 'BAD':
      return Nested_InnerEnum.BAD;

    case -1:
    case 'UNRECOGNIZED':
    default:
      return Nested_InnerEnum.UNRECOGNIZED;
  }
}
export function nested_InnerEnumToJSON(object: Nested_InnerEnum): string {
  switch (object) {
    case Nested_InnerEnum.UNKNOWN_INNER:
      return 'UNKNOWN_INNER';
    case Nested_InnerEnum.GOOD:
      return 'GOOD';
    case Nested_InnerEnum.BAD:
      return 'BAD';
    default:
      return 'UNKNOWN';
  }
}

/** Comment for a nested message * / */
export interface Nested_InnerMessage {
  name: string;
  deep: Nested_InnerMessage_DeepMessage | undefined;
}

export interface Nested_InnerMessage_DeepMessage {
  name: string;
}

export interface OneOfMessage {
  first: string | undefined;
  last: string | undefined;
}

export interface SimpleWithWrappers {
  name: string | undefined;
  age: number | undefined;
  enabled: boolean | undefined;
  coins: number[];
  snacks: string[];
}

export interface Entity {
  id: number;
}

export interface SimpleWithMap {
  entitiesById: { [key: number]: Entity };
  nameLookup: { [key: string]: string };
  intLookup: { [key: number]: number };
  mapOfTimestamps: { [key: string]: Date };
  mapOfBytes: { [key: string]: Uint8Array };
}

export interface SimpleWithMap_EntitiesByIdEntry {
  key: number;
  value: Entity | undefined;
}

export interface SimpleWithMap_NameLookupEntry {
  key: string;
  value: string;
}

export interface SimpleWithMap_IntLookupEntry {
  key: number;
  value: number;
}

export interface SimpleWithMap_MapOfTimestampsEntry {
  key: string;
  value: Date | undefined;
}

export interface SimpleWithMap_MapOfBytesEntry {
  key: string;
  value: Uint8Array;
}

export interface SimpleWithSnakeCaseMap {
  entitiesById: { [key: number]: Entity };
}

export interface SimpleWithSnakeCaseMap_EntitiesByIdEntry {
  key: number;
  value: Entity | undefined;
}

export interface SimpleWithMapOfEnums {
  enumsById: { [key: number]: StateEnum };
}

export interface SimpleWithMapOfEnums_EnumsByIdEntry {
  key: number;
  value: StateEnum;
}

export interface PingRequest {
  input: string;
}

export interface PingResponse {
  output: string;
}

export interface Numbers {
  double: number;
  float: number;
  int32: number;
  int64: number;
  uint32: number;
  uint64: number;
  sint32: number;
  sint64: number;
  fixed32: number;
  fixed64: number;
  sfixed32: number;
  sfixed64: number;
}

/** * For testing proto3's field presence feature. */
export interface SimpleButOptional {
  /** Name field */
  name?: string | undefined;
  /** Age */
  age?: number | undefined;
  /** This comment will also attach */
  createdAt?: Date | undefined;
  child?: Child | undefined;
  state?: StateEnum | undefined;
  /** A thing (imported from thing) */
  thing?: ImportedThing | undefined;
  birthday?: DateMessage | undefined;
}

export interface Empty {}

const baseSimple: object = { name: '', age: 0, state: 0, coins: 0, snacks: '', oldStates: 0 };

const baseChild: object = { name: '', type: 0 };

const baseNested: object = { name: '', state: 0 };

const baseNested_InnerMessage: object = { name: '' };

const baseNested_InnerMessage_DeepMessage: object = { name: '' };

const baseOneOfMessage: object = {};

const baseSimpleWithWrappers: object = {};

const baseEntity: object = { id: 0 };

const baseSimpleWithMap: object = {};

const baseSimpleWithMap_EntitiesByIdEntry: object = { key: 0 };

const baseSimpleWithMap_NameLookupEntry: object = { key: '', value: '' };

const baseSimpleWithMap_IntLookupEntry: object = { key: 0, value: 0 };

const baseSimpleWithMap_MapOfTimestampsEntry: object = { key: '' };

const baseSimpleWithMap_MapOfBytesEntry: object = { key: '' };

const baseSimpleWithSnakeCaseMap: object = {};

const baseSimpleWithSnakeCaseMap_EntitiesByIdEntry: object = { key: 0 };

const baseSimpleWithMapOfEnums: object = {};

const baseSimpleWithMapOfEnums_EnumsByIdEntry: object = { key: 0, value: 0 };

const basePingRequest: object = { input: '' };

const basePingResponse: object = { output: '' };

const baseNumbers: object = {
  double: 0,
  float: 0,
  int32: 0,
  int64: 0,
  uint32: 0,
  uint64: 0,
  sint32: 0,
  sint64: 0,
  fixed32: 0,
  fixed64: 0,
  sfixed32: 0,
  sfixed64: 0,
};

const baseSimpleButOptional: object = {};

const baseEmpty: object = {};

export interface PingService {
  ping(request: PingRequest): Promise<PingResponse>;
}

export class PingServiceClientImpl implements PingService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  ping(request: PingRequest): Promise<PingResponse> {
    const data = PingRequest.encode(request).finish();
    const promise = this.rpc.request('simple.PingService', 'methodDesc.name', data);
    return promise.then((data) => PingResponse.decode(new Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}
