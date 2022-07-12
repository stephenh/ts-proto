/* eslint-disable */
import * as Long from 'long';
import { wrappers } from 'protobufjs';
import * as _m0 from 'protobufjs/minimal';

export const protobufPackage = 'google.protobuf';

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request
 * or the response type of an API method. For instance:
 *
 *     service Foo {
 *       rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty);
 *     }
 *
 * The JSON representation for `Empty` is empty JSON object `{}`.
 */
export interface Empty {}

export const GOOGLE_PROTOBUF_PACKAGE_NAME = 'google.protobuf';

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

wrappers['.google.protobuf.Timestamp'] = {
  fromObject(value: Date) {
    return {
      seconds: value.getTime() / 1000,
      nanos: (value.getTime() % 1000) * 1e6,
    };
  },
  toObject(message: { seconds: number; nanos: number }) {
    return new Date(message.seconds * 1000 + message.nanos / 1e6);
  },
} as any;
