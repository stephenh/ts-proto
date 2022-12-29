/**
 * @jest-environment node
 */
import {
  Server,
  ChannelCredentials,
  ServerCredentials,
  ServerUnaryCall,
  sendUnaryData,
  ServiceError,
} from "@grpc/grpc-js";
import { TestClient, TestServer, TestService } from "./simple";

describe("grpc-js-test", () => {
  it("compiles", () => {
    expect(TestService).not.toBeUndefined();
  });

  it("can create a server and a client", async () => {
    const server = new Server();

    const impl: TestServer = {
      unary(call, callback) {
        callback(null, call.request);
      },
      unaryStringValue(call, callback) {
        callback(null, call.request);
      },
      unaryInt64Value(call, callback) {
        callback(null, call.request);
      },
      unaryUint64Value(call, callback) {
        callback(null, call.request);
      },
      unaryBoolValue(
        call: ServerUnaryCall<boolean | undefined, boolean | undefined>,
        callback: sendUnaryData<boolean | undefined>
      ): void {
        callback(null, call.request);
      },
      unaryBytesValue(
        call: ServerUnaryCall<Uint8Array | undefined, Uint8Array | undefined>,
        callback: sendUnaryData<Uint8Array | undefined>
      ): void {
        callback(null, call.request);
      },
      unaryDoubleValue(
        call: ServerUnaryCall<number | undefined, number | undefined>,
        callback: sendUnaryData<number | undefined>
      ): void {
        callback(null, call.request);
      },
      unaryFloatValue(
        call: ServerUnaryCall<number | undefined, number | undefined>,
        callback: sendUnaryData<number | undefined>
      ): void {
        callback(null, call.request);
      },
      unaryInt32Value(
        call: ServerUnaryCall<number | undefined, number | undefined>,
        callback: sendUnaryData<number | undefined>
      ): void {
        callback(null, call.request);
      },
      unaryTimestamp(call: ServerUnaryCall<Date, Date>, callback: sendUnaryData<Date>): void {
        callback(null, call.request);
      },
      unaryUInt32Value(
        call: ServerUnaryCall<number | undefined, number | undefined>,
        callback: sendUnaryData<number | undefined>
      ): void {
        callback(null, call.request);
      },
      struct(
        call: ServerUnaryCall<{ [key: string]: any } | undefined, { [key: string]: any }>,
        callback: sendUnaryData<{ [key: string]: any } | undefined>
      ) {
        callback(null, call.request);
      },
      value(call: ServerUnaryCall<any | undefined, any | undefined>, callback: sendUnaryData<any | undefined>) {
        callback(null, call.request);
      },
      listValue(
        call: ServerUnaryCall<Array<any> | undefined, Array<any> | undefined>,
        callback: sendUnaryData<Array<any> | undefined>
      ) {
        callback(null, call.request);
      },
      serverStreaming(call) {
        call.write({
          timestamp: call.request.timestamp,
        });
        call.end();
      },
      serverStreamingStringValue(call) {
        call.write(call.request);
        call.end();
      },
      serverStreamingStruct(call) {
        call.write(call.request);
        call.end();
      },
      clientStreaming(call, callback) {
        call.on("data", (request) => {
          callback(null, {
            timestamp: request.timestamp,
          });
        });
      },
      clientStreamingStringValue(call, callback) {
        call.on("data", (request) => {
          callback(null, request);
        });
      },
      bidiStreaming(call) {
        call.on("data", (request) => {
          call.write({
            timestamp: request.timestamp,
          });
        });
        call.on("end", () => {
          call.end();
        });
      },
      bidiStreamingStringValue(call) {
        call.on("data", (request) => {
          call.write(request);
        });
        call.on("end", () => {
          call.end();
        });
      },
    };

    server.addService(TestService, impl);

    const port = await new Promise<number>((resolve, reject) => {
      server.bindAsync("localhost:0", ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
          reject(err);
        } else {
          resolve(port);
        }
      });
    });
    server.start();

    // Make sure the port is open
    await new Promise((resolve) => setTimeout(resolve, 100));

    const client = new TestClient(`localhost:${port}`, ChannelCredentials.createInsecure());

    expect.assertions(26);

    expect(TestClient.service).toEqual(TestService);

    client.unary({}, (err, res) => {
      expect(res).toEqual({});
    });

    client.unaryStringValue("foobar", (error: ServiceError | null, response: string | undefined) => {
      expect(error).toBeNull();
      expect(response).toEqual("foobar");
    });

    client.unaryBoolValue(true, (error: ServiceError | null, response: boolean | undefined) => {
      expect(error).toBeNull();
      expect(response).toBeTruthy();
    });

    client.unaryDoubleValue(12.5, (error: ServiceError | null, response: number | undefined) => {
      expect(error).toBeNull();
      expect(response).toEqual(12.5);
    });

    client.unaryFloatValue(12.5, (error: ServiceError | null, response: number | undefined) => {
      expect(error).toBeNull();
      expect(response).toEqual(12.5);
    });

    client.unaryInt32Value(12, (error: ServiceError | null, response: number | undefined) => {
      expect(error).toBeNull();
      expect(response).toEqual(12);
    });

    client.unaryUInt32Value(12, (error: ServiceError | null, response: number | undefined) => {
      expect(error).toBeNull();
      expect(response).toEqual(12);
    });

    client.unaryInt64Value(12, (error: ServiceError | null, response: number | undefined) => {
      expect(error).toBeNull();
      expect(response).toEqual(12);
    });

    client.unaryUint64Value(12, (error: ServiceError | null, response: number | undefined) => {
      expect(error).toBeNull();
      expect(response).toEqual(12);
    });

    client.unaryBytesValue(
      new Uint8Array([1, 2, 3]),
      (error: ServiceError | null, response: Uint8Array | undefined) => {
        expect(error).toBeNull();
        expect(response).toHaveLength(3);
      }
    );

    const timestamp = new Date();

    const serverStreamingCall = client.serverStreaming({ timestamp });
    serverStreamingCall.on("data", (response) => {
      expect(response.timestamp).toEqual(timestamp);
    });
    const serverStreamingStringValueCall = client.serverStreamingStringValue("foobar");
    serverStreamingStringValueCall.on("data", (response) => {
      expect(response).toEqual("foobar");
    });

    const clientStreamingCall = client.clientStreaming((err, res) => {
      expect(res.timestamp).toEqual(timestamp);
    });
    clientStreamingCall.write({ timestamp });
    clientStreamingCall.end();

    const clientStreamingStringValueCall = client.clientStreamingStringValue((err, res) => {
      expect(res).toEqual("foobar");
    });
    clientStreamingStringValueCall.write("foobar");
    clientStreamingStringValueCall.end();

    const bidiStreamingCall = client.bidiStreaming();
    bidiStreamingCall.write({ timestamp });
    bidiStreamingCall.on("data", (response) => {
      expect(response.timestamp).toEqual(timestamp);
      bidiStreamingCall.end();
    });

    const bidiStringValueStreamingCall = client.bidiStreamingStringValue();
    bidiStringValueStreamingCall.write("foobar");
    bidiStringValueStreamingCall.on("data", (response) => {
      expect(response).toEqual("foobar");
      bidiStringValueStreamingCall.end();
    });

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        server.tryShutdown(() => {
          client.close();

          resolve();
        });
      }, 100);
    });
  });
});
