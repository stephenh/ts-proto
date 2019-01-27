import { Reader } from 'protobufjs';
import { decodeSimple, encodeSimple, Simple, StateEnum } from '../build/ts_proto_tests';
import { ts_proto_tests as pbjs } from '../build/pbjs';
import ISimple = pbjs.ISimple;
import PbChild = pbjs.Child;
import PbSimple = pbjs.Simple;
import PbState = pbjs.StateEnum;

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = {
      name: 'asdf',
      age: 1,
      child: { name: 'child' },
      state: StateEnum.ON,
      grandchildren: [{ name: 'grand1' }, { name: 'grand2' }],
      coins: [2, 4, 6],
      snacks: ['a', 'b']
    };
    expect(simple.name).toEqual('asdf');
  });

  it('can decode', () => {
    const s1: ISimple = {
      name: 'asdf',
      age: 1,
      child: PbChild.fromObject({ name: 'foo' }),
      state: PbState.ON,
      grandchildren: [PbChild.fromObject({ name: 'grand1' }), PbChild.fromObject({ name: 'grand2' })],
      coins: [2, 4, 6],
      snacks: ['a', 'b']
    };
    const s2 = decodeSimple(Reader.create(PbSimple.encode(PbSimple.fromObject(s1)).finish()));
    expect(s2).toEqual(s1);
  });

  it('can encode', () => {
    const s1: Simple = {
      name: 'asdf',
      age: 1,
      child: { name: 'foo' },
      state: StateEnum.ON,
      grandchildren: [{ name: 'grand1' }, { name: 'grand2' }],
      coins: [2, 4, 6],
      snacks: ['a', 'b']
    };
    const s2 = PbSimple.toObject(PbSimple.decode(encodeSimple(s1).finish()));
    expect(s2).toEqual(s1);
  });

  it('observes how pbjs handles null', () => {
    // the ISimple types are in theory only useful for construction
    const s1 = PbSimple.fromObject({ name: null, age: 1 });
    // as after construction, they return the empty string
    expect(s1.name).toEqual('');
    const s2 = PbSimple.decode(PbSimple.encode(s1).finish());
    expect(s2.name).toEqual('');
  });

  it('observes how pbjs handles undefined', () => {
    const s1 = PbSimple.fromObject({});
    expect(s1.name).toEqual('');
    expect(s1.age).toEqual(0);
    const s2 = PbSimple.decode(PbSimple.encode(s1).finish());
    expect(s2.name).toEqual('');
    expect(s2.age).toEqual(0);
  });
});
