import React from 'react';
import Wallet from './components/Wallet';

function App() {
    return (
        <div>
            <Wallet>
                <p>Đây là nội dung con chỉ hiển thị khi đã kết nối MetaMask.</p>
            </Wallet>
        </div>
    );
}

export default App;
