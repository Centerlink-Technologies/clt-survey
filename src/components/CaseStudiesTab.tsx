import './CaseStudiesTab.css'

interface CaseStudy {
  id: number
  company: string
  industry: string
  challenge: string
  solution: string
  result: string
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

  return (
    <section className="casestudies-tab">
      <div className="casestudies-container">
        <h2>Manufacturing Case Studies</h2>
        <p className="section-intro">
          See how we've helped manufacturers in Northeast Ohio transform their operations with strategic IT solutions.
        </p>

        <div className="casestudies-grid">
          {caseStudies.map(study => (
            <div key={study.id} className="case-study-card">
              <div className="card-header">
                <h3>{study.company}</h3>
                <p className="industry">{study.industry}</p>
              </div>

              <div className="card-section">
                <h4>Challenge</h4>
                <p>{study.challenge}</p>
              </div>

              <div className="card-section">
                <h4>Solution</h4>
                <p>{study.solution}</p>
              </div>

              <div className="card-section">
                <h4>Result</h4>
                <p className="result">{study.result}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
