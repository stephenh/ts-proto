/**
 * @jest-environment node
 */
import { Server, ChannelCredentials, ServerCredentials } from '@grpc/grpc-js';
import { TestClient, TestServer, TestService } from './simple';

describe('grpc-js-test', () => {
  it('compiles', () => {
    expect(TestService).not.toBeUndefined();
  });

  it('can create a server and a client', async () => {
    const server = new Server();

    const impl: TestServer = {
      unary(call, callback) {
        callback(null, call.request);
      },
      serverStreaming(call) {
        call.write({
          timestamp: call.request.timestamp,
        });
        call.end();
      },
      clientStreaming(call, callback) {
        call.on('data', (request) => {
          callback(null, {
            timestamp: request.timestamp,
          });
        });
      },
      bidiStreaming(call) {
        call.on('data', (request) => {
          call.write({
            timestamp: request.timestamp,
          });
        });
        call.on('end', () => {
          call.end();
        });
      },
    };

    server.addService(TestService, impl);

    const port = await new Promise<number>((resolve, reject) => {
      server.bindAsync('localhost:0', ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
          reject(err);
        } else {
          resolve(port);
        }
      });
    });
    server.start();

    const client = new TestClient(`localhost:${port}`, ChannelCredentials.createInsecure());

    expect.assertions(4);

    client.unary({}, (err, res) => {
      expect(res).toEqual({});
    });

    const timestamp = new Date();

    const serverStreamingCall = client.serverStreaming({ timestamp });
    serverStreamingCall.on('data', (response) => {
      expect(response.timestamp).toEqual(timestamp);
    });

    const clientStreamingCall = client.clientStreaming((err, res) => {
      expect(res.timestamp).toEqual(timestamp);
    });
    clientStreamingCall.write({ timestamp });
    clientStreamingCall.end();

    const bidiStreamingCall = client.bidiStreaming();
    bidiStreamingCall.write({ timestamp });
    bidiStreamingCall.on('data', (response) => {
      expect(response.timestamp).toEqual(timestamp);
      bidiStreamingCall.end();
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        server.tryShutdown(() => {
          client.close();

          resolve();
        });
      }, 100);
    });
  });
});
