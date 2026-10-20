import {WordDictionary} from './dictionary.ts';
import {hasLegalMove} from './legal-moves.ts';
import {recordWord} from './word-history.ts';
import {getNextPlayerIndex, getRemainingPlayers} from './turns.ts';
import {
  RoundEndReason,
  RoundStatus,
  PlayerId,
  RoundState,
  Reason,
} from './game-types.ts';
import {validateMove} from './validate-move.ts';

export type SubmitMoveResult =
  | {accepted: true; state: RoundState}
  | {
      accepted: false;
      reason: Reason;
    };

function completeRound(
  state: RoundState,
  winnerId: PlayerId | null,
  endReason: RoundEndReason | null,
): RoundState {
  return {
    ...state,
    status: RoundStatus.Completed,
    winnerId,
    endReason,
  };
}

export function submitMove(
  state: RoundState,
  playerId: PlayerId,
  nextWord: string,
  dictionary: WordDictionary,
): SubmitMoveResult {
  if (state.status !== RoundStatus.Active) {
    return {accepted: false, reason: Reason.ROUND_COMPLETED};
  }

  const activePlayer = state.players[state.activePlayerIndex];

  if (!activePlayer || activePlayer.id !== playerId) {
    return {accepted: false, reason: Reason.NOT_YOUR_TURN};
  }

  const validation = validateMove({
    currentWord: state.currentWord,
    nextWord,
    usedWords: state.usedWords,
    dictionary,
  });

  if (!validation.valid) {
    return {accepted: false, reason: validation.reason};
  }

  const movedState: RoundState = {
    ...state,
    currentWord: validation.word,
    usedWords: recordWord(validation.word, state.usedWords),
  };

  const nextIndex = getNextPlayerIndex(
    movedState.players,
    movedState.eliminatedPlayerIds,
    movedState.activePlayerIndex,
  );

  if (nextIndex === -1) {
    return {
      accepted: true,
      state: completeRound(movedState, null, RoundEndReason.Stalemate),
    };
  }

  const nextState: RoundState = {
    ...movedState,
    activePlayerIndex: nextIndex,
  };

  if (!hasLegalMove(nextState.currentWord, nextState.usedWords, dictionary)) {
    return {
      accepted: true,
      state: completeRound(nextState, null, RoundEndReason.Stalemate),
    };
  }

  return {accepted: true, state: nextState};
}

export function expireTurn(
  state: RoundState,
  dictionary: WordDictionary,
): RoundState {
  if (state.status !== RoundStatus.Active) {
    return state;
  }

  const activePlayer = state.players[state.activePlayerIndex];

  if (!activePlayer) {
    return completeRound(state, null, RoundEndReason.Stalemate);
  }

  const eliminatedPlayerIds = new Set(state.eliminatedPlayerIds);
  eliminatedPlayerIds.add(activePlayer.id);

  const eliminatedState: RoundState = {
    ...state,
    eliminatedPlayerIds,
  };

  const remainingPlayers = getRemainingPlayers(eliminatedState);

  if (remainingPlayers.length === 1) {
    return completeRound(
      eliminatedState,
      remainingPlayers[0]!.id,
      RoundEndReason.Winner,
    );
  }

  if (remainingPlayers.length === 0) {
    return completeRound(eliminatedState, null, RoundEndReason.Stalemate);
  }

  const nextIndex = getNextPlayerIndex(
    eliminatedState.players,
    eliminatedState.eliminatedPlayerIds,
    eliminatedState.activePlayerIndex,
  );

  if (nextIndex === -1) {
    return completeRound(eliminatedState, null, RoundEndReason.Stalemate);
  }

  const nextState: RoundState = {
    ...eliminatedState,
    activePlayerIndex: nextIndex,
  };

  if (!hasLegalMove(nextState.currentWord, nextState.usedWords, dictionary)) {
    return completeRound(nextState, null, RoundEndReason.Stalemate);
  }

  return nextState;
}
