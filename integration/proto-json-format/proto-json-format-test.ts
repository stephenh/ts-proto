
import { Message } from "./proto-json-format";

describe("protoJSONFormat", () => {
  it("accepts camelCase", () => {
    const json = { myField: "foo" };
    const message = Message.fromJSON(json);
    expect(message).toEqual({ myField: "foo", secondField: "" });
  });

  it("accepts snake_case", () => {
    const json = { my_field: "foo", second_field: "bar" };
    const message = Message.fromJSON(json);
    expect(message).toEqual({ myField: "foo", secondField: "bar" });
  });

  it("accepts custom json name", () => {
    const json = { myCustomName: "foo" };
    const message = Message.fromJSON(json);
    expect(message).toEqual({ myField: "", secondField: "foo" });
  });

  it("outputs camelCase and custom json name", () => {
    const message: Message = { myField: "foo", secondField: "bar" };
    const json = Message.toJSON(message);
    expect(json).toEqual({ myField: "foo", myCustomName: "bar" });
  });
});
