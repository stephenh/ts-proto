/**
 * @jest-environment node
 */
import { MessagingDefinition, GetMessageRequest, GetMessageResponse } from "./simple";

describe("google-api-http-test", () => {
  it("compiles", () => {
    expect(MessagingDefinition.methods).toStrictEqual({
      getMessage: {
        path: "/v1/messages/{message_id}",
        method: "get",
        requestType: undefined,
        responseType: undefined,
      },
      createMessage: {
        path: "/v1/messages/{message_id}",
        method: "post",
        body: "message",
        requestType: undefined,
        responseType: undefined,
      },
      updateMessage: {
        path: "/v1/messages/{message_id}",
        method: "patch",
        body: "*",
        requestType: undefined,
        responseType: undefined,
      },
      deleteMessage: {
        path: "/v1/messages/{message_id}",
        method: "delete",
        body: "*",
        requestType: undefined,
        responseType: undefined,
      },
    });

    // Test that the request and response types are correctly typed
    const copy = { ...MessagingDefinition.methods.getMessage };
    const request: GetMessageRequest = {
      messageId: "1",
    };
    const response: GetMessageResponse = {
      message: "hello",
    };
    copy.requestType = request;
    copy.responseType = response;
  });
});
