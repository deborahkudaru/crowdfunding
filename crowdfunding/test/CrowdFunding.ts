import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("CrowdFunding", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCrowdFunding() {
  
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
    const crowdfund = await CrowdFunding.deploy();

    return { crowdfund, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should test the contract deploys correctly", async function () {
      const { crowdfund, owner, otherAccount } = await loadFixture(deployCrowdFunding);

      const ownerBalance = await crowdfund.balanceOf(owner.address);

      expect(ownerBalance).to.equal(0);
    });

    it("Should test contribution successfully", async function () {
      const { crowdfund, owner, otherAccount } = await loadFixture(deployCrowdFunding);


       await crowdfund.contribute({ value: ethers.parseEther("1") });
       await crowdfund.contribute({ value: ethers.parseEther("1") });

      const ownerBalance = await crowdfund.balanceOf(owner.address);

      expect(ownerBalance).to.equal(2);

    });

    it("Should test contribution successfully", async function () {
      const { crowdfund, owner, otherAccount } = await loadFixture(deployCrowdFunding);


       await crowdfund.contribute({ value: ethers.parseEther("1") });
       await crowdfund.contribute({ value: ethers.parseEther("1") });

      const ownerBalance = await crowdfund.balanceOf(owner.address);

      expect(ownerBalance).to.equal(2);

    });

  });

});
