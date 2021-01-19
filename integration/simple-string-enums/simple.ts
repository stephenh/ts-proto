

function getGlobalThis() {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw new Error("Unable to locate global object");
}

export interface Simple {
  name: string;
  state: StateEnum;
}

declare var self: any | undefined;

declare var window: any | undefined;

var globalThis = getGlobalThis();

export const protobufPackage = 'simple'

export enum StateEnum {
  UNKNOWN = "UNKNOWN",
  ON = "ON",
  OFF = "OFF",
  UNRECOGNIZED = "UNRECOGNIZED",
}
