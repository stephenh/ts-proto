#!/usr/bin/env node

import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { DashAPICredsClientImpl, DashStateClientImpl, GrpcWebImpl } from './example';

const rpc = new GrpcWebImpl('http://localhost:9090', {
  transport: NodeHttpTransport(),
  debug: false,
});

const client = new DashStateClientImpl(rpc);
const creds = new DashAPICredsClientImpl(rpc);

async function main() {
  console.log('calling client.UserSettings');
  console.log(await client.UserSettings({}));

  console.log('calling creds.Create');
  const cred = await creds.Create({ description: 'test desc fooo', metadata: 'test metadata' });
  console.log(cred);

  console.log('calling creds.Delete');
  const del = await creds.Delete({ id: cred.id, credSid: '' });
  console.log(del);

  console.log('calling creds.Update');
  try {
    await creds.Update({ description: 'test desc2', credSid: '', id: undefined, metadata: '' });
  } catch (e) {
    console.log('expected error', e.message);
  }
}

main().then(
  () => console.log('done'),
  (err) => console.log('failed', err)
);
