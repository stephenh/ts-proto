

export interface Simple {
  name: string;
  state: StateEnum;
}

export const protobufPackage = 'simple'

export enum StateEnum {
  UNKNOWN = "UNKNOWN",
  ON = "ON",
  OFF = "OFF",
  UNRECOGNIZED = "UNRECOGNIZED",
}
