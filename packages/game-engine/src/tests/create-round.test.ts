import {describe, expect, it} from 'vitest';
import {createWordDictionary} from '../dictionary.ts';
import {createRound} from '../create-round.ts';

const dictionary = createWordDictionary(['cat', 'cot', 'cut']);

const players = [
  {id: 'p1', name: 'Ada'},
  {id: 'p2', name: 'Tunde'},
  {id: 'p3', name: 'Maya'},
];

describe('createRound', () => {
  it('creates a round with the first player active', () => {
    const state = createRound({
      players,
      startingWord: 'CAT',
      dictionary,
    });

    expect(state.currentWord).toBe('cat');
    expect(state.activePlayerIndex).toBe(0);
    expect(state.usedWords.has('cat')).toBe(true);
    expect(state.status).toBe('active');
    expect(state.winnerId).toBeNull();
  });

  it('rejects fewer than two players', () => {
    expect(() =>
      createRound({
        players: [players[0]!],
        startingWord: 'cat',
        dictionary,
      }),
    ).toThrow('A round requires between 2 and 6 players.');
  });

  it('rejects duplicate player IDs', () => {
    expect(() =>
      createRound({
        players: [
          {id: 'p1', name: 'Ada'},
          {id: 'p1', name: 'Maya'},
        ],
        startingWord: 'cat',
        dictionary,
      }),
    ).toThrow('Player IDs must be unique.');
  });

  it('rejects an unknown starting word', () => {
    expect(() =>
      createRound({
        players,
        startingWord: 'dog',
        dictionary,
      }),
    ).toThrow('The starting word must exist in the dictionary.');
  });
});
