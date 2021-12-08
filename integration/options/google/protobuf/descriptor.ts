/* eslint-disable */
import { FileDescriptorProto as FileDescriptorProto1 } from 'ts-proto-descriptors';
import { util, configure, Writer, Reader } from 'protobufjs/minimal';
import * as Long from 'long';

export const protobufPackage = 'google.protobuf';

/**
 * The protocol compiler can output a FileDescriptorSet containing the .proto
 * files it parses.
 */
export interface FileDescriptorSet {
  file: FileDescriptorProto[];
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
  options: FileOptions | undefined;
  /**
   * This field contains optional information about the original source code.
   * You may safely remove this entire field without harming runtime
   * functionality of the descriptors -- the information is needed only by
   * development tools.
   */
  sourceCodeInfo: SourceCodeInfo | undefined;
  /**
   * The syntax of the proto file.
   * The supported values are "proto2" and "proto3".
   */
  syntax: string;
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
}

export interface DescriptorProto_ExtensionRange {
  /** Inclusive. */
  start: number;
  /** Exclusive. */
  end: number;
  options: ExtensionRangeOptions | undefined;
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
}

export interface ExtensionRangeOptions {
  /** The parser stores options it doesn't recognize here. See above. */
  uninterpretedOption: UninterpretedOption[];
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
  options: FieldOptions | undefined;
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
}

/** Describes an enum type. */
export interface EnumDescriptorProto {
  name: string;
  value: EnumValueDescriptorProto[];
  options: EnumOptions | undefined;
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
}

/** Describes a value within an enum. */
export interface EnumValueDescriptorProto {
  name: string;
  number: number;
  options: EnumValueOptions | undefined;
}

