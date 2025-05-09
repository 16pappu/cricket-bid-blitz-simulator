
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockPlayers, mockTeams } from '@/data/mockPlayers';
import AuctionBlock from '@/components/AuctionBlock';
import TeamBudget from '@/components/TeamBudget';
import { Player, Team } from '@/types';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Auction = () => {
  const [teams, setTeams] = useState(mockTeams);
  const [availablePlayers, setAvailablePlayers] = useState(mockPlayers);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [auctionStarted, setAuctionStarted] = useState(false);
  
  const startAuction = () => {
    if (availablePlayers.length === 0) {
      toast({
        title: "No players available",
        description: "All players have been sold in the auction.",
        variant: "destructive",
      });
      return;
    }
    
    setCurrentPlayer(availablePlayers[0]);
    setActiveTeamIndex(0);
    setAuctionStarted(true);
  };
  
  const handleNextPlayer = () => {
    const remainingPlayers = availablePlayers.filter(p => p.id !== currentPlayer?.id);
    
    if (remainingPlayers.length === 0) {
      setCurrentPlayer(null);
      setAuctionStarted(false);
      toast({
        title: "Auction completed",
        description: "All players have been sold in the auction.",
      });
    } else {
      setCurrentPlayer(remainingPlayers[0]);
      // Move to next team for bidding
      setActiveTeamIndex((activeTeamIndex + 1) % teams.length);
    }
  };

  const handleBidPlaced = (amount: number, teamId: string) => {
    // In a real app, this would update server state
    console.log(`Team ${teamId} placed a bid of ${amount}`);
    
    // Move to next team for bidding
    const currentTeamIndex = teams.findIndex(t => t.id === teamId);
    setActiveTeamIndex((currentTeamIndex + 1) % teams.length);
  };

  const handlePlayerSold = (player: Player, teamId: string, finalBid: number) => {
    // In a real app with a backend, this would be handled differently
    // For this demo, we'll update our state directly
    
    // Update the player's price with the final bid
    const updatedPlayer = { ...player, basePrice: finalBid };
    
    // Add the player to the team
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          players: [...team.players, updatedPlayer],
          budget: team.budget - finalBid
        };
      }
      return team;
    }));
    
    // Remove the player from available players
    setAvailablePlayers(availablePlayers.filter(p => p.id !== player.id));
    
    toast({
      title: "Player sold!",
      description: `${player.name} has been sold to ${teams.find(t => t.id === teamId)?.name} for ₹${finalBid.toLocaleString()}`,
    });
    
    // After a short delay, move to the next player
    setTimeout(handleNextPlayer, 3000);
  };
  
  const handlePass = () => {
    // Move to next team for bidding
    setActiveTeamIndex((activeTeamIndex + 1) % teams.length);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Live Auction</h1>
          <p className="text-gray-600">
            Experience the thrill of a real-time cricket auction. All registered teams can bid on players,
            manage their budgets, and build their dream teams.
          </p>
        </div>
        
        {!auctionStarted ? (
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Start the Auction</CardTitle>
                <CardDescription>
                  {availablePlayers.length} players available for bidding
                </CardDescription>
              </CardHeader>
              <div className="p-6">
                <Button 
                  size="lg" 
                  className="bg-cricket-blue text-white"
                  onClick={startAuction}
                >
                  Start Auction
                </Button>
              </div>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>
                  Open bidding for all registered teams
                </CardDescription>
              </CardHeader>
              <div className="p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-cricket-blue/10 text-cricket-blue rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">1</div>
                  <p>Any registered team can bid on available players</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cricket-blue/10 text-cricket-blue rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">2</div>
                  <p>Teams take turns to place bids or pass</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-cricket-blue/10 text-cricket-blue rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0">3</div>
                  <p>Players are sold to the highest bidder when the timer runs out</p>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <>
            {currentPlayer && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <AuctionBlock 
                    player={currentPlayer}
                    teams={teams}
                    activeTeamId={teams[activeTeamIndex].id}
                    onBidPlaced={handleBidPlaced}
                    onPlayerSold={handlePlayerSold}
                    onPass={handlePass}
                  />
                </div>
                <div className="lg:col-span-1 space-y-4">
                  <div className="font-bold text-lg mb-2">Teams</div>
                  {teams.map((team, index) => (
                    <TeamBudget 
                      key={team.id} 
                      team={team}
                      isActive={index === activeTeamIndex}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Auction;
