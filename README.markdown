
Goals
=====

* Idiomatic TypeScript/ES6 types
* Interfaces over classes
  * As much as possible, types are just interfaces (sometimes with prototype-driven defaults) so you can work with messages just like regular hashes/data structures.
* Only supports codegen `*.proto`-to-`*.ts` workflow, currently no runtime reflection/loading of dynamic `.proto` files
* Currently ambivalent about browser support, current focus is on Node/server-side use cases

Highlights
==========

* Wrapper types, i.e. `google.protobuf.StringValue`, are mapped as optional values, i.e. `string | undefined`
* Timestamp is mapped as `Date`
* `fromJSON`/`toJSON` support the [canonical Protobuf JS](https://developers.google.com/protocol-buffers/docs/proto3#json) format (i.e. timestamps are ISO strings)

Usage
=====

`ts-proto` is a protoc plugin, so you run it by:

* Add `ts-proto` to your `package.json`
* Run `npm install` to download it
* Invoke `protoc` with a `plugin` like

```bash
protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto ./batching.proto -I.
```

Options:

* Right now, `ts-proto` always generates Twirp service types; simply because the project we wrote ts-proto for uses Twirp. We need to add an option to disable Twirp and also add an option to support GRPC.
* If you pass `--custom_opt=context=true`, the Twirp services will have a Go-style `ctx` parameter, which is useful for tracing/logging/etc. if you're not using the async api due to performance reasons.

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

This hides some of the `StringValue` mess and gives a more idiomatic way of access them.

Granted, it's unfortunate this is not as simple as marking the `string` as `optional`. 

Current Status of Optional Values
=================================

* Required primitives: use as-is, i.e. `string name = 1`.
* Optional primitives: use wrapper types, i.e. `StringValue name = 1`.
* Required messages: not available
* Optional primitives: use as-is, i.e. `SubMessage message = 1`.

