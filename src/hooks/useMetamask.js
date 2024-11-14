import { useReducer, useEffect } from "react";

const initialState = {
    status: "pageNotLoaded",
    isMetamaskInstalled: Boolean(window.ethereum),
    wallet: null,
    balance: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, status: "loading" };
        case "connect":
            return {
                ...state,
                status: "connected",
                wallet: action.wallet,
                balance: action.balance,
            };
        case "disconnect":
            return { ...state, status: "disconnected", wallet: null, balance: null };
        case "updateBalance":
            return { ...state, balance: action.balance };
        case "updateWallet":
            return { ...state, wallet: action.wallet };
        default:
            return state;
    }
}

export function useMetamask() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const balance = await window.ethereum.request({
                    method: "eth_getBalance",
                    params: [accounts[0], "latest"],
                });

                dispatch({
                    type: "connect",
                    wallet: accounts[0],
                    balance: parseInt(balance, 16) / 10 ** 18,
                });
            } catch (error) {
                console.error("Lỗi khi kết nối ví", error);
            }
        } else {
            console.error("Metamask chưa được cài đặt");
        }
    };

    const disconnectWallet = () => {
        dispatch({ type: "disconnect" });
    };

    useEffect(() => {
        if (window.ethereum) {
            // Lắng nghe sự thay đổi tài khoản
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    dispatch({
                        type: "updateWallet",
                        wallet: accounts[0],
                    });
                } else {
                    disconnectWallet();
                }
            });

            // Lắng nghe sự thay đổi mạng
            window.ethereum.on("chainChanged", async (chainId) => {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const balance = await window.ethereum.request({
                    method: "eth_getBalance",
                    params: [accounts[0], "latest"],
                });

                dispatch({
                    type: "connect",
                    wallet: accounts[0],
                    balance: parseInt(balance, 16) / 10 ** 18,
                });
            });
        }

        // Dọn dẹp khi component bị unmount
        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", () => {});
                window.ethereum.removeListener("chainChanged", () => {});
            }
        };
    }, []);

    return { state, connectWallet, disconnectWallet };
}
