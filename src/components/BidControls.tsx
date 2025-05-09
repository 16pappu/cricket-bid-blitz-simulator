
import React from 'react';
import { Button } from './ui/button';
import { formatCurrency } from '../utils/formatters';

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

  const handleBid = () => {
    onPlaceBid(nextBidAmount);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Button 
        onClick={handleBid}
        disabled={!canBid}
        className="bg-cricket-green hover:bg-cricket-green/90 text-white h-12 px-6"
      >
        Bid {formatCurrency(nextBidAmount)}
      </Button>
      <Button 
        onClick={onPass}
        variant="outline"
        className="border-cricket-red text-cricket-red hover:bg-cricket-red hover:text-white h-12 px-6"
      >
        Pass
      </Button>
    </div>
  );
};

export default BidControls;
