import {hasWordBeenUsed, normalizeWord} from './word-history.ts';
import {differsByOneLetter} from './word-rules.ts';
import {isDictionaryWord, WordDictionary} from './dictionary.ts';
import {Reason} from './game-types.ts';

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
