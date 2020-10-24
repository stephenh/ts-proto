import { Reader } from 'protobufjs';
import { Simple, StateEnum, Child } from './simple';
import { ImportedThing } from './import_dir/thing';
import { simple as pbjs } from './pbjs';
import PbSimple = pbjs.Simple;
import * as Long from 'long';

describe('simple-date-string', () => {
  it('generates types correctly', () => {
    const s: Simple = {
      name: 'simple',
      age: 0,
      child: Child.fromJSON({ name: 'test' }),
      state: StateEnum.UNKNOWN,
      createdAt: '2020-10-22T12:00:00.000Z',
      thing: ImportedThing.fromJSON({ createdAt: '2020-10-22T11:00:00.000Z' }),
      grandChildren: [Child.fromJSON({ name: 'test' })],
      coins: [],
      snacks: [],
      oldStates: [],
    };
    expect(typeof s.createdAt).toBe('string');
    expect(s.createdAt).toBe('2020-10-22T12:00:00.000Z');
  });

  it('can decode', () => {
    const s1: Simple = {
      name: 'simple',
      age: 0,
      child: Child.fromJSON({ name: 'test' }),
      state: StateEnum.UNKNOWN,
      createdAt: '2020-10-22T12:00:00.000Z',
      thing: undefined,
      grandChildren: [Child.fromJSON({ name: 'test' })],
      coins: [],
      snacks: [],
      oldStates: [],
    };
    const s2 = Simple.decode(
      Reader.create(PbSimple.encode(PbSimple.fromObject({ ...s1, createdAt: { seconds: 1603368000, nanos: 0 } })).finish())
    );
    expect(s2).toEqual(s1);
  });

  it('can encode', () => {
    const s1: Simple = {
      name: 'simple',
      age: 0,
      child: Child.fromJSON({ name: 'test' }),
      state: StateEnum.UNKNOWN,
      createdAt: '2020-10-22T12:00:00.000Z',
      thing: ImportedThing.fromJSON({ createdAt: '2020-10-22T11:00:00.000Z' }),
      grandChildren: [Child.fromJSON({ name: 'test' })],
      coins: [1],
      snacks: [''],
      oldStates: [StateEnum.UNKNOWN],
    };
    const s2 = PbSimple.toObject(PbSimple.decode(Simple.encode(s1).finish()));

    expect(s2).toEqual({
      ...s1,
      createdAt: { seconds: Long.fromNumber(1603368000), nanos: 0 },
      thing: {
        createdAt: { seconds: Long.fromNumber(1603364400), nanos: 0 }
      }
    });
  });
});
