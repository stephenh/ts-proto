
Goals
=====

* Pure TypeScript/ES6 modules
* Only codegen import, no runtime reflection support (just simpler)
* Currently ambivalent about browser support (we use GraphQL instead)

Assumptions
===========

* Proto package is a single snake case, e.g. `foo_bar` not `company.division.project`;
  * Could be changed but for now
* TS/ES6 module name is the proto package
