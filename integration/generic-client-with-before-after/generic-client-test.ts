import {
  BasicServiceClientImpl,
  BasicServiceServiceName,
  GetBasicRequest,
  GetBasicResponse,
} from './generic-client';
import {Observable, of} from "rxjs";
import {FooServiceClientImpl, FooServiceCreateRequest} from "../before-after-request/simple";

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

  let beforeRequest =  jest.fn();
  let afterResponse = jest.fn();
  
  it('correctly invokes before/after/request methods on Rpc', () => {
    rpc.request.mockReturnValue(Promise.resolve(expectedResponse));
    const client = new BasicServiceClientImpl({...rpc, beforeRequest:beforeRequest, afterResponse: afterResponse});

    const promise = client.Unary(request);

    expect(beforeRequest).toHaveBeenCalledWith(BasicServiceServiceName, "Unary", request);
    expect(rpc.request).toHaveBeenCalledWith(BasicServiceServiceName, "Unary", request, GetBasicRequest, GetBasicResponse);
    
    return promise.then((res) => {
      expect(res).toBe(expectedResponse);
      expect(afterResponse).toHaveBeenCalledWith(BasicServiceServiceName, "Unary", expectedResponse);  
    });
  });
  it('correctly invokes before/after/clientStreamingRequest methods on Rpc', () => {
    rpc.clientStreamingRequest.mockImplementation((service: string,
                                                       method: string,
                                                       request: Observable<GetBasicRequest>) => {
        request.subscribe((req) => {expect(req).toBe(request)});
        return Promise.resolve(expectedResponse);
    });
    
    const client = new BasicServiceClientImpl({...rpc, beforeRequest: beforeRequest, afterResponse: afterResponse});
    const reqObservable = of(request);
    const promise = client.ClientStreaming(reqObservable);

    expect(beforeRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ClientStreaming", request);
    expect(rpc.clientStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ClientStreaming", expect.anything(), GetBasicRequest, GetBasicResponse);
    return promise.then((res) => {
        expect(res).toBe(expectedResponse);
        expect(afterResponse).toHaveBeenCalledWith(BasicServiceServiceName, "ClientStreaming", expectedResponse);
    });
  });
  it('correctly invokes before/after/serverStreamingRequest methods on Rpc', () => {
    rpc.serverStreamingRequest.mockReturnValue(of(expectedResponse));

    const client = new BasicServiceClientImpl({...rpc, beforeRequest: beforeRequest, afterResponse: afterResponse});
    
    client.ServerStreaming(request).subscribe();
    
    expect(beforeRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ServerStreaming", request);
    expect(rpc.serverStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ServerStreaming", request, GetBasicRequest, GetBasicResponse);
    expect(afterResponse).toHaveBeenCalledWith(BasicServiceServiceName, "ServerStreaming", expectedResponse);
  });
  it('correctly invokes before/after/bidirectionalStreamingRequest methods on Rpc', () => {
    rpc.bidirectionalStreamingRequest.mockImplementation((service: string,
                                                   method: string,
                                                   request: Observable<GetBasicRequest>) => {
      request.subscribe((req) => {expect(req).toBe(request)});
      return of(expectedResponse)
    }); 

    const client = new BasicServiceClientImpl({...rpc, beforeRequest: beforeRequest, afterResponse: afterResponse});

    const reqObservable = of(request);
    client.BidiStreaming(reqObservable).subscribe();

    expect(beforeRequest).toHaveBeenCalledWith(BasicServiceServiceName, "BidiStreaming", request);
    expect(rpc.bidirectionalStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "BidiStreaming", expect.anything(), GetBasicRequest, GetBasicResponse);
    expect(afterResponse).toHaveBeenCalledWith(BasicServiceServiceName, "BidiStreaming", expectedResponse);
  });
  
  it("doesn't perform function before or after request if they are not specified", async () => {
    rpc.request.mockReturnValue(Promise.resolve(expectedResponse));
    const client = new BasicServiceClientImpl({ ...rpc });
    await client.Unary(request);
    expect(beforeRequest).not.toHaveBeenCalled();
    expect(afterResponse).not.toHaveBeenCalled();
  });
});
