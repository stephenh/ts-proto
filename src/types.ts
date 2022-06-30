import {
  CodeGeneratorRequest,
  DescriptorProto,
  EnumDescriptorProto,
  FieldDescriptorProto,
  FieldDescriptorProto_Label,
  FieldDescriptorProto_Type,
  FileDescriptorProto,
  MessageOptions,
  MethodDescriptorProto,
  ServiceDescriptorProto,
} from 'ts-proto-descriptors';
import { code, Code, imp, Import } from 'ts-poet';
import { DateOption, EnvOption, LongOption, OneofOption, Options } from './options';
import { visit } from './visit';
import { fail, FormattedMethodDescriptor, impProto, maybePrefixPackage } from './utils';
import SourceInfo from './sourceInfo';
import { camelCase } from './case';
import { Context } from './context';

/** Based on https://github.com/dcodeIO/protobuf.js/blob/master/src/types.js#L37. */
export function basicWireType(type: FieldDescriptorProto_Type): number {
  switch (type) {
    case FieldDescriptorProto_Type.TYPE_DOUBLE:
      return 1;
    case FieldDescriptorProto_Type.TYPE_FLOAT:
      return 5;
    case FieldDescriptorProto_Type.TYPE_INT32:
    case FieldDescriptorProto_Type.TYPE_ENUM:
    case FieldDescriptorProto_Type.TYPE_UINT32:
    case FieldDescriptorProto_Type.TYPE_SINT32:
      return 0;
    case FieldDescriptorProto_Type.TYPE_FIXED32:
    case FieldDescriptorProto_Type.TYPE_SFIXED32:
      return 5;
    case FieldDescriptorProto_Type.TYPE_INT64:
    case FieldDescriptorProto_Type.TYPE_UINT64:
    case FieldDescriptorProto_Type.TYPE_SINT64:
      return 0;
    case FieldDescriptorProto_Type.TYPE_FIXED64:
    case FieldDescriptorProto_Type.TYPE_SFIXED64:
      return 1;
    case FieldDescriptorProto_Type.TYPE_BOOL:
      return 0;
    case FieldDescriptorProto_Type.TYPE_STRING:
    case FieldDescriptorProto_Type.TYPE_BYTES:
      return 2;
    default:
      throw new Error('Invalid type ' + type);
  }
}

export function basicLongWireType(type: FieldDescriptorProto_Type): number | undefined {
  switch (type) {
    case FieldDescriptorProto_Type.TYPE_INT64:
    case FieldDescriptorProto_Type.TYPE_UINT64:
    case FieldDescriptorProto_Type.TYPE_SINT64:
      return 0;
    case FieldDescriptorProto_Type.TYPE_FIXED64:
    case FieldDescriptorProto_Type.TYPE_SFIXED64:
      return 1;
    default:
      return undefined;
  }
}

/** Returns the type name without any repeated/required/etc. labels. */
export function basicTypeName(
  ctx: Context,
  field: FieldDescriptorProto,
  typeOptions: { keepValueType?: boolean } = {}
): Code {
  const { options } = ctx;
  switch (field.type) {
    case FieldDescriptorProto_Type.TYPE_DOUBLE:
    case FieldDescriptorProto_Type.TYPE_FLOAT:
    case FieldDescriptorProto_Type.TYPE_INT32:
    case FieldDescriptorProto_Type.TYPE_UINT32:
    case FieldDescriptorProto_Type.TYPE_SINT32:
    case FieldDescriptorProto_Type.TYPE_FIXED32:
    case FieldDescriptorProto_Type.TYPE_SFIXED32:
      return code`number`;
    case FieldDescriptorProto_Type.TYPE_INT64:
    case FieldDescriptorProto_Type.TYPE_UINT64:
    case FieldDescriptorProto_Type.TYPE_SINT64:
    case FieldDescriptorProto_Type.TYPE_FIXED64:
    case FieldDescriptorProto_Type.TYPE_SFIXED64:
      // this handles 2^53, Long is only needed for 2^64; this is effectively pbjs's forceNumber
      return longTypeName(ctx);
    case FieldDescriptorProto_Type.TYPE_BOOL:
      return code`boolean`;
    case FieldDescriptorProto_Type.TYPE_STRING:
      return code`string`;
    case FieldDescriptorProto_Type.TYPE_BYTES:
      if (options.env === EnvOption.NODE) {
        return code`Buffer`;
      } else {
        return code`Uint8Array`;
      }
    case FieldDescriptorProto_Type.TYPE_MESSAGE:
    case FieldDescriptorProto_Type.TYPE_ENUM:
      return messageToTypeName(ctx, field.typeName, { ...typeOptions, repeated: isRepeated(field) });
    default:
      return code`${field.typeName}`;
  }
}

