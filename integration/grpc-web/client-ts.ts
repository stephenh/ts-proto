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
  const del = await creds.Delete({
    id: cred.id,
    credSid: '...not included in original example...',
  });
  console.log(del);
}

main().then(
  () => console.log('done'),
  (err) => console.log('failed', err)
);
