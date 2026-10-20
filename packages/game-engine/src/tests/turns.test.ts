import {describe, expect, it} from 'vitest';
import {createWordDictionary} from '../dictionary.ts';
import {createRound} from '../create-round.ts';
import {
  getActivePlayer,
  getNextPlayerIndex,
  getRemainingPlayers,
} from '../turns.ts';

const state = createRound({
  players: [
    {id: 'p1', name: 'Ada'},
    {id: 'p2', name: 'Tunde'},
    {id: 'p3', name: 'Maya'},
  ],
  startingWord: 'cat',
  dictionary: createWordDictionary(['cat']),
});

describe('turn helpers', () => {
  it('returns the active player', () => {
    expect(getActivePlayer(state)?.id).toBe('p1');
  });

  it('skips eliminated players when finding the next turn', () => {
    expect(getNextPlayerIndex(state.players, new Set(['p2']), 0)).toBe(2);
  });

  it('wraps around to the first eligible player', () => {
    expect(getNextPlayerIndex(state.players, new Set(['p2', 'p3']), 0)).toBe(0);
  });

  it('returns the players who remain in the round', () => {
    const updatedState = {
      ...state,
      eliminatedPlayerIds: new Set(['p2']),
    };

    expect(
      getRemainingPlayers(updatedState).map((player) => player.id),
    ).toEqual(['p1', 'p3']);
  });
});
