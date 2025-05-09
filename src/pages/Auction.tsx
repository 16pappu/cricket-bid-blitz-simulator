
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockPlayers, mockTeams } from '@/data/mockPlayers';
import AuctionBlock from '@/components/AuctionBlock';
import TeamBudget from '@/components/TeamBudget';
import { Player, Team } from '@/types';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';

const Auction = () => {
  const [teams, setTeams] = useState(mockTeams);
  const [availablePlayers, setAvailablePlayers] = useState(mockPlayers);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);
  const [auctionStarted, setAuctionStarted] = useState(false);
  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  
  const { authState } = useAuth();
  const { isAuthenticated, user } = authState;
  const navigate = useNavigate();
  
  // Find user's team if they are a team owner
  const userTeam = isAuthenticated && user?.role === 'team-owner' 
    ? teams.find(team => team.id === user.teamId) 
    : null;
  
  const startAuction = () => {
    if (availablePlayers.length === 0) {
      toast({
        title: "No players available",
        description: "All players have been sold in the auction.",
        variant: "destructive",
      });
      return;
    }
    
    // Check if user is authenticated as team owner
    if (!isAuthenticated || user?.role !== 'team-owner') {
      toast({
        title: "Authentication required",
        description: "Please login as a team owner to participate in the auction.",
        variant: "destructive",
      });
      setTimeout(() => navigate('/auth'), 2000);
      return;
    }
    
    // Check if user has a team
    if (!userTeam) {
      toast({
        title: "Team required",
        description: "Please create your team first to join the auction.",
      });
      setIsCreateTeamDialogOpen(true);
      return;
    }
    
    setCurrentPlayer(availablePlayers[0]);
    setActiveTeamIndex(0);
    setAuctionStarted(true);
  };
  
  const handleCreateTeam = () => {
    if (!newTeamName.trim()) return;
    
    if (!isAuthenticated || user?.role !== 'team-owner') {
      toast({
        title: "Authentication required",
        description: "Please login as a team owner to create a team.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }
    
    const newTeam: Team = {
      id: user.id, // Use user ID as team ID
      name: newTeamName.trim(),
      budget: 8000000,
      maxPlayers: 18,
      players: []
    };
    
    setTeams([...teams, newTeam]);
    setNewTeamName('');
    setIsCreateTeamDialogOpen(false);
    
    toast({
      title: "Team created successfully",
      description: `${newTeamName} has been registered for the auction.`,
    });
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
              <div className="p-6 space-y-4">
                {!isAuthenticated || user?.role !== 'team-owner' ? (
                  <>
                    <p className="text-amber-600">You need to be logged in as a team owner to participate in the auction.</p>
                    <Button 
                      size="lg" 
                      className="bg-cricket-blue text-white"
                      onClick={() => navigate('/auth')}
                    >
                      Login / Register
                    </Button>
                  </>
                ) : !userTeam ? (
                  <>
                    <p className="text-amber-600">You need to create a team first to join the auction.</p>
                    <Button 
                      size="lg" 
                      className="bg-cricket-green text-white"
                      onClick={() => setIsCreateTeamDialogOpen(true)}
                    >
                      Create Your Team
                    </Button>
                  </>
                ) : (
                  <Button 
                    size="lg" 
                    className="bg-cricket-blue text-white"
                    onClick={startAuction}
                  >
                    Start Auction
                  </Button>
                )}
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
                  <p>Create a team as a team owner to participate</p>
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
        
        {/* Create Team Dialog */}
        <Dialog open={isCreateTeamDialogOpen} onOpenChange={setIsCreateTeamDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Your Team</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="teamName" className="text-sm font-medium">
                  Team Name
                </label>
                <Input 
                  id="teamName"
                  value={newTeamName}
                  onChange={(e) => setNewTeamName(e.target.value)}
                  placeholder="Enter team name..."
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateTeamDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTeam} className="bg-cricket-blue text-white">
                Create Team
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Auction;
