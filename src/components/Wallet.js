import React from "react";
import { useMetamask } from "../hooks/useMetamask";
import { useListen } from "../hooks/useListen";
import Loading from "./Loading";

const Wallet = ({ children }) => {
    const { dispatch, state: { status, isMetamaskInstalled, wallet, balance } } = useMetamask();
    const listen = useListen();

    const showConnectButton = status !== "pageNotLoaded" && isMetamaskInstalled && !wallet;
    const isConnected = status !== "pageNotLoaded" && typeof wallet === "string";

    const handleConnect = async () => {
        dispatch({ type: "loading" });
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        
        if (accounts.length > 0) {
            const balance = await window.ethereum.request({
                method: "eth_getBalance",
                params: [accounts[0], "latest"],
            });
            dispatch({ type: "connect", wallet: accounts[0], balance });
            listen();
        }
    };

    const handleDisconnect = () => {
        dispatch({ type: "disconnect" });
    };

    return (
        <div className="wallet-container">
            <h2>Metamask</h2>
            {wallet && balance && (
                <div>
                    <p>Address: {wallet}</p>
                    <p>Balance: {(parseInt(balance) / 1e18).toFixed(4)} ETH</p>
                </div>
            )}
            {showConnectButton && (
                <button onClick={handleConnect}>
                    {status === "loading" ? <Loading /> : "Connect Wallet"}
                </button>
            )}
            {isConnected && (
                <>
                    <button onClick={handleDisconnect}>Disconnect</button>
                    <div>{children}</div>
                </>
            )}
        </div>
    );
};

export default Wallet;
