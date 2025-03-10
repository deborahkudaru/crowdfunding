// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract CrowdFunding is ERC721URIStorage {
    address public owner;
    uint256 public fixedAmount = 1 ether;
    uint256 public totalAmount;
    uint256 public goal = 10 ether;
    uint256 private tokenID;

    mapping(address => bool) public contributors;

    constructor() ERC721("CrowdFunding", "CF") {
        owner = msg.sender;
    }

    function contribute() public payable {
        require(
            msg.value == fixedAmount,
            "Contribution must be exactly the fixed amount"
        );
        require(
            totalAmount + msg.value <= goal,
            "Contribution exceeds fundraising goal"
        );

        totalAmount += msg.value;

        uint256 newTokenID = tokenID;
        _mint(msg.sender, newTokenID);

        _setTokenURI(newTokenID, generateTokenURI(msg.sender, newTokenID));
        contributors[msg.sender] = true;
        tokenID++;
    }

    function generateTokenURI(
        address _contributor,
        uint256 _tokenID
    ) internal pure returns (string memory) {
        string memory svg = generateSVG(_contributor, _tokenID);
        string memory svgbase64 = Base64.encode(bytes(svg));

        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name": "CrowdFunding Token #',
                                Strings.toString(_tokenID),
                                '", "description": "An NFT representing a contribution to a crowdfunding campaign", "image": "data:image/svg+xml;base64,',
                                svgbase64,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function generateSVG(
        address _contributor,
        uint256 _tokenID
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350">',
                    '<rect width="100%" height="100%" fill="#ffe4b5"/>',
                    '<circle cx="175" cy="175" r="80" fill="#8b5a2b" stroke="#5a3825" stroke-width="4"/>',
                    '<circle cx="95" cy="175" r="30" fill="#8b5a2b" stroke="#5a3825" stroke-width="4"/>',
                    '<circle cx="255" cy="175" r="30" fill="#8b5a2b" stroke="#5a3825" stroke-width="4"/>',
                    '<ellipse cx="175" cy="190" rx="50" ry="40" fill="#deb887" stroke="#5a3825" stroke-width="4"/>',
                    '<circle cx="155" cy="170" r="8" fill="black"/>',
                    '<circle cx="195" cy="170" r="8" fill="black"/>',
                    '<ellipse cx="175" cy="190" rx="10" ry="5" fill="#5a3825"/>',
                    '<path d="M 160 210 Q 175 225, 190 210" stroke="#5a3825" stroke-width="4" fill="none"/>',
                    '<path d="M 125 120 Q 175 80, 225 120 L 225 125 Q 175 90, 125 125 Z" fill="#ff69b4" stroke="#5a3825" stroke-width="4"/>',
                    '<circle cx="95" cy="200" r="6" fill="gold"/>',
                    '<circle cx="255" cy="200" r="6" fill="gold"/>',
                    '<text x="50%" y="90%" dominant-baseline="middle" text-anchor="middle" font-size="12" fill="black">',
                    Strings.toHexString(uint256(uint160(_contributor)), 20),
                    "</text></svg>"
                )
            );
    }

    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");
        require(totalAmount >= goal, "Fundraising goal has not been reached");

        payable(owner).transfer(totalAmount);
        totalAmount = 0;
    }
}
