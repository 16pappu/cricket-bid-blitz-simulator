
import React from 'react';
import { Player } from '../types';
import { Card, CardContent, CardFooter } from './ui/card';
import { formatCurrency } from '../utils/formatters';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player, onClick }) => {
  const { name, nationality, age, role, basePrice, image, stats } = player;

  return (
    <Card className="cricket-card cursor-pointer h-full" onClick={onClick}>
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 bg-cricket-blue text-white px-3 py-1 text-sm font-bold">
          {role}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-cricket-navy">{name}</h3>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{nationality}</span>
          <span>{age} years</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="stat-box">
            <span className="stat-value">{stats.matches}</span>
            <span className="stat-label">Matches</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{stats.battingAverage?.toFixed(1) || '-'}</span>
            <span className="stat-label">Bat Avg</span>
          </div>
          <div className="stat-box">
            <span className="stat-value">{stats.strikeRate?.toFixed(1) || '-'}</span>
            <span className="stat-label">SR</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-4 text-center">
        <div className="w-full">
          <div className="text-sm text-gray-500">Base Price</div>
          <div className="text-cricket-blue font-bold text-lg">{formatCurrency(basePrice)}</div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PlayerCard;
