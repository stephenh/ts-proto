import { TypeMap } from "./types";
import { Utils } from "./main";
import { Options } from "./options";
import { FileDescriptorProto } from "ts-proto-descriptors";

/** Provides a parameter object for passing around the various context/config data. */
export interface BaseContext {
  options: Options;
  typeMap: TypeMap;
  utils: Utils;
}

export interface Context extends BaseContext {
  currentFile: FileContext;
}

export interface FileContext {
  isProto3Syntax: boolean;
}

export function createFileContext(file: FileDescriptorProto) {
  return { isProto3Syntax: file.syntax === "proto3" };
}
