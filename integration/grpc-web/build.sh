set -x

export GOPATH=$HOME/go

#go get github.com/improbable-eng/grpc-web/go/grpcweb
#go get google.golang.org/grpc
#go get github.com/gogo/protobuf/proto
#go get github.com/gogo/protobuf/jsonpb
#go get github.com/gogo/protobuf/protoc-gen-gogo
#go get github.com/gogo/protobuf/gogoproto

protoc -I=. -I=$GOPATH/src -I=$GOPATH/src/github.com/gogo/protobuf/protobuf -I=$GOPATH/src/github.com/gogo/protobuf/protobuf/google/protobuf --gogo_out=plugins=grpc:src/ types.proto

protoc -I=. -I=$GOPATH/src -I=$GOPATH/src/github.com/gogo/protobuf/protobuf -I=$GOPATH/src/github.com/gogo/protobuf/protobuf/google/protobuf --gogo_out=plugins=grpc:src/ example.proto

# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./generated"

#npm install ts-protoc-gen
#npm install google-protobuf @types/google-protobuf
#npm install @improbable-eng/grpc-web
#npm install @improbable-eng/grpc-web-node-http-transport

protoc \
	-I=. \
	-I=$GOPATH/src \
	-I=$GOPATH/src/github.com/gogo/protobuf/protobuf \
	-I=$GOPATH/src/github.com/gogo/protobuf/protobuf/google/protobuf \
    --plugin="protoc-gen-ts=${PROTOC_GEN_TS_PATH}" \
    --js_out="import_style=commonjs,binary:${OUT_DIR}" \
	--ts_out=service=grpc-web:${OUT_DIR} \
    example.proto types.proto $GOPATH/src/github.com/gogo/protobuf/gogoproto/gogo.proto
