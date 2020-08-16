#!/usr/bin/env bash
shopt -s globstar

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

for file in ${dir}/*.bin; do
  echo "${file}"
  # Strip the longest suffix starting at the 1st slash
  dir="${file%%/*}"
  params=""
  if [ -f "${dir}/parameters.txt" ]; then
    params=$(cat "${dir}/parameters.txt")
  fi
  ../node_modules/.bin/ts-node ./codegen.ts "${dir}" "${file}" "${params}"
done

