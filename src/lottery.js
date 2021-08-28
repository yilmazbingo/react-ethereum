// the only purpose is to set up the local copy of the contract that refers to the correct address on the ropsten network.
import web3 from "./web3";

// get the address that contract is deployed to
const address = "0x2622a36Ab440c1f1ec01389d70de67158FdFc8c1";
const abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [],
    name: "enter",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "getPlayers",
    outputs: [
      { internalType: "address payable[]", name: "", type: "address[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "manager",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pickWinner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "players",
    outputs: [{ internalType: "address payable", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
];

/*
local copy of contract means we are going to make an object that exists inside of our browser
this is not the actual contract that exist on the block. 
It is a local js only copy that is meant to represent what is actually occuring on the block.
local copy will be created by the contract_abi+address
*/

const lotteryInstance = new web3.eth.Contract(abi, address);
console.log(lotteryInstance);
export default lotteryInstance;
