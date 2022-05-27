import {useEffect, useState, useContext} from "react";

import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionCard = ({ AddressTo, AddressFrom, Message, Keyword, Timestamp, Amount }) => {
    return ( // Too many transactions because we have created the loop inside the transaction.jsx file, it needs to be in the App.jsx class passing the properties into the Transaction.jsx
        <div className="flex items-center bg-gray-700 w-full h-full">
            <div className="flex">
                <p className="text-xl text-white font-semibold left-0">From: {shortenAddress(AddressFrom)}</p>
                <p className="text-xl text-white font-semibold left-0">To: {shortenAddress(AddressTo)}</p>
            </div>
        </div>
    )
}

const Transaction = ({ Message, Image }) => {
    const [url, setUrl] = useState("");
    const { previousTransactions, connectedAccount } = useContext(TransactionContext);
    const GifImage = async (Image) => {
        await fetch(`https://api.giphy.com/v1/gifs/search?api_key=xAgR7JgQrnaWahVoPCS27Z0raasw8i0l&q=${Image}&limit=1&offset=0&rating=g&lang=en`)
            .then(result => result.json())
            .then((result) => {
                const {data: [{images: {original: {url}}}]} = result;
                setUrl(url);
            }, (error) => {
                throw new Error(`Error occurred: ${error.message}`);
            });
    }

    useEffect(async () => {
       await GifImage(Image);
    });

    return (
        <div className="grid grid-cols-3">
            {connectedAccount ? previousTransactions.reverse().map((transaction, i) => (
                <TransactionCard {...transaction} key={i} />
            )) : <p className="text-xl sm:text-2xl text-white">Please connect your MetaMask to see previous transactions</p>}
        </div>
    )
}

export default Transaction