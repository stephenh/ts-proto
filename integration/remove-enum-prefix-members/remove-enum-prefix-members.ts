/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = '';

export enum Foo {
  UNSPECIFIED = 0,
  BAR = 1,
  BAZ = 2,
}

export function fooFromJSON(object: any): Foo {
  switch (object) {
    case 0:
    case 'FOO_UNSPECIFIED':
      return Foo.UNSPECIFIED;
    case 1:
    case 'FOO_BAR':
      return Foo.BAR;
    case 2:
    case 'FOO_BAZ':
      return Foo.BAZ;
    default:
      throw new globalThis.Error('Unrecognized enum value ' + object + ' for enum Foo');
  }
}

export function fooToJSON(object: Foo): string {
  switch (object) {
    case Foo.UNSPECIFIED:
      return 'FOO_UNSPECIFIED';
    case Foo.BAR:
      return 'FOO_BAR';
    case Foo.BAZ:
      return 'FOO_BAZ';
    default:
      return 'UNKNOWN';
  }
}

export enum Bar {
  UNSPECIFIED = 0,
  BAZ = 1,
  QUX = 2,
}

export function barFromJSON(object: any): Bar {
  switch (object) {
    case 0:
    case 'BAR_UNSPECIFIED':
      return Bar.UNSPECIFIED;
    case 1:
    case 'BAZ':
      return Bar.BAZ;
    case 2:
    case 'QUX':
      return Bar.QUX;
    default:
      throw new globalThis.Error('Unrecognized enum value ' + object + ' for enum Bar');
  }
}

export function barToJSON(object: Bar): string {
  switch (object) {
    case Bar.UNSPECIFIED:
      return 'BAR_UNSPECIFIED';
    case Bar.BAZ:
      return 'BAZ';
    case Bar.QUX:
      return 'QUX';
    default:
      return 'UNKNOWN';
  }
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}