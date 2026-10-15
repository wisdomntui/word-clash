import {hasWordBeenUsed, normalizeWord} from './word-history.ts';
import {differsByOneLetter} from './word-rules.ts';

export enum Reason {
  EMPTY_WORD = 'EMPTY_WORD',
  INVALID_TRANSFORMATION = 'INVALID_TRANSFORMATION',
  WORD_ALREADY_USED = 'WORD_ALREADY_USED',
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
}

export function validateMove({
  currentWord,
  nextWord,
  usedWords,
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

  return {
    valid: true,
    word: normalizedNextWord,
  };
}
