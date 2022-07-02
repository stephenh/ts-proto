/* eslint-disable */
import type { Any } from './google/protobuf/any.js';

export const protobufPackage = 'event';

export interface Registration {
  eventName: string;
  date: Date | undefined;
  perks: Any | undefined;
}
