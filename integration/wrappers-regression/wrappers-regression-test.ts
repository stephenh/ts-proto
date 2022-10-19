import { Clock } from './wrappers-regression';

import {
  Timestamp,
} from "./google/protobuf/timestamp";
import {
  BoolValue,
  StringValue
} from "./google/protobuf/wrappers";

const jan1 = new Date('1970-01-01T00:00:00.000Z');
const feb1 = new Date('1970-02-01T00:00:00.000Z');

describe('wrappers in service methods', () => {
  it('generates a services that compiles', () => {
    let c: Clock = {
      Now: () => Promise.resolve(Timestamp.fromPartial({ seconds: 0, nanos: 0 })),
      NowString: (inp: StringValue) => Promise.resolve(inp),
      NowBool: () => Promise.resolve(BoolValue.fromPartial({ value: true }))
    };
  });
});
