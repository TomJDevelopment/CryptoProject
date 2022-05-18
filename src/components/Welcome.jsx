import { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/all";
import { SiEthereum } from "react-icons/all";
import { BsInfoCircle } from "react-icons/all";

import { Loader } from "./";
import { TransactionContext } from "../context/TransactionContext";

const commonStyles = 'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white'

const handleSubmit = () => {

}

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input placeholder={placeholder}
         type={type}
         step="0.0001"
         value={value}
         name={name}
         onChange={e => handleChange(e, name)}
         className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm font-sans white-glassmorphism" />
);

const Welcome = () => {
    const { connectWallet, connectedAccount, formData, handleChange, sendTransaction } = useContext(TransactionContext);

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;
        e.preventDefault();

        console.log(addressTo, amount, keyword, message);
        if(!addressTo || !amount || !keyword || !message) return;
        sendTransaction();
    }

    return (
        <div className="flex w-full justify-center items-center font-sans">
            <div className="flex lg:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col lg:mr-20">
                    <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1 md:subpixel-antialiased">Send Crypto <br/> across the world</h1>
                    <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base md:subpixel-antialiased">Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto</p>
                    {!connectedAccount && (<button type="button" onClick={connectWallet} className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd] transition-colors duration-300 text-white text-base font-semibold">Connect Wallet</button>)}
                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10 md:subpixel-antialiased">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            <p className="font-light">Reliability</p>
                        </div>
                        <div className={`${commonStyles}`}>
                            <p className="font-light">Security</p>
                        </div>
                        <div className={`sm:rounded-tr-2xl ${commonStyles}`}>
                            <p className="font-light">Etheruem</p>
                        </div>
                        <div className={`sm:rounded-bl-2xl ${commonStyles}`}>
                            <p className="font-light">Web 3.0</p>
                        </div>
                        <div className={commonStyles}>
                            <p className="font-light">Low Fees</p>
                        </div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            <p className="font-light">Blockhain</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full lg:mt-0 mt-10">
                    <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>
                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                {!connectedAccount ? (<p className="text-white font-light font-sans sm:subpixel-antialiased">Address</p>)
                                    : (<p className="text-white font-light font-sans sm:subpixel-antialiased">{connectedAccount}</p>)}
                                <p className="text-white font-semibold text-lg font-sans sm:subpixel-antialiased">Etheruem</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col blue-glassmorphism">
                        <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
                        <Input placeholder="Amount" name="amount" type="number" handleChange={handleChange} />
                        <Input placeholder="Keyword (GIF)" name="keyword" type="text" handleChange={handleChange} />
                        <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
                        <div className="h-[1px] w-full bg-gray-400 my-2" />
                        {false ? (
                           <Loader />
                        ) : (
                            <button type="button"
                                    onClick={handleSubmit}
                                    className="text-white font-sans font-semibold w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer hover:bg-blue-600 transition-colors duration-300">Send</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Welcome