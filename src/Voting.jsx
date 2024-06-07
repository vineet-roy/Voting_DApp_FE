import React, { useState, useEffect } from "react";
import getWeb3 from "./web3";
import VotingContract from "./VotingContract.json"; // Ensure this path is correct
import "./App.css";
import { toast } from 'react-toastify';
const CONTRACT_ADDRESS = "0x8CD891426c63fCF818Ca4729BA8D22b5cDe51f8a";

const Voting = () => {
  const [web3, setWeb3] = useState(null);
  const [accounts, setAccounts] = useState(null);
  const [contract, setContract] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [newProposal, setNewProposal] = useState("");

  const [winner, setWinner] = useState("");
  const [loading, setLoading] = useState(true);
  const [voterAddress, setVoterAddress] = useState("");

    useEffect(() => {
      const init = async () => {
        try {
          const web3Instance = await getWeb3();
          setWeb3(web3Instance);
  
          const accounts = await web3Instance.eth.getAccounts();
          setAccounts(accounts);
  
          if (VotingContract && CONTRACT_ADDRESS) {
            const contractInstance = new web3Instance.eth.Contract(
              VotingContract,
              CONTRACT_ADDRESS
            );
            setContract(contractInstance);
  
            // Fetch proposals
            const proposalCount = await contractInstance.methods
              .proposalsLength()
              .call();
            let proposalsArray = [];
            for (let i = 0; i < proposalCount; i++) {
              let proposal = await contractInstance.methods.proposals(i).call();
              proposalsArray.push(proposal);
            }
            setProposals(proposalsArray);
  
          } else {
            console.error("ABI or Contract Address is undefined");
          }
  
          setLoading(false); // Set loading to false once everything is loaded
        } catch (error) {
          console.error("Error during contract initialization:", error);
        }
      };
  
      init();
    }, []);

    const handleVote = async (proposalIndex) => {
    };

    const fetchWinner = async () => {
    };

    const handleRightToVote = async (voterAddress) => {
    };

    const handleAddProposal = async () => {
      if (!contract) {
        console.error("Contract not loaded yet");
        return;
      }
  
      try {
        await contract.methods
          .addProposal(newProposal)
          .send({ from: accounts[0] });
        const updatedProposals = await contract.methods.proposals().call();
        setProposals(updatedProposals);
        setNewProposal("");
        toast.success("Proposal Added Successfully!");
  
      } catch (error) {
        console.error("Error adding proposal:", error);
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
        {/* <div className="mb-4">
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
        </div> */}

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
            value={voterAddress}
            onChange={(e) => setVoterAddress(e.target.value)}
            className="border border-white bg-gray-500 rounded px-2 py-1 placeholder:text-gray-300"
          />
          <button
            onClick={() => handleRightToVote(voterAddress)}
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
