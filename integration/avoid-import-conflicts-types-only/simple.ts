/* eslint-disable */
import type { Simple as Simple2, SimpleEnum as SimpleEnum1 } from "./simple2";

export const protobufPackage = "simple";

export enum SimpleEnum {
  LOCAL_DEFAULT = 0,
  LOCAL_FOO = 1,
  LOCAL_BAR = 2,
  UNRECOGNIZED = -1,
}

export interface Simple {
  name: string;
  otherSimple: Simple2 | undefined;
}

export interface SimpleEnums {
  localEnum: SimpleEnum;
  importEnum: SimpleEnum1;
}
