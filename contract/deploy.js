const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const { abi, evm } = require("./compile");
const config = require("./config");

const bytecode = evm.bytecode.object;
const abi_string = JSON.stringify(abi);

console.log("abi_String", abi_string);

const metamask_mnemonic = config.metamask_mnemonic;

const ropsten_network = config.ropsten_network;
const provider = new HDWalletProvider({
  mnemonic: {
    phrase: metamask_mnemonic,
  },
  providerOrUrl: ropsten_network,
});

const web3 = new Web3(provider);

const deploy = async () => {
  try {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(abi_string))
      .deploy({ data: "0x" + bytecode })
      .send({ from: accounts[0], gas: "1000000" });

    // this address is used in etherscan to find the account
    console.log("Contract deployed to", result.options.address);
    console.log("ABI:" + abi_string);
  } catch (error) {
    console.log(error);
  }
};
deploy();
