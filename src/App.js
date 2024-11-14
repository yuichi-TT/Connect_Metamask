// src/App.js
import React, { useState, useEffect } from 'react';
import { useMetamask } from './hooks/useMetamask';
import Wallet from './components/Wallet';
import PlayerList from './components/PlayerList';

const App = () => {
    const { state: { wallet } } = useMetamask();
    const [players, setPlayers] = useState([]);
    
    useEffect(() => {
        if (wallet) {
            // Load players from localStorage (or backend)
            const savedPlayers = JSON.parse(localStorage.getItem("players")) || [];
            setPlayers(savedPlayers);
        }
    }, [wallet]);

    const handleUpdatePlayers = (updatedPlayers) => {
        setPlayers(updatedPlayers);
        localStorage.setItem("players", JSON.stringify(updatedPlayers));  // Save to localStorage
    };

    return (
        <div>
            <h1>Player Management</h1>
            <Wallet>
                <PlayerList players={players} onUpdatePlayers={handleUpdatePlayers} />
            </Wallet>
        </div>
    );
};

export default App;
