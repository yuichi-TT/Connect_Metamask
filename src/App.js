// App.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import PlayerManagement from './components/PlayerManagement';
import './App.css'; // Thêm dòng này để import CSS

function App() {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access or error:", error);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="App">
      {!account ? (
        <button className="connect-btn" onClick={connectWallet}>Connect MetaMask</button>
      ) : (
        <PlayerManagement />
      )}
    </div>
  );
}

export default App;
