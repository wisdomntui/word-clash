import {normalizeWord} from './word-history.ts';
import {Player, RoundState, RoundStatus} from './game-types.ts';
import {WordDictionary} from './dictionary.ts';

export interface CreateRoundInput {
  players: Player[];
  startingWord: string;
  dictionary: WordDictionary;
}

export function createRound({
  players,
  startingWord,
  dictionary,
}: CreateRoundInput): RoundState {
  const word = normalizeWord(startingWord);

  if (players.length < 2 || players.length > 6) {
    throw new Error('A round requires between 2 and 6 players.');
  }

  const playerIds = players.map((player) => player.id);

  if (new Set(playerIds).size !== playerIds.length) {
    throw new Error('Player IDs must be unique.');
  }

  if (players.some((player) => !player.id.trim() || !player.name.trim())) {
    throw new Error('Every player must have an ID and a name.');
  }

  if (!dictionary.has(word)) {
    throw new Error('The starting word must exist in the dictionary.');
  }

  return {
    players: players.map((player) => ({...player})),
    currentWord: word,
    usedWords: new Set([word]),
    eliminatedPlayerIds: new Set(),
    activePlayerIndex: 0,
    status: RoundStatus.Active,
    winnerId: null,
    endReason: null,
  };
}
