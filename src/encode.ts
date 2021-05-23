import { Context } from './context';
import { code, Code, imp, Import } from 'ts-poet';
import { messageToTypeName, wrapperTypeName } from './types';
import { LongOption } from './options';

export function generateEncoder(ctx: Context, typeName: string): Code {
  const name = wrapperTypeName(typeName);
  if (!name) {
    return code`${messageToTypeName(ctx, typeName)}.encode(value).finish()`;
  }

  if (name == 'Timestamp') {
    const TimestampValue = imp(`${name}@./google/protobuf/timestamp`);

    return code`${TimestampValue}.encode(${ctx.utils.toTimestamp}(value)).finish()`;
  }

  const TypeValue = imp(`${name}@./google/protobuf/wrappers`);

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
  let name = wrapperTypeName(typeName);
  if (!name) {
    return code`${messageToTypeName(ctx, typeName)}.decode(value)`;
  }

  let TypeValue: Import;

  if (name == 'Timestamp') {
    TypeValue = imp(`${name}@./google/protobuf/timestamp`);
    return code`${TypeValue}.decode(value)`;
  }

  TypeValue = imp(`${name}@./google/protobuf/wrappers`);

  return code`${TypeValue}.decode(value).value`;
}
