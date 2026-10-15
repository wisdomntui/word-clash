import {describe, expect, it} from 'vitest';
import {createWordDictionary, isDictionaryWord} from '../dictionary.ts';

describe('createWordDictionary', () => {
  it('normalizes words and removes duplicates', () => {
    const dictionary = createWordDictionary(['Cat', ' cot ', 'cat', '']);

    expect(dictionary.size).toBe(2);
    expect(dictionary.has('cat')).toBe(true);
    expect(dictionary.has('cot')).toBe(true);
  });
});

describe('isDictionaryWord', () => {
  const dictionary = createWordDictionary(['cat', 'cot', 'cut']);

  it('accepts words in the dictionary', () => {
    expect(isDictionaryWord('CAT', dictionary)).toBe(true);
  });

  it('rejects words absent from the dictionary', () => {
    expect(isDictionaryWord('cqx', dictionary)).toBe(false);
  });
});
