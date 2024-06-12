import {
    BasicServiceClientImpl,
    BasicServiceServiceName,
    GetBasicRequest,
    GetBasicResponse,
} from './generic-client';

describe('generic-client with asyncIterable and before/after', () => {
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

    it('correctly invokes afterResponse and clientStreamingRequest methods on Rpc', () => {
        rpc.clientStreamingRequest.mockReturnValue(Promise.resolve(expectedResponse));

        const client = new BasicServiceClientImpl({...rpc, beforeRequest: beforeRequest, afterResponse: afterResponse});
        const asyncIterable = (async function*() {}())
        const promise = client.ClientStreaming(asyncIterable);

        expect(rpc.clientStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ClientStreaming", asyncIterable, GetBasicRequest, GetBasicResponse);
        return promise.then((res) => {
            expect(res).toBe(expectedResponse);
            expect(afterResponse).toHaveBeenCalledWith(BasicServiceServiceName, "ClientStreaming", expectedResponse);
        });
    });
    it('correctly invokes beforeRequest and serverStreamingRequest methods on Rpc', () => {
        const asyncIterable = (async function*() {}())
        rpc.serverStreamingRequest.mockReturnValue(asyncIterable);

        const client = new BasicServiceClientImpl({...rpc, beforeRequest: beforeRequest, afterResponse: afterResponse});

        const resp = client.ServerStreaming(request);

        expect(beforeRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ServerStreaming", request);
        expect(rpc.serverStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ServerStreaming", request, GetBasicRequest, GetBasicResponse);
        expect(resp).toBe(asyncIterable);
    });
    it('correctly invokes bidirectionalStreamingRequest on Rpc', () => {
        const response = (async function*() {}())
        rpc.bidirectionalStreamingRequest.mockReturnValue(response);

        const client = new BasicServiceClientImpl({...rpc, beforeRequest: beforeRequest, afterResponse: afterResponse});

        const req= (async function*() {}())
        const resp = client.BidiStreaming(req)

        expect(rpc.bidirectionalStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "BidiStreaming", req, GetBasicRequest, GetBasicResponse);
        expect(resp).toBe(response);
    });
});
