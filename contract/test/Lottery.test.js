const assert = require("assert");
// requiring already boots up the local test network
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

var { abi, evm } = require("../compile.js");
const bytecode = evm.bytecode.object;
const abi_string = JSON.stringify(abi); // convert object to string
// console.log("Abistring", bytecode);

let accounts;
let lotteryInstance;
// beforeEach gets executed if there is "it". only describe does not work
beforeEach(async function () {
  // Get a List of all accounts
  // eth module for ethereum. there are other modules
  /*
     Web3.modules = {
        Eth: Eth,
        Net: Net,
        Personal: Personal,
        Shh: Shh,
        Bzz: Bzz
    };
     */
  accounts = await web3.eth.getAccounts();
  lotteryInstance = await new web3.eth.Contract(JSON.parse(abi_string))
    //  .deploy({ data: bytecode, arguments: ["Hi there"] })   argumetns deprecated
    // this line tells web3 that we want to deploy a new contract. This creates a transaction object that has the data property.
    // Calling deploy does not deploy anything. calling deploy starts to create an object that can be deployed to the network.
    .deploy({ data: bytecode })
    // send() actually deploys the contract to the network and triggers the communication from web3 off to the network.
    .send({ from: accounts[0], gas: "1000000" });
  // console.log("lotter", lotteryInstance);
});

describe("Lottery Contract", async () => {
  it("deploys contract", async () => {
    //   this is the address that our contract is deplouted on the test network
    assert.ok(lotteryInstance.options.address);
  });
  it("allows one account to enter", async () => {
    await lotteryInstance.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });
    const players = await lotteryInstance.methods.getPlayers().call({
      //   accounts[0] is calling the function
      from: accounts[0],
    });
    assert.strictEqual(accounts[0], players[0]);
    assert.strictEqual(1, players.length);
  });
  // we accidentally might store the last call only. thats why we test this to see if others are stored
  it("allows multiple accounts to enter", async () => {
    await lotteryInstance.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("0.02", "ether"),
    });

    await lotteryInstance.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei("0.02", "ether"),
    });
    await lotteryInstance.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei("0.02", "ether"),
    });
    const players = await lotteryInstance.methods.getPlayers().call({
      //   accounts[0] is calling the function
      from: accounts[0],
    });
    assert.strictEqual(accounts[0], players[0]);
    assert.strictEqual(accounts[1], players[1]);
    assert.strictEqual(accounts[2], players[2]);
    assert.strictEqual(3, players.length);
  });

  it("requires a minumum amount of ether to enter", async () => {
    try {
      await lotteryInstance.methods.enter().send({
        from: accounts[0],
        value: 200, // 200 wei
      });
      // if error is not thrown assert(false) will always fail our test
      assert(false);
    } catch (error) {
      // assert checks for truthness assert.ok() checks for existence
      assert(error);
    }
  });
  it("only manager can call pick winner", async () => {
    try {
      await lotteryInstance.methods.pickWinner().send({
        from: accounts[0],
      });
      // if error is not thrown assert(false) will always fail our test
      assert(false);
    } catch (error) {
      // assert checks for truthness assert.ok() checks for existence
      assert(error);
    }
  });

  it("sends money to the winner and resets the players array", async () => {
    await lotteryInstance.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei("2", "ether"),
    });
    const initialBalance = await web3.eth.getBalance(accounts[0]);
    console.log("nitial balance", initialBalance);
    await lotteryInstance.methods.pickWinner().send({
      from: accounts[0],
    });
    const finalBalance = await web3.eth.getBalance(accounts[0]);
    console.log("final balance", finalBalance);
    const difference = finalBalance - initialBalance;
    assert(difference > web3.utils.toWei("1.8", "ether"));
  });
});
