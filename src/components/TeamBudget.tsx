
import React from 'react';
import { Team } from '../types';
import { formatCurrency } from '../utils/formatters';
import { Progress } from './ui/progress';

interface TeamBudgetProps {
  team: Team;
  isActive?: boolean;
}

const TeamBudget: React.FC<TeamBudgetProps> = ({ team, isActive }) => {
  const { budget, players, maxPlayers } = team;
  
  // Calculate total spent
  const totalSpent = players.reduce((sum, player) => sum + player.basePrice, 0);
  const remainingBudget = budget - totalSpent;
  const budgetPercentage = (totalSpent / budget) * 100;
  
  // Calculate roster fullness
  const rosterPercentage = (players.length / maxPlayers) * 100;

  return (
    <div className={`p-4 rounded-lg border ${isActive ? 'border-cricket-green bg-cricket-green/5' : 'border-border'}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg">{team.name}</h3>
        {isActive && (
          <span className="bg-cricket-green text-white text-xs px-2 py-1 rounded">
            Active Bidder
          </span>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Budget</span>
            <span>{formatCurrency(remainingBudget)} / {formatCurrency(budget)}</span>
          </div>
          <Progress value={budgetPercentage} className="h-2" />
        </div>
        
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Roster</span>
            <span>{players.length} / {maxPlayers} Players</span>
          </div>
          <Progress value={rosterPercentage} className="h-2" />
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">Avg. Spent</div>
            <div className="font-medium">
              {players.length > 0 
                ? formatCurrency(totalSpent / players.length)
                : formatCurrency(0)
              }
            </div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-gray-500">Per Player</div>
            <div className="font-medium">
              {players.length < maxPlayers 
                ? formatCurrency(remainingBudget / (maxPlayers - players.length))
                : formatCurrency(0)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamBudget;
