import { Observable, map, of } from "rxjs";
import { DashStateClientImpl, DashUserSettingsState, DashStateServiceName } from "./example";

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
  clientStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Promise<Uint8Array>;
  serverStreamingRequest(service: string, method: string, data: Uint8Array): Observable<Uint8Array>;
  bidirectionalStreamingRequest(service: string, method: string, data: Observable<Uint8Array>): Observable<Uint8Array>;
  beforeRequest?<T extends { [k in keyof T]: unknown }>(service: string, method: string, request: T): void;
  afterResponse?<T extends { [k in keyof T]: unknown }>(service: string, method: string, response: T): void;
  handleError?(service: string, method: string, error: Error): Error;
}

describe("before-after-request-streaming", () => {
  const reqData = {
    email: "john.cena@gmail.com",
    urls: undefined,
    flashes: [{ msg: "dun dun dun dun", type: 0 }],
  };
  const resData = {
    email: "cena.john@gmail.com",
    urls: undefined,
    flashes: [{ msg: "dun dun dun dun", type: 0 }],
  };
  let rpc: Rpc = {
    request: jest.fn(() => Promise.resolve(new Uint8Array([21]))),
    clientStreamingRequest: jest.fn(() => Promise.resolve(new Uint8Array([21]))),
    serverStreamingRequest: jest.fn(() => of(new Uint8Array([21]))),
    bidirectionalStreamingRequest: (service: string, method: string, data: Observable<Uint8Array>) => {
      return data.pipe(map((data) => new Uint8Array([21])));
    },
  };
  let client = new DashStateClientImpl(rpc);
  const beforeRequest = jest.fn();
  const afterResponse = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(DashUserSettingsState, "decode").mockReturnValue(resData);
  });

  it("compiles", () => {
    const service = new DashStateClientImpl(rpc);
    expect(service).not.toBeUndefined();
  });

  it("performs function before request if specified", () => {
    const req = DashUserSettingsState.create(reqData);
    client = new DashStateClientImpl({ ...rpc, beforeRequest: beforeRequest });
    const reqObservable = of(req);
    client.ChangeUserSettingsStream(reqObservable).subscribe();
    expect(beforeRequest).toHaveBeenCalledWith(
      DashStateServiceName,
      "ChangeUserSettingsStream",
      DashUserSettingsState.encode(req).finish(),
    );
  });

  it("performs function after request if specified", async () => {
    const req = DashUserSettingsState.create(reqData);
    client = new DashStateClientImpl({ ...rpc, afterResponse: afterResponse });
    const reqObservable = of(req);
    client.ChangeUserSettingsStream(reqObservable).subscribe();
    expect(afterResponse).toHaveBeenCalledWith(DashStateServiceName, "ChangeUserSettingsStream", resData);
  });

  it("doesn't perform function before or after request if they are not specified", async () => {
    const req = DashUserSettingsState.create(reqData);
    client = new DashStateClientImpl({ ...rpc });
    await client.ChangeUserSettingsStream(of(req));
    expect(beforeRequest).not.toHaveBeenCalled();
    expect(afterResponse).not.toHaveBeenCalled();
  });
});
