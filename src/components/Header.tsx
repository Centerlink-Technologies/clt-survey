import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const scrollToForm = () => {
    setTimeout(() => {
      const formElement = document.querySelector('.healthcheck-form')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 0)
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-section">
          <Link to="/clt-survey/" className="logo-link">
            <img src="/clt-survey/centerlink-logo.svg" alt="Centerlink Technologies" className="logo-image" />
            <p className="tagline">Northeast Ohio Manufacturing IT Solutions Provider</p>
          </Link>
        </div>
      </div>

      <nav className="header-nav">
          <Link to="/clt-survey/" className="nav-link">Home</Link>
          <a href="#why-it" className="nav-link">Why IT Matters</a>
          <button 
            className="nav-button"
            onClick={scrollToForm}
          >
            IT Health Check
          </button>
          <Link to="/clt-survey/case-studies" className="nav-button">
            Case Studies
          </Link>
        </nav>
    </header>
  )
}
