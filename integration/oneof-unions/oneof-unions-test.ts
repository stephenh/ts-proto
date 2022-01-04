import { google, oneof as pbjs } from './pbjs';
import { PleaseChoose } from './oneof';
import Value = google.protobuf.Value;

describe('oneof=unions', () => {
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
      choice: { $case: 'aNumber', aNumber: 132 },
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Bob'
    };
    const charlie: PleaseChoose = {
      name: 'Charlie',
      age: 42,
      choice: { $case: 'aMessage', aMessage: { name: 'charlie' } },
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Charlie'
    };
  });

  it('decode', () => {
    let encoded = pbjs.PleaseChoose.encode(
      new pbjs.PleaseChoose({
        name: 'Debbie',
        aBool: true,
        age: 37,
        or: 'perhaps not',
        value: new Value({ stringValue: 'Debbie' })
      })).finish();
    let decoded = PleaseChoose.decode(encoded);
    expect(decoded).toEqual({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
      signature: new Uint8Array(),
      value: 'Debbie'
    });
  });

  it('encode', () => {
    let encoded = PleaseChoose.encode({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Debbie'
    }).finish();
    let decoded = pbjs.PleaseChoose.decode(encoded);
    expect(decoded).toEqual({
      name: 'Debbie',
      aBool: true,
      age: 37,
      or: 'perhaps not',
      signature: Buffer.from([0xab, 0xcd]),
      value: new Value({ stringValue: 'Debbie' })
    });
  });

  it('fromPartial', () => {
    let empty = PleaseChoose.fromPartial({});
    expect(empty).toEqual({
      name: '',
      age: 0,
      signature: new Uint8Array(),
    });

    let partial = PleaseChoose.fromPartial({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
    });
    expect(partial).toEqual({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
    });
  });

  it('toJSON', () => {
    let debbie: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
      value: undefined
    };
    let pbjsJson = pbjs.PleaseChoose.decode(PleaseChoose.encode(debbie).finish()).toJSON();
    let json = PleaseChoose.toJSON(debbie);
    expect(json).toEqual(pbjsJson);
  });

  it('fromJSON', () => {
    let empty = PleaseChoose.fromJSON({});
    expect(empty).toEqual({ age: 0, name: '', signature: new Uint8Array() });

    let debbie: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
      signature: new Uint8Array([0xab, 0xcd]),
      value: 'Debbie'
    };
    let pbjsJson = pbjs.PleaseChoose.decode(PleaseChoose.encode(debbie).finish()).toJSON();
    let fromJson = PleaseChoose.fromJSON(pbjsJson);
    expect(fromJson).toEqual(debbie);
  });

  it('roundtrip', () => {
    let obj: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aNumber', aNumber: 42 },
      signature: Buffer.from([0xab, 0xcd]),
      value: new Value({ stringValue: 'Debbie' })
    };
    let encoded = PleaseChoose.encode(obj).finish();
    let decoded = PleaseChoose.decode(encoded);
    expect(decoded).toEqual(obj);
  });
});
