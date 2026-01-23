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
      company: 'Acme Manufacturing Corp',
      industry: 'Automotive Parts',
      challenge: 'Legacy systems causing 15% downtime annually, compliance gaps in data security',
      solution: 'Implemented modern ERP system with cloud backup and automated compliance monitoring',
      result: 'Reduced downtime to 2%, achieved SOC 2 compliance, improved inventory accuracy by 95%'
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
      quote: "Centerlink's team understood our manufacturing challenges immediately. They designed a solution that fit our exact needs and was able to scale as we grew.",
      author: 'John Smith',
      title: 'Operations Director',
      company: 'Regional Materials Supplier'
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
      quote: "The investment in their security solutions has paid for itself many times over. Peace of mind is invaluable in manufacturing.",
      author: 'Mike Torres',
      title: 'Plant Manager',
      company: 'Quality Fabrication LLC'
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
