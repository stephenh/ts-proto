
Goals
=====

* Pure TypeScript/ES6 modules
* Only codegen import, no runtime reflection support (just simpler)
* Currently ambivalent about browser support (we use GraphQL instead)

Assumptions
===========

* TS/ES6 module name is the proto package

Todo
====

* Long
* OneOf
* RPC

Typing Approach
===============

* Missing fields on read
  * When decoding from binary, we setup a prototype for our returned object, which has default values.
    * This assumes missing keys trigger the default value, e.g. storing `key=undefined` would subvert the approach
  * When decoding from JSON, we may have missing keys.
    * We could convert them to our prototype.
  * When using an instantiated object, our types enforce all keys to be set.

