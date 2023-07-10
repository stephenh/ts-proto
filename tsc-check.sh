#!/usr/bin/env bash
for path in "$@"; do
  echo Checking ${path}
  yarn tsc --noEmit -p ${path} || exit 1
done
