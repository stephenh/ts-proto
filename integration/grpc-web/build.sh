set -x

export GOPATH=$HOME/go

#go get github.com/improbable-eng/grpc-web/go/grpcweb
#go get google.golang.org/grpc
#go get github.com/gogo/protobuf/proto
#go get github.com/gogo/protobuf/jsonpb
#go get github.com/gogo/protobuf/protoc-gen-gogo
#go get github.com/gogo/protobuf/gogoproto

protoc -I=. --go_out=plugins=grpc:generated/ example.proto

# Path to this plugin
PROTOC_GEN_TS_PATH="./node_modules/.bin/protoc-gen-ts"

# Directory to write generated code to (.js and .d.ts files)
OUT_DIR="./generated"

