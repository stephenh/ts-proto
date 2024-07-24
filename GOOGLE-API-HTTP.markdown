# Generate generic definitions from [google.api.http](https://cloud.google.com/endpoints/docs/grpc/transcoding)

To generate `.ts` files for your `.proto` files that contain `google.api.http`, you can use the `--ts_proto_opt=onlyTypes=true,outputServices=generic-google-api-http-definitions` option.

Please refer to [integration/google-api-http](./integration/google-api-http) for an input/output example.

## Client implementation example

```typescript
// This is just an example, please test it to see if it works for you.
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
          const bodyKey = endpointDef.body;
          const payloadClone = bodyKey === "*" ? JSON.parse(JSON.stringify(payload)) : null;
          const path = endpointDef.path.replace(/\{([^\}]+)\}/g, (_, key) => {
            delete payloadClone[key];
            return payload[key];
          });
          let body: string | undefined = undefined;
          if (bodyKey === "*") {
            body = JSON.stringify(payloadClone);
          } else if (bodyKey) {
            body = JSON.stringify({ [bodyKey]: payload[bodyKey] });
          }

          return fetcher({ path, method: endpointDef.method, body });
        },
      ];
    }),
  );
}

const fetcher = (input: { path: string; method: string; body?: string }) => {
  const url = "http://localhost:8080" + input.path;
  const init: RequestInit = {
    method: input.method,
    headers: {
      "Content-Type": "application/json",
    },
  };
  if (input.body) {
    init.body = input.body;
  }
  return fetch(url, init).then((res) => res.json());
};

const api = createApi(fetcher, Messaging);

api
  .GetMessage({
    messageId: "123",
  })
  .then((res) => {
    console.log(res);
  });
```
