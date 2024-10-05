import { GRPCPSuffixTypeGRPCS } from "./suffix-type";

describe("suffix", () => {
  it("generates types correctly", () => {
    const obj: GRPCPSuffixTypeGRPCS = {
      createdAt: new Date("2011-10-05T14:48:00.000Z"),
    };
    expect(obj).toBeTruthy();

    // make sure all conversions to and from handle prefixes and suffixes
    //
    const json = GRPCPSuffixTypeGRPCS.toJSON(obj);

    expect(json).toEqual({ createdAt: "2011-10-05T14:48:00.000Z" });

    expect(GRPCPSuffixTypeGRPCS.fromJSON(json)).toEqual(obj);
  });
});
