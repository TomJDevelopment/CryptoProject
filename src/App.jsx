import './styles/styles.css'
import { Navbar, Loader, Footer, Services, Transaction, Welcome } from './components/index'

const App = () => {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transaction />
      <Footer />
    </div>
  )
}

export default App
