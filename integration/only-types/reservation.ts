/* eslint-disable */
import { util, configure } from 'protobufjs/minimal';
import * as Long from 'long';
import { Any } from './google/protobuf/any';

export const protobufPackage = 'event';

export interface Registration {
  eventName: string;
  date: Date | undefined;
  perks: Any | undefined;
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
