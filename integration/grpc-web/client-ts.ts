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
  const settingObs = client.UserSettings({});
  await settingObs.forEach(value => {
    console.log("[setting] Got", value);
  });

  console.log('calling creds.Create');
  const credObs = creds.Create({ description: 'test desc fooo' });
  let credId = undefined;
  await credObs.forEach(value => {
    credId = value.id;
    console.log("[create] Got", value);
  });

  console.log('calling creds.Delete');
  const delObs = creds.Delete({ id: credId });
  await delObs.forEach(value => {
    console.log("[delete] Got", value);
  });

  console.log('calling creds.Update');
  const updateObs = creds.Update({ description: 'test desc2' });
  updateObs.subscribe({
    next(x) { console.log("[update] Got", x) },
    error(err){ console.error('got expected error', err) },
    complete() { console.log("update Done") }
  });

  console.log('(server-stream) calling client.ActiveUserSettingsStream');
  const activeObs = client.ActiveUserSettingsStream({});
  await activeObs.forEach(value => {
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
