# Docker image for protoc
FROM node:17-alpine3.14
ARG PROTOC_VERSION="3.19.1"
ARG ARCH="x86_64"

RUN apk add bash
RUN apk add gcompat
ADD "https://github.com/protocolbuffers/protobuf/releases/download/v$PROTOC_VERSION/protoc-$PROTOC_VERSION-linux-$ARCH.zip" protoc.zip
RUN mkdir /usr/local/lib/protoc && unzip protoc.zip -d /usr/local/lib/protoc && rm protoc.zip
RUN ln -s /usr/local/lib/protoc/bin/protoc /usr/local/bin/protoc

RUN protoc --version
WORKDIR /ts-proto/integration

ENTRYPOINT ["/bin/bash"]
