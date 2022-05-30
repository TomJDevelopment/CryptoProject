import './styles/styles.css'
import { useContext } from "react";
import { Navbar, Footer, Transaction, Welcome } from './components/index'

import { TransactionContext } from "./context/TransactionContext";

const App = () => {
    const { previousTransactions, connectedAccount } = useContext(TransactionContext);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
        <div className="w-full gradient-bg-transactions p-4">
            <h1 className="text-3xl sm:text-5xl pb-3 text-white text-gradient py-1 md:subpixel-antialiased text-center">Latest Transactions</h1>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 m-6 overflow-y-hidden overflow-x-auto">
                {connectedAccount ? previousTransactions ? previousTransactions.reverse().map((transaction, i) => (
                    <Transaction AddressFrom={transaction.AddressFrom} AddressTo={transaction.AddressTo} Keyword={transaction.Keyword} Message={transaction.Message} Amount={transaction.Amount} key={i} />
                )) : <p className="text-xl sm:text-2xl text-white justify-self-center">No Transactions Available</p>
                    : <p className="text-xl sm:text-2xl text-white justify-self-center">Please connect your MetaMask to see previous transactions</p>}
            </div>
        </div>
      <Footer />
    </div>
  )
}

export default App
