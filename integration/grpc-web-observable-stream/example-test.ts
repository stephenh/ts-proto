import { TestServiceClientImpl } from './example';
import { Empty } from './google/protobuf/empty';
import { EMPTY } from 'rxjs';

describe('grpc-web', () => {
  const rpc = {
    unary: jest.fn(),
    invoke: jest.fn(),
    stream: jest.fn(),
  };
  const client = new TestServiceClientImpl(rpc);

  it('pingEmpty', async () => {
    client.PingEmpty(Empty);
  });

  it('ping', () => {
    client.Ping({ value: 'ping' });
  });

  it('pingError', () => {
    client.PingError({ value: 'ping' });
  });

  it('pingList', () => {
    client.PingList({ value: 'ping' });
  });

  it('pingList', () => {
    client.PingPongBidi(EMPTY);
  });

  it('pingList', () => {
    client.PingStream(EMPTY);
  });
});
