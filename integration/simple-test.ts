import { Simple } from '../build/ts_proto_tests';

describe('simple', () => {
  it('works', () => {
    const simple: Simple = { name: 'asdf' };
    expect(simple.name).toEqual('asdf');
  });
});
