FROM node:12-alpine as build

COPY . .

# Install all dependencies needed for production build
RUN yarn install
RUN yarn build

# clean all depencies
RUN rm -rf node_modules
RUN yarn cache clean

# install production dependencies only
RUN yarn install --production

FROM node:12-alpine

WORKDIR /ts-proto

COPY --from=build build build
COPY --from=build node_modules node_modules
COPY protoc-gen-ts_proto .

ENTRYPOINT ["./protoc-gen-ts_proto"]