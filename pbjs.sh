#!/usr/bin/env bash

# Generates JS/TS objects of the protoc plugin descriptors with pbjs, which ts-proto
# uses to understand the incoming protoc codegen request objects.
#
# I.e. currently the shipped ts-proto plugin uses pbjs-generated types of the protobuf DTOs
# at build-time to generate the requested ts-proto types. At somepoint we could become
# self-hosted, i.e. use our own ts-proto-generated types within the plugin itself, which
# would be spiffy but not a big deal.

mkdir -p build
yarn pbjs --force-message -t static-module -o build/pbjs.js \
  protos/google/protobuf/descriptor.proto \
  protos/google/protobuf/compiler/plugin.proto
yarn pbts --no-comments -o build/pbjs.d.ts build/pbjs.js


