//SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

contract VendingMachine {
    address public owner;
    mapping(address => uint) public itemBalances;

    constructor() {
        owner = msg.sender;
        itemBalances[address(this)] = 1000;
    }

    function getVendingMachineBalance() public view returns(uint) {
        return itemBalances[address(this)];
    }

    function reStock(uint amount) public {
        require(msg.sender == owner, "Only Owner can restock");
        itemBalances[address(this)] += amount;

    }

    function purchase(uint amount) public payable {
        require(itemBalances[address(this)] >= amount, "Not enough items available");
        require(msg.value >= 2 * amount, "1 Items needs atleast 2 Ether");
        itemBalances[address(this)] -= amount;
        itemBalances[msg.sender] += amount;
    }
}