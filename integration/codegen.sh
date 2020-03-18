#!/bin/bash
shopt -s globstar

# Runs the local code generator for each of our .bin test files (as created/kept
# up-to-date by ./update-bins.sh). Good for local iteration of WIP changes.
int_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

for file in $int_dir/**/*.bin; do
  echo "${file}"
  dir=$(dirname "${file}")
  params=""
  if [ -f "${dir}/parameters.txt" ]; then
    params=$(cat "${dir}/parameters.txt")
  fi
  $(npm root)/.bin/ts-node $int_dir/codegen.ts "${dir}" "${file}" "${params}"
done

