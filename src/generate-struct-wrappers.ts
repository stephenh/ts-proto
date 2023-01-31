import { Context } from "./context";
import { code, Code } from "ts-poet";
import { isAnyValueTypeName, isFieldMaskTypeName, isListValueTypeName, isStructTypeName } from "./types";
import { Options } from "./options";

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
    let setStatement = "struct.fields[key] = Value.wrap(object[key]);";
    if (ctx.options.useMapType) {
      setStatement = "struct.fields.set(key, Value.wrap(object[key]));";
    }
    chunks.push(code`wrap(object: {[key: string]: any} | undefined): Struct {
      const struct = createBaseStruct();
      if (object !== undefined) {
        Object.keys(object).forEach(key => {
          ${setStatement}
        });
      }
      return struct;
    }`);
  }

  if (isAnyValueTypeName(fullProtoTypeName)) {
    // Turn ts-proto representation --> proto representation
    chunks.push(code`wrap(value: any): Value {
      const result = {} as any;
      if (value === null) {
        result.${fieldNames.nullValue} = NullValue.NULL_VALUE;
      } else if (typeof value === 'boolean') {
        result.${fieldNames.boolValue} = value;
      } else if (typeof value === 'number') {
        result.${fieldNames.numberValue} = value;
      } else if (typeof value === 'string') {
        result.${fieldNames.stringValue} = value;
      } else if (Array.isArray(value)) {
        result.${fieldNames.listValue} = ListValue.wrap(value);
      } else if (typeof value === 'object') {
        result.${fieldNames.structValue} = Struct.wrap(value);
      } else if (typeof value !== 'undefined') {
        throw new Error('Unsupported any value type: ' + typeof value);
      }
      return result;
    }`);
  }

  if (isListValueTypeName(fullProtoTypeName)) {
    const maybeReadyOnly = ctx.options.useReadonlyTypes ? "Readonly" : "";
    chunks.push(code`wrap(array: ${maybeReadyOnly}Array<any> | undefined): ListValue {
      return { values: (array ?? []).map(Value.wrap) };
    }`);
  }

  if (isFieldMaskTypeName(fullProtoTypeName)) {
    chunks.push(code`wrap(paths: ${maybeReadonly(ctx.options)} string[]): FieldMask {
      const result = createBaseFieldMask()${maybeAsAny(ctx.options)};
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
      chunks.push(code`unwrap(message: Struct): {[key: string]: any} {
        const object: { [key: string]: any } = {};
        [...message.fields.keys()].forEach((key) => {
          object[key] = Value.unwrap(message.fields.get(key));
        });
        return object;
      }`);
    } else {
      chunks.push(code`unwrap(message: Struct): {[key: string]: any} {
        const object: { [key: string]: any } = {};
        if (message.fields) {
          Object.keys(message.fields).forEach(key => {
            object[key] = Value.unwrap(message.fields[key]);
          });
        }
        return object;
      }`);
    }
  }

  if (isAnyValueTypeName(fullProtoTypeName)) {
    // Put proto encoding into idiomatic ts-proto
    chunks.push(code`unwrap(message: any): string | number | boolean | Object | null | Array<any> | undefined {
      if (message?.hasOwnProperty('${fieldNames.stringValue}') && message.${fieldNames.stringValue} !== undefined) {
        return message.${fieldNames.stringValue};
      } else if (message?.hasOwnProperty('${fieldNames.numberValue}') && message?.${fieldNames.numberValue} !== undefined) {
        return message.${fieldNames.numberValue};
      } else if (message?.hasOwnProperty('${fieldNames.boolValue}') && message?.${fieldNames.boolValue} !== undefined) {
        return message.${fieldNames.boolValue};
      } else if (message?.hasOwnProperty('${fieldNames.structValue}') && message?.${fieldNames.structValue} !== undefined) {
        return Struct.unwrap(message.${fieldNames.structValue} as any);
      } else if (message?.hasOwnProperty('${fieldNames.listValue}') && message?.${fieldNames.listValue} !== undefined) {
        return ListValue.unwrap(message.${fieldNames.listValue});
      } else if (message?.hasOwnProperty('${fieldNames.nullValue}') && message?.${fieldNames.nullValue} !== undefined) {
        return null;
      }
      return undefined;
    }`);
  }

  if (isListValueTypeName(fullProtoTypeName)) {
    chunks.push(code`unwrap(message: ${ctx.options.useReadonlyTypes ? "any" : "ListValue"}): Array<any> {
      if (message?.hasOwnProperty('values') && Array.isArray(message.values)) {
        return message.values.map(Value.unwrap);
      } else {
        return message as any;
      }
    }`);
  }

  if (isFieldMaskTypeName(fullProtoTypeName)) {
    chunks.push(code`unwrap(message: ${ctx.options.useReadonlyTypes ? "any" : "FieldMask"}): string[] {
      return message.paths;
    }`);
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
    if (ctx.options.useMapType) {
      setStatement = "struct.fields.set(key, object[key]);";
    }
    chunks.push(code`wrap(object: {[key: string]: any} | undefined): Struct {
      const struct = createBaseStruct();
      if (object !== undefined) {
        Object.keys(object).forEach(key => {
          ${setStatement}
        });
      }
      return struct;
    }`);
  }

  if (isAnyValueTypeName(fullProtoTypeName)) {
    // Turn ts-proto representation --> proto representation
    chunks.push(code`wrap(value: any): Value {
      const result = {} as any;
      if (value === null) {
        result.${fieldNames.nullValue} = NullValue.NULL_VALUE;
      } else if (typeof value === 'boolean') {
        result.${fieldNames.boolValue} = value;
      } else if (typeof value === 'number') {
        result.${fieldNames.numberValue} = value;
      } else if (typeof value === 'string') {
        result.${fieldNames.stringValue} = value;
      } else if (Array.isArray(value)) {
        result.${fieldNames.listValue} = value;
      } else if (typeof value === 'object') {
        result.${fieldNames.structValue} = value;
      } else if (typeof value !== 'undefined') {
        throw new Error('Unsupported any value type: ' + typeof value);
      }
      return result;
    }`);
  }

  if (isListValueTypeName(fullProtoTypeName)) {
    const maybeReadyOnly = ctx.options.useReadonlyTypes ? "Readonly" : "";
    chunks.push(code`wrap(array: ${maybeReadyOnly}Array<any> | undefined): ListValue {
      return { values: (array ?? []) };
    }`);
  }

  if (isFieldMaskTypeName(fullProtoTypeName)) {
    chunks.push(code`wrap(paths: ${maybeReadonly(ctx.options)} string[]): FieldMask {
      const result = createBaseFieldMask()${maybeAsAny(ctx.options)};
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
      chunks.push(code`unwrap(message: Struct): {[key: string]: any} {
        const object: { [key: string]: any } = {};
        [...message.fields.keys()].forEach((key) => {
          object[key] = message.fields.get(key);
        });
        return object;
      }`);
    } else {
      chunks.push(code`unwrap(message: Struct): {[key: string]: any} {
        const object: { [key: string]: any } = {};
        if (message.fields) {
          Object.keys(message.fields).forEach(key => {
            object[key] = message.fields[key];
          });
        }
        return object;
      }`);
    }
  }

  if (isAnyValueTypeName(fullProtoTypeName)) {
    // Put proto encoding into idiomatic ts-proto
    chunks.push(code`unwrap(message: any): string | number | boolean | Object | null | Array<any> | undefined {
      if (message?.hasOwnProperty('${fieldNames.stringValue}') && message.${fieldNames.stringValue} !== undefined) {
        return message.${fieldNames.stringValue};
      } else if (message?.hasOwnProperty('${fieldNames.numberValue}') && message?.${fieldNames.numberValue} !== undefined) {
        return message.${fieldNames.numberValue};
      } else if (message?.hasOwnProperty('${fieldNames.boolValue}') && message?.${fieldNames.boolValue} !== undefined) {
        return message.${fieldNames.boolValue};
      } else if (message?.hasOwnProperty('${fieldNames.structValue}') && message?.${fieldNames.structValue} !== undefined) {
        return message.${fieldNames.structValue} as any;
      } else if (message?.hasOwnProperty('${fieldNames.listValue}') && message?.${fieldNames.listValue} !== undefined) {
        return message.${fieldNames.listValue};
      } else if (message?.hasOwnProperty('${fieldNames.nullValue}') && message?.${fieldNames.nullValue} !== undefined) {
        return null;
      }
      return undefined;
    }`);
  }

  if (isListValueTypeName(fullProtoTypeName)) {
    chunks.push(code`unwrap(message: ${ctx.options.useReadonlyTypes ? "any" : "ListValue"}): Array<any> {
      if (message?.hasOwnProperty('values') && Array.isArray(message.values)) {
        return message.values;
      } else {
        return message as any;
      }
    }`);
  }

  if (isFieldMaskTypeName(fullProtoTypeName)) {
    chunks.push(code`unwrap(message: ${ctx.options.useReadonlyTypes ? "any" : "FieldMask"}): string[] {
      return message.paths;
    }`);
  }

  return chunks;
}

function maybeReadonly(options: Options): string {
  return options.useReadonlyTypes ? "readonly " : "";
}

function maybeAsAny(options: Options): string {
  return options.useReadonlyTypes ? " as any" : "";
}
