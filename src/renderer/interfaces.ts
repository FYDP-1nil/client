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
    currentMinute: number,
    isSecondHalf: boolean,
    gameEnded: boolean,
    currentQuarter: 1 | 2 | 3 | 4,
    gameId:string
}

export interface StreamState {
    isStreaming: boolean,
}

export interface TokenState {
  leagueValid: boolean,
  userToken: string
  // awayTeamName: string;
}
