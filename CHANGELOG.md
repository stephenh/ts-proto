# [2.6.0](https://github.com/stephenh/ts-proto/compare/v2.5.1...v2.6.0) (2024-12-09)


### Features

* Make sure all types support prefix/suffix ([#1148](https://github.com/stephenh/ts-proto/issues/1148)) ([ddf2122](https://github.com/stephenh/ts-proto/commit/ddf21224d76f63e28e915889aa931c170cde4734))

## [2.5.1](https://github.com/stephenh/ts-proto/compare/v2.5.0...v2.5.1) (2024-12-09)


### Bug Fixes

* google protobuf timestamps don't properly get suffixed when useDate=false and prefix/suffix ([#1146](https://github.com/stephenh/ts-proto/issues/1146)) ([53f799e](https://github.com/stephenh/ts-proto/commit/53f799e34b75940aeafec0fafa50f3bd5849dcad))

# [2.5.0](https://github.com/stephenh/ts-proto/compare/v2.4.2...v2.5.0) (2024-12-03)


### Features

* Add options to limit generation of encode and decode methods to only specific message types ([#1085](https://github.com/stephenh/ts-proto/issues/1085)) ([c7372fa](https://github.com/stephenh/ts-proto/commit/c7372fab20cdac0199b79fd861e6b08113aba145)), closes [#1084](https://github.com/stephenh/ts-proto/issues/1084)

## [2.4.2](https://github.com/stephenh/ts-proto/compare/v2.4.1...v2.4.2) (2024-11-28)


### Performance Improvements

* Replacing "else if" with a "switch case" statement to improve Typescript performance ([#1142](https://github.com/stephenh/ts-proto/issues/1142)) ([de1a616](https://github.com/stephenh/ts-proto/commit/de1a616d24a90ef7b281c9e8966556adfa156ebb)), closes [#1135](https://github.com/stephenh/ts-proto/issues/1135) [#1141](https://github.com/stephenh/ts-proto/issues/1141)

## [2.4.1](https://github.com/stephenh/ts-proto/compare/v2.4.0...v2.4.1) (2024-11-26)


### Performance Improvements

* Generating "else if" where applicable ([#1141](https://github.com/stephenh/ts-proto/issues/1141)) ([4a8018c](https://github.com/stephenh/ts-proto/commit/4a8018c915dabbc83629f021a2899ade55b6c8de))

# [2.4.0](https://github.com/stephenh/ts-proto/compare/v2.3.0...v2.4.0) (2024-11-25)


### Features

* Avoid adding empty trailing comments to oneof unions ([#1140](https://github.com/stephenh/ts-proto/issues/1140)) ([5359e8d](https://github.com/stephenh/ts-proto/commit/5359e8d4b08ad114080f04ec8327bb2379dddd86)), closes [#1136](https://github.com/stephenh/ts-proto/issues/1136)

# [2.3.0](https://github.com/stephenh/ts-proto/compare/v2.2.7...v2.3.0) (2024-11-16)


### Features

* add support for comments on union fields in generateOneofProperty ([#1136](https://github.com/stephenh/ts-proto/issues/1136)) ([c933c9c](https://github.com/stephenh/ts-proto/commit/c933c9c46dbaa278b33b16270bab51063ccb513c)), closes [#1122](https://github.com/stephenh/ts-proto/issues/1122)

## [2.2.7](https://github.com/stephenh/ts-proto/compare/v2.2.6...v2.2.7) (2024-11-11)


### Bug Fixes

* problem with verbatimModuleSyntax for grpc-js ([#1132](https://github.com/stephenh/ts-proto/issues/1132)) ([bedfa31](https://github.com/stephenh/ts-proto/commit/bedfa317e7b115d10ee3de897eae2490b5eccdc9))

## [2.2.6](https://github.com/stephenh/ts-proto/compare/v2.2.5...v2.2.6) (2024-11-11)


### Bug Fixes

* **Schema generation:** ensure Buffer api is only used when in nodejs environment ([#1134](https://github.com/stephenh/ts-proto/issues/1134)) ([49035a4](https://github.com/stephenh/ts-proto/commit/49035a47e1d859563c631267ea7e1724cbf2c4a8))

## [2.2.5](https://github.com/stephenh/ts-proto/compare/v2.2.4...v2.2.5) (2024-10-22)


### Bug Fixes

* Added null propagation and guard ([#1127](https://github.com/stephenh/ts-proto/issues/1127)) ([86637fa](https://github.com/stephenh/ts-proto/commit/86637fa6c39ddcc09cab3c486c34b7a52adaf694))

## [2.2.4](https://github.com/stephenh/ts-proto/compare/v2.2.3...v2.2.4) (2024-10-15)


### Bug Fixes

* Unbreak a use case for [#1110](https://github.com/stephenh/ts-proto/issues/1110) / fix for [#1121](https://github.com/stephenh/ts-proto/issues/1121) ([#1123](https://github.com/stephenh/ts-proto/issues/1123)) ([476e99b](https://github.com/stephenh/ts-proto/commit/476e99bcbc651cec1946d0dbad09dc9aea3224ff))

## [2.2.3](https://github.com/stephenh/ts-proto/compare/v2.2.2...v2.2.3) (2024-10-06)


### Bug Fixes

* Don't fail on Function message names ([#1119](https://github.com/stephenh/ts-proto/issues/1119)) ([da048a1](https://github.com/stephenh/ts-proto/commit/da048a1e78cdc1baa228700c40a944652998d2a1)), closes [#1110](https://github.com/stephenh/ts-proto/issues/1110)

## [2.2.2](https://github.com/stephenh/ts-proto/compare/v2.2.1...v2.2.2) (2024-10-04)


### Bug Fixes

* prefix and suffixes were not being applied to to/fromTimestamp resulting in compile error ([#1118](https://github.com/stephenh/ts-proto/issues/1118)) ([22c2905](https://github.com/stephenh/ts-proto/commit/22c2905ca53c88bdb2802386d414d584a451aa4c))

## [2.2.1](https://github.com/stephenh/ts-proto/compare/v2.2.0...v2.2.1) (2024-09-29)


### Bug Fixes

* Compilation error for nested repeated fields with `useOptionals=all` ([#1113](https://github.com/stephenh/ts-proto/issues/1113)) ([e89fc51](https://github.com/stephenh/ts-proto/commit/e89fc51fcc3ba494a81884cc136779202d3f1e16)), closes [#1112](https://github.com/stephenh/ts-proto/issues/1112)

# [2.2.0](https://github.com/stephenh/ts-proto/compare/v2.1.0...v2.2.0) (2024-09-06)


### Features

* Add interface for static message methods ([#1104](https://github.com/stephenh/ts-proto/issues/1104)) ([faa33b6](https://github.com/stephenh/ts-proto/commit/faa33b6f5170cabe4010c95d5f0a68b9f04f686b))

# [2.1.0](https://github.com/stephenh/ts-proto/compare/v2.0.4...v2.1.0) (2024-09-04)


### Features

* option to declare schema as const ([#1096](https://github.com/stephenh/ts-proto/issues/1096)) ([4cc1a1e](https://github.com/stephenh/ts-proto/commit/4cc1a1e4238cf628591414c02d39bd76dc75fb3a))

## [2.0.4](https://github.com/stephenh/ts-proto/compare/v2.0.3...v2.0.4) (2024-09-04)


### Bug Fixes

* Bump ts-proto-descriptors. ([#1102](https://github.com/stephenh/ts-proto/issues/1102)) ([3d1cd61](https://github.com/stephenh/ts-proto/commit/3d1cd61ed7bbac4d6dc7353c49d0732aad22a504)), closes [#1101](https://github.com/stephenh/ts-proto/issues/1101)

## [2.0.3](https://github.com/stephenh/ts-proto/compare/v2.0.2...v2.0.3) (2024-08-21)


### Bug Fixes

* Fix running yarn:test locally. ([#1097](https://github.com/stephenh/ts-proto/issues/1097)) ([30385ed](https://github.com/stephenh/ts-proto/commit/30385edd565d873d550df765dac9570c125bef2c))

## [2.0.2](https://github.com/stephenh/ts-proto/compare/v2.0.1...v2.0.2) (2024-08-16)


### Bug Fixes

* Fix version loading in new dist layout. ([#1091](https://github.com/stephenh/ts-proto/issues/1091)) ([f1c23d2](https://github.com/stephenh/ts-proto/commit/f1c23d2eab096b7c6b2decd9f0886b5300c52712))

## [2.0.1](https://github.com/stephenh/ts-proto/compare/v2.0.0...v2.0.1) (2024-08-16)


### Bug Fixes

* Fix build from typescript bump. ([3ecd498](https://github.com/stephenh/ts-proto/commit/3ecd4986063952ae06c6136fbd9ae0cfc75212d8))

# [2.0.0](https://github.com/stephenh/ts-proto/compare/v1.181.2...v2.0.0) (2024-08-16)

## [1.181.2](https://github.com/stephenh/ts-proto/compare/v1.181.1...v1.181.2) (2024-08-15)


### Bug Fixes

* toJSON Function with `removeEnumPrefix=true` and `unrecognizedEnumValue=0` Options ([#1089](https://github.com/stephenh/ts-proto/issues/1089)) ([2401490](https://github.com/stephenh/ts-proto/commit/24014908f814e2720b9c2b9bd2ae1773be880a16)), closes [#1086](https://github.com/stephenh/ts-proto/issues/1086) [#1086](https://github.com/stephenh/ts-proto/issues/1086)

## [1.181.1](https://github.com/stephenh/ts-proto/compare/v1.181.0...v1.181.1) (2024-07-13)


### Bug Fixes

* Incorrect message names in the generated code for repeated fields ([#1073](https://github.com/stephenh/ts-proto/issues/1073)) ([8a95d8e](https://github.com/stephenh/ts-proto/commit/8a95d8e0983a38e604b6990461e726db566ff311)), closes [#1072](https://github.com/stephenh/ts-proto/issues/1072)

# [1.181.0](https://github.com/stephenh/ts-proto/compare/v1.180.0...v1.181.0) (2024-07-01)


### Features

* added the "typePrefix" and "typeSuffix" options. ([#1069](https://github.com/stephenh/ts-proto/issues/1069)) ([ab515cd](https://github.com/stephenh/ts-proto/commit/ab515cda322baeb94c7588117e4bb5bee6281874)), closes [#1033](https://github.com/stephenh/ts-proto/issues/1033)

# [1.180.0](https://github.com/stephenh/ts-proto/compare/v1.179.0...v1.180.0) (2024-06-15)


### Features

* oneof=unions-value to use the same field name for oneof cases ([#1062](https://github.com/stephenh/ts-proto/issues/1062)) ([7493090](https://github.com/stephenh/ts-proto/commit/74930908cc8e5292577a793b7ae06c3721225ac3)), closes [#1060](https://github.com/stephenh/ts-proto/issues/1060)

# [1.179.0](https://github.com/stephenh/ts-proto/compare/v1.178.0...v1.179.0) (2024-06-15)


### Features

* bigIntLiteral option for using BigInt literals ([#1063](https://github.com/stephenh/ts-proto/issues/1063)) ([b89fbcb](https://github.com/stephenh/ts-proto/commit/b89fbcb1f99ccfcd1f06551286c2459e44a3bac2)), closes [#928](https://github.com/stephenh/ts-proto/issues/928) [#932](https://github.com/stephenh/ts-proto/issues/932)

# [1.178.0](https://github.com/stephenh/ts-proto/compare/v1.177.0...v1.178.0) (2024-06-07)


### Features

* `no-file-descriptor` setting for outputSchema option ([#1047](https://github.com/stephenh/ts-proto/issues/1047)) ([c54f06c](https://github.com/stephenh/ts-proto/commit/c54f06c4a7dd766abf3f91932b1e4cdf38b7f346))

# [1.177.0](https://github.com/stephenh/ts-proto/compare/v1.176.3...v1.177.0) (2024-06-07)


### Features

* add option `noDefaultsForOptionals` ([#1051](https://github.com/stephenh/ts-proto/issues/1051)) ([41d1020](https://github.com/stephenh/ts-proto/commit/41d10205bf68468c37cf69e58dc4c4fdbfffcf5b))

## [1.176.3](https://github.com/stephenh/ts-proto/compare/v1.176.2...v1.176.3) (2024-06-07)


### Bug Fixes

* Add check for lower bound with forceLong=number ([#1057](https://github.com/stephenh/ts-proto/issues/1057)) ([01ef3c3](https://github.com/stephenh/ts-proto/commit/01ef3c3bb2a6ebb5b15fe8acfdc73f50b19a5a38))

## [1.176.2](https://github.com/stephenh/ts-proto/compare/v1.176.1...v1.176.2) (2024-06-04)


### Bug Fixes

* Fix snake casing numbers. ([#1052](https://github.com/stephenh/ts-proto/issues/1052)) ([f85a2f1](https://github.com/stephenh/ts-proto/commit/f85a2f1ed4e04143b96d6eaa3a589b16944d3239)), closes [#1048](https://github.com/stephenh/ts-proto/issues/1048)

## [1.176.1](https://github.com/stephenh/ts-proto/compare/v1.176.0...v1.176.1) (2024-05-25)


### Bug Fixes

* camelToSnake to respect uppercase words, such as "GetAPIValue" -> "GET_API_VALUE" ([#1046](https://github.com/stephenh/ts-proto/issues/1046)) ([d2e75cd](https://github.com/stephenh/ts-proto/commit/d2e75cd14cdf3bc0c35f59bf8e8a095c57e9c040))

# [1.176.0](https://github.com/stephenh/ts-proto/compare/v1.175.1...v1.176.0) (2024-05-16)


### Features

* Bump ts-proto-descriptors to latest ts-proto. ([#1043](https://github.com/stephenh/ts-proto/issues/1043)) ([0b06554](https://github.com/stephenh/ts-proto/commit/0b065540d8fb4a3c1254a876d2be0dd48ac3ba66)), closes [#1042](https://github.com/stephenh/ts-proto/issues/1042)

## [1.175.1](https://github.com/stephenh/ts-proto/compare/v1.175.0...v1.175.1) (2024-05-15)


### Bug Fixes

* `outputSchema=true` when `onlyTypes=true` ([#1039](https://github.com/stephenh/ts-proto/issues/1039)) ([064665f](https://github.com/stephenh/ts-proto/commit/064665f064e072f9d530f84e45f605fd4b5a749c))

# [1.175.0](https://github.com/stephenh/ts-proto/compare/v1.174.0...v1.175.0) (2024-05-13)


### Features

* optionally output versions used to generate files ([#1040](https://github.com/stephenh/ts-proto/issues/1040)) ([53d6799](https://github.com/stephenh/ts-proto/commit/53d67995526770213ecf91c15645b9c74e7e5bd4))

# [1.174.0](https://github.com/stephenh/ts-proto/compare/v1.173.0...v1.174.0) (2024-05-01)


### Features

* add generated code comments ([#1037](https://github.com/stephenh/ts-proto/issues/1037)) ([cdd4a76](https://github.com/stephenh/ts-proto/commit/cdd4a76238e292cb00d6a09d84e6b393ddde8204))

# [1.173.0](https://github.com/stephenh/ts-proto/compare/v1.172.0...v1.173.0) (2024-04-30)


### Features

* Add js type support ([#1030](https://github.com/stephenh/ts-proto/issues/1030)) ([0dd951b](https://github.com/stephenh/ts-proto/commit/0dd951bf4d1a4c48f3d261c85cfa03586d20c13c)), closes [#958](https://github.com/stephenh/ts-proto/issues/958)

# [1.172.0](https://github.com/stephenh/ts-proto/compare/v1.171.0...v1.172.0) (2024-04-13)


### Features

* export options types ([#1027](https://github.com/stephenh/ts-proto/issues/1027)) ([9652586](https://github.com/stephenh/ts-proto/commit/965258656efaa07cc8b72feb8c6b8e202a000940))

# [1.171.0](https://github.com/stephenh/ts-proto/compare/v1.170.0...v1.171.0) (2024-03-30)


### Features

* added useNullAsOptional option ([#1017](https://github.com/stephenh/ts-proto/issues/1017)) ([573f63e](https://github.com/stephenh/ts-proto/commit/573f63e761beef3981539cfbe29f786374186923)), closes [#869](https://github.com/stephenh/ts-proto/issues/869)

# [1.170.0](https://github.com/stephenh/ts-proto/compare/v1.169.1...v1.170.0) (2024-03-26)


### Features

* support deprecatedOnly option to make deprecated fields optional ([#1010](https://github.com/stephenh/ts-proto/issues/1010)) ([db23004](https://github.com/stephenh/ts-proto/commit/db230041f69fa6a7ff17db55595e7b8805e655ba))

## [1.169.1](https://github.com/stephenh/ts-proto/compare/v1.169.0...v1.169.1) (2024-03-13)


### Bug Fixes

* fixed addGrpcMetadata option ([#761](https://github.com/stephenh/ts-proto/issues/761)) ([cb2b573](https://github.com/stephenh/ts-proto/commit/cb2b5733ddd71589a00a4960906c65869303706b))

# [1.169.0](https://github.com/stephenh/ts-proto/compare/v1.168.0...v1.169.0) (2024-03-12)


### Features

* support proto2 optional and default value fields ([#1007](https://github.com/stephenh/ts-proto/issues/1007)) ([1fa1e61](https://github.com/stephenh/ts-proto/commit/1fa1e61b0a0ff22949a1acadb38630f6f5bf6179)), closes [#973](https://github.com/stephenh/ts-proto/issues/973)

# [1.168.0](https://github.com/stephenh/ts-proto/compare/v1.167.9...v1.168.0) (2024-03-08)


### Features

* allow `$type` to be optional ([#1013](https://github.com/stephenh/ts-proto/issues/1013)) ([f285557](https://github.com/stephenh/ts-proto/commit/f285557a4f77d4b75327de2c13cf0917b0361f14))

## [1.167.9](https://github.com/stephenh/ts-proto/compare/v1.167.8...v1.167.9) (2024-02-28)


### Bug Fixes

* typescript errors for struct with optional=all ([#1008](https://github.com/stephenh/ts-proto/issues/1008)) ([e838e38](https://github.com/stephenh/ts-proto/commit/e838e3801e0ef5e8b5a14ead7d7dfc0ad3532cf1)), closes [#578](https://github.com/stephenh/ts-proto/issues/578)

## [1.167.8](https://github.com/stephenh/ts-proto/compare/v1.167.7...v1.167.8) (2024-02-18)


### Bug Fixes

* Use as any on globalThis.Buffer check for bytesFromBase64 ([#1005](https://github.com/stephenh/ts-proto/issues/1005)) ([bae741c](https://github.com/stephenh/ts-proto/commit/bae741cba9c22d08118e25619ba3e427e1c7bf9d)), closes [#1004](https://github.com/stephenh/ts-proto/issues/1004) [#967](https://github.com/stephenh/ts-proto/issues/967)

## [1.167.7](https://github.com/stephenh/ts-proto/compare/v1.167.6...v1.167.7) (2024-02-17)


### Bug Fixes

* Use as any on globalThis.Buffer check. ([#1004](https://github.com/stephenh/ts-proto/issues/1004)) ([11d06b4](https://github.com/stephenh/ts-proto/commit/11d06b4455a1f27793bfe172fffaf05b7a3400db)), closes [#967](https://github.com/stephenh/ts-proto/issues/967)

## [1.167.6](https://github.com/stephenh/ts-proto/compare/v1.167.5...v1.167.6) (2024-02-17)


### Bug Fixes

* conditional export ([#1003](https://github.com/stephenh/ts-proto/issues/1003)) ([4a15839](https://github.com/stephenh/ts-proto/commit/4a15839943b501af750b9d142dba2cb3889b4617))

## [1.167.5](https://github.com/stephenh/ts-proto/compare/v1.167.4...v1.167.5) (2024-02-15)


### Bug Fixes

* import fails when folder name overlaps with file name ([#1000](https://github.com/stephenh/ts-proto/issues/1000)) ([1e68e6f](https://github.com/stephenh/ts-proto/commit/1e68e6f0b2ca6fbffc51c0abe9b0f127350dd766))

## [1.167.4](https://github.com/stephenh/ts-proto/compare/v1.167.3...v1.167.4) (2024-02-15)


### Bug Fixes

* don't reference globalThis.Buffer when env=browser ([#967](https://github.com/stephenh/ts-proto/issues/967)) ([#999](https://github.com/stephenh/ts-proto/issues/999)) ([0d34612](https://github.com/stephenh/ts-proto/commit/0d34612ce8878b1dccbeb001686ef4051080e043))

## [1.167.3](https://github.com/stephenh/ts-proto/compare/v1.167.2...v1.167.3) (2024-02-03)


### Bug Fixes

* ensure default service streaming methods compile when middleware methods are enabled ([#996](https://github.com/stephenh/ts-proto/issues/996)) ([a9e975b](https://github.com/stephenh/ts-proto/commit/a9e975b41b760970da264a48cc3fb4ecc4b57a1d))

## [1.167.2](https://github.com/stephenh/ts-proto/compare/v1.167.1...v1.167.2) (2024-01-28)


### Bug Fixes

* ensure docker-compose platform is amd64 ([#990](https://github.com/stephenh/ts-proto/issues/990)) ([bdf4710](https://github.com/stephenh/ts-proto/commit/bdf4710b76aafc3fde47aa77a5786387e2236242))

## [1.167.1](https://github.com/stephenh/ts-proto/compare/v1.167.0...v1.167.1) (2024-01-26)


### Bug Fixes

* generate modules for empty files with esModuleInterop ([#992](https://github.com/stephenh/ts-proto/issues/992)) ([f0629ab](https://github.com/stephenh/ts-proto/commit/f0629ab0e9e0eded12142f363858d3dd8e292acd))

# [1.167.0](https://github.com/stephenh/ts-proto/compare/v1.166.4...v1.167.0) (2024-01-22)


### Features

* Allow comments to be omitted ([#989](https://github.com/stephenh/ts-proto/issues/989)) ([cb7eef7](https://github.com/stephenh/ts-proto/commit/cb7eef73f425251f6d09c90710fb8e5c93f56bdf))

## [1.166.4](https://github.com/stephenh/ts-proto/compare/v1.166.3...v1.166.4) (2024-01-20)


### Bug Fixes

* Add missing globalThis prefixes. ([#988](https://github.com/stephenh/ts-proto/issues/988)) ([86aca54](https://github.com/stephenh/ts-proto/commit/86aca54afdcda88bc77b77c9c363f422e0f66be7)), closes [#987](https://github.com/stephenh/ts-proto/issues/987)

## [1.166.3](https://github.com/stephenh/ts-proto/compare/v1.166.2...v1.166.3) (2024-01-18)


### Bug Fixes

* add support of importSuffix=.js for index files ([#986](https://github.com/stephenh/ts-proto/issues/986)) ([183cf03](https://github.com/stephenh/ts-proto/commit/183cf039895184edd365e6cb7bb9751426ac56f4))

## [1.166.2](https://github.com/stephenh/ts-proto/compare/v1.166.1...v1.166.2) (2023-12-31)


### Bug Fixes

* error handling on non-Error type errors ([#983](https://github.com/stephenh/ts-proto/issues/983)) ([8c567fc](https://github.com/stephenh/ts-proto/commit/8c567fc6e4cefdf96a2e021e8ca72d6ee45cc26e))

## [1.166.1](https://github.com/stephenh/ts-proto/compare/v1.166.0...v1.166.1) (2023-12-31)


### Bug Fixes

* Allow other services with nestJs. ([#982](https://github.com/stephenh/ts-proto/issues/982)) ([45bba3c](https://github.com/stephenh/ts-proto/commit/45bba3ce7ce723682a6ba2e2104d43ab3fd6978c))

# [1.166.0](https://github.com/stephenh/ts-proto/compare/v1.165.3...v1.166.0) (2023-12-29)


### Features

* add useDate=string-nano option ([#981](https://github.com/stephenh/ts-proto/issues/981)) ([dc84098](https://github.com/stephenh/ts-proto/commit/dc840985d2afdd85e0b311c55aa831bac5da8ce4))

## [1.165.3](https://github.com/stephenh/ts-proto/compare/v1.165.2...v1.165.3) (2023-12-26)


### Bug Fixes

* add serviceName to grpc-js client constructor type ([#980](https://github.com/stephenh/ts-proto/issues/980)) ([2c6682d](https://github.com/stephenh/ts-proto/commit/2c6682df400a5b1e4bcb9c5bc233dbd7a65df987))

## [1.165.2](https://github.com/stephenh/ts-proto/compare/v1.165.1...v1.165.2) (2023-12-20)


### Bug Fixes

* Fix generating wrong web-rpc implementation for wrapper-type method arg ([#978](https://github.com/stephenh/ts-proto/issues/978)) ([063fd29](https://github.com/stephenh/ts-proto/commit/063fd29974e0e917ad69cd5a158ee233edb5e019))

## [1.165.1](https://github.com/stephenh/ts-proto/compare/v1.165.0...v1.165.1) (2023-12-06)


### Bug Fixes

* do not mention :local scripts ([#974](https://github.com/stephenh/ts-proto/issues/974)) ([ef30da5](https://github.com/stephenh/ts-proto/commit/ef30da58d60b9098eb50b7e27489ac8ef854022e))

# [1.165.0](https://github.com/stephenh/ts-proto/compare/v1.164.2...v1.165.0) (2023-11-28)


### Features

* add error handler to rpc interface ([#965](https://github.com/stephenh/ts-proto/issues/965)) ([47cd16e](https://github.com/stephenh/ts-proto/commit/47cd16e048e19ebc0b8673bccffdade678cc0363))

## [1.164.2](https://github.com/stephenh/ts-proto/compare/v1.164.1...v1.164.2) (2023-11-28)


### Bug Fixes

* Don't close client if we've already aborted ([#968](https://github.com/stephenh/ts-proto/issues/968)) ([7ee1507](https://github.com/stephenh/ts-proto/commit/7ee15075b2f35fac92790885c02f5a0edba9a76a))

## [1.164.1](https://github.com/stephenh/ts-proto/compare/v1.164.0...v1.164.1) (2023-11-24)


### Bug Fixes

* revert useDate=false behaviour; add useJsonTimestamp option ([#969](https://github.com/stephenh/ts-proto/issues/969)) ([15ae516](https://github.com/stephenh/ts-proto/commit/15ae516ae09b27d5adf41b5e85fe509792c5854e))

# [1.164.0](https://github.com/stephenh/ts-proto/compare/v1.163.0...v1.164.0) (2023-11-09)


### Features

* add before and after request methods to base service ([#961](https://github.com/stephenh/ts-proto/issues/961)) ([19ba6a5](https://github.com/stephenh/ts-proto/commit/19ba6a50c6fd4f574e20315e1ec721c5e04dab25))

# [1.163.0](https://github.com/stephenh/ts-proto/compare/v1.162.2...v1.163.0) (2023-11-02)


### Features

* generate type namespaces for enums as literals ([#960](https://github.com/stephenh/ts-proto/issues/960)) ([e2619f6](https://github.com/stephenh/ts-proto/commit/e2619f6191e8bfb1deaf8474c26ea386c5c34e63))

## [1.162.2](https://github.com/stephenh/ts-proto/compare/v1.162.1...v1.162.2) (2023-10-26)


### Bug Fixes

* return types and optional chaining in field masks when `useOptionals=all` ([#957](https://github.com/stephenh/ts-proto/issues/957)) ([a3d7bd4](https://github.com/stephenh/ts-proto/commit/a3d7bd4eaf0b25cd8d7991cc85893ce3d8ab7937))

## [1.162.1](https://github.com/stephenh/ts-proto/compare/v1.162.0...v1.162.1) (2023-10-13)


### Bug Fixes

* Simplify safe key handling. ([#950](https://github.com/stephenh/ts-proto/issues/950)) ([5e0e6ca](https://github.com/stephenh/ts-proto/commit/5e0e6ca1d76f5c9aaef5f40a9cc685538251a5f9))

# [1.162.0](https://github.com/stephenh/ts-proto/compare/v1.161.1...v1.162.0) (2023-10-13)


### Features

* support `json_name` defined in a proto file ([#943](https://github.com/stephenh/ts-proto/issues/943)) ([de989af](https://github.com/stephenh/ts-proto/commit/de989af0d9bf9910dc3c047a18d97f289bffe2ee))

## [1.161.1](https://github.com/stephenh/ts-proto/compare/v1.161.0...v1.161.1) (2023-10-10)


### Bug Fixes

* use optional chaining when both `forceLong=long` and `useOptionals=all` options are set in the generated fromTimestamp function ([#949](https://github.com/stephenh/ts-proto/issues/949)) ([b00db6f](https://github.com/stephenh/ts-proto/commit/b00db6fa42d511b9bef602a231a1f093664cd40c))

# [1.161.0](https://github.com/stephenh/ts-proto/compare/v1.160.0...v1.161.0) (2023-10-10)


### Features

* add unrecognizedEnumName and unrecognizedEnumValue options ([#946](https://github.com/stephenh/ts-proto/issues/946)) ([cd61e90](https://github.com/stephenh/ts-proto/commit/cd61e90e59844795fb5d7d86ec99bd37d2fdf21b))

# [1.160.0](https://github.com/stephenh/ts-proto/compare/v1.159.3...v1.160.0) (2023-10-05)


### Features

* add bigint input validation ([#938](https://github.com/stephenh/ts-proto/issues/938)) ([0f9b6b1](https://github.com/stephenh/ts-proto/commit/0f9b6b1c5982427f77b111466a11c18e57b070bd))

## [1.159.3](https://github.com/stephenh/ts-proto/compare/v1.159.2...v1.159.3) (2023-10-04)


### Bug Fixes

* toJSON methods don't respect useDate=false ([#935](https://github.com/stephenh/ts-proto/issues/935)) ([#937](https://github.com/stephenh/ts-proto/issues/937)) ([acdfb0a](https://github.com/stephenh/ts-proto/commit/acdfb0a100c9de1d51cb1710cc3fb40566d16706))

## [1.159.2](https://github.com/stephenh/ts-proto/compare/v1.159.1...v1.159.2) (2023-10-02)


### Bug Fixes

* Support using messages called String/Boolean/Number/Array ([#934](https://github.com/stephenh/ts-proto/issues/934)) ([f75159b](https://github.com/stephenh/ts-proto/commit/f75159bde85c8d85a2be938c6e3db78c77318890)), closes [#927](https://github.com/stephenh/ts-proto/issues/927)

## [1.159.1](https://github.com/stephenh/ts-proto/compare/v1.159.0...v1.159.1) (2023-09-30)


### Bug Fixes

* Use a Map when map keys are boolean. ([#933](https://github.com/stephenh/ts-proto/issues/933)) ([c1253a3](https://github.com/stephenh/ts-proto/commit/c1253a3761405d7a2ffe4d15f4c3ffb364697a02)), closes [#926](https://github.com/stephenh/ts-proto/issues/926)

# [1.159.0](https://github.com/stephenh/ts-proto/compare/v1.158.1...v1.159.0) (2023-09-30)


### Features

* Add globalThisPolyfill, defaults false. ([#931](https://github.com/stephenh/ts-proto/issues/931)) ([085fa21](https://github.com/stephenh/ts-proto/commit/085fa21603a74544af192f404289c2e62ecfd8f6))

## [1.158.1](https://github.com/stephenh/ts-proto/compare/v1.158.0...v1.158.1) (2023-09-30)


### Bug Fixes

* Use globalThis for Array/String/Boolean ([#930](https://github.com/stephenh/ts-proto/issues/930)) ([9a252c3](https://github.com/stephenh/ts-proto/commit/9a252c3d4cf988496f6de17cc378dbb09a1baf92))

# [1.158.0](https://github.com/stephenh/ts-proto/compare/v1.157.1...v1.158.0) (2023-09-24)


### Features

* adds support for emitting default scalar values in json ([#919](https://github.com/stephenh/ts-proto/issues/919)) ([01f529f](https://github.com/stephenh/ts-proto/commit/01f529f2b0eed486356ff6add9a43aabde3d1d0d))

## [1.157.1](https://github.com/stephenh/ts-proto/compare/v1.157.0...v1.157.1) (2023-09-18)


### Bug Fixes

* Update type imports syntax on gRPC generation ([#921](https://github.com/stephenh/ts-proto/issues/921)) ([b10ab31](https://github.com/stephenh/ts-proto/commit/b10ab31a479420413998840eab866ab51f72285d))

# [1.157.0](https://github.com/stephenh/ts-proto/compare/v1.156.8...v1.157.0) (2023-09-03)


### Features

* enum decoding ([#910](https://github.com/stephenh/ts-proto/issues/910)) ([9e0a0b5](https://github.com/stephenh/ts-proto/commit/9e0a0b5c86004313f65eae88b8dc5e63deaaf251)), closes [ts-proto-#859](https://github.com/ts-proto-/issues/859) [ts-proto#859](https://github.com/ts-proto/issues/859) [ts-proto#859](https://github.com/ts-proto/issues/859) [ts-proto-#859](https://github.com/ts-proto-/issues/859) [#909](https://github.com/stephenh/ts-proto/issues/909)

## [1.156.8](https://github.com/stephenh/ts-proto/compare/v1.156.7...v1.156.8) (2023-09-03)


### Bug Fixes

* fixing exportCommonSymbols in nestjs ([#916](https://github.com/stephenh/ts-proto/issues/916)) ([daf41f7](https://github.com/stephenh/ts-proto/commit/daf41f7c2654e801994c0791fb3f9f178b5d8ad8))

## [1.156.7](https://github.com/stephenh/ts-proto/compare/v1.156.6...v1.156.7) (2023-08-18)


### Bug Fixes

* always use Map for int64 keys ([#708](https://github.com/stephenh/ts-proto/issues/708)) ([#905](https://github.com/stephenh/ts-proto/issues/905)) ([cf2fb59](https://github.com/stephenh/ts-proto/commit/cf2fb59de20f8a60ead23294439dacbdbe6dfc14))

## [1.156.6](https://github.com/stephenh/ts-proto/compare/v1.156.5...v1.156.6) (2023-08-16)


### Bug Fixes

* use correct imports for optional fields ([#904](https://github.com/stephenh/ts-proto/issues/904)) ([fa13ec7](https://github.com/stephenh/ts-proto/commit/fa13ec752c6564af045081548f5fc5cabb687151))

## [1.156.5](https://github.com/stephenh/ts-proto/compare/v1.156.4...v1.156.5) (2023-08-15)


### Bug Fixes

* remove-enum-prefix for nested enums ([#903](https://github.com/stephenh/ts-proto/issues/903)) ([efdbf47](https://github.com/stephenh/ts-proto/commit/efdbf476b26c49c1bc56f9404f49667f2acc1f8b))

## [1.156.4](https://github.com/stephenh/ts-proto/compare/v1.156.3...v1.156.4) (2023-08-15)


### Bug Fixes

* enum default value when remove-enum-prefix and string-enum both on ([#902](https://github.com/stephenh/ts-proto/issues/902)) ([594b137](https://github.com/stephenh/ts-proto/commit/594b137cdffbf6256b9d0ee6bb82822ce22c7b94))

## [1.156.3](https://github.com/stephenh/ts-proto/compare/v1.156.2...v1.156.3) (2023-08-13)


### Bug Fixes

* Only check file dependencies once/file. ([#901](https://github.com/stephenh/ts-proto/issues/901)) ([8d61980](https://github.com/stephenh/ts-proto/commit/8d6198020a5ec775b0dbaf7e08924f4bdcc677f8)), closes [#900](https://github.com/stephenh/ts-proto/issues/900)

## [1.156.2](https://github.com/stephenh/ts-proto/compare/v1.156.1...v1.156.2) (2023-07-29)


### Bug Fixes

* Add 'as any' in create ([#895](https://github.com/stephenh/ts-proto/issues/895)) ([4214d5a](https://github.com/stephenh/ts-proto/commit/4214d5af98817f317760298b1b2e03a8e956329c)), closes [#838](https://github.com/stephenh/ts-proto/issues/838)

## [1.156.1](https://github.com/stephenh/ts-proto/compare/v1.156.0...v1.156.1) (2023-07-22)


### Bug Fixes

* Depend specifically on long 5.2.3. ([#892](https://github.com/stephenh/ts-proto/issues/892)) ([2b976f2](https://github.com/stephenh/ts-proto/commit/2b976f295fc1fbab6d0fb5ad86cfad26ed722c8a))

# [1.156.0](https://github.com/stephenh/ts-proto/compare/v1.155.1...v1.156.0) (2023-07-20)


### Features

* **ts-proto-#859:** added encode-only options to toJSON methods ([#886](https://github.com/stephenh/ts-proto/issues/886)) ([d0cf57d](https://github.com/stephenh/ts-proto/commit/d0cf57d9a1aebdec3bec67585658362b1a38d6a3)), closes [ts-proto-#859](https://github.com/ts-proto-/issues/859) [ts-proto-#859](https://github.com/ts-proto-/issues/859) [ts-proto#859](https://github.com/ts-proto/issues/859) [ts-proto#859](https://github.com/ts-proto/issues/859) [ts-proto-#859](https://github.com/ts-proto-/issues/859)

## [1.155.1](https://github.com/stephenh/ts-proto/compare/v1.155.0...v1.155.1) (2023-07-15)


### Bug Fixes

* Bump descriptors. ([#883](https://github.com/stephenh/ts-proto/issues/883)) ([e2cf184](https://github.com/stephenh/ts-proto/commit/e2cf1848c1c70a8bbe73756e1cf530c5d70f5ce2))

# [1.155.0](https://github.com/stephenh/ts-proto/compare/v1.154.0...v1.155.0) (2023-07-15)


### Features

* Upgrade to long 5.0.0. ([#882](https://github.com/stephenh/ts-proto/issues/882)) ([4c1e7a6](https://github.com/stephenh/ts-proto/commit/4c1e7a6e02f974f193063a83ce7a472b14f2d2d0))

# [1.154.0](https://github.com/stephenh/ts-proto/compare/v1.153.3...v1.154.0) (2023-07-15)


### Features

* Normalize `toJSON` output by omitting fields set to their default values ([#878](https://github.com/stephenh/ts-proto/issues/878)) ([50958d6](https://github.com/stephenh/ts-proto/commit/50958d639435a32a76d59fc57565e3677f5be39e))

## [1.153.3](https://github.com/stephenh/ts-proto/compare/v1.153.2...v1.153.3) (2023-07-13)


### Bug Fixes

* Bump ts-proto-descriptors w/long back. ([#880](https://github.com/stephenh/ts-proto/issues/880)) ([d27e19c](https://github.com/stephenh/ts-proto/commit/d27e19c84420d46dff0fc1914ce724ec15f86185))

## [1.153.2](https://github.com/stephenh/ts-proto/compare/v1.153.1...v1.153.2) (2023-07-12)


### Bug Fixes

* Move dataloader to a devDependency. ([#877](https://github.com/stephenh/ts-proto/issues/877)) ([dbe1a96](https://github.com/stephenh/ts-proto/commit/dbe1a967ced7863492f82a977d6e5d34f4f034a6))

## [1.153.1](https://github.com/stephenh/ts-proto/compare/v1.153.0...v1.153.1) (2023-07-12)


### Bug Fixes

* Bump ts-proto-descriptors. ([#876](https://github.com/stephenh/ts-proto/issues/876)) ([ad57819](https://github.com/stephenh/ts-proto/commit/ad57819a16b5f3886bde3c8f63231dc70f84d250))

# [1.153.0](https://github.com/stephenh/ts-proto/compare/v1.152.1...v1.153.0) (2023-07-12)


### Features

* Update protobufjs (and peer dependencies) to ^7 ([#874](https://github.com/stephenh/ts-proto/issues/874)) ([7f979a7](https://github.com/stephenh/ts-proto/commit/7f979a70af2e42c8c429ae5f65787e0b43ccb706))

## [1.152.1](https://github.com/stephenh/ts-proto/compare/v1.152.0...v1.152.1) (2023-07-10)


### Bug Fixes

* Fix invocation error. ([f4e26bd](https://github.com/stephenh/ts-proto/commit/f4e26bd44f6882318defab1fccd0d6a833823fc0))

# [1.152.0](https://github.com/stephenh/ts-proto/compare/v1.151.1...v1.152.0) (2023-07-10)


### Features

* Ensure strict(er) TS compliance for the generated code ([#868](https://github.com/stephenh/ts-proto/issues/868)) ([1405d4b](https://github.com/stephenh/ts-proto/commit/1405d4bcc866343605946ac4a0b30e7de9c75e71))

## [1.151.1](https://github.com/stephenh/ts-proto/compare/v1.151.0...v1.151.1) (2023-07-05)


### Bug Fixes

* generate different MessageType when using static-only ([#863](https://github.com/stephenh/ts-proto/issues/863)) ([477e5f5](https://github.com/stephenh/ts-proto/commit/477e5f5bc0aaf70a92d7231f4a9e746d13b2bbcf)), closes [#861](https://github.com/stephenh/ts-proto/issues/861)

# [1.151.0](https://github.com/stephenh/ts-proto/compare/v1.150.1...v1.151.0) (2023-07-04)


### Features

* Add static-only variant to outputTypeAnnotations option ([#858](https://github.com/stephenh/ts-proto/issues/858)) ([d7c4af7](https://github.com/stephenh/ts-proto/commit/d7c4af7e068200b30cf773703ef906595aec6042))

## [1.150.1](https://github.com/stephenh/ts-proto/compare/v1.150.0...v1.150.1) (2023-06-23)


### Bug Fixes

* don't generate transitively imported files for mapped imports ([#854](https://github.com/stephenh/ts-proto/issues/854)) ([edd9044](https://github.com/stephenh/ts-proto/commit/edd9044568739b089f1ec66b53d0cc36d540610b))

# [1.150.0](https://github.com/stephenh/ts-proto/compare/v1.149.0...v1.150.0) (2023-06-20)


### Features

* expose service name as a separate exported constant ([#851](https://github.com/stephenh/ts-proto/issues/851)) ([84a4ed6](https://github.com/stephenh/ts-proto/commit/84a4ed610089363e3ee7a6a29581d8e0ef695f0d))

# [1.149.0](https://github.com/stephenh/ts-proto/compare/v1.148.2...v1.149.0) (2023-06-13)


### Features

* support lib: es6 ([#850](https://github.com/stephenh/ts-proto/issues/850)) ([6280677](https://github.com/stephenh/ts-proto/commit/62806776beacb1e2b0ee921e4212f1e61ce5191e))

## [1.148.2](https://github.com/stephenh/ts-proto/compare/v1.148.1...v1.148.2) (2023-06-04)


### Bug Fixes

* esModuleInterop not working for object-hash and dataloader imports ([#794](https://github.com/stephenh/ts-proto/issues/794)) ([9fc9632](https://github.com/stephenh/ts-proto/commit/9fc9632e03a18f7a2d6e95a72ff959be93199981))

## [1.148.1](https://github.com/stephenh/ts-proto/compare/v1.148.0...v1.148.1) (2023-05-25)


### Bug Fixes

* add callback close condition ([#837](https://github.com/stephenh/ts-proto/issues/837)) ([2071c67](https://github.com/stephenh/ts-proto/commit/2071c67650a3ac80ec9b5845fec3227ee47841d0))

# [1.148.0](https://github.com/stephenh/ts-proto/compare/v1.147.3...v1.148.0) (2023-05-23)


### Features

* Generate Index Files ([#821](https://github.com/stephenh/ts-proto/issues/821)) ([85bf206](https://github.com/stephenh/ts-proto/commit/85bf206ca8c1052849aea3e39522ad4918e0d736))

## [1.147.3](https://github.com/stephenh/ts-proto/compare/v1.147.2...v1.147.3) (2023-05-16)


### Bug Fixes

* ensure generated fromTimestamp works when useOptionals=all ([#832](https://github.com/stephenh/ts-proto/issues/832)) ([1f82445](https://github.com/stephenh/ts-proto/commit/1f8244569de87ad99ed3676244e51291af9b3323))

## [1.147.2](https://github.com/stephenh/ts-proto/compare/v1.147.1...v1.147.2) (2023-05-07)


### Bug Fixes

* import Observable as a type ([#826](https://github.com/stephenh/ts-proto/issues/826)) ([52e84ba](https://github.com/stephenh/ts-proto/commit/52e84ba7ee8826cf3b33455b38bacfd0c68884ea))

## [1.147.1](https://github.com/stephenh/ts-proto/compare/v1.147.0...v1.147.1) (2023-05-02)


### Bug Fixes

* Try fixing the Buf publish step. ([47ef176](https://github.com/stephenh/ts-proto/commit/47ef176056108bba8fb553f0d7b53d11e139bfbc))

# [1.147.0](https://github.com/stephenh/ts-proto/compare/v1.146.0...v1.147.0) (2023-05-02)


### Features

* Add type annotations flag ([#786](https://github.com/stephenh/ts-proto/issues/786)) ([b565ff5](https://github.com/stephenh/ts-proto/commit/b565ff57c0a64a3869ba7475c2b53f46504169d0))

# [1.146.0](https://github.com/stephenh/ts-proto/compare/v1.145.0...v1.146.0) (2023-04-01)


### Features

* extensions ([#808](https://github.com/stephenh/ts-proto/issues/808)) ([f956128](https://github.com/stephenh/ts-proto/commit/f956128ad830f4538452d65dccedca3e08d6c871))

# [1.145.0](https://github.com/stephenh/ts-proto/compare/v1.144.1...v1.145.0) (2023-03-27)


### Bug Fixes

* various fixes ([#812](https://github.com/stephenh/ts-proto/issues/812)) ([ca18495](https://github.com/stephenh/ts-proto/commit/ca184958957b2c546e9a84173bc1c73425e33bc5))


### Features

* Update fromPartial and fromJson to respect initializeFieldsAsUndefined ([#811](https://github.com/stephenh/ts-proto/issues/811)) ([1615ae0](https://github.com/stephenh/ts-proto/commit/1615ae0b136bc8909e206b44f3bd6ec568a760e6))

## [1.144.1](https://github.com/stephenh/ts-proto/compare/v1.144.0...v1.144.1) (2023-03-26)


### Bug Fixes

* Bump ts-proto-descriptors to restore any-less _unknownFields. ([#810](https://github.com/stephenh/ts-proto/issues/810)) ([de9c307](https://github.com/stephenh/ts-proto/commit/de9c3079210caed1d0d3da782a4d0f2e54f52652))

# [1.144.0](https://github.com/stephenh/ts-proto/compare/v1.143.0...v1.144.0) (2023-03-26)


### Bug Fixes

* Temporarily put anys back to release. ([c6f189e](https://github.com/stephenh/ts-proto/commit/c6f189e62605553707534a86bf1964ad178dbd73))


### Features

* include _unknownFields as a field ([#806](https://github.com/stephenh/ts-proto/issues/806)) ([6b4ba39](https://github.com/stephenh/ts-proto/commit/6b4ba39a0651a2352db2ac70eb91d21138ccf887))

# [1.143.0](https://github.com/stephenh/ts-proto/compare/v1.142.1...v1.143.0) (2023-03-19)


### Bug Fixes

* initialize undefined optional fields upon use ([#802](https://github.com/stephenh/ts-proto/issues/802)) ([ee52e06](https://github.com/stephenh/ts-proto/commit/ee52e06a95d7790d1252831f1bb01344c94f16a4))


### Features

* group encoding and decoding support ([#799](https://github.com/stephenh/ts-proto/issues/799)) ([5ebe3c0](https://github.com/stephenh/ts-proto/commit/5ebe3c07f5039db4f9b40e4e237d02d03c85a4e5))


### Performance Improvements

* use array.push to prevent reallocation on every field ([#804](https://github.com/stephenh/ts-proto/issues/804)) ([a6aea2c](https://github.com/stephenh/ts-proto/commit/a6aea2ca9e61611cf22417d23eb71a5d6e4f2164))

## [1.142.1](https://github.com/stephenh/ts-proto/compare/v1.142.0...v1.142.1) (2023-03-18)


### Performance Improvements

* use Reader.create ([#800](https://github.com/stephenh/ts-proto/issues/800)) ([869e448](https://github.com/stephenh/ts-proto/commit/869e44876c88ccfb82cb4a48731b340a0fb2c025))

# [1.142.0](https://github.com/stephenh/ts-proto/compare/v1.141.1...v1.142.0) (2023-03-18)


### Features

* service options unknown methods ([#801](https://github.com/stephenh/ts-proto/issues/801)) ([994d0d0](https://github.com/stephenh/ts-proto/commit/994d0d0ac54b3e22cb27fa4c5b8a5b1d17b62521))

## [1.141.1](https://github.com/stephenh/ts-proto/compare/v1.141.0...v1.141.1) (2023-03-11)


### Bug Fixes

* implement abort grpc web ([#785](https://github.com/stephenh/ts-proto/issues/785)) ([6a40d72](https://github.com/stephenh/ts-proto/commit/6a40d72d6a41d91264366d238dafd08291eba0b7))

# [1.141.0](https://github.com/stephenh/ts-proto/compare/v1.140.0...v1.141.0) (2023-03-08)


### Features

* output-encode-only methods ([#787](https://github.com/stephenh/ts-proto/issues/787)) ([3594410](https://github.com/stephenh/ts-proto/commit/3594410cc18fecc9c6f76f8abf7bdf9fdd178acd))

# [1.140.0](https://github.com/stephenh/ts-proto/compare/v1.139.0...v1.140.0) (2023-02-24)


### Features

* `removeEnumPrefix` option ([#779](https://github.com/stephenh/ts-proto/issues/779)) ([53733e6](https://github.com/stephenh/ts-proto/commit/53733e61232f19ffb4f30abecd55a63899e2310c))
* implementation of useAbortSignal option for grpc-web ([#777](https://github.com/stephenh/ts-proto/issues/777)) ([7a3d429](https://github.com/stephenh/ts-proto/commit/7a3d4291806568a938e88f53a55683633f26ec4a))

# [1.139.0](https://github.com/stephenh/ts-proto/compare/v1.138.0...v1.139.0) (2023-01-31)


### Features

* add support for Struct in NestJS ([#762](https://github.com/stephenh/ts-proto/issues/762)) ([e8c6d8b](https://github.com/stephenh/ts-proto/commit/e8c6d8ba7bee902dbbda0c36dd9f6accfd222542))


### Performance Improvements

* generate switch statement for oneof union encode ([#767](https://github.com/stephenh/ts-proto/issues/767)) ([c3fd1e3](https://github.com/stephenh/ts-proto/commit/c3fd1e3e487d1da3e8c792354d6491cadb067ff4))

# [1.138.0](https://github.com/stephenh/ts-proto/compare/v1.137.2...v1.138.0) (2023-01-10)


### Features

* add create utility function to message definitions ([#760](https://github.com/stephenh/ts-proto/issues/760)) ([44fc7b2](https://github.com/stephenh/ts-proto/commit/44fc7b23ae72ec9c4fca86bee9a9774be097c058))

## [1.137.2](https://github.com/stephenh/ts-proto/compare/v1.137.1...v1.137.2) (2023-01-09)


### Bug Fixes

* repeated uint64 fields do not encode properly with bigint option ([#751](https://github.com/stephenh/ts-proto/issues/751)) ([dcdd7e2](https://github.com/stephenh/ts-proto/commit/dcdd7e23479721d127138eeda8b143c100a0730a))

## [1.137.1](https://github.com/stephenh/ts-proto/compare/v1.137.0...v1.137.1) (2023-01-07)


### Bug Fixes

* grpc-js timestamp conversion ([#755](https://github.com/stephenh/ts-proto/issues/755)) ([9d24bd3](https://github.com/stephenh/ts-proto/commit/9d24bd39d0fbebf636ba4aaf6567988bc177a413)), closes [#754](https://github.com/stephenh/ts-proto/issues/754)

# [1.137.0](https://github.com/stephenh/ts-proto/compare/v1.136.1...v1.137.0) (2022-12-29)


### Bug Fixes

* Additional fix for structs with useMapType. ([#743](https://github.com/stephenh/ts-proto/issues/743)) ([3264b0f](https://github.com/stephenh/ts-proto/commit/3264b0f4a98f3e00b262ce8af7927b0bc0375160))
* Fix codegen for google.protobuf.Struct with useMapType=true ([#740](https://github.com/stephenh/ts-proto/issues/740)) ([0647151](https://github.com/stephenh/ts-proto/commit/0647151b356d7b22f8baf72b70f5a0353259b404))


### Features

* added bigint force long option ([#742](https://github.com/stephenh/ts-proto/issues/742)) ([3964e57](https://github.com/stephenh/ts-proto/commit/3964e575a6bdf90bbde937bcc71ac1f0255831b3))

## [1.136.1](https://github.com/stephenh/ts-proto/compare/v1.136.0...v1.136.1) (2022-12-16)


### Bug Fixes

* Avoid namespace conflict on globalThis. ([#735](https://github.com/stephenh/ts-proto/issues/735)) ([71e919e](https://github.com/stephenh/ts-proto/commit/71e919e7de4a2482e9389a5cbfd76853a1db73fb)), closes [#732](https://github.com/stephenh/ts-proto/issues/732)

# [1.136.0](https://github.com/stephenh/ts-proto/compare/v1.135.3...v1.136.0) (2022-12-14)


### Features

* RPC: add useAbortSignal option ([#731](https://github.com/stephenh/ts-proto/issues/731)) ([69313a7](https://github.com/stephenh/ts-proto/commit/69313a7a0f19c41c61824081e12ed680fda32b74)), closes [#730](https://github.com/stephenh/ts-proto/issues/730)

## [1.135.3](https://github.com/stephenh/ts-proto/compare/v1.135.2...v1.135.3) (2022-12-12)


### Bug Fixes

* return grpc-web response without toObject method ([#728](https://github.com/stephenh/ts-proto/issues/728)) ([7431aa8](https://github.com/stephenh/ts-proto/commit/7431aa8e5718ad8a8fe48651798f203995bf705b)), closes [stephenh/ts-proto#636](https://github.com/stephenh/ts-proto/issues/636)

## [1.135.2](https://github.com/stephenh/ts-proto/compare/v1.135.1...v1.135.2) (2022-12-09)


### Bug Fixes

* Fix buf publishing with yarn v3. ([#726](https://github.com/stephenh/ts-proto/issues/726)) ([e125d2b](https://github.com/stephenh/ts-proto/commit/e125d2bad21acfb27579b1ce252151678a91f2bc))

## [1.135.1](https://github.com/stephenh/ts-proto/compare/v1.135.0...v1.135.1) (2022-12-09)


### Bug Fixes

* Add functionality for grpc camel case to respect splitting by word ([#721](https://github.com/stephenh/ts-proto/issues/721)) ([4af040c](https://github.com/stephenh/ts-proto/commit/4af040c233792862db85c07d01d1b210a13cae2c)), closes [#722](https://github.com/stephenh/ts-proto/issues/722)

# [1.135.0](https://github.com/stephenh/ts-proto/compare/v1.134.0...v1.135.0) (2022-11-26)


### Features

* Bump ts poet for perf increase ([#714](https://github.com/stephenh/ts-proto/issues/714)) ([0068dc8](https://github.com/stephenh/ts-proto/commit/0068dc8c8c34263ac4a7bc5866408453fc2c8b11))

# [1.134.0](https://github.com/stephenh/ts-proto/compare/v1.133.0...v1.134.0) (2022-11-25)


### Features

* conditionally add "Service" to nice-grpc's generated service interface name ([#710](https://github.com/stephenh/ts-proto/issues/710)) ([7c39cc0](https://github.com/stephenh/ts-proto/commit/7c39cc0729403dcb63ef353357fae3548b5a6667))

# [1.133.0](https://github.com/stephenh/ts-proto/compare/v1.132.1...v1.133.0) (2022-11-20)


### Features

* optional one of properties ([#705](https://github.com/stephenh/ts-proto/issues/705)) ([4c6cbb0](https://github.com/stephenh/ts-proto/commit/4c6cbb0ff71e053c634732e295ed812901d368ae))

## [1.132.1](https://github.com/stephenh/ts-proto/compare/v1.132.0...v1.132.1) (2022-11-15)


### Bug Fixes

* use-readonly-types for oneof unions ([#706](https://github.com/stephenh/ts-proto/issues/706)) ([bc854ba](https://github.com/stephenh/ts-proto/commit/bc854bac083b8818d5fad77bc2e7995cfb01798e))

# [1.132.0](https://github.com/stephenh/ts-proto/compare/v1.131.2...v1.132.0) (2022-11-15)


### Features

* change channel options to client options in generate grpc/js ([#704](https://github.com/stephenh/ts-proto/issues/704)) ([c4ac8ac](https://github.com/stephenh/ts-proto/commit/c4ac8ac12aaee0c897985f944ffe3f122e28eba9))

## [1.131.2](https://github.com/stephenh/ts-proto/compare/v1.131.1...v1.131.2) (2022-11-13)


### Bug Fixes

* Adding a failing regression test for wrapper types ([#689](https://github.com/stephenh/ts-proto/issues/689)) ([bde2e28](https://github.com/stephenh/ts-proto/commit/bde2e28ad70bf05ebb21effcdb1caad7217c8291))

## [1.131.1](https://github.com/stephenh/ts-proto/compare/v1.131.0...v1.131.1) (2022-11-13)


### Bug Fixes

* Extend `global.Error` to avoid import collisions with Error proto msgs ([#699](https://github.com/stephenh/ts-proto/issues/699)) ([e9d8f91](https://github.com/stephenh/ts-proto/commit/e9d8f9123b7b3c5e274035fa3f2644b370915181))

# [1.131.0](https://github.com/stephenh/ts-proto/compare/v1.130.0...v1.131.0) (2022-10-25)


### Features

* option useSnakeTypeName ([#694](https://github.com/stephenh/ts-proto/issues/694)) ([ad73ff9](https://github.com/stephenh/ts-proto/commit/ad73ff9341d0d593156d10b5d96c4a47afdc802d))

# [1.130.0](https://github.com/stephenh/ts-proto/compare/v1.129.0...v1.130.0) (2022-10-22)


### Features

* support `useReadonlyTypes` option ([#691](https://github.com/stephenh/ts-proto/issues/691)) ([4b87334](https://github.com/stephenh/ts-proto/commit/4b8733452fb59cea3b9fb4721159b97e6df59854))

# [1.129.0](https://github.com/stephenh/ts-proto/compare/v1.128.0...v1.129.0) (2022-10-16)


### Features

* support `useMapType` option ([#686](https://github.com/stephenh/ts-proto/issues/686)) ([f2e80ab](https://github.com/stephenh/ts-proto/commit/f2e80ab3ecc3a438ecbd88b2170b8119ebadfcd3))

# [1.128.0](https://github.com/stephenh/ts-proto/compare/v1.127.0...v1.128.0) (2022-10-13)


### Features

* added nestJsTimestampTypeWrapper ([#567](https://github.com/stephenh/ts-proto/issues/567)) ([59d451e](https://github.com/stephenh/ts-proto/commit/59d451e2857856ff54a3afe03ae115a1824df66f))

# [1.127.0](https://github.com/stephenh/ts-proto/compare/v1.126.1...v1.127.0) (2022-10-12)


### Features

* **client:** allow overriding the service identifier ([#683](https://github.com/stephenh/ts-proto/issues/683)) ([10c7c99](https://github.com/stephenh/ts-proto/commit/10c7c99b1f43705d640ab1e602a7c1799e31ac08))
* Import CallContext and CallOptions as type ([#684](https://github.com/stephenh/ts-proto/issues/684)) ([8b388f6](https://github.com/stephenh/ts-proto/commit/8b388f6c9f57dac34ca5836a4313d8247bb0fceb)), closes [#677](https://github.com/stephenh/ts-proto/issues/677)

## [1.126.1](https://github.com/stephenh/ts-proto/compare/v1.126.0...v1.126.1) (2022-09-21)


### Bug Fixes

* **options:** initializes M opt to empty object ([#673](https://github.com/stephenh/ts-proto/issues/673)) ([cb76c5e](https://github.com/stephenh/ts-proto/commit/cb76c5ea565081d610be08451e452269c5d3837c))

# [1.126.0](https://github.com/stephenh/ts-proto/compare/v1.125.0...v1.126.0) (2022-09-21)


### Features

* **options:** adds protoc-gen-go-like M option ([#672](https://github.com/stephenh/ts-proto/issues/672)) ([9304e5d](https://github.com/stephenh/ts-proto/commit/9304e5db7172db53530fb08fe0486f56b2a17181)), closes [#596](https://github.com/stephenh/ts-proto/issues/596)

# [1.125.0](https://github.com/stephenh/ts-proto/compare/v1.124.0...v1.125.0) (2022-09-03)


### Features

* omit optional fields in base instance ([#669](https://github.com/stephenh/ts-proto/issues/669)) ([47b60aa](https://github.com/stephenh/ts-proto/commit/47b60aab95533542cf762f152138f7ab4234de88))

# [1.124.0](https://github.com/stephenh/ts-proto/compare/v1.123.1...v1.124.0) (2022-09-03)


### Features

* Bump ts poet for dprint perf increase ([#668](https://github.com/stephenh/ts-proto/issues/668)) ([961d388](https://github.com/stephenh/ts-proto/commit/961d388fa7dc7cb25fbe700526cbd481f3a48ae1))

## [1.123.1](https://github.com/stephenh/ts-proto/compare/v1.123.0...v1.123.1) (2022-08-27)


### Bug Fixes

* Bump ts-poet to use @dprint/typescript. ([#662](https://github.com/stephenh/ts-proto/issues/662)) ([84b64f4](https://github.com/stephenh/ts-proto/commit/84b64f4219f96199e8722678354430fbf00cebba))

# [1.123.0](https://github.com/stephenh/ts-proto/compare/v1.122.0...v1.123.0) (2022-08-27)


### Features

* Bump ts-poet for dprint, also use tsx ([#660](https://github.com/stephenh/ts-proto/issues/660)) ([348a465](https://github.com/stephenh/ts-proto/commit/348a4651b42d5ff64fd07e36ef9ca7d7e76f4277))

# [1.122.0](https://github.com/stephenh/ts-proto/compare/v1.121.6...v1.122.0) (2022-08-15)


### Features

* **Grpc-Web:** Add & export GrpcWebError type ([#593](https://github.com/stephenh/ts-proto/issues/593)) ([645987d](https://github.com/stephenh/ts-proto/commit/645987d023e666290e87086f5a0770c34e2fe978))

## [1.121.6](https://github.com/stephenh/ts-proto/compare/v1.121.5...v1.121.6) (2022-08-14)


### Bug Fixes

* Use jsonName even with snakeToCamel=false. ([#653](https://github.com/stephenh/ts-proto/issues/653)) ([1144886](https://github.com/stephenh/ts-proto/commit/1144886ef43eaf97b780c7aafb2c123fd49b3fe5)), closes [#635](https://github.com/stephenh/ts-proto/issues/635)

## [1.121.5](https://github.com/stephenh/ts-proto/compare/v1.121.4...v1.121.5) (2022-08-08)


### Bug Fixes

* remove Record word conflict ([#638](https://github.com/stephenh/ts-proto/issues/638)) ([5664d09](https://github.com/stephenh/ts-proto/commit/5664d097ac33da423b0f4e79f962fd71912358a0))
* resolve import collisions for services ([#651](https://github.com/stephenh/ts-proto/issues/651)) ([ee0296f](https://github.com/stephenh/ts-proto/commit/ee0296ffe087665b54bac714e964e7243010fb22))

## [1.121.4](https://github.com/stephenh/ts-proto/compare/v1.121.3...v1.121.4) (2022-08-07)


### Performance Improvements

* Faster base64FromBytes & bytesFromBase64 on Node.JS ([#649](https://github.com/stephenh/ts-proto/issues/649)) ([82ab341](https://github.com/stephenh/ts-proto/commit/82ab341557fba1a4933c4613d5c20dbf897905fa))

## [1.121.3](https://github.com/stephenh/ts-proto/compare/v1.121.2...v1.121.3) (2022-08-06)


### Bug Fixes

* Use underscore separator in snakeToCamel. ([#648](https://github.com/stephenh/ts-proto/issues/648)) ([b374910](https://github.com/stephenh/ts-proto/commit/b374910a8fb1d0efe6c5c5322f8788cc3cc1ca6c))

## [1.121.2](https://github.com/stephenh/ts-proto/compare/v1.121.1...v1.121.2) (2022-08-06)


### Bug Fixes

* Fix push_to_buf_registry check. ([22ac914](https://github.com/stephenh/ts-proto/commit/22ac914cd8626258ceb35fd435b899a819518988))

## [1.121.1](https://github.com/stephenh/ts-proto/compare/v1.121.0...v1.121.1) (2022-07-28)


### Bug Fixes

* Revert "feat: support grpc-web client streaming ([#617](https://github.com/stephenh/ts-proto/issues/617))" ([#632](https://github.com/stephenh/ts-proto/issues/632)) ([2f4ecc7](https://github.com/stephenh/ts-proto/commit/2f4ecc7434df6b8f2ff08b929f9032170b04e858))

# [1.121.0](https://github.com/stephenh/ts-proto/compare/v1.120.0...v1.121.0) (2022-07-28)


### Features

* Add use-numeric-enum-json option. ([#625](https://github.com/stephenh/ts-proto/issues/625)) ([cd53d8c](https://github.com/stephenh/ts-proto/commit/cd53d8cacd6b4b8fa6517242020b216dd18eebdf))

# [1.120.0](https://github.com/stephenh/ts-proto/compare/v1.119.0...v1.120.0) (2022-07-21)


### Features

* add meta-data to stream error ([#620](https://github.com/stephenh/ts-proto/issues/620)) ([b68f301](https://github.com/stephenh/ts-proto/commit/b68f301b5fb4222a3fce676a7e5036cf00e77e11))

# [1.119.0](https://github.com/stephenh/ts-proto/compare/v1.118.0...v1.119.0) (2022-07-21)


### Features

* support grpc-web client streaming ([#617](https://github.com/stephenh/ts-proto/issues/617)) ([d3e7f1f](https://github.com/stephenh/ts-proto/commit/d3e7f1f4aac12db87c54d6357e557a351c96a2ca))

# [1.118.0](https://github.com/stephenh/ts-proto/compare/v1.117.1...v1.118.0) (2022-07-19)


### Features

* add dynamic upStreamCodes option ([#618](https://github.com/stephenh/ts-proto/issues/618)) ([3091023](https://github.com/stephenh/ts-proto/commit/309102313273e09aef3a8480f4b46360ad82adaa))

## [1.117.1](https://github.com/stephenh/ts-proto/compare/v1.117.0...v1.117.1) (2022-07-16)


### Bug Fixes

* import protobufjs/minimal with importSuffix ([#616](https://github.com/stephenh/ts-proto/issues/616)) ([b86291c](https://github.com/stephenh/ts-proto/commit/b86291c58b1cb9d4064944a6371e928b564aef7f))

# [1.117.0](https://github.com/stephenh/ts-proto/compare/v1.116.1...v1.117.0) (2022-07-05)


### Features

* add importSuffix option and remove default .js suffix ([#612](https://github.com/stephenh/ts-proto/issues/612)) ([63a8895](https://github.com/stephenh/ts-proto/commit/63a8895f5a3a38fa3d5c0868f44e950e137fb697))

## [1.116.1](https://github.com/stephenh/ts-proto/compare/v1.116.0...v1.116.1) (2022-07-02)


### Bug Fixes

* add .js suffix to proto cross-reference imports ([#602](https://github.com/stephenh/ts-proto/issues/602)) ([8dc38af](https://github.com/stephenh/ts-proto/commit/8dc38af40e68262cd53469ce3dc4dcac670365da)), closes [#601](https://github.com/stephenh/ts-proto/issues/601) [/github.com/kulshekhar/ts-jest/issues/1057#issuecomment-481406624](https://github.com//github.com/kulshekhar/ts-jest/issues/1057/issues/issuecomment-481406624)

# [1.116.0](https://github.com/stephenh/ts-proto/compare/v1.115.5...v1.116.0) (2022-07-01)


### Features

* add option to use async iterables ([#605](https://github.com/stephenh/ts-proto/issues/605)) ([ca8ea8d](https://github.com/stephenh/ts-proto/commit/ca8ea8d761c02d3ca4da6eaa156acff35d88c510)), closes [#600](https://github.com/stephenh/ts-proto/issues/600)

## [1.115.5](https://github.com/stephenh/ts-proto/compare/v1.115.4...v1.115.5) (2022-06-22)


### Bug Fixes

* remove Long import statement when Long was unused ([#599](https://github.com/stephenh/ts-proto/issues/599)) ([58dc10c](https://github.com/stephenh/ts-proto/commit/58dc10c61ec5a76d4b54ba9eddf34021979dd4aa))

## [1.115.4](https://github.com/stephenh/ts-proto/compare/v1.115.3...v1.115.4) (2022-06-05)


### Bug Fixes

* Struct wrap/unwrap snake case [#579](https://github.com/stephenh/ts-proto/issues/579) ([#588](https://github.com/stephenh/ts-proto/issues/588)) ([33f89bf](https://github.com/stephenh/ts-proto/commit/33f89bfcf0d5d9e64a6fd360eaefc140055e9291))

## [1.115.3](https://github.com/stephenh/ts-proto/compare/v1.115.2...v1.115.3) (2022-06-03)


### Bug Fixes

* Fix ts-poet typo in package.json. ([#589](https://github.com/stephenh/ts-proto/issues/589)) ([5211347](https://github.com/stephenh/ts-proto/commit/5211347cb21ac7d117349a32a87c0d017999c44a))

## [1.115.2](https://github.com/stephenh/ts-proto/compare/v1.115.1...v1.115.2) (2022-06-03)


### Bug Fixes

* simplify handling useJsonWireFormat=true and fix onlyTypes=true ([#583](https://github.com/stephenh/ts-proto/issues/583)) ([6e7f938](https://github.com/stephenh/ts-proto/commit/6e7f9387d144f506ded982604f32981ac5e327de))

## [1.115.1](https://github.com/stephenh/ts-proto/compare/v1.115.0...v1.115.1) (2022-06-02)


### Bug Fixes

* Bump protobufjs. ([#585](https://github.com/stephenh/ts-proto/issues/585)) ([ba6b85d](https://github.com/stephenh/ts-proto/commit/ba6b85d9d5b7ce191dce898c462cf164a6b1e308))

# [1.115.0](https://github.com/stephenh/ts-proto/compare/v1.114.7...v1.115.0) (2022-06-02)


### Features

* added option 'useJsonWireFormat' ([#576](https://github.com/stephenh/ts-proto/issues/576)) ([a71b145](https://github.com/stephenh/ts-proto/commit/a71b145c81136b8d8e3681b6753146d3ceeff179)), closes [#571](https://github.com/stephenh/ts-proto/issues/571)

## [1.114.7](https://github.com/stephenh/ts-proto/compare/v1.114.6...v1.114.7) (2022-05-28)


### Bug Fixes

* Fix version number for Buf plugin. ([dc1fb7e](https://github.com/stephenh/ts-proto/commit/dc1fb7e766ed4115d026e7ff0e9a9480c1e42380))

## [1.114.6](https://github.com/stephenh/ts-proto/compare/v1.114.5...v1.114.6) (2022-05-28)


### Bug Fixes

* Bump node in ts-proto.Dockerfile. ([42f3cea](https://github.com/stephenh/ts-proto/commit/42f3ceac5323056b1b845b51919ecddaa32bf258))

## [1.114.5](https://github.com/stephenh/ts-proto/compare/v1.114.4...v1.114.5) (2022-05-28)


### Bug Fixes

* Use outputs for Buf plugin workflow. ([7017d4c](https://github.com/stephenh/ts-proto/commit/7017d4c1f5eb2a8619dd03cc4f7a27c1dcf6c918))

## [1.114.4](https://github.com/stephenh/ts-proto/compare/v1.114.3...v1.114.4) (2022-05-28)


### Bug Fixes

* Use env prefix for Buf plugin. ([ea42caa](https://github.com/stephenh/ts-proto/commit/ea42caacbd919f9a8b6a9e3138d8a48e80ac86d9))

## [1.114.3](https://github.com/stephenh/ts-proto/compare/v1.114.2...v1.114.3) (2022-05-28)


### Bug Fixes

* Use the npm environment. ([0103443](https://github.com/stephenh/ts-proto/commit/01034430c25461c0e5a46e2b9fd757ef4e0c91b1))

## [1.114.2](https://github.com/stephenh/ts-proto/compare/v1.114.1...v1.114.2) (2022-05-28)


### Bug Fixes

* Try combined workflow. ([c293c1f](https://github.com/stephenh/ts-proto/commit/c293c1f379cb69635c968d5b8094135931bcea54))

# [1.114.0](https://github.com/stephenh/ts-proto/compare/v1.113.0...v1.114.0) (2022-05-27)


### Features

* Official Buf Plugin ([#573](https://github.com/stephenh/ts-proto/issues/573)) ([e6272c4](https://github.com/stephenh/ts-proto/commit/e6272c487f73ff96afb4146a7998a892c4b43f14))

# [1.113.0](https://github.com/stephenh/ts-proto/compare/v1.112.2...v1.113.0) (2022-05-27)


### Features

* add options to schema output ([#437](https://github.com/stephenh/ts-proto/issues/437)) ([e8e4e39](https://github.com/stephenh/ts-proto/commit/e8e4e3937292e07280f5154b584e60124118f093))

## [1.112.2](https://github.com/stephenh/ts-proto/compare/v1.112.1...v1.112.2) (2022-05-18)


### Bug Fixes

* enum type returns 'UNRECOGNIZED' or '-1' in xxxToJSON/xxxToNumber ([#566](https://github.com/stephenh/ts-proto/issues/566)) ([19911a1](https://github.com/stephenh/ts-proto/commit/19911a1c62e3fe5c8a0eb0a795489340512898da))

## [1.112.1](https://github.com/stephenh/ts-proto/compare/v1.112.0...v1.112.1) (2022-05-06)


### Bug Fixes

* use Long.fromValue instead of Long.fromString ([#562](https://github.com/stephenh/ts-proto/issues/562)) ([c99891e](https://github.com/stephenh/ts-proto/commit/c99891e0fec6d9b7225025eb0c5bd7393e80af36))

# [1.112.0](https://github.com/stephenh/ts-proto/compare/v1.111.0...v1.112.0) (2022-05-02)


### Bug Fixes

* update codegen for `nice-grpc` ([#561](https://github.com/stephenh/ts-proto/issues/561)) ([d503f67](https://github.com/stephenh/ts-proto/commit/d503f677922402e880b5d8502b3d8bc099b7f39d))


### Features

* add support for generating `nice-grpc` server and client stubs ([#555](https://github.com/stephenh/ts-proto/issues/555)) ([8c19361](https://github.com/stephenh/ts-proto/commit/8c19361ede9a7a039acf3a1375913d012b0fcb7d)), closes [#545](https://github.com/stephenh/ts-proto/issues/545)

# [1.111.0](https://github.com/stephenh/ts-proto/compare/v1.110.4...v1.111.0) (2022-05-01)


### Features

* include service and definition types with implementations ([#552](https://github.com/stephenh/ts-proto/issues/552)) ([6b896f4](https://github.com/stephenh/ts-proto/commit/6b896f4b7f4ba0f0d97730767421786171646aea))

## [next](https://github.com/stephenh/ts-proto/compare/v1.110.4...main) (????-??-??)

### Features

* When outputting service and service definition implementations, include types. Eg, before:

  ```ts
  export const TestDefinition = {
    name: 'Test',
    fullName: 'simple.Test',
    methods: {
      …
    },
  } as const;
  ```

  Now:

  ```ts
  export type TestDefinition = typeof TestDefinition;
  export const TestDefinition = {
    name: 'Test',
    fullName: 'simple.Test',
    methods: {
      …
    },
  } as const;
  ```

## [1.110.4](https://github.com/stephenh/ts-proto/compare/v1.110.3...v1.110.4) (2022-04-08)


### Bug Fixes

* Use Uint8Array.forEach in base64FromBytes ([#544](https://github.com/stephenh/ts-proto/issues/544)) ([c7641ce](https://github.com/stephenh/ts-proto/commit/c7641ceb6a1c9da234245b9d808b2ded899dbbbc))

## [1.110.3](https://github.com/stephenh/ts-proto/compare/v1.110.2...v1.110.3) (2022-04-08)


### Bug Fixes

* regression in being able to return a Date as a GRPC return value ([#534](https://github.com/stephenh/ts-proto/issues/534)) ([22b76ec](https://github.com/stephenh/ts-proto/commit/22b76eccfc0d26309aab9e454de31ef020595be8))

## [1.110.2](https://github.com/stephenh/ts-proto/compare/v1.110.1...v1.110.2) (2022-03-27)


### Bug Fixes

* **Grpc-Web:** Fix compilation failure when a service definition contains a client streaming call. ([#535](https://github.com/stephenh/ts-proto/issues/535)) ([0c83892](https://github.com/stephenh/ts-proto/commit/0c83892693d5755c9fe848b442b5e666192103ab))

## [1.110.1](https://github.com/stephenh/ts-proto/compare/v1.110.0...v1.110.1) (2022-03-25)


### Bug Fixes

* Use a module star import for protobuf types. ([#540](https://github.com/stephenh/ts-proto/issues/540)) ([f5b7700](https://github.com/stephenh/ts-proto/commit/f5b770083dffe72338beb4a09432a2a917760eae))

# [1.110.0](https://github.com/stephenh/ts-proto/compare/v1.109.1...v1.110.0) (2022-03-15)


### Features

* Add generic metadata parameter to the generic service definition interface. ([#530](https://github.com/stephenh/ts-proto/issues/530)) ([0f5525a](https://github.com/stephenh/ts-proto/commit/0f5525ade80e7b69889dfd091a458e21bb14a265))

## [1.109.1](https://github.com/stephenh/ts-proto/compare/v1.109.0...v1.109.1) (2022-03-13)


### Bug Fixes

* Type Error when map contains string enums [#382](https://github.com/stephenh/ts-proto/issues/382) ([#529](https://github.com/stephenh/ts-proto/issues/529)) ([c2107b9](https://github.com/stephenh/ts-proto/commit/c2107b96b494a500a4773ac04900a1acd13c507a))

# [1.109.0](https://github.com/stephenh/ts-proto/compare/v1.108.0...v1.109.0) (2022-03-13)


### Features

* import proto as type import if onlyTypes is set ([25d8e8b](https://github.com/stephenh/ts-proto/commit/25d8e8b9042142f1032feadc8a799b7a01115cc2))

# [1.108.0](https://github.com/stephenh/ts-proto/compare/v1.107.0...v1.108.0) (2022-03-07)


### Features

* represent field masks as `string[]` ([#525](https://github.com/stephenh/ts-proto/issues/525)) ([903b216](https://github.com/stephenh/ts-proto/commit/903b216238db025e24ec3cfb2d20063aec1a40ed))

# [1.107.0](https://github.com/stephenh/ts-proto/compare/v1.106.2...v1.107.0) (2022-03-04)


### Features

* Allow simultaneous services and generic service definitions ([#512](https://github.com/stephenh/ts-proto/issues/512)) ([680831e](https://github.com/stephenh/ts-proto/commit/680831e76f1a4ceb4337442a157d7e702cb14bfc))

## [1.106.2](https://github.com/stephenh/ts-proto/compare/v1.106.1...v1.106.2) (2022-02-27)


### Bug Fixes

* Add M1/ARM support for the test suite ([#516](https://github.com/stephenh/ts-proto/issues/516)) ([7cf5625](https://github.com/stephenh/ts-proto/commit/7cf56251726d149eebd015367476f36e4edb48aa))

## [1.106.1](https://github.com/stephenh/ts-proto/compare/v1.106.0...v1.106.1) (2022-02-21)


### Bug Fixes

* support json_name containing hyphen on all field types ([#521](https://github.com/stephenh/ts-proto/issues/521)) ([8d9e78e](https://github.com/stephenh/ts-proto/commit/8d9e78eb39c460f6727458f6a2dd149deb983668))

# [1.106.0](https://github.com/stephenh/ts-proto/compare/v1.105.2...v1.106.0) (2022-02-21)


### Features

* Support json names containing non-alphanumeric characters ([#520](https://github.com/stephenh/ts-proto/issues/520)) ([ce44668](https://github.com/stephenh/ts-proto/commit/ce44668b8fe01b14f50ac3c5c950f73db769fa76))

## [1.105.2](https://github.com/stephenh/ts-proto/compare/v1.105.1...v1.105.2) (2022-02-17)


### Bug Fixes

* Fix snakeToCamel single value parsing. ([#513](https://github.com/stephenh/ts-proto/issues/513)) ([e1ad866](https://github.com/stephenh/ts-proto/commit/e1ad866c95751c37ed13f02f4da2dc9076ab4758))

## [1.105.1](https://github.com/stephenh/ts-proto/compare/v1.105.0...v1.105.1) (2022-02-14)


### Bug Fixes

* generate canonical JSON encoding for FieldMasks ([#510](https://github.com/stephenh/ts-proto/issues/510)) ([0ec4e97](https://github.com/stephenh/ts-proto/commit/0ec4e97a2649dc15af1c925f8a2ff6adf1e17d9b))

# [1.105.0](https://github.com/stephenh/ts-proto/compare/v1.104.1...v1.105.0) (2022-02-12)


### Features

* Bump ts-proto-descriptors. ([#489](https://github.com/stephenh/ts-proto/issues/489)) ([d454448](https://github.com/stephenh/ts-proto/commit/d454448b1889b1576c1ebcc6964a55a03af7d921)), closes [#493](https://github.com/stephenh/ts-proto/issues/493)

## [1.104.1](https://github.com/stephenh/ts-proto/compare/v1.104.0...v1.104.1) (2022-02-12)


### Bug Fixes

* make struct types play well with type registry ([#503](https://github.com/stephenh/ts-proto/issues/503)) ([d62f854](https://github.com/stephenh/ts-proto/commit/d62f85478011c7eb3dbca196f79b452895406ece))

# [1.104.0](https://github.com/stephenh/ts-proto/compare/v1.103.0...v1.104.0) (2022-01-21)


### Bug Fixes

* Leave mixed case in all words. ([#488](https://github.com/stephenh/ts-proto/issues/488)) ([8a26c9c](https://github.com/stephenh/ts-proto/commit/8a26c9cba4c9897700aafe1a7f59d0b0f537764b))


### Features

* enable prototype for defaults for ts-proto-descriptors ([#487](https://github.com/stephenh/ts-proto/issues/487)) ([2b5640f](https://github.com/stephenh/ts-proto/commit/2b5640f582e6adb4e81797a9cec217896061aadb))

# [1.103.0](https://github.com/stephenh/ts-proto/compare/v1.102.2...v1.103.0) (2022-01-20)


### Features

* add usePrototypeForDefaults option ([#484](https://github.com/stephenh/ts-proto/issues/484)) ([8e8c810](https://github.com/stephenh/ts-proto/commit/8e8c81016968e7d772dfac5ed54800898f039cbe))

## [1.102.2](https://github.com/stephenh/ts-proto/compare/v1.102.1...v1.102.2) (2022-01-19)


### Bug Fixes

* Have snakeToCamel leave existing mixed case. ([#482](https://github.com/stephenh/ts-proto/issues/482)) ([c0bf0fc](https://github.com/stephenh/ts-proto/commit/c0bf0fc13da70e2bde923cd1746119d2e7ac4b2f)), closes [#478](https://github.com/stephenh/ts-proto/issues/478)

## [1.102.1](https://github.com/stephenh/ts-proto/compare/v1.102.0...v1.102.1) (2022-01-19)


### Bug Fixes

* Pin ts-proto-descriptors to 1.3.1. ([#481](https://github.com/stephenh/ts-proto/issues/481)) ([6f362bf](https://github.com/stephenh/ts-proto/commit/6f362bfd3517a6bcb440d65e7ac63cd2b0bcc293)), closes [#480](https://github.com/stephenh/ts-proto/issues/480)

# [1.102.0](https://github.com/stephenh/ts-proto/compare/v1.101.0...v1.102.0) (2022-01-18)


### Features

* enable unknown fields for descriptor protos ([#479](https://github.com/stephenh/ts-proto/issues/479)) ([824c996](https://github.com/stephenh/ts-proto/commit/824c9962cd98dc0f9093e8909e3028d900094c54))

# [1.101.0](https://github.com/stephenh/ts-proto/compare/v1.100.1...v1.101.0) (2022-01-15)


### Features

* add support for unknown fields ([#473](https://github.com/stephenh/ts-proto/issues/473)) ([3bb9472](https://github.com/stephenh/ts-proto/commit/3bb9472943cf2e698b013487c7370a76576b68b6))

## [1.100.1](https://github.com/stephenh/ts-proto/compare/v1.100.0...v1.100.1) (2022-01-10)


### Bug Fixes

* respect generateClientImpl=false in grpc-js ([#471](https://github.com/stephenh/ts-proto/issues/471)) ([#472](https://github.com/stephenh/ts-proto/issues/472)) ([2f389f2](https://github.com/stephenh/ts-proto/commit/2f389f243ef11d8d58c32ce37c371aba2cdf294e))

# [1.100.0](https://github.com/stephenh/ts-proto/compare/v1.99.0...v1.100.0) (2022-01-09)


### Features

* support mapping ObjectId message as mongodb.ObjectId ([#467](https://github.com/stephenh/ts-proto/issues/467)) ([8b23897](https://github.com/stephenh/ts-proto/commit/8b2389715ecfd5d51b1b24f5a9332e4ff9f09a27))

# [1.99.0](https://github.com/stephenh/ts-proto/compare/v1.98.0...v1.99.0) (2022-01-07)


### Features

* yarn watch updates (specified) tests when source files change ([#465](https://github.com/stephenh/ts-proto/issues/465)) ([275d0e7](https://github.com/stephenh/ts-proto/commit/275d0e7c61f3acb2b1fd670b1974e64dd49d6ff4))

# [1.98.0](https://github.com/stephenh/ts-proto/compare/v1.97.2...v1.98.0) (2022-01-06)


### Features

* watch for changed integration test files ([#464](https://github.com/stephenh/ts-proto/issues/464)) ([988cd7e](https://github.com/stephenh/ts-proto/commit/988cd7eb84bc3b8b72d6b4d59c38aa794c16c638))

## [1.97.2](https://github.com/stephenh/ts-proto/compare/v1.97.1...v1.97.2) (2022-01-06)


### Performance Improvements

* fromJSON returns object literal to allow v8 optimizations ([#463](https://github.com/stephenh/ts-proto/issues/463)) ([5fcd05b](https://github.com/stephenh/ts-proto/commit/5fcd05b79e7c02547c4b6db46fae7a7202f97629))

## [1.97.1](https://github.com/stephenh/ts-proto/compare/v1.97.0...v1.97.1) (2022-01-05)


### Bug Fixes

* oneof=union breaks wrapper types [#458](https://github.com/stephenh/ts-proto/issues/458) ([#462](https://github.com/stephenh/ts-proto/issues/462)) ([dd16992](https://github.com/stephenh/ts-proto/commit/dd16992a409f24e88e3a142830cd0745f50dbd10))

# [1.97.0](https://github.com/stephenh/ts-proto/compare/v1.96.1...v1.97.0) (2021-12-30)


### Features

* add an option to disable Exact types ([#456](https://github.com/stephenh/ts-proto/issues/456)) ([9c53d7e](https://github.com/stephenh/ts-proto/commit/9c53d7efb0252c7ea0af85a5d161ff94bcd69760))

## [1.96.1](https://github.com/stephenh/ts-proto/compare/v1.96.0...v1.96.1) (2021-12-28)


### Performance Improvements

* optimize object creation in `decode`, `fromJSON` and `fromPartial` ([#457](https://github.com/stephenh/ts-proto/issues/457)) ([70832d3](https://github.com/stephenh/ts-proto/commit/70832d33bae82ecb3c5f87845d14e992a13437e4))

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

* support multiple options in snakeToCamel flag  ([#429](https://github.com/stephenh/ts-proto/issues/429)) ([cff6674](https://github.com/stephenh/ts-proto/commit/cff667406cba21676546fd91b04cf2cbc571ed7d)), closes [#423](https://github.com/stephenh/ts-proto/issues/423)

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

* Drop falsey values in maps in `decode` and `fromPartial`. Fixes #79. (@timostamm)

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
