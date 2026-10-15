import {describe, expect, it} from 'vitest';
import {hasWordBeenUsed, normalizeWord, recordWord} from '../word-history.ts';

describe('normalizeWord', () => {
  it('trims whitespace and converts words to lowercase', () => {
    expect(normalizeWord('  CAT  ')).toBe('cat');
  });
});

describe('hasWordBeenUsed', () => {
  const usedWords = new Set(['cat', 'cot']);

  it('detects a previously used word', () => {
    expect(hasWordBeenUsed('cat', usedWords)).toBe(true);
  });

  it('ignores letter casing and surrounding whitespace', () => {
    expect(hasWordBeenUsed(' CAT ', usedWords)).toBe(true);
  });

  it('allows a word that has not been used', () => {
    expect(hasWordBeenUsed('cut', usedWords)).toBe(false);
  });
});

describe('recordWord', () => {
  it('records a new word in a new set', () => {
    const original = new Set(['cat']);
    const updated = recordWord('cot', original);

    expect(updated.has('cot')).toBe(true);
    expect(original.has('cot')).toBe(false);
  });

  it('does not add a duplicate word', () => {
    const original = new Set(['cat']);
    const updated = recordWord(' CAT ', original);

    expect(updated.size).toBe(1);
    expect(updated.has('cat')).toBe(true);
  });
});
