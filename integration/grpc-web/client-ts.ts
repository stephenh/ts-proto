#!/usr/bin/env node

import { DashAPICredsClientImpl, DashStateClientImpl, GrpcWebImpl, DashUserSettingsState } from './example';
import { grpc } from '@improbable-eng/grpc-web';
import { Observable } from "rxjs";

const defTransport = grpc.CrossBrowserHttpTransport({ withCredentials: false });
const ws = grpc.WebsocketTransport()

const rpc = new GrpcWebImpl('http://localhost:9090', {
  transport: defTransport,
  debug: false,
  metadata: new grpc.Metadata({ SomeHeader: 'bar' }),
});

const client = new DashStateClientImpl(rpc);
const creds = new DashAPICredsClientImpl(rpc);

async function main() {
  console.log('calling client.UserSettings');
  console.log(await client.UserSettings({}));

  console.log('calling creds.Create');
  const cred = await creds.Create({ description: 'test desc fooo' });
  console.log(cred);

  console.log('calling creds.Delete');
  const del = await creds.Delete({ id: cred.id });
  console.log(del);

  console.log('calling creds.Update');
  try {
    await creds.Update({ description: 'test desc2' });
  } catch (e) {
    console.log('got expected error', e);
  }

  console.log('(server-stream) calling client.ActiveUserSettingsStream');
  const obs = client.ActiveUserSettingsStream({});
  await obs.forEach(value => {
    console.log("[server-stream] Got", value);
  });

  console.log('(client-stream) calling client.ManyUserSettingsStream');
  const clientStreamObs = new Observable(function subscribe(subscriber) {
    // Keep track of the interval resource
    let count = 0;
    const intervalId = setInterval(() => {
      if (count >= 10) {
	subscriber.complete();
	clearInterval(intervalId);
      }

      subscriber.next(DashUserSettingsState.fromPartial({ email: "ping@example.com" }));
      count++;

    }, 1000);
  });
  const manyObs = client.ManyUserSettingsStream(clientStreamObs, {
    rpcOptions: { transport: ws }
  });
  // will only receive one message when client stream finish.
  await manyObs.forEach(value => {
    console.log("[client-stream] Got", value);
  });

  console.log('(client-server bidirectional stream) calling client.ChangeUserSettingsStream');
  const reqObs = new Observable(function subscribe(subscriber) {
    // Keep track of the interval resource
    let count = 0;
    const intervalId = setInterval(() => {
      if (count >= 10) {
	subscriber.complete();
	clearInterval(intervalId);
      }

      subscriber.next(DashUserSettingsState.fromPartial({ email: "ping@example.com" }));
      count++;

    }, 1000);
  });
  const resObs = client.ChangeUserSettingsStream(reqObs, {
    rpcOptions: { transport: ws }
  })
  resObs.subscribe({
    next(x) { console.log("Stream Res", x) },
    error(err){ console.error(err) },
    complete() { console.log("Done") }
  });
}

main().then(
  () => console.log('done'),
  (err) => console.log('failed', err)
);
