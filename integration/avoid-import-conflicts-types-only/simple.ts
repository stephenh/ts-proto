/* eslint-disable */
import { Simple as Simple1 } from './simple2';

export const protobufPackage = 'simple';

export interface Simple {
  name: string;
  otherSimple: Simple1 | undefined;
}