/** Returns the Reader method for the primitive's read/write call. */
export function toReaderCall(field: FieldDescriptorProto): string {
  switch (field.type) {
    case FieldDescriptorProto_Type.TYPE_DOUBLE:
      return 'double';
    case FieldDescriptorProto_Type.TYPE_FLOAT:
      return 'float';
    case FieldDescriptorProto_Type.TYPE_INT32:
    case FieldDescriptorProto_Type.TYPE_ENUM:
      return 'int32';
    case FieldDescriptorProto_Type.TYPE_UINT32:
      return 'uint32';
    case FieldDescriptorProto_Type.TYPE_SINT32:
      return 'sint32';
    case FieldDescriptorProto_Type.TYPE_FIXED32:
      return 'fixed32';
    case FieldDescriptorProto_Type.TYPE_SFIXED32:
      return 'sfixed32';
    case FieldDescriptorProto_Type.TYPE_INT64:
      return 'int64';
    case FieldDescriptorProto_Type.TYPE_UINT64:
      return 'uint64';
    case FieldDescriptorProto_Type.TYPE_SINT64:
      return 'sint64';
    case FieldDescriptorProto_Type.TYPE_FIXED64:
      return 'fixed64';
    case FieldDescriptorProto_Type.TYPE_SFIXED64:
      return 'sfixed64';
    case FieldDescriptorProto_Type.TYPE_BOOL:
      return 'bool';
    case FieldDescriptorProto_Type.TYPE_STRING:
      return 'string';
    case FieldDescriptorProto_Type.TYPE_BYTES:
      return 'bytes';
    default:
      throw new Error(`Not a primitive field ${field}`);
  }
}

export function packedType(type: FieldDescriptorProto_Type): number | undefined {
  switch (type) {
    case FieldDescriptorProto_Type.TYPE_DOUBLE:
      return 1;
    case FieldDescriptorProto_Type.TYPE_FLOAT:
      return 5;
    case FieldDescriptorProto_Type.TYPE_INT32:
    case FieldDescriptorProto_Type.TYPE_ENUM:
    case FieldDescriptorProto_Type.TYPE_UINT32:
    case FieldDescriptorProto_Type.TYPE_SINT32:
      return 0;
    case FieldDescriptorProto_Type.TYPE_FIXED32:
    case FieldDescriptorProto_Type.TYPE_SFIXED32:
      return 5;
    case FieldDescriptorProto_Type.TYPE_INT64:
    case FieldDescriptorProto_Type.TYPE_UINT64:
    case FieldDescriptorProto_Type.TYPE_SINT64:
      return 0;
    case FieldDescriptorProto_Type.TYPE_FIXED64:
    case FieldDescriptorProto_Type.TYPE_SFIXED64:
      return 1;
    case FieldDescriptorProto_Type.TYPE_BOOL:
      return 0;
    default:
      return undefined;
  }
}

