import * as path from "path";
import { loadSync } from "protobufjs";
import { OptionalsTest } from "./simple";

describe("proto2-required", () => {
  const PbjsOptionalsTest = loadSync(path.join(__dirname, "simple.proto")).lookupType("simple.OptionalsTest");

  it("encodes required fields that match their default value", () => {
    const message = OptionalsTest.create({ reqChild: {} });

    const encoded = OptionalsTest.encode(message).finish();

    // protobufjs throws a "missing required" error if any required field is not on the wire
    const decoded = PbjsOptionalsTest.toObject(PbjsOptionalsTest.decode(encoded), { longs: Number, defaults: true });
    expect(decoded.reqId).toBe(0);
    expect(decoded.reqTruth).toBe(false);
    expect(decoded.reqDescription).toBe("");
    expect(decoded.reqDefvalId).toBe(100);
    expect(decoded.reqDefvalTruth).toBe(true);
    expect(decoded.reqDefvalDescription).toBe("Some description");
    expect(OptionalsTest.decode(encoded)).toEqual({ ...message, reqDefvalFloat: expect.closeTo(message.reqDefvalFloat, 5) });
  });
});
