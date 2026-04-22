import './CaseStudiesTab.css'

interface CaseStudy {
  id: number
  company: string
  industry: string
  challenge: string
  solution: string
  result: string
}

interface Testimonial {
  id: number
  quote: string
  author: string
  title: string
  company: string
}

export default function CaseStudiesTab() {
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      company: 'North American Material Supplier',
      industry: 'Industrial Materials & Distribution',
      challenge: 'Required high-availability network infrastructure across 12 locations spanning the US and Mexico with strict SLA requirements for minimal downtime. Existing firewalls presented single points of failure.',
      solution: 'Upgraded firewalls to highly available configurations across all 12 North American locations. Implemented redundant firewall pairs with automatic failover to ensure continuous network protection and connectivity.',
      result: 'Achieved near-zero downtime for network infrastructure across all locations. Met stringent SLA requirements with 99.9% uptime. Eliminated single points of failure in their firewall infrastructure.'
    },
    {
      id: 2,
      company: 'Regional Materials Supplier',
      industry: 'Industrial Materials',
      challenge: 'Lab test data isolated on local PCs with specialized equipment. Employees across US and Canada unable to access results efficiently. No centralized repository or redundancy.',
      solution: 'Designed and implemented secure network share infrastructure syncing lab data from specialized equipment and local PCs. Created redundant backup system for data protection and business continuity.',
      result: 'Employees across US and Canada now access lab data instantly from centralized corporate share. Redundant backup ensures zero data loss risk. Eliminated manual data transfers and improved compliance reporting.'
    },
    {
      id: 3,
      company: 'Quality Fabrication LLC',
      industry: 'Metal Fabrication',
      challenge: 'Frequent cyber security incidents, employee productivity concerns',
      solution: 'Deployed comprehensive security suite and modern unified communications',
      result: 'Zero security incidents in 12 months, 30% improvement in employee satisfaction scores'
    }
  ]

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "We've partnered with Centerlink on several projects, and they consistently go above and beyond. Our primary contact, Mike, is fantastic - always engaging and looking for proactive ways to save us money. They recently overhauled our aging infrastructure and modernized our telecommunications. By replacing the analog lines for our alarms, elevator, and essential services, they didn't just improve our systems - they saved us a significant amount of money. Every tech we've dealt with has been knowledgeable and quick to help. I can't recommend them enough for any of your IT needs.",
      author: 'Bryan Lindsey',
      title: 'Manager of Information Systems & Technology',
      company: 'Manufacturing & Services'
    },
    {
      id: 2,
      quote: "We went from struggling with downtime to having systems we can rely on. Their support has been responsive and knowledgeable.",
      author: 'Sarah Johnson',
      title: 'IT Manager',
      company: 'Acme Manufacturing Corp'
    },
    {
      id: 3,
      quote: "As Executive Director of First Tee - Greater Akron, I'm always looking for partners who understand the importance of efficiency and reliability, especially when it comes to technology that supports our mission of impacting young lives. Centerlink Technologies exceeded our expectations when we recently purchased new laptops through them. From start to finish, they made the process incredibly easy. Their team was refreshingly open and honest about options, pricing, and timelines - no surprises, just straightforward communication. What impressed me most was how quickly they delivered on their commitments, getting our team up and running without missing a beat. In the nonprofit world, we need partners who value our time and resources as much as we do. Centerlink Technologies proved to be exactly that kind of partner. I wouldn't hesitate to recommend them to other organizations looking for reliable technology solutions and outstanding service.",
      author: 'Jeff O\'Brien',
      title: 'Executive Director',
      company: 'First Tee – Greater Akron'
    }
  ]

  return (
    <section className="casestudies-tab">
      <div className="casestudies-container">
        <div className="testimonials-section">
          <h2>What Our Clients Say</h2>
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial">
              <p className="quote">"{testimonial.quote}"</p>
              <p className="attribution">— {testimonial.author}, {testimonial.title}<br />{testimonial.company}</p>
              {testimonial.id === 1 && (
                <div className="testimonial-logo">
                  <img src="/clt-survey/coltene-logo.svg" alt="Coltene" />
                </div>
              )}
              {testimonial.id === 3 && (
                <div className="testimonial-logo">
                  <img src="/clt-survey/first-tee-logo.svg" alt="First Tee Greater Akron" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="case-studies-section">
          <h2>Case Studies</h2>
          {caseStudies.map(study => (
            <div key={study.id} className="case-study">
              <h3>{study.company}</h3>
              <p className="industry">{study.industry}</p>
              
              <div className="study-content">
                <div className="study-part">
                  <h4>Challenge</h4>
                  <p>{study.challenge}</p>
                </div>

                <div className="study-part">
                  <h4>Solution</h4>
                  <p>{study.solution}</p>
                </div>

                <div className="study-part">
                  <h4>Result</h4>
                  <p className="result">{study.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
