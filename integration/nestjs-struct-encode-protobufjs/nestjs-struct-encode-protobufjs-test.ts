import * as path from "path";
import * as protobuf from "protobufjs";
import { Struct } from "./google/protobuf/struct";
// Importing the generated file registers `wrapDeep`/`unwrapDeep` as protobufjs' wrapper for Struct.
import "./struct";

const data = {
  name: "john",
  age: 30,
  pet: null,
  admin: false,
  posts: [{ id: 1, title: "hello world", public: true }, "x", [1, 2]],
};

// With the default options the deep wrappers have the shape protobufjs' built-in Struct expects, which
// `snakeToCamel=false` or `useMapType=true` would change, so this covers them in their own case.
describe("nestjs-struct-encode-protobufjs", () => {
  const root = new protobuf.Root().loadSync(path.join(__dirname, "struct.proto"), { keepCase: true });
  const PbStruct = root.lookupType("google.protobuf.Struct");

  it("encodes the same bytes through the registered wrapper as ts-proto does", () => {
    const viaProtobufjs = PbStruct.encode(PbStruct.fromObject(data)).finish();
    const viaTsProto = Struct.encode(Struct.wrap(data)).finish();
    expect(Buffer.from(viaProtobufjs).toString("hex")).toEqual(Buffer.from(viaTsProto).toString("hex"));
  });

  it("converts what protobufjs decodes back to objects through the registered wrapper", () => {
    const bytes = Struct.encode(Struct.wrap(data)).finish();
    expect(PbStruct.toObject(PbStruct.decode(bytes))).toEqual(data);
  });
});
