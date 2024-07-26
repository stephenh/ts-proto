# Generate generic definitions from [google.api.http](https://cloud.google.com/endpoints/docs/grpc/transcoding)

To generate `.ts` files for your `.proto` files that contain `google.api.http`, you can use the `--ts_proto_opt=onlyTypes=true,outputServices=generic-google-api-http-definitions` option.

Please refer to [integration/google-api-http](./integration/google-api-http) for an input/output example.

## Client implementation example

```typescript
// This is just a basic implementation, please test it to see if it works for you.
function createApi<
  S extends Record<string, { path: string; method: string; body?: string; requestType: any; responseType: any }>,
>(
  fetcher: (input: { path: string; method: string; body?: string }) => Promise<unknown>,
  serviceDef: S,
): { [K in keyof S]: (payload: S[K]["requestType"]) => Promise<S[K]["responseType"]> } {
  // @ts-expect-error
  return Object.fromEntries(
    Object.entries(serviceDef).map(([name, endpointDef]) => {
      return [
        name,
        async (payload: typeof endpointDef.requestType): Promise<typeof endpointDef.responseType> => {
          payload = { ...payload };
          const { method } = endpointDef;
          const bodyKey = endpointDef.body;

          // Path template syntax: https://cloud.google.com/service-infrastructure/docs/service-management/reference/rpc/google.api#path-template-syntax
          // This code only handles the simplest case. Please extend it if you need more complex path templates.
          if (/(=|\*|\.|:)/.test(path)) {
            throw new Error(`Unsupported path template syntax: ${path}.`);
          }

          let path = endpointDef.path.replace(/\{([^\}]+)\}/g, (_, fieldPath) => {
            // Handle path template like "/v1/messages/{message_id}"
            delete payload[fieldPath];
            return encodeURIComponent(payload[fieldPath]);
          });

          if (bodyKey === "*") {
            const body = JSON.stringify(payload);
            return fetcher({ path, method, body });
          }

          let body: string | undefined = undefined;

          if (bodyKey) {
            body = JSON.stringify({ [bodyKey]: payload[bodyKey] });
            delete payload[bodyKey];
          }

          const qs = new URLSearchParams(payload).toString();
          if (qs) {
            path += "?" + qs;
          }

          return fetcher({ path, method, body });
        },
      ];
    }),
  );
}

async function fetcher(input: { path: string; method: string; body?: string }) {
  const url = "http://localhost:8080" + input.path;
  const init: RequestInit = {
    method: input.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: input.body,
  };

  const res = await fetch(url, init);

  if (res.ok) {
    return await res.json();
  }

  throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
}

const api = createApi(fetcher, Messaging);

api
  .GetMessage({
    messageId: "123",
  })
  .then((res) => {
    console.log(res);
  });
```
