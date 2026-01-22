import { useState, useEffect } from 'react'
import './HeroSection.css'

export default function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const carouselImages = [
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [carouselImages.length])

  const handleGetStarted = () => {
    setTimeout(() => {
      const formElement = document.querySelector('.healthcheck-form')
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 0)
  }

  return (
    <section id="home" className="hero" style={{
      backgroundImage: `url('${carouselImages[currentImageIndex]}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h2>Your Manufacturing Operations Deserve World-Class IT Support</h2>
        <p>We help manufacturers in Akron, Canton, Cleveland, and Northeast Ohio optimize their operations through strategic technology solutions.</p>
        <button className="cta-button" onClick={handleGetStarted}>Get Started Today</button>
      </div>
      <div className="carousel-indicators">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
