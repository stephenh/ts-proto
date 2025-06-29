import { Context } from "./context";
import { code, Code } from "ts-poet";
import { wrapTypeName } from "./utils";
import { isAnyValueTypeName, isFieldMaskTypeName, isListValueTypeName, isStructTypeName } from "./types";
import { OneofOption, Options } from "./options";

export type StructFieldNames = {
  nullValue: string;
  numberValue: string;
  stringValue: string;
  boolValue: string;
  structValue: string;
  listValue: string;
};

/** Whether we need to generate `.wrap` and `.unwrap` methods for the given type. */
export function isWrapperType(fullProtoTypeName: string): boolean {
  return (
    isStructTypeName(fullProtoTypeName) ||
    isAnyValueTypeName(fullProtoTypeName) ||
    isListValueTypeName(fullProtoTypeName) ||
    isFieldMaskTypeName(fullProtoTypeName)
  );
}

/**
 * Converts ts-proto's idiomatic Struct/Value/ListValue representation to the proto messages.
 *
 * We do this deeply b/c NestJS does not invoke wrappers recursively.
 */
export function generateWrapDeep(ctx: Context, fullProtoTypeName: string, fieldNames: StructFieldNames): Code[] {
  const chunks: Code[] = [];
  if (isStructTypeName(fullProtoTypeName)) {
    let setStatement = `struct.fields[key] = ${wrapTypeName(ctx.options, "Value")}.wrap(object[key]);`;
    let defaultFields = "struct.fields ??= {};";
    if (ctx.options.useMapType) {
      setStatement = `struct.fields.set(key, ${wrapTypeName(ctx.options, "Value")}.wrap(object[key]));`;
      defaultFields = "struct.fields ??= new Map<string, any | undefined>();";
    }
    if (ctx.options.useOptionals !== "all") defaultFields = "";

    chunks.push(code`wrap(object: {[key: string]: any} | undefined): ${wrapTypeName(ctx.options, "Struct")} {
      const struct = createBase${wrapTypeName(ctx.options, "Struct")}();
      ${defaultFields}
      if (object !== undefined) {
        for (const key of Object.keys(object)) {
          ${setStatement}
        }
      }
      return struct;
    }`);
  }

  if (isAnyValueTypeName(fullProtoTypeName)) {
    // Turn ts-proto representation --> proto representation
    chunks.push(code`wrap(value: any): ${wrapTypeName(ctx.options, "Value")} {
      const result = {} as any;
      if (value === null) {
        result.${fieldNames.nullValue} = ${wrapTypeName(ctx.options, "NullValue")}.NULL_VALUE;
      } else if (typeof value === 'boolean') {
        result.${fieldNames.boolValue} = value;
      } else if (typeof value === 'number') {
        result.${fieldNames.numberValue} = value;
      } else if (typeof value === 'string') {
        result.${fieldNames.stringValue} = value;
      } else if (${ctx.utils.globalThis}.Array.isArray(value)) {
        result.${fieldNames.listValue} = ${wrapTypeName(ctx.options, "ListValue")}.wrap(value);
      } else if (typeof value === 'object') {
        result.${fieldNames.structValue} = ${wrapTypeName(ctx.options, "Struct")}.wrap(value);
      } else if (typeof value !== 'undefined') {
        throw new ${ctx.utils.globalThis}.Error('Unsupported any value type: ' + typeof value);
      }
      return result;
    }`);
  }

  if (isListValueTypeName(fullProtoTypeName)) {
    const maybeReadyOnly = ctx.options.useReadonlyTypes ? "Readonly" : "";
    chunks.push(code`wrap(array: ${maybeReadyOnly}Array<any> | undefined): ${wrapTypeName(ctx.options, "ListValue")} {
      const result = createBase${wrapTypeName(ctx.options, "ListValue")}()${maybeAsAny(ctx.options)};
      result.values = (array ?? []).map(${wrapTypeName(ctx.options, "Value")}.wrap);
      return result;
    }`);
  }

  if (isFieldMaskTypeName(fullProtoTypeName)) {
    chunks.push(code`wrap(paths: ${maybeReadonly(ctx.options)} string[]): ${wrapTypeName(ctx.options, "FieldMask")} {
      const result = createBase${wrapTypeName(ctx.options, "FieldMask")}()${maybeAsAny(ctx.options)};
      result.paths = paths;
      return result;
    }`);
  }

  return chunks;
}

/**
 * Converts proto's Struct/Value?listValue messages to ts-proto's idiomatic representation.
 *
 * We do this deeply b/c NestJS does not invoke wrappers recursively.
 */
