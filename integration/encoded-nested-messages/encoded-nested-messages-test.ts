import { Envelope, StatusError } from "./encoded_nested";

describe("useEncodedNestedMessages", () => {
  it("builds a parent message from already-encoded nested children", () => {
    const errors = [
      { message: "Error 1", code: 1 },
      { message: "Error 2", code: 2 },
    ];
    const errorsEncoded = errors.map((e) => StatusError.encodeBytes(e));

    const fromPreencoded = Envelope.encode({
      errors: errorsEncoded,
      single: errorsEncoded[0],
    }).finish();

    const fromObjects = Envelope.encode({
      errors,
      single: errors[0],
    }).finish();

    expect(fromPreencoded).toEqual(fromObjects);

    const decoded = Envelope.decode(fromPreencoded);
    expect(decoded.errors).toEqual(errors);
    expect(decoded.single).toEqual(errors[0]);
  });

  it("mixes encoded and plain nested children", () => {
    const a = { message: "a", code: 1 };
    const b = { message: "b", code: 2 };

    const mixed = Envelope.encode({
      errors: [StatusError.encodeBytes(a), b],
      single: undefined,
    }).finish();

    expect(Envelope.decode(mixed).errors).toEqual([a, b]);
  });
});
