
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

export type BidStatus = {
  isActive: boolean;
  canBid: boolean;
  reason?: string;
};

// User auth types
export type UserRole = 'player' | 'team-owner' | 'admin';

export type User = {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  teamId?: string; // For team owners
  playerId?: string; // For players
};

export type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
};
