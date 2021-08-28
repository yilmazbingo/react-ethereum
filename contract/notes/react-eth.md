If we have a button to enter a lottery, server is not involved in this process. Whenever user triws to change some data, they do not reach back out to server. The server is not at all involved in that process. Instead Ethereum application running inside browser will make use of web3 which communicates with metaMask, metaMask creates a transaction, signs it with the user's private key and sends that transaction to ethereum network.

Very important thing to understand here the only way for a user to change data is through the use of their public and private keys. Anytime user changes data, they have to send a transaction to the network and that costs some amount of money and you want your users to spend that money, you dont want your application spend that money. Those public and private keys only ever exists on the user's machine, public and private keys will never ever under any circumstance be sent to your server.

we dont use server we use client to interact with the ethereum.
