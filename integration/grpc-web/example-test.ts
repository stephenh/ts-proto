import { DashStateClientImpl } from './example';

describe('grpc-web', () => {
  it('at least compiles', () => {
    // TODO move the hand-run `client-ts` integration into here, but for now
    // at least check that things compile
    const rpc = {
      unary: jest.fn(),
      invoke: jest.fn(),
    };
    const client = new DashStateClientImpl(rpc);
    client.UserSettings({});
  });
});
