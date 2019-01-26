import { decode, Simple } from '../build/ts_proto_tests';
import { ts_proto_tests } from "../build/pbjs";
import ISimple = ts_proto_tests.ISimple;
import PbSimple = ts_proto_tests.Simple;
import { Reader } from "protobufjs";

describe('simple', () => {
  it('generates types correctly', () => {
    const simple: Simple = { name: 'asdf', age: 1 };
    expect(simple.name).toEqual('asdf');
  });

  it('can decode', () => {
    const s: ISimple = { name: "asdf", age: 1 };
    const writer = PbSimple.encode(PbSimple.fromObject(s));
    const bytes = writer.finish();

    const s3 = decode(Reader.create(bytes));
    expect(s3).toEqual(s);
  });
});
