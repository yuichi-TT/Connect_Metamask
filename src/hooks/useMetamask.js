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
        default:
            return state;
    }
}

export function useMetamask() {
    const [state, dispatch] = useReducer(reducer, initialState);
    return { state, dispatch };
}