export function defaultValue(ctx: Context, field: FieldDescriptorProto): any {
  const { typeMap, options, utils } = ctx;
  switch (field.type) {
    case FieldDescriptorProto_Type.TYPE_DOUBLE:
    case FieldDescriptorProto_Type.TYPE_FLOAT:
    case FieldDescriptorProto_Type.TYPE_INT32:
    case FieldDescriptorProto_Type.TYPE_UINT32:
    case FieldDescriptorProto_Type.TYPE_SINT32:
    case FieldDescriptorProto_Type.TYPE_FIXED32:
    case FieldDescriptorProto_Type.TYPE_SFIXED32:
      return 0;
    case FieldDescriptorProto_Type.TYPE_ENUM:
      // proto3 enforces enums starting at 0, however proto2 does not, so we have
      // to probe and see if zero is an allowed value. If it's not, pick the first one.
      // This is probably not great, but it's only used in fromJSON and fromPartial,
      // and I believe the semantics of those in the proto2 world are generally undefined.
      const enumProto = typeMap.get(field.typeName)![2] as EnumDescriptorProto;
      const zerothValue = enumProto.value.find((v) => v.number === 0) || enumProto.value[0];
      if (options.stringEnums) {
        const enumType = messageToTypeName(ctx, field.typeName);
        return code`${enumType}.${zerothValue.name}`;
      } else {
        return zerothValue.number;
      }
    case FieldDescriptorProto_Type.TYPE_UINT64:
    case FieldDescriptorProto_Type.TYPE_FIXED64:
      if (options.forceLong === LongOption.LONG) {
        return code`${utils.Long}.UZERO`;
      } else if (options.forceLong === LongOption.STRING) {
        return '"0"';
      } else {
        return 0;
      }
    case FieldDescriptorProto_Type.TYPE_INT64:
    case FieldDescriptorProto_Type.TYPE_SINT64:
    case FieldDescriptorProto_Type.TYPE_SFIXED64:
      if (options.forceLong === LongOption.LONG) {
        return code`${utils.Long}.ZERO`;
      } else if (options.forceLong === LongOption.STRING) {
        return '"0"';
      } else {
        return 0;
      }
    case FieldDescriptorProto_Type.TYPE_BOOL:
      return false;
    case FieldDescriptorProto_Type.TYPE_STRING:
      return '""';
    case FieldDescriptorProto_Type.TYPE_BYTES:
      if (options.env === EnvOption.NODE) {
        return 'Buffer.alloc(0)';
      } else {
        return 'new Uint8Array()';
      }
    case FieldDescriptorProto_Type.TYPE_MESSAGE:
    default:
      return 'undefined';
  }
}

/** Creates code that checks that the field is not the default value. Supports scalars and enums. */
export function notDefaultCheck(
  ctx: Context,
  field: FieldDescriptorProto,
  messageOptions: MessageOptions | undefined,
  place: string
): Code {
  const { typeMap, options } = ctx;
  const isOptional = isOptionalProperty(field, messageOptions, options);
  const maybeNotUndefinedAnd = isOptional ? `${place} !== undefined && ` : '';
  switch (field.type) {
    case FieldDescriptorProto_Type.TYPE_DOUBLE:
    case FieldDescriptorProto_Type.TYPE_FLOAT:
    case FieldDescriptorProto_Type.TYPE_INT32:
    case FieldDescriptorProto_Type.TYPE_UINT32:
    case FieldDescriptorProto_Type.TYPE_SINT32:
    case FieldDescriptorProto_Type.TYPE_FIXED32:
    case FieldDescriptorProto_Type.TYPE_SFIXED32:
      return code`${maybeNotUndefinedAnd} ${place} !== 0`;
    case FieldDescriptorProto_Type.TYPE_ENUM:
      // proto3 enforces enums starting at 0, however proto2 does not, so we have
      // to probe and see if zero is an allowed value. If it's not, pick the first one.
      // This is probably not great, but it's only used in fromJSON and fromPartial,
      // and I believe the semantics of those in the proto2 world are generally undefined.
      const enumProto = typeMap.get(field.typeName)![2] as EnumDescriptorProto;
      const zerothValue = enumProto.value.find((v) => v.number === 0) || enumProto.value[0];
      if (options.stringEnums) {
        const enumType = messageToTypeName(ctx, field.typeName);
        return code`${maybeNotUndefinedAnd} ${place} !== ${enumType}.${zerothValue.name}`;
      } else {
        return code`${maybeNotUndefinedAnd} ${place} !== ${zerothValue.number}`;
      }
    case FieldDescriptorProto_Type.TYPE_UINT64:
    case FieldDescriptorProto_Type.TYPE_FIXED64:
    case FieldDescriptorProto_Type.TYPE_INT64:
    case FieldDescriptorProto_Type.TYPE_SINT64:
    case FieldDescriptorProto_Type.TYPE_SFIXED64:
      if (options.forceLong === LongOption.LONG) {
        return code`${maybeNotUndefinedAnd} !${place}.isZero()`;
      } else if (options.forceLong === LongOption.STRING) {
        return code`${maybeNotUndefinedAnd} ${place} !== "0"`;
      } else {
        return code`${maybeNotUndefinedAnd} ${place} !== 0`;
      }
    case FieldDescriptorProto_Type.TYPE_BOOL:
      return code`${place} === true`;
    case FieldDescriptorProto_Type.TYPE_STRING:
      return code`${maybeNotUndefinedAnd} ${place} !== ""`;
    case FieldDescriptorProto_Type.TYPE_BYTES:
      return code`${maybeNotUndefinedAnd} ${place}.length !== 0`;
    default:
      throw new Error('Not implemented for the given type.');
  }
}

