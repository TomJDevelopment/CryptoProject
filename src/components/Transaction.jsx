import {useEffect, useState, useContext} from "react";

import { TransactionContext } from "../context/TransactionContext";

const TransactionCard = ({ AddressTo, AddressFrom, Message, Keyword, Timestamp, Amount }) => {

    return (
        <p>Hello world</p>
    )
}

const Transaction = ({ Message, Image }) => {
    const [url, setUrl] = useState("");
    const { previousTransactions, currentAccount } = useContext(TransactionContext);

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
        <div className="flex w-full h-full my-3 justify-center items-center bg-gray-700">
            <h1 className="text-3xl sm:text-5xl pb-3 text-white text-gradient py-1 md:subpixel-antialiased">Latest Transactions</h1>
            {currentAccount ? previousTransactions.reverse().map((transaction, i) => (
                <TransactionCard {...transaction} transactionKey={i} />
            )) : <p className="text-xl sm:text-2xl text-white">Please connect your MetaMask to see previous transactions</p>}
        </div>
    )
}

export default Transaction