
import React from 'react';
import { BidHistory as BidHistoryType } from '../types';
import { formatCurrency } from '../utils/formatters';
import { ScrollArea } from './ui/scroll-area';

interface BidHistoryProps {
  bids: BidHistoryType[];
}

const BidHistory: React.FC<BidHistoryProps> = ({ bids }) => {
  // Sort bids in reverse chronological order
  const sortedBids = [...bids].sort((a, b) => 
    b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="rounded-md border border-border">
      <div className="bg-muted px-4 py-2 border-b">
        <h3 className="font-semibold">Bid History</h3>
      </div>
      <ScrollArea className="h-[200px]">
        {sortedBids.length > 0 ? (
          <ul className="divide-y">
            {sortedBids.map((bid, index) => (
              <li key={index} className="px-4 py-2 flex justify-between items-center">
                <div>
                  <span className="font-medium text-sm">{bid.teamName}</span>
                  <span className="text-muted-foreground text-xs ml-2">
                    {bid.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <span className="font-semibold text-cricket-blue">{formatCurrency(bid.amount)}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-sm">No bids yet</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default BidHistory;
