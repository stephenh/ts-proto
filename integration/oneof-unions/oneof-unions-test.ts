import { oneof as pbjs } from './pbjs';
import { PleaseChoose } from './oneof'

describe('oneof=unions', () => {
  it('generates types correctly', () => {
    const alice: PleaseChoose = {name: 'Alice', age: 42};
    const bob: PleaseChoose = {name: 'Bob', age: 42, choice: {$case: 'aNumber', aNumber: 132}};
    const charlie: PleaseChoose = {name: 'Charlie', age: 42, choice: {$case: 'aMessage', aMessage: {name: 'charlie'}}};
  });

  it('decode', () => {
    let encoded = pbjs.PleaseChoose.encode(new pbjs.PleaseChoose({
      name: 'Debbie',
      aBool: true,
      age: 37,
      or: 'perhaps not',
    })).finish();
    let decoded = PleaseChoose.decode(encoded);
    expect(decoded).toEqual({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
    });
  });

  it('encode', () => {
    let encoded = PleaseChoose.encode({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
    }).finish();
    let decoded =  pbjs.PleaseChoose.decode(encoded);
    expect(decoded).toEqual({
      name: 'Debbie',
      aBool: true,
      age: 37,
      or: 'perhaps not',
    });
  });


  it('fromPartial', () => {
    let empty = PleaseChoose.fromPartial({})
    expect(empty).toEqual({
      name: '',
      age: 0,
    });

    let partial = PleaseChoose.fromPartial({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
    });
    expect(partial).toEqual({
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
    });
  });

  it('toJSON', () => {
    let debbie: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
    };
    let pbjsJson = pbjs.PleaseChoose.decode(PleaseChoose.encode(debbie).finish()).toJSON();
    let json = PleaseChoose.toJSON(debbie);
    expect(json).toEqual(pbjsJson);
  });

  it('fromJSON', () => {
    let empty = PleaseChoose.fromJSON({})
    expect(empty).toEqual({
      name: '',
      age: 0,
      choice: undefined,
      eitherOr: undefined,
    })

    let debbie: PleaseChoose = {
      name: 'Debbie',
      age: 37,
      choice: { $case: 'aBool', aBool: true },
      eitherOr: { $case: 'or', or: 'perhaps not' },
    };
    let pbjsJson = pbjs.PleaseChoose.decode(PleaseChoose.encode(debbie).finish()).toJSON();
    let fromJson = PleaseChoose.fromJSON(pbjsJson)
    expect(fromJson).toEqual(debbie)
  });
});
