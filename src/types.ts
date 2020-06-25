import { google } from '../build/pbjs';
import { CodeBlock, Member, TypeName, TypeNames } from 'ts-poet';
import { Options, visit, LongOption, EnvOption, OneofOption } from './main';
import { fail } from './utils';
import { asSequence } from 'sequency';
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;
import DescriptorProto = google.protobuf.DescriptorProto;
import SourceInfo from './sourceInfo';

/** Based on https://github.com/dcodeIO/protobuf.js/blob/master/src/types.js#L37. */
export function basicWireType(type: FieldDescriptorProto.Type): number {
  switch (type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
      return 1;
    case FieldDescriptorProto.Type.TYPE_FLOAT:
      return 5;
    case FieldDescriptorProto.Type.TYPE_INT32:
    case FieldDescriptorProto.Type.TYPE_ENUM:
    case FieldDescriptorProto.Type.TYPE_UINT32:
    case FieldDescriptorProto.Type.TYPE_SINT32:
      return 0;
    case FieldDescriptorProto.Type.TYPE_FIXED32:
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return 5;
    case FieldDescriptorProto.Type.TYPE_INT64:
    case FieldDescriptorProto.Type.TYPE_UINT64:
    case FieldDescriptorProto.Type.TYPE_SINT64:
      return 0;
    case FieldDescriptorProto.Type.TYPE_FIXED64:
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      return 1;
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return 0;
    case FieldDescriptorProto.Type.TYPE_STRING:
    case FieldDescriptorProto.Type.TYPE_BYTES:
      return 2;
    default:
      throw new Error('Invalid type ' + type);
  }
}

export function basicLongWireType(type: FieldDescriptorProto.Type): number | undefined {
  switch (type) {
    case FieldDescriptorProto.Type.TYPE_INT64:
    case FieldDescriptorProto.Type.TYPE_UINT64:
    case FieldDescriptorProto.Type.TYPE_SINT64:
      return 0;
    case FieldDescriptorProto.Type.TYPE_FIXED64:
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      return 1;
    default:
      return undefined;
  }
}

/** Returns the type name without any repeated/required/etc. labels. */
export function basicTypeName(
  typeMap: TypeMap,
  field: FieldDescriptorProto,
  options: Options,
  typeOptions: { keepValueType?: boolean } = {}
): TypeName {
  switch (field.type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
    case FieldDescriptorProto.Type.TYPE_FLOAT:
    case FieldDescriptorProto.Type.TYPE_INT32:
    case FieldDescriptorProto.Type.TYPE_UINT32:
    case FieldDescriptorProto.Type.TYPE_SINT32:
    case FieldDescriptorProto.Type.TYPE_FIXED32:
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return TypeNames.NUMBER;
    case FieldDescriptorProto.Type.TYPE_INT64:
    case FieldDescriptorProto.Type.TYPE_UINT64:
    case FieldDescriptorProto.Type.TYPE_SINT64:
    case FieldDescriptorProto.Type.TYPE_FIXED64:
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      // this handles 2^53, Long is only needed for 2^64; this is effectively pbjs's forceNumber
      if (options.forceLong === LongOption.LONG) {
        return TypeNames.anyType('Long*long');
      } else if (options.forceLong === LongOption.STRING) {
        return TypeNames.STRING;
      } else {
        return TypeNames.NUMBER;
      }
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return TypeNames.BOOLEAN;
    case FieldDescriptorProto.Type.TYPE_STRING:
      return TypeNames.STRING;
    case FieldDescriptorProto.Type.TYPE_BYTES:
      if (options.env === EnvOption.NODE) {
        return TypeNames.BUFFER;
      } else {
        return TypeNames.anyType('Uint8Array');
      }
    case FieldDescriptorProto.Type.TYPE_MESSAGE:
    case FieldDescriptorProto.Type.TYPE_ENUM:
      return messageToTypeName(typeMap, field.typeName, options, { ...typeOptions, repeated: isRepeated(field) });
    default:
      return TypeNames.anyType(field.typeName);
  }
}

/** Returns the Reader method for the primitive's read/write call. */
export function toReaderCall(field: FieldDescriptorProto): string {
  switch (field.type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
      return 'double';
    case FieldDescriptorProto.Type.TYPE_FLOAT:
      return 'float';
    case FieldDescriptorProto.Type.TYPE_INT32:
    case FieldDescriptorProto.Type.TYPE_ENUM:
      return 'int32';
    case FieldDescriptorProto.Type.TYPE_UINT32:
      return 'uint32';
    case FieldDescriptorProto.Type.TYPE_SINT32:
      return 'sint32';
    case FieldDescriptorProto.Type.TYPE_FIXED32:
      return 'fixed32';
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return 'sfixed32';
    case FieldDescriptorProto.Type.TYPE_INT64:
      return 'int64';
    case FieldDescriptorProto.Type.TYPE_UINT64:
      return 'uint64';
    case FieldDescriptorProto.Type.TYPE_SINT64:
      return 'sint64';
    case FieldDescriptorProto.Type.TYPE_FIXED64:
      return 'fixed64';
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      return 'sfixed64';
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return 'bool';
    case FieldDescriptorProto.Type.TYPE_STRING:
      return 'string';
    case FieldDescriptorProto.Type.TYPE_BYTES:
      return 'bytes';
    default:
      throw new Error(`Not a primitive field ${field}`);
  }
}

