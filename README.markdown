
QuickStart
==========

* `npm install ts-proto`
* `protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./simple.proto`

If you want to package the `ts-proto` output into npm package to distribute to clients, run `tsc` to generate the `.d.ts` files (i.e. unlike pbjs/pbts, `ts-proto` creates `*.ts` files which can then directly be used/compiled by `tsc`.)

Goals
=====

* Idiomatic TypeScript/ES6 types
  * `ts-proto` is a clean break from either the built-in Google/Java-esque JS of `protoc` and `protobufjs` 
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

Usage
=====

`ts-proto` is a `protoc` plugin, so you run it by (either directly in your project, or more likely in your mono-repo schema pipeline, i.e. [this](https://medium.com/building-ibotta/building-a-scaleable-protocol-buffers-grpc-artifact-pipeline-5265c5118c9d) or [this](https://medium.com/namely-labs/how-we-build-grpc-services-at-namely-52a3ae9e7c35)):

* Add `ts-proto` to your `package.json`
* Run `npm install` to download it
* Invoke `protoc` with a `plugin` parameter like:

```bash
protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto ./batching.proto -I.
```

Supported options:

* Right now, `ts-proto` always generates Twirp service implementations for any RPC services, simply because that is what we use. Adding an option to disable Twirp and support GRPC is on the todo list.
* If you pass `--ts_proto_opt=context=true`, the Twirp services will have a Go-style `ctx` parameter, which is useful for tracing/logging/etc. if you're not using node's `async_hooks` api due to performance reasons.

Building
========

`ts-proto` does not use `pbjs` at runtime, but we do use it as the `ts-proto` build process (to bootstrap the types used to parse the incoming protobuf metadata types), as well as for the test suite to ensure the `ts-proto` implementations match the `ts-proto`.

After running `yarn install`, run `./pbjs.sh` to create the bootstrap types and the integration test types.

The test suite also uses several test proto files (`simple.proto`, `batching.proto`, etc.); serialized copies of these are currently checked into git as `simple.bin`, `batching.bin`, etc., so that the test suite can run without having to invoke the `protoc` build chain. If you change the `simple.proto`/etc. files, run `./update_proto_bins.sh`. This does require having the `protoc` executable available.

Assumptions
===========

* TS/ES6 module name is the proto package

Todo
====

* Better Long support; currently any values greater than `Number.MAX_SAFE_INTEGER` blow up at runtime
* Model OneOfs as an ADT
* Support the string-based encoding of duration in `fromJSON`/`toJSON`
* Support bytes as base64 encoded strings in `fromJSON`/`toJSON`
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

Current Status of Optional Values
=================================

* Required primitives: use as-is, i.e. `string name = 1`.
* Optional primitives: use wrapper types, i.e. `StringValue name = 1`.
* Required messages: not available
* Optional primitives: use as-is, i.e. `SubMessage message = 1`.

