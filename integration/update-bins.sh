#!/usr/bin/env bash

# To avoid running the protoc pipeline all the time, we capture the incoming Plugin
# proto requests into .bin PROTO_FILES that then unit tests can pull in directly as needed.

INTEGRATION_DIR=$(realpath $(dirname "$BASH_SOURCE"))
cd $INTEGRATION_DIR;

if [[ "$OSTYPE" == "msys" ]]; then
  PLUGIN_PATH="protoc-gen-dump.bat"
else
  PLUGIN_PATH="protoc-gen-dump"
fi

PROTO_FILES=$(find . -name "*.proto" -type f)

for FILE in $PROTO_FILES; do
  echo "${FILE}"
  INPUT_DIR="$(dirname "$FILE")"
  OUTPUT_FILE="${FILE%proto}bin"
  protoc --experimental_allow_proto3_optional "--plugin=$PLUGIN_PATH" --dump_out=. "${FILE}" "-I${INPUT_DIR}"\
   && mv FILE.bin "${OUTPUT_FILE}"
done
