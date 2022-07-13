#!/usr/bin/env node

import { DashAPICredsClientImpl, DashStateClientImpl, GrpcWebImpl, DashUserSettingsState } from './example';
import { grpc } from '@improbable-eng/grpc-web';

const defTransport = grpc.CrossBrowserHttpTransport({ withCredentials: false });
const ws = grpc.WebsocketTransport()

const rpc = new GrpcWebImpl('http://localhost:9090', {
  transport: defTransport,
  debug: true,
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

  console.log('calling client.ActiveUserSettingsStream');
  const obs = client.ActiveUserSettingsStream({});
  await obs.forEach(value => {
    console.log("Got", value);
  });

  console.log('calling client.ChangeUserSettingsStream');
  const stream = client.ChangeUserSettingsStream({
    rpcOptions: { transport: ws }
  })
  stream.onMessage((res) => {
    console.log("onMessage", res)
  })
  setInterval(() => {
    stream.write(DashUserSettingsState.fromPartial({ email: "ping@email.com" }))
  }, 1000)
}

main().then(
  () => console.log('done'),
  (err) => console.log('failed', err)
);
