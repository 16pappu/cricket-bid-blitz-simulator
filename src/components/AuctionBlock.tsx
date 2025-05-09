
import React, { useState } from 'react';
import { Player, Team, BidHistory } from '../types';
import { formatCurrency } from '../utils/formatters';
import BidControls from './BidControls';
import CountdownTimer from './CountdownTimer';
import BidHistoryComponent from './BidHistory';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface AuctionBlockProps {
  player: Player;
  teams: Team[];
  activeTeamId: string;
  onBidPlaced: (amount: number, teamId: string) => void;
  onPlayerSold: (player: Player, teamId: string, finalBid: number) => void;
  onPass: () => void;
}

const AuctionBlock: React.FC<AuctionBlockProps> = ({
  player,
  teams,
  activeTeamId,
  onBidPlaced,
  onPlayerSold,
  onPass
}) => {
  const [currentBid, setCurrentBid] = useState(player.basePrice);
  const [highestBidderTeamId, setHighestBidderTeamId] = useState<string | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [bidHistory, setBidHistory] = useState<BidHistory[]>([]);
  const [isSold, setIsSold] = useState(false);

  const activeTeam = teams.find(team => team.id === activeTeamId);
  const highestBidderTeam = teams.find(team => team.id === highestBidderTeamId);

  const minBidIncrement = currentBid < 1000000 ? 100000 : 200000;

  // Determine if the active team can bid
  const canBid = (activeTeam?.budget || 0) >= (currentBid + minBidIncrement);

  const handlePlaceBid = (bidAmount: number) => {
    if (!activeTeam) return;

    const newBid: BidHistory = {
      teamId: activeTeam.id,
      teamName: activeTeam.name,
      amount: bidAmount,
      timestamp: new Date()
    };

    setBidHistory([...bidHistory, newBid]);
    setCurrentBid(bidAmount);
    setHighestBidderTeamId(activeTeam.id);
    setIsTimerActive(true);
    setTimerSeconds(15); // Reset timer with each new bid
    
    onBidPlaced(bidAmount, activeTeam.id);
  };

  const handleTimeUp = () => {
    if (highestBidderTeamId && !isSold) {
      setIsSold(true);
      const finalBid = currentBid;
      onPlayerSold(player, highestBidderTeamId, finalBid);
    }
  };

  return (
    <Card className="overflow-hidden">
      <div className="bg-cricket-blue text-white px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-bold">Current Auction</h2>
          <Badge variant="outline" className="bg-white/10 text-white border-white/20">
            Any Registered Team Can Bid
          </Badge>
        </div>
        {isSold ? (
          <span className="bg-cricket-gold text-cricket-navy text-sm font-bold px-3 py-1 rounded-full">
            SOLD!
          </span>
        ) : (
          <CountdownTimer 
            seconds={timerSeconds}
            onTimeUp={handleTimeUp}
            isActive={isTimerActive}
          />
        )}
      </div>
      
      <CardContent className="p-0">
        <div className="grid md:grid-cols-5 gap-0">
          {/* Player info - 2 cols */}
          <div className="md:col-span-2 border-r border-b">
            <div className="p-4">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 bg-gray-200 rounded-full overflow-hidden">
                  <img 
                    src={player.image}
                    alt={player.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{player.name}</h3>
                  <div className="text-sm text-gray-500">
                    {player.nationality} • {player.age} yrs • {player.role}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="stat-box">
                  <span className="stat-value">{player.stats.battingAverage?.toFixed(1) || '-'}</span>
                  <span className="stat-label">Batting Avg</span>
                </div>
                {player.stats.bowlingAverage && (
                  <div className="stat-box">
                    <span className="stat-value">{player.stats.bowlingAverage.toFixed(1)}</span>
                    <span className="stat-label">Bowling Avg</span>
                  </div>
                )}
                <div className="stat-box">
                  <span className="stat-value">{player.stats.strikeRate.toFixed(1)}</span>
                  <span className="stat-label">Strike Rate</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bid info - 1 col */}
          <div className="md:col-span-1 border-r border-b">
            <div className="p-4 h-full flex flex-col items-center justify-center text-center">
              <div className="text-sm text-gray-500 mb-1">Current Bid</div>
              <div className="text-3xl font-bold text-cricket-blue mb-2">
                {formatCurrency(currentBid)}
              </div>
              {highestBidderTeam ? (
                <>
                  <div className="text-sm text-gray-500">Highest Bidder</div>
                  <div className="font-semibold">{highestBidderTeam.name}</div>
                </>
              ) : (
                <div className="text-sm text-gray-500">No bids yet</div>
              )}
            </div>
          </div>
          
          {/* Bid controls - 2 cols */}
          <div className="md:col-span-2 border-b">
            <div className="p-4 h-full flex flex-col justify-between">
              <div className="text-sm mb-2">
                {activeTeam ? (
                  <>
                    <span className="font-semibold">{activeTeam.name}'s Turn to Bid</span>
                    <span className="text-gray-500 ml-2">
                      (Budget: {formatCurrency(activeTeam.budget)})
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500">No active team</span>
                )}
              </div>
              
              {!isSold ? (
                <BidControls
                  currentBid={currentBid}
                  minBidIncrement={minBidIncrement}
                  canBid={canBid}
                  onPlaceBid={handlePlaceBid}
                  onPass={onPass}
                />
              ) : (
                <div className="bg-cricket-gold/20 border border-cricket-gold p-3 rounded text-center">
                  <div className="font-bold">Sold to {highestBidderTeam?.name}</div>
                  <div className="text-sm">for {formatCurrency(currentBid)}</div>
                </div>
              )}
            </div>
          </div>
          
          {/* Bid history - full width */}
          <div className="md:col-span-5">
            <div className="p-4">
              <BidHistoryComponent bids={bidHistory} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuctionBlock;
