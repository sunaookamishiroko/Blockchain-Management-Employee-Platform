// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./ERC20.sol";

contract WonToken {
    ERC20 public token;

    constructor() public {
        token = new ERC20("WON", "WON", address(this));
    }
    
    function buy() payable public {
        uint256 amountTobuy = (msg.value / 1000 gwei);
        uint256 dexBalance = token.balanceOf(address(this));

        require(amountTobuy > 0, "You need to send some Ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");

        token.transfer(msg.sender, amountTobuy);
    }
    
    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");

        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount * 1000 gwei); 
    }

    function geterc20address() public view returns(address) {
        return address(token);
    }
}