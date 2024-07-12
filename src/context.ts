import { TypeMap } from "./types";
import { Utils } from "./main";
import { Options } from "./options";
import { FileDescriptorProto as TsProtoFileDescriptorProto } from "ts-proto-descriptors";
import { FileDescriptorProto as GoogleFileDescriptorProto } from "google-protobuf/google/protobuf/descriptor_pb";

/** Provides a parameter object for passing around the various context/config data. */
export interface BaseContext {
  options: Options;
  typeMap: TypeMap;
  utils: Utils;
  fileDescriptorProtoMap?: Record<string, GoogleFileDescriptorProto>;
}

export interface Context extends BaseContext {
  currentFile: FileContext;
}

export interface FileContext {
  isProto3Syntax: boolean;
}

export function createFileContext(file: TsProtoFileDescriptorProto) {
  return { isProto3Syntax: file.syntax === "proto3" };
}
