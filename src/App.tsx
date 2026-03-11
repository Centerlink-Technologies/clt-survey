import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import Footer from './components/Footer'

function App() {
  const baseName = import.meta.env.BASE_URL

  return (
    <Router basename={baseName}>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
