## Warnings

- Intall chrome metamask plugin.
- Since I am deploying the code to Ropsten, make sure you use Ropsten network account in metamask.
- make sure Metamask is unlocked

## Deploy the Contract

in contract directory
`npm run deploy`

```js
console.log("Contract deployed to", result.options.address);
console.log("ABI:" + abi_string);
```

Take the address of contract and abi_string and use it inside "src/lottery.js

## Start the app

`npm run dev`


## Infura

Ganache is a popular tool but it can only be used to test locally. If we want to deploy or test smart contract in production env or other public testing envs, we must connect to a full node. There are two options to do so:

1- **Running a full node on local**

  This solution requires that developers need to configure, compile, and launch an Ethereum full node, where developers need to sync all the blocks. It is apparently complicated. To date, Ethereum block sync is much more difficult than before: First, the block data size is huge, which is close to TB level; Second, in order to full sync, it is better to use SSD due to the constraints of bandwidth and hard disc. Therefore, this solution will require a lot of work.

2- **Public hosted Ethereum node**

Smart contract developer can also choose some public hosted nodes which are Ethereum full node themselves. Developer can connect to those nodes directly through programming interface with no need to setup up their own Ethereum node or wallet, e.g., Infura (http://infura.io) is a popular public hosted node. The drawback of the public hosted node is that developer must trust it, where there might be some security concerns. For development and testing, however, it is fast and efficient.