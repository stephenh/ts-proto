import { code, def, Code, joinCode } from "ts-poet";
import { EnumDescriptorProto, EnumValueDescriptorProto } from "ts-proto-descriptors";
import { maybeAddComment } from "./utils";
import { uncapitalize, camelToSnake } from "./case";
import SourceInfo, { Fields } from "./sourceInfo";
import { Context } from "./context";

type UnrecognizedEnum = { present: false } | { present: true; name: string };

// Output the `enum { Foo, A = 0, B = 1 }`
export function generateEnum(
  ctx: Context,
  fullName: string,
  enumDesc: EnumDescriptorProto,
  sourceInfo: SourceInfo,
): Code {
  const { options } = ctx;
  const chunks: Code[] = [];
  let unrecognizedEnum: UnrecognizedEnum = { present: false };

  maybeAddComment(options, sourceInfo, chunks, enumDesc.options?.deprecated);

  if (options.enumsAsLiterals) {
    chunks.push(code`export const ${def(fullName)} = {`);
  } else {
    chunks.push(code`export ${options.constEnums ? "const " : ""}enum ${def(fullName)} {`);
  }

  const delimiter = options.enumsAsLiterals ? ":" : "=";

  enumDesc.value.forEach((valueDesc, index) => {
    const info = sourceInfo.lookup(Fields.enum.value, index);
    const valueName = getValueName(ctx, fullName, valueDesc);
    const memberName = getMemberName(ctx, enumDesc, valueDesc);
    if (valueDesc.number === options.unrecognizedEnumValue) {
      unrecognizedEnum = { present: true, name: memberName };
    }
    maybeAddComment(options, info, chunks, valueDesc.options?.deprecated, `${memberName} - `);
    chunks.push(
      code`${memberName} ${delimiter} ${options.stringEnums ? `"${valueName}"` : valueDesc.number.toString()},`,
    );
  });

  if (options.unrecognizedEnum && !unrecognizedEnum.present) {
    chunks.push(code`
      ${options.unrecognizedEnumName} ${delimiter} ${
      options.stringEnums ? `"${options.unrecognizedEnumName}"` : options.unrecognizedEnumValue.toString()
    },`);
  }

  if (options.enumsAsLiterals) {
    chunks.push(code`} as const`);
    chunks.push(code`\n`);
    chunks.push(code`export type ${def(fullName)} = typeof ${def(fullName)}[keyof typeof ${def(fullName)}]`);
    chunks.push(code`\n`);
    chunks.push(code`export namespace ${def(fullName)} {`);

    enumDesc.value.forEach((valueDesc) => {
      const memberName = getMemberName(ctx, enumDesc, valueDesc);
      chunks.push(code`export type ${memberName} = typeof ${def(fullName)}.${memberName};`);
    });

    if (options.unrecognizedEnum && !unrecognizedEnum.present) {
      chunks.push(
        code`export type ${options.unrecognizedEnumName} = typeof ${def(fullName)}.${options.unrecognizedEnumName};`,
      );
    }

    chunks.push(code`}`);
  } else {
    chunks.push(code`}`);
  }

  if (
    options.outputJsonMethods === true ||
    options.outputJsonMethods === "from-only" ||
    (options.stringEnums && options.outputEncodeMethods)
  ) {
    chunks.push(code`\n`);
    chunks.push(generateEnumFromJson(ctx, fullName, enumDesc, unrecognizedEnum));
  }
  if (options.outputJsonMethods === true || options.outputJsonMethods === "to-only") {
    chunks.push(code`\n`);
    chunks.push(generateEnumToJson(ctx, fullName, enumDesc, unrecognizedEnum));
  }
  if (options.stringEnums && options.outputEncodeMethods) {
    chunks.push(code`\n`);
    chunks.push(generateEnumToNumber(ctx, fullName, enumDesc, unrecognizedEnum));
  }

  return joinCode(chunks, { on: "\n" });
}

