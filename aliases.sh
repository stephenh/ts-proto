#!/usr/bin/env bash
PROJECT_ROOT=$(realpath $(dirname "$BASH_SOURCE"))
PROJECT_ROOT_DOCKER="//ts-proto" # double slash to support git bash on windows

# Alias docker-compose to make it usable from anywhere
function _docker-compose() { docker-compose -f $PROJECT_ROOT/docker-compose.yml "$@"; }

# Calculate the path relative to project root, and
function _relative_path() { echo "//host/$(realpath --relative-to="$PROJECT_ROOT" "$PWD")"; }

function protoc() { _docker-compose run -w $(_relative_path)  --rm protoc "$@"; }
function protoc-sh() { _docker-compose run -w $(_relative_path) --rm --entrypoint sh -- protoc "$@"; }
function protoc-build() { _docker-compose build protoc; }
function ts-protoc { protoc --plugin=$PROJECT_ROOT_DOCKER/protoc-gen-ts_proto "$@"; }