export function packedType(type: FieldDescriptorProto.Type): number | undefined {
  switch (type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
      return 1;
    case FieldDescriptorProto.Type.TYPE_FLOAT:
      return 5;
    case FieldDescriptorProto.Type.TYPE_INT32:
    case FieldDescriptorProto.Type.TYPE_ENUM:
    case FieldDescriptorProto.Type.TYPE_UINT32:
    case FieldDescriptorProto.Type.TYPE_SINT32:
      return 0;
    case FieldDescriptorProto.Type.TYPE_FIXED32:
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return 5;
    case FieldDescriptorProto.Type.TYPE_INT64:
    case FieldDescriptorProto.Type.TYPE_UINT64:
    case FieldDescriptorProto.Type.TYPE_SINT64:
      return 0;
    case FieldDescriptorProto.Type.TYPE_FIXED64:
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      return 1;
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return 0;
    default:
      return undefined;
  }
}

export function defaultValue(typeMap: TypeMap, field: FieldDescriptorProto, options: Options): any {
  switch (field.type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
    case FieldDescriptorProto.Type.TYPE_FLOAT:
    case FieldDescriptorProto.Type.TYPE_INT32:
    case FieldDescriptorProto.Type.TYPE_UINT32:
    case FieldDescriptorProto.Type.TYPE_SINT32:
    case FieldDescriptorProto.Type.TYPE_FIXED32:
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return 0;
    case FieldDescriptorProto.Type.TYPE_ENUM:
      // proto3 enforces enums starting at 0, however proto2 does not, so we have
      // to probe and see if zero is an allowed value. If it's not, pick the first one.
      // This is probably not great, but it's only used in fromJSON and fromPartial,
      // and I believe the semantics of those in the proto2 world are generally undefined.
      const enumProto = typeMap.get(field.typeName)![2] as EnumDescriptorProto;
      const hasZero = enumProto.value.find((v) => v.number === 0);
      return hasZero ? 0 : enumProto.value[0].number;
    case FieldDescriptorProto.Type.TYPE_UINT64:
    case FieldDescriptorProto.Type.TYPE_FIXED64:
      if (options.forceLong === LongOption.LONG) {
        return CodeBlock.of('%T.UZERO', 'Long*long');
      } else if (options.forceLong === LongOption.STRING) {
        return '"0"';
      } else {
        return 0;
      }
    case FieldDescriptorProto.Type.TYPE_INT64:
    case FieldDescriptorProto.Type.TYPE_SINT64:
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      if (options.forceLong === LongOption.LONG) {
        return CodeBlock.of('%T.ZERO', 'Long*long');
      } else if (options.forceLong === LongOption.STRING) {
        return '"0"';
      } else {
        return 0;
      }
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return false;
    case FieldDescriptorProto.Type.TYPE_STRING:
      return '""';
    case FieldDescriptorProto.Type.TYPE_BYTES:
    case FieldDescriptorProto.Type.TYPE_MESSAGE:
    default:
      return 'undefined';
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

export function isPrimitive(field: FieldDescriptorProto): boolean {
  return !isMessage(field);
}

export function isBytes(field: FieldDescriptorProto): boolean {
  return field.type === FieldDescriptorProto.Type.TYPE_BYTES;
}

export function isMessage(field: FieldDescriptorProto): boolean {
  return field.type === FieldDescriptorProto.Type.TYPE_MESSAGE;
}

export function isEnum(field: FieldDescriptorProto): boolean {
  return field.type === FieldDescriptorProto.Type.TYPE_ENUM;
}

export function isWithinOneOf(field: FieldDescriptorProto): boolean {
  return field.hasOwnProperty('oneofIndex');
}

export function isRepeated(field: FieldDescriptorProto): boolean {
  return field.label === FieldDescriptorProto.Label.LABEL_REPEATED;
}

export function isLong(field: FieldDescriptorProto): boolean {
  return basicLongWireType(field.type) !== undefined;
}

export function isMapType(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  options: Options
): boolean {
  return detectMapType(typeMap, messageDesc, field, options) !== undefined;
}

const valueTypes: { [key: string]: TypeName } = {
  '.google.protobuf.StringValue': TypeNames.STRING,
  '.google.protobuf.Int32Value': TypeNames.NUMBER,
  '.google.protobuf.Int64Value': TypeNames.NUMBER,
  '.google.protobuf.UInt32Value': TypeNames.NUMBER,
  '.google.protobuf.UInt64Value': TypeNames.NUMBER,
  '.google.protobuf.BoolValue': TypeNames.BOOLEAN,
  '.google.protobuf.DoubleValue': TypeNames.NUMBER,
  '.google.protobuf.FloatValue': TypeNames.NUMBER,
  '.google.protobuf.BytesValue': TypeNames.anyType('Uint8Array'),
};

const mappedTypes: { [key: string]: TypeName } = {
  '.google.protobuf.Timestamp': TypeNames.DATE,
};

export function isTimestamp(field: FieldDescriptorProto): boolean {
  return field.typeName === '.google.protobuf.Timestamp';
}

export function isValueType(field: FieldDescriptorProto): boolean {
  return field.typeName in valueTypes;
}

export function isEmptyType(typeName: string): boolean {
  return typeName === '.google.protobuf.Empty';
}

export function valueTypeName(field: FieldDescriptorProto): TypeName {
  if (!isValueType(field)) {
    throw new Error('Type is not a valueType: ' + field.typeName);
  }
  return valueTypes[field.typeName];
}

/** Maps `.some_proto_namespace.Message` to a TypeName. */
export function messageToTypeName(
  typeMap: TypeMap,
  protoType: string,
  options: Options,
  typeOptions: { keepValueType?: boolean; repeated?: boolean } = {}
): TypeName {
  // Watch for the wrapper types `.google.protobuf.*Value`. If we're mapping
  // them to basic built-in types, we union the type with undefined to
  // indicate the value is optional. Exceptions:
  // - If the field is repeated, values cannot be undefined.
  // - If useOptionals=true, all non-scalar types are already optional
  //   properties, so there's no need for that union.
  if (!typeOptions.keepValueType && protoType in valueTypes) {
    let typeName = valueTypes[protoType];
    if (!!typeOptions.repeated || options.useOptionals) {
      return typeName;
    }
    return TypeNames.unionType(typeName, TypeNames.UNDEFINED);
  }
  // Look for other special prototypes like Timestamp that aren't technically wrapper types
  if (!typeOptions.keepValueType && protoType in mappedTypes) {
    return mappedTypes[protoType];
  }
  const [module, type] = toModuleAndType(typeMap, protoType);
  return TypeNames.importedType(`${type}@./${module}`);
}

/** Breaks `.some_proto_namespace.Some.Message` into `['some_proto_namespace', 'Some_Message', Descriptor]. */
function toModuleAndType(typeMap: TypeMap, protoType: string): [string, string, DescriptorProto | EnumDescriptorProto] {
  return typeMap.get(protoType) || fail(`No type found for ${protoType}`);
}

/** Return the TypeName for any field (primitive/message/etc.) as exposed in the interface. */
export function toTypeName(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  field: FieldDescriptorProto,
  options: Options
): TypeName {
  let type = basicTypeName(typeMap, field, options, { keepValueType: false });
  if (isRepeated(field)) {
    const mapType = detectMapType(typeMap, messageDesc, field, options);
    if (mapType) {
      const { keyType, valueType } = mapType;
      return TypeNames.anonymousType(new Member(`[key: ${keyType}]`, valueType));
    }
    return TypeNames.arrayType(type);
  }

  if (isValueType(field)) {
    // google.protobuf.*Value types are already unioned with `undefined`
    // in messageToTypeName, so no need to consider them for that here.
    return type;
  }

  // By default (useOptionals=false, oneof=properties), non-scalar fields
  // outside oneofs and all fields within a oneof clause need to be unioned
  // with `undefined` to indicate the value is optional.
  //
  // When useOptionals=true, non-scalar fields are translated to optional
  // properties, so no need for the union with `undefined` here.
  //
  // When oneof=unions, we generate a single property for the entire `oneof`
  // clause, spelling each option out inside a large type union. No need for
  // union with `undefined` here, either.
  if (
    (!isWithinOneOf(field) && isMessage(field) && !options.useOptionals) ||
    (isWithinOneOf(field) && options.oneof === OneofOption.PROPERTIES)
  ) {
    return TypeNames.unionType(type, TypeNames.UNDEFINED);
  }

  return type;
}

export function detectMapType(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  fieldDesc: FieldDescriptorProto,
  options: Options
): { messageDesc: DescriptorProto; keyType: TypeName; valueType: TypeName } | undefined {
  if (
    fieldDesc.label === FieldDescriptorProto.Label.LABEL_REPEATED &&
    fieldDesc.type === FieldDescriptorProto.Type.TYPE_MESSAGE
  ) {
    const mapType = typeMap.get(fieldDesc.typeName)![2] as DescriptorProto;
    if (!mapType.options?.mapEntry) return undefined;
    const keyType = toTypeName(typeMap, messageDesc, mapType.field[0], options);
    // use basicTypeName because we don't need the '| undefined'
    const valueType = basicTypeName(typeMap, mapType.field[1], options);
    return { messageDesc: mapType, keyType, valueType };
  }
  return undefined;
}
