import * as Long from 'long';
import { Numbers } from './simple';
import { Reader } from 'protobufjs';
import { simple as pbjs } from './pbjs';
import PbNumbers = pbjs.Numbers;

describe('numbers-long', () => {
  it('can decode', () => {
    const s1 = {
      double: 0,
      float: 1,
      int32: 2,
      int64: Long.fromNumber(3),
    };
    const s2 = Numbers.decode(Reader.create(PbNumbers.encode(PbNumbers.fromObject(s1)).finish()));
    expect(s2.double).toEqual(s1.double);
  });
});
