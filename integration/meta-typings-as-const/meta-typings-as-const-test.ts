import { ProtoMetadata, protoMetadata } from "./simple";

describe("meta-typings-as-const", () => {
  it("generates types correctly", () => {
    // These checks wouldn't pass type checking without a lot of optional
    // chaining if we didn't use `as const` to declare the `protoMetadata`
    // export.

    expect(protoMetadata.options.enums.TestEnum.values.VALUE_A.string_value).toBe("A");

    // This assignment wouldn't type check without declaring `protoMetadata`
    // as `const`.
    const testMessageName: "Test" = protoMetadata.fileDescriptor.messageType[0].name;
    expect(testMessageName).toBe(testMessageName);

    const widened: ProtoMetadata = protoMetadata;

    // @ts-expect-error -- this doesn't typecheck without optional chaining
    expect(widened.options.enums.TestEnum.values.VALUE_A.string_value).toBe("A");
  });

  it("allows for typesafe schema inspections", () => {
    type TestEnumType = Extract<(typeof protoMetadata)["fileDescriptor"]["enumType"][number], { name: "TestEnum" }>;
    type TestEnumValue = TestEnumType["value"][number]["name"];
    type TestEnumOptionValues = (typeof protoMetadata)["options"]["enums"]["TestEnum"]["values"];

    function getTestEnumStringValue<V extends TestEnumValue>(value: V): TestEnumOptionValues[V]["string_value"] {
      return protoMetadata.options.enums.TestEnum.values[value].string_value;
    }

    const valueAStringValue: "A" = getTestEnumStringValue("VALUE_A");
    expect(valueAStringValue).toBe("A");

    const valueBStringValue: "B" = getTestEnumStringValue("VALUE_B");
    expect(valueBStringValue).toBe("B");

    expect(() => {
      // @ts-expect-error -- this shouldn't type check if metadata is declared as const
      // it also throws a type error at runtime, because VALUE_C isn't a valid
      // value of protoMetadata.options.enums.TestEnum.values
      getTestEnumStringValue("VALUE_C");
    }).toThrowError("Cannot read properties of undefined (reading 'string_value')");
  });
});
