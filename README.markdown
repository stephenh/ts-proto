[![npm](https://img.shields.io/npm/v/ts-proto)](https://www.npmjs.com/package/ts-proto)
[![build](https://github.com/stephenh/ts-proto/workflows/Build/badge.svg)](https://github.com/stephenh/ts-proto/actions)

# ts-proto

> `ts-proto` transforms your `.proto` files into strongly-typed, idiomatic TypeScript files!

(Note, if you're a new user of ts-proto and using a modern TS setup with `esModuleInterop`, you need to also pass that as a `ts_proto_opt`.)

## Table of contents

- [QuickStart](#quickstart)
- [Goals](#goals)
- [Example Types](#example-types)
- [Highlights](#highlights)
- [Auto-Batching / N+1 Prevention](#auto-batching--n1-prevention)
- [Usage](#usage)
  - [Supported options](#supported-options)
  - [Only Types](#only-types)
  - [NestJS Support](NESTJS.markdown)
- [Building](#building)
- [Assumptions](#assumptions)
- [Todo](#todo)
- [OneOf Handling](#oneof-handling)
- [Primitive Types](#primitive-types)
- [Wrapper Types](#wrapper-types)
- [Number Types](#number-types)
- [Timestamps](#timestamps)
- [Current Status of Optional Values](#current-status-of-optional-values)

# Overview

ts-proto generates TypeScript types from protobuf schemas.

I.e. given a `person.proto` schema like:

```proto
message Person {
  string name = 1;
}
```

ts-proto will generate a `person.ts` file like:

```typescript
interface Person {
  name: string
}

const Person = {
  encode(person): Writer { ... }
  decode(reader): Person { ... }
  toJSON(person): unknown { ... }
  fromJSON(data): Person { ... }
}
```

It also knows about services and will generate types for them as well, i.e.:

```typescript
export interface PingService {
  ping(request: PingRequest): Promise<PingResponse>;
}
```

It will also generate client implementations of `PingService`; currently [Twirp](https://github.com/twitchtv/twirp), [grpc-web](./integration/grpc-web), [grpc-js](./integration/grpc-js) and [nestjs](./NESTJS.markdown) are supported.

# QuickStart

- `npm install ts-proto`
- `protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto --ts_proto_out=. ./simple.proto`
  - (Note that the output parameter name, `ts_proto_out`, is named based on the suffix of the plugin's name, i.e. "ts_proto" suffix in the `--plugin=./node_modules/.bin/protoc-gen-ts_proto` parameter becomes the `_out` prefix, per `protoc`'s CLI conventions.)
  - On Windows, use `protoc --plugin=protoc-gen-ts_proto=.\node_modules\.bin\protoc-gen-ts_proto.cmd --ts_proto_out=. ./simple.proto`
  - Ensure you're using a modern `protoc`, i.e. the original `protoc` `3.0.0` doesn't support the `_opt` flag

This will generate `*.ts` source files for the given `*.proto` types.

If you want to package these source files into an npm package to distribute to clients, just run `tsc` on them as usual to generate the `.js`/`.d.ts` files, and deploy the output as a regular npm package.

# Goals

- Idiomatic TypeScript/ES6 types
  - `ts-proto` is a clean break from either the built-in Google/Java-esque JS code of `protoc` or the "make `.d.ts` files the `*.js` comments" approach of `protobufjs`
  - (Techically the `protobufjs/minimal` package is used for actually reading/writing bytes.)
- TypeScript-first output
- Interfaces over classes
  - As much as possible, types are just interfaces, so you can work with messages just like regular hashes/data structures.
- Only supports codegen `*.proto`-to-`*.ts` workflow, currently no runtime reflection/loading of dynamic `.proto` files

# Example Types

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

# Highlights

- A poor man's attempt at "please give us back optional types"

  The canonical protobuf wrapper types, i.e. `google.protobuf.StringValue`, are mapped as optional values, i.e. `string | undefined`, which means for primitives we can kind of pretend the protobuf type system has optional types.

  (**Update**: ts-proto now also supports the proto3 `optional` keyword.)

- Timestamps are mapped as `Date`

  (Configurable with the `useDate` parameter.)

- `fromJSON`/`toJSON` support the [canonical Protobuf JS](https://developers.google.com/protocol-buffers/docs/proto3#json) format (i.e. timestamps are ISO strings)

# Auto-Batching / N+1 Prevention

(Note: this is currently only supported by the Twirp clients.)

If you're using ts-proto's clients to call backend micro-services, similar to the N+1 problem in SQL applications, it is easy for micro-service clients to (when serving an individual request) inadvertantly trigger multiple separate RPC calls for "get book 1", "get book 2", "get book 3", that should really be batched into a single "get books [1, 2, 3]" (assuming the backend supports a batch-oriented RPC method).

ts-proto can help with this, and essentially auto-batch your individual "get book" calls into batched "get books" calls.

For ts-proto to do this, you need to implement your service's RPC methods with the batching convention of:

- A method name of `Batch<OperationName>`
- The `Batch<OperationName>` input type has a single repeated field (i.e. `repeated string ids = 1`)
- The `Batch<OperationName>` output type has either a:
  - A single repeated field (i.e. `repeated Foo foos = 1`) _where the output order is the same as the input `ids` order_, or
  - A map of the input to an output (i.e. `map<string, Entity> entities = 1;`)

When ts-proto recognizes methods of this pattern, it will automatically create a "non-batch" version of `<OperationName>` for the client, i.e. `client.Get<OperationName>`, that takes a single id and returns a single result.

This provides the client code with the illusion that it can make individual `Get<OperationName>` calls (which is generally preferrable/easier when implementing the client's business logic), but the actual implementation that ts-proto provides will end up making `Batch<OperationName>` calls to the backend service.

You also need to enable the `useContext=true` build-time parameter, which gives all client methods a Go-style `ctx` parameter, with a `getDataLoaders` method that lets ts-proto cache/resolve request-scoped [DataLoaders](https://github.com/graphql/dataloader), which provide the fundamental auto-batch detection/flushing behavior.

See the `batching.proto` file and related tests for examples/more details.

But the net effect is that ts-proto can provide SQL-/ORM-style N+1 prevention for clients calls, which can be critical especially in high-volume / highly-parallel implementations like GraphQL front-end gateways calling backend micro-services.

# Usage

`ts-proto` is a `protoc` plugin, so you run it by (either directly in your project, or more likely in your mono-repo schema pipeline, i.e. like [Ibotta](https://medium.com/building-ibotta/building-a-scaleable-protocol-buffers-grpc-artifact-pipeline-5265c5118c9d) or [Namely](https://medium.com/namely-labs/how-we-build-grpc-services-at-namely-52a3ae9e7c35)):

- Add `ts-proto` to your `package.json`
- Run `npm install` to download it
- Invoke `protoc` with a `plugin` parameter like:

```bash
protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto ./batching.proto -I.
```

`ts-proto` can also be invoked with [Gradle](https://gradle.org) using the [protobuf-gradle-plugin](https://github.com/google/protobuf-gradle-plugin):

``` groovy
protobuf {
    plugins {
        // `ts` can be replaced by any unused plugin name, e.g. `tsproto`
        ts {
            path = 'path/to/plugin'
        }
    }

    // This section only needed if you provide plugin options
    generateProtoTasks {
        all().each { task ->
            task.plugins {
                // Must match plugin ID declared above
                ts {
                    option 'foo=bar'
                }
            }
        }
    }
}
```

Generated code will be placed in the Gradle build directory.

### Supported options

- With `--ts_proto_opt=context=true`, the services will have a Go-style `ctx` parameter, which is useful for tracing/logging/etc. if you're not using node's `async_hooks` api due to performance reasons.

- With `--ts_proto_opt=forceLong=long`, all 64-bit numbers will be parsed as instances of `Long` (using the [long](https://www.npmjs.com/package/long) library).

  Alternatively, if you pass `--ts_proto_opt=forceLong=string`, all 64-bit numbers will be outputted as strings.

  The default behavior is `forceLong=number`, which will internally still use the `long` library to encode/decode values on the wire (so you will still see a `util.Long = Long` line in your output), but will convert the `long` values to `number` automatically for you. Note that a runtime error is thrown if, while doing this conversion, a 64-bit value is larger than can be correctly stored as a `number`.

- With `--ts_proto_opt=esModuleInterop=true` changes output to be `esModuleInterop` compliant.
  
  Specifically the `Long` imports will be generated as `import Long from 'long'` instead of `import * as Long from 'long'`.

- With `--ts_proto_opt=env=node` or `browser` or `both`, ts-proto will make environment-specific assumptions in your output. This defaults to `both`, which makes no environment-specific assumptions.

  Using `node` changes the types of `bytes` from `Uint8Array` to `Buffer` for easier integration with the node ecosystem which generally uses `Buffer`.

  Currently `browser` doesn't have any specific behavior other than being "not `node`". It probably will soon/at some point.

- With `--ts_proto_opt=useOptionals=true`, non-scalar fields are declared as optional TypeScript properties, e.g. `field?: Message` instead of the default `field: Message | undefined`.

  ts-proto defaults to `useOptionals=false`, e.g. `field: Message | undefined`, because it is the most safe for use cases like:

  ```typescript
  interface SomeMessage {
    firstName: string | undefined;
    lastName: string | undefined;
  }

  const data = { firstName: 'a', lastTypo: 'b' };

  // This would compile if `lastName` was `lastName?`, even though the
  // `lastTypo` key above means that `lastName` is not assigned.
  const message: SomeMessage = {
    ...data,
  };
  ```

  However, the type-safety of `useOptionals=false` is admittedly tedious if you have many inherently-unused fields, so you can use `useOptionals=true` if that trade-off makes sense for your project.
  
  You can also use the generated `SomeMessage.fromPartial` methods to opt into the optionality on a per-call-site basis. The `fromPartial` allows the creator/writer to have default values applied (i.e. `undefined` --> `0`), and the return value will still be the non-optional type that provides a consistent view (i.e. always `0`) to clients.

  Eventually if TypesCript supports [Exact Types](https://github.com/microsoft/TypeScript/issues/12936), that should allow ts-proto to switch to `useOptionals=true` as the default/only behavior, have the generated `Message.encode`/`Message.toPartial`/etc. methods accept `Exact<T>` versions of the message types, and the result would be both safe + succinct.

  Also see the comment in [this issue](https://github.com/stephenh/ts-proto/issues/120#issuecomment-678375833) which explains the nuance behind making all fields optional (currently `useOptionals` only makes message fields optional), specifically that a message created with `const message: Message = { ...key not set... }` (so `key` is `undefined`) vs. `const message = Message.decode(...key not set...)` (so `key` is the default value) would look different to clients.

  Note that RPC methods, like `service.ping({ key: ... })`, accept `DeepPartial` versions of the request messages, because of the same rationale that it makes it easy for the writer call-site to get default values for free, and because the "reader" is the internal ts-proto serialization code, it can apply the defaults as necessary.

- With `--ts_proto_opt=exportCommonSymbols=false`, utility types like `DeepPartial` won't be `export`d.
  
  This should make it possible to use create barrel imports of the generated output, i.e. `import * from ./foo` and `import * from ./bar`.
  
  Note that if you have the same message name used in multiple `*.proto` files, you will still get import conflicts. 

- With `--ts_proto_opt=oneof=unions`, `oneof` fields will be generated as ADTs.

  See the "OneOf Handling" section.

- With `--ts_proto_opt=unrecognizedEnum=false` enums will not contain an `UNRECOGNIZED` key with value of -1.

- With `--ts_proto_opt=lowerCaseServiceMethods=true`, the method names of service methods will be lowered/camel-case, i.e. `service.findFoo` instead of `service.FindFoo`.

- With `--ts_proto_opt=snakeToCamel=false`, fields will be kept snake case.

  Defaults to `true`.

- With `--ts_proto_opt=outputEncodeMethods=false`, the `Message.encode` and `Message.decode` methods for working with protobuf-encoded/binary data will not be output.

  This is useful if you want "only types".

- With `--ts_proto_opt=outputJsonMethods=false`, the `Message.fromJSON` and `Message.toJSON` methods for working with JSON-coded data will not be output.

  This is also useful if you want "only types".

- With `--ts_proto_opt=outputPartialMethods=false`, the `Message.fromPartial` methods for accepting partially-formed objects/object literals will not be output.

- With `--ts_proto_opt=stringEnums=true`, the generated enum types will be string-based instead of int-based.

  This is useful if you want "only types" and are using a gRPC REST Gateway configured to serialize enums as strings.

  (Requires `outputEncodeMethods=false`.)

- With `--ts_proto_opt=outputClientImpl=false`, the client implementations, i.e. `FooServiceClientImpl`, that implement the client-side (in Twirp, see next option for `grpc-web`) RPC interfaces will not be output.

- With `--ts_proto_opt=outputClientImpl=grpc-web`, the client implementations, i.e. `FooServiceClientImpl`, will use the [@improbable-eng/grpc-web](https://github.com/improbable-eng/grpc-web) library at runtime to send grpc messages to a grpc-web backend.

  (Note that this only uses the grpc-web runtime, you don't need to use any of their generated code, i.e. the ts-proto output replaces their `ts-protoc-gen` output.)

  You'll need to add the `@improbable-eng/grpc-web` and a transport to your project's `package.json`; see the `integration/grpc-web` directory for a working example.

- With `--ts_proto_opt=returnObservable=true`, the return type of service methods will be `Observable<T>` instead of `Promise<T>`.

- With`--ts_proto_opt=addGrpcMetadata=true`, the last argument of service methods will accept the grpc `Metadata` type, which contains additional information with the call (i.e. access tokens/etc.).

  (Requires `nestJs=true`.)

- With`--ts_proto_opt=addNestjsRestParameter=true`, the last argument of service methods will be an rest parameter with type any. This way you can use custom decorators you could normally use in nestjs.

  (Requires `nestJs=true`.)

- With `--ts_proto_opt=nestJs=true`, the defaults will change to generate [NestJS protobuf](https://docs.nestjs.com/microservices/grpc) friendly types & service interfaces that can be used in both the client-side and server-side of NestJS protobuf implementations. See the [nestjs readme](NESTJS.markdown) for more information and implementation examples.

  Specifically `outputEncodeMethods`, `outputJsonMethods`, and `outputClientImpl` will all be false, and `lowerCaseServiceMethods` will be true.

  Note that `addGrpcMetadata`, `addNestjsRestParameter` and `returnObservable` will still be false.

- With `--ts_proto_opt=useDate=false`, fields of type `google.protobuf.Timestamp` will not be mapped to type `Date` in the generated types. See [Timestamps](#timestamps) for more details.

- With `--ts_proto_opt=outputSchema=true`, meta typings will be generated that can later be used in other code generators.

- With `--ts_proto_opt=outputTypeRegistry=true`, the type registry will be generated that can be used to resolve message types by fully-qualified name. Also, each message will get extra `$type` field containing fully-qualified name.

- With `--ts_proto_opt=outputServices=grpc-js`, ts-proto will output service definitions and server / client stubs in [grpc-js](https://github.com/grpc/grpc-node/tree/master/packages/grpc-js) format.

- With `--ts_proto_opt=outputServices=generic-definitions`, ts-proto will output generic (framework-agnostic) service definitions.

- With `--ts_proto_opt=emitImportedFiles=false`, ts-proto will not emit `google/protobuf/*` files unless you explicit add files to `protoc` like this
`protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto my_message.proto google/protobuf/duration.proto`

### Only Types

If you're looking for `ts-proto` to generate only types for your Protobuf types then passing all three of `outputEncodeMethods`, `outputJsonMethods`, and `outputClientImpl` as `false` is probably what you want, i.e.:

`--ts_proto_opt=outputEncodeMethods=false,outputJsonMethods=false,outputClientImpl=false`.

### NestJS Support

We have a great way of working together with [nestjs](https://docs.nestjs.com/microservices/grpc). `ts-proto` generates `interfaces` and `decorators` for you controller, client. For more information see the [nestjs readme](NESTJS.markdown).

# Sponsors

Kudos to our sponsors:

* [ngrok](https://ngrok.com) funded ts-proto's initial grpc-web support.

If you need ts-proto customizations or priority support for your company, you can ping me at [via email](mailto:stephen.haberman@gmail.com).

# Building

After running `yarn install`, run `./integration/pbjs.sh` to create the integration test types. These pbjs-generated files are not currently checked in.

After this, the tests should pass.

After making changes to `ts-proto`, you can run `cd integration` and `./codegen.sh` to re-generate the test case `*.ts` output files that are in each `integration/<test-case>/` directory.

The test suite's proto files (i.e. `simple.proto`, `batching.proto`, etc.) currently have serialized/`.bin` copies checked into git (i.e. `simple.bin`, `batching.bin`, etc.), so that the test suite can run without having to invoke the `protoc` build chain. I.e. if you change the `simple.proto`/etc. files, you'll need to run `./integration/update-bins.sh`, which does require having the `protoc` executable available.

# Assumptions

- TS/ES6 module name is the proto package

# Todo

- Support the string-based encoding of duration in `fromJSON`/`toJSON`
- Support the `json_name` annotation
- Make `oneof=unions` the default behavior in 2.0
- Probably change `forceLong` default in 2.0, should default to `forceLong=long`
- Make `esModuleInterop=true` the default in 2.0

# OneOf Handling

By default, `oneof` fields are modeled "flatly" in the message, i.e. `oneof either_field { string field_a; string field_b }` means that the message will have `field_a: string | undefined; field_b: string | undefined`.

With this output, you'll have to check both `if object.field_a` and `if object.field_b`, and if you set one, you'll have to remember to unset the other.

We recommend using the `oneof=unions` option, which will change the output to be an Abstract Data Type/ADT like:

```typescript
interface YourMessage {
  eitherField: { $case: 'field_a'; field_a: string } | { $case: 'field_b'; field_b: string };
}
```

As this will automatically enforce only one of `field_a` or `field_b` "being set" at a time, because the values are stored in the `eitherField` field that can only have a single value at a time.

In ts-proto's currently-unscheduled 2.x release, `oneof=unions` will become the default behavior.

# Primitive Types

Protobuf has the somewhat annoying behavior that primitives types cannot differentiate between set-to-defalut-value and unset.

I.e. if you have a `string name = 1`, and set `object.name = ''`, Protobuf will skip sending the tagged `name` field over the wire, because its understood that readers on the other end will, when they see `name` is not included in the payload, return empty string.

`ts-proto` models this behavior, of "unset" values being the primitive's default. (Technically by setting up an object prototype that knows the default values of the message's primitive fields.)

If you want fields where you can model set/unset, see Wrapper Types.

# Wrapper Types

In core Protobuf, unset primitive fields become their respective default values (so you loose ability to distinguish "unset" from "default").
 
However, unset message fields stay `null`.

This allows a cute hack where you can model a logical `string | unset` by creating a field that is technically a message (i.e. so it can stay `null` for the unset case), but the message only has a single string field (i.e for storing the value in the set case).

Protobuf has already "blessed" this pattern with several built-in types, i.e. `google.protobuf.StringValue`, `google.protobuf.Int32Value`, etc.

`ts-proto` understands these wrapper types and "re-idiomizes" them by generating a `google.protobuf.StringValue name = 1` field as a `name: string | undefined`, and hides the `StringValue` implementation detail from your code (i.e. during `encode`/`decode` of the `name` field on the wire to external consumers, it's still read/written as a `StringValue` message field).

This makes dealing with `string | unset` in your code much nicer, albeit it's unfortunate that, in Protobuf core, this is not as simple as marking a `string name = 1` field as `optional`, i.e. you have to "dirty" your proto files a bit by knowing to use the `StringValue` convention.

# Number Types

Numbers are by default assumed to be plain JavaScript `number`s.

This is fine for Protobuf types like `int32` and `float`, but 64-bit types like `int64` can't be 100% represented by JavaScript's `number` type, because `int64` can have larger/smaller values than `number`.
 
ts-proto's default configuration (which is `forceLong=number`) is to still use `number` for 64-bit fields, and then throw an error if a value (at runtime) is larger than `Number.MAX_SAFE_INTEGER`.
 
If you expect to use 64-bit / higher-than-`MAX_SAFE_INTEGER` values, then you can use the ts-proto `forceLong` option, which uses the [long](https://www.npmjs.com/package/long) npm package to support the entire range of 64-bit values.

The protobuf number types map to JavaScript types based on the `forceLong` config option:

| Protobuf number types | Default/`forceLong=number` | `forceLong=long` | `forceLong=string` |
| --------------------- | -------------------------- | ---------------- | ------------------ |
| double                | number                     | number           | number             |
| float                 | number                     | number           | number             |
| int32                 | number                     | number           | number             |
| int64                 | number\*                   | Long             | string             |
| uint32                | number                     | number           | number             |
| uint64                | number\*                   | Unsigned Long    | string             |
| sint32                | number                     | number           | number             |
| sint64                | number\*                   | Long             | string             |
| fixed32               | number                     | number           | number             |
| fixed64               | number\*                   | Unsigned Long    | string             |
| sfixed32              | number                     | number           | number             |
| sfixed64              | number\*                   | Long             | string             |

Where (\*) indicates they might throw an error at runtime.

# Timestamps

The representation of `google.protobuf.Timestamp` is configurable by the `useDate` flag.

| Protobuf well-known type    | Default/`useDate=true` | `useDate=false`                      | `useDate=string` |
| --------------------------- | ---------------------- | ------------------------------------ | ---------------- |
| `google.protobuf.Timestamp` | `Date`                 | `{ seconds: number, nanos: number }` | `string`         |

# Current Status of Optional Values

- Required primitives: use as-is, i.e. `string name = 1`.
- Optional primitives: use wrapper types, i.e. `StringValue name = 1`.
- Required messages: not available
- Optional primitives: use as-is, i.e. `SubMessage message = 1`.
