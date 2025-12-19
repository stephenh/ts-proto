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
  isEdition: boolean;
  edition: number | undefined;
}

const EDITION_FIELD_TAG = 14 << 3;
const EDITION_PROTO3 = 999;
const EDITION_2023 = 1000;
const EDITION_2024 = 1001;

export function createFileContext(file: FileDescriptorProto): FileContext {
  const edition = getFileEdition(file);
  const isEdition = edition !== undefined;
  const isProto3Syntax = file.syntax === "proto3" || (file.syntax !== "proto2" && isProto3Edition(edition));
  return {
    isProto3Syntax,
    isEdition,
    edition,
  };
}

function isProto3Edition(edition: number | undefined): boolean {
  if (edition === undefined) {
    return false;
  }
  return edition === EDITION_PROTO3 || edition === EDITION_2023 || edition === EDITION_2024;
}

function getFileEdition(file: FileDescriptorProto): number | undefined {
  const directEdition = (file as { edition?: number }).edition;
  if (directEdition !== undefined && directEdition !== 0) {
    return directEdition;
  }

  const unknownFields = file._unknownFields;
  const unknownEdition = unknownFields?.[EDITION_FIELD_TAG];
  if (!unknownEdition || unknownEdition.length === 0) {
    return undefined;
  }

  return decodeVarint(unknownEdition[0]);
}

function decodeVarint(bytes: Uint8Array): number | undefined {
  let value = 0;
  let shift = 0;
  for (const byte of bytes) {
    value |= (byte & 0x7f) << shift;
    if ((byte & 0x80) === 0) {
      return value;
    }
    shift += 7;
    if (shift > 63) {
      return undefined;
    }
  }
  return undefined;
}
