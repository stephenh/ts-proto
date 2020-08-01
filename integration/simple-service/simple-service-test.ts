import { SimpleServiceClientImpl, SimpleServiceJsonClientImpl } from './simple_service';
import { Simple, StateEnum, Child_Type } from './simple';

const simple: Simple = {
  name: 'asdf',
  age: 1,
  child: { name: 'child', type: Child_Type.UNKNOWN },
  state: StateEnum.ON,
  grandChildren: [
    { name: 'grand1', type: Child_Type.UNKNOWN },
    { name: 'grand2', type: Child_Type.UNKNOWN },
  ],
  coins: [2, 4, 6],
  snacks: ['a', 'b'],
  oldStates: [StateEnum.ON, StateEnum.OFF],
  createdAt: new Date('1970-01-01T00:00:00.000Z'),
  thing: undefined,
  blobs: [],
};

describe('simple service', () => {
  it('can echo with protobuf serialization', async () => {
    const echoRpc = {
      request: (_service: string, _method: string, data: Uint8Array) => {
        return Promise.resolve(data);
      },
      requestJson: (_service: string, _method: string, data: unknown) => {
        return Promise.resolve(data);
      },
    };

    const client = new SimpleServiceClientImpl(echoRpc);
    const response = await client.Echo(simple);
    expect(response).toEqual(simple);
  });

  it('can echo with json serialization', async () => {
    const jsonSerializedSimple = {
      name: 'asdf',
      age: 1,
      createdAt: '1970-01-01T00:00:00.000Z',
      child: { name: 'child', type: 'UNKNOWN' },
      state: 'ON',
      grandChildren: [
        { name: 'grand1', type: 'UNKNOWN' },
        { name: 'grand2', type: 'UNKNOWN' },
      ],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      oldStates: ['ON', 'OFF'],
      thing: undefined,
      blobs: [],
    };

    const echoRpc = {
      request: (_service: string, _method: string, data: Uint8Array) => {
        return Promise.resolve(data);
      },
      requestJson: (_service: string, _method: string, data: unknown) => {
        expect(data).toEqual(jsonSerializedSimple);
        return Promise.resolve(data);
      },
    };

    const client = new SimpleServiceJsonClientImpl(echoRpc);
    const response = await client.Echo(simple);
    expect(response).toEqual(simple);
  });
});
