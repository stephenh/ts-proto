#!/usr/bin/env node

import { DashAPICredsClientImpl, DashStateClientImpl, GrpcWebImpl, DashUserSettingsState } from './example';
import { grpc } from '@improbable-eng/grpc-web';

const defTransport = grpc.CrossBrowserHttpTransport({ withCredentials: false });
const ws = grpc.WebsocketTransport();

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

  console.log('(server-stream) calling client.ActiveUserSettingsStream');
  const serverStream = await client.ActiveUserSettingsStream({});
  serverStream.on('data', (message) => console.log('(server-stream) message: ', message));
  serverStream.on('end', (status) => console.log('(server-stream) end: ', status));
  serverStream.on('status', (status) => console.log('(server-stream) status: ', status));

  console.log('(client-stream) calling client.ManyUserSettingsStream');
  const clientStream = await client.ManyUserSettingsStream({
    rpcOptions: { transport: ws },
  });
  // will only receive one message when client stream finish.
  clientStream.on('data', (message) => console.log('(client-stream) message: ', message));
  clientStream.on('end', (status) => console.log('(client-stream) end: ', status));
  clientStream.on('status', (status) => console.log('(client-stream) status: ', status));
  await (function () {
    return new Promise((resolve, _) => {
      let clientStreamCount = 0;
      const clientStreanIntervalId = setInterval(() => {
        if (clientStreamCount >= 10) {
          clientStream.end();
          clearInterval(clientStreanIntervalId);
          resolve(true);
          return;
        }
        clientStream.write({ email: 'ping@example.com' });
        clientStreamCount++;
      }, 1000);
    });
  })();

  console.log('(client-server bidirectional stream) calling client.ChangeUserSettingsStream');
  const bidirectional = await client.ChangeUserSettingsStream({
    rpcOptions: { transport: ws },
  });
  bidirectional.on('data', (message) => console.log('(bidirectional-stream) message: ', message));
  bidirectional.on('end', (status) => console.log('(bidirectional-stream) end: ', status));
  bidirectional.on('status', (status) => console.log('(bidirectional-stream) status: ', status));
  await (function () {
    return new Promise((resolve, _) => {
      let bidirectionalCount = 0;
      const biDiIntervalId = setInterval(() => {
        if (bidirectionalCount >= 10) {
          bidirectional.end();
          clearInterval(biDiIntervalId);
          resolve(true);
          return;
        }
        bidirectional.write({ email: 'ping@example.com' });
        bidirectionalCount++;
      }, 1000);
    });
  })();
}

main().then(
  () => console.log('done'),
  (err) => console.log('failed', err)
);
