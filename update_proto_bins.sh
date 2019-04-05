#!/bin/bash

# To avoid running the protoc pipeline all the time, we capture the incoming Plugin
# proto requests into .bin files that then unit tests can pull in directly as needed.

protoc --plugin=$(pwd)/protoc-gen-dump --dump_out=. ./google/protobuf/wrappers.proto
mv file.bin google/protobuf/wrappers.bin

protoc --plugin=$(pwd)/protoc-gen-dump --dump_out=. ./integration/vector_tile.proto
mv file.bin integration/vector_tile.bin

protoc --plugin=$(pwd)/protoc-gen-dump --dump_out=. ./integration/simple.proto -I.
mv file.bin integration/simple.bin

protoc --plugin=$(pwd)/protoc-gen-dump --dump_out=. ./integration/batching.proto -I.
mv file.bin integration/batching.bin
