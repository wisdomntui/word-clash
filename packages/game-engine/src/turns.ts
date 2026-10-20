import {Player, PlayerId, RoundState, RoundStatus} from './game-types.ts';

export function getActivePlayer(state: RoundState): Player | null {
  if (state.status !== RoundStatus.Active) {
    return null;
  }

  const player = state.players[state.activePlayerIndex];

  if (!player || state.eliminatedPlayerIds.has(player.id)) {
    return null;
  }

  return player;
}

export function getRemainingPlayers(state: RoundState): Player[] {
  return state.players.filter(
    (player) => !state.eliminatedPlayerIds.has(player.id),
  );
}

export function getNextPlayerIndex(
  players: Player[],
  eliminatedPlayerIds: ReadonlySet<PlayerId>,
  currentIndex: number,
): number {
  for (let offset = 1; offset <= players.length; offset += 1) {
    const index = (currentIndex + offset) % players.length;
    const player = players[index];

    if (player && !eliminatedPlayerIds.has(player.id)) {
      return index;
    }
  }

  return -1;
}
