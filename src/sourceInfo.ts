import { FileDescriptorProto } from 'ts-proto-descriptors';

/** This type is expecting a value from the Fields constant. */
export type FieldID = number;

/**
 * The field values here represent the proto field IDs associated with the types
 * (file,message,enum,service).
 *
 * For more information read the comments for SourceCodeInfo declared in
 * google's 'descriptor.proto' file, see:
 * https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto#L730
 */
export const Fields = {
  file: {
    syntax: 12,
    message_type: 4,
    enum_type: 5,
    service: 6,
    extension: 7,
  },
  message: {
    field: 2,
    nested_type: 3,
    enum_type: 4,
    oneof_decl: 8,
  },
  enum: {
    value: 2,
  },
  service: {
    method: 2,
  },
};

/**
 * This type is simply an interface on the SourceCodeInfo.Location message.
 */
export interface SourceDescription {
  readonly span: number[];
  readonly leadingComments: string;
  readonly trailingComments: string;
  readonly leadingDetachedComments: string[];
}

/** An empty SourceDescription for when one is not available. */
class EmptyDescription implements SourceDescription {
  span = [];
  leadingComments = '';
  trailingComments = '';
  leadingDetachedComments = [];
}

/**
 * Mapping from a string of dotted notation `path` parts to efficiently
 * lookup the related source information.
 */
export type SourceInfoMap = {
  [key: string]: SourceDescription;
};

/**
 * This class provides direct lookup and navigation through the type
 * system by the use of lookup/open to access the source info for types
 * defined in a protocol buffer.
 */
export default class SourceInfo implements SourceDescription {
  /** Returns an empty SourceInfo */
  static empty() {
    return new SourceInfo({}, new EmptyDescription());
  }

  /**
   * Creates the SourceInfo from the FileDescriptorProto given to you
   * by the protoc compiler. It indexes file.sourceCodeInfo by dotted
   * path notation and returns the root SourceInfo.
   */
  static fromDescriptor(file: FileDescriptorProto): SourceInfo {
    let map: SourceInfoMap = {};
    if (file.sourceCodeInfo && file.sourceCodeInfo.location) {
      file.sourceCodeInfo.location.forEach((loc) => {
        map[loc.path.join('.')] = loc;
      });
    }
    return new SourceInfo(map, new EmptyDescription());
  }

  // Private
  private constructor(
    private readonly sourceCode: SourceInfoMap,
    private readonly selfDescription: SourceDescription
  ) {}

  /** Returns the code span [start line, start column, end line] */
  get span() {
    return this.selfDescription.span;
  }

  /** Leading consecutive comment lines prior to the current element */
  get leadingComments() {
    return this.selfDescription.leadingComments;
  }

  /** Documentation is unclear about what exactly this is */
  get trailingComments() {
    return this.selfDescription.trailingComments;
  }

  /** Detached comments are those preceeding but separated by a blank non-comment line */
  get leadingDetachedComments() {
    return this.selfDescription.leadingDetachedComments;
  }

  /** Return the source info for the field id and index specficied */
  lookup(type: FieldID, index?: number): SourceDescription {
    if (index === undefined) {
      return this.sourceCode[`${type}`] || new EmptyDescription();
    }
    return this.sourceCode[`${type}.${index}`] || new EmptyDescription();
  }

  /** Returns a new SourceInfo class representing the field id and index specficied */
  open(type: FieldID, index: number): SourceInfo {
    const prefix = `${type}.${index}.`;
    const map: SourceInfoMap = {};
    Object.keys(this.sourceCode)
      .filter((key) => key.startsWith(prefix))
      .forEach((key) => {
        map[key.substr(prefix.length)] = this.sourceCode[key];
      });
    return new SourceInfo(map, this.lookup(type, index));
  }
}
