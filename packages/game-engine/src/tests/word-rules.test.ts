import {describe, expect, it} from 'vitest';
import {differsByOneLetter} from '../word-rules.ts';

describe('differsByOneLetter', () => {
  it('accepts words differing by exactly one letter', () => {
    expect(differsByOneLetter('cat', 'cot')).toBe(true);
    expect(differsByOneLetter('cold', 'cord')).toBe(true);
  });

  it('rejects words differing by more than one letter', () => {
    expect(differsByOneLetter('cat', 'dog')).toBe(false);
    expect(differsByOneLetter('cold', 'warm')).toBe(false);
  });

  it('rejects words of different lengths', () => {
    expect(differsByOneLetter('cat', 'cats')).toBe(false);
    expect(differsByOneLetter('cats', 'cat')).toBe(false);
  });

  it('rejects identical words', () => {
    expect(differsByOneLetter('cat', 'cat')).toBe(false);
  });

  it('compares words without case sensitivity', () => {
    expect(differsByOneLetter('CAT', 'cot')).toBe(true);
    expect(differsByOneLetter('CAT', 'cat')).toBe(false);
  });

  it('handles empty strings', () => {
    expect(differsByOneLetter('', '')).toBe(false);
    expect(differsByOneLetter('', 'a')).toBe(false);
  });
});
