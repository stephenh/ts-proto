import { Reader } from 'protobufjs';
import { Child_Type, Nested, Nested_InnerEnum, Simple, SimpleWithMap, StateEnum } from '../build/integration/simple';
import { simple as pbjs, google } from '../build/integration/pbjs';
import ISimple = pbjs.ISimple;
import PbChild = pbjs.Child;
import PbSimple = pbjs.Simple;
import PbSimpleWithMap = pbjs.SimpleWithMap;
import PbState = pbjs.StateEnum;
import PbNested = pbjs.Nested;
import PbNested_InnerMessage = pbjs.Nested.InnerMessage;
import PbNested_DeepMessage = pbjs.Nested.InnerMessage.DeepMessage;
import PbNested_InnerEnum = pbjs.Nested.InnerEnum;
import INested = pbjs.INested;
import PbTimestamp = google.protobuf.Timestamp;
import Long from 'long';

const jan1 = new Date('1970-01-01T00:00:00.000Z');

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = {
      name: 'asdf',
      age: 1,
      child: { name: 'child', type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grandChildren: [{ name: 'grand1', type: Child_Type.UNKNOWN }, { name: 'grand2', type: Child_Type.UNKNOWN }],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      oldStates: [StateEnum.ON, StateEnum.OFF],
      createdAt: jan1
    };
    expect(simple.name).toEqual('asdf');
  });

  it('can decode', () => {
    const s1: ISimple = {
      name: 'asdf',
      age: 1,
      child: PbChild.fromObject({ name: 'foo' }),
      state: PbState.ON,
      grandChildren: [PbChild.fromObject({ name: 'grand1' }), PbChild.fromObject({ name: 'grand2' })],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      oldStates: [PbState.ON, PbState.OFF]
    };
    const s2 = Simple.decode(Reader.create(PbSimple.encode(PbSimple.fromObject(s1)).finish()));
    expect(s2).toEqual(s1);
  });

  it('can encode', () => {
    const s1: Simple = {
      name: 'asdf',
      age: 1,
      child: { name: 'foo', type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grandChildren: [{ name: 'grand1', type: Child_Type.UNKNOWN }, { name: 'grand2', type: Child_Type.UNKNOWN }],
      coins: [2, 4, 6],
      snacks: ['a', 'b'],
      oldStates: [StateEnum.ON, StateEnum.OFF],
      createdAt: jan1
    };
    const s2 = PbSimple.toObject(PbSimple.decode(Simple.encode(s1).finish()));
    expect(s2).toEqual({
      ...s1,
      createdAt: new PbTimestamp({ nanos: 0, seconds: new Long(0) })
    });
  });

  it('can decode and fallback to default values', () => {
    const s1: ISimple = {};
    const s2 = Simple.decode(Reader.create(PbSimple.encode(PbSimple.fromObject(s1)).finish()));
    expect(s2.name).toEqual('');
    expect(s2.age).toEqual(0);
    expect(s2.state).toEqual(StateEnum.UNKNOWN);
    expect(s2.grandChildren).toEqual([]);
    expect(s2.coins).toEqual([]);
    expect(s2.snacks).toEqual([]);
    expect(s2.oldStates).toEqual([]);
  });

  it('can encode inner types', () => {
    const s1: Nested = {
      name: 'asdf',
      message: {
        name: 'asdf',
        deep: { name: 'asdf' }
      },
      state: Nested_InnerEnum.GOOD
    };
    const s2 = PbNested.toObject(PbNested.decode(Nested.encode(s1).finish()));
    expect(s2).toEqual(s1);
  });

  it('can decode inner types', () => {
    const s1: INested = {
      name: 'asdf',
      message: PbNested_InnerMessage.fromObject({
        name: 'asdf',
        deep: PbNested_DeepMessage.fromObject({ name: 'asdf' })
      }),
      state: PbNested_InnerEnum.GOOD
    };
    const s2 = Nested.decode(Reader.create(PbNested.encode(PbNested.fromObject(s1)).finish()));
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

  it('observes how pbjs handles collections of default values', () => {
    const s1 = PbSimple.create({
      coins: [0, 1, 2]
    });
    const s2 = PbSimple.decode(PbSimple.encode(s1).finish());
    expect(s2.coins).toEqual([0, 1, 2]);
  });

  it('can encode collections with default values', () => {
    const s1: Simple = {
      name: 'asdf',
      age: 1,
      child: { name: 'foo', type: Child_Type.UNKNOWN },
      state: StateEnum.ON,
      grandChildren: [{ name: 'grand2', type: Child_Type.UNKNOWN }],
      coins: [0, 4, 6],
      snacks: ['', 'b'],
      oldStates: [StateEnum.UNKNOWN, StateEnum.OFF],
      createdAt: jan1
    };
    const s2 = PbSimple.toObject(PbSimple.decode(Simple.encode(s1).finish()));
    expect(s2).toEqual({
      ...s1,
      createdAt: new PbTimestamp({ nanos: 0, seconds: new Long(0) })
    });
  });

  it('can encode maps', () => {
    const s1: SimpleWithMap = {
      entitiesById: {
        1: { id: 1 },
        2: { id: 2 }
      }
    };
    const s2 = PbSimpleWithMap.toObject(PbSimpleWithMap.decode(SimpleWithMap.encode(s1).finish()));
    expect(s2).toEqual(s1);
  });

  it('can decode maps', () => {
    const s1 = PbSimpleWithMap.fromObject({
      entitiesById: {
        1: { id: 1 },
        2: { id: 2 }
      }
    });
    const s2 = SimpleWithMap.decode(new Reader(PbSimpleWithMap.encode(s1).finish()));
    expect(s2).toEqual(s1);
  });
});
