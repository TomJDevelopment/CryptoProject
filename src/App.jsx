import './styles/styles.css'
import { Navbar, Footer, Transaction, Welcome } from './components/index'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
        <div className="w-full gradient-bg-transactions">
            <h1 className="text-3xl sm:text-5xl pb-3 text-white text-gradient py-1 md:subpixel-antialiased text-center">Latest Transactions</h1>
            <div className="flex w-full overflow-y-hidden overflow-x-auto">
                <Transaction Message="Hello World" Image="seo" />
                {/*<Transaction Message="Hello World" Image="spongebob" />*/}
                {/*<Transaction Message="Hello World" Image="patrick" />*/}
            </div>
        </div>
      <Footer />
    </div>
  )
}

export default App
