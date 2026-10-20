import {validateMove} from './validate-move.ts';
import type {WordDictionary} from './dictionary.ts';

export function hasLegalMove(
  currentWord: string,
  usedWords: ReadonlySet<string>,
  dictionary: WordDictionary,
): boolean {
  for (const word of dictionary) {
    const result = validateMove({
      currentWord,
      nextWord: word,
      usedWords,
      dictionary,
    });

    if (result.valid) {
      return true;
    }
  }

  return false;
}
