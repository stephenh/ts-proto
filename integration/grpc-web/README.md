`grpc-web` client stream need `WebSocket` transport.

Because need bundle single `.js` file to browser, so you need to install `webpack toolchain`.

```
cd grpc-web
npm install
npx webpack
```

Then, use you browser open `index.html` file.

## server

Running the rpc server.

```
cd grpc-web-go-server
./build.sh
GRPC_GO_LOG_SEVERITY_LEVEL=info GRPC_GO_LOG_VERBOSITY_LEVEL=0 ./grpc-web-go-server
```
