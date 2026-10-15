export function normalizeWord(word: string): string {
  return word.trim().toLowerCase();
}

export function hasWordBeenUsed(
  word: string,
  usedWords: ReadonlySet<string>,
): boolean {
  return usedWords.has(normalizeWord(word));
}

export function recordWord(
  word: string,
  usedWords: ReadonlySet<string>,
): Set<string> {
  const normalizedWord = normalizeWord(word);

  if (usedWords.has(normalizedWord)) {
    return new Set(usedWords);
  }

  return new Set([...usedWords, normalizedWord]);
}
