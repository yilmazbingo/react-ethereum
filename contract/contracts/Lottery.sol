// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <=0.8.4;

contract Lottery {
    // address payable is the same as address, but have transfer and send members.
    // those variables are stored in storage
    address payable public manager;
    address payable[]  public players;
    
    constructor (){
        // msg.sender is an address where the current function call came from
        manager = payable(msg.sender);
    }
    
    function enter() public payable {
        //  msg.value is the amount of wei sent with the message to the contract
        require(msg.value > .01 ether);
        players.push(payable(msg.sender));
    }
    
    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty,block.timestamp)));

    }
    
    function pickWinner() public restricted {
        uint index = random() % players.length;
        // transfer reverts on failure
        players[index].transfer(address(this).balance);
        // resets the array
        players = new address payable[](0);
    }
    
    modifier restricted() {
        require(msg.sender == manager);
        _;
    }
    
    function getPlayers() public view returns (address payable[] memory ) {
        return players;
    }
}   

// 