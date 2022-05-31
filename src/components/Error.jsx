import { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";

export const ErrorModal = ({ title, message }) => {
    const { setErrorOccurred } = useContext(TransactionContext); // See if there is a popup dialog like Angular's Toastr or something

    return (
        <div id="errorModal" tabIndex="-1" aria-hidden="true" className="h-96 w-96 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-between items-center">
                    {/* -- Header -- */}
                    <h1 className="font-semibold text-1xl sm:text-2xl subpixel-antialiased">{title}</h1>
                </div>
                <div className="flex justify-between items-start">
                    {/* -- Body -- */}
                    <p className="text-white text-lg subpixel-antialiased">{message}</p>
                </div>
                <div className="flex justify-between items-end bottom-0">
                    <button
                        className="flex flex-row justify-center items-center bg-[#2952e3] p-1 rounded-full cursor-pointer hover:bg-[#2546bd] transition-colors duration-300 text-white text-base font-semibold"
                        onClick={setErrorOccurred(false)}>Close
                    </button>
                </div>
            </div>
        </div>
    )
}