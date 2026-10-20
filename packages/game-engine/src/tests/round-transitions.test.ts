import {describe, expect, it} from 'vitest';
import {createWordDictionary} from '../dictionary.ts';
import {createRound} from '../create-round.ts';
import {expireTurn, submitMove} from '../round-transitions.ts';
import {Reason, RoundEndReason, RoundStatus} from '../game-types.ts';

const dictionary = createWordDictionary([
  'cat',
  'cot',
  'cut',
  'dog',
  'dot',
  'hot',
]);

function createTestRound() {
  return createRound({
    players: [
      {id: 'p1', name: 'Ada'},
      {id: 'p2', name: 'Tunde'},
      {id: 'p3', name: 'Maya'},
    ],
    startingWord: 'cat',
    dictionary,
  });
}

describe('submitMove', () => {
  it('accepts a valid move and advances the turn', () => {
    const state = createTestRound();

    const result = submitMove(state, 'p1', 'cot', dictionary);

    expect(result.accepted).toBe(true);

    if (!result.accepted) return;

    expect(result.state.currentWord).toBe('cot');
    expect(result.state.usedWords.has('cot')).toBe(true);
    expect(result.state.activePlayerIndex).toBe(1);
    expect(result.state.status).toBe('active');
    expect(state.currentWord).toBe('cat');
  });

  it('rejects a move from the wrong player', () => {
    const result = submitMove(createTestRound(), 'p2', 'cot', dictionary);

    expect(result).toEqual({
      accepted: false,
      reason: Reason.NOT_YOUR_TURN,
    });
  });

  it('rejects an invalid move without changing state', () => {
    const state = createTestRound();
    const result = submitMove(state, 'p1', 'dog', dictionary);

    expect(result).toEqual({
      accepted: false,
      reason: Reason.INVALID_TRANSFORMATION,
    });
    expect(state.currentWord).toBe('cat');
  });

  it('rejects a move after the round has completed', () => {
    const state = {
      ...createTestRound(),
      status: RoundStatus.Completed,
      winnerId: 'p1',
      endReason: RoundEndReason.Winner,
    };

    expect(submitMove(state, 'p1', 'cot', dictionary)).toEqual({
      accepted: false,
      reason: Reason.ROUND_COMPLETED,
    });
  });
});

describe('expireTurn', () => {
  it('eliminates the active player and advances the turn', () => {
    const state = createTestRound();
    const nextState = expireTurn(state, dictionary);

    expect(nextState.eliminatedPlayerIds.has('p1')).toBe(true);
    expect(nextState.activePlayerIndex).toBe(1);
    expect(nextState.status).toBe('active');
    expect(nextState.winnerId).toBeNull();
  });

  it('declares the remaining player the winner', () => {
    const state = {
      ...createTestRound(),
      eliminatedPlayerIds: new Set(['p2']),
      activePlayerIndex: 0,
    };

    const nextState = expireTurn(state, dictionary);

    expect(nextState.status).toBe('completed');
    expect(nextState.winnerId).toBe('p3');
    expect(nextState.endReason).toBe('winner');
    expect(nextState.eliminatedPlayerIds.has('p1')).toBe(true);
  });

  it('does not change a completed round', () => {
    const state = {
      ...createTestRound(),
      status: RoundStatus.Completed,
      winnerId: 'p1',
      endReason: RoundEndReason.Winner,
    };

    expect(expireTurn(state, dictionary)).toBe(state);
  });
});
