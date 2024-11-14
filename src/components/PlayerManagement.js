// PlayerManagement.js
import React, { useState } from 'react';

function PlayerManagement() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Siri', health: 80, strength: 75 },
    { id: 2, name: 'Alexa', health: 90, strength: 65 },
    { id: 3, name: 'Sam Green', health: 70, strength: 80 },
    { id: 4, name: 'Emma White', health: 85, strength: 70 },
    { id: 5, name: 'Alex Brown', health: 88, strength: 72 },
  ]);
  
  const [showForm, setShowForm] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ name: '', health: '', strength: '' });

  const addPlayer = () => {
    setPlayers([...players, { ...newPlayer, id: players.length + 1 }]);
    setShowForm(false);
    setNewPlayer({ name: '', health: '', strength: '' });
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  const updatePlayer = (id) => {
    const updatedPlayers = players.map(player =>
      player.id === id ? { ...player, ...newPlayer } : player
    );
    setPlayers(updatedPlayers);
  };

  return (
    <div className="player-management">
      <h1>User Management</h1>
      <button className="add-player-btn" onClick={() => setShowForm(!showForm)}>Add Player</button>

      {showForm && (
        <div className="form-container">
          <input
            placeholder="Name"
            value={newPlayer.name}
            onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
          />
          <input
            placeholder="Health"
            value={newPlayer.health}
            onChange={(e) => setNewPlayer({ ...newPlayer, health: e.target.value })}
          />
          <input
            placeholder="Strength"
            value={newPlayer.strength}
            onChange={(e) => setNewPlayer({ ...newPlayer, strength: e.target.value })}
          />
          <button className="save-btn" onClick={addPlayer}>Save</button>
        </div>
      )}

      <table className="player-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Health</th>
            <th>Strength</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map(player => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.health}</td>
              <td>{player.strength}</td>
              <td>
                <button className="edit-btn" onClick={() => updatePlayer(player.id)}>Edit</button>
                <button className="delete-btn" onClick={() => deletePlayer(player.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button>1</button>
        <button>2</button>
        <button>3</button>
      </div>
    </div>
  );
}

export default PlayerManagement;