export function generateUnwrapDeep(ctx: Context, fullProtoTypeName: string, fieldNames: StructFieldNames): Code[] {
  const chunks: Code[] = [];
  if (isStructTypeName(fullProtoTypeName)) {
    if (ctx.options.useMapType) {
      chunks.push(code`unwrap(message: ${wrapTypeName(ctx.options, "Struct")}: {[key: string]: any} {
        const object: { [key: string]: any } = {};
        if (message.fields) {
          for (const key of message.fields.keys()) {
            object[key] = Value.unwrap(message.fields.get(key));
          }
        }
        return object;
      }`);
    } else {
      chunks.push(code`unwrap(message: ${wrapTypeName(ctx.options, "Struct")}): {[key: string]: any} {
        const object: { [key: string]: any } = {};
        if (message.fields) {
          for (const key of Object.keys(message.fields)) {
            object[key] = Value.unwrap(message.fields[key]);
          }
        }
        return object;
      }`);
    }
  }

  if (isAnyValueTypeName(fullProtoTypeName)) {
    // We check hasOwnProperty because the incoming `message` has been serde-ing
    // by the NestJS/protobufjs runtime, and so has a base class with default values
    // that throw off the simpler checks we do in generateUnwrapShallow
    chunks.push(code`unwrap(message: any): string | number | boolean | Object | null | Array<any> | undefined {
      if (message?.hasOwnProperty('${fieldNames.stringValue}') && message.${fieldNames.stringValue} !== undefined) {
        return message.${fieldNames.stringValue};
      } else if (message?.hasOwnProperty('${fieldNames.numberValue}') && message?.${
        fieldNames.numberValue
      } !== undefined) {
        return message.${fieldNames.numberValue};
      } else if (message?.hasOwnProperty('${fieldNames.boolValue}') && message?.${fieldNames.boolValue} !== undefined) {
        return message.${fieldNames.boolValue};
      } else if (message?.hasOwnProperty('${fieldNames.structValue}') && message?.${
        fieldNames.structValue
      } !== undefined) {
        return ${wrapTypeName(ctx.options, "Struct")}.unwrap(message.${fieldNames.structValue} as any);
      } else if (message?.hasOwnProperty('${fieldNames.listValue}') && message?.${fieldNames.listValue} !== undefined) {
        return ${wrapTypeName(ctx.options, "ListValue")}.unwrap(message.${fieldNames.listValue});
      } else if (message?.hasOwnProperty('${fieldNames.nullValue}') && message?.${fieldNames.nullValue} !== undefined) {
        return null;
      }
      return undefined;
    }`);
  }

  if (isListValueTypeName(fullProtoTypeName)) {
    chunks.push(code`unwrap(message: ${
      ctx.options.useReadonlyTypes ? "any" : wrapTypeName(ctx.options, "ListValue")
    }): Array<any> {
      if (message?.hasOwnProperty('values') && ${ctx.utils.globalThis}.Array.isArray(message.values)) {
        return message.values.map(Value.unwrap);
      } else {
        return message as any;
      }
    }`);
  }

  if (isFieldMaskTypeName(fullProtoTypeName)) {
    chunks.push(generateFieldMaskUnwrap(ctx));
  }

  return chunks;
}

/**
 * Converts ts-proto's idiomatic Struct/Value/ListValue representation to the proto messages.
 *
 * We do this shallow's b/c ts-proto's encode methods handle the recursion.
 */
