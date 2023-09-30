/* eslint-disable */
import * as _m0 from "protobufjs/minimal";
import Long = require("long");

export const protobufPackage = "google.protobuf";

/**
 * The protocol compiler can output a FileDescriptorSet containing the .proto
 * files it parses.
 */
export interface FileDescriptorSet {
  file: FileDescriptorProto[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/** Describes a complete .proto file. */
export interface FileDescriptorProto {
  /** file name, relative to root of source tree */
  name: string;
  /** e.g. "foo", "foo.bar", etc. */
  package: string;
  /** Names of files imported by this file. */
  dependency: string[];
  /** Indexes of the public imported files in the dependency list above. */
  publicDependency: number[];
  /**
   * Indexes of the weak imported files in the dependency list.
   * For Google-internal migration only. Do not use.
   */
  weakDependency: number[];
  /** All top-level definitions in this file. */
  messageType: DescriptorProto[];
  enumType: EnumDescriptorProto[];
  service: ServiceDescriptorProto[];
  extension: FieldDescriptorProto[];
  options:
    | FileOptions
    | undefined;
  /**
   * This field contains optional information about the original source code.
   * You may safely remove this entire field without harming runtime
   * functionality of the descriptors -- the information is needed only by
   * development tools.
   */
  sourceCodeInfo:
    | SourceCodeInfo
    | undefined;
  /**
   * The syntax of the proto file.
   * The supported values are "proto2" and "proto3".
   */
  syntax: string;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/** Describes a message type. */
export interface DescriptorProto {
  name: string;
  field: FieldDescriptorProto[];
  extension: FieldDescriptorProto[];
  nestedType: DescriptorProto[];
  enumType: EnumDescriptorProto[];
  extensionRange: DescriptorProto_ExtensionRange[];
  oneofDecl: OneofDescriptorProto[];
  options: MessageOptions | undefined;
  reservedRange: DescriptorProto_ReservedRange[];
  /**
   * Reserved field names, which may not be used by fields in the same message.
   * A given name may only be reserved once.
   */
  reservedName: string[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface DescriptorProto_ExtensionRange {
  /** Inclusive. */
  start: number;
  /** Exclusive. */
  end: number;
  options: ExtensionRangeOptions | undefined;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/**
 * Range of reserved tag numbers. Reserved tag numbers may not be used by
 * fields or extension ranges in the same message. Reserved ranges may
 * not overlap.
 */
export interface DescriptorProto_ReservedRange {
  /** Inclusive. */
  start: number;
  /** Exclusive. */
  end: number;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface ExtensionRangeOptions {
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpretedOption: UninterpretedOption[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/** Describes a field within a message. */
export interface FieldDescriptorProto {
  name: string;
  number: number;
  label: FieldDescriptorProto_Label;
  /**
   * If type_name is set, this need not be set.  If both this and type_name
   * are set, this must be one of TYPE_ENUM, TYPE_MESSAGE or TYPE_GROUP.
   */
  type: FieldDescriptorProto_Type;
  /**
   * For message and enum types, this is the name of the type.  If the name
   * starts with a '.', it is fully-qualified.  Otherwise, C++-like scoping
   * rules are used to find the type (i.e. first the nested types within this
   * message are searched, then within the parent, on up to the root
   * namespace).
   */
  typeName: string;
  /**
   * For extensions, this is the name of the type being extended.  It is
   * resolved in the same manner as type_name.
   */
  extendee: string;
  /**
   * For numeric types, contains the original text representation of the value.
   * For booleans, "true" or "false".
   * For strings, contains the default text contents (not escaped in any way).
   * For bytes, contains the C escaped value.  All bytes >= 128 are escaped.
   * TODO(kenton):  Base-64 encode?
   */
  defaultValue: string;
  /**
   * If set, gives the index of a oneof in the containing type's oneof_decl
   * list.  This field is a member of that oneof.
   */
  oneofIndex: number;
  /**
   * JSON name of this field. The value is set by protocol compiler. If the
   * user has set a "json_name" option on this field, that option's value
   * will be used. Otherwise, it's deduced from the field's name by converting
   * it to camelCase.
   */
  jsonName: string;
  options:
    | FieldOptions
    | undefined;
  /**
   * If true, this is a proto3 "optional". When a proto3 field is optional, it
   * tracks presence regardless of field type.
   *
   * When proto3_optional is true, this field must be belong to a oneof to
   * signal to old proto3 clients that presence is tracked for this field. This
   * oneof is known as a "synthetic" oneof, and this field must be its sole
   * member (each proto3 optional field gets its own synthetic oneof). Synthetic
   * oneofs exist in the descriptor only, and do not generate any API. Synthetic
   * oneofs must be ordered after all "real" oneofs.
   *
   * For message fields, proto3_optional doesn't create any semantic change,
   * since non-repeated message fields always track presence. However it still
   * indicates the semantic detail of whether the user wrote "optional" or not.
   * This can be useful for round-tripping the .proto file. For consistency we
   * give message fields a synthetic oneof also, even though it is not required
   * to track presence. This is especially important because the parser can't
   * tell if a field is a message or an enum, so it must always create a
   * synthetic oneof.
   *
   * Proto2 optional fields do not set this flag, because they already indicate
   * optional with `LABEL_OPTIONAL`.
   */
  proto3Optional: boolean;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export enum FieldDescriptorProto_Type {
  /**
   * TYPE_DOUBLE - 0 is reserved for errors.
   * Order is weird for historical reasons.
   */
  TYPE_DOUBLE = 1,
  TYPE_FLOAT = 2,
  /**
   * TYPE_INT64 - Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if
   * negative values are likely.
   */
  TYPE_INT64 = 3,
  TYPE_UINT64 = 4,
  /**
   * TYPE_INT32 - Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if
   * negative values are likely.
   */
  TYPE_INT32 = 5,
  TYPE_FIXED64 = 6,
  TYPE_FIXED32 = 7,
  TYPE_BOOL = 8,
  TYPE_STRING = 9,
  /**
   * TYPE_GROUP - Tag-delimited aggregate.
   * Group type is deprecated and not supported in proto3. However, Proto3
   * implementations should still be able to parse the group wire format and
   * treat group fields as unknown fields.
   */
  TYPE_GROUP = 10,
  /** TYPE_MESSAGE - Length-delimited aggregate. */
  TYPE_MESSAGE = 11,
  /** TYPE_BYTES - New in version 2. */
  TYPE_BYTES = 12,
  TYPE_UINT32 = 13,
  TYPE_ENUM = 14,
  TYPE_SFIXED32 = 15,
  TYPE_SFIXED64 = 16,
  /** TYPE_SINT32 - Uses ZigZag encoding. */
  TYPE_SINT32 = 17,
  /** TYPE_SINT64 - Uses ZigZag encoding. */
  TYPE_SINT64 = 18,
  UNRECOGNIZED = -1,
}

export enum FieldDescriptorProto_Label {
  /** LABEL_OPTIONAL - 0 is reserved for errors */
  LABEL_OPTIONAL = 1,
  LABEL_REQUIRED = 2,
  LABEL_REPEATED = 3,
  UNRECOGNIZED = -1,
}

/** Describes a oneof. */
export interface OneofDescriptorProto {
  name: string;
  options: OneofOptions | undefined;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/** Describes an enum type. */
export interface EnumDescriptorProto {
  name: string;
  value: EnumValueDescriptorProto[];
  options:
    | EnumOptions
    | undefined;
  /**
   * Range of reserved numeric values. Reserved numeric values may not be used
   * by enum values in the same enum declaration. Reserved ranges may not
   * overlap.
   */
  reservedRange: EnumDescriptorProto_EnumReservedRange[];
  /**
   * Reserved enum value names, which may not be reused. A given name may only
   * be reserved once.
   */
  reservedName: string[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/**
 * Range of reserved numeric values. Reserved values may not be used by
 * entries in the same enum. Reserved ranges may not overlap.
 *
 * Note that this is distinct from DescriptorProto.ReservedRange in that it
 * is inclusive such that it can appropriately represent the entire int32
 * domain.
 */
export interface EnumDescriptorProto_EnumReservedRange {
  /** Inclusive. */
  start: number;
  /** Inclusive. */
  end: number;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/** Describes a value within an enum. */
export interface EnumValueDescriptorProto {
  name: string;
  number: number;
  options: EnumValueOptions | undefined;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/** Describes a service. */
export interface ServiceDescriptorProto {
  name: string;
  method: MethodDescriptorProto[];
  options: ServiceOptions | undefined;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/** Describes a method of a service. */
export interface MethodDescriptorProto {
  name: string;
  /**
   * Input and output type names.  These are resolved in the same way as
   * FieldDescriptorProto.type_name, but must refer to a message type.
   */
  inputType: string;
  outputType: string;
  options:
    | MethodOptions
    | undefined;
  /** Identifies if client streams multiple client messages */
  clientStreaming: boolean;
  /** Identifies if server streams multiple server messages */
  serverStreaming: boolean;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface FileOptions {
  /**
   * Sets the Java package where classes generated from this .proto will be
   * placed.  By default, the proto package is used, but this is often
   * inappropriate because proto packages do not normally start with backwards
   * domain names.
   */
  javaPackage: string;
  /**
   * If set, all the classes from the .proto file are wrapped in a single
   * outer class with the given name.  This applies to both Proto1
   * (equivalent to the old "--one_java_file" option) and Proto2 (where
   * a .proto always translates to a single class, but you may want to
   * explicitly choose the class name).
   */
  javaOuterClassname: string;
  /**
   * If set true, then the Java code generator will generate a separate .java
   * file for each top-level message, enum, and service defined in the .proto
   * file.  Thus, these types will *not* be nested inside the outer class
   * named by java_outer_classname.  However, the outer class will still be
   * generated to contain the file's getDescriptor() method as well as any
   * top-level extensions defined in the file.
   */
  javaMultipleFiles: boolean;
  /**
   * This option does nothing.
   *
   * @deprecated
   */
  javaGenerateEqualsAndHash: boolean;
  /**
   * If set true, then the Java2 code generator will generate code that
   * throws an exception whenever an attempt is made to assign a non-UTF-8
   * byte sequence to a string field.
   * Message reflection will do the same.
   * However, an extension field still accepts non-UTF-8 byte sequences.
   * This option has no effect on when used with the lite runtime.
   */
  javaStringCheckUtf8: boolean;
  optimizeFor: FileOptions_OptimizeMode;
  /**
   * Sets the Go package where structs generated from this .proto will be
   * placed. If omitted, the Go package will be derived from the following:
   *   - The basename of the package import path, if provided.
   *   - Otherwise, the package statement in the .proto file, if present.
   *   - Otherwise, the basename of the .proto file, without extension.
   */
  goPackage: string;
  /**
   * Should generic services be generated in each language?  "Generic" services
   * are not specific to any particular RPC system.  They are generated by the
   * main code generators in each language (without additional plugins).
   * Generic services were the only kind of service generation supported by
   * early versions of google.protobuf.
   *
   * Generic services are now considered deprecated in favor of using plugins
   * that generate code specific to your particular RPC system.  Therefore,
   * these default to false.  Old code which depends on generic services should
   * explicitly set them to true.
   */
  ccGenericServices: boolean;
  javaGenericServices: boolean;
  pyGenericServices: boolean;
  phpGenericServices: boolean;
  /**
   * Is this file deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for everything in the file, or it will be completely ignored; in the very
   * least, this is a formalization for deprecating files.
   */
  deprecated: boolean;
  /**
   * Enables the use of arenas for the proto messages in this file. This applies
   * only to generated classes for C++.
   */
  ccEnableArenas: boolean;
  /**
   * Sets the objective c class prefix which is prepended to all objective c
   * generated classes from this .proto. There is no default.
   */
  objcClassPrefix: string;
  /** Namespace for generated classes; defaults to the package. */
  csharpNamespace: string;
  /**
   * By default Swift generators will take the proto package and CamelCase it
   * replacing '.' with underscore and use that to prefix the types/symbols
   * defined. When this options is provided, they will use this value instead
   * to prefix the types/symbols defined.
   */
  swiftPrefix: string;
  /**
   * Sets the php class prefix which is prepended to all php generated classes
   * from this .proto. Default is empty.
   */
  phpClassPrefix: string;
  /**
   * Use this option to change the namespace of php generated classes. Default
   * is empty. When this option is empty, the package name will be used for
   * determining the namespace.
   */
  phpNamespace: string;
  /**
   * Use this option to change the namespace of php generated metadata classes.
   * Default is empty. When this option is empty, the proto file name will be
   * used for determining the namespace.
   */
  phpMetadataNamespace: string;
  /**
   * Use this option to change the package of ruby generated classes. Default
   * is empty. When this option is not set, the package name will be used for
   * determining the ruby package.
   */
  rubyPackage: string;
  /**
   * The parser stores options it doesn't recognize here.
   * See the documentation for the "Options" section above.
   */
  uninterpretedOption: UninterpretedOption[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/** Generated classes can be optimized for speed or code size. */
export enum FileOptions_OptimizeMode {
  /** SPEED - Generate complete code for parsing, serialization, */
  SPEED = 1,
  /** CODE_SIZE - etc. */
  CODE_SIZE = 2,
  /** LITE_RUNTIME - Generate code using MessageLite and the lite runtime. */
  LITE_RUNTIME = 3,
  UNRECOGNIZED = -1,
}

export interface MessageOptions {
  /**
   * Set true to use the old proto1 MessageSet wire format for extensions.
   * This is provided for backwards-compatibility with the MessageSet wire
   * format.  You should not use this for any other reason:  It's less
   * efficient, has fewer features, and is more complicated.
   *
   * The message must be defined exactly as follows:
   *   message Foo {
   *     option message_set_wire_format = true;
   *     extensions 4 to max;
   *   }
   * Note that the message cannot have any defined fields; MessageSets only
   * have extensions.
   *
   * All extensions of your type must be singular messages; e.g. they cannot
   * be int32s, enums, or repeated messages.
   *
   * Because this is an option, the above two restrictions are not enforced by
   * the protocol compiler.
   */
  messageSetWireFormat: boolean;
  /**
   * Disables the generation of the standard "descriptor()" accessor, which can
   * conflict with a field of the same name.  This is meant to make migration
   * from proto1 easier; new code should avoid fields named "descriptor".
   */
  noStandardDescriptorAccessor: boolean;
  /**
   * Is this message deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the message, or it will be completely ignored; in the very least,
   * this is a formalization for deprecating messages.
   */
  deprecated: boolean;
  /**
   * Whether the message is an automatically generated map entry type for the
   * maps field.
   *
   * For maps fields:
   *     map<KeyType, ValueType> map_field = 1;
   * The parsed descriptor looks like:
   *     message MapFieldEntry {
   *         option map_entry = true;
   *         optional KeyType key = 1;
   *         optional ValueType value = 2;
   *     }
   *     repeated MapFieldEntry map_field = 1;
   *
   * Implementations may choose not to generate the map_entry=true message, but
   * use a native map in the target language to hold the keys and values.
   * The reflection APIs in such implementations still need to work as
   * if the field is a repeated message field.
   *
   * NOTE: Do not set the option in .proto files. Always use the maps syntax
   * instead. The option should only be implicitly set by the proto compiler
   * parser.
   */
  mapEntry: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpretedOption: UninterpretedOption[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface FieldOptions {
  /**
   * The ctype option instructs the C++ code generator to use a different
   * representation of the field than it normally would.  See the specific
   * options below.  This option is not yet implemented in the open source
   * release -- sorry, we'll try to include it in a future version!
   */
  ctype: FieldOptions_CType;
  /**
   * The packed option can be enabled for repeated primitive fields to enable
   * a more efficient representation on the wire. Rather than repeatedly
   * writing the tag and type for each element, the entire array is encoded as
   * a single length-delimited blob. In proto3, only explicit setting it to
   * false will avoid using packed encoding.
   */
  packed: boolean;
  /**
   * The jstype option determines the JavaScript type used for values of the
   * field.  The option is permitted only for 64 bit integral and fixed types
   * (int64, uint64, sint64, fixed64, sfixed64).  A field with jstype JS_STRING
   * is represented as JavaScript string, which avoids loss of precision that
   * can happen when a large value is converted to a floating point JavaScript.
   * Specifying JS_NUMBER for the jstype causes the generated JavaScript code to
   * use the JavaScript "number" type.  The behavior of the default option
   * JS_NORMAL is implementation dependent.
   *
   * This option is an enum to permit additional types to be added, e.g.
   * goog.math.Integer.
   */
  jstype: FieldOptions_JSType;
  /**
   * Should this field be parsed lazily?  Lazy applies only to message-type
   * fields.  It means that when the outer message is initially parsed, the
   * inner message's contents will not be parsed but instead stored in encoded
   * form.  The inner message will actually be parsed when it is first accessed.
   *
   * This is only a hint.  Implementations are free to choose whether to use
   * eager or lazy parsing regardless of the value of this option.  However,
   * setting this option true suggests that the protocol author believes that
   * using lazy parsing on this field is worth the additional bookkeeping
   * overhead typically needed to implement it.
   *
   * This option does not affect the public interface of any generated code;
   * all method signatures remain the same.  Furthermore, thread-safety of the
   * interface is not affected by this option; const methods remain safe to
   * call from multiple threads concurrently, while non-const methods continue
   * to require exclusive access.
   *
   * Note that implementations may choose not to check required fields within
   * a lazy sub-message.  That is, calling IsInitialized() on the outer message
   * may return true even if the inner message has missing required fields.
   * This is necessary because otherwise the inner message would have to be
   * parsed in order to perform the check, defeating the purpose of lazy
   * parsing.  An implementation which chooses not to check required fields
   * must be consistent about it.  That is, for any particular sub-message, the
   * implementation must either *always* check its required fields, or *never*
   * check its required fields, regardless of whether or not the message has
   * been parsed.
   */
  lazy: boolean;
  /**
   * Is this field deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for accessors, or it will be completely ignored; in the very least, this
   * is a formalization for deprecating fields.
   */
  deprecated: boolean;
  /** For Google-internal migration only. Do not use. */
  weak: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpretedOption: UninterpretedOption[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export enum FieldOptions_CType {
  /** STRING - Default mode. */
  STRING = 0,
  CORD = 1,
  STRING_PIECE = 2,
  UNRECOGNIZED = -1,
}

export enum FieldOptions_JSType {
  /** JS_NORMAL - Use the default type. */
  JS_NORMAL = 0,
  /** JS_STRING - Use JavaScript strings. */
  JS_STRING = 1,
  /** JS_NUMBER - Use JavaScript numbers. */
  JS_NUMBER = 2,
  UNRECOGNIZED = -1,
}

export interface OneofOptions {
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpretedOption: UninterpretedOption[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface EnumOptions {
  /**
   * Set this option to true to allow mapping different tag names to the same
   * value.
   */
  allowAlias: boolean;
  /**
   * Is this enum deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the enum, or it will be completely ignored; in the very least, this
   * is a formalization for deprecating enums.
   */
  deprecated: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpretedOption: UninterpretedOption[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface EnumValueOptions {
  /**
   * Is this enum value deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the enum value, or it will be completely ignored; in the very least,
   * this is a formalization for deprecating enum values.
   */
  deprecated: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpretedOption: UninterpretedOption[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface ServiceOptions {
  /**
   * Is this service deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the service, or it will be completely ignored; in the very least,
   * this is a formalization for deprecating services.
   */
  deprecated: boolean;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpretedOption: UninterpretedOption[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface MethodOptions {
  /**
   * Is this method deprecated?
   * Depending on the target platform, this can emit Deprecated annotations
   * for the method, or it will be completely ignored; in the very least,
   * this is a formalization for deprecating methods.
   */
  deprecated: boolean;
  idempotencyLevel: MethodOptions_IdempotencyLevel;
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpretedOption: UninterpretedOption[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/**
 * Is this method side-effect-free (or safe in HTTP parlance), or idempotent,
 * or neither? HTTP based RPC implementation may choose GET verb for safe
 * methods, and PUT verb for idempotent methods instead of the default POST.
 */
export enum MethodOptions_IdempotencyLevel {
  IDEMPOTENCY_UNKNOWN = 0,
  /** NO_SIDE_EFFECTS - implies idempotent */
  NO_SIDE_EFFECTS = 1,
  /** IDEMPOTENT - idempotent, but may have side effects */
  IDEMPOTENT = 2,
  UNRECOGNIZED = -1,
}

/**
 * A message representing a option the parser does not recognize. This only
 * appears in options protos created by the compiler::Parser class.
 * DescriptorPool resolves these when building Descriptor objects. Therefore,
 * options protos in descriptor objects (e.g. returned by Descriptor::options(),
 * or produced by Descriptor::CopyTo()) will never have UninterpretedOptions
 * in them.
 */
export interface UninterpretedOption {
  name: UninterpretedOption_NamePart[];
  /**
   * The value of the uninterpreted option, in whatever type the tokenizer
   * identified it as during parsing. Exactly one of these should be set.
   */
  identifierValue: string;
  positiveIntValue: number;
  negativeIntValue: number;
  doubleValue: number;
  stringValue: Uint8Array;
  aggregateValue: string;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/**
 * The name of the uninterpreted option.  Each string represents a segment in
 * a dot-separated name.  is_extension is true iff a segment represents an
 * extension (denoted with parentheses in options specs in .proto files).
 * E.g.,{ ["foo", false], ["bar.baz", true], ["qux", false] } represents
 * "foo.(bar.baz).qux".
 */
export interface UninterpretedOption_NamePart {
  namePart: string;
  isExtension: boolean;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/**
 * Encapsulates information about the original source file from which a
 * FileDescriptorProto was generated.
 */
export interface SourceCodeInfo {
  /**
   * A Location identifies a piece of source code in a .proto file which
   * corresponds to a particular definition.  This information is intended
   * to be useful to IDEs, code indexers, documentation generators, and similar
   * tools.
   *
   * For example, say we have a file like:
   *   message Foo {
   *     optional string foo = 1;
   *   }
   * Let's look at just the field definition:
   *   optional string foo = 1;
   *   ^       ^^     ^^  ^  ^^^
   *   a       bc     de  f  ghi
   * We have the following locations:
   *   span   path               represents
   *   [a,i)  [ 4, 0, 2, 0 ]     The whole field definition.
   *   [a,b)  [ 4, 0, 2, 0, 4 ]  The label (optional).
   *   [c,d)  [ 4, 0, 2, 0, 5 ]  The type (string).
   *   [e,f)  [ 4, 0, 2, 0, 1 ]  The name (foo).
   *   [g,h)  [ 4, 0, 2, 0, 3 ]  The number (1).
   *
   * Notes:
   * - A location may refer to a repeated field itself (i.e. not to any
   *   particular index within it).  This is used whenever a set of elements are
   *   logically enclosed in a single code segment.  For example, an entire
   *   extend block (possibly containing multiple extension definitions) will
   *   have an outer location whose path refers to the "extensions" repeated
   *   field without an index.
   * - Multiple locations may have the same path.  This happens when a single
   *   logical declaration is spread out across multiple places.  The most
   *   obvious example is the "extend" block again -- there may be multiple
   *   extend blocks in the same scope, each of which will have the same path.
   * - A location's span is not always a subset of its parent's span.  For
   *   example, the "extendee" of an extension declaration appears at the
   *   beginning of the "extend" block and is shared by all extensions within
   *   the block.
   * - Just because a location's span is a subset of some other location's span
   *   does not mean that it is a descendant.  For example, a "group" defines
   *   both a type and a field in a single declaration.  Thus, the locations
   *   corresponding to the type and field and their components will overlap.
   * - Code which tries to interpret locations should probably be designed to
   *   ignore those that it doesn't understand, as more types of locations could
   *   be recorded in the future.
   */
  location: SourceCodeInfo_Location[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface SourceCodeInfo_Location {
  /**
   * Identifies which part of the FileDescriptorProto was defined at this
   * location.
   *
   * Each element is a field number or an index.  They form a path from
   * the root FileDescriptorProto to the place where the definition.  For
   * example, this path:
   *   [ 4, 3, 2, 7, 1 ]
   * refers to:
   *   file.message_type(3)  // 4, 3
   *       .field(7)         // 2, 7
   *       .name()           // 1
   * This is because FileDescriptorProto.message_type has field number 4:
   *   repeated DescriptorProto message_type = 4;
   * and DescriptorProto.field has field number 2:
   *   repeated FieldDescriptorProto field = 2;
   * and FieldDescriptorProto.name has field number 1:
   *   optional string name = 1;
   *
   * Thus, the above path gives the location of a field name.  If we removed
   * the last element:
   *   [ 4, 3, 2, 7 ]
   * this path refers to the whole field declaration (from the beginning
   * of the label to the terminating semicolon).
   */
  path: number[];
  /**
   * Always has exactly three or four elements: start line, start column,
   * end line (optional, otherwise assumed same as start line), end column.
   * These are packed into a single field for efficiency.  Note that line
   * and column numbers are zero-based -- typically you will want to add
   * 1 to each before displaying to a user.
   */
  span: number[];
  /**
   * If this SourceCodeInfo represents a complete declaration, these are any
   * comments appearing before and after the declaration which appear to be
   * attached to the declaration.
   *
   * A series of line comments appearing on consecutive lines, with no other
   * tokens appearing on those lines, will be treated as a single comment.
   *
   * leading_detached_comments will keep paragraphs of comments that appear
   * before (but not connected to) the current element. Each paragraph,
   * separated by empty lines, will be one comment element in the repeated
   * field.
   *
   * Only the comment content is provided; comment markers (e.g. //) are
   * stripped out.  For block comments, leading whitespace and an asterisk
   * will be stripped from the beginning of each line other than the first.
   * Newlines are included in the output.
   *
   * Examples:
   *
   *   optional int32 foo = 1;  // Comment attached to foo.
   *   // Comment attached to bar.
   *   optional int32 bar = 2;
   *
   *   optional string baz = 3;
   *   // Comment attached to baz.
   *   // Another line attached to baz.
   *
   *   // Comment attached to qux.
   *   //
   *   // Another line attached to qux.
   *   optional double qux = 4;
   *
   *   // Detached comment for corge. This is not leading or trailing comments
   *   // to qux or corge because there are blank lines separating it from
   *   // both.
   *
   *   // Detached comment for corge paragraph 2.
   *
   *   optional string corge = 5;
   *   /* Block comment attached
   *    * to corge.  Leading asterisks
   *    * will be removed. * /
   *   /* Block comment attached to
   *    * grault. * /
   *   optional int32 grault = 6;
   *
   *   // ignored detached comments.
   */
  leadingComments: string;
  trailingComments: string;
  leadingDetachedComments: string[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

/**
 * Describes the relationship between generated code and its original source
 * file. A GeneratedCodeInfo message is associated with only one generated
 * source file, but may contain references to different source .proto files.
 */
export interface GeneratedCodeInfo {
  /**
   * An Annotation connects some span of text in generated code to an element
   * of its generating .proto file.
   */
  annotation: GeneratedCodeInfo_Annotation[];
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

export interface GeneratedCodeInfo_Annotation {
  /**
   * Identifies the element in the original source .proto file. This field
   * is formatted the same as SourceCodeInfo.Location.path.
   */
  path: number[];
  /** Identifies the filesystem path to the original source .proto. */
  sourceFile: string;
  /**
   * Identifies the starting offset in bytes in the generated code
   * that relates to the identified object.
   */
  begin: number;
  /**
   * Identifies the ending offset in bytes in the generated code that
   * relates to the identified offset. The end offset should be one past
   * the last relevant byte (so the length of the text = end - begin).
   */
  end: number;
  _unknownFields?: { [key: number]: Uint8Array[] } | undefined;
}

function createBaseFileDescriptorSet(): FileDescriptorSet {
  return { file: [], _unknownFields: {} };
}

export const FileDescriptorSet = {
  encode(message: FileDescriptorSet, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.file) {
      FileDescriptorProto.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileDescriptorSet {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileDescriptorSet();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.file.push(FileDescriptorProto.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseFileDescriptorProto(): FileDescriptorProto {
  return {
    name: "",
    package: "",
    dependency: [],
    publicDependency: [],
    weakDependency: [],
    messageType: [],
    enumType: [],
    service: [],
    extension: [],
    options: undefined,
    sourceCodeInfo: undefined,
    syntax: "",
    _unknownFields: {},
  };
}

export const FileDescriptorProto = {
  encode(message: FileDescriptorProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.package !== "") {
      writer.uint32(18).string(message.package);
    }
    for (const v of message.dependency) {
      writer.uint32(26).string(v!);
    }
    writer.uint32(82).fork();
    for (const v of message.publicDependency) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(90).fork();
    for (const v of message.weakDependency) {
      writer.int32(v);
    }
    writer.ldelim();
    for (const v of message.messageType) {
      DescriptorProto.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.enumType) {
      EnumDescriptorProto.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.service) {
      ServiceDescriptorProto.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.extension) {
      FieldDescriptorProto.encode(v!, writer.uint32(58).fork()).ldelim();
    }
    if (message.options !== undefined) {
      FileOptions.encode(message.options, writer.uint32(66).fork()).ldelim();
    }
    if (message.sourceCodeInfo !== undefined) {
      SourceCodeInfo.encode(message.sourceCodeInfo, writer.uint32(74).fork()).ldelim();
    }
    if (message.syntax !== "") {
      writer.uint32(98).string(message.syntax);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileDescriptorProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileDescriptorProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.package = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.dependency.push(reader.string());
          continue;
        case 10:
          if (tag === 80) {
            message.publicDependency.push(reader.int32());

            continue;
          }

          if (tag === 82) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.publicDependency.push(reader.int32());
            }

            continue;
          }

          break;
        case 11:
          if (tag === 88) {
            message.weakDependency.push(reader.int32());

            continue;
          }

          if (tag === 90) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.weakDependency.push(reader.int32());
            }

            continue;
          }

          break;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.messageType.push(DescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.enumType.push(EnumDescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.service.push(ServiceDescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.extension.push(FieldDescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.options = FileOptions.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.sourceCodeInfo = SourceCodeInfo.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.syntax = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseDescriptorProto(): DescriptorProto {
  return {
    name: "",
    field: [],
    extension: [],
    nestedType: [],
    enumType: [],
    extensionRange: [],
    oneofDecl: [],
    options: undefined,
    reservedRange: [],
    reservedName: [],
    _unknownFields: {},
  };
}

export const DescriptorProto = {
  encode(message: DescriptorProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.field) {
      FieldDescriptorProto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    for (const v of message.extension) {
      FieldDescriptorProto.encode(v!, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.nestedType) {
      DescriptorProto.encode(v!, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.enumType) {
      EnumDescriptorProto.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.extensionRange) {
      DescriptorProto_ExtensionRange.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    for (const v of message.oneofDecl) {
      OneofDescriptorProto.encode(v!, writer.uint32(66).fork()).ldelim();
    }
    if (message.options !== undefined) {
      MessageOptions.encode(message.options, writer.uint32(58).fork()).ldelim();
    }
    for (const v of message.reservedRange) {
      DescriptorProto_ReservedRange.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    for (const v of message.reservedName) {
      writer.uint32(82).string(v!);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescriptorProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescriptorProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.field.push(FieldDescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.extension.push(FieldDescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.nestedType.push(DescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.enumType.push(EnumDescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.extensionRange.push(DescriptorProto_ExtensionRange.decode(reader, reader.uint32()));
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.oneofDecl.push(OneofDescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.options = MessageOptions.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.reservedRange.push(DescriptorProto_ReservedRange.decode(reader, reader.uint32()));
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.reservedName.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseDescriptorProto_ExtensionRange(): DescriptorProto_ExtensionRange {
  return { start: 0, end: 0, options: undefined, _unknownFields: {} };
}

export const DescriptorProto_ExtensionRange = {
  encode(message: DescriptorProto_ExtensionRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    if (message.options !== undefined) {
      ExtensionRangeOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescriptorProto_ExtensionRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescriptorProto_ExtensionRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.start = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.end = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.options = ExtensionRangeOptions.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseDescriptorProto_ReservedRange(): DescriptorProto_ReservedRange {
  return { start: 0, end: 0, _unknownFields: {} };
}

export const DescriptorProto_ReservedRange = {
  encode(message: DescriptorProto_ReservedRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): DescriptorProto_ReservedRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDescriptorProto_ReservedRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.start = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.end = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseExtensionRangeOptions(): ExtensionRangeOptions {
  return { uninterpretedOption: [], _unknownFields: {} };
}

export const ExtensionRangeOptions = {
  encode(message: ExtensionRangeOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExtensionRangeOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExtensionRangeOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 999:
          if (tag !== 7994) {
            break;
          }

          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseFieldDescriptorProto(): FieldDescriptorProto {
  return {
    name: "",
    number: 0,
    label: 1,
    type: 1,
    typeName: "",
    extendee: "",
    defaultValue: "",
    oneofIndex: 0,
    jsonName: "",
    options: undefined,
    proto3Optional: false,
    _unknownFields: {},
  };
}

export const FieldDescriptorProto = {
  encode(message: FieldDescriptorProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.number !== 0) {
      writer.uint32(24).int32(message.number);
    }
    if (message.label !== 1) {
      writer.uint32(32).int32(message.label);
    }
    if (message.type !== 1) {
      writer.uint32(40).int32(message.type);
    }
    if (message.typeName !== "") {
      writer.uint32(50).string(message.typeName);
    }
    if (message.extendee !== "") {
      writer.uint32(18).string(message.extendee);
    }
    if (message.defaultValue !== "") {
      writer.uint32(58).string(message.defaultValue);
    }
    if (message.oneofIndex !== 0) {
      writer.uint32(72).int32(message.oneofIndex);
    }
    if (message.jsonName !== "") {
      writer.uint32(82).string(message.jsonName);
    }
    if (message.options !== undefined) {
      FieldOptions.encode(message.options, writer.uint32(66).fork()).ldelim();
    }
    if (message.proto3Optional === true) {
      writer.uint32(136).bool(message.proto3Optional);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldDescriptorProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldDescriptorProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.number = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.label = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.type = reader.int32() as any;
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.typeName = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.extendee = reader.string();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.defaultValue = reader.string();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.oneofIndex = reader.int32();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.jsonName = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.options = FieldOptions.decode(reader, reader.uint32());
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.proto3Optional = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseOneofDescriptorProto(): OneofDescriptorProto {
  return { name: "", options: undefined, _unknownFields: {} };
}

export const OneofDescriptorProto = {
  encode(message: OneofDescriptorProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.options !== undefined) {
      OneofOptions.encode(message.options, writer.uint32(18).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OneofDescriptorProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOneofDescriptorProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.options = OneofOptions.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseEnumDescriptorProto(): EnumDescriptorProto {
  return { name: "", value: [], options: undefined, reservedRange: [], reservedName: [], _unknownFields: {} };
}

export const EnumDescriptorProto = {
  encode(message: EnumDescriptorProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.value) {
      EnumValueDescriptorProto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.options !== undefined) {
      EnumOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.reservedRange) {
      EnumDescriptorProto_EnumReservedRange.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.reservedName) {
      writer.uint32(42).string(v!);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnumDescriptorProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnumDescriptorProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value.push(EnumValueDescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.options = EnumOptions.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.reservedRange.push(EnumDescriptorProto_EnumReservedRange.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.reservedName.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseEnumDescriptorProto_EnumReservedRange(): EnumDescriptorProto_EnumReservedRange {
  return { start: 0, end: 0, _unknownFields: {} };
}

export const EnumDescriptorProto_EnumReservedRange = {
  encode(message: EnumDescriptorProto_EnumReservedRange, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnumDescriptorProto_EnumReservedRange {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnumDescriptorProto_EnumReservedRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.start = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.end = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseEnumValueDescriptorProto(): EnumValueDescriptorProto {
  return { name: "", number: 0, options: undefined, _unknownFields: {} };
}

export const EnumValueDescriptorProto = {
  encode(message: EnumValueDescriptorProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.number !== 0) {
      writer.uint32(16).int32(message.number);
    }
    if (message.options !== undefined) {
      EnumValueOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnumValueDescriptorProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnumValueDescriptorProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.number = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.options = EnumValueOptions.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseServiceDescriptorProto(): ServiceDescriptorProto {
  return { name: "", method: [], options: undefined, _unknownFields: {} };
}

export const ServiceDescriptorProto = {
  encode(message: ServiceDescriptorProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.method) {
      MethodDescriptorProto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.options !== undefined) {
      ServiceOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceDescriptorProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceDescriptorProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.method.push(MethodDescriptorProto.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.options = ServiceOptions.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseMethodDescriptorProto(): MethodDescriptorProto {
  return {
    name: "",
    inputType: "",
    outputType: "",
    options: undefined,
    clientStreaming: false,
    serverStreaming: false,
    _unknownFields: {},
  };
}

export const MethodDescriptorProto = {
  encode(message: MethodDescriptorProto, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.inputType !== "") {
      writer.uint32(18).string(message.inputType);
    }
    if (message.outputType !== "") {
      writer.uint32(26).string(message.outputType);
    }
    if (message.options !== undefined) {
      MethodOptions.encode(message.options, writer.uint32(34).fork()).ldelim();
    }
    if (message.clientStreaming === true) {
      writer.uint32(40).bool(message.clientStreaming);
    }
    if (message.serverStreaming === true) {
      writer.uint32(48).bool(message.serverStreaming);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MethodDescriptorProto {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMethodDescriptorProto();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.inputType = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.outputType = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.options = MethodOptions.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.clientStreaming = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.serverStreaming = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseFileOptions(): FileOptions {
  return {
    javaPackage: "",
    javaOuterClassname: "",
    javaMultipleFiles: false,
    javaGenerateEqualsAndHash: false,
    javaStringCheckUtf8: false,
    optimizeFor: 1,
    goPackage: "",
    ccGenericServices: false,
    javaGenericServices: false,
    pyGenericServices: false,
    phpGenericServices: false,
    deprecated: false,
    ccEnableArenas: false,
    objcClassPrefix: "",
    csharpNamespace: "",
    swiftPrefix: "",
    phpClassPrefix: "",
    phpNamespace: "",
    phpMetadataNamespace: "",
    rubyPackage: "",
    uninterpretedOption: [],
    _unknownFields: {},
  };
}

export const FileOptions = {
  encode(message: FileOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.javaPackage !== "") {
      writer.uint32(10).string(message.javaPackage);
    }
    if (message.javaOuterClassname !== "") {
      writer.uint32(66).string(message.javaOuterClassname);
    }
    if (message.javaMultipleFiles === true) {
      writer.uint32(80).bool(message.javaMultipleFiles);
    }
    if (message.javaGenerateEqualsAndHash === true) {
      writer.uint32(160).bool(message.javaGenerateEqualsAndHash);
    }
    if (message.javaStringCheckUtf8 === true) {
      writer.uint32(216).bool(message.javaStringCheckUtf8);
    }
    if (message.optimizeFor !== 1) {
      writer.uint32(72).int32(message.optimizeFor);
    }
    if (message.goPackage !== "") {
      writer.uint32(90).string(message.goPackage);
    }
    if (message.ccGenericServices === true) {
      writer.uint32(128).bool(message.ccGenericServices);
    }
    if (message.javaGenericServices === true) {
      writer.uint32(136).bool(message.javaGenericServices);
    }
    if (message.pyGenericServices === true) {
      writer.uint32(144).bool(message.pyGenericServices);
    }
    if (message.phpGenericServices === true) {
      writer.uint32(336).bool(message.phpGenericServices);
    }
    if (message.deprecated === true) {
      writer.uint32(184).bool(message.deprecated);
    }
    if (message.ccEnableArenas === true) {
      writer.uint32(248).bool(message.ccEnableArenas);
    }
    if (message.objcClassPrefix !== "") {
      writer.uint32(290).string(message.objcClassPrefix);
    }
    if (message.csharpNamespace !== "") {
      writer.uint32(298).string(message.csharpNamespace);
    }
    if (message.swiftPrefix !== "") {
      writer.uint32(314).string(message.swiftPrefix);
    }
    if (message.phpClassPrefix !== "") {
      writer.uint32(322).string(message.phpClassPrefix);
    }
    if (message.phpNamespace !== "") {
      writer.uint32(330).string(message.phpNamespace);
    }
    if (message.phpMetadataNamespace !== "") {
      writer.uint32(354).string(message.phpMetadataNamespace);
    }
    if (message.rubyPackage !== "") {
      writer.uint32(362).string(message.rubyPackage);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FileOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFileOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.javaPackage = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.javaOuterClassname = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.javaMultipleFiles = reader.bool();
          continue;
        case 20:
          if (tag !== 160) {
            break;
          }

          message.javaGenerateEqualsAndHash = reader.bool();
          continue;
        case 27:
          if (tag !== 216) {
            break;
          }

          message.javaStringCheckUtf8 = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.optimizeFor = reader.int32() as any;
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.goPackage = reader.string();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.ccGenericServices = reader.bool();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.javaGenericServices = reader.bool();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.pyGenericServices = reader.bool();
          continue;
        case 42:
          if (tag !== 336) {
            break;
          }

          message.phpGenericServices = reader.bool();
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.deprecated = reader.bool();
          continue;
        case 31:
          if (tag !== 248) {
            break;
          }

          message.ccEnableArenas = reader.bool();
          continue;
        case 36:
          if (tag !== 290) {
            break;
          }

          message.objcClassPrefix = reader.string();
          continue;
        case 37:
          if (tag !== 298) {
            break;
          }

          message.csharpNamespace = reader.string();
          continue;
        case 39:
          if (tag !== 314) {
            break;
          }

          message.swiftPrefix = reader.string();
          continue;
        case 40:
          if (tag !== 322) {
            break;
          }

          message.phpClassPrefix = reader.string();
          continue;
        case 41:
          if (tag !== 330) {
            break;
          }

          message.phpNamespace = reader.string();
          continue;
        case 44:
          if (tag !== 354) {
            break;
          }

          message.phpMetadataNamespace = reader.string();
          continue;
        case 45:
          if (tag !== 362) {
            break;
          }

          message.rubyPackage = reader.string();
          continue;
        case 999:
          if (tag !== 7994) {
            break;
          }

          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseMessageOptions(): MessageOptions {
  return {
    messageSetWireFormat: false,
    noStandardDescriptorAccessor: false,
    deprecated: false,
    mapEntry: false,
    uninterpretedOption: [],
    _unknownFields: {},
  };
}

export const MessageOptions = {
  encode(message: MessageOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.messageSetWireFormat === true) {
      writer.uint32(8).bool(message.messageSetWireFormat);
    }
    if (message.noStandardDescriptorAccessor === true) {
      writer.uint32(16).bool(message.noStandardDescriptorAccessor);
    }
    if (message.deprecated === true) {
      writer.uint32(24).bool(message.deprecated);
    }
    if (message.mapEntry === true) {
      writer.uint32(56).bool(message.mapEntry);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MessageOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMessageOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.messageSetWireFormat = reader.bool();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.noStandardDescriptorAccessor = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.deprecated = reader.bool();
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.mapEntry = reader.bool();
          continue;
        case 999:
          if (tag !== 7994) {
            break;
          }

          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseFieldOptions(): FieldOptions {
  return {
    ctype: 0,
    packed: false,
    jstype: 0,
    lazy: false,
    deprecated: false,
    weak: false,
    uninterpretedOption: [],
    _unknownFields: {},
  };
}

export const FieldOptions = {
  encode(message: FieldOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.ctype !== 0) {
      writer.uint32(8).int32(message.ctype);
    }
    if (message.packed === true) {
      writer.uint32(16).bool(message.packed);
    }
    if (message.jstype !== 0) {
      writer.uint32(48).int32(message.jstype);
    }
    if (message.lazy === true) {
      writer.uint32(40).bool(message.lazy);
    }
    if (message.deprecated === true) {
      writer.uint32(24).bool(message.deprecated);
    }
    if (message.weak === true) {
      writer.uint32(80).bool(message.weak);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): FieldOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFieldOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.ctype = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.packed = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.jstype = reader.int32() as any;
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.lazy = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.deprecated = reader.bool();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.weak = reader.bool();
          continue;
        case 999:
          if (tag !== 7994) {
            break;
          }

          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseOneofOptions(): OneofOptions {
  return { uninterpretedOption: [], _unknownFields: {} };
}

export const OneofOptions = {
  encode(message: OneofOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): OneofOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOneofOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 999:
          if (tag !== 7994) {
            break;
          }

          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseEnumOptions(): EnumOptions {
  return { allowAlias: false, deprecated: false, uninterpretedOption: [], _unknownFields: {} };
}

export const EnumOptions = {
  encode(message: EnumOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.allowAlias === true) {
      writer.uint32(16).bool(message.allowAlias);
    }
    if (message.deprecated === true) {
      writer.uint32(24).bool(message.deprecated);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnumOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnumOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 16) {
            break;
          }

          message.allowAlias = reader.bool();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.deprecated = reader.bool();
          continue;
        case 999:
          if (tag !== 7994) {
            break;
          }

          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseEnumValueOptions(): EnumValueOptions {
  return { deprecated: false, uninterpretedOption: [], _unknownFields: {} };
}

export const EnumValueOptions = {
  encode(message: EnumValueOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.deprecated === true) {
      writer.uint32(8).bool(message.deprecated);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): EnumValueOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnumValueOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.deprecated = reader.bool();
          continue;
        case 999:
          if (tag !== 7994) {
            break;
          }

          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseServiceOptions(): ServiceOptions {
  return { deprecated: false, uninterpretedOption: [], _unknownFields: {} };
}

export const ServiceOptions = {
  encode(message: ServiceOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.deprecated === true) {
      writer.uint32(264).bool(message.deprecated);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ServiceOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseServiceOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 33:
          if (tag !== 264) {
            break;
          }

          message.deprecated = reader.bool();
          continue;
        case 999:
          if (tag !== 7994) {
            break;
          }

          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseMethodOptions(): MethodOptions {
  return { deprecated: false, idempotencyLevel: 0, uninterpretedOption: [], _unknownFields: {} };
}

export const MethodOptions = {
  encode(message: MethodOptions, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.deprecated === true) {
      writer.uint32(264).bool(message.deprecated);
    }
    if (message.idempotencyLevel !== 0) {
      writer.uint32(272).int32(message.idempotencyLevel);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MethodOptions {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMethodOptions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 33:
          if (tag !== 264) {
            break;
          }

          message.deprecated = reader.bool();
          continue;
        case 34:
          if (tag !== 272) {
            break;
          }

          message.idempotencyLevel = reader.int32() as any;
          continue;
        case 999:
          if (tag !== 7994) {
            break;
          }

          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseUninterpretedOption(): UninterpretedOption {
  return {
    name: [],
    identifierValue: "",
    positiveIntValue: 0,
    negativeIntValue: 0,
    doubleValue: 0,
    stringValue: new Uint8Array(0),
    aggregateValue: "",
    _unknownFields: {},
  };
}

export const UninterpretedOption = {
  encode(message: UninterpretedOption, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.name) {
      UninterpretedOption_NamePart.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.identifierValue !== "") {
      writer.uint32(26).string(message.identifierValue);
    }
    if (message.positiveIntValue !== 0) {
      writer.uint32(32).uint64(message.positiveIntValue);
    }
    if (message.negativeIntValue !== 0) {
      writer.uint32(40).int64(message.negativeIntValue);
    }
    if (message.doubleValue !== 0) {
      writer.uint32(49).double(message.doubleValue);
    }
    if (message.stringValue.length !== 0) {
      writer.uint32(58).bytes(message.stringValue);
    }
    if (message.aggregateValue !== "") {
      writer.uint32(66).string(message.aggregateValue);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UninterpretedOption {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUninterpretedOption();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.name.push(UninterpretedOption_NamePart.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.identifierValue = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.positiveIntValue = longToNumber(reader.uint64() as Long);
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.negativeIntValue = longToNumber(reader.int64() as Long);
          continue;
        case 6:
          if (tag !== 49) {
            break;
          }

          message.doubleValue = reader.double();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.stringValue = reader.bytes();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.aggregateValue = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseUninterpretedOption_NamePart(): UninterpretedOption_NamePart {
  return { namePart: "", isExtension: false, _unknownFields: {} };
}

export const UninterpretedOption_NamePart = {
  encode(message: UninterpretedOption_NamePart, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.namePart !== "") {
      writer.uint32(10).string(message.namePart);
    }
    if (message.isExtension === true) {
      writer.uint32(16).bool(message.isExtension);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UninterpretedOption_NamePart {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUninterpretedOption_NamePart();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.namePart = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.isExtension = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseSourceCodeInfo(): SourceCodeInfo {
  return { location: [], _unknownFields: {} };
}

export const SourceCodeInfo = {
  encode(message: SourceCodeInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.location) {
      SourceCodeInfo_Location.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SourceCodeInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSourceCodeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.location.push(SourceCodeInfo_Location.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseSourceCodeInfo_Location(): SourceCodeInfo_Location {
  return {
    path: [],
    span: [],
    leadingComments: "",
    trailingComments: "",
    leadingDetachedComments: [],
    _unknownFields: {},
  };
}

export const SourceCodeInfo_Location = {
  encode(message: SourceCodeInfo_Location, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.path) {
      writer.int32(v);
    }
    writer.ldelim();
    writer.uint32(18).fork();
    for (const v of message.span) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.leadingComments !== "") {
      writer.uint32(26).string(message.leadingComments);
    }
    if (message.trailingComments !== "") {
      writer.uint32(34).string(message.trailingComments);
    }
    for (const v of message.leadingDetachedComments) {
      writer.uint32(50).string(v!);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): SourceCodeInfo_Location {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSourceCodeInfo_Location();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.path.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.path.push(reader.int32());
            }

            continue;
          }

          break;
        case 2:
          if (tag === 16) {
            message.span.push(reader.int32());

            continue;
          }

          if (tag === 18) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.span.push(reader.int32());
            }

            continue;
          }

          break;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.leadingComments = reader.string();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.trailingComments = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.leadingDetachedComments.push(reader.string());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseGeneratedCodeInfo(): GeneratedCodeInfo {
  return { annotation: [], _unknownFields: {} };
}

export const GeneratedCodeInfo = {
  encode(message: GeneratedCodeInfo, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.annotation) {
      GeneratedCodeInfo_Annotation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GeneratedCodeInfo {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGeneratedCodeInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.annotation.push(GeneratedCodeInfo_Annotation.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function createBaseGeneratedCodeInfo_Annotation(): GeneratedCodeInfo_Annotation {
  return { path: [], sourceFile: "", begin: 0, end: 0, _unknownFields: {} };
}

export const GeneratedCodeInfo_Annotation = {
  encode(message: GeneratedCodeInfo_Annotation, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    writer.uint32(10).fork();
    for (const v of message.path) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.sourceFile !== "") {
      writer.uint32(18).string(message.sourceFile);
    }
    if (message.begin !== 0) {
      writer.uint32(24).int32(message.begin);
    }
    if (message.end !== 0) {
      writer.uint32(32).int32(message.end);
    }
    if (message._unknownFields !== undefined) {
      for (const [key, values] of Object.entries(message._unknownFields)) {
        const tag = parseInt(key, 10);
        for (const value of values) {
          writer.uint32(tag);
          (writer as any)["_push"](
            (val: Uint8Array, buf: Buffer, pos: number) => buf.set(val, pos),
            value.length,
            value,
          );
        }
      }
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GeneratedCodeInfo_Annotation {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGeneratedCodeInfo_Annotation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag === 8) {
            message.path.push(reader.int32());

            continue;
          }

          if (tag === 10) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.path.push(reader.int32());
            }

            continue;
          }

          break;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.sourceFile = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.begin = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.end = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      const startPos = reader.pos;
      reader.skipType(tag & 7);
      const buf = reader.buf.slice(startPos, reader.pos);

      const list = message._unknownFields![tag];

      if (list === undefined) {
        message._unknownFields![tag] = [buf];
      } else {
        list.push(buf);
      }
    }
    return message;
  },
};

function longToNumber(long: Long): number {
  if (long.gt(globalThis.Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
