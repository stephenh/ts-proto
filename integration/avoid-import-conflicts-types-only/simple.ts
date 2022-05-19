/* eslint-disable */

export const protobufPackage = 'simple';

export enum SimpleEnum {
LOCAL_DEFAULT = 0,
LOCAL_FOO = 1,
LOCAL_BAR = 2,
UNRECOGNIZED = -1,
}

export interface Simple {
name: string,
otherSimple: t:Simple@./simple2 | undefined,
}

export interface SimpleEnums {
localEnum: t:SimpleEnum@./simple,
importEnum: t:SimpleEnum@./simple2,
}









































