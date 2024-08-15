import {
  Foo,
  Bar,
  fooFromJSON,
  fooToJSON,
  barFromJSON,
  barToJSON,
  withNestedEnum_BazFromJSON,
  WithNestedEnum_Baz,
  withNestedEnum_BazToJSON,
  withNestedEnum_QuxFromJSON,
  withNestedEnum_QuxToJSON,
  WithNestedEnum_Qux,
} from "./remove-enum-prefix-unrecognized-enum-value";

describe("remove-enum-prefix-unrecognized-enum-value", () => {
  describe("encode correctly", () => {
    test.each([
      [Foo.UNSPECIFIED,"FOO_UNSPECIFIED"],
      [Foo.BAR,"FOO_BAR"],
    ])('fooToJSON(%s)', (object, expected) => {
      expect(fooToJSON(object)).toBe(expected);
    });
    
    test.each([
      [Bar.UNSPECIFIED,"BAR_UNSPECIFIED"],
      [Bar.BAZ,"BAZ"],
    ])('barToJSON(%s)', (object, expected) => {
      expect(barToJSON(object)).toBe(expected);
    });

    test.each([
      [WithNestedEnum_Baz.UNSPECIFIED,"BAZ_UNSPECIFIED"],
      [WithNestedEnum_Baz.ONE,"BAZ_ONE"],
    ])('withNestedEnum_BazToJSON(%s)', (object, expected) => {
      expect(withNestedEnum_BazToJSON(object)).toBe(expected);
    });

    test.each([
      [WithNestedEnum_Qux.UNSPECIFIED,"QUX_UNSPECIFIED"],
      [WithNestedEnum_Qux.ONE,"ONE"],
    ])('withNestedEnum_QuxToJSON(%s)', (object, expected) => {
      expect(withNestedEnum_QuxToJSON(object)).toBe(expected);
    });
  })

  describe("decode correctly", () => {
    test.each([
      ["FOO_UNSPECIFIED",  Foo.UNSPECIFIED],
      ["FOO_BAR", Foo.BAR],
      ["__UNRECOGNIZED__", Foo.UNSPECIFIED],
    ])('fooFromJSON(%s)', (object, expected) => {
      expect(fooFromJSON(object)).toBe(expected);
    });

    test.each([
      ["BAR_UNSPECIFIED",  Bar.UNSPECIFIED],
      ["BAZ", Bar.BAZ],
      ["__UNRECOGNIZED__", Bar.UNSPECIFIED],
    ])('barFromJSON(%s)', (object, expected) => {
      expect(barFromJSON(object)).toBe(expected);
    });

    test.each([
      ["BAZ_UNSPECIFIED",  WithNestedEnum_Baz.UNSPECIFIED],
      ["BAZ_ONE", WithNestedEnum_Baz.ONE],
      ["__UNRECOGNIZED__", WithNestedEnum_Baz.UNSPECIFIED],
    ])('withNestedEnum_BazFromJSON(%s)', (object, expected) => {
      expect(withNestedEnum_BazFromJSON(object)).toBe(expected);
    });

    test.each([
      ["QUX_UNSPECIFIED",  WithNestedEnum_Qux.UNSPECIFIED],
      ["ONE", WithNestedEnum_Qux.ONE],
      ["__UNRECOGNIZED__", WithNestedEnum_Qux.UNSPECIFIED],
    ])('withNestedEnum_QuxFromJSON(%s)', (object, expected) => {
      expect(withNestedEnum_QuxFromJSON(object)).toBe(expected);
    });
  })
});
