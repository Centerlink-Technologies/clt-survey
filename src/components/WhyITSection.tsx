import './WhyITSection.css'

export default function WhyITSection() {
  const reasons = [
    {
      title: 'Competitive Advantage',
      description: 'Modern IT systems help manufacturers optimize production, reduce downtime, and stay competitive in a digital-first market.'
    },
    {
      title: 'Supply Chain Visibility',
      description: 'Real-time data and integrated systems give you complete visibility into your supply chain and operations.'
    },
    {
      title: 'Compliance & Security',
      description: 'Meet industry regulations and protect your sensitive manufacturing data with enterprise-grade security solutions.'
    },
    {
      title: 'Operational Efficiency',
      description: 'Streamline workflows, reduce manual processes, and increase production throughput with the right technology stack.'
    }
  ]

  return (
    <section id="why-it" className="why-it">
      <div className="why-it-container">
        <h2>Why IT Matters for Manufacturing</h2>
        <p className="section-intro">
          In today's manufacturing landscape, technology isn't optional—it's essential. Here's why:
        </p>
        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <h3>{reason.title}</h3>
              <p>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
