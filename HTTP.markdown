# Http

If we have to following `.proto` file:

```protobuf
syntax = "proto3";

import "google/api/annotations.proto";

service Messaging {
  rpc GetMessage(GetMessageRequest) returns (GetMessageResponse) {
    option (google.api.http) = {
        get:"/v1/messages/{message_id}"
    };
  }
  rpc CreateMessage(CreateMessageRequest) returns (CreateMessageResponse) {
    option (google.api.http) = {
        post:"/v1/messages/{message_id}"
        body: "message"
    };
  }
  rpc UpdateMessage(CreateMessageRequest) returns (CreateMessageResponse) {
    option (google.api.http) = {
        post:"/v1/messages/{message_id}"
        body: "*"
    };
  }
}

message GetMessageRequest {
  string message_id = 1;
}
message GetMessageResponse {
  string message = 1;
}

message CreateMessageRequest {
  string message_id = 1;
  string message = 2; // mapped to the body
}

message CreateMessageResponse {}
```

The output will be

```typescript
// ...
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

export interface CreateMessageResponse {}

export const Messaging = {
  getMessage: {
    path: "/v1/messages/{message_id}",
    method: "get",
    request: undefined as GetMessageRequest | undefined,
    response: undefined as GetMessageResponse | undefined,
  },

  createMessage: {
    path: "/v1/messages/{message_id}",
    method: "post",
    body: "message",
    request: undefined as CreateMessageRequest | undefined,
    response: undefined as CreateMessageResponse | undefined,
  },

  updateMessage: {
    path: "/v1/messages/{message_id}",
    method: "post",
    body: "*",
    request: undefined as CreateMessageRequest | undefined,
    response: undefined as CreateMessageResponse | undefined,
  },
};
```

## Client implementation example

```typescript
// This is just an example, do not use it directly.
function createApi<T extends { path: string; method: "get"; request?: unknown; response?: unknown }>(config: T) {
  return function api(request: NonNullable<T["request"]>): Promise<NonNullable<T["response"]>> {
    const path = config.path.replace("{message_id}", request.messageId);
    const method = config.method;
    const body = method === "get" ? undefined : JSON.stringify({ message: request.message });

    return fetch(path, { method, body });
  };
}

const getMessage = createApi(Messaging.getMessage);

getMessage({
  messageId: "123",
}).then((res) => {
  // ...
});
```
