#!/usr/bin/env bash

set -x
export GOPATH=$HOME/go

# See https://grpc.io/docs/languages/go/quickstart/
# go get google.golang.org/protobuf/cmd/protoc-gen-go
# go get google.golang.org/grpc/cmd/protoc-gen-go-grpc
#
# go get github.com/improbable-eng/grpc-web/go/grpcweb

mkdir -p generated
protoc -I=. --go_out=generated/ --go-grpc_out=require_unimplemented_servers=false:generated/ example.proto

