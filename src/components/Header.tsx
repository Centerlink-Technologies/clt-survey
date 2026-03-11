import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()
  const baseUrl = import.meta.env.BASE_URL

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const scrollToForm = () => {
    // If we're not on home page, navigate there first
    const currentPath = window.location.pathname
    if (currentPath.includes('case-studies')) {
      navigate('/')
      setTimeout(() => {
        const formElement = document.querySelector('.healthcheck-form')
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // Already on home page, just scroll
      const formElement = document.querySelector('.healthcheck-form')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className="header">
      <div className="header-top">
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <img src={`${baseUrl}centerlink-logo.svg`} alt="Centerlink Technologies" className="logo-image" />
            <p className="tagline">Northeast Ohio Manufacturing IT Solutions Provider</p>
          </Link>
        </div>
      </div>

      <nav className="header-nav">
          <a href="#" className="nav-link" onClick={handleHomeClick}>Home</a>
          <button 
            className="nav-button"
            onClick={scrollToForm}
          >
            IT Health Check
          </button>
          <Link to="/case-studies" className="nav-button">
            Case Studies & Testimonials
          </Link>
        </nav>
    </header>
  )
}
