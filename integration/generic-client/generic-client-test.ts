import {
  BasicServiceClientImpl,
  BasicServiceServiceName,
  GetBasicRequest,
  GetBasicResponse,
} from './generic-client';
import {Observable, of} from "rxjs";

describe('generic-client', () => {
  let rpc = {
    request: jest.fn(),
    clientStreamingRequest: jest.fn(),
    serverStreamingRequest: jest.fn(),
    bidirectionalStreamingRequest: jest.fn(),
  };
  const expectedResponse = GetBasicResponse.fromPartial({ resp: 'Rowan' });
  const request = GetBasicRequest.fromPartial({ name: 'Finn' });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('correctly invokes request on Rpc', () => {
    const client = new BasicServiceClientImpl(rpc);

    client.Unary(request);
    
    expect(rpc.request).toHaveBeenCalledWith(BasicServiceServiceName, "Unary", request, GetBasicRequest, GetBasicResponse);
  });
  it('correctly invokes clientStreamingRequest on Rpc', () => {
    const client = new BasicServiceClientImpl(rpc);

    const reqObservable = of(request);
    
    client.ClientStreaming(reqObservable);

    expect(rpc.clientStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ClientStreaming", reqObservable, GetBasicRequest, GetBasicResponse);
  });
  it('correctly invokes serverStreamingRequest call on Rpc', () => {
    const client = new BasicServiceClientImpl(rpc);

    client.ServerStreaming(request);

    expect(rpc.serverStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ServerStreaming", request, GetBasicRequest, GetBasicResponse);
  });
  it('correctly invokes bidirectionalStreamingRequest on Rpc', () => {
    const client = new BasicServiceClientImpl(rpc);

    const reqObservable = of(request);
    client.BidiStreaming(reqObservable);

    expect(rpc.bidirectionalStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "BidiStreaming", reqObservable, GetBasicRequest, GetBasicResponse);
  });
});
