/**
 * @jest-environment node
 */
import { Messaging, GetMessageRequest, GetMessageResponse } from "./simple";

describe("http-test", () => {
  it("compiles", () => {
    expect(Messaging.getMessage).toStrictEqual({
      path: "/v1/messages/{message_id}",
      method: "get",
      request: undefined,
      response: undefined,
    });
    expect(Messaging.createMessage).toStrictEqual({
      path: "/v1/messages/{message_id}",
      method: "post",
      body: "message",
      request: undefined,
      response: undefined,
    });
    expect(Messaging.updateMessage).toStrictEqual({
      path: "/v1/messages/{message_id}",
      method: "post",
      body: "*",
      request: undefined,
      response: undefined,
    });

    // Test that the request and response types are correctly typed
    const copy = { ...Messaging.getMessage };
    const request: GetMessageRequest = {
      messageId: "1",
    };
    const response: GetMessageResponse = {
      message: "hello",
    };
    copy.request = request;
    copy.response = response;
  });
});
