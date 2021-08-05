import { Options } from './options';

export function maybeSnakeToCamel(s: string, options: Pick<Options, 'snakeToCamel'>): string {
  if (options.snakeToCamel && s.includes('_')) {
    return s
      .split('_')
      .map((word, i) => {
        if (i === 0) {
          // if first symbol is "_" then skip it
          return word ? word[0] + word.substring(1).toLowerCase() : '';
        } else {
          return capitalize(word.toLowerCase());
        }
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
