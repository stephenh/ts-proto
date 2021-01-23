/* eslint-disable */
import { Any } from './google/protobuf/any';

export const protobufPackage = 'event';

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw new Error('Unable to locate global object');
})();

export interface Registration {
  eventName: string;
  date: Date | undefined;
  perks: Any | undefined;
}