/** A map of proto type name, e.g. `foo.Message.Inner`, to module/class name, e.g. `foo`, `Message_Inner`. */
export type TypeMap = Map<string, [string, string, DescriptorProto | EnumDescriptorProto]>;

/** Scans all of the proto files in `request` and builds a map of proto typeName -> TS module/name. */
export function createTypeMap(request: CodeGeneratorRequest, options: Options): TypeMap {
  const typeMap: TypeMap = new Map();
  for (const file of request.protoFile) {
    // We assume a file.name of google/protobuf/wrappers.proto --> a module path of google/protobuf/wrapper.ts
    const moduleName = file.name.replace('.proto', '');
    // So given a fullName like FooMessage_InnerMessage, proto will see that as package.name.FooMessage.InnerMessage
    function saveMapping(
      tsFullName: string,
      desc: DescriptorProto | EnumDescriptorProto,
      s: SourceInfo,
      protoFullName: string
    ): void {
      // package is optional, but make sure we have a dot-prefixed type name either way
      const prefix = file.package.length === 0 ? '' : `.${file.package}`;
      typeMap.set(`${prefix}.${protoFullName}`, [moduleName, tsFullName, desc]);
    }
    visit(file, SourceInfo.empty(), saveMapping, options, saveMapping);
  }
  return typeMap;
}

/** A "Scalar Value Type" as defined in https://developers.google.com/protocol-buffers/docs/proto3#scalar */
export function isScalar(field: FieldDescriptorProto): boolean {
  const scalarTypes = [
    FieldDescriptorProto_Type.TYPE_DOUBLE,
    FieldDescriptorProto_Type.TYPE_FLOAT,
    FieldDescriptorProto_Type.TYPE_INT32,
    FieldDescriptorProto_Type.TYPE_INT64,
    FieldDescriptorProto_Type.TYPE_UINT32,
    FieldDescriptorProto_Type.TYPE_UINT64,
    FieldDescriptorProto_Type.TYPE_SINT32,
    FieldDescriptorProto_Type.TYPE_SINT64,
    FieldDescriptorProto_Type.TYPE_FIXED32,
    FieldDescriptorProto_Type.TYPE_FIXED64,
    FieldDescriptorProto_Type.TYPE_SFIXED32,
    FieldDescriptorProto_Type.TYPE_SFIXED64,
    FieldDescriptorProto_Type.TYPE_BOOL,
    FieldDescriptorProto_Type.TYPE_STRING,
    FieldDescriptorProto_Type.TYPE_BYTES,
  ];
  return scalarTypes.includes(field.type);
}

// When useOptionals='messages', non-scalar fields are translated into optional
// properties. When useOptionals='all', all fields are translated into
// optional properties, with the exception of map Entry key/values, which must
// always be present.
export function isOptionalProperty(
  field: FieldDescriptorProto,
  messageOptions: MessageOptions | undefined,
  options: Options
): boolean {
  const optionalMessages =
    options.useOptionals === true || options.useOptionals === 'messages' || options.useOptionals === 'all';
  const optionalAll = options.useOptionals === 'all';
  return (
    (optionalMessages && isMessage(field) && !isRepeated(field)) ||
    (optionalAll && !messageOptions?.mapEntry) ||
    field.proto3Optional
  );
}

