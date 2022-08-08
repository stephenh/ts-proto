#!/usr/bin/env bash

set -x

GO111MODULE=on go mod tidy

mkdir -p generated
protoc -I=. --go_out=generated/ --go-grpc_out=require_unimplemented_servers=false:generated/ example.proto
go build
