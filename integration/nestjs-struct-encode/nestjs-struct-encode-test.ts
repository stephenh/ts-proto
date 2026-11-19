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
    const wrapped = Struct.wrapDeep({ a: { b: [1, "x", null] } });
    expect(wrapped.fields?.get("a")).toEqual({
      struct_value: {
        fields: new Map([
          ["b", { list_value: { values: [{ number_value: 1 }, { string_value: "x" }, { null_value: 0 }] } }],
        ]),
      },
    });
    expect(Struct.unwrapDeep(wrapped)).toEqual({ a: { b: [1, "x", null] } });
  });
});
