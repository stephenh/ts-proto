import { GetBasicRequest } from './only-types-grpc-metadata';

describe('BasicService', () => {
  it('compiles', () => {
    const g: GetBasicRequest = { name: 'asdf' };
    expect(g).toBeTruthy();
  });
});
