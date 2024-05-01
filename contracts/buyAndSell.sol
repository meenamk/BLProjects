// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract buyAndSell is ERC20{
    uint256 constant public TOTAL_LAND_SUPPLY = 1000000 * 10 ** 18; // Total supply of LAND tokens
    address public owner;
    constructor() ERC20("LAND Token", "LAN"){
        _mint(msg.sender, TOTAL_LAND_SUPPLY);
        owner = msg.sender;
    }  

    event amountTransfered(address indexed _from, address indexed _to, uint indexed _amount);

     function purchaseLand(address _buyer, address _seller, uint256 _LandPrice) public payable {
        //require(address(_buyer).balance>=_LandPrice, "Insufficient balance");
        _transfer(_buyer,_seller,_LandPrice);
        emit amountTransfered(_buyer, _seller, _LandPrice);
    }

    
}