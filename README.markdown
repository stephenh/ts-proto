
![npm](https://img.shields.io/npm/v/ts-proto)
[![CircleCI](https://circleci.com/gh/stephenh/ts-proto.svg?style=svg)](https://circleci.com/gh/stephenh/ts-proto)

QuickStart
==========

* `npm install ts-proto`
* `protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./simple.proto`
  * (Note that the output parameter name, `ts_proto_out`, is named based on the suffix of the plugin's name, i.e. "ts_proto" suffix in the `--plugin=./node_modules/.bin/protoc-gen-ts_proto` parameter becomes the `_out` prefix, per `protoc`'s CLI conventions.)
  * On Windows, use `protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_out=. ./imple.proto`

This will generate `*.ts` source files for the given `*.proto` types.

If you want to package these source files into an npm package to distribute to clients, just run `tsc` on them as usual to generate the `.js`/`.d.ts` files, and deploy the output as a regular npm package.

Goals
=====

* Idiomatic TypeScript/ES6 types
  * `ts-proto` is a clean break from either the built-in Google/Java-esque JS code of `protoc` or the "make `.d.ts` files the `*.js` comments" approach of `protobufjs`
  * (Techically the `protobufjs/minimal` package is used for actually reading/writing bytes.)
* TypeScript-first output
* Interfaces over classes
  * As much as possible, types are just interfaces (sometimes with prototype-driven defaults) so you can work with messages just like regular hashes/data structures.
* Only supports codegen `*.proto`-to-`*.ts` workflow, currently no runtime reflection/loading of dynamic `.proto` files
* Currently ambivalent about browser support, current focus is on Node/server-side use cases

Example Types
=============

The generated types are "just data", i.e.:

```typescript
export interface Simple {
  name: string;
  age: number;
  createdAt: Date | undefined;
  child: Child | undefined;
  state: StateEnum;
  grandChildren: Child[];
  coins: number[];
}
```

Along with `encode`/`decode` factory methods:

```typescript
export const Simple = {
  encode(message: Simple, writer: Writer = Writer.create()): Writer {
    ...
  },

  decode(reader: Reader, length?: number): Simple {
    ...
  },

  fromJSON(object: any): Simple {
    ...
  },

  fromPartial(object: DeepPartial<Simple>): Simple {
    ...
  },

  toJSON(message: Simple): unknown {
    ...
  },
};
```

This allows idiomatic TS/JS usage like:

```typescript
const bytes = Simple.encode({ name: ..., age: ..., ... }).finish();
const simple = Simple.decode(Reader.create(bytes));
const { name, age } = simple;
```

Which can dramatically ease integration when converting to/from other layers without
creating a class and calling the right getters/setters.

Highlights
==========

* A poor man's attempt at "please give us back optional types"

  Wrapper types, i.e. `google.protobuf.StringValue`, are mapped as optional values,
  i.e. `string | undefined`, which means for primitives we can kind of pretend that
  the protobuf type system has optional types.

* Timestamp is mapped as `Date`

* `fromJSON`/`toJSON` support the [canonical Protobuf JS](https://developers.google.com/protocol-buffers/docs/proto3#json) format (i.e. timestamps are ISO strings)

Current Disclaimers
===================

ts-proto was originally developed for [Twirp](https://github.com/twitchtv/twirp), so the clients it generates (if your `*.proto` files use the GRPC `service` constructs) assume they're talking to Twirp HTTP endpoints. There is an issue filed (#2) to support GRPC endpoints, but no work currently in progress.

That said, the message/interface types that ts-proto generates are not coupled to Twirp and should be fully usable in other Protobuf environments (either GRPC-based or even just reading protobuf files from disk/etc.). The client-related output can also be disabled (see the Usage section).

ts-proto also does not currently have any infrastructure to help implement the server-side of a GRPC (either Twirp or pure GRPC) service, i.e. built-in Express bindings or something like that. However, again, the types/interfaces that ts-proto generates for your messages and services are still generally very helpful in setting up your own server-side implementations.

Auto-Batching / N+1 Prevention
==============================

If you're using ts-proto's (currently Twirp only) clients to call backend micro-services, similar to the N+1 problem in SQL applications, it is easy for micro-service clients to (when serving an individual request) inadvertantly trigger multiple separate RPC calls for "get book 1", "get book 2", "get book 3", that should really be batched into a single "get books [1, 2, 3]" (assuming the backend supports a batch-oriented RPC method).

ts-proto can help with this, and essentially auto-batch your individual "get book" calls into batched "get books" calls.

For ts-proto to do this, you need to implement your service's RPC methods with the batching convention of:

* A method name of `Batch<OperationName>`
* The `Batch<OperationName>` input type has a single repeated field (i.e. `repeated string ids = 1`)
* The `Batch<OperationName>` output type has either a:
  * A single repeated field (i.e. `repeated Foo foos = 1`) _where the output order is the same as the input `ids` order_, or
  * A map of the input to an output (i.e. `map<string, Entity> entities = 1;`)

When ts-proto recognizes methods of this pattern, it will automatically create a "non-batch" version of `<OperationName>` for the client, i.e. `client.Get<OperationName>`, that takes a single id and returns a single result.

This provides the client code with the illusion that it can make individual `Get<OperationName>` calls (which is generally preferrable/easier when implementing the client's business logic), but the actual implementation that ts-proto provides will end up making `Batch<OperationName>` calls to the backend service.

You also need to enable the `useContext=true` build-time parameter, which gives all client methods a Go-style `ctx` parameter, with a `getDataLoaders` method that lets ts-proto cache/resolve request-scoped [DataLoaders](https://github.com/graphql/dataloader), which provide the fundamental auto-batch detection/flushing behavior.

See the `batching.proto` file and related tests for examples/more details.

But the net effect is that ts-proto can provide SQL-/ORM-style N+1 prevention for clients calls, which can be critical especially in high-volume / highly-parallel implementations like GraphQL front-end gateways calling backend micro-services.

Usage
=====

`ts-proto` is a `protoc` plugin, so you run it by (either directly in your project, or more likely in your mono-repo schema pipeline, i.e. like [Ibotta](https://medium.com/building-ibotta/building-a-scaleable-protocol-buffers-grpc-artifact-pipeline-5265c5118c9d) or [Namely](https://medium.com/namely-labs/how-we-build-grpc-services-at-namely-52a3ae9e7c35)):

* Add `ts-proto` to your `package.json`
* Run `npm install` to download it
* Invoke `protoc` with a `plugin` parameter like:

```bash
protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto ./batching.proto -I.
```

Supported options:

* If you pass `--ts_proto_opt=context=true`, the Twirp services will have a Go-style `ctx` parameter, which is useful for tracing/logging/etc. if you're not using node's `async_hooks` api due to performance reasons.
* If you pass `--ts_proto_opt=forceLong=long`, all 64 bit numbers will be parsed as instances of `Long` (using the [long](https://www.npmjs.com/package/long) library). Alternatively, if you pass `--ts_proto_opt=forceLong=string`, all 64 bit numbers will be outputted as strings.
* If you pass `--ts_proto_opt=outputEncodeMethods=false`, the `Message.encode` and `Message.decode` methods for working with protobuff-encoded data will not be output.
* If you pass `--ts_proto_opt=outputJsonMethods=false`, the `Message.fromJSON` and `Message.toJSON` methods for working with JSON-coded data will not be output.
* If you pass `--ts_proto_opt=outputClientImpl=false`, the `FooServiceClientImpl` classes that implement the client-side (currently Twirp-only) RPC interfaces will not be output.

(I.e. you want only interface declarations for your Protobuf types, then pass all three of `outputEncodeMethods`, `outputJsonMethods`, and `outputClientImpl` as `false`, i.e. `--ts_proto_opt=outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false`.)

The following options are very useful for NestJS and available if `outputEncodeMethods`, `outputJsonMethods`, and `outputClientImpl` are set as `false`

* If you pass `--ts_proto_opt=useMetadata=true`, the last argument accepts grpc metadata
* If you pass `--ts_proto_opt=returnObservable=true`, the return type will be of type Observable<T> rather than Promise<T>

Building
========

`ts-proto` does not use `pbjs` at runtime, but we do use it in the `ts-proto` build process (to bootstrap the types used to parse the incoming protobuf metadata types, as well as for the test suite to ensure the `ts-proto` implementations match the `ts-proto`).

After running `yarn install` (which will fail in `yarn test` on the first time), run `./pbjs.sh` to create the bootstrap types, and `./integration/pbjs.sh` to create the integration test types. These pbjs-generated files are not currently checked in.

After this the tests should pass.

After making changes to `ts-proto`, you can run `cd integration` and `./codegen.sh` to re-generate the test case `*.ts` output files that are in each `integration/<test-case>/` directory.

The test suite's proto files (i.e. `simple.proto`, `batching.proto`, etc.) currently have serialized/`.bin` copies checked into git (i.e. `simple.bin`, `batching.bin`, etc.), so that the test suite can run without having to invoke the `protoc` build chain. I.e. if you change the `simple.proto`/etc. files, you'll need to run `./integration/update-bins.sh`, which does require having the `protoc` executable available.

Assumptions
===========

* TS/ES6 module name is the proto package

Todo
====

* Model OneOfs as an ADT
* Support the string-based encoding of duration in `fromJSON`/`toJSON`
* Support the `json_name` annotation

Typing Approach
===============

* Missing fields on read
  * When decoding from binary, we setup a prototype for our returned object, which has default values.
    * This assumes missing keys trigger the default value, e.g. storing `key=undefined` would subvert the approach
  * When decoding from JSON, we may have missing keys.
    * We could convert them to our prototype.
  * When using an instantiated object, our types enforce all keys to be set.

OneOf Handling
==============

Currently fields that are modeled with `oneof either_field { string field_a; string field_b }` are generated as `field_a: string | undefined; field_b: string | undefined`.

This means you'll have to check `if object.field_a` and `if object.field_b`, and if you set one, you'll have to remember to unset the other.

It would be nice/preferable to model this as an ADT, so it would be:

```typescript
object.either_field = { kind: 'field_a', value: 'name' };
```

However this differs sufficiently from the wire-level format that there might be wrinkles.

An original design notion of `ts-proto` was that ideally we could get JSON off the wire and immediately cast it to the generated `ts-proto` types, but features like oneof ADTs require walking the JSON looking for things to massage.

Similarily, writing a `ts-proto` object as protobuf-compliant JSON would not be a straight `JSON.stringify(tsProtoObject)`.

(Idea: maybe `either_field` exists in the prototype, and wraps/manages the underlying primitive values.)

Primitive Types
===============

Protobuf has the somewhat annoying behavior that primitives types cannot differentiate between set-to-defalut-value and unset.

I.e. if you have a `string name = 1`, and set `object.name = ''`, Protobuf will skip sending the tagged `name` field over the wire, because its understood that readers on the other end will, when they see `name` is not included in the payload, return empty string.

`ts-proto` models this behavior, of "unset" values being the primitive's default. (Technically by setting up an object prototype that knows the default values of the message's primitive fields.)

If you want fields where you can model set/unset, see Wrapper Types.

Wrapper Types
=============

In core Protobuf, while unset primitives are read as default values, unset messages are returned as `null`.

This allows a cute hack where you can model a logical `string | null` by creating a field that is a message (can be null) and the message has a single string value (for when the value is not null).

Protobuf has several built-in types for this pattern, i.e. `google.protobuf.StringValue`.

`ts-proto` understands these wrapper types and will generate `google.protobuf.StringValue name = 1` as a `name: string | undefined`.

This hides some of the `StringValue` mess and gives a more idiomatic way of using them.

Granted, it's unfortunate this is not as simple as marking the `string` as `optional`.

Number Types
============

Numbers are by default assumed to be plain JavaScript `numbers`. Since protobuf supports 64 bit numbers, but JavaScript doesn't, default behaviour is to throw an error if a number is detected to be larger than `Number.MAX_SAFE_INTEGER`. If 64 bit numbers are expected to be used, then use the `forceLong` option.

Each of the protobuf basic number types maps as following depending on option used.

| Protobuf number types  | Default Typescript types | `forceLong=long` types | `forceLong=string` types |
| ----------------------- | ----------------------- | ---------------------------- | ---------------------------------- |
|  double | number | number | number |
|  float | number | number | number |
|  int32 | number | number | number |
|  int64 | number* | Long | string |
|  uint32 | number | number | number |
|  uint64 | number* | Unsigned Long | string |
|  sint32 | number | number | number |
|  sint64 | number* | Long | string |
|  fixed32 | number | number | number |
|  fixed64 | number* | Unsigned Long | string |
|  sfixed32 | number | number | number |
|  sfixed64 | number* |  Long | string |

Where (*) indicates they might throw an error at runtime.

Current Status of Optional Values
=================================

* Required primitives: use as-is, i.e. `string name = 1`.
* Optional primitives: use wrapper types, i.e. `StringValue name = 1`.
* Required messages: not available
* Optional primitives: use as-is, i.e. `SubMessage message = 1`.


