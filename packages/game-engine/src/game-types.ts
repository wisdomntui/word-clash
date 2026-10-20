export interface Player {
  id: string;
  name: string;
}

export type PlayerId = Player['id'];

// Shared reasons for move validation and move submission rejection
export enum Reason {
  EMPTY_WORD = 'EMPTY_WORD',
  INVALID_TRANSFORMATION = 'INVALID_TRANSFORMATION',
  WORD_ALREADY_USED = 'WORD_ALREADY_USED',
  WORD_NOT_IN_DICTIONARY = 'WORD_NOT_IN_DICTIONARY',
  ROUND_COMPLETED = 'ROUND_COMPLETED',
  NOT_YOUR_TURN = 'NOT_YOUR_TURN',
}

export enum RoundStatus {
  Active = 'active',
  Completed = 'completed',
}

export enum RoundEndReason {
  Winner = 'winner',
  Stalemate = 'stalemate',
}

export interface RoundState {
  players: Player[];
  currentWord: string;
  usedWords: ReadonlySet<string>;
  eliminatedPlayerIds: ReadonlySet<PlayerId>;
  activePlayerIndex: number;
  status: RoundStatus;
  winnerId: PlayerId | null;
  endReason: RoundEndReason | null;
}
