#!/usr/bin/env node

import { NodeHttpTransport } from '@improbable-eng/grpc-web-node-http-transport';
import { DashStateClientImpl, GrpcWebImpl } from './example';

const rpc = new GrpcWebImpl('http://localhost:9090', {
  transport: NodeHttpTransport(),
  debug: false,
});
const client = new DashStateClientImpl(rpc);

async function main() {
  console.log(await client.UserSettings({}));
}

main().then(
  () => console.log('done'),
  (err) => console.log(err)
);
