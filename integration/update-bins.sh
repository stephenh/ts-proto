#!/bin/bash
shopt -s globstar

# To avoid running the protoc pipeline all the time, we capture the incoming Plugin
# proto requests into .bin files that then unit tests can pull in directly as needed.

for file in **/*.proto; do
  echo "${file}"
  # Strip the longest suffix starting at the 1st slash
  dir="${file%%/*}"
  # Strip the proto suffix and add bin
  dest="${file%proto}bin"
  protoc "--plugin=$(pwd)/protoc-gen-dump" --dump_out=. "${file}" "-I${dir}"
  mv file.bin "${dest}"
done

