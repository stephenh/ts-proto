#!/usr/bin/env node

import { TestServiceClientImpl, GrpcWebImpl, PingRequest } from './example';
import { grpc } from '@improbable-eng/grpc-web';
import { Observable } from "rxjs";
import { Empty } from './google/protobuf/empty';

const defTransport = grpc.CrossBrowserHttpTransport({ withCredentials: false });
const ws = grpc.WebsocketTransport()

const rpc = new GrpcWebImpl('http://localhost:9090', {
  transport: defTransport,
  debug: true,
  metadata: new grpc.Metadata({ SomeHeader: 'bar' }),
});

const client = new TestServiceClientImpl(rpc);

async function main() {
  console.log('calling client.PingEmpty');
  const pingEmptyObs = client.PingEmpty(Empty);
  await pingEmptyObs.forEach(message => {
    if (message.value !== "pong") {
      throw "PingEmpty error"
    }
  });

  console.log('calling client.Ping');
  const pingObs = client.Ping({ value: 'ping' });
  await pingObs.forEach(message => {
    if (message.value !== "ping") {
      throw "Ping error"
    }
  });

  console.log('calling client.PingError');
  const pingErrorObs = client.PingError({value: "ping"});
  pingErrorObs.subscribe({
    error(err){ console.error("Get except error", err) },
  });

  console.log('calling client.PingStream');
  const pingStreamSourceObs = new Observable(function subscribe(subscriber) {
    // Keep track of the interval resource
    let count = 0;
    const intervalId = setInterval(() => {
      if (count >= 10) {
	subscriber.complete();
	clearInterval(intervalId);
      }

      subscriber.next(PingRequest.fromPartial({ value: "ping"}));
      count++;

    }, 1000);
  });
  const pingStreamRes = client.PingStream(pingStreamSourceObs, {
    rpcOptions: { transport: ws }
  });
  // will only receive one message when client stream finish.
  await pingStreamRes.forEach(message => {
    console.log("[pingStream] Got", message);
  });

  console.log('(bidirectional stream) calling client.PingPongBidi');
  const bidiSourceObs = new Observable(function subscribe(subscriber) {
    // Keep track of the interval resource
    let count = 0;
    const intervalId = setInterval(() => {
      if (count >= 10) {
	subscriber.complete();
	clearInterval(intervalId);
      }

      subscriber.next(PingRequest.fromPartial({ value: "ping" }));
      count++;

    }, 1000);
  });
  const bidiObs = client.PingPongBidi(bidiSourceObs, {
    rpcOptions: { transport: ws }
  })
  bidiObs.subscribe({
    next(message) {
      if (message.value !== "ping") {
	throw "bidi-stream error"
      }
    },
    error(err){ console.error(err) },
    complete() { console.log("Done") }
  });
}

main().then(
  () => console.log('done'),
  (err) => console.log('failed', err)
);
