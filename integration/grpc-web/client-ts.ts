#!/usr/bin/env node

import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { DashAPICredsClientImpl, DashStateClientImpl, GrpcWebImpl } from './example';
import { grpc } from '@improbable-eng/grpc-web';

const rpc = new GrpcWebImpl('http://localhost:9090', {
  // Only necessary for tests running on node. Remove the
  // transport config when actually using in the browser.
  transport: NodeHttpTransport(),
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

  const obs = client.ActiveUserSettingsStream({});
  await obs.forEach((value) => {
    console.log('Got', value);
  });
}

main().then(
  () => console.log('done'),
  (err) => console.log('failed', err)
);
