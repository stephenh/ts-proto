import { google } from '../build/pbjs';
import { Member, TypeName, TypeNames } from 'ts-poet';
import { visit } from './main';
import { fail, upperFirst } from './utils';
import { asSequence } from 'sequency';
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;
import CodeGeneratorRequest = google.protobuf.compiler.CodeGeneratorRequest;
import EnumDescriptorProto = google.protobuf.EnumDescriptorProto;
import DescriptorProto = google.protobuf.DescriptorProto;

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
export function basicTypeName(typeMap: TypeMap, field: FieldDescriptorProto, keepValueType: boolean = false): TypeName {
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
      return TypeNames.NUMBER;
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return TypeNames.BOOLEAN;
    case FieldDescriptorProto.Type.TYPE_STRING:
      return TypeNames.STRING;
    case FieldDescriptorProto.Type.TYPE_BYTES:
      return TypeNames.anyType('Uint8Array');
    case FieldDescriptorProto.Type.TYPE_MESSAGE:
    case FieldDescriptorProto.Type.TYPE_ENUM:
      return messageToTypeName(typeMap, field.typeName, keepValueType);
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

export function defaultValue(type: FieldDescriptorProto.Type): any {
  switch (type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
    case FieldDescriptorProto.Type.TYPE_FLOAT:
    case FieldDescriptorProto.Type.TYPE_INT32:
    case FieldDescriptorProto.Type.TYPE_ENUM:
    case FieldDescriptorProto.Type.TYPE_UINT32:
    case FieldDescriptorProto.Type.TYPE_SINT32:
    case FieldDescriptorProto.Type.TYPE_FIXED32:
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
    case FieldDescriptorProto.Type.TYPE_INT64:
    case FieldDescriptorProto.Type.TYPE_UINT64:
    case FieldDescriptorProto.Type.TYPE_SINT64:
    case FieldDescriptorProto.Type.TYPE_FIXED64:
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      return 0;
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return false;
    case FieldDescriptorProto.Type.TYPE_STRING:
      return '""';
    case FieldDescriptorProto.Type.TYPE_BYTES:
    case FieldDescriptorProto.Type.TYPE_MESSAGE:
      return null;
    default:
      return null;
  }
}

/** A map of proto type name, e.g. `foo.Message.Inner`, to module/class name, e.g. `foo`, `Message_Inner`. */
export type TypeMap = Map<string, [string, string, DescriptorProto | EnumDescriptorProto]>;

/** Scans all of the proto files in `request` and builds a map of proto typeName -> TS module/name. */
export function createTypeMap(request: CodeGeneratorRequest): TypeMap {
  const typeMap: TypeMap = new Map();
  for (const file of request.protoFile) {
    // We assume a file.name of google/protobuf/wrappers.proto --> a module path of google/protobuf/wrapper.ts
    const moduleName = file.name.replace('.proto', '');
    // So given a fullName like FooMessage_InnerMessage, proto will see that as package.name.FooMessage.InnerMessage
    function saveMapping(fullName: string, desc: DescriptorProto | EnumDescriptorProto): void {
      typeMap.set(file.package + '.' + fullName.replace(/_/g, '.'), [moduleName, fullName, desc]);
    }
    visit(file, saveMapping, saveMapping);
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

export function isMapType(typeMap: TypeMap, messageDesc: DescriptorProto, field: FieldDescriptorProto): boolean {
  return detectMapType(typeMap, messageDesc, field) !== undefined;
}

const valueTypes: { [key: string]: TypeName } = {
  '.google.protobuf.StringValue': TypeNames.unionType(TypeNames.STRING, TypeNames.UNDEFINED),
  '.google.protobuf.Int32Value': TypeNames.unionType(TypeNames.NUMBER, TypeNames.UNDEFINED),
  '.google.protobuf.BoolValue': TypeNames.unionType(TypeNames.BOOLEAN, TypeNames.UNDEFINED)
};

const mappedTypes: { [key: string]: TypeName } = {
  '.google.protobuf.Timestamp': TypeNames.DATE
};

export function isTimestamp(field: FieldDescriptorProto): boolean {
  return field.typeName === '.google.protobuf.Timestamp';
}

export function isValueType(field: FieldDescriptorProto): boolean {
  return field.typeName in valueTypes;
}

/** Maps `.some_proto_namespace.Message` to a TypeName. */
export function messageToTypeName(typeMap: TypeMap, protoType: string, keepValueType: boolean = false): TypeName {
  // Watch for the wrapper types `.google.protobuf.StringValue` and map to `string | undefined`
  if (!keepValueType && protoType in valueTypes) {
    return valueTypes[protoType];
  }
  // Look for other special prototypes like Timestamp that aren't technically wrapper types
  if (!keepValueType && protoType in mappedTypes) {
    return mappedTypes[protoType];
  }
  const [module, type] = toModuleAndType(typeMap, protoType);
  return TypeNames.importedType(`${type}@./${module}`);
}

/** Breaks `.some_proto_namespace.Some.Message` into `['some_proto_namespace', 'Some_Message', Descriptor]. */
function toModuleAndType(typeMap: TypeMap, protoType: string): [string, string, DescriptorProto | EnumDescriptorProto] {
  return typeMap.get(protoType.substring(1)) || fail(`No type found for ${protoType}`);
}

/** Return the TypeName for any field (primitive/message/etc.) as exposed in the interface. */
export function toTypeName(typeMap: TypeMap, messageDesc: DescriptorProto, field: FieldDescriptorProto): TypeName {
  let type = basicTypeName(typeMap, field, false);
  if (isRepeated(field)) {
    const mapType = detectMapType(typeMap, messageDesc, field);
    if (mapType) {
      const { keyType, valueType } = mapType;
      type = TypeNames.anonymousType(new Member(`[key: ${keyType}]`, valueType));
    } else {
      type = TypeNames.arrayType(type);
    }
  } else if ((isWithinOneOf(field) || isMessage(field)) && !isValueType(field)) {
    type = TypeNames.unionType(type, TypeNames.UNDEFINED);
  }
  return type;
}

export function detectMapType(
  typeMap: TypeMap,
  messageDesc: DescriptorProto,
  fieldDesc: FieldDescriptorProto
): { messageDesc: DescriptorProto; keyType: TypeName; valueType: TypeName } | undefined {
  if (
    fieldDesc.label === FieldDescriptorProto.Label.LABEL_REPEATED &&
    fieldDesc.type === FieldDescriptorProto.Type.TYPE_MESSAGE
  ) {
    return messageDesc.nestedType
      .filter(
        t =>
          t.name === `${upperFirst(fieldDesc.name)}Entry` &&
          (t.options !== undefined && t.options != null && t.options.mapEntry)
      )
      .map(mapType => {
        const keyType = toTypeName(typeMap, messageDesc, mapType.field[0]);
        // use basicTypeName because we don't need the '| undefined'
        const valueType = basicTypeName(typeMap, mapType.field[1]);
        return { messageDesc: mapType, keyType, valueType };
      })
      .find(_ => true);
  }
  return undefined;
}

function createOneOfsMap(message: DescriptorProto): Map<string, FieldDescriptorProto[]> {
  return asSequence(message.field)
    .filter(isWithinOneOf)
    .groupBy(f => {
      return message.oneofDecl[f.oneofIndex].name;
    });
}
