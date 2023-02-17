import { maybeSnakeToCamel, camelCaseGrpc } from "../src/case";
import { Options, optionsFromParameter } from "../src/options";
import { getFieldJsonName } from "../src/utils";

const keys = optionsFromParameter("snakeToCamel=keys");

describe("case", () => {
  it("converts snake to camel by default", () => {
    expect(maybeSnakeToCamel("foo_bar", optionsFromParameter(undefined))).toEqual("fooBar");
  });

  it("leaves as-is if snakeToCamel is false", () => {
    expect(maybeSnakeToCamel("foo_bar", optionsFromParameter("snakeToCamel=false"))).toEqual("foo_bar");
  });

  it("de-upper cases", () => {
    expect(maybeSnakeToCamel("FOO_BAR", keys)).toEqual("fooBar");
  });

  it("leaves existing mixed cases", () => {
    expect(maybeSnakeToCamel("clientI_d", keys)).toEqual("clientID");
    expect(maybeSnakeToCamel("menu_calendarI_d", keys)).toEqual("menuCalendarID");
    expect(maybeSnakeToCamel("display_nameI18n", keys)).toEqual("displayNameI18n");
  });

  it("leaves the first character as it was", () => {
    expect(maybeSnakeToCamel("Foo_Bar", keys)).toEqual("FooBar");
  });

  it("does nothing is already camel", () => {
    expect(maybeSnakeToCamel("FooBar", keys)).toEqual("FooBar");
  });

  // deal with original protoc which converts
  // _uuid -> Uuid
  // __uuid -> Uuid
  // _uuid_foo -> UuidFoo
  it("converts snake to camel with first underscore", () => {
    expect(maybeSnakeToCamel("_uuid", { snakeToCamel: ["keys"] })).toEqual("Uuid");
  });

  it("converts snake to camel with first double underscore", () => {
    expect(maybeSnakeToCamel("__uuid", { snakeToCamel: ["keys"] })).toEqual("Uuid");
  });

  it("converts snake to camel with first underscore and camelize other", () => {
    expect(maybeSnakeToCamel("_uuid_foo", { snakeToCamel: ["keys"] })).toEqual("UuidFoo");
  });

  it("converts string to camel case respecting word separation, getAPIValue === getApiValue", () => {
    expect(camelCaseGrpc("GetAPIValue")).toEqual("getApiValue");
  });

  describe("getFieldJsonName", () => {
    it("keeps snake case when jsonName is probably not set", () => {
      expect(getFieldJsonName({ name: "foo_bar", jsonName: "fooBar" }, { snakeToCamel: [] })).toBe("foo_bar");
    });

    it("uses jsonName when it is set", () => {
      expect(getFieldJsonName({ name: "foo_bar", jsonName: "foo" }, { snakeToCamel: [] })).toBe("foo");
    });
  });
});
