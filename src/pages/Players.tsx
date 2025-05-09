
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PlayerCatalog from '@/components/PlayerCatalog';
import { mockPlayers } from '@/data/mockPlayers';
import { Player } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatCurrency } from '@/utils/formatters';

const Players = () => {
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const handleSelectPlayer = (player: Player) => {
    setSelectedPlayer(player);
  };

  const handleCloseDialog = () => {
    setSelectedPlayer(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Player Catalog</h1>
          <p className="text-gray-600">
            Browse through our extensive catalog of players available for auction.
            Filter by role, search by name, and sort by various attributes.
          </p>
        </div>

        <PlayerCatalog 
          players={mockPlayers} 
          onSelectPlayer={handleSelectPlayer}
        />

        <Dialog open={!!selectedPlayer} onOpenChange={handleCloseDialog}>
          {selectedPlayer && (
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Player Details</DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="md:col-span-1">
                  <div className="bg-gray-100 rounded-lg aspect-square overflow-hidden">
                    <img 
                      src={selectedPlayer.image}
                      alt={selectedPlayer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <h2 className="text-2xl font-bold">{selectedPlayer.name}</h2>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="px-2 py-1 bg-cricket-blue/10 text-cricket-blue text-sm rounded-full">
                      {selectedPlayer.role}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                      {selectedPlayer.nationality}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                      {selectedPlayer.age} years
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="text-sm text-gray-500 mb-1">Base Price</div>
                    <div className="text-xl font-bold text-cricket-blue">
                      {formatCurrency(selectedPlayer.basePrice)}
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Player Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="stat-box">
                        <span className="stat-value">{selectedPlayer.stats.matches}</span>
                        <span className="stat-label">Matches</span>
                      </div>
                      <div className="stat-box">
                        <span className="stat-value">{selectedPlayer.stats.battingAverage?.toFixed(1) || '-'}</span>
                        <span className="stat-label">Batting Avg</span>
                      </div>
                      <div className="stat-box">
                        <span className="stat-value">{selectedPlayer.stats.strikeRate?.toFixed(1) || '-'}</span>
                        <span className="stat-label">Strike Rate</span>
                      </div>
                      {selectedPlayer.stats.bowlingAverage && (
                        <div className="stat-box">
                          <span className="stat-value">{selectedPlayer.stats.bowlingAverage.toFixed(1)}</span>
                          <span className="stat-label">Bowling Avg</span>
                        </div>
                      )}
                      {selectedPlayer.stats.economyRate && (
                        <div className="stat-box">
                          <span className="stat-value">{selectedPlayer.stats.economyRate.toFixed(2)}</span>
                          <span className="stat-label">Economy</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </main>
      <Footer />
    </div>
  );
};

export default Players;
