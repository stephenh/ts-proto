import { oneof as pbjs } from './pbjs';
import { PleaseChoose } from './oneof';

describe('oneof=properties (default)', () => {
  it('generates types correctly', () => {
    const alice: PleaseChoose = {
      name: 'Alice',
      age: 42,
      aNumber: undefined,
      aString: undefined,
      aMessage: undefined,
      aBool: undefined,
      bunchaBytes: undefined,
      anEnum: undefined,
      either: undefined,
      or: undefined,
      thirdOption: undefined,
    };
    const bob: PleaseChoose = {
      name: 'Bob',
      age: 42,
      aNumber: 132,
      aString: undefined,
      aMessage: undefined,
      aBool: undefined,
      bunchaBytes: undefined,
      anEnum: undefined,
      either: undefined,
      or: undefined,
      thirdOption: undefined,
    };
  });

  it('decode', () => {
    let encoded = pbjs.PleaseChoose.encode(
      new pbjs.PleaseChoose({
        name: 'Debbie',
        aBool: true,
        age: 37,
        or: 'perhaps not',
      })
    ).finish();
    let decoded = PleaseChoose.decode(encoded);
    expect(decoded).toEqual({
      name: 'Debbie',
      age: 37,
      aNumber: undefined,
      aString: undefined,
      aMessage: undefined,
      aBool: true,
      bunchaBytes: undefined,
      either: undefined,
      or: 'perhaps not',
      thirdOption: undefined,
    });
  });

  it('encode', () => {
    let encoded = PleaseChoose.encode({
      name: 'Debbie',
      age: 37,
      aNumber: undefined,
      aString: undefined,
      aMessage: undefined,
      aBool: true,
      bunchaBytes: undefined,
      anEnum: undefined,
      either: undefined,
      or: 'perhaps not',
      thirdOption: undefined,
    }).finish();
    let decoded = pbjs.PleaseChoose.decode(encoded);
    expect(decoded).toEqual({
      name: 'Debbie',
      aBool: true,
      age: 37,
      or: 'perhaps not',
    });
  });

  it('fromPartial', () => {
    let empty = PleaseChoose.fromPartial({});
    expect(empty).toEqual({
      name: '',
      age: 0,
      aNumber: undefined,
      aString: undefined,
      aMessage: undefined,
      aBool: undefined,
      either: undefined,
      or: undefined,
      thirdOption: undefined,
    });

    let partial = PleaseChoose.fromPartial({
      name: 'Debbie',
      aBool: true,
      age: 37,
      or: 'perhaps not',
    });
    expect(partial).toEqual({
      name: 'Debbie',
      age: 37,
      aNumber: undefined,
      aString: undefined,
      aMessage: undefined,
      aBool: true,
      either: undefined,
      or: 'perhaps not',
      thirdOption: undefined,
    });
  });

  it('toJSON', () => {
    let debbie: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      aNumber: undefined,
      aString: undefined,
      aMessage: undefined,
      aBool: true,
      bunchaBytes: undefined,
      anEnum: undefined,
      either: undefined,
      or: 'perhaps not',
      thirdOption: undefined,
    };
    let pbjsJson = pbjs.PleaseChoose.decode(PleaseChoose.encode(debbie).finish()).toJSON();
    let json = PleaseChoose.toJSON(debbie);
    expect(json).toEqual(pbjsJson);
  });

  it('fromJSON', () => {
    let empty = PleaseChoose.fromJSON({});
    expect(empty).toEqual({
      name: '',
      age: 0,
      aNumber: undefined,
      aString: undefined,
      aMessage: undefined,
      aBool: undefined,
      either: undefined,
      or: undefined,
      thirdOption: undefined,
    });

    let debbie: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      aNumber: undefined,
      aString: undefined,
      aMessage: undefined,
      aBool: true,
      bunchaBytes: undefined,
      anEnum: undefined,
      either: undefined,
      or: 'perhaps not',
      thirdOption: undefined,
    };
    let pbjsJson = pbjs.PleaseChoose.decode(PleaseChoose.encode(debbie).finish()).toJSON();
    let fromJson = PleaseChoose.fromJSON(pbjsJson);
    expect(fromJson).toEqual(debbie);
  });
});
