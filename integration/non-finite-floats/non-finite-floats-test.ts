import { Floats } from "./non-finite-floats";
import { DoubleValue } from "./google/protobuf/wrappers";

describe("non-finite floats", () => {
  // The proto3 JSON mapping writes NaN, Infinity and -Infinity as strings,
  // since JSON numbers cannot represent them.
  const message: Floats = {
    d: Infinity,
    f: -Infinity,
    ds: [1.5, NaN, -Infinity],
    dm: { a: Infinity, b: 2 },
    dw: NaN,
    fw: -Infinity,
    fwm: { x: NaN },
    od: Infinity,
  };

  it("writes them as strings in toJSON", () => {
    expect(Floats.toJSON(message)).toEqual({
      d: "Infinity",
      f: "-Infinity",
      ds: [1.5, "NaN", "-Infinity"],
      dm: { a: "Infinity", b: 2 },
      dw: "NaN",
      fw: "-Infinity",
      fwm: { x: "NaN" },
      od: "Infinity",
    });
    expect(DoubleValue.toJSON({ value: -Infinity })).toEqual({ value: "-Infinity" });
  });

  it("round-trips them through JSON.stringify", () => {
    // fromJSON does not convert the values of maps of wrapper types, so leave fwm out.
    const roundTripped: Floats = { ...message, fwm: {} };
    const json = JSON.parse(JSON.stringify(Floats.toJSON(roundTripped)));
    expect(Floats.fromJSON(json)).toEqual(roundTripped);
  });
});
