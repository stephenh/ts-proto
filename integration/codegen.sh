#!/usr/bin/env bash
shopt -s globstar

# Runs the local code generator for each of our .bin test files (as created/kept
# up-to-date by ./update-bins.sh). Good for local iteration of WIP changes.

for file in **/*.bin; do
  echo "${file}"
  # Strip the longest suffix starting at the 1st slash
  dir="${file%%/*}"
  params=""
  if [ -f "${dir}/parameters.txt" ]; then
    params=$(cat "${dir}/parameters.txt")
  fi
  ../node_modules/.bin/ts-node ./codegen.ts "${dir}" "${file}" "${params}"
done

