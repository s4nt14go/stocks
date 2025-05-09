import { fileURLToPath } from 'url';
import { dirname } from 'path';

export function prefixSrcDir(slug: string) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  return `${__dirname}/../${slug}`;
}

export function nonEmpty<T>(input: T[]) {
  if (!input.length) throw Error('Array is empty');
  return input as [T, ...T[]];
}
