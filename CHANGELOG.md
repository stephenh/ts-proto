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

* Revert "feat: support grpc-web client straming ([#617](https://github.com/stephenh/ts-proto/issues/617))" ([#632](https://github.com/stephenh/ts-proto/issues/632)) ([2f4ecc7](https://github.com/stephenh/ts-proto/commit/2f4ecc7434df6b8f2ff08b929f9032170b04e858))

# [1.121.0](https://github.com/stephenh/ts-proto/compare/v1.120.0...v1.121.0) (2022-07-28)


### Features

* Add use-numeric-enum-json option. ([#625](https://github.com/stephenh/ts-proto/issues/625)) ([cd53d8c](https://github.com/stephenh/ts-proto/commit/cd53d8cacd6b4b8fa6517242020b216dd18eebdf))

# [1.120.0](https://github.com/stephenh/ts-proto/compare/v1.119.0...v1.120.0) (2022-07-21)


### Features

* add meta-data to stream error ([#620](https://github.com/stephenh/ts-proto/issues/620)) ([b68f301](https://github.com/stephenh/ts-proto/commit/b68f301b5fb4222a3fce676a7e5036cf00e77e11))

# [1.119.0](https://github.com/stephenh/ts-proto/compare/v1.118.0...v1.119.0) (2022-07-21)


### Features

* support grpc-web client straming ([#617](https://github.com/stephenh/ts-proto/issues/617)) ([d3e7f1f](https://github.com/stephenh/ts-proto/commit/d3e7f1f4aac12db87c54d6357e557a351c96a2ca))

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

* When outputing service and service definition implementations, include types. Eg, before:

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
