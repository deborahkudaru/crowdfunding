import { ethers } from "ethers";
import crowdfundingABI from "../abi/Crowdfunding.json";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export function useCrowdfunding() {
  const totalAmount = async () => {
    if (!window.ethereum) return alert("No wallet detected");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, crowdfundingABI.abi, provider);

    try {
      const raisedAmount = await contract.totalAmount();
      return ethers.formatEther(raisedAmount);
    } catch (error) {
      console.error("Failed to fetch raised amount", error);
      return "0";
    }
  };

  const goal = async () => {
    if (!window.ethereum) return alert("No wallet detected");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, crowdfundingABI.abi, provider);

    try {
      const goalAmount = await contract.goalAmount();
      return ethers.formatEther(goalAmount);
    } catch (error) {
      console.error("Failed to fetch goal amount", error);
      return "0";
    }
  };

  const contribute = async (amount: string) => {
    if (!window.ethereum) return alert("No wallet detected");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, crowdfundingABI.abi, signer);

    try {
      const tx = await contract.contribute({ value: ethers.parseEther(amount) });
      await tx.wait();
      alert("Contribution successful!");
    } catch (error) {
      console.error("Transaction failed", error);
      alert("Transaction failed");
    }
  };

  return { contribute, totalAmount, goal };
}
