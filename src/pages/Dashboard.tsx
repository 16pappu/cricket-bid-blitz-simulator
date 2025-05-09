
import React from 'react';
import { Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Dashboard: React.FC = () => {
  const { authState, logout } = useAuth();
  
  if (authState.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cricket-blue mx-auto"></div>
          <p className="mt-4 text-cricket-blue">Loading...</p>
        </div>
      </div>
    );
  }
  
  // Redirect if not authenticated
  if (!authState.isAuthenticated || !authState.user) {
    return <Navigate to="/auth" replace />;
  }
  
  const { user } = authState;
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-cricket-navy">Welcome, {user.name}</h1>
              <p className="text-gray-600 capitalize">Role: {user.role.replace('-', ' ')}</p>
            </div>
            <Button 
              variant="outline" 
              className="border-cricket-red text-cricket-red hover:bg-cricket-red hover:text-white"
              onClick={logout}
            >
              Log Out
            </Button>
          </div>
          
          {user.role === 'admin' && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Admin Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard
                  title="Manage Players"
                  description="Add, update, or remove players from the auction pool"
                  link="/players"
                />
                <DashboardCard
                  title="Manage Teams"
                  description="View and manage teams participating in the auction"
                  link="/teams"
                />
                <DashboardCard
                  title="Auction Control"
                  description="Start, pause, or end the auction session"
                  link="/auction"
                />
              </div>
            </div>
          )}
          
          {user.role === 'team-owner' && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Team Owner Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard
                  title="My Team"
                  description="View and manage your team's roster and budget"
                  link="/teams"
                />
                <DashboardCard
                  title="Available Players"
                  description="Browse the catalog of players available for auction"
                  link="/players"
                />
                <DashboardCard
                  title="Join Auction"
                  description="Participate in live auction sessions"
                  link="/auction"
                />
              </div>
            </div>
          )}
          
          {user.role === 'player' && (
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Player Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <DashboardCard
                  title="My Profile"
                  description="View and update your player profile and statistics"
                  link="/players"
                />
                <DashboardCard
                  title="Auction Status"
                  description="Check your current status in the auction"
                  link="/auction"
                />
                <DashboardCard
                  title="Teams"
                  description="Browse teams participating in the auction"
                  link="/teams"
                />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  description: string;
  link: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, link }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:border-cricket-green transition-colors">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <Button asChild className="bg-cricket-blue hover:bg-cricket-blue/90 w-full">
        <a href={link}>Go to {title}</a>
      </Button>
    </div>
  );
};

export default Dashboard;
