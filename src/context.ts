import { TypeMap } from './types';
import { Utils } from './main';
import { Options } from './options';

/** Provides a parameter object for passing around the various context/config data. */
export interface Context {
  options: Options;
  typeMap: TypeMap;
  utils: Utils;
}