/** This includes all scalars, enums and the [groups type](https://developers.google.com/protocol-buffers/docs/reference/java/com/google/protobuf/DescriptorProtos.FieldDescriptorProto.Type.html#TYPE_GROUP) */
export function isPrimitive(field: FieldDescriptorProto): boolean {
  return !isMessage(field);
}

export function isBytes(field: FieldDescriptorProto): boolean {
  return field.type === FieldDescriptorProto_Type.TYPE_BYTES;
}

export function isMessage(field: FieldDescriptorProto): boolean {
  return field.type === FieldDescriptorProto_Type.TYPE_MESSAGE;
}

export function isEnum(field: FieldDescriptorProto): boolean {
  return field.type === FieldDescriptorProto_Type.TYPE_ENUM;
}

export function isWithinOneOf(field: FieldDescriptorProto): boolean {
  return field.hasOwnProperty('oneofIndex');
}

export function isWithinOneOfThatShouldBeUnion(options: Options, field: FieldDescriptorProto): boolean {
  return isWithinOneOf(field) && options.oneof === OneofOption.UNIONS && !field.proto3Optional;
}

export function isRepeated(field: FieldDescriptorProto): boolean {
  return field.label === FieldDescriptorProto_Label.LABEL_REPEATED;
}

export function isLong(field: FieldDescriptorProto): boolean {
  return basicLongWireType(field.type) !== undefined;
}

export function isWholeNumber(field: FieldDescriptorProto): boolean {
  return (
    field.type === FieldDescriptorProto_Type.TYPE_INT32 ||
    field.type === FieldDescriptorProto_Type.TYPE_INT64 ||
    field.type === FieldDescriptorProto_Type.TYPE_UINT32 ||
    field.type === FieldDescriptorProto_Type.TYPE_UINT64 ||
    field.type === FieldDescriptorProto_Type.TYPE_SINT32 ||
    field.type === FieldDescriptorProto_Type.TYPE_SINT64 ||
    field.type === FieldDescriptorProto_Type.TYPE_FIXED32 ||
    field.type === FieldDescriptorProto_Type.TYPE_FIXED64 ||
    field.type === FieldDescriptorProto_Type.TYPE_SFIXED32 ||
    field.type === FieldDescriptorProto_Type.TYPE_SFIXED64
  );
}

export function isMapType(ctx: Context, messageDesc: DescriptorProto, field: FieldDescriptorProto): boolean {
  return detectMapType(ctx, messageDesc, field) !== undefined;
}

export function isObjectId(field: FieldDescriptorProto): boolean {
  // need to use endsWith instead of === because objectid could be imported from an external proto file
  return field.typeName.endsWith('.ObjectId');
}

export function isTimestamp(field: FieldDescriptorProto): boolean {
  return field.typeName === '.google.protobuf.Timestamp';
}

export function isValueType(ctx: Context, field: FieldDescriptorProto): boolean {
  return valueTypeName(ctx, field.typeName) !== undefined;
}

export function isAnyValueType(field: FieldDescriptorProto): boolean {
  return isAnyValueTypeName(field.typeName);
}

export function isAnyValueTypeName(typeName: string): boolean {
  return typeName === 'google.protobuf.Value' || typeName === '.google.protobuf.Value';
}

export function isBytesValueType(field: FieldDescriptorProto): boolean {
  return field.typeName === '.google.protobuf.BytesValue';
}

export function isFieldMaskType(field: FieldDescriptorProto): boolean {
  return isFieldMaskTypeName(field.typeName);
}

export function isFieldMaskTypeName(typeName: string): boolean {
  return typeName === 'google.protobuf.FieldMask' || typeName === '.google.protobuf.FieldMask';
}

export function isListValueType(field: FieldDescriptorProto): boolean {
  return isListValueTypeName(field.typeName);
}

