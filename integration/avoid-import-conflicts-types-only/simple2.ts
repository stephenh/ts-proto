/* eslint-disable */
export const protobufPackage = 'simple2';

export enum SimpleEnum {
  IMPORT_DEFAULT = 0,
  IMPORT_FOO = 10,
  IMPORT_BAR = 11,
  UNRECOGNIZED = -1,
}

export interface Simple {
  simple2Name: string;
  simple2Age: number;
}
