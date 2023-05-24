import { DashStateClientImpl, GrpcWebError, GrpcWebImpl } from './example';
import { EMPTY } from 'rxjs';
import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';

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
  it('throws on client streaming call', () => {
    const rpc = {
      unary: jest.fn(),
      invoke: jest.fn(),
    };
    const client = new DashStateClientImpl(rpc);
    const call = () => client.ChangeUserSettingsStream(EMPTY);
    expect(call).toThrowError('ts-proto does not yet support client streaming!');
  });

  it('throws error of type GrpcWebError', async () => {
    const client = new DashStateClientImpl(
      new GrpcWebImpl('', {
        transport: NodeHttpTransport(),
      })
    );

    try {
      await client.UserSettings({});
    } catch (e) {
      expect(e).toBeInstanceOf(GrpcWebError);

      if (e instanceof GrpcWebError) {
        expect(e.code).toBeDefined();
        expect(e.metadata).toBeDefined();
      }
    }
  });
});