export function generateWrapShallow(ctx: Context, fullProtoTypeName: string, fieldNames: StructFieldNames): Code[] {
  const chunks: Code[] = [];
  if (isStructTypeName(fullProtoTypeName)) {
    let setStatement = "struct.fields[key] = object[key];";
    let defaultFields = "struct.fields ??= {};";
    if (ctx.options.useMapType) {
      setStatement = "struct.fields.set(key, object[key]);";
      defaultFields = "struct.fields ??= new Map<string, any | undefined>();";
    }
    if (ctx.options.useOptionals !== "all") defaultFields = "";

    chunks.push(code`wrap(object: {[key: string]: any} | undefined): ${wrapTypeName(ctx.options, "Struct")} {
      const struct = createBase${wrapTypeName(ctx.options, "Struct")}();
      ${defaultFields}
      if (object !== undefined) {
        for (const key of Object.keys(object)) {
          ${setStatement}
        }
      }
      return struct;
    }`);
  }

  if (isAnyValueTypeName(fullProtoTypeName)) {
    if (ctx.options.oneof === OneofOption.UNIONS) {
      chunks.push(code`wrap(value: any): ${wrapTypeName(ctx.options, "Value")} {
        const result = createBase${wrapTypeName(ctx.options, "Value")}()${maybeAsAny(ctx.options)};
        if (value === null) {
          result.kind = {$case: '${fieldNames.nullValue}', ${fieldNames.nullValue}: ${wrapTypeName(
            ctx.options,
            "NullValue",
          )}.NULL_VALUE};
        } else if (typeof value === 'boolean') {
          result.kind = {$case: '${fieldNames.boolValue}', ${fieldNames.boolValue}: value};
        } else if (typeof value === 'number') {
          result.kind = {$case: '${fieldNames.numberValue}', ${fieldNames.numberValue}: value};
        } else if (typeof value === 'string') {
          result.kind = {$case: '${fieldNames.stringValue}', ${fieldNames.stringValue}: value};
        } else if (${ctx.utils.globalThis}.Array.isArray(value)) {
          result.kind = {$case: '${fieldNames.listValue}', ${fieldNames.listValue}: value};
        } else if (typeof value === 'object') {
          result.kind = {$case: '${fieldNames.structValue}', ${fieldNames.structValue}: value};
        } else if (typeof value !== 'undefined') {
          throw new ${ctx.utils.globalThis}.Error('Unsupported any value type: ' + typeof value);
        }
        return result;
    }`);
    } else if (ctx.options.oneof === OneofOption.UNIONS_VALUE) {
      chunks.push(code`wrap(value: any): ${wrapTypeName(ctx.options, "Value")} {
        const result = createBase${wrapTypeName(ctx.options, "Value")}()${maybeAsAny(ctx.options)};
        if (value === null) {
          result.kind = {$case: '${fieldNames.nullValue}', value };
        } else if (typeof value === 'boolean') {
          result.kind = {$case: '${fieldNames.boolValue}', value };
        } else if (typeof value === 'number') {
          result.kind = {$case: '${fieldNames.numberValue}', value };
        } else if (typeof value === 'string') {
          result.kind = {$case: '${fieldNames.stringValue}', value };
        } else if (${ctx.utils.globalThis}.Array.isArray(value)) {
          result.kind = {$case: '${fieldNames.listValue}', value };
        } else if (typeof value === 'object') {
          result.kind = {$case: '${fieldNames.structValue}', value };
        } else if (typeof value !== 'undefined') {
          throw new ${ctx.utils.globalThis}.Error('Unsupported any value type: ' + typeof value);
        }
        return result;
    }`);
    } else {
      chunks.push(code`wrap(value: any): ${wrapTypeName(ctx.options, "Value")} {
        const result = createBase${wrapTypeName(ctx.options, "Value")}()${maybeAsAny(ctx.options)};
        if (value === null) {
          result.${fieldNames.nullValue} = ${wrapTypeName(ctx.options, "NullValue")}.NULL_VALUE;
        } else if (typeof value === 'boolean') {
          result.${fieldNames.boolValue} = value;
        } else if (typeof value === 'number') {
          result.${fieldNames.numberValue} = value;
        } else if (typeof value === 'string') {
          result.${fieldNames.stringValue} = value;
        } else if (${ctx.utils.globalThis}.Array.isArray(value)) {
          result.${fieldNames.listValue} = value;
        } else if (typeof value === 'object') {
          result.${fieldNames.structValue} = value;
        } else if (typeof value !== 'undefined') {
          throw new ${ctx.utils.globalThis}.Error('Unsupported any value type: ' + typeof value);
        }
        return result;
      }`);
    }
  }

  if (isListValueTypeName(fullProtoTypeName)) {
    const maybeReadyOnly = ctx.options.useReadonlyTypes ? "Readonly" : "";
    chunks.push(code`wrap(array: ${maybeReadyOnly}Array<any> | undefined): ${wrapTypeName(ctx.options, "ListValue")} {
      const result = createBase${wrapTypeName(ctx.options, "ListValue")}()${maybeAsAny(ctx.options)};
      result.values = array ?? [];
      return result;
    }`);
  }

  if (isFieldMaskTypeName(fullProtoTypeName)) {
    chunks.push(code`wrap(paths: ${maybeReadonly(ctx.options)} string[]): ${wrapTypeName(ctx.options, "FieldMask")} {
      const result = createBase${wrapTypeName(ctx.options, "FieldMask")}()${maybeAsAny(ctx.options)};
      result.paths = paths;
      return result;
    }`);
  }

  return chunks;
}

