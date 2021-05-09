import { PingRequest, PingServiceClientImpl } from './simple';

describe('simple', () => {
  it('binds rpc function', () => {
    const rpc = {
      request: jest.fn().mockResolvedValue({}),
    };
    const client = new PingServiceClientImpl(rpc);
    const ping = client.ping;
    ping(PingRequest.fromPartial({}));
  })
})