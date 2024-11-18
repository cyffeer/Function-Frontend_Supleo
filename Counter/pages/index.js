import { useState, useEffect } from "react";
import { ethers } from "ethers";
import counterAbi from "../artifacts/contracts/Assessment.sol/CounterContract.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [counterContract, setCounterContract] = useState(undefined);
  const [counter, setCounter] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update this after deployment
  const counterABI = counterAbi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts && accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    getCounterContract();
  };

  const getCounterContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, counterABI, signer);

    setCounterContract(contract);
  };

  const getCounterValue = async () => {
    if (counterContract) {
      const value = await counterContract.getCounter();
      setCounter(value.toNumber());
    }
  };

  const incrementCounter = async () => {
    if (counterContract) {
      const tx = await counterContract.increment();
      await tx.wait();
      getCounterValue();
    }
  };

  const decrementCounter = async () => {
    if (counterContract) {
      const tx = await counterContract.decrement();
      await tx.wait();
      getCounterValue();
    }
  };

  const initUser = () => {
    if (!ethWallet) {
      return <p>Please install MetaMask to use this app.</p>;
    }

    if (!account) {
      return <button onClick={connectAccount}>Connect Wallet</button>;
    }

    if (counter === undefined) {
      getCounterValue();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Counter Value: {counter}</p>
        <button onClick={incrementCounter}>Increment</button>
        <button onClick={decrementCounter}>Decrement</button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Counter Contract Application</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center;
        }
      `}</style>
    </main>
  );
}
