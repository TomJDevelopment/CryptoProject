import React, {createContext, useEffect, useState} from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = createContext("");

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
}

const getTransactionCount = async () => {
    const transactionContract = getEthereumContract();
    const transactionCount = await transactionContract.getTransactionCount();
    console.log(transactionCount.toNumber());
}

export const TransactionProvider = ({ children }) => { // The TransactionProvider wraps around everything in main.jsx, so the whole application can access this context
    const [connectedAccount, setConnectedAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(getTransactionCount());
    const [errorOccurred, setErrorOccurred] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorTitle, setErrorTitle] = useState("");

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
                displayErrorModal("Please connect MetaMask", "Please connect MetaMask to the application");
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
            if(!ethereum) {
                displayErrorModal("No Metamask", "Please connect MetaMask to the application for this to work");
                return;
            }

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const parsedAmount = ethers.utils.parseEther(amount); // Calculates the ethereum into the GWEI hexadecimal amount

            let encoder = ethers.utils.defaultAbiCoder;
            if(!encoder) {
                displayErrorModal("Error occurred", "An error occurred, please try again");
                return;
            }

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: connectedAccount,
                    to: addressTo,
                    gas: '0x5208', // Gas values HAVE to be in Hexadecimal - this values translates to 21,000, but it is 21,000 GWEI (subunit of Ethereum) which equates to 0.000021 ethereum
                    value: parsedAmount._hex // Select the hexadecimal amount from the parsed property
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
            setIsLoading(true);
            await transactionHash.wait();
            setIsLoading(false);

            const transactionCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            throw new Error(`Error ${error.message} occurred`);
        }
    }

    const displayErrorModal = (title, message) => {
        setErrorTitle(title);
        setErrorMessage(message);
        setErrorOccurred(true);
    }

    useEffect(async () => {
        await checkIfWalletIsConnected();
    }, [])

    return (
        <TransactionContext.Provider value={{ connectWallet, connectedAccount, formData, handleChange, sendTransaction, isLoading, transactionCount }}>
            { children }
        </TransactionContext.Provider>
    )
}