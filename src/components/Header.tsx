import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const navigate = useNavigate()

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/clt-survey/')
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  const handleWhyITClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/clt-survey/')
    setTimeout(() => {
      const whyItSection = document.querySelector('#why-it')
      if (whyItSection) {
        whyItSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 100)
  }

  const scrollToForm = () => {
    // If we're not on home page, navigate there first
    const currentPath = window.location.pathname
    if (!currentPath.includes('clt-survey/') || currentPath.endsWith('case-studies')) {
      navigate('/clt-survey/')
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
          <Link to="/clt-survey/" className="logo-link">
            <img src="/clt-survey/centerlink-logo.svg" alt="Centerlink Technologies" className="logo-image" />
            <p className="tagline">Northeast Ohio Manufacturing IT Solutions Provider</p>
          </Link>
        </div>
      </div>

      <nav className="header-nav">
          <a href="#" className="nav-link" onClick={handleHomeClick}>Home</a>
          <a href="#why-it" className="nav-link" onClick={handleWhyITClick}>Why IT Matters</a>
          <button 
            className="nav-button"
            onClick={scrollToForm}
          >
            IT Health Check
          </button>
          <Link to="/clt-survey/case-studies" className="nav-button">
            Case Studies & Testimonials
          </Link>
        </nav>
    </header>
  )
}