export function isListValueTypeName(typeName: string): boolean {
  return typeName === 'google.protobuf.ListValue' || typeName === '.google.protobuf.ListValue';
}

export function isStructType(field: FieldDescriptorProto): boolean {
  return isStructTypeName(field.typeName);
}

export function isStructTypeName(typeName: string): boolean {
  return typeName === 'google.protobuf.Struct' || typeName === '.google.protobuf.Struct';
}

export function isLongValueType(field: FieldDescriptorProto): boolean {
  return field.typeName === '.google.protobuf.Int64Value' || field.typeName === '.google.protobuf.UInt64Value';
}

export function isEmptyType(typeName: string): boolean {
  return typeName === '.google.protobuf.Empty';
}

export function valueTypeName(ctx: Context, typeName: string): Code | undefined {
  switch (typeName) {
    case '.google.protobuf.StringValue':
      return code`string`;
    case '.google.protobuf.Int32Value':
    case '.google.protobuf.UInt32Value':
    case '.google.protobuf.DoubleValue':
    case '.google.protobuf.FloatValue':
      return code`number`;
    case '.google.protobuf.Int64Value':
    case '.google.protobuf.UInt64Value':
      // return options ? longTypeName(options) : code`number`;
      return longTypeName(ctx);
    case '.google.protobuf.BoolValue':
      return code`boolean`;
    case '.google.protobuf.BytesValue':
      return ctx.options.env === EnvOption.NODE
        ? code`Buffer`
        : ctx.options.useJsonWireFormat
        ? code`string`
        : code`Uint8Array`;
    case '.google.protobuf.ListValue':
      return code`Array<any>`;
    case '.google.protobuf.Value':
      return code`any`;
    case '.google.protobuf.Struct':
      return code`{[key: string]: any}`;
    case '.google.protobuf.FieldMask':
      return ctx.options.useJsonWireFormat ? code`string` : code`string[]`;
    case '.google.protobuf.Duration':
      return ctx.options.useJsonWireFormat ? code`string` : undefined;
    case '.google.protobuf.Timestamp':
      return ctx.options.useJsonWireFormat ? code`string` : undefined;
    default:
      return undefined;
  }
}

export function wrapperTypeName(typeName: string): string | undefined {
  switch (typeName) {
    case '.google.protobuf.StringValue':
    case '.google.protobuf.Int32Value':
    case '.google.protobuf.UInt32Value':
    case '.google.protobuf.DoubleValue':
    case '.google.protobuf.FloatValue':
    case '.google.protobuf.Int64Value':
    case '.google.protobuf.UInt64Value':
    case '.google.protobuf.BoolValue':
    case '.google.protobuf.BytesValue':
    case '.google.protobuf.ListValue':
    case '.google.protobuf.Timestamp':
    case '.google.protobuf.Struct':
      return typeName.split('.')[3];
    default:
      return undefined;
  }
}

function longTypeName(ctx: Context): Code {
  const { options, utils } = ctx;
  if (options.forceLong === LongOption.LONG) {
    return code`${utils.Long}`;
  } else if (options.forceLong === LongOption.STRING) {
    return code`string`;
  } else {
    return code`number`;
  }
}

/** Maps `.some_proto_namespace.Message` to a TypeName. */
export function messageToTypeName(
  ctx: Context,
  protoType: string,
  typeOptions: { keepValueType?: boolean; repeated?: boolean } = {}
): Code {
  const { options, typeMap } = ctx;
  // Watch for the wrapper types `.google.protobuf.*Value`. If we're mapping
  // them to basic built-in types, we union the type with undefined to
  // indicate the value is optional. Exceptions:
  // - If the field is repeated, values cannot be undefined.
  // - If useOptionals='messages' or useOptionals='all', all non-scalar types
  //   are already optional properties, so there's no need for that union.
  let valueType = valueTypeName(ctx, protoType);
  if (!typeOptions.keepValueType && valueType) {
    if (
      !!typeOptions.repeated ||
      options.useOptionals === true ||
      options.useOptionals === 'messages' ||
      options.useOptionals === 'all'
    ) {
      return valueType;
    }
    return code`${valueType} | undefined`;
  }
  // Look for other special prototypes like Timestamp that aren't technically wrapper types
  if (!typeOptions.keepValueType && protoType === '.google.protobuf.Timestamp') {
    if (options.useDate == DateOption.DATE) {
      return code`Date`;
    }

    if (options.useDate == DateOption.STRING) {
      return code`string`;
    }
  }

  // need to use endsWith instead of === because objectid could be imported from an external proto file
  if (!typeOptions.keepValueType && options.useMongoObjectId && protoType.endsWith('.ObjectId')) {
    return code`mongodb.ObjectId`;
  }
  const [module, type] = toModuleAndType(typeMap, protoType);
  return code`${impProto(options, module, type)}`;
}

