import { Extendable, Nested, packed, repeated, bytes, string, long, fixed, enumField, group, Enum } from "./test";
import Long = require("long");

describe("extensions-test", () => {
  it("works with namespaced extensions", () => {
    const test: Extendable = {
      field: "hello",
    };

    const extensionData = [
      {
        field: "a",
      },
      {
        field: "b",
      },
    ];

    Extendable.setExtension(test, Nested.message, extensionData);

    const encoded = Extendable.encode(test).finish();
    const result = Extendable.decode(encoded);

    expect(result).toEqual(test);

    const extension = Extendable.getExtension(result, Nested.message);

    expect(extension).toEqual(extensionData);

    const unsetExtension = Extendable.getExtension(result, packed);

    expect(unsetExtension).toEqual(undefined);
  });

  it("works with repeated fields", () => {
    const test: Extendable = {
      field: "repeated",

      _unknownFields: {
        [(6 << 3) | 2]: [new Uint8Array([1, 1]), new Uint8Array([1, 1])],
        [(6 << 3) | 0]: [new Uint8Array([2]), new Uint8Array([3]), new Uint8Array([5])],
      },
    };

    const extensionData = [1, 2, 3, 4, 5];

    Extendable.setExtension(test, packed, extensionData);

    const encoded = Extendable.encode(test).finish();
    const result = Extendable.decode(encoded);

    expect(result).toEqual(test);

    const extension = Extendable.getExtension(result, packed);

    expect(extension).toEqual(extensionData);

    expect(Extendable.getExtension(result, repeated)).toEqual([1, 1, 2, 3, 5]);

    const unsetExtension = Extendable.getExtension(result, Nested.message);

    expect(unsetExtension).toEqual(undefined);
  });

  it("works with various field types", () => {
    const test: Extendable = {
      field: "various",
    };

    const bytesExtensionData = new Uint8Array([2, 3, 5, 7, 11]);
    const stringExtensionData = "this is a string";
    const longExtensionData = new Long(0x89abcdef, 0x01234567, false);
    const fixedExtensionData = new Long(0x01234567, 0x89abcdef, true);
    const enumExtensionData = Enum.ENUM_ONE;
    const groupExtensionData = {
      name: "this is",
      value: "a group",
    };

    Extendable.setExtension(test, bytes, bytesExtensionData);
    Extendable.setExtension(test, string, stringExtensionData);
    Extendable.setExtension(test, long, longExtensionData);
    Extendable.setExtension(test, fixed, fixedExtensionData);
    Extendable.setExtension(test, enumField, enumExtensionData);
    Extendable.setExtension(test, group, groupExtensionData);

    const encoded = Extendable.encode(test).finish();
    const result = Extendable.decode(encoded);

    expect(result).toEqual(test);

    expect(Extendable.getExtension(result, bytes)).toEqual(bytesExtensionData);
    expect(Extendable.getExtension(result, string)).toEqual(stringExtensionData);
    expect(Extendable.getExtension(result, long)).toEqual(longExtensionData);
    expect(Extendable.getExtension(result, fixed)).toEqual(fixedExtensionData);
    expect(Extendable.getExtension(result, enumField)).toEqual(enumExtensionData);
    expect(Extendable.getExtension(result, group)).toEqual(groupExtensionData);

    const unsetExtension = Extendable.getExtension(result, Nested.message);

    expect(unsetExtension).toEqual(undefined);
  });
});