/** Describes a service. */
export interface ServiceDescriptorProto {
  name: string;
  method: MethodDescriptorProto[];
  options: ServiceOptions | undefined;
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
  options: MethodOptions | undefined;
  /** Identifies if client streams multiple client messages */
  clientStreaming: boolean;
  /** Identifies if server streams multiple server messages */
  serverStreaming: boolean;
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
   * Controls the name of the wrapper Java class generated for the .proto file.
   * That class will always contain the .proto file's getDescriptor() method as
   * well as any top-level extensions defined in the .proto file.
   * If java_multiple_files is disabled, then all the other classes from the
   * .proto file will be nested inside the single wrapper outer class.
   */
  javaOuterClassname: string;
  /**
   * If enabled, then the Java code generator will generate a separate .java
   * file for each top-level message, enum, and service defined in the .proto
   * file.  Thus, these types will *not* be nested inside the wrapper class
   * named by java_outer_classname.  However, the wrapper class will still be
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
}

const baseFileDescriptorSet: object = {};

export const FileDescriptorSet = {
  encode(message: FileDescriptorSet, writer: Writer = Writer.create()): Writer {
    for (const v of message.file) {
      FileDescriptorProto.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FileDescriptorSet {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFileDescriptorSet } as FileDescriptorSet;
    message.file = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.file.push(FileDescriptorProto.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseFileDescriptorProto: object = {
  name: '',
  package: '',
  dependency: '',
  publicDependency: 0,
  weakDependency: 0,
  syntax: '',
};

export const FileDescriptorProto = {
  encode(message: FileDescriptorProto, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.package !== '') {
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
    if (message.syntax !== '') {
      writer.uint32(98).string(message.syntax);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FileDescriptorProto {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFileDescriptorProto } as FileDescriptorProto;
    message.dependency = [];
    message.publicDependency = [];
    message.weakDependency = [];
    message.messageType = [];
    message.enumType = [];
    message.service = [];
    message.extension = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.package = reader.string();
          break;
        case 3:
          message.dependency.push(reader.string());
          break;
        case 10:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.publicDependency.push(reader.int32());
            }
          } else {
            message.publicDependency.push(reader.int32());
          }
          break;
        case 11:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.weakDependency.push(reader.int32());
            }
          } else {
            message.weakDependency.push(reader.int32());
          }
          break;
        case 4:
          message.messageType.push(DescriptorProto.decode(reader, reader.uint32()));
          break;
        case 5:
          message.enumType.push(EnumDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 6:
          message.service.push(ServiceDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 7:
          message.extension.push(FieldDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 8:
          message.options = FileOptions.decode(reader, reader.uint32());
          break;
        case 9:
          message.sourceCodeInfo = SourceCodeInfo.decode(reader, reader.uint32());
          break;
        case 12:
          message.syntax = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseDescriptorProto: object = { name: '', reservedName: '' };

export const DescriptorProto = {
  encode(message: DescriptorProto, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DescriptorProto {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDescriptorProto } as DescriptorProto;
    message.field = [];
    message.extension = [];
    message.nestedType = [];
    message.enumType = [];
    message.extensionRange = [];
    message.oneofDecl = [];
    message.reservedRange = [];
    message.reservedName = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.field.push(FieldDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 6:
          message.extension.push(FieldDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 3:
          message.nestedType.push(DescriptorProto.decode(reader, reader.uint32()));
          break;
        case 4:
          message.enumType.push(EnumDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 5:
          message.extensionRange.push(DescriptorProto_ExtensionRange.decode(reader, reader.uint32()));
          break;
        case 8:
          message.oneofDecl.push(OneofDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 7:
          message.options = MessageOptions.decode(reader, reader.uint32());
          break;
        case 9:
          message.reservedRange.push(DescriptorProto_ReservedRange.decode(reader, reader.uint32()));
          break;
        case 10:
          message.reservedName.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseDescriptorProto_ExtensionRange: object = { start: 0, end: 0 };

export const DescriptorProto_ExtensionRange = {
  encode(message: DescriptorProto_ExtensionRange, writer: Writer = Writer.create()): Writer {
    if (message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    if (message.options !== undefined) {
      ExtensionRangeOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DescriptorProto_ExtensionRange {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDescriptorProto_ExtensionRange } as DescriptorProto_ExtensionRange;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.start = reader.int32();
          break;
        case 2:
          message.end = reader.int32();
          break;
        case 3:
          message.options = ExtensionRangeOptions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseDescriptorProto_ReservedRange: object = { start: 0, end: 0 };

export const DescriptorProto_ReservedRange = {
  encode(message: DescriptorProto_ReservedRange, writer: Writer = Writer.create()): Writer {
    if (message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): DescriptorProto_ReservedRange {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseDescriptorProto_ReservedRange } as DescriptorProto_ReservedRange;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.start = reader.int32();
          break;
        case 2:
          message.end = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseExtensionRangeOptions: object = {};

export const ExtensionRangeOptions = {
  encode(message: ExtensionRangeOptions, writer: Writer = Writer.create()): Writer {
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ExtensionRangeOptions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseExtensionRangeOptions } as ExtensionRangeOptions;
    message.uninterpretedOption = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 999:
          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseFieldDescriptorProto: object = {
  name: '',
  number: 0,
  label: 1,
  type: 1,
  typeName: '',
  extendee: '',
  defaultValue: '',
  oneofIndex: 0,
  jsonName: '',
  proto3Optional: false,
};

export const FieldDescriptorProto = {
  encode(message: FieldDescriptorProto, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
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
    if (message.typeName !== '') {
      writer.uint32(50).string(message.typeName);
    }
    if (message.extendee !== '') {
      writer.uint32(18).string(message.extendee);
    }
    if (message.defaultValue !== '') {
      writer.uint32(58).string(message.defaultValue);
    }
    if (message.oneofIndex !== 0) {
      writer.uint32(72).int32(message.oneofIndex);
    }
    if (message.jsonName !== '') {
      writer.uint32(82).string(message.jsonName);
    }
    if (message.options !== undefined) {
      FieldOptions.encode(message.options, writer.uint32(66).fork()).ldelim();
    }
    if (message.proto3Optional === true) {
      writer.uint32(136).bool(message.proto3Optional);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FieldDescriptorProto {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFieldDescriptorProto } as FieldDescriptorProto;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 3:
          message.number = reader.int32();
          break;
        case 4:
          message.label = reader.int32() as any;
          break;
        case 5:
          message.type = reader.int32() as any;
          break;
        case 6:
          message.typeName = reader.string();
          break;
        case 2:
          message.extendee = reader.string();
          break;
        case 7:
          message.defaultValue = reader.string();
          break;
        case 9:
          message.oneofIndex = reader.int32();
          break;
        case 10:
          message.jsonName = reader.string();
          break;
        case 8:
          message.options = FieldOptions.decode(reader, reader.uint32());
          break;
        case 17:
          message.proto3Optional = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseOneofDescriptorProto: object = { name: '' };

export const OneofDescriptorProto = {
  encode(message: OneofDescriptorProto, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.options !== undefined) {
      OneofOptions.encode(message.options, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): OneofDescriptorProto {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOneofDescriptorProto } as OneofDescriptorProto;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.options = OneofOptions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseEnumDescriptorProto: object = { name: '', reservedName: '' };

export const EnumDescriptorProto = {
  encode(message: EnumDescriptorProto, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EnumDescriptorProto {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnumDescriptorProto } as EnumDescriptorProto;
    message.value = [];
    message.reservedRange = [];
    message.reservedName = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.value.push(EnumValueDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 3:
          message.options = EnumOptions.decode(reader, reader.uint32());
          break;
        case 4:
          message.reservedRange.push(EnumDescriptorProto_EnumReservedRange.decode(reader, reader.uint32()));
          break;
        case 5:
          message.reservedName.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseEnumDescriptorProto_EnumReservedRange: object = { start: 0, end: 0 };

export const EnumDescriptorProto_EnumReservedRange = {
  encode(message: EnumDescriptorProto_EnumReservedRange, writer: Writer = Writer.create()): Writer {
    if (message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EnumDescriptorProto_EnumReservedRange {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnumDescriptorProto_EnumReservedRange } as EnumDescriptorProto_EnumReservedRange;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.start = reader.int32();
          break;
        case 2:
          message.end = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseEnumValueDescriptorProto: object = { name: '', number: 0 };

export const EnumValueDescriptorProto = {
  encode(message: EnumValueDescriptorProto, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.number !== 0) {
      writer.uint32(16).int32(message.number);
    }
    if (message.options !== undefined) {
      EnumValueOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EnumValueDescriptorProto {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnumValueDescriptorProto } as EnumValueDescriptorProto;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.number = reader.int32();
          break;
        case 3:
          message.options = EnumValueOptions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseServiceDescriptorProto: object = { name: '' };

export const ServiceDescriptorProto = {
  encode(message: ServiceDescriptorProto, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    for (const v of message.method) {
      MethodDescriptorProto.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.options !== undefined) {
      ServiceOptions.encode(message.options, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceDescriptorProto {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceDescriptorProto } as ServiceDescriptorProto;
    message.method = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.method.push(MethodDescriptorProto.decode(reader, reader.uint32()));
          break;
        case 3:
          message.options = ServiceOptions.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseMethodDescriptorProto: object = {
  name: '',
  inputType: '',
  outputType: '',
  clientStreaming: false,
  serverStreaming: false,
};

export const MethodDescriptorProto = {
  encode(message: MethodDescriptorProto, writer: Writer = Writer.create()): Writer {
    if (message.name !== '') {
      writer.uint32(10).string(message.name);
    }
    if (message.inputType !== '') {
      writer.uint32(18).string(message.inputType);
    }
    if (message.outputType !== '') {
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MethodDescriptorProto {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMethodDescriptorProto } as MethodDescriptorProto;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.inputType = reader.string();
          break;
        case 3:
          message.outputType = reader.string();
          break;
        case 4:
          message.options = MethodOptions.decode(reader, reader.uint32());
          break;
        case 5:
          message.clientStreaming = reader.bool();
          break;
        case 6:
          message.serverStreaming = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseFileOptions: object = {
  javaPackage: '',
  javaOuterClassname: '',
  javaMultipleFiles: false,
  javaGenerateEqualsAndHash: false,
  javaStringCheckUtf8: false,
  optimizeFor: 1,
  goPackage: '',
  ccGenericServices: false,
  javaGenericServices: false,
  pyGenericServices: false,
  phpGenericServices: false,
  deprecated: false,
  ccEnableArenas: false,
  objcClassPrefix: '',
  csharpNamespace: '',
  swiftPrefix: '',
  phpClassPrefix: '',
  phpNamespace: '',
  phpMetadataNamespace: '',
  rubyPackage: '',
};

export const FileOptions = {
  encode(message: FileOptions, writer: Writer = Writer.create()): Writer {
    if (message.javaPackage !== '') {
      writer.uint32(10).string(message.javaPackage);
    }
    if (message.javaOuterClassname !== '') {
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
    if (message.goPackage !== '') {
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
    if (message.objcClassPrefix !== '') {
      writer.uint32(290).string(message.objcClassPrefix);
    }
    if (message.csharpNamespace !== '') {
      writer.uint32(298).string(message.csharpNamespace);
    }
    if (message.swiftPrefix !== '') {
      writer.uint32(314).string(message.swiftPrefix);
    }
    if (message.phpClassPrefix !== '') {
      writer.uint32(322).string(message.phpClassPrefix);
    }
    if (message.phpNamespace !== '') {
      writer.uint32(330).string(message.phpNamespace);
    }
    if (message.phpMetadataNamespace !== '') {
      writer.uint32(354).string(message.phpMetadataNamespace);
    }
    if (message.rubyPackage !== '') {
      writer.uint32(362).string(message.rubyPackage);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FileOptions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFileOptions } as FileOptions;
    message.uninterpretedOption = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.javaPackage = reader.string();
          break;
        case 8:
          message.javaOuterClassname = reader.string();
          break;
        case 10:
          message.javaMultipleFiles = reader.bool();
          break;
        case 20:
          message.javaGenerateEqualsAndHash = reader.bool();
          break;
        case 27:
          message.javaStringCheckUtf8 = reader.bool();
          break;
        case 9:
          message.optimizeFor = reader.int32() as any;
          break;
        case 11:
          message.goPackage = reader.string();
          break;
        case 16:
          message.ccGenericServices = reader.bool();
          break;
        case 17:
          message.javaGenericServices = reader.bool();
          break;
        case 18:
          message.pyGenericServices = reader.bool();
          break;
        case 42:
          message.phpGenericServices = reader.bool();
          break;
        case 23:
          message.deprecated = reader.bool();
          break;
        case 31:
          message.ccEnableArenas = reader.bool();
          break;
        case 36:
          message.objcClassPrefix = reader.string();
          break;
        case 37:
          message.csharpNamespace = reader.string();
          break;
        case 39:
          message.swiftPrefix = reader.string();
          break;
        case 40:
          message.phpClassPrefix = reader.string();
          break;
        case 41:
          message.phpNamespace = reader.string();
          break;
        case 44:
          message.phpMetadataNamespace = reader.string();
          break;
        case 45:
          message.rubyPackage = reader.string();
          break;
        case 999:
          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseMessageOptions: object = {
  messageSetWireFormat: false,
  noStandardDescriptorAccessor: false,
  deprecated: false,
  mapEntry: false,
};

export const MessageOptions = {
  encode(message: MessageOptions, writer: Writer = Writer.create()): Writer {
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MessageOptions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMessageOptions } as MessageOptions;
    message.uninterpretedOption = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.messageSetWireFormat = reader.bool();
          break;
        case 2:
          message.noStandardDescriptorAccessor = reader.bool();
          break;
        case 3:
          message.deprecated = reader.bool();
          break;
        case 7:
          message.mapEntry = reader.bool();
          break;
        case 999:
          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseFieldOptions: object = { ctype: 0, packed: false, jstype: 0, lazy: false, deprecated: false, weak: false };

export const FieldOptions = {
  encode(message: FieldOptions, writer: Writer = Writer.create()): Writer {
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
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): FieldOptions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseFieldOptions } as FieldOptions;
    message.uninterpretedOption = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ctype = reader.int32() as any;
          break;
        case 2:
          message.packed = reader.bool();
          break;
        case 6:
          message.jstype = reader.int32() as any;
          break;
        case 5:
          message.lazy = reader.bool();
          break;
        case 3:
          message.deprecated = reader.bool();
          break;
        case 10:
          message.weak = reader.bool();
          break;
        case 999:
          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseOneofOptions: object = {};

export const OneofOptions = {
  encode(message: OneofOptions, writer: Writer = Writer.create()): Writer {
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): OneofOptions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseOneofOptions } as OneofOptions;
    message.uninterpretedOption = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 999:
          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseEnumOptions: object = { allowAlias: false, deprecated: false };

export const EnumOptions = {
  encode(message: EnumOptions, writer: Writer = Writer.create()): Writer {
    if (message.allowAlias === true) {
      writer.uint32(16).bool(message.allowAlias);
    }
    if (message.deprecated === true) {
      writer.uint32(24).bool(message.deprecated);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EnumOptions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnumOptions } as EnumOptions;
    message.uninterpretedOption = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.allowAlias = reader.bool();
          break;
        case 3:
          message.deprecated = reader.bool();
          break;
        case 999:
          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseEnumValueOptions: object = { deprecated: false };

export const EnumValueOptions = {
  encode(message: EnumValueOptions, writer: Writer = Writer.create()): Writer {
    if (message.deprecated === true) {
      writer.uint32(8).bool(message.deprecated);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): EnumValueOptions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseEnumValueOptions } as EnumValueOptions;
    message.uninterpretedOption = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.deprecated = reader.bool();
          break;
        case 999:
          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseServiceOptions: object = { deprecated: false };

export const ServiceOptions = {
  encode(message: ServiceOptions, writer: Writer = Writer.create()): Writer {
    if (message.deprecated === true) {
      writer.uint32(264).bool(message.deprecated);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ServiceOptions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseServiceOptions } as ServiceOptions;
    message.uninterpretedOption = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 33:
          message.deprecated = reader.bool();
          break;
        case 999:
          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseMethodOptions: object = { deprecated: false, idempotencyLevel: 0 };

export const MethodOptions = {
  encode(message: MethodOptions, writer: Writer = Writer.create()): Writer {
    if (message.deprecated === true) {
      writer.uint32(264).bool(message.deprecated);
    }
    if (message.idempotencyLevel !== 0) {
      writer.uint32(272).int32(message.idempotencyLevel);
    }
    for (const v of message.uninterpretedOption) {
      UninterpretedOption.encode(v!, writer.uint32(7994).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MethodOptions {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseMethodOptions } as MethodOptions;
    message.uninterpretedOption = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 33:
          message.deprecated = reader.bool();
          break;
        case 34:
          message.idempotencyLevel = reader.int32() as any;
          break;
        case 999:
          message.uninterpretedOption.push(UninterpretedOption.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseUninterpretedOption: object = {
  identifierValue: '',
  positiveIntValue: 0,
  negativeIntValue: 0,
  doubleValue: 0,
  aggregateValue: '',
};

export const UninterpretedOption = {
  encode(message: UninterpretedOption, writer: Writer = Writer.create()): Writer {
    for (const v of message.name) {
      UninterpretedOption_NamePart.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (message.identifierValue !== '') {
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
    if (message.aggregateValue !== '') {
      writer.uint32(66).string(message.aggregateValue);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UninterpretedOption {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUninterpretedOption } as UninterpretedOption;
    message.name = [];
    message.stringValue = new Uint8Array();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.name.push(UninterpretedOption_NamePart.decode(reader, reader.uint32()));
          break;
        case 3:
          message.identifierValue = reader.string();
          break;
        case 4:
          message.positiveIntValue = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.negativeIntValue = longToNumber(reader.int64() as Long);
          break;
        case 6:
          message.doubleValue = reader.double();
          break;
        case 7:
          message.stringValue = reader.bytes();
          break;
        case 8:
          message.aggregateValue = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseUninterpretedOption_NamePart: object = { namePart: '', isExtension: false };

export const UninterpretedOption_NamePart = {
  encode(message: UninterpretedOption_NamePart, writer: Writer = Writer.create()): Writer {
    if (message.namePart !== '') {
      writer.uint32(10).string(message.namePart);
    }
    if (message.isExtension === true) {
      writer.uint32(16).bool(message.isExtension);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): UninterpretedOption_NamePart {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseUninterpretedOption_NamePart } as UninterpretedOption_NamePart;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.namePart = reader.string();
          break;
        case 2:
          message.isExtension = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseSourceCodeInfo: object = {};

export const SourceCodeInfo = {
  encode(message: SourceCodeInfo, writer: Writer = Writer.create()): Writer {
    for (const v of message.location) {
      SourceCodeInfo_Location.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SourceCodeInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSourceCodeInfo } as SourceCodeInfo;
    message.location = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.location.push(SourceCodeInfo_Location.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseSourceCodeInfo_Location: object = {
  path: 0,
  span: 0,
  leadingComments: '',
  trailingComments: '',
  leadingDetachedComments: '',
};

export const SourceCodeInfo_Location = {
  encode(message: SourceCodeInfo_Location, writer: Writer = Writer.create()): Writer {
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
    if (message.leadingComments !== '') {
      writer.uint32(26).string(message.leadingComments);
    }
    if (message.trailingComments !== '') {
      writer.uint32(34).string(message.trailingComments);
    }
    for (const v of message.leadingDetachedComments) {
      writer.uint32(50).string(v!);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): SourceCodeInfo_Location {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseSourceCodeInfo_Location } as SourceCodeInfo_Location;
    message.path = [];
    message.span = [];
    message.leadingDetachedComments = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.path.push(reader.int32());
            }
          } else {
            message.path.push(reader.int32());
          }
          break;
        case 2:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.span.push(reader.int32());
            }
          } else {
            message.span.push(reader.int32());
          }
          break;
        case 3:
          message.leadingComments = reader.string();
          break;
        case 4:
          message.trailingComments = reader.string();
          break;
        case 6:
          message.leadingDetachedComments.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseGeneratedCodeInfo: object = {};

export const GeneratedCodeInfo = {
  encode(message: GeneratedCodeInfo, writer: Writer = Writer.create()): Writer {
    for (const v of message.annotation) {
      GeneratedCodeInfo_Annotation.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GeneratedCodeInfo {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGeneratedCodeInfo } as GeneratedCodeInfo;
    message.annotation = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.annotation.push(GeneratedCodeInfo_Annotation.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

const baseGeneratedCodeInfo_Annotation: object = { path: 0, sourceFile: '', begin: 0, end: 0 };

export const GeneratedCodeInfo_Annotation = {
  encode(message: GeneratedCodeInfo_Annotation, writer: Writer = Writer.create()): Writer {
    writer.uint32(10).fork();
    for (const v of message.path) {
      writer.int32(v);
    }
    writer.ldelim();
    if (message.sourceFile !== '') {
      writer.uint32(18).string(message.sourceFile);
    }
    if (message.begin !== 0) {
      writer.uint32(24).int32(message.begin);
    }
    if (message.end !== 0) {
      writer.uint32(32).int32(message.end);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): GeneratedCodeInfo_Annotation {
    const reader = input instanceof Reader ? input : new Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = { ...baseGeneratedCodeInfo_Annotation } as GeneratedCodeInfo_Annotation;
    message.path = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.path.push(reader.int32());
            }
          } else {
            message.path.push(reader.int32());
          }
          break;
        case 2:
          message.sourceFile = reader.string();
          break;
        case 3:
          message.begin = reader.int32();
          break;
        case 4:
          message.end = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
};

type ProtoMetaMessageOptions = {
  options?: { [key: string]: any };
  fields?: { [key: string]: { [key: string]: any } };
  oneof?: { [key: string]: { [key: string]: any } };
  nested?: { [key: string]: ProtoMetaMessageOptions };
};

export interface ProtoMetadata {
  fileDescriptor: FileDescriptorProto1;
  references: { [key: string]: any };
  dependencies?: ProtoMetadata[];
  options?: {
    options?: { [key: string]: any };
    services?: {
      [key: string]: {
        options?: { [key: string]: any };
        methods?: { [key: string]: { [key: string]: any } };
      };
    };
    messages?: {
      [key: string]: ProtoMetaMessageOptions;
    };
    enums?: {
      [key: string]: {
        options?: { [key: string]: any };
        values?: { [key: string]: { [key: string]: any } };
      };
    };
  };
}

export const protoMetadata: ProtoMetadata = {
  fileDescriptor: FileDescriptorProto1.fromPartial({
    dependency: [],
    publicDependency: [],
    weakDependency: [],
    messageType: [
      {
        field: [
          {
            name: 'file',
            number: 1,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.FileDescriptorProto',
            jsonName: 'file',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'FileDescriptorSet',
      },
      {
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          { name: 'package', number: 2, label: 1, type: 9, jsonName: 'package' },
          { name: 'dependency', number: 3, label: 3, type: 9, jsonName: 'dependency' },
          { name: 'public_dependency', number: 10, label: 3, type: 5, jsonName: 'publicDependency' },
          { name: 'weak_dependency', number: 11, label: 3, type: 5, jsonName: 'weakDependency' },
          {
            name: 'message_type',
            number: 4,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.DescriptorProto',
            jsonName: 'messageType',
          },
          {
            name: 'enum_type',
            number: 5,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.EnumDescriptorProto',
            jsonName: 'enumType',
          },
          {
            name: 'service',
            number: 6,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.ServiceDescriptorProto',
            jsonName: 'service',
          },
          {
            name: 'extension',
            number: 7,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.FieldDescriptorProto',
            jsonName: 'extension',
          },
          {
            name: 'options',
            number: 8,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.FileOptions',
            jsonName: 'options',
          },
          {
            name: 'source_code_info',
            number: 9,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.SourceCodeInfo',
            jsonName: 'sourceCodeInfo',
          },
          { name: 'syntax', number: 12, label: 1, type: 9, jsonName: 'syntax' },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'FileDescriptorProto',
      },
      {
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          {
            name: 'field',
            number: 2,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.FieldDescriptorProto',
            jsonName: 'field',
          },
          {
            name: 'extension',
            number: 6,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.FieldDescriptorProto',
            jsonName: 'extension',
          },
          {
            name: 'nested_type',
            number: 3,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.DescriptorProto',
            jsonName: 'nestedType',
          },
          {
            name: 'enum_type',
            number: 4,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.EnumDescriptorProto',
            jsonName: 'enumType',
          },
          {
            name: 'extension_range',
            number: 5,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.DescriptorProto.ExtensionRange',
            jsonName: 'extensionRange',
          },
          {
            name: 'oneof_decl',
            number: 8,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.OneofDescriptorProto',
            jsonName: 'oneofDecl',
          },
          {
            name: 'options',
            number: 7,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.MessageOptions',
            jsonName: 'options',
          },
          {
            name: 'reserved_range',
            number: 9,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.DescriptorProto.ReservedRange',
            jsonName: 'reservedRange',
          },
          { name: 'reserved_name', number: 10, label: 3, type: 9, jsonName: 'reservedName' },
        ],
        extension: [],
        nestedType: [
          {
            field: [
              { name: 'start', number: 1, label: 1, type: 5, jsonName: 'start' },
              { name: 'end', number: 2, label: 1, type: 5, jsonName: 'end' },
              {
                name: 'options',
                number: 3,
                label: 1,
                type: 11,
                typeName: '.google.protobuf.ExtensionRangeOptions',
                jsonName: 'options',
              },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            reservedRange: [],
            reservedName: [],
            name: 'ExtensionRange',
          },
          {
            field: [
              { name: 'start', number: 1, label: 1, type: 5, jsonName: 'start' },
              { name: 'end', number: 2, label: 1, type: 5, jsonName: 'end' },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            reservedRange: [],
            reservedName: [],
            name: 'ReservedRange',
          },
        ],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'DescriptorProto',
      },
      {
        field: [
          {
            name: 'uninterpreted_option',
            number: 999,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption',
            jsonName: 'uninterpretedOption',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [{ start: 1000, end: 536870912 }],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'ExtensionRangeOptions',
      },
      {
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          { name: 'number', number: 3, label: 1, type: 5, jsonName: 'number' },
          {
            name: 'label',
            number: 4,
            label: 1,
            type: 14,
            typeName: '.google.protobuf.FieldDescriptorProto.Label',
            jsonName: 'label',
          },
          {
            name: 'type',
            number: 5,
            label: 1,
            type: 14,
            typeName: '.google.protobuf.FieldDescriptorProto.Type',
            jsonName: 'type',
          },
          { name: 'type_name', number: 6, label: 1, type: 9, jsonName: 'typeName' },
          { name: 'extendee', number: 2, label: 1, type: 9, jsonName: 'extendee' },
          { name: 'default_value', number: 7, label: 1, type: 9, jsonName: 'defaultValue' },
          { name: 'oneof_index', number: 9, label: 1, type: 5, jsonName: 'oneofIndex' },
          { name: 'json_name', number: 10, label: 1, type: 9, jsonName: 'jsonName' },
          {
            name: 'options',
            number: 8,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.FieldOptions',
            jsonName: 'options',
          },
          { name: 'proto3_optional', number: 17, label: 1, type: 8, jsonName: 'proto3Optional' },
        ],
        extension: [],
        nestedType: [],
        enumType: [
          {
            value: [
              { name: 'TYPE_DOUBLE', number: 1 },
              { name: 'TYPE_FLOAT', number: 2 },
              { name: 'TYPE_INT64', number: 3 },
              { name: 'TYPE_UINT64', number: 4 },
              { name: 'TYPE_INT32', number: 5 },
              { name: 'TYPE_FIXED64', number: 6 },
              { name: 'TYPE_FIXED32', number: 7 },
              { name: 'TYPE_BOOL', number: 8 },
              { name: 'TYPE_STRING', number: 9 },
              { name: 'TYPE_GROUP', number: 10 },
              { name: 'TYPE_MESSAGE', number: 11 },
              { name: 'TYPE_BYTES', number: 12 },
              { name: 'TYPE_UINT32', number: 13 },
              { name: 'TYPE_ENUM', number: 14 },
              { name: 'TYPE_SFIXED32', number: 15 },
              { name: 'TYPE_SFIXED64', number: 16 },
              { name: 'TYPE_SINT32', number: 17 },
              { name: 'TYPE_SINT64', number: 18 },
            ],
            reservedRange: [],
            reservedName: [],
            name: 'Type',
          },
          {
            value: [
              { name: 'LABEL_OPTIONAL', number: 1 },
              { name: 'LABEL_REQUIRED', number: 2 },
              { name: 'LABEL_REPEATED', number: 3 },
            ],
            reservedRange: [],
            reservedName: [],
            name: 'Label',
          },
        ],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'FieldDescriptorProto',
      },
      {
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          {
            name: 'options',
            number: 2,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.OneofOptions',
            jsonName: 'options',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'OneofDescriptorProto',
      },
      {
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          {
            name: 'value',
            number: 2,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.EnumValueDescriptorProto',
            jsonName: 'value',
          },
          {
            name: 'options',
            number: 3,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.EnumOptions',
            jsonName: 'options',
          },
          {
            name: 'reserved_range',
            number: 4,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.EnumDescriptorProto.EnumReservedRange',
            jsonName: 'reservedRange',
          },
          { name: 'reserved_name', number: 5, label: 3, type: 9, jsonName: 'reservedName' },
        ],
        extension: [],
        nestedType: [
          {
            field: [
              { name: 'start', number: 1, label: 1, type: 5, jsonName: 'start' },
              { name: 'end', number: 2, label: 1, type: 5, jsonName: 'end' },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            reservedRange: [],
            reservedName: [],
            name: 'EnumReservedRange',
          },
        ],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'EnumDescriptorProto',
      },
      {
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          { name: 'number', number: 2, label: 1, type: 5, jsonName: 'number' },
          {
            name: 'options',
            number: 3,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.EnumValueOptions',
            jsonName: 'options',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'EnumValueDescriptorProto',
      },
      {
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          {
            name: 'method',
            number: 2,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.MethodDescriptorProto',
            jsonName: 'method',
          },
          {
            name: 'options',
            number: 3,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.ServiceOptions',
            jsonName: 'options',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'ServiceDescriptorProto',
      },
      {
        field: [
          { name: 'name', number: 1, label: 1, type: 9, jsonName: 'name' },
          { name: 'input_type', number: 2, label: 1, type: 9, jsonName: 'inputType' },
          { name: 'output_type', number: 3, label: 1, type: 9, jsonName: 'outputType' },
          {
            name: 'options',
            number: 4,
            label: 1,
            type: 11,
            typeName: '.google.protobuf.MethodOptions',
            jsonName: 'options',
          },
          {
            name: 'client_streaming',
            number: 5,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'clientStreaming',
          },
          {
            name: 'server_streaming',
            number: 6,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'serverStreaming',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'MethodDescriptorProto',
      },
      {
        field: [
          { name: 'java_package', number: 1, label: 1, type: 9, jsonName: 'javaPackage' },
          { name: 'java_outer_classname', number: 8, label: 1, type: 9, jsonName: 'javaOuterClassname' },
          {
            name: 'java_multiple_files',
            number: 10,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'javaMultipleFiles',
          },
          {
            name: 'java_generate_equals_and_hash',
            number: 20,
            label: 1,
            type: 8,
            options: { uninterpretedOption: [], deprecated: true },
            jsonName: 'javaGenerateEqualsAndHash',
          },
          {
            name: 'java_string_check_utf8',
            number: 27,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'javaStringCheckUtf8',
          },
          {
            name: 'optimize_for',
            number: 9,
            label: 1,
            type: 14,
            typeName: '.google.protobuf.FileOptions.OptimizeMode',
            defaultValue: 'SPEED',
            jsonName: 'optimizeFor',
          },
          { name: 'go_package', number: 11, label: 1, type: 9, jsonName: 'goPackage' },
          {
            name: 'cc_generic_services',
            number: 16,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'ccGenericServices',
          },
          {
            name: 'java_generic_services',
            number: 17,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'javaGenericServices',
          },
          {
            name: 'py_generic_services',
            number: 18,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'pyGenericServices',
          },
          {
            name: 'php_generic_services',
            number: 42,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'phpGenericServices',
          },
          { name: 'deprecated', number: 23, label: 1, type: 8, defaultValue: 'false', jsonName: 'deprecated' },
          { name: 'cc_enable_arenas', number: 31, label: 1, type: 8, defaultValue: 'true', jsonName: 'ccEnableArenas' },
          { name: 'objc_class_prefix', number: 36, label: 1, type: 9, jsonName: 'objcClassPrefix' },
          { name: 'csharp_namespace', number: 37, label: 1, type: 9, jsonName: 'csharpNamespace' },
          { name: 'swift_prefix', number: 39, label: 1, type: 9, jsonName: 'swiftPrefix' },
          { name: 'php_class_prefix', number: 40, label: 1, type: 9, jsonName: 'phpClassPrefix' },
          { name: 'php_namespace', number: 41, label: 1, type: 9, jsonName: 'phpNamespace' },
          { name: 'php_metadata_namespace', number: 44, label: 1, type: 9, jsonName: 'phpMetadataNamespace' },
          { name: 'ruby_package', number: 45, label: 1, type: 9, jsonName: 'rubyPackage' },
          {
            name: 'uninterpreted_option',
            number: 999,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption',
            jsonName: 'uninterpretedOption',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [
          {
            value: [
              { name: 'SPEED', number: 1 },
              { name: 'CODE_SIZE', number: 2 },
              { name: 'LITE_RUNTIME', number: 3 },
            ],
            reservedRange: [],
            reservedName: [],
            name: 'OptimizeMode',
          },
        ],
        extensionRange: [{ start: 1000, end: 536870912 }],
        oneofDecl: [],
        reservedRange: [{ start: 38, end: 39 }],
        reservedName: [],
        name: 'FileOptions',
      },
      {
        field: [
          {
            name: 'message_set_wire_format',
            number: 1,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'messageSetWireFormat',
          },
          {
            name: 'no_standard_descriptor_accessor',
            number: 2,
            label: 1,
            type: 8,
            defaultValue: 'false',
            jsonName: 'noStandardDescriptorAccessor',
          },
          { name: 'deprecated', number: 3, label: 1, type: 8, defaultValue: 'false', jsonName: 'deprecated' },
          { name: 'map_entry', number: 7, label: 1, type: 8, jsonName: 'mapEntry' },
          {
            name: 'uninterpreted_option',
            number: 999,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption',
            jsonName: 'uninterpretedOption',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [{ start: 1000, end: 536870912 }],
        oneofDecl: [],
        reservedRange: [
          { start: 4, end: 5 },
          { start: 5, end: 6 },
          { start: 6, end: 7 },
          { start: 8, end: 9 },
          { start: 9, end: 10 },
        ],
        reservedName: [],
        name: 'MessageOptions',
      },
      {
        field: [
          {
            name: 'ctype',
            number: 1,
            label: 1,
            type: 14,
            typeName: '.google.protobuf.FieldOptions.CType',
            defaultValue: 'STRING',
            jsonName: 'ctype',
          },
          { name: 'packed', number: 2, label: 1, type: 8, jsonName: 'packed' },
          {
            name: 'jstype',
            number: 6,
            label: 1,
            type: 14,
            typeName: '.google.protobuf.FieldOptions.JSType',
            defaultValue: 'JS_NORMAL',
            jsonName: 'jstype',
          },
          { name: 'lazy', number: 5, label: 1, type: 8, defaultValue: 'false', jsonName: 'lazy' },
          { name: 'deprecated', number: 3, label: 1, type: 8, defaultValue: 'false', jsonName: 'deprecated' },
          { name: 'weak', number: 10, label: 1, type: 8, defaultValue: 'false', jsonName: 'weak' },
          {
            name: 'uninterpreted_option',
            number: 999,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption',
            jsonName: 'uninterpretedOption',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [
          {
            value: [
              { name: 'STRING', number: 0 },
              { name: 'CORD', number: 1 },
              { name: 'STRING_PIECE', number: 2 },
            ],
            reservedRange: [],
            reservedName: [],
            name: 'CType',
          },
          {
            value: [
              { name: 'JS_NORMAL', number: 0 },
              { name: 'JS_STRING', number: 1 },
              { name: 'JS_NUMBER', number: 2 },
            ],
            reservedRange: [],
            reservedName: [],
            name: 'JSType',
          },
        ],
        extensionRange: [{ start: 1000, end: 536870912 }],
        oneofDecl: [],
        reservedRange: [{ start: 4, end: 5 }],
        reservedName: [],
        name: 'FieldOptions',
      },
      {
        field: [
          {
            name: 'uninterpreted_option',
            number: 999,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption',
            jsonName: 'uninterpretedOption',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [{ start: 1000, end: 536870912 }],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'OneofOptions',
      },
      {
        field: [
          { name: 'allow_alias', number: 2, label: 1, type: 8, jsonName: 'allowAlias' },
          { name: 'deprecated', number: 3, label: 1, type: 8, defaultValue: 'false', jsonName: 'deprecated' },
          {
            name: 'uninterpreted_option',
            number: 999,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption',
            jsonName: 'uninterpretedOption',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [{ start: 1000, end: 536870912 }],
        oneofDecl: [],
        reservedRange: [{ start: 5, end: 6 }],
        reservedName: [],
        name: 'EnumOptions',
      },
      {
        field: [
          { name: 'deprecated', number: 1, label: 1, type: 8, defaultValue: 'false', jsonName: 'deprecated' },
          {
            name: 'uninterpreted_option',
            number: 999,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption',
            jsonName: 'uninterpretedOption',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [{ start: 1000, end: 536870912 }],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'EnumValueOptions',
      },
      {
        field: [
          { name: 'deprecated', number: 33, label: 1, type: 8, defaultValue: 'false', jsonName: 'deprecated' },
          {
            name: 'uninterpreted_option',
            number: 999,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption',
            jsonName: 'uninterpretedOption',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [],
        extensionRange: [{ start: 1000, end: 536870912 }],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'ServiceOptions',
      },
      {
        field: [
          { name: 'deprecated', number: 33, label: 1, type: 8, defaultValue: 'false', jsonName: 'deprecated' },
          {
            name: 'idempotency_level',
            number: 34,
            label: 1,
            type: 14,
            typeName: '.google.protobuf.MethodOptions.IdempotencyLevel',
            defaultValue: 'IDEMPOTENCY_UNKNOWN',
            jsonName: 'idempotencyLevel',
          },
          {
            name: 'uninterpreted_option',
            number: 999,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption',
            jsonName: 'uninterpretedOption',
          },
        ],
        extension: [],
        nestedType: [],
        enumType: [
          {
            value: [
              { name: 'IDEMPOTENCY_UNKNOWN', number: 0 },
              { name: 'NO_SIDE_EFFECTS', number: 1 },
              { name: 'IDEMPOTENT', number: 2 },
            ],
            reservedRange: [],
            reservedName: [],
            name: 'IdempotencyLevel',
          },
        ],
        extensionRange: [{ start: 1000, end: 536870912 }],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'MethodOptions',
      },
      {
        field: [
          {
            name: 'name',
            number: 2,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.UninterpretedOption.NamePart',
            jsonName: 'name',
          },
          { name: 'identifier_value', number: 3, label: 1, type: 9, jsonName: 'identifierValue' },
          { name: 'positive_int_value', number: 4, label: 1, type: 4, jsonName: 'positiveIntValue' },
          { name: 'negative_int_value', number: 5, label: 1, type: 3, jsonName: 'negativeIntValue' },
          { name: 'double_value', number: 6, label: 1, type: 1, jsonName: 'doubleValue' },
          { name: 'string_value', number: 7, label: 1, type: 12, jsonName: 'stringValue' },
          { name: 'aggregate_value', number: 8, label: 1, type: 9, jsonName: 'aggregateValue' },
        ],
        extension: [],
        nestedType: [
          {
            field: [
              { name: 'name_part', number: 1, label: 2, type: 9, jsonName: 'namePart' },
              { name: 'is_extension', number: 2, label: 2, type: 8, jsonName: 'isExtension' },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            reservedRange: [],
            reservedName: [],
            name: 'NamePart',
          },
        ],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'UninterpretedOption',
      },
      {
        field: [
          {
            name: 'location',
            number: 1,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.SourceCodeInfo.Location',
            jsonName: 'location',
          },
        ],
        extension: [],
        nestedType: [
          {
            field: [
              {
                name: 'path',
                number: 1,
                label: 3,
                type: 5,
                options: { uninterpretedOption: [], packed: true },
                jsonName: 'path',
              },
              {
                name: 'span',
                number: 2,
                label: 3,
                type: 5,
                options: { uninterpretedOption: [], packed: true },
                jsonName: 'span',
              },
              { name: 'leading_comments', number: 3, label: 1, type: 9, jsonName: 'leadingComments' },
              { name: 'trailing_comments', number: 4, label: 1, type: 9, jsonName: 'trailingComments' },
              { name: 'leading_detached_comments', number: 6, label: 3, type: 9, jsonName: 'leadingDetachedComments' },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            reservedRange: [],
            reservedName: [],
            name: 'Location',
          },
        ],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'SourceCodeInfo',
      },
      {
        field: [
          {
            name: 'annotation',
            number: 1,
            label: 3,
            type: 11,
            typeName: '.google.protobuf.GeneratedCodeInfo.Annotation',
            jsonName: 'annotation',
          },
        ],
        extension: [],
        nestedType: [
          {
            field: [
              {
                name: 'path',
                number: 1,
                label: 3,
                type: 5,
                options: { uninterpretedOption: [], packed: true },
                jsonName: 'path',
              },
              { name: 'source_file', number: 2, label: 1, type: 9, jsonName: 'sourceFile' },
              { name: 'begin', number: 3, label: 1, type: 5, jsonName: 'begin' },
              { name: 'end', number: 4, label: 1, type: 5, jsonName: 'end' },
            ],
            extension: [],
            nestedType: [],
            enumType: [],
            extensionRange: [],
            oneofDecl: [],
            reservedRange: [],
            reservedName: [],
            name: 'Annotation',
          },
        ],
        enumType: [],
        extensionRange: [],
        oneofDecl: [],
        reservedRange: [],
        reservedName: [],
        name: 'GeneratedCodeInfo',
      },
    ],
    enumType: [],
    service: [],
    extension: [],
    name: 'google/protobuf/descriptor.proto',
    package: 'google.protobuf',
    options: {
      uninterpretedOption: [],
      javaPackage: 'com.google.protobuf',
      javaOuterClassname: 'DescriptorProtos',
      optimizeFor: 1,
      goPackage: 'google.golang.org/protobuf/types/descriptorpb',
      ccEnableArenas: true,
      objcClassPrefix: 'GPB',
      csharpNamespace: 'Google.Protobuf.Reflection',
    },
    sourceCodeInfo: {
      location: [
        {
          path: [8, 9],
          span: [52, 0, 28],
          leadingDetachedComments: [],
          leadingComments:
            " descriptor.proto must be optimized for speed because reflection-based\n algorithms don't work during bootstrapping.\n",
        },
        {
          path: [4, 0],
          span: [56, 0, 58, 1],
          leadingDetachedComments: [],
          leadingComments:
            ' The protocol compiler can output a FileDescriptorSet containing the .proto\n files it parses.\n',
        },
        {
          path: [4, 1],
          span: [61, 0, 90, 1],
          leadingDetachedComments: [],
          leadingComments: ' Describes a complete .proto file.\n',
        },
        {
          path: [4, 1, 2, 0],
          span: [62, 2, 27],
          leadingDetachedComments: [],
          trailingComments: ' file name, relative to root of source tree\n',
        },
        {
          path: [4, 1, 2, 1],
          span: [63, 2, 30],
          leadingDetachedComments: [],
          trailingComments: ' e.g. "foo", "foo.bar", etc.\n',
        },
        {
          path: [4, 1, 2, 2],
          span: [66, 2, 33],
          leadingDetachedComments: [],
          leadingComments: ' Names of files imported by this file.\n',
        },
        {
          path: [4, 1, 2, 3],
          span: [68, 2, 40],
          leadingDetachedComments: [],
          leadingComments: ' Indexes of the public imported files in the dependency list above.\n',
        },
        {
          path: [4, 1, 2, 4],
          span: [71, 2, 38],
          leadingDetachedComments: [],
          leadingComments:
            ' Indexes of the weak imported files in the dependency list.\n For Google-internal migration only. Do not use.\n',
        },
        {
          path: [4, 1, 2, 5],
          span: [74, 2, 44],
          leadingDetachedComments: [],
          leadingComments: ' All top-level definitions in this file.\n',
        },
        {
          path: [4, 1, 2, 10],
          span: [85, 2, 47],
          leadingDetachedComments: [],
          leadingComments:
            ' This field contains optional information about the original source code.\n You may safely remove this entire field without harming runtime\n functionality of the descriptors -- the information is needed only by\n development tools.\n',
        },
        {
          path: [4, 1, 2, 11],
          span: [89, 2, 30],
          leadingDetachedComments: [],
          leadingComments: ' The syntax of the proto file.\n The supported values are "proto2" and "proto3".\n',
        },
        {
          path: [4, 2],
          span: [93, 0, 125, 1],
          leadingDetachedComments: [],
          leadingComments: ' Describes a message type.\n',
        },
        {
          path: [4, 2, 3, 0, 2, 0],
          span: [103, 4, 29],
          leadingDetachedComments: [],
          trailingComments: ' Inclusive.\n',
        },
        {
          path: [4, 2, 3, 0, 2, 1],
          span: [104, 4, 27],
          leadingDetachedComments: [],
          trailingComments: ' Exclusive.\n',
        },
        {
          path: [4, 2, 3, 1],
          span: [117, 2, 120, 3],
          leadingDetachedComments: [],
          leadingComments:
            ' Range of reserved tag numbers. Reserved tag numbers may not be used by\n fields or extension ranges in the same message. Reserved ranges may\n not overlap.\n',
        },
        {
          path: [4, 2, 3, 1, 2, 0],
          span: [118, 4, 29],
          leadingDetachedComments: [],
          trailingComments: ' Inclusive.\n',
        },
        {
          path: [4, 2, 3, 1, 2, 1],
          span: [119, 4, 27],
          leadingDetachedComments: [],
          trailingComments: ' Exclusive.\n',
        },
        {
          path: [4, 2, 2, 9],
          span: [124, 2, 37],
          leadingDetachedComments: [],
          leadingComments:
            ' Reserved field names, which may not be used by fields in the same message.\n A given name may only be reserved once.\n',
        },
        {
          path: [4, 3, 2, 0],
          span: [129, 2, 58],
          leadingDetachedComments: [],
          leadingComments: " The parser stores options it doesn't recognize here. See above.\n",
        },
        {
          path: [4, 3, 5],
          span: [133, 2, 25],
          leadingDetachedComments: [],
          leadingComments: ' Clients can define custom options in extensions of this message. See above.\n',
        },
        {
          path: [4, 4],
          span: [137, 0, 238, 1],
          leadingDetachedComments: [],
          leadingComments: ' Describes a field within a message.\n',
        },
        {
          path: [4, 4, 4, 0, 2, 0],
          span: [141, 4, 20],
          leadingDetachedComments: [],
          leadingComments: ' 0 is reserved for errors.\n Order is weird for historical reasons.\n',
        },
        {
          path: [4, 4, 4, 0, 2, 2],
          span: [145, 4, 19],
          leadingDetachedComments: [],
          leadingComments:
            ' Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT64 if\n negative values are likely.\n',
        },
        {
          path: [4, 4, 4, 0, 2, 4],
          span: [149, 4, 19],
          leadingDetachedComments: [],
          leadingComments:
            ' Not ZigZag encoded.  Negative numbers take 10 bytes.  Use TYPE_SINT32 if\n negative values are likely.\n',
        },
        {
          path: [4, 4, 4, 0, 2, 9],
          span: [158, 4, 20],
          leadingDetachedComments: [],
          leadingComments:
            ' Tag-delimited aggregate.\n Group type is deprecated and not supported in proto3. However, Proto3\n implementations should still be able to parse the group wire format and\n treat group fields as unknown fields.\n',
        },
        {
          path: [4, 4, 4, 0, 2, 10],
          span: [159, 4, 22],
          leadingDetachedComments: [],
          trailingComments: ' Length-delimited aggregate.\n',
        },
        {
          path: [4, 4, 4, 0, 2, 11],
          span: [162, 4, 20],
          leadingDetachedComments: [],
          leadingComments: ' New in version 2.\n',
        },
        {
          path: [4, 4, 4, 0, 2, 16],
          span: [167, 4, 21],
          leadingDetachedComments: [],
          trailingComments: ' Uses ZigZag encoding.\n',
        },
        {
          path: [4, 4, 4, 0, 2, 17],
          span: [168, 4, 21],
          leadingDetachedComments: [],
          trailingComments: ' Uses ZigZag encoding.\n',
        },
        {
          path: [4, 4, 4, 1, 2, 0],
          span: [173, 4, 23],
          leadingDetachedComments: [],
          leadingComments: ' 0 is reserved for errors\n',
        },
        {
          path: [4, 4, 2, 3],
          span: [184, 2, 25],
          leadingDetachedComments: [],
          leadingComments:
            ' If type_name is set, this need not be set.  If both this and type_name\n are set, this must be one of TYPE_ENUM, TYPE_MESSAGE or TYPE_GROUP.\n',
        },
        {
          path: [4, 4, 2, 4],
          span: [191, 2, 32],
          leadingDetachedComments: [],
          leadingComments:
            " For message and enum types, this is the name of the type.  If the name\n starts with a '.', it is fully-qualified.  Otherwise, C++-like scoping\n rules are used to find the type (i.e. first the nested types within this\n message are searched, then within the parent, on up to the root\n namespace).\n",
        },
        {
          path: [4, 4, 2, 5],
          span: [195, 2, 31],
          leadingDetachedComments: [],
          leadingComments:
            ' For extensions, this is the name of the type being extended.  It is\n resolved in the same manner as type_name.\n',
        },
        {
          path: [4, 4, 2, 6],
          span: [202, 2, 36],
          leadingDetachedComments: [],
          leadingComments:
            ' For numeric types, contains the original text representation of the value.\n For booleans, "true" or "false".\n For strings, contains the default text contents (not escaped in any way).\n For bytes, contains the C escaped value.  All bytes >= 128 are escaped.\n TODO(kenton):  Base-64 encode?\n',
        },
        {
          path: [4, 4, 2, 7],
          span: [206, 2, 33],
          leadingDetachedComments: [],
          leadingComments:
            " If set, gives the index of a oneof in the containing type's oneof_decl\n list.  This field is a member of that oneof.\n",
        },
        {
          path: [4, 4, 2, 8],
          span: [212, 2, 33],
          leadingDetachedComments: [],
          leadingComments:
            " JSON name of this field. The value is set by protocol compiler. If the\n user has set a \"json_name\" option on this field, that option's value\n will be used. Otherwise, it's deduced from the field's name by converting\n it to camelCase.\n",
        },
        {
          path: [4, 4, 2, 10],
          span: [237, 2, 37],
          leadingDetachedComments: [],
          leadingComments:
            ' If true, this is a proto3 "optional". When a proto3 field is optional, it\n tracks presence regardless of field type.\n\n When proto3_optional is true, this field must be belong to a oneof to\n signal to old proto3 clients that presence is tracked for this field. This\n oneof is known as a "synthetic" oneof, and this field must be its sole\n member (each proto3 optional field gets its own synthetic oneof). Synthetic\n oneofs exist in the descriptor only, and do not generate any API. Synthetic\n oneofs must be ordered after all "real" oneofs.\n\n For message fields, proto3_optional doesn\'t create any semantic change,\n since non-repeated message fields always track presence. However it still\n indicates the semantic detail of whether the user wrote "optional" or not.\n This can be useful for round-tripping the .proto file. For consistency we\n give message fields a synthetic oneof also, even though it is not required\n to track presence. This is especially important because the parser can\'t\n tell if a field is a message or an enum, so it must always create a\n synthetic oneof.\n\n Proto2 optional fields do not set this flag, because they already indicate\n optional with `LABEL_OPTIONAL`.\n',
        },
        { path: [4, 5], span: [241, 0, 244, 1], leadingDetachedComments: [], leadingComments: ' Describes a oneof.\n' },
        {
          path: [4, 6],
          span: [247, 0, 273, 1],
          leadingDetachedComments: [],
          leadingComments: ' Describes an enum type.\n',
        },
        {
          path: [4, 6, 3, 0],
          span: [260, 2, 263, 3],
          leadingDetachedComments: [],
          leadingComments:
            ' Range of reserved numeric values. Reserved values may not be used by\n entries in the same enum. Reserved ranges may not overlap.\n\n Note that this is distinct from DescriptorProto.ReservedRange in that it\n is inclusive such that it can appropriately represent the entire int32\n domain.\n',
        },
        {
          path: [4, 6, 3, 0, 2, 0],
          span: [261, 4, 29],
          leadingDetachedComments: [],
          trailingComments: ' Inclusive.\n',
        },
        {
          path: [4, 6, 3, 0, 2, 1],
          span: [262, 4, 27],
          leadingDetachedComments: [],
          trailingComments: ' Inclusive.\n',
        },
        {
          path: [4, 6, 2, 3],
          span: [268, 2, 48],
          leadingDetachedComments: [],
          leadingComments:
            ' Range of reserved numeric values. Reserved numeric values may not be used\n by enum values in the same enum declaration. Reserved ranges may not\n overlap.\n',
        },
        {
          path: [4, 6, 2, 4],
          span: [272, 2, 36],
          leadingDetachedComments: [],
          leadingComments:
            ' Reserved enum value names, which may not be reused. A given name may only\n be reserved once.\n',
        },
        {
          path: [4, 7],
          span: [276, 0, 281, 1],
          leadingDetachedComments: [],
          leadingComments: ' Describes a value within an enum.\n',
        },
        {
          path: [4, 8],
          span: [284, 0, 289, 1],
          leadingDetachedComments: [],
          leadingComments: ' Describes a service.\n',
        },
        {
          path: [4, 9],
          span: [292, 0, 306, 1],
          leadingDetachedComments: [],
          leadingComments: ' Describes a method of a service.\n',
        },
        {
          path: [4, 9, 2, 1],
          span: [297, 2, 33],
          leadingDetachedComments: [],
          leadingComments:
            ' Input and output type names.  These are resolved in the same way as\n FieldDescriptorProto.type_name, but must refer to a message type.\n',
        },
        {
          path: [4, 9, 2, 4],
          span: [303, 2, 55],
          leadingDetachedComments: [],
          leadingComments: ' Identifies if client streams multiple client messages\n',
        },
        {
          path: [4, 9, 2, 5],
          span: [305, 2, 55],
          leadingDetachedComments: [],
          leadingComments: ' Identifies if server streams multiple server messages\n',
        },
        {
          path: [4, 10, 2, 0],
          span: [347, 2, 35],
          leadingDetachedComments: [],
          leadingComments:
            ' Sets the Java package where classes generated from this .proto will be\n placed.  By default, the proto package is used, but this is often\n inappropriate because proto packages do not normally start with backwards\n domain names.\n',
        },
        {
          path: [4, 10, 2, 1],
          span: [355, 2, 43],
          leadingDetachedComments: [],
          leadingComments:
            " Controls the name of the wrapper Java class generated for the .proto file.\n That class will always contain the .proto file's getDescriptor() method as\n well as any top-level extensions defined in the .proto file.\n If java_multiple_files is disabled, then all the other classes from the\n .proto file will be nested inside the single wrapper outer class.\n",
        },
        {
          path: [4, 10, 2, 2],
          span: [363, 2, 59],
          leadingDetachedComments: [],
          leadingComments:
            " If enabled, then the Java code generator will generate a separate .java\n file for each top-level message, enum, and service defined in the .proto\n file.  Thus, these types will *not* be nested inside the wrapper class\n named by java_outer_classname.  However, the wrapper class will still be\n generated to contain the file's getDescriptor() method as well as any\n top-level extensions defined in the file.\n",
        },
        {
          path: [4, 10, 2, 3],
          span: [366, 2, 69],
          leadingDetachedComments: [],
          leadingComments: ' This option does nothing.\n',
        },
        {
          path: [4, 10, 2, 4],
          span: [374, 2, 62],
          leadingDetachedComments: [],
          leadingComments:
            ' If set true, then the Java2 code generator will generate code that\n throws an exception whenever an attempt is made to assign a non-UTF-8\n byte sequence to a string field.\n Message reflection will do the same.\n However, an extension field still accepts non-UTF-8 byte sequences.\n This option has no effect on when used with the lite runtime.\n',
        },
        {
          path: [4, 10, 4, 0],
          span: [378, 2, 383, 3],
          leadingDetachedComments: [],
          leadingComments: ' Generated classes can be optimized for speed or code size.\n',
        },
        {
          path: [4, 10, 4, 0, 2, 0],
          span: [379, 4, 14],
          leadingDetachedComments: [],
          trailingComments: ' Generate complete code for parsing, serialization,\n',
        },
        {
          path: [4, 10, 4, 0, 2, 1],
          span: [381, 4, 18],
          leadingDetachedComments: [],
          leadingComments: ' etc.\n',
          trailingComments: ' Use ReflectionOps to implement these methods.\n',
        },
        {
          path: [4, 10, 4, 0, 2, 2],
          span: [382, 4, 21],
          leadingDetachedComments: [],
          trailingComments: ' Generate code using MessageLite and the lite runtime.\n',
        },
        {
          path: [4, 10, 2, 6],
          span: [391, 2, 34],
          leadingDetachedComments: [],
          leadingComments:
            ' Sets the Go package where structs generated from this .proto will be\n placed. If omitted, the Go package will be derived from the following:\n   - The basename of the package import path, if provided.\n   - Otherwise, the package statement in the .proto file, if present.\n   - Otherwise, the basename of the .proto file, without extension.\n',
        },
        {
          path: [4, 10, 2, 7],
          span: [406, 2, 59],
          leadingDetachedComments: [],
          leadingComments:
            ' Should generic services be generated in each language?  "Generic" services\n are not specific to any particular RPC system.  They are generated by the\n main code generators in each language (without additional plugins).\n Generic services were the only kind of service generation supported by\n early versions of google.protobuf.\n\n Generic services are now considered deprecated in favor of using plugins\n that generate code specific to your particular RPC system.  Therefore,\n these default to false.  Old code which depends on generic services should\n explicitly set them to true.\n',
        },
        {
          path: [4, 10, 2, 11],
          span: [415, 2, 50],
          leadingDetachedComments: [],
          leadingComments:
            ' Is this file deprecated?\n Depending on the target platform, this can emit Deprecated annotations\n for everything in the file, or it will be completely ignored; in the very\n least, this is a formalization for deprecating files.\n',
        },
        {
          path: [4, 10, 2, 12],
          span: [419, 2, 55],
          leadingDetachedComments: [],
          leadingComments:
            ' Enables the use of arenas for the proto messages in this file. This applies\n only to generated classes for C++.\n',
        },
        {
          path: [4, 10, 2, 13],
          span: [424, 2, 41],
          leadingDetachedComments: [],
          leadingComments:
            ' Sets the objective c class prefix which is prepended to all objective c\n generated classes from this .proto. There is no default.\n',
        },
        {
          path: [4, 10, 2, 14],
          span: [427, 2, 40],
          leadingDetachedComments: [],
          leadingComments: ' Namespace for generated classes; defaults to the package.\n',
        },
        {
          path: [4, 10, 2, 15],
          span: [433, 2, 36],
          leadingDetachedComments: [],
          leadingComments:
            " By default Swift generators will take the proto package and CamelCase it\n replacing '.' with underscore and use that to prefix the types/symbols\n defined. When this options is provided, they will use this value instead\n to prefix the types/symbols defined.\n",
        },
        {
          path: [4, 10, 2, 16],
          span: [437, 2, 40],
          leadingDetachedComments: [],
          leadingComments:
            ' Sets the php class prefix which is prepended to all php generated classes\n from this .proto. Default is empty.\n',
        },
        {
          path: [4, 10, 2, 17],
          span: [442, 2, 37],
          leadingDetachedComments: [],
          leadingComments:
            ' Use this option to change the namespace of php generated classes. Default\n is empty. When this option is empty, the package name will be used for\n determining the namespace.\n',
        },
        {
          path: [4, 10, 2, 18],
          span: [447, 2, 46],
          leadingDetachedComments: [],
          leadingComments:
            ' Use this option to change the namespace of php generated metadata classes.\n Default is empty. When this option is empty, the proto file name will be\n used for determining the namespace.\n',
        },
        {
          path: [4, 10, 2, 19],
          span: [452, 2, 36],
          leadingDetachedComments: [],
          leadingComments:
            ' Use this option to change the package of ruby generated classes. Default\n is empty. When this option is not set, the package name will be used for\n determining the ruby package.\n',
        },
        {
          path: [4, 10, 2, 20],
          span: [457, 2, 58],
          leadingDetachedComments: [],
          leadingComments:
            ' The parser stores options it doesn\'t recognize here.\n See the documentation for the "Options" section above.\n',
        },
        {
          path: [4, 10, 5],
          span: [461, 2, 25],
          leadingDetachedComments: [],
          leadingComments:
            ' Clients can define custom options in extensions of this message.\n See the documentation for the "Options" section above.\n',
        },
        {
          path: [4, 11, 2, 0],
          span: [485, 2, 62],
          leadingDetachedComments: [],
          leadingComments:
            " Set true to use the old proto1 MessageSet wire format for extensions.\n This is provided for backwards-compatibility with the MessageSet wire\n format.  You should not use this for any other reason:  It's less\n efficient, has fewer features, and is more complicated.\n\n The message must be defined exactly as follows:\n   message Foo {\n     option message_set_wire_format = true;\n     extensions 4 to max;\n   }\n Note that the message cannot have any defined fields; MessageSets only\n have extensions.\n\n All extensions of your type must be singular messages; e.g. they cannot\n be int32s, enums, or repeated messages.\n\n Because this is an option, the above two restrictions are not enforced by\n the protocol compiler.\n",
        },
        {
          path: [4, 11, 2, 1],
          span: [490, 2, 70],
          leadingDetachedComments: [],
          leadingComments:
            ' Disables the generation of the standard "descriptor()" accessor, which can\n conflict with a field of the same name.  This is meant to make migration\n from proto1 easier; new code should avoid fields named "descriptor".\n',
        },
        {
          path: [4, 11, 2, 2],
          span: [496, 2, 49],
          leadingDetachedComments: [],
          leadingComments:
            ' Is this message deprecated?\n Depending on the target platform, this can emit Deprecated annotations\n for the message, or it will be completely ignored; in the very least,\n this is a formalization for deprecating messages.\n',
        },
        {
          path: [4, 11, 2, 3],
          span: [521, 2, 30],
          leadingDetachedComments: [],
          leadingComments:
            ' Whether the message is an automatically generated map entry type for the\n maps field.\n\n For maps fields:\n     map<KeyType, ValueType> map_field = 1;\n The parsed descriptor looks like:\n     message MapFieldEntry {\n         option map_entry = true;\n         optional KeyType key = 1;\n         optional ValueType value = 2;\n     }\n     repeated MapFieldEntry map_field = 1;\n\n Implementations may choose not to generate the map_entry=true message, but\n use a native map in the target language to hold the keys and values.\n The reflection APIs in such implementations still need to work as\n if the field is a repeated message field.\n\n NOTE: Do not set the option in .proto files. Always use the maps syntax\n instead. The option should only be implicitly set by the proto compiler\n parser.\n',
        },
        {
          path: [4, 11, 9],
          span: [523, 2, 13],
          leadingDetachedComments: [],
          trailingComments: ' javalite_serializable\n',
        },
        { path: [4, 11, 9], span: [524, 2, 13], leadingDetachedComments: [], trailingComments: ' javanano_as_lite\n' },
        {
          path: [4, 11, 2, 4],
          span: [528, 2, 58],
          leadingDetachedComments: [],
          leadingComments: " The parser stores options it doesn't recognize here. See above.\n",
        },
        {
          path: [4, 11, 5],
          span: [531, 2, 25],
          leadingDetachedComments: [],
          leadingComments: ' Clients can define custom options in extensions of this message. See above.\n',
        },
        {
          path: [4, 12, 2, 0],
          span: [539, 2, 46],
          leadingDetachedComments: [],
          leadingComments:
            " The ctype option instructs the C++ code generator to use a different\n representation of the field than it normally would.  See the specific\n options below.  This option is not yet implemented in the open source\n release -- sorry, we'll try to include it in a future version!\n",
        },
        {
          path: [4, 12, 4, 0, 2, 0],
          span: [542, 4, 15],
          leadingDetachedComments: [],
          leadingComments: ' Default mode.\n',
        },
        {
          path: [4, 12, 2, 1],
          span: [553, 2, 27],
          leadingDetachedComments: [],
          leadingComments:
            ' The packed option can be enabled for repeated primitive fields to enable\n a more efficient representation on the wire. Rather than repeatedly\n writing the tag and type for each element, the entire array is encoded as\n a single length-delimited blob. In proto3, only explicit setting it to\n false will avoid using packed encoding.\n',
        },
        {
          path: [4, 12, 2, 2],
          span: [566, 2, 51],
          leadingDetachedComments: [],
          leadingComments:
            ' The jstype option determines the JavaScript type used for values of the\n field.  The option is permitted only for 64 bit integral and fixed types\n (int64, uint64, sint64, fixed64, sfixed64).  A field with jstype JS_STRING\n is represented as JavaScript string, which avoids loss of precision that\n can happen when a large value is converted to a floating point JavaScript.\n Specifying JS_NUMBER for the jstype causes the generated JavaScript code to\n use the JavaScript "number" type.  The behavior of the default option\n JS_NORMAL is implementation dependent.\n\n This option is an enum to permit additional types to be added, e.g.\n goog.math.Integer.\n',
        },
        {
          path: [4, 12, 4, 1, 2, 0],
          span: [569, 4, 18],
          leadingDetachedComments: [],
          leadingComments: ' Use the default type.\n',
        },
        {
          path: [4, 12, 4, 1, 2, 1],
          span: [572, 4, 18],
          leadingDetachedComments: [],
          leadingComments: ' Use JavaScript strings.\n',
        },
        {
          path: [4, 12, 4, 1, 2, 2],
          span: [575, 4, 18],
          leadingDetachedComments: [],
          leadingComments: ' Use JavaScript numbers.\n',
        },
        {
          path: [4, 12, 2, 3],
          span: [606, 2, 43],
          leadingDetachedComments: [],
          leadingComments:
            " Should this field be parsed lazily?  Lazy applies only to message-type\n fields.  It means that when the outer message is initially parsed, the\n inner message's contents will not be parsed but instead stored in encoded\n form.  The inner message will actually be parsed when it is first accessed.\n\n This is only a hint.  Implementations are free to choose whether to use\n eager or lazy parsing regardless of the value of this option.  However,\n setting this option true suggests that the protocol author believes that\n using lazy parsing on this field is worth the additional bookkeeping\n overhead typically needed to implement it.\n\n This option does not affect the public interface of any generated code;\n all method signatures remain the same.  Furthermore, thread-safety of the\n interface is not affected by this option; const methods remain safe to\n call from multiple threads concurrently, while non-const methods continue\n to require exclusive access.\n\n\n Note that implementations may choose not to check required fields within\n a lazy sub-message.  That is, calling IsInitialized() on the outer message\n may return true even if the inner message has missing required fields.\n This is necessary because otherwise the inner message would have to be\n parsed in order to perform the check, defeating the purpose of lazy\n parsing.  An implementation which chooses not to check required fields\n must be consistent about it.  That is, for any particular sub-message, the\n implementation must either *always* check its required fields, or *never*\n check its required fields, regardless of whether or not the message has\n been parsed.\n",
        },
        {
          path: [4, 12, 2, 4],
          span: [612, 2, 49],
          leadingDetachedComments: [],
          leadingComments:
            ' Is this field deprecated?\n Depending on the target platform, this can emit Deprecated annotations\n for accessors, or it will be completely ignored; in the very least, this\n is a formalization for deprecating fields.\n',
        },
        {
          path: [4, 12, 2, 5],
          span: [615, 2, 44],
          leadingDetachedComments: [],
          leadingComments: ' For Google-internal migration only. Do not use.\n',
        },
        {
          path: [4, 12, 2, 6],
          span: [619, 2, 58],
          leadingDetachedComments: [],
          leadingComments: " The parser stores options it doesn't recognize here. See above.\n",
        },
        {
          path: [4, 12, 5],
          span: [622, 2, 25],
          leadingDetachedComments: [],
          leadingComments: ' Clients can define custom options in extensions of this message. See above.\n',
        },
        { path: [4, 12, 9], span: [624, 2, 13], leadingDetachedComments: [], trailingComments: ' removed jtype\n' },
        {
          path: [4, 13, 2, 0],
          span: [629, 2, 58],
          leadingDetachedComments: [],
          leadingComments: " The parser stores options it doesn't recognize here. See above.\n",
        },
        {
          path: [4, 13, 5],
          span: [632, 2, 25],
          leadingDetachedComments: [],
          leadingComments: ' Clients can define custom options in extensions of this message. See above.\n',
        },
        {
          path: [4, 14, 2, 0],
          span: [639, 2, 32],
          leadingDetachedComments: [],
          leadingComments: ' Set this option to true to allow mapping different tag names to the same\n value.\n',
        },
        {
          path: [4, 14, 2, 1],
          span: [645, 2, 49],
          leadingDetachedComments: [],
          leadingComments:
            ' Is this enum deprecated?\n Depending on the target platform, this can emit Deprecated annotations\n for the enum, or it will be completely ignored; in the very least, this\n is a formalization for deprecating enums.\n',
        },
        { path: [4, 14, 9], span: [647, 2, 13], leadingDetachedComments: [], trailingComments: ' javanano_as_lite\n' },
        {
          path: [4, 14, 2, 2],
          span: [650, 2, 58],
          leadingDetachedComments: [],
          leadingComments: " The parser stores options it doesn't recognize here. See above.\n",
        },
        {
          path: [4, 14, 5],
          span: [653, 2, 25],
          leadingDetachedComments: [],
          leadingComments: ' Clients can define custom options in extensions of this message. See above.\n',
        },
        {
          path: [4, 15, 2, 0],
          span: [661, 2, 49],
          leadingDetachedComments: [],
          leadingComments:
            ' Is this enum value deprecated?\n Depending on the target platform, this can emit Deprecated annotations\n for the enum value, or it will be completely ignored; in the very least,\n this is a formalization for deprecating enum values.\n',
        },
        {
          path: [4, 15, 2, 1],
          span: [664, 2, 58],
          leadingDetachedComments: [],
          leadingComments: " The parser stores options it doesn't recognize here. See above.\n",
        },
        {
          path: [4, 15, 5],
          span: [667, 2, 25],
          leadingDetachedComments: [],
          leadingComments: ' Clients can define custom options in extensions of this message. See above.\n',
        },
        {
          path: [4, 16, 2, 0],
          span: [681, 2, 50],
          leadingDetachedComments: [
            " Note:  Field numbers 1 through 32 are reserved for Google's internal RPC\n   framework.  We apologize for hoarding these numbers to ourselves, but\n   we were already using them long before we decided to release Protocol\n   Buffers.\n",
          ],
          leadingComments:
            ' Is this service deprecated?\n Depending on the target platform, this can emit Deprecated annotations\n for the service, or it will be completely ignored; in the very least,\n this is a formalization for deprecating services.\n',
        },
        {
          path: [4, 16, 2, 1],
          span: [684, 2, 58],
          leadingDetachedComments: [],
          leadingComments: " The parser stores options it doesn't recognize here. See above.\n",
        },
        {
          path: [4, 16, 5],
          span: [687, 2, 25],
          leadingDetachedComments: [],
          leadingComments: ' Clients can define custom options in extensions of this message. See above.\n',
        },
        {
          path: [4, 17, 2, 0],
          span: [701, 2, 50],
          leadingDetachedComments: [
            " Note:  Field numbers 1 through 32 are reserved for Google's internal RPC\n   framework.  We apologize for hoarding these numbers to ourselves, but\n   we were already using them long before we decided to release Protocol\n   Buffers.\n",
          ],
          leadingComments:
            ' Is this method deprecated?\n Depending on the target platform, this can emit Deprecated annotations\n for the method, or it will be completely ignored; in the very least,\n this is a formalization for deprecating methods.\n',
        },
        {
          path: [4, 17, 4, 0],
          span: [706, 2, 710, 3],
          leadingDetachedComments: [],
          leadingComments:
            ' Is this method side-effect-free (or safe in HTTP parlance), or idempotent,\n or neither? HTTP based RPC implementation may choose GET verb for safe\n methods, and PUT verb for idempotent methods instead of the default POST.\n',
        },
        {
          path: [4, 17, 4, 0, 2, 1],
          span: [708, 4, 24],
          leadingDetachedComments: [],
          trailingComments: ' implies idempotent\n',
        },
        {
          path: [4, 17, 4, 0, 2, 2],
          span: [709, 4, 19],
          leadingDetachedComments: [],
          trailingComments: ' idempotent, but may have side effects\n',
        },
        {
          path: [4, 17, 2, 2],
          span: [715, 2, 58],
          leadingDetachedComments: [],
          leadingComments: " The parser stores options it doesn't recognize here. See above.\n",
        },
        {
          path: [4, 17, 5],
          span: [718, 2, 25],
          leadingDetachedComments: [],
          leadingComments: ' Clients can define custom options in extensions of this message. See above.\n',
        },
        {
          path: [4, 18],
          span: [728, 0, 748, 1],
          leadingDetachedComments: [],
          leadingComments:
            ' A message representing a option the parser does not recognize. This only\n appears in options protos created by the compiler::Parser class.\n DescriptorPool resolves these when building Descriptor objects. Therefore,\n options protos in descriptor objects (e.g. returned by Descriptor::options(),\n or produced by Descriptor::CopyTo()) will never have UninterpretedOptions\n in them.\n',
        },
        {
          path: [4, 18, 3, 0],
          span: [734, 2, 737, 3],
          leadingDetachedComments: [],
          leadingComments:
            ' The name of the uninterpreted option.  Each string represents a segment in\n a dot-separated name.  is_extension is true iff a segment represents an\n extension (denoted with parentheses in options specs in .proto files).\n E.g.,{ ["foo", false], ["bar.baz", true], ["qux", false] } represents\n "foo.(bar.baz).qux".\n',
        },
        {
          path: [4, 18, 2, 1],
          span: [742, 2, 39],
          leadingDetachedComments: [],
          leadingComments:
            ' The value of the uninterpreted option, in whatever type the tokenizer\n identified it as during parsing. Exactly one of these should be set.\n',
        },
        {
          path: [4, 19],
          span: [755, 0, 884, 1],
          leadingDetachedComments: [
            ' ===================================================================\n Optional source code info\n',
          ],
          leadingComments:
            ' Encapsulates information about the original source file from which a\n FileDescriptorProto was generated.\n',
        },
        {
          path: [4, 19, 2, 0],
          span: [799, 2, 33],
          leadingDetachedComments: [],
          leadingComments:
            ' A Location identifies a piece of source code in a .proto file which\n corresponds to a particular definition.  This information is intended\n to be useful to IDEs, code indexers, documentation generators, and similar\n tools.\n\n For example, say we have a file like:\n   message Foo {\n     optional string foo = 1;\n   }\n Let\'s look at just the field definition:\n   optional string foo = 1;\n   ^       ^^     ^^  ^  ^^^\n   a       bc     de  f  ghi\n We have the following locations:\n   span   path               represents\n   [a,i)  [ 4, 0, 2, 0 ]     The whole field definition.\n   [a,b)  [ 4, 0, 2, 0, 4 ]  The label (optional).\n   [c,d)  [ 4, 0, 2, 0, 5 ]  The type (string).\n   [e,f)  [ 4, 0, 2, 0, 1 ]  The name (foo).\n   [g,h)  [ 4, 0, 2, 0, 3 ]  The number (1).\n\n Notes:\n - A location may refer to a repeated field itself (i.e. not to any\n   particular index within it).  This is used whenever a set of elements are\n   logically enclosed in a single code segment.  For example, an entire\n   extend block (possibly containing multiple extension definitions) will\n   have an outer location whose path refers to the "extensions" repeated\n   field without an index.\n - Multiple locations may have the same path.  This happens when a single\n   logical declaration is spread out across multiple places.  The most\n   obvious example is the "extend" block again -- there may be multiple\n   extend blocks in the same scope, each of which will have the same path.\n - A location\'s span is not always a subset of its parent\'s span.  For\n   example, the "extendee" of an extension declaration appears at the\n   beginning of the "extend" block and is shared by all extensions within\n   the block.\n - Just because a location\'s span is a subset of some other location\'s span\n   does not mean that it is a descendant.  For example, a "group" defines\n   both a type and a field in a single declaration.  Thus, the locations\n   corresponding to the type and field and their components will overlap.\n - Code which tries to interpret locations should probably be designed to\n   ignore those that it doesn\'t understand, as more types of locations could\n   be recorded in the future.\n',
        },
        {
          path: [4, 19, 3, 0, 2, 0],
          span: [824, 4, 44],
          leadingDetachedComments: [],
          leadingComments:
            ' Identifies which part of the FileDescriptorProto was defined at this\n location.\n\n Each element is a field number or an index.  They form a path from\n the root FileDescriptorProto to the place where the definition.  For\n example, this path:\n   [ 4, 3, 2, 7, 1 ]\n refers to:\n   file.message_type(3)  // 4, 3\n       .field(7)         // 2, 7\n       .name()           // 1\n This is because FileDescriptorProto.message_type has field number 4:\n   repeated DescriptorProto message_type = 4;\n and DescriptorProto.field has field number 2:\n   repeated FieldDescriptorProto field = 2;\n and FieldDescriptorProto.name has field number 1:\n   optional string name = 1;\n\n Thus, the above path gives the location of a field name.  If we removed\n the last element:\n   [ 4, 3, 2, 7 ]\n this path refers to the whole field declaration (from the beginning\n of the label to the terminating semicolon).\n',
        },
        {
          path: [4, 19, 3, 0, 2, 1],
          span: [831, 4, 44],
          leadingDetachedComments: [],
          leadingComments:
            ' Always has exactly three or four elements: start line, start column,\n end line (optional, otherwise assumed same as start line), end column.\n These are packed into a single field for efficiency.  Note that line\n and column numbers are zero-based -- typically you will want to add\n 1 to each before displaying to a user.\n',
        },
        {
          path: [4, 19, 3, 0, 2, 2],
          span: [880, 4, 41],
          leadingDetachedComments: [],
          leadingComments:
            ' If this SourceCodeInfo represents a complete declaration, these are any\n comments appearing before and after the declaration which appear to be\n attached to the declaration.\n\n A series of line comments appearing on consecutive lines, with no other\n tokens appearing on those lines, will be treated as a single comment.\n\n leading_detached_comments will keep paragraphs of comments that appear\n before (but not connected to) the current element. Each paragraph,\n separated by empty lines, will be one comment element in the repeated\n field.\n\n Only the comment content is provided; comment markers (e.g. //) are\n stripped out.  For block comments, leading whitespace and an asterisk\n will be stripped from the beginning of each line other than the first.\n Newlines are included in the output.\n\n Examples:\n\n   optional int32 foo = 1;  // Comment attached to foo.\n   // Comment attached to bar.\n   optional int32 bar = 2;\n\n   optional string baz = 3;\n   // Comment attached to baz.\n   // Another line attached to baz.\n\n   // Comment attached to qux.\n   //\n   // Another line attached to qux.\n   optional double qux = 4;\n\n   // Detached comment for corge. This is not leading or trailing comments\n   // to qux or corge because there are blank lines separating it from\n   // both.\n\n   // Detached comment for corge paragraph 2.\n\n   optional string corge = 5;\n   /* Block comment attached\n    * to corge.  Leading asterisks\n    * will be removed. */\n   /* Block comment attached to\n    * grault. */\n   optional int32 grault = 6;\n\n   // ignored detached comments.\n',
        },
        {
          path: [4, 20],
          span: [889, 0, 910, 1],
          leadingDetachedComments: [],
          leadingComments:
            ' Describes the relationship between generated code and its original source\n file. A GeneratedCodeInfo message is associated with only one generated\n source file, but may contain references to different source .proto files.\n',
        },
        {
          path: [4, 20, 2, 0],
          span: [892, 2, 37],
          leadingDetachedComments: [],
          leadingComments:
            ' An Annotation connects some span of text in generated code to an element\n of its generating .proto file.\n',
        },
        {
          path: [4, 20, 3, 0, 2, 0],
          span: [896, 4, 44],
          leadingDetachedComments: [],
          leadingComments:
            ' Identifies the element in the original source .proto file. This field\n is formatted the same as SourceCodeInfo.Location.path.\n',
        },
        {
          path: [4, 20, 3, 0, 2, 1],
          span: [899, 4, 36],
          leadingDetachedComments: [],
          leadingComments: ' Identifies the filesystem path to the original source .proto.\n',
        },
        {
          path: [4, 20, 3, 0, 2, 2],
          span: [903, 4, 29],
          leadingDetachedComments: [],
          leadingComments:
            ' Identifies the starting offset in bytes in the generated code\n that relates to the identified object.\n',
        },
        {
          path: [4, 20, 3, 0, 2, 3],
          span: [908, 4, 27],
          leadingDetachedComments: [],
          leadingComments:
            ' Identifies the ending offset in bytes in the generated code that\n relates to the identified offset. The end offset should be one past\n the last relevant byte (so the length of the text = end - begin).\n',
        },
      ],
    },
  }),
  references: {
    '.google.protobuf.FileDescriptorSet': FileDescriptorSet,
    '.google.protobuf.FileDescriptorProto': FileDescriptorProto,
    '.google.protobuf.DescriptorProto': DescriptorProto,
    '.google.protobuf.DescriptorProto.ExtensionRange': DescriptorProto_ExtensionRange,
    '.google.protobuf.DescriptorProto.ReservedRange': DescriptorProto_ReservedRange,
    '.google.protobuf.ExtensionRangeOptions': ExtensionRangeOptions,
    '.google.protobuf.FieldDescriptorProto': FieldDescriptorProto,
    '.google.protobuf.FieldDescriptorProto.Type': FieldDescriptorProto_Type,
    '.google.protobuf.FieldDescriptorProto.Label': FieldDescriptorProto_Label,
    '.google.protobuf.OneofDescriptorProto': OneofDescriptorProto,
    '.google.protobuf.EnumDescriptorProto': EnumDescriptorProto,
    '.google.protobuf.EnumDescriptorProto.EnumReservedRange': EnumDescriptorProto_EnumReservedRange,
    '.google.protobuf.EnumValueDescriptorProto': EnumValueDescriptorProto,
    '.google.protobuf.ServiceDescriptorProto': ServiceDescriptorProto,
    '.google.protobuf.MethodDescriptorProto': MethodDescriptorProto,
    '.google.protobuf.FileOptions': FileOptions,
    '.google.protobuf.FileOptions.OptimizeMode': FileOptions_OptimizeMode,
    '.google.protobuf.MessageOptions': MessageOptions,
    '.google.protobuf.FieldOptions': FieldOptions,
    '.google.protobuf.FieldOptions.CType': FieldOptions_CType,
    '.google.protobuf.FieldOptions.JSType': FieldOptions_JSType,
    '.google.protobuf.OneofOptions': OneofOptions,
    '.google.protobuf.EnumOptions': EnumOptions,
    '.google.protobuf.EnumValueOptions': EnumValueOptions,
    '.google.protobuf.ServiceOptions': ServiceOptions,
    '.google.protobuf.MethodOptions': MethodOptions,
    '.google.protobuf.MethodOptions.IdempotencyLevel': MethodOptions_IdempotencyLevel,
    '.google.protobuf.UninterpretedOption': UninterpretedOption,
    '.google.protobuf.UninterpretedOption.NamePart': UninterpretedOption_NamePart,
    '.google.protobuf.SourceCodeInfo': SourceCodeInfo,
    '.google.protobuf.SourceCodeInfo.Location': SourceCodeInfo_Location,
    '.google.protobuf.GeneratedCodeInfo': GeneratedCodeInfo,
    '.google.protobuf.GeneratedCodeInfo.Annotation': GeneratedCodeInfo_Annotation,
  },
  dependencies: [],
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  throw 'Unable to locate global object';
})();

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER');
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (util.Long !== Long) {
  util.Long = Long as any;
  configure();
}
