// src/components/PlayerList.js
import React, { useState } from 'react';
import Modal from './Modal';

const PlayerList = ({ players, onUpdatePlayers }) => {
    const [showModal, setShowModal] = useState(null);

    const handleActionPlayer = (action, player) => {
        if (action === 'edit') {
            setShowModal({ action, ...player });
        } else if (action === 'delete') {
            const updatedPlayers = players.filter((p) => p.id !== player.id);
            onUpdatePlayers(updatedPlayers);
        }
    };

    return (
        <div>
            <h2>Player List</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player) => (
                        <tr key={player.id}>
                            <td>{player.id}</td>
                            <td>{player.name}</td>
                            <td>{player.address}</td>
                            <td>
                                <button onClick={() => handleActionPlayer('edit', player)}>Edit</button>
                                <button onClick={() => handleActionPlayer('delete', player)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && <Modal player={showModal} onClose={() => setShowModal(null)} onUpdate={onUpdatePlayers} />}
        </div>
    );
};

export default PlayerList;
