/* eslint-disable */

export const protobufPackage = "";

export interface Test {
}

export enum Test_TestType {
  TEST_TYPE_UNSPECIFIED = 0,
  TEST_TYPE_EVENT = 1,
  TEST_TYPE_METRIC = 2,
  TEST_TYPE_DERIVED = 3,
  UNRECOGNIZED = -1,
}

export function test_TestTypeToJSON(object: Test_TestType): string {
  switch (object) {
    case Test_TestType.TEST_TYPE_UNSPECIFIED:
      return "TEST_TYPE_UNSPECIFIED";
    case Test_TestType.TEST_TYPE_EVENT:
      return "TEST_TYPE_EVENT";
    case Test_TestType.TEST_TYPE_METRIC:
      return "TEST_TYPE_METRIC";
    case Test_TestType.TEST_TYPE_DERIVED:
      return "TEST_TYPE_DERIVED";
    case Test_TestType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export const Test = {
  toJSON(_: Test): unknown {
    const obj: any = {};
    return obj;
  },
};
