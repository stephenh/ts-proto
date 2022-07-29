import { TestServiceClientImpl } from './example';
import { Empty } from './google/protobuf/empty';

describe('grpc-web', () => {
  const rpc = {
    unary: jest.fn(),
    invoke: jest.fn(),
    stream: jest.fn(),
  };
  const client = new TestServiceClientImpl(rpc);

  it('pingEmpty', () => {
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

  it('pingPongBidi', () => {
    client.PingPongBidi();
  });

  it('pingStream', () => {
    client.PingStream();
  });
});
