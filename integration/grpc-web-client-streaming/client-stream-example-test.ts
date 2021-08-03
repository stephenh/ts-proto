import { DashStateClientImpl } from './client-stream-example';

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
  it('binds rpc function', () => {
    const rpc = {
      unary: jest.fn(),
      invoke: jest.fn(),
    };
    const client = new DashStateClientImpl(rpc);
    const userSettings = client.UserSettings;
    userSettings({});
  });
  it('checks that ChangeUserSettingsStream is undefined because client streaming', () => {
    const rpc = {
      unary: jest.fn(),
      invoke: jest.fn(),
    };
    const client = new DashStateClientImpl(rpc);
    //@ts-expect-error ChangeUserSettingsStream
    expect(client['ChangeUserSettingsStream']).toBeUndefined();
  });
});
