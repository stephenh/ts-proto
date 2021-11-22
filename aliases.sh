#!/usr/bin/env bash

function protoc() { docker-compose run --rm protoc "$@"; }
function protoc-sh() { docker-compose run --rm --entrypoint sh -- protoc "$@"; }
function protoc-build() { docker-compose build protoc; }