/** Breaks `.some_proto_namespace.Some.Message` into `['some_proto_namespace', 'Some_Message', Descriptor]. */
function toModuleAndType(typeMap: TypeMap, protoType: string): [string, string, DescriptorProto | EnumDescriptorProto] {
  return typeMap.get(protoType) || fail(`No type found for ${protoType}`);
}

export function getEnumMethod(ctx: Context, enumProtoType: string, methodSuffix: string): Import {
  const [module, type] = toModuleAndType(ctx.typeMap, enumProtoType);
  return impProto(ctx.options, module, `${camelCase(type)}${methodSuffix}`);
}

/** Return the TypeName for any field (primitive/message/etc.) as exposed in the interface. */
export function toTypeName(ctx: Context, messageDesc: DescriptorProto, field: FieldDescriptorProto): Code {
  let type = basicTypeName(ctx, field, { keepValueType: false });
  if (isRepeated(field)) {
    const mapType = detectMapType(ctx, messageDesc, field);
    if (mapType) {
      const { keyType, valueType } = mapType;
      return code`{ [key: ${keyType} ]: ${valueType} }`;
    }
    return code`${type}[]`;
  }

  if (isValueType(ctx, field)) {
    // google.protobuf.*Value types are already unioned with `undefined`
    // in messageToTypeName, so no need to consider them for that here.
    return type;
  }

  // By default (useOptionals='none', oneof=properties), non-scalar fields
  // outside oneofs and all fields within a oneof clause need to be unioned
  // with `undefined` to indicate the value is optional.
  //
  // When useOptionals='messages' or useOptionals='all', non-scalar fields are
  // translated to optional properties, so no need for the union with
  // `undefined` here.
  //
  // When oneof=unions, we generate a single property for the entire `oneof`
  // clause, spelling each option out inside a large type union. No need for
  // union with `undefined` here, either.
  const { options } = ctx;
  if (
    (!isWithinOneOf(field) &&
      isMessage(field) &&
      (options.useOptionals === false || options.useOptionals === 'none')) ||
    (isWithinOneOf(field) && options.oneof === OneofOption.PROPERTIES) ||
    (isWithinOneOf(field) && field.proto3Optional)
  ) {
    return code`${type} | undefined`;
  }

  return type;
}

export function detectMapType(
  ctx: Context,
  messageDesc: DescriptorProto,
  fieldDesc: FieldDescriptorProto
):
  | {
      messageDesc: DescriptorProto;
      keyField: FieldDescriptorProto;
      keyType: Code;
      valueField: FieldDescriptorProto;
      valueType: Code;
    }
  | undefined {
  const { typeMap } = ctx;
  if (
    fieldDesc.label === FieldDescriptorProto_Label.LABEL_REPEATED &&
    fieldDesc.type === FieldDescriptorProto_Type.TYPE_MESSAGE
  ) {
    const mapType = typeMap.get(fieldDesc.typeName)![2] as DescriptorProto;
    if (!mapType.options?.mapEntry) return undefined;
    const [keyField, valueField] = mapType.field;
    const keyType = toTypeName(ctx, messageDesc, keyField);
    // use basicTypeName because we don't need the '| undefined'
    const valueType = basicTypeName(ctx, valueField);
    return { messageDesc: mapType, keyField, keyType, valueField, valueType };
  }
  return undefined;
}

