import './styles/styles.css'
import { useContext } from "react";
import { Navbar, Footer, Transaction, Welcome } from './components/index';
import { ToastContainer } from 'react-toastify';

import { TransactionContext } from "./context/TransactionContext";

const App = () => {
    const { previousTransactions, connectedAccount, transactionCount } = useContext(TransactionContext);

  return (
    <div className="min-h-screen">
        <ToastContainer theme="dark" />
        <div className="gradient-bg-welcome">
            <Navbar />
            <Welcome />
        </div>
            <div className="w-full gradient-bg-transactions p-4">
                <h1 className="text-3xl sm:text-5xl pb-3 text-white py-1 md:subpixel-antialiased text-center">Latest 25 Transactions {connectedAccount && transactionCount > 0 ? `(${transactionCount})` : ""}</h1>
                <div className="flex flex-nowrap overflow-y-hidden overflow-x-visible scrollbar">
                    {connectedAccount ? previousTransactions ? previousTransactions.slice(0, 25).reverse().map((transaction, i) => (
                        <Transaction AddressFrom={transaction.AddressFrom} AddressTo={transaction.AddressTo} Keyword={transaction.Keyword} Message={transaction.Message} Amount={transaction.Amount} key={i} />
                    )) : <div className="flex w-full justify-center"><p className="text-xl sm:text-2xl text-white">No Transactions Available</p></div>
                : <div className="flex w-full justify-center"><p className="text-xl sm:text-2xl text-white">Please connect your MetaMask to see previous transactions</p></div>}
                </div>
            </div>
        <Footer />
    </div>
  )
}

export default App
