#!/bin/bash

# To avoid running the protoc pipeline all the time, we capture the incoming Plugin
# proto requests into .bin files that then unit tests can pull in directly as needed.

protoc --plugin=$(pwd)/protoc-gen-dump --dump_out=. ./vector_tile.proto
mv file.bin vector_tile.bin

protoc --plugin=$(pwd)/protoc-gen-dump --dump_out=. ./simple.proto
mv file.bin simple.bin

