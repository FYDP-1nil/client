export interface CounterState {
  value: number;
}

export interface BooleanState {
  value: boolean;
}

export interface StringState {
  value: string;
}

export interface TeamsState {
    homeTeamName: string;
    awayTeamName: string;
}

export interface GameState {
    activeGame: boolean,
    isHalfTime: boolean,
    currentMinute: number
}

export interface StreamState {
    isStreaming: boolean,
}