/** Generates a function with a big switch statement to decode JSON -> our enum. */
export function generateEnumFromJson(
  ctx: Context,
  fullName: string,
  enumDesc: EnumDescriptorProto,
  unrecognizedEnum: UnrecognizedEnum,
): Code {
  const { options, utils } = ctx;
  const chunks: Code[] = [];

  const functionName = uncapitalize(fullName) + "FromJSON";
  chunks.push(code`export function ${def(functionName)}(object: any): ${fullName} {`);
  chunks.push(code`switch (object) {`);

  for (const valueDesc of enumDesc.value) {
    const memberName = getMemberName(ctx, enumDesc, valueDesc);
    const valueName = getValueName(ctx, fullName, valueDesc);
    chunks.push(code`
      case ${valueDesc.number}:
      case "${valueName}":
        return ${fullName}.${memberName};
    `);
  }

  if (options.unrecognizedEnum) {
    if (!unrecognizedEnum.present) {
      chunks.push(code`
        case ${options.unrecognizedEnumValue}:
        case "${options.unrecognizedEnumName}":
        default:
          return ${fullName}.${options.unrecognizedEnumName};
      `);
    } else {
      chunks.push(code`
        default:
          return ${fullName}.${unrecognizedEnum.name};
      `);
    }
  } else {
    // We use globalThis to avoid conflicts on protobuf types named `Error`.
    chunks.push(code`
      default:
        throw new ${utils.globalThis}.Error("Unrecognized enum value " + object + " for enum ${fullName}");
    `);
  }

  chunks.push(code`}`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

/** Generates a function with a big switch statement to encode our enum -> JSON. */
export function generateEnumToJson(
  ctx: Context,
  fullName: string,
  enumDesc: EnumDescriptorProto,
  unrecognizedEnum: UnrecognizedEnum,
): Code {
  const { options, utils } = ctx;

  const chunks: Code[] = [];

  const functionName = uncapitalize(fullName) + "ToJSON";
  chunks.push(
    code`export function ${def(functionName)}(object: ${fullName}): ${
      ctx.options.useNumericEnumForJson ? "number" : "string"
    } {`,
  );
  chunks.push(code`switch (object) {`);

  for (const valueDesc of enumDesc.value) {
    if (ctx.options.useNumericEnumForJson) {
      const memberName = getMemberName(ctx, enumDesc, valueDesc);
      chunks.push(code`case ${fullName}.${memberName}: return ${valueDesc.number};`);
    } else {
      const memberName = getMemberName(ctx, enumDesc, valueDesc);
      const valueName = getValueName(ctx, fullName, valueDesc);
      chunks.push(code`case ${fullName}.${memberName}: return "${valueName}";`);
    }
  }

  if (options.unrecognizedEnum) {
    if (!unrecognizedEnum.present) {
      chunks.push(code`
        case ${fullName}.${options.unrecognizedEnumName}:`);

      if (ctx.options.useNumericEnumForJson) {
        chunks.push(code`
        default:
          return ${options.unrecognizedEnumValue};
      `);
      } else {
        chunks.push(code`
        default:
          return "${options.unrecognizedEnumName}";
      `);
      }
    } else if (ctx.options.useNumericEnumForJson) {
      chunks.push(code`
        default:
          return ${options.unrecognizedEnumValue};
      `);
    } else {
      chunks.push(code`
      default:
        return "${unrecognizedEnum.name}";
    `);
    }
  } else {
    // We use globalThis to avoid conflicts on protobuf types named `Error`.
    chunks.push(code`
      default:
        throw new ${utils.globalThis}.Error("Unrecognized enum value " + object + " for enum ${fullName}");
    `);
  }

  chunks.push(code`}`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

/** Generates a function with a big switch statement to encode our string enum -> int value. */
export function generateEnumToNumber(
  ctx: Context,
  fullName: string,
  enumDesc: EnumDescriptorProto,
  unrecognizedEnum: UnrecognizedEnum,
): Code {
  const { options, utils } = ctx;

  const chunks: Code[] = [];

  const functionName = uncapitalize(fullName) + "ToNumber";
  chunks.push(code`export function ${def(functionName)}(object: ${fullName}): number {`);
  chunks.push(code`switch (object) {`);
  for (const valueDesc of enumDesc.value) {
    chunks.push(code`case ${fullName}.${getMemberName(ctx, enumDesc, valueDesc)}: return ${valueDesc.number};`);
  }

  if (options.unrecognizedEnum) {
    if (!unrecognizedEnum.present) {
      chunks.push(code`
        case ${fullName}.${options.unrecognizedEnumName}:
        default:
          return ${options.unrecognizedEnumValue};
      `);
    } else {
      chunks.push(code`
        default:
          return ${options.unrecognizedEnumValue};
      `);
    }
  } else {
    // We use globalThis to avoid conflicts on protobuf types named `Error`.
    chunks.push(code`
      default:
        throw new ${utils.globalThis}.Error("Unrecognized enum value " + object + " for enum ${fullName}");
    `);
  }

  chunks.push(code`}`);
  chunks.push(code`}`);
  return joinCode(chunks, { on: "\n" });
}

export function getMemberName(
  ctx: Context,
  enumDesc: EnumDescriptorProto,
  valueDesc: EnumValueDescriptorProto,
): string {
  if (ctx.options.removeEnumPrefix) {
    return valueDesc.name.replace(`${camelToSnake(enumDesc.name)}_`, "");
  }
  return valueDesc.name;
}

function getValueName(ctx: Context, fullName: string, valueDesc: EnumValueDescriptorProto): string {
  return valueDesc.name;
}
