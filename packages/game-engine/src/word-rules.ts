/**
 * Returns true when two words have the same length
 * and differ by exactly one letter.
 *
 * Dictionary validity is checked separately.
 */
export function differsByOneLetter(
  currentWord: string,
  nextWord: string,
): boolean {
  const current = currentWord.toLowerCase();
  const next = nextWord.toLowerCase();

  if (current.length !== next.length) {
    return false;
  }

  let differences = 0;

  for (let index = 0; index < current.length; index += 1) {
    if (current[index] !== next[index]) {
      differences += 1;
    }

    if (differences > 1) {
      return false;
    }
  }

  return differences === 1;
}
