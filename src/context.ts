import { TypeMap } from './types';
import { Utils } from './main';
import { Options } from './options';

/** Resolved field numbers for the `permissions` extension on FieldOptions. */
export interface TransientExtensionMeta {
  /** Pre-computed protobuf tag: (extensionFieldNumber << 3) | 2 */
  permissionsTag: number;
  /** Field number of the `transient` bool inside the Permission message */
  transientFieldNumber: number;
}

/** Provides a parameter object for passing around the various context/config data. */
export interface Context {
  options: Options;
  typeMap: TypeMap;
  utils: Utils;
  transientMeta: TransientExtensionMeta | undefined;
}
