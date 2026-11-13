import { Context } from "./context";
import { code, Code } from "ts-poet";
import { getMessageMethod, wrapperTypeName } from "./types";
import { DateOption, LongOption } from "./options";

export function generateEncoder(ctx: Context, typeName: string): Code {
  const name = wrapperTypeName(typeName);
  const encode = getMessageMethod(ctx, typeName, "encode");
  if (!name) {
    return code`${encode}(value).finish()`;
  }

  if (name == "Timestamp") {
    let value = code`value`;
    if (
      ctx.options.useDate === DateOption.DATE ||
      ctx.options.useDate === DateOption.STRING ||
      ctx.options.useDate === DateOption.STRING_NANO ||
      ctx.options.useDate === DateOption.TEMPORAL
    ) {
      value = code`${ctx.utils.toTimestamp}(${value})`;
    }
    return code`${encode}(${value}).finish()`;
  }

  if (name == "Struct" || name == "Value") {
    return code`${encode}(${getMessageMethod(ctx, typeName, "wrap")}(value)).finish()`;
  }

  if (name == "ListValue") {
    return code`${encode}({values: value ?? []}).finish()`;
  }

  switch (name) {
    case "StringValue":
      return code`${encode}({value: value ?? ""}).finish()`;
    case "Int32Value":
    case "UInt32Value":
    case "DoubleValue":
    case "FloatValue":
      return code`${encode}({value: value ?? 0}).finish()`;
    case "Int64Value":
    case "UInt64Value":
      if (ctx.options.forceLong === LongOption.LONG) {
        return code`${encode}({value: value ? value.toNumber(): 0}).finish()`;
      }

      return code`${encode}({value: value ?? 0 }).finish()`;
    case "BoolValue":
      return code`${encode}({value: value ?? false}).finish()`;
    case "BytesValue":
      return code`${encode}({value: value ?? new Uint8Array(0)}).finish()`;
  }

  throw new Error(`unknown wrapper type: ${name}`);
}

export function generateDecoder(ctx: Context, typeName: string): Code {
  const { options } = ctx;
  let name = wrapperTypeName(typeName);
  const decoder = code`${getMessageMethod(ctx, typeName, "decode")}(value)`;
  if (!name) {
    return decoder;
  }

  if (name == "Timestamp") {
    if (
      ctx.options.useDate === DateOption.DATE ||
      ctx.options.useDate === DateOption.STRING ||
      ctx.options.useDate === DateOption.STRING_NANO ||
      ctx.options.useDate === DateOption.TEMPORAL
    ) {
      return code`${ctx.utils.fromTimestamp}(${decoder})`;
    }
    return decoder;
  }

  if (name == "Struct" || name == "ListValue" || name == "Value") {
    return code`${getMessageMethod(ctx, typeName, "unwrap")}(${decoder})`;
  }

  return code`${decoder}.value`;
}
