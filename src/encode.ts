import { Context } from "./context";
import { code, Code, Import } from "ts-poet";
import { messageToTypeName, wrapperTypeName } from "./types";
import { DateOption, LongOption } from "./options";
import { impProto } from "./utils";

export function generateEncoder(ctx: Context, typeName: string): Code {
  const name = wrapperTypeName(typeName);
  if (!name) {
    return code`${messageToTypeName(ctx, typeName, { keepValueType: true })}.encode(value).finish()`;
  }

  if (name == "Timestamp") {
    const TimestampValue = impProto(ctx.options, "google/protobuf/timestamp", name);

    let value = code`value`;
    if (ctx.options.useDate === DateOption.DATE || ctx.options.useDate === DateOption.STRING) {
      value = code`${ctx.utils.toTimestamp}(${value})`;
    }
    return code`${TimestampValue}.encode(${value}).finish()`;
  }

  if (name == "Struct") {
    const StructType = impProto(ctx.options, "google/protobuf/struct", name);
    return code`${StructType}.encode(${StructType}.wrap(value)).finish()`;
  }

  if (name == "ListValue") {
    const ListValueType = impProto(ctx.options, "google/protobuf/struct", name);
    return code`${ListValueType}.encode({values: value ?? []}).finish()`;
  }

  const TypeValue = impProto(ctx.options, "google/protobuf/wrappers", name);

  switch (name) {
    case "StringValue":
      return code`${TypeValue}.encode({value: value ?? ""}).finish()`;
    case "Int32Value":
    case "UInt32Value":
    case "DoubleValue":
    case "FloatValue":
      return code`${TypeValue}.encode({value: value ?? 0}).finish()`;
    case "Int64Value":
    case "UInt64Value":
      if (ctx.options.forceLong === LongOption.LONG) {
        return code`${TypeValue}.encode({value: value ? value.toNumber(): 0}).finish()`;
      }

      return code`${TypeValue}.encode({value: value ?? 0 }).finish()`;
    case "BoolValue":
      return code`${TypeValue}.encode({value: value ?? false}).finish()`;
    case "BytesValue":
      return code`${TypeValue}.encode({value: value ?? new Uint8Array(0)}).finish()`;
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

  if (name == "Timestamp") {
    TypeValue = impProto(ctx.options, "google/protobuf/timestamp", name);

    const decoder = code`${TypeValue}.decode(value)`;
    if (ctx.options.useDate === DateOption.DATE || ctx.options.useDate === DateOption.STRING) {
      return code`${ctx.utils.fromTimestamp}(${decoder})`;
    }
    return decoder;
  }

  if (name == "Struct" || name == "ListValue") {
    TypeValue = impProto(ctx.options, "google/protobuf/struct", name);
    return code`${TypeValue}.unwrap(${TypeValue}.decode(value))`;
  }

  TypeValue = impProto(ctx.options, "google/protobuf/wrappers", name);

  return code`${TypeValue}.decode(value).value`;
}
