const path = require("path");
// whenever we require a file into a node project, contents of that file gets executed by node as it is a js code.
const fs = require("fs");
const solc = require("solc");

const lotteryPath = path.resolve(__dirname, "contracts", "Lottery.sol");
const source = fs.readFileSync(lotteryPath, "utf8");

var input = {
  language: "Solidity",
  // we could compile multiple contracts
  sources: {
    "Lottery.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var contract_name = "Lottery";

var output = JSON.parse(solc.compile(JSON.stringify(input))); // an object
// it spits out bytecode and interface
// console.log("output", output);
// console.log("output-object", output.contracts["Lottery.sol"][contract_name]);
// console.log(output.contracts["Lottery.sol"][contract_name]);

module.exports = output.contracts["Lottery.sol"][contract_name];

// module.exports = solc.compile(source, 1).contracts[":Lottery"];
