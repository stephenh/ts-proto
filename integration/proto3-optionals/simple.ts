/* eslint-disable */

export const protobufPackage = "simple";

export interface Simple {
  name: string;
  age?:
    | number
    | undefined;
  /** @deprecated */
  oldAddress?: Simple_OldAddress | undefined;
  newAddress?: Simple_NewAddress | undefined;
  email?: string | undefined;
  hasLoggedInRecently?: boolean | undefined;
  profilePic?: Uint8Array | undefined;
  luckyNumbers: number[];
  properties: { [key: string]: string };
}

export interface Simple_OldAddress {
  street?: string | undefined;
  city?: string | undefined;
}

export interface Simple_NewAddress {
  street?: string | undefined;
  city?: string | undefined;
  country?: string | undefined;
}

export interface Simple_PropertiesEntry {
  key: string;
  value: string;
}
