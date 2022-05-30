import {useEffect, useState} from "react";

import { shortenAddress } from "../utils/shortenAddress";

const Transaction = ({ AddressFrom, AddressTo, Keyword, Message, Amount }) => {
    const [url, setUrl] = useState("");
    const GifImage = async (Keyword) => {
        await fetch(`https://api.giphy.com/v1/gifs/search?api_key=xAgR7JgQrnaWahVoPCS27Z0raasw8i0l&q=${Keyword}&limit=1&offset=0&rating=g&lang=en`)
            .then(result => result.json())
            .then((result) => {
                const {data: [{images: {original: {url}}}]} = result;
                setUrl(url);
            }, (error) => {
                throw new Error(`Error occurred: ${error.message}`);
            });
    }

    useEffect(async () => {
       await GifImage(Keyword);
    });

    return (
        <div className="bg-gray-700 flex-none h-full w-96 m-6 rounded-2xl hover:scale-105 duration-300">
            <img className="rounded-tl-2xl rounded-tr-2xl w-full h-80" alt="GIF" src={url} />
            <div className="grid grid-cols-2">
                <p className="pl-3 pt-2 text-white font-semibold text-left">From {shortenAddress(AddressFrom)}</p>
                <p className="pr-3 pt-2 text-white font-semibold text-right">To {shortenAddress(AddressTo)}</p>
            </div>
            <p className="pl-3 text-white font-semibold text-left">Sent &mdash; {Amount} Ethereum</p>
            <p className="pl-3 pb-2 text-white font-semibold text-left">Saying &mdash; {Message}</p>
            <button type="button" className="rounded-bl-2xl rounded-br-2xl justify-self-end text-white font-sans font-semibold w-full border-[1px] p-2 border-[#3d4f7c] cursor-pointer hover:bg-blue-600 transition-colors duration-300">View</button>
        </div>
    )
}

export default Transaction