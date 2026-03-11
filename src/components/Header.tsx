import { Link } from 'react-router-dom'
import './Header.css'

export default function Header() {
  const baseUrl = import.meta.env.BASE_URL

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
    </header>
  )
}
