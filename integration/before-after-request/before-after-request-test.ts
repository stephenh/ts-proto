import { FooServiceClientImpl, FooServiceCreateRequest, FooServiceCreateResponse } from "./simple";
import { MessageType } from "./typeRegistry";

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  afterResponse?(response: MessageType): void;
  beforeRequest?(request: MessageType): void;
}

describe("before-after-request", () => {
  const exampleData = {
    kind: 1,
  };
  let rpc = {
    request: jest.fn(() => Promise.resolve(new Uint8Array())),
  };
  let client = new FooServiceClientImpl(rpc);
  const beforeRequest = jest.fn();
  const afterResponse = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(FooServiceCreateResponse, "decode")
      .mockReturnValue({ $type: "simple.FooServiceCreateResponse", ...exampleData });
  });

  it("performs function before request if specified", async () => {
    const req = FooServiceCreateRequest.create(exampleData);
    client = new FooServiceClientImpl({ ...rpc, beforeRequest: beforeRequest });
    await client.Create(req);
    expect(beforeRequest).toHaveBeenCalled();
  });

  it("performs function after request if specified", async () => {
    const req = FooServiceCreateRequest.create(exampleData);
    client = new FooServiceClientImpl({ ...rpc, afterResponse: afterResponse });
    await client.Create(req);
    expect(afterResponse).toHaveBeenCalled();
  });

  it("doesn't perform function before or after request if they are not specified", async () => {
    const req = FooServiceCreateRequest.create(exampleData);
    client = new FooServiceClientImpl({ ...rpc });
    await client.Create(req);
    expect(beforeRequest).not.toHaveBeenCalled();
    expect(afterResponse).not.toHaveBeenCalled();
  });
});
