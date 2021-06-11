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
