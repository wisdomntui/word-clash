import {describe, expect, it} from 'vitest';
import {validateMove} from '../validate-move.ts';
import {createWordDictionary} from '../dictionary.ts';

const dictionary = createWordDictionary(['cat', 'cot', 'cut', 'dog']);

describe('validateMove', () => {
  const usedWords = new Set(['cat', 'cot']);

  it('accepts a valid, unused one-letter change', () => {
    expect(
      validateMove({
        currentWord: 'cot',
        nextWord: 'cut',
        usedWords,
        dictionary,
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
        dictionary,
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
        dictionary,
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
        dictionary,
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
        dictionary,
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
        dictionary,
      }),
    ).toEqual({
      valid: true,
      word: 'cut',
    });
  });

  it('rejects a word that is not in the dictionary', () => {
    expect(
      validateMove({
        currentWord: 'cat',
        nextWord: 'cax',
        usedWords,
        dictionary,
      }),
    ).toEqual({
      valid: false,
      reason: 'WORD_NOT_IN_DICTIONARY',
    });
  });
});
