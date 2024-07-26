// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// source: simple.proto

/* eslint-disable */

export const protobufPackage = "";

export interface GetMessageRequest {
  messageId: string;
}

export interface GetMessageResponse {
  message: string;
}

export interface CreateMessageRequest {
  messageId: string;
  /** mapped to the body */
  message: string;
}

export interface CreateMessageResponse {
}

export const Messaging = {
  GetMessage: {
    path: "/v1/messages/{message_id}",
    method: "get",
    requestType: undefined as unknown as GetMessageRequest,
    responseType: undefined as unknown as GetMessageResponse,
  },
  CreateMessage: {
    path: "/v1/messages/{message_id}",
    method: "post",
    body: "message",
    requestType: undefined as unknown as CreateMessageRequest,
    responseType: undefined as unknown as CreateMessageResponse,
  },
  UpdateMessage: {
    path: "/v1/messages/{message_id}",
    method: "patch",
    body: "*",
    requestType: undefined as unknown as CreateMessageRequest,
    responseType: undefined as unknown as CreateMessageResponse,
  },
  DeleteMessage: {
    path: "/v1/messages/{message_id}",
    method: "delete",
    body: "*",
    requestType: undefined as unknown as GetMessageRequest,
    responseType: undefined as unknown as CreateMessageResponse,
  },
};
