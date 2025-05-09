
import { Player } from '../types';

export const mockPlayers: Player[] = [
  {
    id: "1",
    name: "Virat Kohli",
    nationality: "India",
    age: 33,
    role: "Batsman",
    basePrice: 1500000,
    image: "/placeholder.svg",
    stats: {
      battingAverage: 53.5,
      bowlingAverage: null,
      strikeRate: 139.2,
      economyRate: null,
      matches: 207
    }
  },
  {
    id: "2",
    name: "Jasprit Bumrah",
    nationality: "India",
    age: 28,
    role: "Bowler",
    basePrice: 1200000,
    image: "/placeholder.svg",
    stats: {
      battingAverage: 5.3,
      bowlingAverage: 22.1,
      strikeRate: 83.4,
      economyRate: 6.58,
      matches: 120
    }
  },
  {
    id: "3",
    name: "Ben Stokes",
    nationality: "England",
    age: 31,
    role: "All-rounder",
    basePrice: 1300000,
    image: "/placeholder.svg",
    stats: {
      battingAverage: 33.2,
      bowlingAverage: 31.8,
      strikeRate: 142.7,
      economyRate: 8.71,
      matches: 145
    }
  },
  {
    id: "4",
    name: "Jos Buttler",
    nationality: "England",
    age: 32,
    role: "Wicket-keeper",
    basePrice: 1100000,
    image: "/placeholder.svg",
    stats: {
      battingAverage: 42.1,
      bowlingAverage: null,
      strikeRate: 152.8,
      economyRate: null,
      matches: 167
    }
  },
  {
    id: "5",
    name: "Pat Cummins",
    nationality: "Australia",
    age: 29,
    role: "Bowler",
    basePrice: 1250000,
    image: "/placeholder.svg",
    stats: {
      battingAverage: 16.8,
      bowlingAverage: 25.2,
      strikeRate: 121.5,
      economyRate: 7.92,
      matches: 98
    }
  },
  {
    id: "6",
    name: "Rohit Sharma",
    nationality: "India",
    age: 35,
    role: "Batsman",
    basePrice: 1400000,
    image: "/placeholder.svg",
    stats: {
      battingAverage: 48.6,
      bowlingAverage: 61.5,
      strikeRate: 144.7,
      economyRate: 9.23,
      matches: 213
    }
  },
  {
    id: "7",
    name: "Kagiso Rabada",
    nationality: "South Africa",
    age: 27,
    role: "Bowler",
    basePrice: 1150000,
    image: "/placeholder.svg",
    stats: {
      battingAverage: 8.3,
      bowlingAverage: 24.7,
      strikeRate: 91.8,
      economyRate: 8.12,
      matches: 117
    }
  },
  {
    id: "8",
    name: "Kane Williamson",
    nationality: "New Zealand",
    age: 32,
    role: "Batsman",
    basePrice: 1200000,
    image: "/placeholder.svg",
    stats: {
      battingAverage: 45.7,
      bowlingAverage: 43.2,
      strikeRate: 132.9,
      economyRate: 8.76,
      matches: 189
    }
  }
];

export const mockTeams = [
  {
    id: "1",
    name: "Mumbai Mavericks",
    budget: 8000000,
    maxPlayers: 18,
    players: []
  },
  {
    id: "2",
    name: "Delhi Dynamos",
    budget: 8000000,
    maxPlayers: 18,
    players: []
  },
  {
    id: "3",
    name: "Bangalore Blazers",
    budget: 8000000,
    maxPlayers: 18,
    players: []
  },
  {
    id: "4",
    name: "Chennai Chargers",
    budget: 8000000,
    maxPlayers: 18,
    players: []
  }
];
