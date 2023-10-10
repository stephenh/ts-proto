/* eslint-disable */

export const protobufPackage = "";

export enum StateEnum {
  UNKNOWN_STATE = "UNKNOWN_STATE",
  ON = "ON",
  OFF = "OFF",
}

export function stateEnumFromJSON(object: any): StateEnum {
  switch (object) {
    case 0:
    case "UNKNOWN_STATE":
      return StateEnum.UNKNOWN_STATE;
    case 2:
    case "ON":
      return StateEnum.ON;
    case 3:
    case "OFF":
      return StateEnum.OFF;
    default:
      return StateEnum.UNKNOWN_STATE;
  }
}

export function stateEnumToJSON(object: StateEnum): string {
  switch (object) {
    case StateEnum.UNKNOWN_STATE:
      return "UNKNOWN_STATE";
    case StateEnum.ON:
      return "ON";
    case StateEnum.OFF:
      return "OFF";
    default:
      return "UNKNOWN_STATE";
  }
}

export function stateEnumToNumber(object: StateEnum): number {
  switch (object) {
    case StateEnum.UNKNOWN_STATE:
      return 0;
    case StateEnum.ON:
      return 2;
    case StateEnum.OFF:
      return 3;
    default:
      return 0;
  }
}
