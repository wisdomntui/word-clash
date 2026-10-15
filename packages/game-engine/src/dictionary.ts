import {normalizeWord} from './word-history.ts';

export type WordDictionary = ReadonlySet<string>;

export function createWordDictionary(words: Iterable<string>): WordDictionary {
  return new Set(Array.from(words, normalizeWord).filter(Boolean));
}

export function isDictionaryWord(
  word: string,
  dictionary: WordDictionary,
): boolean {
  return dictionary.has(normalizeWord(word));
}
