import { Simple } from './simple';

describe('simple', () => {
  it('generates types correctly', () => {
    const decodedUndefined = Simple.decode(Simple.encode(Simple.fromPartial({})).finish());

    expect(Object.keys(decodedUndefined).includes('age')).toBeFalsy();
    expect(decodedUndefined.hasOwnProperty('age')).toBeFalsy();

    const decodedWithZero = Simple.decode(Simple.encode(Simple.fromPartial({
      age: 0
    })).finish());

    expect(Object.keys(decodedWithZero).includes('age')).toBeFalsy();
    expect(decodedWithZero.hasOwnProperty('age')).toBeFalsy();

    const decodedWithOne = Simple.decode(Simple.encode(Simple.fromPartial({
      age: 1
    })).finish());

    expect(Object.keys(decodedWithOne).includes('age')).toBeTruthy();
    expect(decodedWithOne.hasOwnProperty('age')).toBeTruthy();
  });
});
