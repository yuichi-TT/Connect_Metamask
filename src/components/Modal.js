// src/components/Modal.js
import React, { useState } from 'react';

const Modal = ({ player, onClose, onUpdate }) => {
    const [name, setName] = useState(player.name || '');
    const [address, setAddress] = useState(player.address || '');

    const handleSubmit = () => {
        const updatedPlayer = { ...player, name, address };
        onUpdate(updatedPlayer);
        onClose();
    };

    return (
        <div className="modal">
            <div>
                <h3>Edit Player</h3>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" />
                <button onClick={handleSubmit}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default Modal;
