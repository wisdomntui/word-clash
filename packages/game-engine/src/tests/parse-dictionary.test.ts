import {describe, expect, it} from 'vitest';
import {parseDictionary} from '../parse-dictionary.ts';

describe('parseDictionary', () => {
  it('normalizes words and removes duplicates', () => {
    const dictionary = parseDictionary('Cat\ncot\nCAT\n\n');

    expect(dictionary.size).toBe(2);
    expect(dictionary.has('cat')).toBe(true);
    expect(dictionary.has('cot')).toBe(true);
  });

  it('ignores entries that are not alphabetic words', () => {
    const dictionary = parseDictionary('cat\nco-op\n123\nhello!\ndog\n');

    expect(dictionary.has('cat')).toBe(true);
    expect(dictionary.has('dog')).toBe(true);
    expect(dictionary.has('co-op')).toBe(false);
    expect(dictionary.has('123')).toBe(false);
  });

  it('handles an empty dictionary', () => {
    expect(parseDictionary('').size).toBe(0);
  });
});
