import { grpc } from "@improbable-eng/grpc-web";
import { DashStateActiveUserSettingsStreamDesc, DashUserSettingsState, GrpcWebImpl } from "./example";

type InvokeProps = Parameters<typeof grpc.invoke>[1];

function mockInvoke() {
  const calls: InvokeProps[] = [];
  const close = jest.fn();
  jest.spyOn(grpc, "invoke").mockImplementation((_desc, props) => {
    calls.push(props as InvokeProps);
    return { close } as any;
  });
  return { calls, close };
}

const message = (email: string) => DashUserSettingsState.fromPartial({ email });

describe("grpc-web-async-iterable", () => {
  afterEach(() => jest.restoreAllMocks());

  it("returns an async iterable of the streamed messages", async () => {
    const { calls, close } = mockInvoke();
    const rpc = new GrpcWebImpl("http://localhost", {});
    const stream = rpc.invoke(DashStateActiveUserSettingsStreamDesc, {}, undefined);
    const iterator = stream[Symbol.asyncIterator]();

    const first = iterator.next();
    calls[0].onMessage!(message("a@example.com") as any);
    calls[0].onMessage!(message("b@example.com") as any);
    calls[0].onEnd!(grpc.Code.OK, "", new grpc.Metadata());

    expect((await first).value.email).toEqual("a@example.com");
    expect((await iterator.next()).value.email).toEqual("b@example.com");
    expect((await iterator.next()).done).toBe(true);
    expect(close).toHaveBeenCalled();
  });

  it("throws the stream error from the iterator", async () => {
    const { calls } = mockInvoke();
    const rpc = new GrpcWebImpl("http://localhost", {});
    const iterator = rpc.invoke(DashStateActiveUserSettingsStreamDesc, {}, undefined)[Symbol.asyncIterator]();

    const next = iterator.next();
    calls[0].onEnd!(grpc.Code.Unavailable, "down", new grpc.Metadata());

    await expect(next).rejects.toMatchObject({ message: "down", code: grpc.Code.Unavailable });
  });

  it("stops and closes the call when the signal aborts", async () => {
    const { close } = mockInvoke();
    const rpc = new GrpcWebImpl("http://localhost", {});
    const controller = new AbortController();
    const iterator = rpc
      .invoke(DashStateActiveUserSettingsStreamDesc, {}, undefined, controller.signal)
      [Symbol.asyncIterator]();

    const next = iterator.next();
    controller.abort(new Error("aborted"));

    await expect(next).rejects.toThrow("aborted");
    expect(close).toHaveBeenCalled();
  });

  it("does not reconnect after the consumer stops during a retry delay", async () => {
    jest.useFakeTimers();
    try {
      const { calls, close } = mockInvoke();
      const rpc = new GrpcWebImpl("http://localhost", { upStreamRetryCodes: [grpc.Code.Unavailable] });
      const iterator = rpc.invoke(DashStateActiveUserSettingsStreamDesc, {}, undefined)[Symbol.asyncIterator]();

      const first = iterator.next();
      calls[0].onMessage!(message("a@example.com") as any);
      expect((await first).value.email).toEqual("a@example.com");
      calls[0].onEnd!(grpc.Code.Unavailable, "down", new grpc.Metadata());

      await iterator.return!(undefined);
      jest.advanceTimersByTime(10_000);

      expect(calls).toHaveLength(1);
      expect(close).toHaveBeenCalledTimes(1);
    } finally {
      jest.useRealTimers();
    }
  });

  it("closes the call as soon as the signal aborts after a message", async () => {
    const { calls, close } = mockInvoke();
    const rpc = new GrpcWebImpl("http://localhost", {});
    const controller = new AbortController();
    const iterator = rpc
      .invoke(DashStateActiveUserSettingsStreamDesc, {}, undefined, controller.signal)
      [Symbol.asyncIterator]();

    const first = iterator.next();
    calls[0].onMessage!(message("a@example.com") as any);
    expect((await first).value.email).toEqual("a@example.com");

    controller.abort(new Error("aborted"));
    expect(close).toHaveBeenCalledTimes(1);

    await expect(iterator.next()).rejects.toThrow("aborted");
    expect(close).toHaveBeenCalledTimes(1);
  });

  it("does not start the call when the signal is already aborted", async () => {
    const { calls } = mockInvoke();
    const rpc = new GrpcWebImpl("http://localhost", {});
    const controller = new AbortController();
    const stream = rpc.invoke(DashStateActiveUserSettingsStreamDesc, {}, undefined, controller.signal);
    controller.abort(new Error("aborted"));

    await expect(stream[Symbol.asyncIterator]().next()).rejects.toThrow("aborted");
    expect(calls).toHaveLength(0);
  });

  it("yields a message received before a stream error", async () => {
    const { calls } = mockInvoke();
    const rpc = new GrpcWebImpl("http://localhost", {});
    const iterator = rpc.invoke(DashStateActiveUserSettingsStreamDesc, {}, undefined)[Symbol.asyncIterator]();

    const first = iterator.next();
    calls[0].onMessage!(message("a@example.com") as any);
    calls[0].onEnd!(grpc.Code.Internal, "boom", new grpc.Metadata());

    expect((await first).value.email).toEqual("a@example.com");
    await expect(iterator.next()).rejects.toMatchObject({ message: "boom", code: grpc.Code.Internal });
  });

  it("closes the call when the consumer stops early", async () => {
    const { calls, close } = mockInvoke();
    const rpc = new GrpcWebImpl("http://localhost", {});
    const stream = rpc.invoke(DashStateActiveUserSettingsStreamDesc, {}, undefined);

    setTimeout(() => calls[0].onMessage!(message("a@example.com") as any));
    for await (const settings of stream) {
      expect(settings.email).toEqual("a@example.com");
      break;
    }

    expect(close).toHaveBeenCalled();
  });
});
