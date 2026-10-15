import {createWordDictionary} from './dictionary.ts';
import type {WordDictionary} from './dictionary.ts';

export function parseDictionary(contents: string): WordDictionary {
  const words = contents
    .split(/\r?\n/)
    .map((word) => word.trim().toLowerCase())
    .filter((word) => /^[a-z]+$/.test(word));

  return createWordDictionary(words);
}
