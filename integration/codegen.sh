#!/usr/bin/env bash

# Runs the local code generator for the .bin test files (as created/kept
# up-to-date by ./update-bins.sh). Good for local iteration of WIP changes.
#
# Usage:
#
# ./codegen.sh
#
#    Updates generated output for all integration tests.
#
# ./codegen.sh simple
#
#    Updates generated output only for the 'simple' integration test.
#
# Each integration test can optionally have a `parameters.txt` file that will
# be used as the ts-proto_opt... args for generating that test's code.

dir=${1:-*}

N=6

dir=.
if [ -n "${1}" ]; then
  dir=$1
fi

list=$(find "$dir" -name "*.bin" -type f | grep -v dump-response.bin)

for file in $list; do
  echo "${file}"
  # Strip the longest suffix starting at the 1st slash
  dir="${file##./}"
  dir="${dir%%/*}"
  params=""

  if [ -f "${dir}/parameters.txt" ]; then
    params=$(cat "${dir}/parameters.txt")
  fi

  ((i=i%N)); ((i++==0)) && wait
  ../node_modules/.bin/ts-node ./codegen.ts "${dir}" "${file}" "${params}" &
done

wait
