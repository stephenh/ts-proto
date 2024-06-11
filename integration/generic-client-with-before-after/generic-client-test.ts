import {
  BasicServiceClientImpl,
  BasicServiceServiceName,
  GetBasicRequest,
  GetBasicResponse,
} from './generic-client';
import {Observable} from "rxjs";
// import {EMPTY, Observable} from 'rxjs';
// import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';

describe('generic-client', () => {
  it('at least compiles', () => {
    const rpc = {
      request: jest.fn(),
      clientStreamingRequest: jest.fn(),
      serverStreamingRequest: jest.fn(),
      bidirectionalStreamingRequest: jest.fn(),
    };
    const client = new BasicServiceClientImpl(rpc);
    client.Unary(GetBasicRequest.fromPartial({}));
  });
  it('binds rpc function', () => {
    const rpc = {
      request: jest.fn(),
      clientStreamingRequest: jest.fn(),
      serverStreamingRequest: jest.fn(),
      bidirectionalStreamingRequest: jest.fn(),
    };
    const client = new BasicServiceClientImpl(rpc);
    const unary = client.Unary;
    unary(GetBasicRequest.fromPartial({}));
  });
  it('correctly invokes request on Rpc', () => {
    const rpc = {
      request: jest.fn(),
      clientStreamingRequest: jest.fn(),
      serverStreamingRequest: jest.fn(),
      bidirectionalStreamingRequest: jest.fn(),
    };
    const client = new BasicServiceClientImpl(rpc);

    const req = GetBasicRequest.fromPartial({ name: 'Joe' });
    client.Unary(GetBasicRequest.fromPartial({ name: 'Joe' }));
    
    expect(rpc.request).toHaveBeenCalledWith(BasicServiceServiceName, "Unary", req, GetBasicRequest, GetBasicResponse);
  });
  it('correctly invokes clientStreamingRequest on Rpc', () => {
    const rpc = {
      request: jest.fn(),
      clientStreamingRequest: jest.fn(),
      serverStreamingRequest: jest.fn(),
      bidirectionalStreamingRequest: jest.fn(),
    };
    const client = new BasicServiceClientImpl(rpc);

    const clientStream = new Observable<GetBasicRequest>((subscriber) => {
      subscriber.next(GetBasicRequest.fromPartial({ name: 'Test Foo'}));
      subscriber.complete();
    });
    client.ClientStreaming(clientStream);

    expect(rpc.clientStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ClientStreaming", clientStream, GetBasicRequest, GetBasicResponse);
  });
  it('correctly invokes serverStreamingRequest call on Rpc', () => {
    const rpc = {
      request: jest.fn(),
      clientStreamingRequest: jest.fn(),
      serverStreamingRequest: jest.fn(),
      bidirectionalStreamingRequest: jest.fn(),
    };
    const client = new BasicServiceClientImpl(rpc);

    const req = GetBasicRequest.fromPartial({ name: 'Joe' });
    client.ServerStreaming(GetBasicRequest.fromPartial({ name: 'Joe' }));

    expect(rpc.serverStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "ServerStreaming", req, GetBasicRequest, GetBasicResponse);
  });
  it('correctly invokes bidirectionalStreamingRequest on Rpc', () => {
    const rpc = {
      request: jest.fn(),
      clientStreamingRequest: jest.fn(),
      serverStreamingRequest: jest.fn(),
      bidirectionalStreamingRequest: jest.fn(),
    };
    const client = new BasicServiceClientImpl(rpc);

    const clientStream = new Observable<GetBasicRequest>((subscriber) => {
      subscriber.next(GetBasicRequest.fromPartial({ name: 'Test Foo'}));
      subscriber.complete();
    });
    client.BidiStreaming(clientStream);

    expect(rpc.bidirectionalStreamingRequest).toHaveBeenCalledWith(BasicServiceServiceName, "BidiStreaming", clientStream, GetBasicRequest, GetBasicResponse);
  });
});
