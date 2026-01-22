import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Centerlink Technologies</h4>
          <p>Your trusted IT partner for manufacturing operations in Northeast Ohio.</p>
          <a href="https://www.centerlinktechnologies.com/" target="_blank" rel="noopener noreferrer" className="website-link">
            Visit Our Website →
          </a>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>
            Email: <a href="mailto:sales@centerlinktech.com">sales@centerlinktech.com</a><br />
            Phone: <a href="tel:+1-888-233-0086">(888) 233-0086</a>
          </p>
        </div>

        <div className="footer-section">
          <h4>Service Areas</h4>
          <p>
            Akron, OH<br />
            Canton, OH<br />
            Cleveland, OH<br />
            & Surrounding Northeast Ohio
          </p>
        </div>

        <div className="footer-section">
          <h4>Connect With Us</h4>
          <div className="social-links">
            <a href="https://www.linkedin.com/company/centerlink-technologies" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Centerlink Technologies. All rights reserved.</p>
      </div>
    </footer>
  )
}
