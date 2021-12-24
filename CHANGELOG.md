# [1.96.0](https://github.com/stephenh/ts-proto/compare/v1.95.1...v1.96.0) (2021-12-24)


### Features

* `enumsAsLiterals` option ([#450](https://github.com/stephenh/ts-proto/issues/450)) ([fcaade2](https://github.com/stephenh/ts-proto/commit/fcaade2855ae28ea3553a365556ccb92a9644d70))

## [1.95.1](https://github.com/stephenh/ts-proto/compare/v1.95.0...v1.95.1) (2021-12-23)


### Bug Fixes

* Add service to the client constructor. ([#455](https://github.com/stephenh/ts-proto/issues/455)) ([8c32104](https://github.com/stephenh/ts-proto/commit/8c32104a8522cfe2febcf2338d51710021d837ff))

# [1.95.0](https://github.com/stephenh/ts-proto/compare/v1.94.0...v1.95.0) (2021-12-14)


### Features

* Add useOptionals=all to enable non-field members to be optional. ([#402](https://github.com/stephenh/ts-proto/issues/402)) ([e7b70cb](https://github.com/stephenh/ts-proto/commit/e7b70cbd7b9bd43bf9e6e54e25bc48c527718317))

# [1.94.0](https://github.com/stephenh/ts-proto/compare/v1.93.3...v1.94.0) (2021-12-14)


### Features

* Round numbers in toJSON. ([#444](https://github.com/stephenh/ts-proto/issues/444)) ([bd2df7b](https://github.com/stephenh/ts-proto/commit/bd2df7b7176e961955ed1dcacb3602384e13ee45))

## [1.93.3](https://github.com/stephenh/ts-proto/compare/v1.93.2...v1.93.3) (2021-12-13)


### Bug Fixes

* support mutliple options in snakeToCamel flag  ([#429](https://github.com/stephenh/ts-proto/issues/429)) ([cff6674](https://github.com/stephenh/ts-proto/commit/cff667406cba21676546fd91b04cf2cbc571ed7d)), closes [#423](https://github.com/stephenh/ts-proto/issues/423)

## [1.93.2](https://github.com/stephenh/ts-proto/compare/v1.93.1...v1.93.2) (2021-12-09)


### Bug Fixes

* standalone dockerized protoc alias ([#438](https://github.com/stephenh/ts-proto/issues/438)) ([466f7d9](https://github.com/stephenh/ts-proto/commit/466f7d91551c6297fc1b9677f7a5839f8cdba0c6))

## [1.93.1](https://github.com/stephenh/ts-proto/compare/v1.93.0...v1.93.1) (2021-12-08)


### Bug Fixes

* Unwrap google.protobuf.BytesValue to Buffer when env=node ([#439](https://github.com/stephenh/ts-proto/issues/439)) ([73aa836](https://github.com/stephenh/ts-proto/commit/73aa8368300818068f3cddc5f046d990c66ab4f2))

# [1.93.0](https://github.com/stephenh/ts-proto/compare/v1.92.2...v1.93.0) (2021-12-08)


### Features

* Allow optional suffix for generated files ([#431](https://github.com/stephenh/ts-proto/issues/431)) ([d826966](https://github.com/stephenh/ts-proto/commit/d826966f22830920444963b3894ffc0be9b7c319))

## [1.92.2](https://github.com/stephenh/ts-proto/compare/v1.92.1...v1.92.2) (2021-12-08)


### Bug Fixes

* noImplicitReturns error in Value.unwrap ([#436](https://github.com/stephenh/ts-proto/issues/436)) ([2d7a5d0](https://github.com/stephenh/ts-proto/commit/2d7a5d04c72ace58fa3a6745c3857f6cc0468543)), closes [#432](https://github.com/stephenh/ts-proto/issues/432)

## [1.92.1](https://github.com/stephenh/ts-proto/compare/v1.92.0...v1.92.1) (2021-12-02)


### Bug Fixes

* Respect stringEnums option in wrap function ([#420](https://github.com/stephenh/ts-proto/issues/420)) ([7adf90c](https://github.com/stephenh/ts-proto/commit/7adf90c23c46950bcf457b317764393ff4af2bf2))

# [1.92.0](https://github.com/stephenh/ts-proto/compare/v1.91.0...v1.92.0) (2021-11-28)


### Features

* Use exact types for fromPartial ([#412](https://github.com/stephenh/ts-proto/issues/412)) ([808f8a7](https://github.com/stephenh/ts-proto/commit/808f8a7a77d56f65dd4a4643dd66158f106ab755)), closes [#156](https://github.com/stephenh/ts-proto/issues/156)

# [1.91.0](https://github.com/stephenh/ts-proto/compare/v1.90.1...v1.91.0) (2021-11-27)


### Bug Fixes

* use Long.fromValue instead of Long.fromString for improved robustness regarding already parsed objects ([#405](https://github.com/stephenh/ts-proto/issues/405)) ([7bdc3ee](https://github.com/stephenh/ts-proto/commit/7bdc3eee05ed1318e18e27aa7d5bb2680060f8b6))


### Features

* Include dockerized protoc ([#404](https://github.com/stephenh/ts-proto/issues/404)) ([7564a78](https://github.com/stephenh/ts-proto/commit/7564a7887ccd0bb80cac19d313ee9bd8daae778d))

## [1.90.1](https://github.com/stephenh/ts-proto/compare/v1.90.0...v1.90.1) (2021-11-27)


### Bug Fixes

* code-generation for Services with Struct response types ([#407](https://github.com/stephenh/ts-proto/issues/407)) ([f041fa1](https://github.com/stephenh/ts-proto/commit/f041fa1047816748c366bcb81895b6b917eb328d))

# [1.90.0](https://github.com/stephenh/ts-proto/compare/v1.89.0...v1.90.0) (2021-11-24)


### Features

*  Add support for 'json_name' annotation ([#408](https://github.com/stephenh/ts-proto/issues/408)) ([b519717](https://github.com/stephenh/ts-proto/commit/b5197174bcaacb8f163cd197d52ab9c645d21d4c))

# [1.89.0](https://github.com/stephenh/ts-proto/compare/v1.88.0...v1.89.0) (2021-11-24)


### Features

* Improve map reading (fromJSON/fromPartial) ([#410](https://github.com/stephenh/ts-proto/issues/410)) ([057d438](https://github.com/stephenh/ts-proto/commit/057d438548d95c354331f7d2d767ccff952ad5c6))

# [1.88.0](https://github.com/stephenh/ts-proto/compare/v1.87.1...v1.88.0) (2021-11-22)


### Features

* Support for Google.Protobuf.Value, ListValue and Struct ([#396](https://github.com/stephenh/ts-proto/issues/396)) ([7dd9c16](https://github.com/stephenh/ts-proto/commit/7dd9c16ffdec4d9ea296fbdc30d390fe44192c42))

## [1.87.1](https://github.com/stephenh/ts-proto/compare/v1.87.0...v1.87.1) (2021-11-21)


### Bug Fixes

* code generation for int64 map values in fromPartial and fromJson ([#395](https://github.com/stephenh/ts-proto/issues/395)) ([d3ea8eb](https://github.com/stephenh/ts-proto/commit/d3ea8eb69e19a5e45fcc1766c4af1194b17e48fc))

# [1.87.0](https://github.com/stephenh/ts-proto/compare/v1.86.0...v1.87.0) (2021-11-16)


### Features

* Use ternary operator for conditional assignments ([#394](https://github.com/stephenh/ts-proto/issues/394)) ([d84c084](https://github.com/stephenh/ts-proto/commit/d84c084fb56c958c184f8971479979b8bfb17ccc))

# [1.86.0](https://github.com/stephenh/ts-proto/compare/v1.85.0...v1.86.0) (2021-11-15)


### Features

* Initialize lists with map ([#387](https://github.com/stephenh/ts-proto/issues/387)) ([200e674](https://github.com/stephenh/ts-proto/commit/200e674e4baf2640d67720ad535fe042d291d4a0))

# [1.85.0](https://github.com/stephenh/ts-proto/compare/v1.84.0...v1.85.0) (2021-11-02)


### Features

* Streaming support ([#373](https://github.com/stephenh/ts-proto/issues/373)) ([459b94f](https://github.com/stephenh/ts-proto/commit/459b94f5b2988d58d186461332e888c3e511603a))

# [1.84.0](https://github.com/stephenh/ts-proto/compare/v1.83.3...v1.84.0) (2021-11-02)


### Features

* Reduce code size by using nullish coalescing operator in fromPartial ([#376](https://github.com/stephenh/ts-proto/issues/376)) ([19d2ded](https://github.com/stephenh/ts-proto/commit/19d2deda2cf7c47b1b56bfc65cf58653291dba4a))

## [1.83.3](https://github.com/stephenh/ts-proto/compare/v1.83.2...v1.83.3) (2021-10-28)


### Bug Fixes

* fix codegen for maps with wrapper value type ([#370](https://github.com/stephenh/ts-proto/issues/370)) ([dd2481d](https://github.com/stephenh/ts-proto/commit/dd2481df0835faafc561aad4a4d0c9c2ff9d868a))

## [1.83.2](https://github.com/stephenh/ts-proto/compare/v1.83.1...v1.83.2) (2021-10-26)


### Bug Fixes

* Add missing defaults to fromPartial if options.oneof is UNIONS ([#375](https://github.com/stephenh/ts-proto/issues/375)) ([21781e9](https://github.com/stephenh/ts-proto/commit/21781e98bb6117b540be8c3f2c38ac3ad5cbbb44))

## [1.83.1](https://github.com/stephenh/ts-proto/compare/v1.83.0...v1.83.1) (2021-09-17)


### Bug Fixes

* deprecated grpc and replace with @grpc/grpc-js ([#362](https://github.com/stephenh/ts-proto/issues/362)) ([1a11b97](https://github.com/stephenh/ts-proto/commit/1a11b97e9b5e92e79fdd4e22d3e8ea4536af243b))

# [1.83.0](https://github.com/stephenh/ts-proto/compare/v1.82.5...v1.83.0) (2021-09-12)


### Features

* Service generation option ([#357](https://github.com/stephenh/ts-proto/issues/357)) ([7a2cf83](https://github.com/stephenh/ts-proto/commit/7a2cf831c3768e5afd76dea37f3165df4886136e))

## [1.82.5](https://github.com/stephenh/ts-proto/compare/v1.82.4...v1.82.5) (2021-08-05)


### Bug Fixes

* Field starting with '_' generates an interface property starting with 'undefined' ([#344](https://github.com/stephenh/ts-proto/issues/344)) ([fab354f](https://github.com/stephenh/ts-proto/commit/fab354f3f8f3aae51bb0377f98138bc80a1113e3))

## [1.82.4](https://github.com/stephenh/ts-proto/compare/v1.82.3...v1.82.4) (2021-08-04)


### Bug Fixes

* resolve import collisions for enums ([#341](https://github.com/stephenh/ts-proto/issues/341)) ([50fe34e](https://github.com/stephenh/ts-proto/commit/50fe34ecc66877bead1f0ae55afe28b88e5eda10))

## [1.82.3](https://github.com/stephenh/ts-proto/compare/v1.82.2...v1.82.3) (2021-08-03)


### Bug Fixes

* resolve import collisions for enums ([#339](https://github.com/stephenh/ts-proto/issues/339)) ([8118748](https://github.com/stephenh/ts-proto/commit/81187488edbbe7b1c8e7028e0bc8f3a8005a97c8))

## [1.82.2](https://github.com/stephenh/ts-proto/compare/v1.82.1...v1.82.2) (2021-07-11)


### Bug Fixes

* grpc-js support for nestjs ([#307](https://github.com/stephenh/ts-proto/issues/307)) ([d11c8c2](https://github.com/stephenh/ts-proto/commit/d11c8c2bc041c2e8a25ebf7f1c68c901c18ee0ca))

## [1.82.1](https://github.com/stephenh/ts-proto/compare/v1.82.0...v1.82.1) (2021-07-11)


### Bug Fixes

* Consistently apply lowerCaseServiceMethods=true ([#332](https://github.com/stephenh/ts-proto/issues/332)) ([57f2473](https://github.com/stephenh/ts-proto/commit/57f24739f425ec05eabd8c8d6959d4b1b14623a1))

# [1.82.0](https://github.com/stephenh/ts-proto/compare/v1.81.3...v1.82.0) (2021-06-28)


### Features

* framework-agnostic service definitions ([#316](https://github.com/stephenh/ts-proto/issues/316)) ([3d89282](https://github.com/stephenh/ts-proto/commit/3d89282176f8f16a33eea5042df0439c3f23b038))

## [1.81.3](https://github.com/stephenh/ts-proto/compare/v1.81.2...v1.81.3) (2021-06-13)


### Bug Fixes

* close server stream on observer unsubscribe ([#309](https://github.com/stephenh/ts-proto/issues/309)) ([4b72563](https://github.com/stephenh/ts-proto/commit/4b7256381c3b2ff2d4d5190e878de6903cd0d53a))

## [1.81.2](https://github.com/stephenh/ts-proto/compare/v1.81.1...v1.81.2) (2021-06-13)


### Bug Fixes

* Fix TypeScript errors when compiling with `noUncheckedIndexedAccess` ([#297](https://github.com/stephenh/ts-proto/issues/297)) ([f865e43](https://github.com/stephenh/ts-proto/commit/f865e431c2613a1cfe9dc1d87fba6a9e4bcd3b16))

## [1.81.1](https://github.com/stephenh/ts-proto/compare/v1.81.0...v1.81.1) (2021-05-23)


### Bug Fixes

* Fix encode wrap types ([#303](https://github.com/stephenh/ts-proto/issues/303)) ([533c0e0](https://github.com/stephenh/ts-proto/commit/533c0e0959943562a59de5f456b83ab0b0b6abed))

# [1.81.0](https://github.com/stephenh/ts-proto/compare/v1.80.1...v1.81.0) (2021-05-23)


### Features

* implemented emitImportedFiles flag ([#302](https://github.com/stephenh/ts-proto/issues/302)) ([16b4aca](https://github.com/stephenh/ts-proto/commit/16b4aca98aa9f0266734421314baaa5259e3f4e2)), closes [#294](https://github.com/stephenh/ts-proto/issues/294) [#283](https://github.com/stephenh/ts-proto/issues/283) [#283](https://github.com/stephenh/ts-proto/issues/283)

## [1.80.1](https://github.com/stephenh/ts-proto/compare/v1.80.0...v1.80.1) (2021-05-18)


### Bug Fixes

* resolve import collisions for interfaces ([#300](https://github.com/stephenh/ts-proto/issues/300)) ([773d866](https://github.com/stephenh/ts-proto/commit/773d86686c15e9e831ad1c22405dee8d7251072e)), closes [#298](https://github.com/stephenh/ts-proto/issues/298)

# [1.80.0](https://github.com/stephenh/ts-proto/compare/v1.79.8...v1.80.0) (2021-05-09)


### Features

* Bind service methods to class ([#290](https://github.com/stephenh/ts-proto/issues/290)) ([84060e2](https://github.com/stephenh/ts-proto/commit/84060e204d0e42688b8da85d434fe3d24788813b))

## [1.79.8](https://github.com/stephenh/ts-proto/compare/v1.79.7...v1.79.8) (2021-05-09)


### Bug Fixes

* Fix integration test codegen script ([#291](https://github.com/stephenh/ts-proto/issues/291)) ([a51eee5](https://github.com/stephenh/ts-proto/commit/a51eee55d07c43b4b7cbe1ad2eb010f33c216a29))

## [1.79.7](https://github.com/stephenh/ts-proto/compare/v1.79.6...v1.79.7) (2021-04-27)


### Bug Fixes

* add missing `boolean` to `DeepPartial` ([#287](https://github.com/stephenh/ts-proto/issues/287)) ([ba18380](https://github.com/stephenh/ts-proto/commit/ba1838069c6119516ceb1bfa5bc0242724e2b520))

## [1.79.6](https://github.com/stephenh/ts-proto/compare/v1.79.5...v1.79.6) (2021-04-24)


### Bug Fixes

* Handle empty package ([#285](https://github.com/stephenh/ts-proto/issues/285)) ([5eadf92](https://github.com/stephenh/ts-proto/commit/5eadf9271fd9b00180593f3771266f3796a157bb))

## [1.79.5](https://github.com/stephenh/ts-proto/compare/v1.79.4...v1.79.5) (2021-04-24)


### Bug Fixes

* Support repeated string enums. ([#284](https://github.com/stephenh/ts-proto/issues/284)) ([be9ecf7](https://github.com/stephenh/ts-proto/commit/be9ecf785952ab7515155cb495e8e0da76b93a38))

## [1.79.4](https://github.com/stephenh/ts-proto/compare/v1.79.3...v1.79.4) (2021-04-23)


### Bug Fixes

* ignore `$type` field in `DeepPartial` ([#282](https://github.com/stephenh/ts-proto/issues/282)) ([6c5087e](https://github.com/stephenh/ts-proto/commit/6c5087ed489283bf7293a2cdbee71dd83484c68e))

## [1.79.3](https://github.com/stephenh/ts-proto/compare/v1.79.2...v1.79.3) (2021-04-16)


### Bug Fixes

* Add long dep to ts-proto-descriptors. ([#275](https://github.com/stephenh/ts-proto/issues/275)) ([0d20827](https://github.com/stephenh/ts-proto/commit/0d20827dbae5195d30a3094c4ea5e98833909daa))

## [1.79.2](https://github.com/stephenh/ts-proto/compare/v1.79.1...v1.79.2) (2021-04-07)


### Bug Fixes

* Use the right Metadata for grpc-web. Fixes [#270](https://github.com/stephenh/ts-proto/issues/270). ([#271](https://github.com/stephenh/ts-proto/issues/271)) ([640e645](https://github.com/stephenh/ts-proto/commit/640e645dd93cd0e04abac17de9899aa6a172ac37))

## [1.79.1](https://github.com/stephenh/ts-proto/compare/v1.79.0...v1.79.1) (2021-04-04)


### Bug Fixes

* Build before releasing, fixes [#267](https://github.com/stephenh/ts-proto/issues/267). ([#269](https://github.com/stephenh/ts-proto/issues/269)) ([1f1bcfe](https://github.com/stephenh/ts-proto/commit/1f1bcfeca329e36c41c069b791e803ceb7cb975c))

# [1.79.0](https://github.com/stephenh/ts-proto/compare/v1.78.1...v1.79.0) (2021-04-02)


### Features

* Add support for useDate=string ([#221](https://github.com/stephenh/ts-proto/issues/221)) ([d967a9a](https://github.com/stephenh/ts-proto/commit/d967a9afd6cf63fc7b156d506b8683b2f8fd6569))

## [1.78.1](https://github.com/stephenh/ts-proto/compare/v1.78.0...v1.78.1) (2021-04-02)


### Bug Fixes

* Fix bad grpc.Metadata import. Fixes [#188](https://github.com/stephenh/ts-proto/issues/188). ([#259](https://github.com/stephenh/ts-proto/issues/259)) ([cd83733](https://github.com/stephenh/ts-proto/commit/cd83733bfe64ba637633282c3170011051dec41e))

# [1.78.0](https://github.com/stephenh/ts-proto/compare/v1.77.0...v1.78.0) (2021-04-02)


### Features

* Add support for @grpc/grpc-js ([#252](https://github.com/stephenh/ts-proto/issues/252)) ([99a3d92](https://github.com/stephenh/ts-proto/commit/99a3d9218093c9aa1726f0c0b403cb0e95aac82e))

## v1.77.0

* Fix bytes initialization. Fixes #237. (willclarktech and webmaster128)
* Better camelization for `FOO_BAR` to `fooBar`
* Add `message.$type` fields and a type register. See #254. (aikoven)
* Don't output long initialization for only types. Fixes #247.

## v1.76.0

* Always initial long when `forceLong=long`. Fixes #247. (daw1012345)

## v1.75.0

* Fix `stringEnums` combined with `outputEncodeMethods`

## v1.74.0

* Fix `@improbable-eng` imports to work with babel. (m!m)

## v1.73.0

* Fix compiler errors when strict is enabled. Fixes #235. (Graham)

## v1.72.0

* Revert the change in v1.70.0 that changed `useOptionals` handling of repeated fields.

Before this PR, `useOptionals` was purely a type system tweak, and this PR introduced a
change to decoding semantics, so it needs to be re-introduced under a separate flag to
avoid being a breaking change.

## v1.71.0

* Add `constEnum` option to enable `const` enums. Fixes #230. (lxgreen)

## v1.70.0

* Update `useOptionals` to make repeated fields optional as well. Fixes #225. (i-dot)

## v1.69.0

* Actually fix #223.

## v1.68.0

* Allow setting `outputJsonMethods=true` while using `nestJs=true`. Fixes #223.

## v1.67.0

* Add `outputPartialMethods`. See #207. (mharsat)

## v1.66.0

* Allow `returnObservable=true` when not using grpc-web. See #220. (ardyfeb)
* Fix `useDate=false` in encoding/JSON methods. See #211. (willclarktech)
* Revert back to object spread instead of `Object.create` for primitive default values. Fixes #218.

## v1.65.0

* Fix `globalThis` compilation errors with messages called `Error`

## v1.64.0

* Don't put default values on the wire while encoding. Fixed #213. (webmaster128)

## v1.63.0

* Qualify `Object.create` with `globalThis` to avoid collisions with message names of `Object`. Fixes #216.

## v1.62.0

* Use `ts-proto-descriptors` package to read/write the `protoc` stdin `CodeGeneratorRequest` and stdout `CodeGeneratorResponse` messages.

## v1.61.0

* Use `Object.create` in `decode` to create messages so that `hasOwnProperty` will be false for fields that are using default values.

  In theory fields being default values is not supposed to be observable (on the wire at least), but protobuf itself specifically uses this for the `FieldDescriptorProto.oneofIndex` field.

## v1.60.0

* New `outputSchema` option to include the `*.proto` schema/metadata in the generated output file (Vilsol)

## v1.59.0

* Fix `DeepPartial` imports when services and messages are in separate files

## v1.58.0

* Fix JSON parsing of long wrapper values when forceLong != long (jessebutterfield)

## v1.57.0

* Accidental duplicate publish.

## v1.56.0

* Fix import collisions for imported-only symbols (stezu)

## v1.55.0

* Fix missing `fromTimestamp` import in generated code, fixes #200 (jessebutterfield)

## v1.54.0

* Fix `google.protobuf.BytesValue` in `fromPartial` & `fromJSON` (ebakoba)

## v1.53.0

* Fix typo for method names in service output (willclarktech)

## v1.52.0

* Fix `stringEnums=true` in `fromJSON` and `fromPartial` output (mharsat)

## v1.51.0

* Re-publish to fix previous publish error.

## v1.50.0

* Allow setting `addGrpcMetadata=true` w/o using NestJS (#188)

## v1.49.0

* Add `exportCommonSymbols` flag (defaults `true`) that, when `false` skips `export`ing a few common symbols (i.e. `DeepPartial`) that make it more likely for multiple generated files to be imported by `import * from ...` and not have import conflicts, i.e. for barrel imports.
## v1.48.0

* Tweak `atob` & `btoa` utility methods to prefix `Buffer` with `globalThis` to avoid issues in non-node envs. Fixes #77.

## v1.47.0

* Avoid import conflicts when an imported message name matches a locally-declared message name, see #36.

## v1.46.0

* Import `protobufjs/minimal` as a default import when using `esModuleInterop`
    * This should fix running in "type: module" ESM modules, see #181

## v1.45.0

* Add new `esModuleInterop` option to fix `Long` imports for projects that use `esModuleInterop: true` in their `tsconfig.json`.

## v1.44.0

* Fix `DeepPartial` when used with `Long`s (willclarktech)

## v1.43.0

* Polyfill `globalThis` for Node v10 support (willclarktech)

## v1.42.1

* Handle `@deprecated` when there are no other comments (ShakedH)

## v1.42.0

* Messages and fields that are marked as `deprecated` in `*.proto` files will have a `@deprecated` marker included in their JSDoc output (ShakedH)
* Upgraded to the latest ts-poet

## v1.41.1

* [grpc-web] Remove `import =` to support not using synthetic default imports

## v1.41.0

* [grpc-web] Fix code generation errors introduced in v1.40.0
* [grpc-web] Revert breaking change of `unaryTransport` / `invokeTransport`
    * Now client constructors take `transport` & `streamingTransport`, and streaming calls will use `streamingTransport` is set, and otherwise fallback on `transport`.
* [grpc-web] Remove `rxjs` dependency unless streaming is actually used

## v1.40.0

* Add support for grpc-web streaming responses (PhilipMantrov)

## v1.38.0

* Add `unrecognizedEnum` option for disabling the `UNRECOGNIZED` enum values (ShakedH)

## v1.37.0

* Fix `forceLong` behavior when using wrapper types (Graham)
* Add `rpcDataLoaderOptions` (Felix Mo)
* Add `useDate` option to disable `java.util.Date` mapping (Graham)
    * This is primarily useful for NestJS which can only encode the original `google.protobuf.Timestamp` type
* Add `stringEnums` option (Bastian Eicher)
    * Note this is not supported in the binary `encode`/`decode` methods yet
* Avoid unnecessary `import =` usage (Graham)

## v1.36.0

* Add a `protobufPackage` exported `const` for metadata

## v1.35.1

* Fix maps of enums (@ahmadj-levelbenefits)

## v1.35.0

* Fix proto3 optional support

## v1.34.0

* Fix `blob`s in `fromPartial` and `toJSON`

## v1.33.0

* Automatically configure `protobuf.util.Long` when 64-bit numbers are used (fixes #78)

## v1.32.0

* Add support for the experimental proto3 `optional` keyword

## v1.31.0

* Fix `oneof=unions` not decoding default values correctly (@philikon)

## v1.30.0

* Accept cross-call metadata args in the `GrpcWebImpl` constructor
* Accept `DeepPartial` request types for grpc-web calls

## v1.29.0

* Fix `toJSON` with maps of messages (#124 by @mscolnick)

## v1.28.0

* Use `enum` keyword for modeling keywords again
* Fix maps of `google.protobuf.Timestamp`s
* Fix name conflicts when using `google.type.Date`
* Fix maps of bytes in JSON
* Add initial support for grpc-web using the `@improbable-eng/grpc-web` runtime

## v1.27.1

* Extra release to ensure the build output is correct.

## v1.27.0

* Added a `addNestjsRestParameter=true` that adds a `...rest: any` parameter to use NestJS decorators like `@CurrentUser` (@ToonvanStrijp)

## v1.26.0

* Added a `oneof=properties` that generates `oneof`s as an Abstract Data Type (ADT) of each option (@philikon)

## v1.25.0

* Added a `useOptionals=true` option that makes non-scaler/oneof fields optional, i.e. `message?: Message` instead of `message: Message | undefined` (@philikon)

## v1.24.0

* Messages no longer use a base prototype to get default values. (@cliedeman)

## v1.23.0

* Added a `env=both` option and made that the default

  This restores the pre-1.22.0 behavior that bytes are `Uint8Array` so that the `Buffer` support is not a breaking change. Users have to opt-in with `env=node`.

  Also fixes a bug introduced in 1.22.0 that output an `as Buffer` without first checking `env=node`.

## v1.22.0

* Added a `env=node`/`env=browser` option that defaults to `env=node`

  Currently `env=node` only changes the types of `bytes` from `Uint8Array` to `Buffer`, as a convenience for Node programming where `Buffer` (which is the defacto subclass of `Uint8Array`) is more widely used (@dolsup)

## v1.21.5

* Drop drop falsey values in maps in `decode` and `fromPartial`. Fixes #79. (@timostamm)

## v1.21.4

* Repeated fields cannot be optional, fixes #80 (@philikon)

## v1.21.2 and v1.21.3

* Use `globalThis.Error` instead of `global.Error` for browsers, fix for #70

## v1.21.1

* Fix NestJS decorator for only-stream-in / only-stream-out methods

## v1.21.0

* Allow `Message.decode` methods to take a `Uint8Array` (or `Buffer`) directly instead of having to pass a `Reader`

## v1.20.2

* Another fix for NestJS-related `PACKAGE_NAME` consts

## v1.20.1

* Fix for NestJS-related `PACKAGE_NAME` consts

## v1.20.0

* Support for NestJS streams

## v1.19.0

* Added support for generating [NestJS](https://docs.nestjs.com/microservices/grpc) friendly output (thanks Ian Gregson!)
    * See the readme for new options `nestJs`, `lowerCaseServiceMethods`, `returnObservable`, etc.
