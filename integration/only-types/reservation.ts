/* eslint-disable */
import type { Any } from "./google/protobuf/any";

export const protobufPackage = "event";

export interface Registration {
  eventName: string;
  date: Date | undefined;
  perks: Any | undefined;
}
