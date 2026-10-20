export interface Player {
  id: string;
  name: string;
}

export type PlayerId = Player['id'];

export enum RoundStatus {
  Active = 'active',
  Completed = 'completed',
}

export interface RoundState {
  players: Player[];
  currentWord: string;
  usedWords: ReadonlySet<string>;
  eliminatedPlayerIds: ReadonlySet<PlayerId>;
  activePlayerIndex: number;
  status: RoundStatus;
  winnerId: PlayerId | null;
}
