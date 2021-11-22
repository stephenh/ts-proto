# Docker image for protoc
ARG BASE="alpine:3.14.3"
FROM $BASE
ARG PROTOC_VERSION="3.19.1"
ARG BIN=""

RUN apk add gcompat
ADD "https://github.com/protocolbuffers/protobuf/releases/download/v$PROTOC_VERSION/protoc-$PROTOC_VERSION-linux-x86_64.zip" protoc.zip
RUN mkdir /usr/local/lib/protoc && unzip protoc.zip -d /usr/local/lib/protoc
RUN ln -s /usr/local/lib/protoc/bin/protoc /usr/local/bin/protoc

RUN protoc --version

ENV PATH "$BIN:$PATH"

ENTRYPOINT ["/usr/local/bin/protoc"]
