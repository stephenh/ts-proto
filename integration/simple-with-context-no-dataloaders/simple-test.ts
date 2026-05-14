import { EntityServiceClientImpl, GetOnlyMethodResponse, WriteMethodResponse } from './simple';

/**
 * A plain application context — note it does NOT implement getDataLoader or
 * rpcDataLoaderOptions. With useContextDataloaders=false, callers can use any
 * shape they like for `ctx` (e.g. a request object that just carries metadata).
 */
interface Context {
  traceId: string;
}

class Rpc<Context> {
  request(ctx: Context, service: string, method: string, data: Uint8Array): Promise<Uint8Array> {
    throw new Error('not implemented');
  }
}

describe('context without dataloaders', () => {
  it('passes ctx through without dataloader caching', async () => {
    const rpc = new Rpc<Context>();
    const service = new EntityServiceClientImpl<Context>(rpc);
    const request = (rpc.request = jest.fn(() => {
      return Promise.resolve(GetOnlyMethodResponse.encode({ entity: { id: '1', name: 'one' } }).finish());
    }));
    const ctx: Context = { traceId: 'abc' };
    await Promise.all([service.GetOnlyMethod(ctx, { id: '1' }), service.GetOnlyMethod(ctx, { id: '1' })]);
    // Without the DataLoader cache, both calls hit the rpc layer.
    expect(request.mock.calls.length).toBe(2);
    // ctx is passed through to the rpc layer unchanged.
    expect((request.mock.calls[0] as unknown[])[0]).toBe(ctx);
  });

  it('does not auto-generate a singular GetQuery from BatchQuery', () => {
    const rpc = new Rpc<Context>();
    const service = new EntityServiceClientImpl<Context>(rpc);
    expect((service as any).GetQuery).toBeUndefined();
  });

  it('forwards ctx to write methods', async () => {
    const rpc = new Rpc<Context>();
    const service = new EntityServiceClientImpl<Context>(rpc);
    const request = (rpc.request = jest.fn(() => {
      return Promise.resolve(WriteMethodResponse.encode({}).finish());
    }));
    const ctx: Context = { traceId: 'xyz' };
    await service.WriteMethod(ctx, { id: '1' });
    expect((request.mock.calls[0] as unknown[])[0]).toBe(ctx);
  });
});
