// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC721URIStorage.sol";

contract myNFT is ERC721URIStorage {

    uint private _tokenId = 0;

    constructor() ERC721("Badge", "BDG") public { }

    function mintNFT(address to, string memory tokenURI) public returns (uint256) {
        _mint(to, _tokenId);
        _setTokenURI(_tokenId, tokenURI);

        return _tokenId;
    }
}