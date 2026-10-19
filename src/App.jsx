import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Equipment from './pages/Equipment'
import Handbook from './pages/Handbook'

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/handbook" element={<Handbook />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
