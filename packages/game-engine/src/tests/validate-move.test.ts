import {describe, expect, it} from 'vitest';
import {validateMove} from '../validate-move.ts';

describe('validateMove', () => {
  const usedWords = new Set(['cat', 'cot']);

  it('accepts a valid, unused one-letter change', () => {
    expect(
      validateMove({
        currentWord: 'cot',
        nextWord: 'cut',
        usedWords,
      }),
    ).toEqual({
      valid: true,
      word: 'cut',
    });
  });

  it('rejects an empty word', () => {
    expect(
      validateMove({
        currentWord: 'cat',
        nextWord: '   ',
        usedWords,
      }),
    ).toEqual({
      valid: false,
      reason: 'EMPTY_WORD',
    });
  });

  it('rejects a word that changes more than one letter', () => {
    expect(
      validateMove({
        currentWord: 'cat',
        nextWord: 'dog',
        usedWords,
      }),
    ).toEqual({
      valid: false,
      reason: 'INVALID_TRANSFORMATION',
    });
  });

  it('rejects a word with a different length', () => {
    expect(
      validateMove({
        currentWord: 'cat',
        nextWord: 'cats',
        usedWords,
      }),
    ).toEqual({
      valid: false,
      reason: 'INVALID_TRANSFORMATION',
    });
  });

  it('rejects a previously used word', () => {
    expect(
      validateMove({
        currentWord: 'cut',
        nextWord: 'cat',
        usedWords,
      }),
    ).toEqual({
      valid: false,
      reason: 'WORD_ALREADY_USED',
    });
  });

  it('normalizes letter casing and whitespace', () => {
    expect(
      validateMove({
        currentWord: ' COT ',
        nextWord: ' CUT ',
        usedWords,
      }),
    ).toEqual({
      valid: true,
      word: 'cut',
    });
  });
});
