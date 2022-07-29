#!/usr/bin/env node

import { TestServiceClientImpl, GrpcWebImpl } from './example';
import { grpc } from '@improbable-eng/grpc-web';
import { Empty } from './google/protobuf/empty';

const defTransport = grpc.CrossBrowserHttpTransport({ withCredentials: false });
const ws = grpc.WebsocketTransport();

const rpc = new GrpcWebImpl('http://localhost:9090', {
  transport: defTransport,
  debug: true,
  metadata: new grpc.Metadata({ SomeHeader: 'bar' }),
});

const client = new TestServiceClientImpl(rpc);

async function main() {
  console.log('calling PingEmpty');
  let pingEmptyRes = await client.PingEmpty(Empty);
  if (pingEmptyRes.value !== 'pong') {
    throw 'pingEmpty error';
  }

  console.log('calling Ping');
  let pingRes = await client.Ping({ value: 'pingRes' });
  if (pingRes.value !== 'pingRes') {
    throw 'ping error';
  }

  let pingListRes = await client.PingList({ value: 'pingList' });
  pingListRes.on('data', (message) => console.log(message));
  pingListRes.on('end', (status) => console.log('PingList end ', status));
  pingListRes.on('status', (status) => console.log('PingList status ', status));
  await (() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        pingListRes.cancel();
        resolve(true);
      }, 5000);
    });
  })();

  console.log('(bidi-stream) calling client.PingPongBidi');
  let pingPongBidiRes = await client.PingPongBidi();
  let pingPongMessage = 'pingPong';
  pingPongBidiRes.on('data', (message) => {
    if (message.value !== pingPongMessage) {
      throw 'pingPongBidi error';
    }
  });
  pingPongBidiRes.on('end', (status) => console.log('PingList end ', status));
  pingPongBidiRes.on('status', (status) => console.log('PingList status ', status));
  await (() => {
    return new Promise((resolve) => {
      let id = setInterval(() => {
        pingPongBidiRes.write({ value: pingPongMessage });
      }, 1000);
      setTimeout(() => {
        clearInterval(id);
        pingPongBidiRes.end();
        resolve(true);
      }, 3000);
    }).then(() => {
      pingPongBidiRes.cancel();
    });
  })();

  const pingStreamRes = await client.PingStream();
  pingStreamRes.on('data', (message) => console.log('pingStream: ', message));
  pingStreamRes.on('end', (status) => console.log('pingStream end: ', status));
  pingStreamRes.on('status', (status) => console.log('pingStream status: ', status));
  await (() => {
    return new Promise((resolve) => {
      let id = setInterval(() => {
        pingStreamRes.write({ value: pingPongMessage });
      }, 1000);
      setTimeout(() => {
        clearInterval(id);
        pingStreamRes.end();
        resolve(true);
      }, 3000);
    }).then(() => {
      pingStreamRes.cancel();
    });
  })();
}

main().then(
  () => console.log('done'),
  (err) => console.log('failed', err)
);
