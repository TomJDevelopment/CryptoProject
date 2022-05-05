import React, { useEffect, useState, createContext } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext("");

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log(signer);
}

export const TransactionProvider = ({ children }) => { // This wraps around the entire application in main.jsx which means the entire application can access the transaction contract
    const [connectedAccount, setConnectedAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });

    const handleChange = (e, name) => { // TODO For some reason it is updating just the latest edited input field, look at functional state
        setFormData(prevState => ({prevState, [name]: e.target.value})); // prevState is something React provides for the previous state of an object
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if(!ethereum) return alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if(accounts.length) {
                setConnectedAccount(accounts[0]);

                // get all transactions
            } else {
                console.log("Accounts not found");
            }
        } catch (error) {
            throw new Error("No ethereum object");
        }
    }

    const connectWallet = async () => {
        try {
            if(!ethereum) return alert("Please install MetaMask");
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            // setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please install MetaMask");
            console.log("Hello world");
            const { addressTo, amount, keyword, message } = formData;
            getEthereumContract();
        } catch (error) {
            throw new Error("No Ethereum object");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, handleChange, sendTransaction }}>
            { children }
        </TransactionContext.Provider>
    )
}