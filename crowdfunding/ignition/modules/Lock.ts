
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("CrowdFundingModule", (m) => {
  const crowdfunding = m.contract("CrowdFunding");

  return { crowdfunding };
});
