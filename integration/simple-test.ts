import { Reader, Writer } from "protobufjs";
import { decodeSimple, Simple } from '../build/ts_proto_tests';
import { ts_proto_tests as pbjs } from "../build/pbjs";
import ISimple = pbjs.ISimple;
import PbSimple = pbjs.Simple;
import PbChild = pbjs.Simple;

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = { name: 'asdf', age: 1, child: { name: 'child' } };
    expect(simple.name).toEqual('asdf');
  });

  it('can decode', () => {
    const s1: ISimple = { name: "asdf", age: 1, child: PbChild.fromObject({ name: 'foo' }) };
    const s2 = decodeSimple(Reader.create(PbSimple.encode(PbSimple.fromObject(s1)).finish()));
    expect(s2).toEqual(s1);
  });

  it('observes how pbjs handles null', () => {
    // the ISimple types are in theory only useful for construction
    const s1 = PbSimple.fromObject({ name: null, age: 1 });
    // as after construction, they return the empty string
    expect(s1.name).toEqual("");
    const s2 = PbSimple.decode(PbSimple.encode(s1).finish());
    expect(s2.name).toEqual("");
  });

  it('observes how pbjs handles undefined', () => {
    const s1 = PbSimple.fromObject({});
    expect(s1.name).toEqual("");
    expect(s1.age).toEqual(0);
    const s2 = PbSimple.decode(PbSimple.encode(s1).finish());
    expect(s2.name).toEqual("");
    expect(s2.age).toEqual(0);
  });
});
