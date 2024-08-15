import { PleaseChoose } from './oneof';
import * as pbjs from "./pbjs";
import pbjsValue = pbjs.google.protobuf.Value;

describe('oneof=unions-value', () => {
  it('generates types correctly', () => {
    const alice: PleaseChoose = {
      name: 'Alice',
      age: 42,
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Alice'
    };
    const bob: PleaseChoose = {
      name: 'Bob',
      age: 42,
      choice: { $case: 'aNumber', value: 132 },
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Bob'
    };
    const charlie: PleaseChoose = {
      name: 'Charlie',
      age: 42,
      choice: { $case: 'aMessage', value: { name: 'charlie' } },
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Charlie'
    };
  });

  it('decode', () => {
    let encoded = pbjs.oneof.PleaseChoose.encode(
      new pbjs.oneof.PleaseChoose({
        name: 'Debbie',
        aBool: true,
        age: 37,
        or: 'perhaps not',
        value: new pbjsValue({ stringValue: 'Debbie' })
      })).finish();
    let decoded = PleaseChoose.decode(encoded);
    expect(decoded).toEqual({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', value: true },
      eitherOr: { $case: 'or', value: 'perhaps not' },
      signature: new Uint8Array(0),
      value: 'Debbie'
    });
  });

  it('encode', () => {
    let encoded = PleaseChoose.encode({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', value: true },
      eitherOr: { $case: 'or', value: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Debbie'
    }).finish();
    let decoded = pbjs.oneof.PleaseChoose.decode(encoded);
    expect(decoded).toEqual({
      name: 'Debbie',
      aBool: true,
      age: 37,
      or: 'perhaps not',
      signature: new Uint8Array([0xab, 0xcd]),
      value: new pbjsValue({ stringValue: 'Debbie' })
    });
  });

  it('fromPartial', () => {
    let empty = PleaseChoose.fromPartial({});
    expect(empty).toEqual({
      name: '',
      age: 0,
      signature: new Uint8Array(0),
    });

    let partial = PleaseChoose.fromPartial({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', value: true },
      eitherOr: { $case: 'or', value: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
    });
    expect(partial).toEqual({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', value: true },
      eitherOr: { $case: 'or', value: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
    });
  });

  it('toJSON', () => {
    let debbie: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', value: true },
      eitherOr: { $case: 'or', value: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
      value: undefined
    };
    let pbjsJson = pbjs.oneof.PleaseChoose.decode(PleaseChoose.encode(debbie).finish()).toJSON();
    let json = PleaseChoose.toJSON(debbie);
    expect(json).toEqual(pbjsJson);
  });

  it('fromJSON', () => {
    let empty = PleaseChoose.fromJSON({});
    expect(empty).toEqual({ age: 0, name: '', signature: new Uint8Array(0) });

    let debbie: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', value: true },
      eitherOr: { $case: 'or', value: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Debbie'
    };
    let pbjsJson = pbjs.oneof.PleaseChoose.decode(PleaseChoose.encode(debbie).finish()).toJSON();

    // workaround because protobuf.js does not unwrap Value when decoding
    pbjsJson.value = pbjsJson.value.stringValue

    let fromJson = PleaseChoose.fromJSON(pbjsJson);
    expect(fromJson).toEqual(debbie);
  });

  it('roundtrip', () => {
    let obj: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aNumber', value: 42 },
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Debbie'
    };
    let encoded = PleaseChoose.encode(obj).finish();
    let decoded = PleaseChoose.decode(encoded);
    expect(decoded).toEqual(obj);
  });
});
