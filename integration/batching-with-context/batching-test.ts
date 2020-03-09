import { EntityServiceClientImpl, GetOnlyMethodResponse, WriteMethodResponse } from './batching';

/** A sample application context. */
class Context {
  private dataLoaders = new Map<string, any>();

  getDataLoader<T>(id: string, cstr: () => T): T {
    if (!this.dataLoaders.has(id)) {
      this.dataLoaders.set(id, cstr());
    }
    return this.dataLoaders.get(id);
  }
}

/** A pretend RPC impl that we avoid with mocks anyway. */
class Rpc<Context> {
  request(ctx: Context, service: string, method: string, data: Uint8Array): Promise<Uint8Array> {
    throw new Error('asdf');
  }
}

describe('batching', () => {
  it('batches array calls', async () => {
    const rpc = new Rpc();
    const service = new EntityServiceClientImpl<Context>(rpc);
    // mock out the batch call
    const request = (service.BatchQuery = jest.fn(() => {
      return Promise.resolve({ entities: [{ id: '1', name: 'one' }, { id: '2', name: 'two' }] });
    }));
    const ctx = new Context();
    await Promise.all([service.GetQuery(ctx, '1'), service.GetQuery(ctx, '2')]);
    expect(request.mock.calls.length).toBe(1);
  });

  it('batches map calls', async () => {
    const rpc = new Rpc();
    const service = new EntityServiceClientImpl<Context>(rpc);
    // mock out the batch call
    const request = (service.BatchMapQuery = jest.fn(() => {
      return Promise.resolve({ entities: { '1': { id: '1', name: 'one' }, '2': { id: '2', name: 'two' } } });
    }));
    const ctx = new Context();
    await Promise.all([service.GetMapQuery(ctx, '1'), service.GetMapQuery(ctx, '2')]);
    expect(request.mock.calls.length).toBe(1);
  });

  it('caches get calls', async () => {
    const rpc = new Rpc();
    const service = new EntityServiceClientImpl<Context>(rpc);
    const request = (rpc.request = jest.fn(() => {
      return Promise.resolve(GetOnlyMethodResponse.encode({ entity: { id: '1', name: 'one' } }).finish());
    }));
    const ctx = new Context();
    await Promise.all([service.GetOnlyMethod(ctx, { id: '1' }), service.GetOnlyMethod(ctx, { id: '1' })]);
    expect(request.mock.calls.length).toBe(1);
  });

  it('does not cache non-get calls', async () => {
    const rpc = new Rpc();
    const service = new EntityServiceClientImpl<Context>(rpc);
    const request = (rpc.request = jest.fn(() => {
      return Promise.resolve(WriteMethodResponse.encode({}).finish());
    }));
    const ctx = new Context();
    await Promise.all([service.WriteMethod(ctx, { id: '1' }), service.WriteMethod(ctx, { id: '1' })]);
    expect(request.mock.calls.length).toBe(2);
  });
});
