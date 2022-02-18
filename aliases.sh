#!/usr/bin/env bash
PROJECT_ROOT=$(realpath $(dirname "$BASH_SOURCE"))
PROJECT_ROOT_DOCKER="//ts-proto" # double slash to support git bash on windows

# Alias docker-compose to make it usable from anywhere.
function _docker-compose() { 
  if [ uname -a | grep arm64 ]
  then
    docker-compose -f "$PROJECT_ROOT/docker-compose.aarch64.yml" "$@"
  else
    docker-compose -f $PROJECT_ROOT/docker-compose.yml "$@"; 
  fi
}

# Dockerized version of protoc.
function protoc() { _docker-compose run --rm -w //host --entrypoint protoc -- protoc "$@"; }

# Open a shell in the dockerized version of protoc, useful for debugging.
function protoc-sh() { _docker-compose run --rm -w //host -- protoc "$@"; }

# Rebuild the docker image.
function protoc-build() { _docker-compose build protoc; }

# Run protoc with the plugin path pre-set.
function ts-protoc {
  if [ ! -d "$PROJECT_ROOT/build" ]; then
    echo "Run 'yarn build' first"
    return 1
  fi
  protoc --plugin=$PROJECT_ROOT_DOCKER/protoc-gen-ts_proto "$@";
}
