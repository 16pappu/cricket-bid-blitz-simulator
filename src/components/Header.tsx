
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { authState, logout } = useAuth();
  const { isAuthenticated, user } = authState;

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
          <ul className="flex space-x-4 items-center">
            <li><Link to="/" className="hover:text-cricket-gold transition-colors">Home</Link></li>
            
            {isAuthenticated ? (
              <>
                {/* Common links for all authenticated users */}
                <li><Link to="/dashboard" className="hover:text-cricket-gold transition-colors">Dashboard</Link></li>
                <li><Link to="/players" className="hover:text-cricket-gold transition-colors">Players</Link></li>
                <li><Link to="/teams" className="hover:text-cricket-gold transition-colors">Teams</Link></li>
                
                {/* Admin-specific links */}
                {user?.role === 'admin' && (
                  <li><Link to="/auction" className="hover:text-cricket-gold transition-colors">Manage Auction</Link></li>
                )}
                
                {/* Team owner specific links */}
                {user?.role === 'team-owner' && (
                  <li><Link to="/auction" className="hover:text-cricket-gold transition-colors">Bid</Link></li>
                )}
                
                {/* User info and logout */}
                <li className="ml-4">
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white hover:text-cricket-blue"
                    onClick={logout}
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li><Link to="/players" className="hover:text-cricket-gold transition-colors">Players</Link></li>
                <li><Link to="/teams" className="hover:text-cricket-gold transition-colors">Teams</Link></li>
                <li className="ml-4">
                  <Button asChild className="bg-white text-cricket-blue hover:bg-cricket-gold">
                    <Link to="/auth">Login / Register</Link>
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
