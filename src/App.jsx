import './styles/styles.css'
import { Navbar, Footer, Services, Transaction, Welcome } from './components/index'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
        <div className="flex w-full gradient-bg-transactions overflow-y-hidden overflow-x-auto">
            <Transaction Message="Hello World" Image="seo" />
            <Transaction Message="Hello World" Image="spongebob" />
        </div>
      <Footer />
    </div>
  )
}

export default App
