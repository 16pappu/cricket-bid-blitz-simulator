
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-cricket-blue text-white">
          <div className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 lg:pr-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Experience the Thrill of Cricket Auctions
              </h1>
              <p className="text-lg mb-8">
                Create your dream team with our real-time cricket auction simulator. 
                Perfect for friendly tournaments, fantasy leagues, and practice sessions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-cricket-gold text-cricket-navy hover:bg-cricket-gold/90">
                  <Link to="/auction">Start Auction</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-cricket-blue">
                  <Link to="/players">Browse Players</Link>
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="relative">
                <div className="bg-cricket-green rounded-lg shadow-xl p-6 transform rotate-3">
                  <div className="text-xl font-bold mb-4 text-white">Live Auction</div>
                  <div className="bg-white rounded p-4 text-cricket-navy">
                    <div className="flex justify-between items-center mb-3">
                      <div className="font-bold">Current Player</div>
                      <div>Timer: 00:25</div>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="bg-gray-200 rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold">
                        VK
                      </div>
                      <div>
                        <div className="font-bold">Virat Kohli</div>
                        <div className="text-sm text-gray-500">Batsman • India</div>
                      </div>
                    </div>
                    <div className="flex justify-between mb-3">
                      <div>Current Bid:</div>
                      <div className="font-bold text-cricket-blue">₹15,00,000</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bid-button">Bid ₹16,00,000</button>
                      <button className="pass-button">Pass</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="bg-cricket-blue/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cricket-blue">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Team Management</h3>
                <p className="text-gray-600">
                  Create and manage multiple teams with customizable budgets and roster limits.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-cricket-green/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cricket-green">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Bidding</h3>
                <p className="text-gray-600">
                  Experience the thrill of live auctions with real-time bidding, timers, and competitive dynamics.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="bg-cricket-red/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cricket-red">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Statistics & Analysis</h3>
                <p className="text-gray-600">
                  Track spending, analyze team composition, and evaluate player performance with detailed stats.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-cricket-navy text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Start Your Auction?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of cricket enthusiasts who are already using Cricket Bid Blitz to run their fantasy tournaments and training sessions.
            </p>
            <Button size="lg" className="bg-cricket-gold text-cricket-navy hover:bg-cricket-gold/90">
              <Link to="/auction">Get Started Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
