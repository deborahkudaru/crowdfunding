import { useState, useEffect } from "react";
import { useCrowdfunding } from "../hooks/useCrowdfunding"; // Removed .ts extension
import { ArrowRight, Users, DollarSign, Calendar } from "lucide-react";

export default function CrowdfundingLandingPage() {
  const [amount, setAmount] = useState("0.01");
  const { contribute, totalAmount, goal } = useCrowdfunding();
  const [totsamount, settotamount] = useState(0); // Initialize state with default values
  const [goals, setGoals] = useState(0);

  const handleContribute = () => {
    contribute(amount);
  };

  useEffect(() => {
    totalAmount().then((value) => settotamount(Number(value))).catch(console.error);
  }, [totalAmount]);

  useEffect(() => {
    goal().then((value) => setGoals(Number(value))).catch(console.error);
  }, [goal]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <header className="pt-20 pb-16 px-4 md:px-8 lg:px-16 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Fund for <span className="text-blue-400">Party</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Join in contributing to our after-party for the end of BlockFuse Labs Web3 Cohort II.
        </p>
      </header>

      {/* Stats Section */}
      <div className="flex flex-wrap justify-center gap-6 mb-16 px-4">
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg flex items-center">
          <Users className="w-10 h-10 text-blue-400 mr-4" />
          <div>
            <p className="text-2xl font-bold">12+</p>
            <p className="text-gray-400">Developers</p> {/* Fixed typo */}
          </div>
        </div>
        <div className="bg-gray-800 bg-opacity-70 p-6 rounded-lg flex items-center">
          <DollarSign className="w-10 h-10 text-blue-400 mr-4" />
          <div>
            <p className="text-2xl font-bold">{totsamount} ETH</p>
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
                We wanna partyyyyyy
              </p>
              <div className="mb-6">
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-400 h-4 rounded-full"
                    style={{ width: `${(totsamount / goals) * 100 || 0}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm">
                  <span>{totsamount} ETH raised</span>
                  <span>Goal: {goals} ETH</span>
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
                <label className="block text-gray-400 text-sm mb-2">
                  Contribution Amount (ETH)
                </label>
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

      {/* Footer */}
      <footer className="bg-gray-900 py-8 text-center text-gray-400">
        <p>&copy; 2025 Blockchain Crowdfunding Project. All rights reserved.</p>
      </footer>
    </div>
  );
}
