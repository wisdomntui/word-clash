import {hasWordBeenUsed, normalizeWord} from './word-history.ts';
import {differsByOneLetter} from './word-rules.ts';
import {isDictionaryWord, type WordDictionary} from './dictionary.ts';

export enum Reason {
  EMPTY_WORD = 'EMPTY_WORD',
  INVALID_TRANSFORMATION = 'INVALID_TRANSFORMATION',
  WORD_ALREADY_USED = 'WORD_ALREADY_USED',
  WORD_NOT_IN_DICTIONARY = 'WORD_NOT_IN_DICTIONARY',
}

export type MoveValidationResult =
  | {valid: true; word: string}
  | {
      valid: false;
      reason: Reason;
    };

export interface ValidateMoveInput {
  currentWord: string;
  nextWord: string;
  usedWords: ReadonlySet<string>;
  dictionary: WordDictionary;
}

export function validateMove({
  currentWord,
  nextWord,
  usedWords,
  dictionary,
}: ValidateMoveInput): MoveValidationResult {
  const normalizedCurrentWord = normalizeWord(currentWord);
  const normalizedNextWord = normalizeWord(nextWord);

  if (!normalizedNextWord) {
    return {valid: false, reason: Reason.EMPTY_WORD};
  }

  if (!differsByOneLetter(normalizedCurrentWord, normalizedNextWord)) {
    return {valid: false, reason: Reason.INVALID_TRANSFORMATION};
  }

  if (hasWordBeenUsed(normalizedNextWord, usedWords)) {
    return {valid: false, reason: Reason.WORD_ALREADY_USED};
  }

  if (!isDictionaryWord(normalizedNextWord, dictionary)) {
    return {valid: false, reason: Reason.WORD_NOT_IN_DICTIONARY};
  }

  return {
    valid: true,
    word: normalizedNextWord,
  };
}
