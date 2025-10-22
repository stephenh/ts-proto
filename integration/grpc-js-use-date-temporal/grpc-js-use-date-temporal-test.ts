/**
 * @jest-environment node
 */
import 'temporal-polyfill/global';

import { TestService, TimestampMessage } from "./grpc-js-use-date-temporal";

const jan1 = Temporal.Instant.from("1973-02-01T14:27:59.987654321Z");

describe("grpc-js-use-date-temporal", () => {
  it("compiles", () => {
    expect(TestService).not.toBeUndefined();
  });

  it("returns simple temporal instant", async () => {
    const encoded = TestService.simpleNow.requestSerialize(jan1);
    const decoded = TestService.simpleNow.responseDeserialize(encoded);
    expect(decoded.toString()).toStrictEqual(jan1.toString());
  });

  it("returns wrapped temporal instant", async () => {
    const data: TimestampMessage = { timestamp: jan1 };
    const encoded = TestService.wrappedNow.requestSerialize(data);
    const decoded = TestService.wrappedNow.responseDeserialize(encoded);

    expect({
      timestamp: decoded.timestamp!.toString(),
    } satisfies Record<keyof TimestampMessage, string>).toStrictEqual({
      timestamp: jan1.toString()
    } satisfies Record<keyof TimestampMessage, string>);
  });
});
