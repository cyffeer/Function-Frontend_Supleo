## Overview
This project is a decentralized application (dApp) featuring a simple counter implemented using a Solidity smart contract. 
The project allows users to interact with the counter through a web-based frontend connected to the Ethereum blockchain. 
Users can increment, decrement, and view the counter value in real-time using their MetaMask wallets.

## Features
- View the current value of the counter stored on the blockchain.
- Increment or decrement the counter using smart contract functions.
- Connect to the Ethereum blockchain via MetaMask.
- Deployed using Hardhat on a local or test Ethereum network.

## Project Structure
### 1. Smart Contract: `Assessment.sol`
The Solidity smart contract contains the core logic for the counter:
- **`counter`**: A state variable that stores the current counter value.
- **`getCounter`**: A public function to retrieve the current counter value.
- **`increment`**: A public function to increase the counter value by 1.
- **`decrement`**: A public function to decrease the counter value by 1.

### 2. Deployment Script: `deploy.js`
This script deploys the `Assessment.sol` smart contract to the blockchain. 
- It uses Hardhat and automatically assigns a contract address after deployment.
- This address is essential for interacting with the contract via the frontend.

### 3. Frontend: `index.js`
The React-based frontend enables user interaction with the smart contract. 
- **Functions**:
  - **Connect Wallet**: Allows users to connect their MetaMask wallet.
  - **Display Counter**: Fetches and displays the current counter value using `getCounter`.
  - **Increment/Decrement**: Sends transactions to call `increment` and `decrement` functions in the smart contract.
- Uses Ethers.js to manage blockchain interactions.
