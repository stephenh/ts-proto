import { Options } from './options';

export function maybeSnakeToCamel(s: string, options: Options): string {
  if (options.snakeToCamel) {
    return s.replace(/(\_\w)/g, (m) => m[1].toUpperCase());
  } else {
    return s;
  }
}

export function camelToSnake(s: string): string {
  return s
    .replace(/[\w]([A-Z])/g, function (m) {
      return m[0] + '_' + m[1];
    })
    .toUpperCase();
}

export function capitalize(s: string): string {
  return s.substring(0, 1).toUpperCase() + s.substring(1);
}

export function camelCase(s: string): string {
  return s.substring(0, 1).toLowerCase() + s.substring(1);
}
