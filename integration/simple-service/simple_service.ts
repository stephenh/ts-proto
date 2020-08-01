import { Simple } from './simple';
import { Reader } from 'protobufjs/minimal';

export interface SimpleService {
  Echo(request: Simple): Promise<Simple>;
}

export class SimpleServiceClientImpl implements SimpleService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  Echo(request: Simple): Promise<Simple> {
    const data = Simple.encode(request).finish();
    const promise = this.rpc.request('simple.SimpleService', 'Echo', data);
    return promise.then((data) => Simple.decode(new Reader(data)));
  }
}

export class SimpleServiceJsonClientImpl implements SimpleService {
  private readonly rpc: Rpc;

  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }

  Echo(request: Simple): Promise<Simple> {
    const data = Simple.toJSON(request);
    const promise = this.rpc.requestJson('simple.SimpleService', 'Echo', data);
    return promise.then((data) => Simple.fromJSON(data));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  requestJson(service: string, method: string, data: unknown): Promise<unknown>;
}
