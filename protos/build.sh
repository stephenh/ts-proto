#!/usr/bin/env bash

# Generates TS objects of the protoc plugin descriptors, which ts-proto
# uses to understand the incoming protoc codegen request objects.

protoc \
  --plugin=./node_modules/ts-proto/protoc-gen-ts_proto \
  --ts_proto_out=. \
  ./google/protobuf/descriptor.proto \
  ./google/protobuf/compiler/plugin.proto

./node_modules/.bin/tsc \
  ./google/protobuf/descriptor.ts \
  ./google/protobuf/compiler/plugin.ts



