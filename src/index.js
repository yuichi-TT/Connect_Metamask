// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Chỉnh sửa phần import
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Tạo root
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
