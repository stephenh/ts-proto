import { camelCase as camelCaseAnything } from "case-anything";

import { Options } from "./options";

/** Converts `key` to TS/JS camel-case idiom, unless overridden not to. */
export function maybeSnakeToCamel(key: string, options: Pick<Options, "snakeToCamel">): string {
  if (options.snakeToCamel.includes("keys") && key.includes("_")) {
    return snakeToCamel(key);
  } else {
    return key;
  }
}

export function snakeToCamel(s: string): string {
  const hasLowerCase = !!s.match(/[a-z]/);
  return s
    .split("_")
    .map((word, i) => {
      // If the word is already mixed case, leave the existing case as-is
      word = hasLowerCase ? word : word.toLowerCase();
      return i === 0 ? word : capitalize(word);
    })
    .join("");
}

export function camelToSnake(s: string): string {
  return s.replace(/\w([A-Z])/g, (m) => m[0] + "_" + m[1]).toUpperCase();
}

export function capitalize(s: string): string {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}

export function uncapitalize(s: string): string {
  return s.substring(0, 1).toLowerCase() + s.substring(1);
}

/* This function uses the exact same semantics found inside the grpc
 * nodejs library. Camel case splitting must be done by word i.e
 * GetAPIValue must become getApiValue (notice the API becomes Api).
 * This needs to be followed otherwise it will not succeed in the grpc nodejs module.
 */
export function camelCaseGrpc(s: string): string {
  return camelCaseAnything(s);
}
