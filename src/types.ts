import { google } from '../build/pbjs';
import FieldDescriptorProto = google.protobuf.FieldDescriptorProto;

/** Based on https://github.com/dcodeIO/protobuf.js/blob/master/src/types.js#L37. */
export function basicWireType(type: FieldDescriptorProto.Type): number {
  switch (type) {
    case FieldDescriptorProto.Type.TYPE_DOUBLE:
      return 1;
    case FieldDescriptorProto.Type.TYPE_FLOAT:
      return 5;
    case FieldDescriptorProto.Type.TYPE_INT32:
      return 0;
    case FieldDescriptorProto.Type.TYPE_UINT32:
      return 0;
    case FieldDescriptorProto.Type.TYPE_SINT32:
      return 0;
    case FieldDescriptorProto.Type.TYPE_FIXED32:
      return 5;
    case FieldDescriptorProto.Type.TYPE_SFIXED32:
      return 5;
    case FieldDescriptorProto.Type.TYPE_INT64:
      return 0;
    case FieldDescriptorProto.Type.TYPE_UINT64:
      return 0;
    case FieldDescriptorProto.Type.TYPE_SINT64:
      return 0;
    case FieldDescriptorProto.Type.TYPE_FIXED64:
      return 1;
    case FieldDescriptorProto.Type.TYPE_SFIXED64:
      return 1;
    case FieldDescriptorProto.Type.TYPE_BOOL:
      return 0;
    case FieldDescriptorProto.Type.TYPE_STRING:
      return 2;
    case FieldDescriptorProto.Type.TYPE_BYTES:
      return 2;
    default:
      throw new Error('Invalid type ' + type);
  }
}