export function rawRequestType(ctx: Context, methodDesc: MethodDescriptorProto): Code {
  return messageToTypeName(ctx, methodDesc.inputType);
}

export function observableType(ctx: Context): Code {
  if (ctx.options.useAsyncIterable) {
    return code`AsyncIterable`;
  }
  return code`${imp('Observable@rxjs')}`;
}

export function requestType(ctx: Context, methodDesc: MethodDescriptorProto, partial: boolean = false): Code {
  let typeName = rawRequestType(ctx, methodDesc);

  if (partial) {
    typeName = code`${ctx.utils.DeepPartial}<${typeName}>`;
  }

  if (methodDesc.clientStreaming) {
    return code`${observableType(ctx)}<${typeName}>`;
  }
  return typeName;
}

export function responseType(
  ctx: Context,
  methodDesc: MethodDescriptorProto,
  typeOptions: { keepValueType?: boolean; repeated?: boolean } = {}
): Code {
  return messageToTypeName(ctx, methodDesc.outputType, typeOptions);
}

export function responsePromise(ctx: Context, methodDesc: MethodDescriptorProto): Code {
  return code`Promise<${responseType(ctx, methodDesc)}>`;
}

export function responseObservable(ctx: Context, methodDesc: MethodDescriptorProto): Code {
  return code`${observableType(ctx)}<${responseType(ctx, methodDesc)}>`;
}

export function responsePromiseOrObservable(ctx: Context, methodDesc: MethodDescriptorProto): Code {
  const { options } = ctx;
  if (options.returnObservable || methodDesc.serverStreaming) {
    return responseObservable(ctx, methodDesc);
  }
  return responsePromise(ctx, methodDesc);
}

export interface BatchMethod {
  methodDesc: MethodDescriptorProto;
  // a ${package + service + method name} key to identify this method in caches
  uniqueIdentifier: string;
  singleMethodName: string;
  inputFieldName: string;
  inputType: Code;
  outputFieldName: string;
  outputType: Code;
  mapType: boolean;
}

export function detectBatchMethod(
  ctx: Context,
  fileDesc: FileDescriptorProto,
  serviceDesc: ServiceDescriptorProto,
  methodDesc: MethodDescriptorProto
): BatchMethod | undefined {
  const { typeMap } = ctx;
  const nameMatches = methodDesc.name.startsWith('Batch');
  const inputType = typeMap.get(methodDesc.inputType);
  const outputType = typeMap.get(methodDesc.outputType);
  if (nameMatches && inputType && outputType) {
    // TODO: This might be enums?
    const inputTypeDesc = inputType[2] as DescriptorProto;
    const outputTypeDesc = outputType[2] as DescriptorProto;
    if (hasSingleRepeatedField(inputTypeDesc) && hasSingleRepeatedField(outputTypeDesc)) {
      const singleMethodName = methodDesc.name.replace('Batch', 'Get');
      const inputFieldName = inputTypeDesc.field[0].name;
      const inputType = basicTypeName(ctx, inputTypeDesc.field[0]); // e.g. repeated string -> string
      const outputFieldName = outputTypeDesc.field[0].name;
      let outputType = basicTypeName(ctx, outputTypeDesc.field[0]); // e.g. repeated Entity -> Entity
      const mapType = detectMapType(ctx, outputTypeDesc, outputTypeDesc.field[0]);
      if (mapType) {
        outputType = mapType.valueType;
      }
      const uniqueIdentifier = `${maybePrefixPackage(fileDesc, serviceDesc.name)}.${methodDesc.name}`;
      return {
        methodDesc: methodDesc,
        uniqueIdentifier,
        singleMethodName: FormattedMethodDescriptor.formatName(singleMethodName, ctx.options),
        inputFieldName,
        inputType,
        outputFieldName,
        outputType,
        mapType: !!mapType,
      };
    }
  }
  return undefined;
}

function hasSingleRepeatedField(messageDesc: DescriptorProto): boolean {
  return messageDesc.field.length == 1 && messageDesc.field[0].label === FieldDescriptorProto_Label.LABEL_REPEATED;
}
