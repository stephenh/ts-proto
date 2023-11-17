import { GetBasicResponse, GetBasicRequest, BasicServiceClientImpl, BasicServiceServiceName } from "./simple";

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  handleError?(service: string, method: string, error: Error): Error;
}

describe("before-after-request", () => {
  const exampleData = {
    name: "test-name",
  };
  let rpc = {
    request: jest.fn(() => Promise.resolve(new Uint8Array())),
  };
  let client = new BasicServiceClientImpl(rpc);
  let err = new Error("error");

  let modifiedError = new Error("modified error");
  const handleError = jest.fn(() => modifiedError);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("performs handleError if error occurs during main request code block", async () => {
    const encodeSpy = jest.spyOn(GetBasicRequest, "encode").mockImplementation(() => {
      throw err;
    });
    const req = GetBasicRequest.create(exampleData);
    client = new BasicServiceClientImpl({ ...rpc, handleError: handleError });
    try {
      await client.GetBasic(req);
    } catch (error) {
      expect(error).toBe(modifiedError);
      expect(handleError).toHaveBeenCalledWith(BasicServiceServiceName, "GetBasic", err);
    }
    encodeSpy.mockRestore();
  });

  it("performs handleError if error occurs when decoding", async () => {
    const decodeSpy = jest.spyOn(GetBasicResponse, "decode").mockImplementation(() => {
      throw err;
    });
    const req = GetBasicRequest.create(exampleData);
    client = new BasicServiceClientImpl({ ...rpc, handleError: handleError });
    try {
      await client.GetBasic(req);
    } catch (error) {
      expect(error).toBe(modifiedError);
      expect(handleError).toHaveBeenCalledWith(BasicServiceServiceName, "GetBasic", err);
    }
    decodeSpy.mockRestore();
  });

  it("performs handleError if error occurs when calling afterResponse", async () => {
    const decodeSpy = jest.spyOn(GetBasicResponse, "decode").mockReturnValue(exampleData);
    const req = GetBasicRequest.create(exampleData);
    const res = GetBasicResponse.create(exampleData);

    const afterResponse = jest.fn(() => {
      throw err;
    });
    client = new BasicServiceClientImpl({
      ...rpc,
      handleError: handleError,
      afterResponse: afterResponse,
    });
    try {
      await client.GetBasic(req);
    } catch (error) {
      expect(error).toBe(modifiedError);
      expect(decodeSpy).toHaveBeenCalledTimes(1);
      expect(afterResponse).toHaveBeenCalledWith(BasicServiceServiceName, "GetBasic", res);
      expect(handleError).toHaveBeenCalledWith(BasicServiceServiceName, "GetBasic", err);
    }
    decodeSpy.mockRestore();
  });

  it("doesn't perform handleError if it is not specified", async () => {
    const req = GetBasicRequest.create(exampleData);
    client = new BasicServiceClientImpl(rpc);
    try {
      await client.GetBasic(req);
    } catch (error) {
      expect(error).toBe(err);
      expect(handleError).not.toHaveBeenCalled();
    }
  });
});
