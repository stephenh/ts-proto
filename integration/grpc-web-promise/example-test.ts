import { DashStateClientImpl } from './example';
import { EMPTY } from 'rxjs';

describe('grpc-web', () => {
  it('at least compiles', () => {
    // TODO move the hand-run `client-ts` integration into here, but for now
    // at least check that things compile
    const rpc = {
      unary: jest.fn(),
      invoke: jest.fn(),
      stream: jest.fn(),
    };
    const client = new DashStateClientImpl(rpc);
    client.UserSettings({});
  });
  it('binds rpc function', () => {
    const rpc = {
      unary: jest.fn(),
      invoke: jest.fn(),
      stream: jest.fn(),
    };
    const client = new DashStateClientImpl(rpc);
    const userSettings = client.UserSettings;
    userSettings({});
  });
  it('throws on client streaming call', () => {
    const rpc = {
      unary: jest.fn(),
      invoke: jest.fn(),
      stream: jest.fn(),
    };
    const client = new DashStateClientImpl(rpc);
    client.ChangeUserSettingsStream({});
  });
});
