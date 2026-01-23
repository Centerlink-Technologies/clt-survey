import { useState } from 'react'
import './HealthCheckTab.css'
import { generateHealthCheckPDF } from '../utils/generatePDF'

interface FormData {
  companyName: string
  email: string
  phone: string
  employees: string
  yearsWithCurrentSystem: string
  downtime: string
  securityConcerns: string[]
  criticalSystems: string[]
  productionVisibility: string
  integrationNeeds: string
  compliance: string[]
  mainPainPoints: string
  timeline: string
  additionalNotes: string
}

export default function HealthCheckTab() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    email: '',
    phone: '',
    employees: '',
    yearsWithCurrentSystem: '',
    downtime: '',
    securityConcerns: [],
    criticalSystems: [],
    productionVisibility: '',
    integrationNeeds: '',
    compliance: [],
    mainPainPoints: '',
    timeline: '',
    additionalNotes: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
        ? [...(prev[name as keyof FormData] as string[]), value]
        : (prev[name as keyof FormData] as string[]).filter(item => item !== value)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Prepare data as JSON
      const dataToSend = {
        'company_name': formData.companyName,
        'email': formData.email,
        'phone': formData.phone,
        'employees': formData.employees,
        'systems_age': formData.yearsWithCurrentSystem,
        'downtime': formData.downtime,
        'critical_systems': formData.criticalSystems.join(', '),
        'security_concerns': formData.securityConcerns.join(', '),
        'production_visibility': formData.productionVisibility,
        'system_integration': formData.integrationNeeds,
        'compliance': formData.compliance.join(', '),
        'main_pain_points': formData.mainPainPoints,
        'timeline': formData.timeline,
        'additional_notes': formData.additionalNotes,
      }

      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/mrepgeqn', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      const result = await response.json()

      if (response.ok) {
        // Generate and download PDF
        try {
          await generateHealthCheckPDF(formData)
        } catch (pdfError) {
          console.error('PDF generation error:', pdfError)
          // Don't fail the form submission if PDF generation fails
        }

        setSubmitted(true)
        // Reset form after 4 seconds
        setTimeout(() => {
          setFormData({
            companyName: '',
            email: '',
            phone: '',
            employees: '',
            yearsWithCurrentSystem: '',
            downtime: '',
            securityConcerns: [],
            criticalSystems: [],
            productionVisibility: '',
            integrationNeeds: '',
            compliance: [],
            mainPainPoints: '',
            timeline: '',
            additionalNotes: '',
          })
          setSubmitted(false)
        }, 4000)
      } else {
        console.error('Formspree error:', result)
        alert('Error submitting form. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Error submitting form. Please try again.')
    }
  }

  return (
    <section className="healthcheck-tab">
      <div className="healthcheck-container">
        <h2>Manufacturing IT Health Check</h2>
        <p className="section-intro">
          This 2-minute assessment helps us understand your current IT environment, challenges, and goals. We'll use this to recommend tailored solutions.
        </p>

        {submitted ? (
          <div className="success-message">
            <h3>✓ Assessment Complete</h3>
            <p>Thank you! We've received your IT health check and a detailed PDF report has been automatically generated and downloaded. Our team will review your responses and contact you within 24 hours with personalized recommendations and next steps.</p>
          </div>
        ) : (
          <form className="healthcheck-form" onSubmit={handleSubmit}>
            {/* Contact Section */}
            <div className="form-section-title">Company & Contact Information</div>
            
            <div className="form-group">
              <label htmlFor="companyName">Company Name *</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="employees">Number of Employees *</label>
              <select
                id="employees"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="10-50">10-50</option>
                <option value="50-100">50-100</option>
                <option value="100-250">100-250</option>
                <option value="250+">250+</option>
              </select>
            </div>

            {/* Current Infrastructure */}
            <div className="form-section-title">Current IT Infrastructure</div>

            <div className="form-group">
              <label htmlFor="yearsWithCurrentSystem">How old are your primary business systems? *</label>
              <select
                id="yearsWithCurrentSystem"
                name="yearsWithCurrentSystem"
                value={formData.yearsWithCurrentSystem}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="0-2">0-2 years (Modern)</option>
                <option value="2-5">2-5 years (Aging)</option>
                <option value="5-10">5-10 years (Outdated)</option>
                <option value="10+">10+ years (Legacy)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="downtime">Estimated unplanned downtime per month *</label>
              <select
                id="downtime"
                name="downtime"
                value={formData.downtime}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="none">None or minimal (&lt;2 hours)</option>
                <option value="low">Low (2-8 hours)</option>
                <option value="moderate">Moderate (8-24 hours)</option>
                <option value="high">High (24+ hours)</option>
              </select>
            </div>

            {/* Critical Systems */}
            <div className="form-group">
              <label>Which systems are critical to your daily operations? (Select all that apply)</label>
              <div className="checkbox-group">
                {['ERP/Manufacturing System', 'Production Control', 'Inventory Management', 'Quality Control', 'Supply Chain Tracking', 'Customer/Order Management'].map(system => (
                  <label key={system} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.criticalSystems.includes(system)}
                      onChange={(e) => handleCheckboxChange('criticalSystems', system, e.target.checked)}
                    />
                    <span>{system}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Security & Compliance */}
            <div className="form-section-title">Security & Compliance</div>

            <div className="form-group">
              <label>Security & data concerns facing your operation (Select all that apply)</label>
              <div className="checkbox-group">
                {['Cyber attacks/ransomware', 'Data breaches', 'Lack of backup/disaster recovery', 'Employee access control', 'Regulatory compliance (HIPAA, ISO, etc.)', 'Product security/IP protection'].map(concern => (
                  <label key={concern} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.securityConcerns.includes(concern)}
                      onChange={(e) => handleCheckboxChange('securityConcerns', concern, e.target.checked)}
                    />
                    <span>{concern}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Do you have compliance requirements? (Select all that apply)</label>
              <div className="checkbox-group">
                {['ISO certifications', 'FDA regulations', 'OSHA compliance', 'Data privacy (GDPR, CCPA)', 'Industry standards', 'No specific requirements'].map(comp => (
                  <label key={comp} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.compliance.includes(comp)}
                      onChange={(e) => handleCheckboxChange('compliance', comp, e.target.checked)}
                    />
                    <span>{comp}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Operations & Visibility */}
            <div className="form-section-title">Operations & Visibility</div>

            <div className="form-group">
              <label htmlFor="productionVisibility">How well can you track real-time production metrics? *</label>
              <select
                id="productionVisibility"
                name="productionVisibility"
                value={formData.productionVisibility}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="manual">Manual tracking (spreadsheets, paper)</option>
                <option value="partial">Partial visibility (some systems integrated)</option>
                <option value="good">Good visibility (dashboard available)</option>
                <option value="excellent">Excellent (real-time, automated insights)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="integrationNeeds">How integrated are your manufacturing systems? *</label>
              <select
                id="integrationNeeds"
                name="integrationNeeds"
                value={formData.integrationNeeds}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="siloed">Siloed (systems don't communicate)</option>
                <option value="partial">Partially integrated (some connection)</option>
                <option value="mostly">Mostly integrated (flow is good)</option>
                <option value="fully">Fully integrated (end-to-end)</option>
              </select>
            </div>

            {/* Business Needs */}
            <div className="form-section-title">Business Priorities</div>

            <div className="form-group">
              <label htmlFor="mainPainPoints">What's your #1 IT pain point right now? *</label>
              <textarea
                id="mainPainPoints"
                name="mainPainPoints"
                value={formData.mainPainPoints}
                onChange={handleChange}
                rows={3}
                placeholder="e.g., Systems going down too often, can't see production in real-time, security concerns..."
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeline">When would you like to address IT challenges? *</label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
                required
              >
                <option value="">Select...</option>
                <option value="immediate">Immediate (critical issue)</option>
                <option value="30days">Next 30 days</option>
                <option value="quarter">Next quarter</option>
                <option value="exploring">Just exploring options</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="additionalNotes">Any additional context or concerns?</label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={2}
                placeholder="Optional: Help us understand your unique situation..."
              />
            </div>

            <button type="submit" className="submit-button">Submit Health Check</button>
          </form>
        )}
      </div>
    </section>
  )
}
