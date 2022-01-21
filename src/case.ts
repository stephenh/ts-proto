import { Options } from './options';

export function maybeSnakeToCamel(s: string, options: Pick<Options, 'snakeToCamel'>): string {
  if (options.snakeToCamel.includes('keys') && s.includes('_')) {
    const hasLowerCase = !!s.match(/[a-z]/);
    return s
      .split('_')
      .map((word, i) => {
        // If the word is already mixed case, leave the exist case as-is
        word = hasLowerCase ? word : word.toLowerCase();
        return i === 0 ? word : capitalize(word);
      })
      .join('');
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
