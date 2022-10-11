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
  it('overrides service id correctly', async () => {
    const customServiceID = 'custom-service-id';
    const rpc = {
      request: async (service: string, method: string, data: Uint8Array): Promise<Uint8Array> => {
        expect(service).toBe(customServiceID)
        expect(method).toBe("ping")
        expect(data.length).toBe(0)
        return new Uint8Array(0)
      },
    };
    const client = new PingServiceClientImpl(rpc, {service: customServiceID});
    const ping = client.ping;
    await ping(PingRequest.fromPartial({}));
  })
})
