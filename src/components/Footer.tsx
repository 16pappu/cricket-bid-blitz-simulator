
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-cricket-navy text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Cricket Bid Blitz</h3>
            <p className="text-gray-300">
              Experience the thrill of cricket auctions with our real-time bidding simulator. 
              Perfect for friendly tournaments and practice sessions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/players" className="text-gray-300 hover:text-white">Players</a></li>
              <li><a href="/teams" className="text-gray-300 hover:text-white">Teams</a></li>
              <li><a href="/auction" className="text-gray-300 hover:text-white">Live Auction</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300">
              Have questions or feedback? <br />
              Email us at <a href="mailto:info@cricketbidblitz.com" className="underline">info@cricketbidblitz.com</a>
            </p>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Cricket Bid Blitz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
