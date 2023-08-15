import { EnumFields, Foo, Bar } from "./remove-enum-prefix-string-enums";

describe("nestjs-metadata-test", () => {
  it("compiles", () => {
    const msg: EnumFields = {
      foo: Foo.BAR,
      bar: Bar.BAZ,
    };
    const out = EnumFields.toJSON(msg);
    expect(out).not.toBeUndefined();
  });
});
