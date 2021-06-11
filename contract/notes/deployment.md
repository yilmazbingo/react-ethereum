**\*** A contract is created through a transaction**\***

- We take an external account, we submit a transaction with some compiled byte code, with the data field and "to" Field left blank. When we deploy a contract to Ganache, we have to make sure that we have some accounts that we can use to actuallt deploy it. We can deploy a contract when we have access to an account. Ganache will automatically create set of accounts. Those accounts are created in unlocked state. Web3 is already configured to connect to Ganache. We are going to use web3 to access this list of unlocked accounts that are created automatically.

  ## Accounts

  EOA= External owned account controlled by public private key. Normall used to save ETHER.

  **CONTRACT-ACCOUNT=** Conrolled by node. They can also store data. Therefore they have a storage field and a code field that contains machine instructions on how to manipulate the stored data. Contracts accounts are smart contracts that live on the blockchain.

- Instead of having private key, they are controlled by code.That code never get altered. Immutable. If you make a typo then you need to make a brand new smart contract which will exist in a brand new address.
- they dont need to have a balance. Since they can message and interact with other smart contracts, you can have smart contracts that interacting each other, delivering some tasks like voting. so you dont need balance for voting
- Daps are collections of many smart contracts that are working together.

  ## Transaction

  It is a message sent from an account to another account. We could transfer Ether between accounts through sending transaction to an EOA.

  If the target account is a contract account, sending transaction will trigger its code execution. Since each transaction will be executed on all nodes in ethereum, code execution or transaction will be recorded by blockchain.

- An unlock account means we do not need to do any special thing with any private keys or public keys to make access to or to get access to.
  -we are going to take contract source, that source will be placed into the solidity compiler. Compiler will spit out the ABI and Contract ByteCode. Thsi bytecode actually gets deplyed to the network.
- abi(application binary interface) is the javascript interpretation of what contract is.
- deploy and test file both needs compile.js

## Testing

- we are wriitng functional tests that can directly call different functions that exit inside of our contract.
- We are going to deploy Bytecode to Ganache local test network. This test network is going to be running on our laptop. we are going to geenrate a new local network solely for the purpose of deploying and testing our contract.
- Test network will be created by Ganache.
- On the otherside we are going to take ABI code and feed it into Web3. Web3 allows us to get programmatic access to a deployed contract on the blockchain. Web3 is a portal into what is going on the test network.

## Web3

web3.js is a collection of libraries which allow you to interact with a local or remote ethereum node, using a HTTP or IPC connection. The web3 JavaScript library interacts with the Ethereum blockchain. It can retrieve user accounts, send transactions, interact with smart contracts, and more.

- the purpose of each Web3 isntance is to connect to a different Ethereum network.

  Ganache ----->>> Provider ----> into WEB3

- Provider is a communication layer between the Web3 library and some specific ethereum network. Every Provier that we make use of for connecting to different networks has an identical set of methods on it. These different methods allow the Web3 library to essentially send a request over to a local Gancahe network and receive a response from that request. Provide is like a phone, Gancahe and Web3 are 2 people who are trying to communicate
- Web3 is always going to be connecting or talking to the communicating with some Ethereum network. So Web3 always expects you to provide a provider.

## Truffle

It is a cli. it can use to aid in contract creation, local testing-programatic automated testing and also useful for deployment
