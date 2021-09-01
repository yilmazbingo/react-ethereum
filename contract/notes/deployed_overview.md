`lotteryInstance = await new web3.eth.Contract(JSON.parse(abi_string))`

- we have to pass json data to the Contract

Contract is a constructor and allows us to interact with the existing contracts that exist on the blockchain already or to create and deploy new contracts. we need to pass js object that is why we parse. First line just tells web3 that there is a contract with given interface.

## deploy

` .deploy({ data: bytecode})`
this line tells web3 that we want to deploy a new contract. This creates a transaction object that has the data property.
Calling deploy does not deploy anything. calling deploy starts to create an object that can be deployed to the network.

` .send({ from: accounts[0], gas: "1000000" })`
this actually deploys the contract to the network. send() actually triggers the communication from web3 off to the network.

## Web3

Web3 library is not only for use in deploying contracts. We can also use Web3 to get access to contracts that have already been deployed to the network. Eventually we are going to deploy a contract and then try to interact with it after the fact from some js application.

- if we want to intereact with the contract that has already been deployed, we need to know the ABI and address of deployed contract. we dont need bytecode because we are not trying to understand what our contract is doing internally. we just want to interface with it.
- if we want to deploy a contract, we need ABi and bytecode. There is not any address yet.
  ```js
  lotteryInstance = await new web3.eth.Contract(JSON.parse(abi_string))
    .deploy({ data: bytecode, arguments: ["Hi there"] })
    .send({ from: accounts[0], gas: "1000000" });
  ```
  lotteryInstance is the javascript representation of the contract. this object represents what exist on blockchain. Its type is Contract. this object has "methods" property to interact with the cont
