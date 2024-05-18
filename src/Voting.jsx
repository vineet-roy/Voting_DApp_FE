import React, { useState, useEffect } from "react";
import getWeb3 from "./web3";
import VotingContract from "./VotingContract.json"; // Ensure this path is correct
import "./App.css";
import { toast } from 'react-toastify';
const CONTRACT_ADDRESS = "0xcae9BAF6dB906Bed336CdB5E886823dbAE8Ae4e9";

const Voting = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState("");

  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(true);
  const [delegateAddress, setDelegateAddress] = useState("");

  useEffect(() => {
    const init = async () => {
      setLoading(false);
    };

    init();
  }, []);

  const handleVote = async (proposalIndex) => {
  };

  const fetchWinner = async () => {
  };

  const handleDelegate = async (delegateAddress) => {
  };

  const handleAddProposal = async () => {
    if (!contract) {
      console.error("Contract not loaded yet");
      return;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("Proposals", proposals);

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="card bg-gray-600">
        <h1 className="text-3xl font-bold mb-4 text-white">Voting DApp</h1>
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-300">Proposals</h2>
          <ul>
            {proposals.map((proposal, index) => (
              <li
                key={index}
                className="py-2 flex items-center justify-between"
              >
                <span>
                  {proposal.name} - {parseInt(proposal.voteCount)} votes
                </span>
                <button
                  onClick={() => handleVote(index)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Vote
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <input
            type="text"
            value={newProposal}
            onChange={(e) => setNewProposal(e.target.value)}
            placeholder="New proposal name"
            className="border border-white bg-gray-500 rounded px-2 py-1 placeholder:text-gray-300"
          />
          <button
            onClick={handleAddProposal}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 ml-2 rounded"
          >
            Add Proposal
          </button>
        </div>

        <button
          onClick={fetchWinner}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 rounded"
        >
          Fetch Winner
        </button>
        {winner && (
          <h2 className="text-2xl font-bold mt-4">Winner: {winner}</h2>
        )}
        <div className="delegate-voting-rights mt-4">
          <h2 className="text-2xl font-bold">Giving Rights to Vote</h2>
          <input
            type="text"
            placeholder="Address"
            value={delegateAddress}
            onChange={(e) => setDelegateAddress(e.target.value)}
            className="border border-white bg-gray-500 rounded px-2 py-1 placeholder:text-gray-300"
          />
          <button
            onClick={() => handleDelegate(delegateAddress)}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 ml-2 rounded"
          >
            Whitelist Voter
          </button>
        </div>
      </div>
    </div>
  );
};

export default Voting;
