
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-cricket-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
            <span className="text-cricket-blue font-bold text-xl">CB</span>
          </div>
          <span className="font-bold text-xl">Cricket Bid Blitz</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-cricket-gold transition-colors">Home</Link></li>
            <li><Link to="/players" className="hover:text-cricket-gold transition-colors">Players</Link></li>
            <li><Link to="/teams" className="hover:text-cricket-gold transition-colors">Teams</Link></li>
            <li><Link to="/auction" className="hover:text-cricket-gold transition-colors">Auction</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
