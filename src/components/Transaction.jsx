import {useEffect, useState} from "react";

const Transaction = ({ Message, Image }) => {
    const [url, setUrl] = useState("");

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
        <div className="w-full block my-5 ml-2 mr-2 p-6 max-w-sm text-white bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer">
            <img alt="GIF" src={url} />
            <p>{Message}</p>
        </div>
    )
}

export default Transaction