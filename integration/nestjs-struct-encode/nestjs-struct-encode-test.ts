import * as path from "path";
import * as protobuf from "protobufjs";
import { ListValue, Struct, Value } from "./google/protobuf/struct";
import { StructMessage } from "./struct";

const data = {
  name: "john",
  age: 30,
  pet: null,
  admin: false,
  posts: [{ id: 1, title: "hello world", public: true }, "x", [1, 2]],
};

describe("nestjs-struct-encode", () => {
  it("round-trips Struct through wrap, encode, decode and unwrap", () => {
    const bytes = Struct.encode(Struct.wrap(data)).finish();
    expect(Struct.unwrap(Struct.decode(bytes))).toEqual(data);
  });

  it("round-trips Value through wrap, encode, decode and unwrap", () => {
    for (const v of ["a", 1.5, true, null, [1, "b"], { a: { b: [1] } }]) {
      const bytes = Value.encode(Value.wrap(v)).finish();
      expect(Value.unwrap(Value.decode(bytes))).toEqual(v);
    }
  });

  it("round-trips ListValue through wrap, encode, decode and unwrap", () => {
    const bytes = ListValue.encode(ListValue.wrap(data.posts)).finish();
    expect(ListValue.unwrap(ListValue.decode(bytes))).toEqual(data.posts);
  });

  it("round-trips a message with Struct, Value and ListValue fields", () => {
    const message = { value: data, any: { a: [1] }, list: data.posts };
    const bytes = StructMessage.encode(message).finish();
    expect(StructMessage.decode(bytes)).toEqual(message);
  });

  it("still provides the deep wrappers for protobufjs", () => {
    const wrapped = Struct.wrapDeep({ a: { b: [1, "x", null] } }) as Struct;
    expect(wrapped.fields?.get("a")).toEqual({
      struct_value: {
        fields: new Map([
          ["b", { list_value: { values: [{ number_value: 1 }, { string_value: "x" }, { null_value: 0 }] } }],
        ]),
      },
    });
    expect(Struct.unwrapDeep(wrapped)).toEqual({ a: { b: [1, "x", null] } });
  });

  it("does not accept the protobufjs-shaped wrapDeep result as a message", () => {
    // @ts-expect-error wrapDeep is typed `unknown`, so it can't be passed to ts-proto's encode by accident
    Value.encode(Value.wrapDeep("hello"));
  });

  // protobufjs is an independent implementation of the wire format, so these catch mistakes that
  // a ts-proto only round trip would not, e.g. both directions agreeing on a wrong encoding.
  describe("compatibility with protobufjs", () => {
    const root = new protobuf.Root().loadSync(path.join(__dirname, "struct.proto"), { keepCase: true });
    const PbStruct = root.lookupType("google.protobuf.Struct");
    const PbListValue = root.lookupType("google.protobuf.ListValue");

    it("decodes a Struct encoded by ts-proto", () => {
      const message: any = PbStruct.decode(Struct.encode(Struct.wrap(data)).finish());
      expect(message.fields.name.stringValue).toEqual("john");
      expect(message.fields.age.numberValue).toEqual(30);
      expect(message.fields.pet.nullValue).toEqual(0);
      expect(message.fields.admin.boolValue).toEqual(false);
      expect(message.fields.posts.listValue.values).toHaveLength(3);
      expect(message.fields.posts.listValue.values[0].structValue.fields.id.numberValue).toEqual(1);
    });

    it("decodes a ListValue encoded by ts-proto", () => {
      const message: any = PbListValue.decode(ListValue.encode(ListValue.wrap(data.posts)).finish());
      expect(message.values.map((v: any) => v.kind)).toEqual(["structValue", "stringValue", "listValue"]);
    });

    it("decodes a Struct encoded by protobufjs", () => {
      const bytes = PbStruct.encode(
        PbStruct.create({
          fields: {
            name: { stringValue: "john" },
            age: { numberValue: 30 },
            pet: { nullValue: 0 },
            nested: { structValue: { fields: { a: { listValue: { values: [{ boolValue: true }] } } } } },
          },
        }),
      ).finish();
      expect(Struct.unwrap(Struct.decode(bytes))).toEqual({
        name: "john",
        age: 30,
        pet: null,
        nested: { a: [true] },
      });
    });
  });
});
