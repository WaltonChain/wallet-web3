# WTC Web3 Wallet

This is the frontend Vue.js application for the WTC Web3 Wallet.

## Prerequisites

-   Yarn (https://classic.yarnpkg.com/en/docs/install/)
-   Recent version of npm (9.6.6)
-   Node v20
-   Gecko, WTC client in Golang (https://github.com/ava-labs/avalanchego)
-   @ledgerhq

## Installation

1. Clone the repo `git clone https://github.com/WaltonChain/wallet-web3.git`
2. Go to root of the project `cd wallet-web3`
3. Install javascript dependencies with `yarn install`.

## Running The Project

In order for the wallet to work, it needs the WTC network to operate on. By default the wallet will connect to the WTC mainnet.

1. If you want to connect to a local network, make sure you have installed and able to run a WTC node properly.
2. Run the project with hot reloading `yarn dev`

When you go to the website on your browser, you might get a warning saying
"Site is not secure". This is because we are signing our own SSL Certificates. Please ignore and continue to the website.

## Deployment

1.  Compile and minify to have a production ready application with `yarn build`.
2.  Serve from the `/dist` directory.

## Network

By default the wallet will connect to the WTC mainnet. 

## Explorer API

A valid explorer API is required to correctly display balances for Mnemonic and Ledger type wallets.
The wallet uses the WTC Explorer API to display wallet transaction history.

WARNING: This history might be out of order and incomplete.

## Browser Support

We suggest using Google Chrome to view the WTC Wallet website.

### Firefox and https

Firefox does not allow https requests to localhost. But the WTC Wallet uses https by default, so we will need to change this to http. Make this switch by editing the `vue.config.js` file in the root directory and change

```
devServer: {
    https: true
},
```

to

```
devServer: {
    https: false
},
```

and run `yarn dev` to reflect the change.

# Accounts

The wallet can encrypt your private keys into a secure file encrypted by a password.

# Default Connections

The wallet needs to connect to an WTC node, and an explorer node to operate properly.

By default, there are two network options to connect to: `Mainnet`.

##### Mainnet

-   WTC RPC: `https://node.waltonchain.pro`
-   Explorer API: `https://www.waltonchain.pro/v2/api/`