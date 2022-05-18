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

    const handleChange = (e, name) => {
        setFormData(prevState => ({
            ...prevState, [name]: e.target.value // the '...' is important here as useState does not "spread" the property, so it'll remove all but the one you're trying to update at that time - in essence it allows us to copy all the existing array into a new one
        }));
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
            setConnectedAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
            if(!ethereum) return alert("Please install MetaMask");
            const { addressTo, amount, keyword, message } = formData;
            getEthereumContract();
        } catch (error) {
            throw new Error("No Ethereum object");
        }
    }

    useEffect(async () => {
        await checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, handleChange, sendTransaction }}>
            { children }
        </TransactionContext.Provider>
    )
}