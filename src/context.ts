import { TypeMap } from "./types";
import { Utils } from "./main";
import { Options } from "./options";
import { Edition, FileDescriptorProto } from "ts-proto-descriptors";

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
  isEdition: boolean;
  edition: Edition | undefined;
}

export function createFileContext(file: FileDescriptorProto): FileContext {
  const edition = file.edition !== Edition.EDITION_UNKNOWN ? file.edition : undefined;
  const isEdition = edition !== undefined;
  const isProto3Syntax = file.syntax === "proto3" || (file.syntax !== "proto2" && isProto3Edition(edition));
  return {
    isProto3Syntax,
    isEdition,
    edition,
  };
}

function isProto3Edition(edition: Edition | undefined): boolean {
  if (edition === undefined) {
    return false;
  }
  return (
    edition === Edition.EDITION_PROTO3 ||
    edition === Edition.EDITION_2023 ||
    edition === Edition.EDITION_2024
  );
}
