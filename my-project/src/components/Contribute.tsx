import { useState } from "react";
import { useCrowdfunding } from "../hooks/useCrowdfunding.ts";
import { ArrowRight, Users, DollarSign, Calendar } from "lucide-react";

export default function CrowdfundingLandingPage() {
  const [amount, setAmount] = useState("1");
  const { contribute } = useCrowdfunding();
  
  const handleContribute = () => {
    contribute(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <header className="pt-20 pb-16 px-4 md:px-8 lg:px-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Fund the <span className="text-blue-400">Future</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Join our community of backers and help bring this revolutionary project to life with blockchain technology.
        </p>
      </header>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-6 mb-16 px-4">
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg flex items-center">
          <Users className="w-10 h-10 text-blue-400 mr-4" />
          <div>
            <p className="text-2xl font-bold">120+</p>
            <p className="text-gray-400">Backers</p>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg flex items-center">
          <DollarSign className="w-10 h-10 text-blue-400 mr-4" />
          <div>
            <p className="text-2xl font-bold">45 ETH</p>
            <p className="text-gray-400">Raised</p>
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg flex items-center">
          <Calendar className="w-10 h-10 text-blue-400 mr-4" />
          <div>
            <p className="text-2xl font-bold">15 Days</p>
            <p className="text-gray-400">Remaining</p>
          </div>
        </div>
      </div>

      {/* Main Contribution Section */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <div className="bg-gray-800 bg-opacity-80 rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Project Info */}
            <div className="p-8 md:w-1/2">
              <h2 className="text-2xl font-bold mb-4">About Our Project</h2>
              <p className="text-gray-300 mb-6">
                We're building the next generation decentralized platform that will revolutionize how people connect and create value together.
              </p>
              <div className="mb-6">
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-4 rounded-full w-3/4"></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>5 ETH raised</span>
                  <span>Goal: 10 ETH</span>
                </div>
              </div>
            </div>
            
            {/* Contribution Form */}
            <div className="bg-gray-900 p-8 md:w-1/2">
              <h3 className="text-xl font-semibold mb-4">Become a Backer</h3>
              <p className="text-gray-400 mb-6">
                Support our vision with any amount of ETH
              </p>
              
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <label className="block text-gray-400 text-sm mb-2">Contribution Amount (ETH)</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    className="flex-grow p-3 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                  <span className="ml-2 text-lg font-medium">ETH</span>
                </div>
              </div>
              
              <button
                onClick={handleContribute}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-6 rounded-lg text-lg font-medium hover:from-blue-600 hover:to-blue-700 transition duration-300 flex items-center justify-center"
              >
                Contribute Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                Secure transaction via blockchain
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 mb-16">
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Transparent</h3>
          <p className="text-gray-400">All contributions are recorded on the blockchain, ensuring complete transparency.</p>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Secure</h3>
          <p className="text-gray-400">Smart contracts ensure your contribution goes directly to the project.</p>
        </div>
        <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-3">Rewarding</h3>
          <p className="text-gray-400">Early backers receive exclusive benefits and potential returns.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <p>&copy; 2025 Blockchain Crowdfunding Project. All rights reserved.</p>
      </footer>
    </div>
  );
}