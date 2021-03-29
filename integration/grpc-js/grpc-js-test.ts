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

    await new Promise<void>((resolve, reject) => {
      server.bindAsync('localhost:8081', ServerCredentials.createInsecure(), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    server.start();

    const client = new TestClient('localhost:8081', ChannelCredentials.createInsecure());

    client.unary({}, (err, res) => {});

    const serverStreamingCall = client.serverStreaming({ timestamp: new Date() });
    serverStreamingCall.on('data', (response) => {
      response.timestamp?.toISOString();
    });

    const clientStreamingCall = client.clientStreaming((err, res) => {
      res.timestamp?.toISOString();
    });
    clientStreamingCall.write({ timestamp: new Date() });
    clientStreamingCall.end();

    const bidiStreamingCall = client.bidiStreaming();
    bidiStreamingCall.write({ timestamp: new Date() });
    bidiStreamingCall.on('data', (response) => {
      response.timestamp?.toISOString();
      bidiStreamingCall.end();
    });

    setTimeout(() => {
      server.tryShutdown(() => {
        client.close();
      });
    }, 1000);
  });
});
