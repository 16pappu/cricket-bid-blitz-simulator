
import React from 'react';
import { Button } from './ui/button';
import { formatCurrency } from '../utils/formatters';
import { Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface BidControlsProps {
  currentBid: number;
  minBidIncrement: number;
  canBid: boolean;
  onPlaceBid: (amount: number) => void;
  onPass: () => void;
}

const BidControls: React.FC<BidControlsProps> = ({
  currentBid,
  minBidIncrement,
  canBid,
  onPlaceBid,
  onPass
}) => {
  const nextBidAmount = currentBid + minBidIncrement;
  const { authState } = useAuth();
  const { isAuthenticated, user } = authState;
  const navigate = useNavigate();
  
  const handleBid = () => {
    onPlaceBid(nextBidAmount);
  };

  // If not authenticated or not a team owner, show login prompt
  if (!isAuthenticated || user?.role !== 'team-owner') {
    return (
      <div className="bg-gray-100 p-4 rounded-md text-center">
        <p className="mb-3 text-gray-600">
          {!isAuthenticated 
            ? 'You need to login as a team owner to place bids' 
            : 'Only team owners can place bids'}
        </p>
        <Button 
          onClick={() => navigate('/auth')} 
          className="bg-cricket-green hover:bg-cricket-green/90"
        >
          Login / Register
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        onClick={handleBid}
        disabled={!canBid}
        className="bg-cricket-green hover:bg-cricket-green/90 text-white h-12 px-6 flex items-center justify-center"
      >
        <Check className="mr-2 h-4 w-4" />
        Bid {formatCurrency(nextBidAmount)}
      </Button>
      <Button 
        onClick={onPass}
        variant="outline"
        className="border-cricket-red text-cricket-red hover:bg-cricket-red hover:text-white h-12 px-6"
      >
        Pass
      </Button>
      {!canBid && (
        <div className="text-sm text-cricket-red italic">
          Insufficient budget to place this bid
        </div>
      )}
    </div>
  );
};

export default BidControls;
