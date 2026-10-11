import { Metadata } from "@grpc/grpc-js";
import { BasicServiceClientImpl } from "./default-with-metadata-no-methods";

describe("default-with-metadata-no-methods", () => {
  it("creates a client for a service without methods", () => {
    const rpc = {
      request: (service: string, method: string, data: Uint8Array, metadata?: Metadata) =>
        Promise.resolve(new Uint8Array()),
    };
    expect(new BasicServiceClientImpl(rpc)).toBeInstanceOf(BasicServiceClientImpl);
  });
});
