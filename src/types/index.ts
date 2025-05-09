
export type PlayerRole = 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';

export type PlayerStats = {
  battingAverage: number;
  bowlingAverage: number | null;
  strikeRate: number;
  economyRate: number | null;
  matches: number;
};

export type Player = {
  id: string;
  name: string;
  nationality: string;
  age: number;
  role: PlayerRole;
  basePrice: number;
  image: string;
  stats: PlayerStats;
};

export type Team = {
  id: string;
  name: string;
  budget: number;
  maxPlayers: number;
  players: Player[];
};

export type BidHistory = {
  teamId: string;
  teamName: string;
  amount: number;
  timestamp: Date;
};
