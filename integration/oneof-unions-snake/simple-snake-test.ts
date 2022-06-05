import { SimpleStruct  } from './simple';

describe('oneof=unions,snakeToCamel=false', () => {
  it('struct snake case', () => {
    const simple: SimpleStruct = {
      simple_struct: {
        any: 'any'
      }
    }
    expect(simple.simple_struct!['any']).toEqual('any')
  })
});
