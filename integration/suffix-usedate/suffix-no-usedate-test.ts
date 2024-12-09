import { NoUseDatePSuffixTypeNoUseDateS } from "./suffix-no-usedate-type";

describe("suffix", () => {
  it("generates types correctly", () => {
    const obj: NoUseDatePSuffixTypeNoUseDateS = {
      createdAt: { seconds: 1317826080, nanos: 0 },
    };
    expect(obj).toBeTruthy();

    // make sure all conversions to and from handle prefixes and suffixes
    //
    const json = NoUseDatePSuffixTypeNoUseDateS.toJSON(obj);

    expect(json).toEqual({ createdAt: "2011-10-05T14:48:00.000Z" });

    expect(NoUseDatePSuffixTypeNoUseDateS.fromJSON(json)).toEqual(obj);
  });
});
