// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Uncomment this line to use console.log
import "hardhat/console.sol";

contract LinkDotContract is ERC721, Ownable {
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    mapping(uint256 => address) badgeIdToOwner;
    mapping(address => uint256) ownerToBadgeId;

    string public baseTokenURI;

    event Attest(address indexed to, uint256 indexed tokenId);
    event Revoke(address indexed to, uint256 indexed tokenId);

    constructor(
        string memory baseURI,
        string memory badgeName,
        string memory badgeSymbol
    ) ERC721(badgeName, badgeSymbol) {
        setBaseURI(baseURI);
    }

    function claim() external returns (uint256) {
        // save the owner of the badge
        badgeIdToOwner[_tokenIds.current()] = msg.sender;
        _safeMint(msg.sender, _tokenIds.current());
        _tokenIds.increment();

        return ownerToBadgeId[msg.sender];
    }

    function burn(uint256 tokenId) external {
        require(
            ownerOf(tokenId) == msg.sender,
            "Only owner of the token can burn it"
        );
        _burn(tokenId);
    }

    // function revoke(uint256 tokenId) external onlyOwner {
    //     _burn(tokenId);
    // }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256
    ) internal pure override {
        require(
            from == address(0) || to == address(0),
            "Not allowed to transfer token"
        );
    }

    function _afterTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override {
        if (from == address(0)) {
            emit Attest(to, tokenId);
        } else if (to == address(0)) {
            emit Revoke(to, tokenId);
        }
    }

    function _burn(uint256 tokenId) internal override {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return _tokenURI(tokenId);
    }

    function _tokenURI(uint256 tokenId) internal view returns (string memory) {
        console.log("tokenId", tokenId);
        return baseTokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }
}
