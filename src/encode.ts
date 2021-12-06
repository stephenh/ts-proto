import { Context } from './context';
import { code, Code, imp, Import } from 'ts-poet';
import { messageToTypeName, wrapperTypeName } from './types';
import { LongOption } from './options';

export function generateEncoder(ctx: Context, typeName: string): Code {
  const { options } = ctx;
  const name = wrapperTypeName(typeName);
  if (!name) {
    return code`${messageToTypeName(ctx, typeName, { keepValueType: true })}.encode(value).finish()`;
  }

  if (name == 'Timestamp') {
    const TimestampValue = imp(`${name}@./google/protobuf/timestamp${options.fileSuffix}`);

    return code`${TimestampValue}.encode(${ctx.utils.toTimestamp}(value)).finish()`;
  }

  if (name == 'Struct') {
    const StructType = imp(`${name}@./google/protobuf/struct${options.fileSuffix}`);
    return code`${StructType}.encode(${StructType}.wrap(value)).finish()`;
  }

  if (name == 'ListValue') {
    const ListValueType = imp(`${name}@./google/protobuf/struct${options.fileSuffix}`);
    return code`${ListValueType}.encode({values: value ?? []}).finish()`;
  }

  const TypeValue = imp(`${name}@./google/protobuf/wrappers${options.fileSuffix}`);

  switch (name) {
    case 'StringValue':
      return code`${TypeValue}.encode({value: value ?? ""}).finish()`;
    case 'Int32Value':
    case 'UInt32Value':
    case 'DoubleValue':
    case 'FloatValue':
      return code`${TypeValue}.encode({value: value ?? 0}).finish()`;
    case 'Int64Value':
    case 'UInt64Value':
      if (ctx.options.forceLong === LongOption.LONG) {
        return code`${TypeValue}.encode({value: value ? value.toNumber(): 0}).finish()`;
      }

      return code`${TypeValue}.encode({value: value ?? 0 }).finish()`;
    case 'BoolValue':
      return code`${TypeValue}.encode({value: value ?? false}).finish()`;
    case 'BytesValue':
      return code`${TypeValue}.encode({value: value ?? new Uint8Array()}).finish()`;
  }

  throw new Error(`unknown wrapper type: ${name}`);
}

export function generateDecoder(ctx: Context, typeName: string): Code {
  const { options } = ctx;
  let name = wrapperTypeName(typeName);
  if (!name) {
    return code`${messageToTypeName(ctx, typeName, { keepValueType: true })}.decode(value)`;
  }

  let TypeValue: Import;

  if (name == 'Timestamp') {
    TypeValue = imp(`${name}@./google/protobuf/timestamp${options.fileSuffix}`);
    return code`${TypeValue}.decode(value)`;
  }

  if (name == 'Struct' || name == 'ListValue') {
    TypeValue = imp(`${name}@./google/protobuf/struct${options.fileSuffix}`);
    return code`${TypeValue}.unwrap(${TypeValue}.decode(value))`;
  }

  TypeValue = imp(`${name}@./google/protobuf/wrappers${options.fileSuffix}`);

  return code`${TypeValue}.decode(value).value`;
}
