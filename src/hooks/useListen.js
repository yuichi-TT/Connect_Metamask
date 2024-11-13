import { useEffect } from "react";
import { useMetamask } from "./useMetamask";

export function useListen() {
    const { dispatch } = useMetamask();
    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length === 0) {
                    dispatch({ type: "disconnect" });
                } else {
                    dispatch({ type: "connect", wallet: accounts[0] });
                }
            });
        }
    }, [dispatch]);
}
