import {
  BasicServiceClientImpl,
  BasicServiceServiceName,
  GetBasicRequest,
  GetBasicResponse,
} from './generic-client';
import {Observable, of} from "rxjs";

describe('generic-client with error handling', () => {
  let rpc = {
    request: jest.fn(),
    clientStreamingRequest: jest.fn(),
    serverStreamingRequest: jest.fn(),
    bidirectionalStreamingRequest: jest.fn(),
    afterResponse: jest.fn(),
  };
  const expectedResponse = GetBasicResponse.fromPartial({ resp: 'Rowan' });
  const request = GetBasicRequest.fromPartial({ name: 'Finn' });
  beforeEach(() => {
    jest.clearAllMocks();
  });

  let handleError = jest.fn();
  const error = new Error();
  
  it('correctly invokes handleError on request', () => {
    rpc.request.mockImplementation(async () => {throw error});
    handleError.mockReturnValue("handleError");
    const client = new BasicServiceClientImpl({...rpc, handleError: handleError});

    return client.Unary(request).catch((e) => {
      expect(e).toBe("handleError");
      expect(handleError).toHaveBeenCalledWith(BasicServiceServiceName, "Unary", error);
    });
  });
  
  it('correctly invokes handleError on clientStreamingRequest', () => {
    rpc.clientStreamingRequest.mockImplementation(async (service: string,
                                                       method: string,
                                                       request: Observable<GetBasicRequest>) => {
        request.subscribe((req) => {expect(req).toBe(request)});
        throw error;
    });
    handleError.mockReturnValue("handleError");
    
    const client = new BasicServiceClientImpl({...rpc, handleError: handleError});
    const reqObservable = of(request);
    const promise = client.ClientStreaming(reqObservable);

    return promise.catch((e) => {
        expect(e).toBe("handleError");
        expect(handleError).toHaveBeenCalledWith(BasicServiceServiceName, "ClientStreaming", error);
    });
  });

  it('does not invoke handleError if undefined', () => {
    rpc.request.mockImplementation(async () => {throw error});
    const client = new BasicServiceClientImpl({...rpc});

    return client.Unary(request).catch((e) => {
      expect(e).toBe(error);
      expect(handleError).not.toHaveBeenCalled();
    });
  });
});
