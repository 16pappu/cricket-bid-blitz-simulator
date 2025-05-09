
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mockTeams, mockPlayers } from '@/data/mockPlayers';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/utils/formatters';
import { Team, Player } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Teams = () => {
  const [teams, setTeams] = useState(mockTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isCreateTeamDialogOpen, setIsCreateTeamDialogOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');

  // Function to simulate adding a player to a team
  const addPlayerToTeam = (teamId: string, player: Player) => {
    setTeams(teams.map(team => {
      if (team.id === teamId) {
        return {
          ...team,
          players: [...team.players, player]
        };
      }
      return team;
    }));
  };

  // For demo purposes, let's assign some random players to teams
  const assignRandomPlayersToTeam = (teamId: string) => {
    const team = teams.find(t => t.id === teamId);
    
    if (!team) return;
    
    // Clear existing players first
    setTeams(teams.map(t => {
      if (t.id === teamId) {
        return { ...t, players: [] };
      }
      return t;
    }));
    
    // Assign 3 random players
    const availablePlayers = [...mockPlayers].sort(() => 0.5 - Math.random());
    const selectedPlayers = availablePlayers.slice(0, 3);
    
    selectedPlayers.forEach(player => {
      addPlayerToTeam(teamId, player);
    });
  };

  const handleCreateTeam = () => {
    if (!newTeamName.trim()) return;
    
    const newTeam: Team = {
      id: Date.now().toString(),
      name: newTeamName.trim(),
      budget: 8000000,
      maxPlayers: 18,
      players: []
    };
    
    setTeams([...teams, newTeam]);
    setNewTeamName('');
    setIsCreateTeamDialogOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Teams</h1>
            <p className="text-gray-600">
              Manage your teams, track budgets, and review player acquisitions.
            </p>
          </div>
          <Button 
            className="bg-cricket-green text-white" 
            onClick={() => setIsCreateTeamDialogOpen(true)}
          >
            Create New Team
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <div key={team.id} className="cricket-card">
              <div className="p-6">
                <h2 className="text-xl font-bold text-cricket-navy mb-2">{team.name}</h2>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Budget</div>
                    <div className="font-semibold">{formatCurrency(team.budget)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Players</div>
                    <div className="font-semibold">{team.players.length} / {team.maxPlayers}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {team.players.slice(0, 3).map((player) => (
                    <div key={player.id} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                      {player.name}
                    </div>
                  ))}
                  {team.players.length > 3 && (
                    <div className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                      +{team.players.length - 3} more
                    </div>
                  )}
                </div>
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedTeam(team)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  {team.players.length === 0 && (
                    <Button 
                      variant="outline"
                      onClick={() => assignRandomPlayersToTeam(team.id)}
                      className="flex-1"
                    >
                      Demo: Add Players
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Detail Dialog */}
        {selectedTeam && (
          <Dialog open={!!selectedTeam} onOpenChange={() => setSelectedTeam(null)}>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{selectedTeam.name}</DialogTitle>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-gray-500">Total Budget</div>
                  <div className="text-2xl font-bold text-cricket-blue">
                    {formatCurrency(selectedTeam.budget)}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-gray-500">Players Acquired</div>
                  <div className="text-2xl font-bold text-cricket-green">
                    {selectedTeam.players.length} / {selectedTeam.maxPlayers}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm border">
                  <div className="text-sm text-gray-500">Spent</div>
                  <div className="text-2xl font-bold text-cricket-red">
                    {formatCurrency(selectedTeam.players.reduce((sum, p) => sum + p.basePrice, 0))}
                  </div>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Player</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Nationality</TableHead>
                      <TableHead className="text-right">Cost</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedTeam.players.length > 0 ? (
                      selectedTeam.players.map(player => (
                        <TableRow key={player.id}>
                          <TableCell className="font-medium">{player.name}</TableCell>
                          <TableCell>{player.role}</TableCell>
                          <TableCell>{player.nationality}</TableCell>
                          <TableCell className="text-right">{formatCurrency(player.basePrice)}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                          No players acquired yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setSelectedTeam(null)}>Close</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Create Team Dialog */}
        <Dialog open={isCreateTeamDialogOpen} onOpenChange={setIsCreateTeamDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
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

export default Teams;
