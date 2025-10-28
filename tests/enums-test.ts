import { Context } from "../src/context";
import { getMemberName } from "../src/enums";
import { makeUtils } from "../src/main";
import { Options, optionsFromParameter } from "../src/options";
import { EnumDescriptorProto, EnumValueDescriptorProto } from "ts-proto-descriptors";

const contextFromParameter = (parameter?: string): Context => {
  const opts: Options = optionsFromParameter(parameter);
  return {
    options: opts,
    typeMap: new Map(),
    utils: makeUtils(opts),
    currentFile: {
      isProto3Syntax: true,
    },
  };
};

const defaultContext = contextFromParameter(undefined);
const removePrefixContext = contextFromParameter("removeEnumPrefix=true");

const createEnumDescriptor = (name: string, values: EnumValueDescriptorProto[]): EnumDescriptorProto => ({
  name,
  value: values,
  options: undefined,
  reservedRange: [],
  reservedName: [],
});

const EnumWithoutNumerics = createEnumDescriptor("NoNumerics", [
  { name: "NO_NUMERICS_FIRST_VALUE", number: 0, options: undefined },
  { name: "NO_NUMERICS_SECOND_VALUE", number: 1, options: undefined },
]);

const EnumWithSomeNumerics = createEnumDescriptor("SomeNumerics", [
  { name: "SOME_NUMERICS_FIRST_VALUE", number: 0, options: undefined },
  { name: "SOME_NUMERICS_2", number: 1, options: undefined },
]);

const EnumWithAllNumerics = createEnumDescriptor("AllNumerics", [
  { name: "ALL_NUMERICS_1", number: 0, options: undefined },
  { name: "ALL_NUMERICS_2", number: 1, options: undefined },
]);

const EnumWithNumericInfinity = createEnumDescriptor("NumericInfinity", [
  { name: "NUMERIC_INFINITY_Infinity", number: 0, options: undefined },
]);

const EnumWithNonNumericInfinity = createEnumDescriptor("NonNumericInfinity", [
  { name: "NON_NUMERIC_INFINITY_INFINITY", number: 0, options: undefined },
]);

const EnumWithNumberLetter = createEnumDescriptor("NumberLetter", [
  { name: "NUMBER_LETTER_1A", number: 0, options: undefined },
]);

const EnumWithLeadingZeroes = createEnumDescriptor("LeadingZeroes", [
  { name: "LEADING_ZEROES_0001", number: 1, options: undefined },
]);

const EnumWithAlternatingChars = createEnumDescriptor("AlternatingChars", [
  { name: "ALTERNATING_CHARS_A1A1A1", number: 1, options: undefined },
]);

describe("enums", () => {
  it("keeps prefix by default", () => {
    expect(getMemberName(defaultContext, EnumWithoutNumerics, EnumWithoutNumerics.value[0])).toEqual(
      "NO_NUMERICS_FIRST_VALUE",
    );
    expect(getMemberName(defaultContext, EnumWithSomeNumerics, EnumWithSomeNumerics.value[1])).toEqual(
      "SOME_NUMERICS_2",
    );
    expect(getMemberName(defaultContext, EnumWithAllNumerics, EnumWithAllNumerics.value[0])).toEqual("ALL_NUMERICS_1");
  });

  it("strips prefix when configured to", () => {
    expect(getMemberName(removePrefixContext, EnumWithoutNumerics, EnumWithoutNumerics.value[0])).toEqual(
      "FIRST_VALUE",
    );
  });

  it("does not strip when numerics would result", () => {
    expect(getMemberName(removePrefixContext, EnumWithSomeNumerics, EnumWithSomeNumerics.value[1])).toEqual(
      "SOME_NUMERICS_2",
    );
    expect(getMemberName(removePrefixContext, EnumWithAllNumerics, EnumWithAllNumerics.value[0])).toEqual(
      "ALL_NUMERICS_1",
    );
  });

  it("handles strange numerics", () => {
    expect(getMemberName(removePrefixContext, EnumWithNumericInfinity, EnumWithNumericInfinity.value[0])).toEqual(
      "NUMERIC_INFINITY_Infinity",
    );
    expect(getMemberName(removePrefixContext, EnumWithNonNumericInfinity, EnumWithNonNumericInfinity.value[0])).toEqual(
      "INFINITY",
    );
    expect(getMemberName(removePrefixContext, EnumWithNumberLetter, EnumWithNumberLetter.value[0])).toEqual(
      "NUMBER_LETTER_1A",
    );
    expect(getMemberName(removePrefixContext, EnumWithLeadingZeroes, EnumWithLeadingZeroes.value[0])).toEqual(
      "LEADING_ZEROES_0001",
    );
    expect(getMemberName(removePrefixContext, EnumWithAlternatingChars, EnumWithAlternatingChars.value[0])).toEqual(
      "A1A1A1",
    );
  });
});
