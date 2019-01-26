import { ts_proto_tests } from "../build/pbjs";
import ISimple = ts_proto_tests.ISimple;
import PbSimple = ts_proto_tests.Simple;
import { Reader } from "protobufjs";

interface Simple {
  name: string;
}

function decode(reader: Reader, length?: number): Simple {
  let end = length === undefined ? reader.len : reader.pos + length;
  const message = {} as Simple;
  while (reader.pos < end) {
    const tag = reader.uint32();
    switch (tag >>> 3) {
      case 1:
        message.name = reader.string();
        break;
      default:
        reader.skipType(tag & 7);
        break;
    }
  }
  return message;
}

function main() {
  const s: ISimple = { name: "asdf" };
  const ss = new PbSimple(s);
  const writer = PbSimple.encode(ss);
  const bytes = writer.finish();
  console.log(bytes);

  const s2 = PbSimple.decode(bytes);
  console.log(s2.name);

  const s3 = decode(Reader.create(bytes));
  console.log(s3.name);

}


main();