/**
 * Converts proto's Struct/Value?listValue messages to ts-proto's idiomatic representation.
 *
 * We do this shallowly b/c ts-proto's decode methods handle recursion.
 */
export function generateUnwrapShallow(ctx: Context, fullProtoTypeName: string, fieldNames: StructFieldNames): Code[] {
  const chunks: Code[] = [];
  if (isStructTypeName(fullProtoTypeName)) {
    if (ctx.options.useMapType) {
      chunks.push(code`unwrap(message: ${wrapTypeName(ctx.options, "Struct")}): {[key: string]: any} {
        const object: { [key: string]: any } = {};
        if (message.fields) {
          for (const key of message.fields.keys()) {
            object[key] = message.fields.get(key);
          }
        }
        return object;
      }`);
    } else {
      chunks.push(code`unwrap(message: ${wrapTypeName(ctx.options, "Struct")}): {[key: string]: any} {
        const object: { [key: string]: any } = {};
        if (message.fields) {
          for (const key of Object.keys(message.fields)) {
            object[key] = message.fields[key];
          }
        }
        return object;
      }`);
    }
  }

  if (isAnyValueTypeName(fullProtoTypeName)) {
    if (ctx.options.oneof === OneofOption.UNIONS) {
      chunks.push(code`unwrap(message: ${wrapTypeName(
        ctx.options,
        "Value",
      )}): string | number | boolean | Object | null | Array<any> | undefined {
        if (message.kind?.$case === '${fieldNames.nullValue}') {
          return null;
        } else if (message.kind?.$case === '${fieldNames.numberValue}') {
          return message.kind?.${fieldNames.numberValue};
        } else if (message.kind?.$case === '${fieldNames.stringValue}') {
          return message.kind?.${fieldNames.stringValue};
        } else if (message.kind?.$case === '${fieldNames.boolValue}') {
          return message.kind?.${fieldNames.boolValue};
        } else if (message.kind?.$case === '${fieldNames.structValue}') {
          return message.kind?.${fieldNames.structValue};
        } else if (message.kind?.$case === '${fieldNames.listValue}') {
          return message.kind?.${fieldNames.listValue};
        } else {
          return undefined;
        }
      }`);
    } else if (ctx.options.oneof === OneofOption.UNIONS_VALUE) {
      chunks.push(code`unwrap(message: ${wrapTypeName(
        ctx.options,
        "Value",
      )}): string | number | boolean | Object | null | Array<any> | undefined {
        return message.kind?.value;
      }`);
    } else {
      chunks.push(code`unwrap(message: any): string | number | boolean | Object | null | Array<any> | undefined {
        if (message.${fieldNames.stringValue} !== undefined) {
          return message.${fieldNames.stringValue};
        } else if (message?.${fieldNames.numberValue} !== undefined) {
          return message.${fieldNames.numberValue};
        } else if (message?.${fieldNames.boolValue} !== undefined) {
          return message.${fieldNames.boolValue};
        } else if (message?.${fieldNames.structValue} !== undefined) {
          return message.${fieldNames.structValue} as any;
        } else if (message?.${fieldNames.listValue} !== undefined) {
          return message.${fieldNames.listValue};
        } else if (message?.${fieldNames.nullValue} !== undefined) {
          return null;
        }
        return undefined;
      }`);
    }
  }

  if (isListValueTypeName(fullProtoTypeName)) {
    chunks.push(code`unwrap(message: ${
      ctx.options.useReadonlyTypes ? "any" : wrapTypeName(ctx.options, "ListValue")
    }): Array<any> {
      if (message?.hasOwnProperty('values') && ${ctx.utils.globalThis}.Array.isArray(message.values)) {
        return message.values;
      } else {
        return message as any;
      }
    }`);
  }

  if (isFieldMaskTypeName(fullProtoTypeName)) {
    chunks.push(generateFieldMaskUnwrap(ctx));
  }

  return chunks;
}

function generateFieldMaskUnwrap(ctx: Context): Code {
  const returnType = ctx.options.useOptionals === "all" ? "string[] | undefined" : "string[]";
  const pathModifier = ctx.options.useOptionals === "all" ? "?" : "";

  return code`unwrap(message: ${
    ctx.options.useReadonlyTypes ? "any" : wrapTypeName(ctx.options, "FieldMask")
  }): ${returnType} {
    return message${pathModifier}.paths;
  }`;
}

function maybeReadonly(options: Options): string {
  return options.useReadonlyTypes ? "readonly " : "";
}

function maybeAsAny(options: Options): string {
  return options.useReadonlyTypes ? " as any" : "";
}
