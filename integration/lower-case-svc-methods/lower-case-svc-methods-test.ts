import { MathServiceClientImpl } from './math';

function getRpc() {
  return {
    request: jest.fn<any, any>(() => ({then: () => null}))
  };
}

function getContext() {
  const dataLoaderReturnValue = {load: jest.fn()};
  return {
    dataLoaderReturnValue,
    getDataLoader: jest.fn<any, any>(() => dataLoaderReturnValue)
  }
}

describe('lower-case-svc-methods', () => {
  it('lower-caseifies normal functions', () => {
    const rpc = getRpc(), ctx = getContext();
    const client = new MathServiceClientImpl(rpc);
    client.absoluteValue(ctx, {num: -1});

    expect(rpc.request).toBeCalledWith(ctx, 'MathService', 'AbsoluteValue', expect.any(Uint8Array));
  });
  it('lower-caseifies batch functions', () => {
    const rpc = getRpc(), ctx = getContext();
    const client = new MathServiceClientImpl(rpc);
    client.getDouble(ctx, -1);

    expect(ctx.getDataLoader).toBeCalledWith('MathService.BatchDouble', expect.any(Function));
    expect(ctx.dataLoaderReturnValue.load).toBeCalledWith(-1);
  });
});
