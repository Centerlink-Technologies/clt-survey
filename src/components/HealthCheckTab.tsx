import { useState } from 'react'
import './HealthCheckTab.css'
import { generateHealthCheckPDF } from '../utils/generatePDF'

interface FormData {
  name: string
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
  dedicatedSecurityTeam: string
  formalCybersecurityPolicy: string
  riskAssessments: string
  cybersecurityIncident: string
  breachDetectionConfidence: string
  disasterRecoveryPlan: string
  securityAwareness: string[]
  phishingExercises: string
  cybersecurityBudgetPercentage: string
  mfaCoverage: string
  edrLoggingCoverage: string
  patchCadence: string
  itOtSegmentation: string
  immutableBackups: string
  incidentRunbooks: string
  encryptionCoverage: string
  supplyChainRiskProgram: string
}

const REQUIRED_FIELDS: Array<keyof FormData> = [
  'companyName',
  'email',
  'employees',
  'yearsWithCurrentSystem',
  'downtime',
  'productionVisibility',
  'integrationNeeds',
  'formalCybersecurityPolicy',
  'riskAssessments',
  'disasterRecoveryPlan',
  'mfaCoverage',
  'edrLoggingCoverage',
  'patchCadence',
  'itOtSegmentation',
  'immutableBackups',
  'incidentRunbooks',
  'timeline',
]

function getBudgetLabel(value: string): string {
  const numeric = parseInt(value, 10)
  if (Number.isNaN(numeric)) return 'Not selected'
  if (numeric < 5) return 'Less than 5%'
  if (numeric <= 10) return '5%–10%'
  if (numeric <= 20) return '11%–20%'
  return 'More than 20%'
}

export default function HealthCheckTab() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
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
    dedicatedSecurityTeam: '',
    formalCybersecurityPolicy: '',
    riskAssessments: '',
    cybersecurityIncident: '',
    breachDetectionConfidence: '',
    disasterRecoveryPlan: '',
    securityAwareness: [],
    phishingExercises: '',
    cybersecurityBudgetPercentage: '',
    mfaCoverage: '',
    edrLoggingCoverage: '',
    patchCadence: '',
    itOtSegmentation: '',
    immutableBackups: '',
    incidentRunbooks: '',
    encryptionCoverage: '',
    supplyChainRiskProgram: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [showScheduleOverlay, setShowScheduleOverlay] = useState(false)
  const [showWelcomeModal, setShowWelcomeModal] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [assessmentDate, setAssessmentDate] = useState('')
  const [assessmentTime, setAssessmentTime] = useState('')

  const completedRequiredFields = REQUIRED_FIELDS.filter(field => formData[field]).length
  const progressPercent = Math.round((completedRequiredFields / REQUIRED_FIELDS.length) * 100)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Prepare data as JSON
      const dataToSend = {
        'name': formData.name,
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
        'assessment_schedule_date': assessmentDate,
        'assessment_schedule_time': assessmentTime,
        'mfa_coverage': formData.mfaCoverage,
        'edr_logging_coverage': formData.edrLoggingCoverage,
        'patch_cadence': formData.patchCadence,
        'it_ot_segmentation': formData.itOtSegmentation,
        'immutable_backups': formData.immutableBackups,
        'incident_runbooks': formData.incidentRunbooks,
        'encryption_coverage': formData.encryptionCoverage,
        'supply_chain_risk_program': formData.supplyChainRiskProgram,
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
            name: '',
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
            dedicatedSecurityTeam: '',
            formalCybersecurityPolicy: '',
            riskAssessments: '',
            cybersecurityIncident: '',
            breachDetectionConfidence: '',
            disasterRecoveryPlan: '',
            securityAwareness: [],
            phishingExercises: '',
            cybersecurityBudgetPercentage: '',
            mfaCoverage: '',
            edrLoggingCoverage: '',
            patchCadence: '',
            itOtSegmentation: '',
            immutableBackups: '',
            incidentRunbooks: '',
            encryptionCoverage: '',
            supplyChainRiskProgram: '',
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

  const handleStartAssessment = () => {
    setShowWelcomeModal(false)
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 2000)
  }

  return (
    <section className="healthcheck-tab">
      {showConfetti && (
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 64 }).map((_, i) => (
            <span
              key={i}
              className="confetti-piece"
              style={{
                left: `${(i * 11) % 100}%`,
                animationDelay: `${(i % 12) * 0.045}s`,
              }}
            />
          ))}
        </div>
      )}

      {showWelcomeModal && (
        <div className="overlay" role="dialog" aria-modal="true" aria-labelledby="assessment-modal-title">
          <div className="overlay-content welcome-overlay-content">
            <div className="welcome-badge" aria-hidden="true">🏭✅</div>
            <h3 id="assessment-modal-title">Begin Your Assessment</h3>
            <p>
              You are taking a strong first step. Complete this interactive assessment to receive a
              benchmarked maturity report aligned to manufacturing-focused practices used in Northeast Ohio.
            </p>
            <button type="button" className="submit-button" onClick={handleStartAssessment}>
              Start Assessment
            </button>
          </div>
        </div>
      )}

      <div className="healthcheck-container">
        <h2>Cybersecurity Assessment</h2>

        <div className="progress-panel">
          <div className="progress-header">
            <strong>Assessment Progress</strong>
            <span>{progressPercent}% complete</span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {submitted ? (
          <div className="overlay">
            <div className="overlay-content">
              <h3>Assessment Submitted!</h3>
              <p>Would you like to book a free consultation based on your assessment responses?</p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                <button type="button" className="submit-button" onClick={() => setSubmitted(false)}>No, thank you</button>
                <button type="button" className="submit-button" onClick={() => setSubmitted(false)}>Yes, book now</button>
              </div>
            </div>
          </div>
        ) : (
          <form className="healthcheck-form" onSubmit={handleSubmit}>
            {/* Contact Section */}
            <div className="form-section-title">Company & Contact Information</div>
            
            <div className="form-group">
              <label htmlFor="name"><strong>Name</strong></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="companyName"><strong>Company Name</strong></label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email"><strong>Email Address</strong></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone"><strong>Phone Number</strong></label>
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
              <label htmlFor="employees"><strong>Number of Employees</strong></label>
              <select
                id="employees"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="10-50">10-50</option>
                <option value="50-100">50-100</option>
                <option value="100-250">100-250</option>
                <option value="250+">250+</option>
              </select>
            </div>

            {/* Security & Compliance */}
            <div className="form-section-title">Security & Compliance</div>

            <div className="form-group">
              <label htmlFor="securityConcerns"><strong>Security & data concerns facing your operation</strong></label>
              <select
                id="securityConcerns"
                name="securityConcerns"
                value={formData.securityConcerns[0] || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, securityConcerns: e.target.value ? [e.target.value] : [] }))}
              >
                <option value="">Select...</option>
                <option value="Cyber attacks/ransomware">Cyber attacks/ransomware</option>
                <option value="Data breaches">Data breaches</option>
                <option value="Lack of backup/disaster recovery">Lack of backup/disaster recovery</option>
                <option value="Employee access control">Employee access control</option>
                <option value="Regulatory compliance (HIPAA, ISO, etc.)">Regulatory compliance (HIPAA, ISO, etc.)</option>
                <option value="Product security/IP protection">Product security/IP protection</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="compliance"><strong>Do you have compliance requirements? (Select all that apply)</strong></label>
              <div className="checkbox-group compliance-multicol">
                {['ISO certifications', 'FDA regulations', 'OSHA compliance', 'Data privacy (GDPR, CCPA)', 'CMMC Level 2', 'No specific requirements'].map(comp => (
                  <label key={comp} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.compliance.includes(comp)}
                      onChange={e => {
                        if (e.target.checked) {
                          setFormData(prev => ({ ...prev, compliance: [...prev.compliance, comp] }));
                        } else {
                          setFormData(prev => ({ ...prev, compliance: prev.compliance.filter(c => c !== comp) }));
                        }
                      }}
                    />
                    <span>{comp}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="yearsWithCurrentSystem"><strong>Average age of your core production systems (years)</strong></label>
              <input
                type="range"
                id="yearsWithCurrentSystem"
                name="yearsWithCurrentSystem"
                min="1"
                max="15"
                step="1"
                value={formData.yearsWithCurrentSystem || '6'}
                onChange={handleChange}
              />
              <div className="slider-caption">Current selection: {formData.yearsWithCurrentSystem || '6'} years</div>
            </div>

            <div className="form-group">
              <label htmlFor="downtime"><strong>Estimated unplanned downtime per month (%)</strong></label>
              <input
                type="range"
                id="downtime"
                name="downtime"
                min="0"
                max="20"
                step="0.5"
                value={formData.downtime || '3'}
                onChange={handleChange}
              />
              <div className="slider-caption">Current selection: {formData.downtime || '3'}%</div>
            </div>

            {/* Operations & Visibility */}
            <div className="form-section-title">Operations & Visibility</div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="productionVisibility"><strong>How well can you track real-time production metrics?</strong></label>
                <select
                  id="productionVisibility"
                  name="productionVisibility"
                  value={formData.productionVisibility}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="manual">Manual tracking (spreadsheets, paper)</option>
                  <option value="partial">Partial visibility (some systems integrated)</option>
                  <option value="good">Good visibility (dashboard available)</option>
                  <option value="excellent">Excellent (real-time, automated insights)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="integrationNeeds"><strong>How integrated are your manufacturing systems?</strong></label>
                <select
                  id="integrationNeeds"
                  name="integrationNeeds"
                  value={formData.integrationNeeds}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="siloed">Siloed (systems don't communicate)</option>
                  <option value="partial">Partially integrated (some connection)</option>
                  <option value="mostly">Mostly integrated (flow is good)</option>
                  <option value="fully">Fully integrated (end-to-end)</option>
                </select>
              </div>
            </div>

            {/* Advanced Security Assessment */}
            <div className="form-section-title">Advanced Security Assessment</div>

            <div className="form-group">
              <label htmlFor="dedicatedSecurityTeam"><strong>Do you have a dedicated IT security team or person?</strong></label>
              <select
                id="dedicatedSecurityTeam"
                name="dedicatedSecurityTeam"
                value={formData.dedicatedSecurityTeam}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="dedicated">Dedicated security team/person</option>
                <option value="part-time">Part-time security responsibility</option>
                <option value="general-it">Handled as part of general IT</option>
                <option value="outsourced">Outsourced to third party</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="mfaCoverage"><strong>MFA coverage across workforce and privileged accounts</strong></label>
                <select
                  id="mfaCoverage"
                  name="mfaCoverage"
                  value={formData.mfaCoverage}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="full">Enabled for nearly all users/admin access</option>
                  <option value="partial">Enabled for some users/systems</option>
                  <option value="pilot">Pilot or limited rollout</option>
                  <option value="none">Not in place</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="edrLoggingCoverage"><strong>EDR and centralized logging maturity</strong></label>
                <select
                  id="edrLoggingCoverage"
                  name="edrLoggingCoverage"
                  value={formData.edrLoggingCoverage}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="full">Plant + enterprise coverage with active monitoring</option>
                  <option value="partial">Coverage on critical systems only</option>
                  <option value="minimal">Basic AV/logs, limited correlation</option>
                  <option value="none">No formal EDR/SIEM visibility</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="patchCadence"><strong>Security patching cadence for IT/OT systems</strong></label>
                <select
                  id="patchCadence"
                  name="patchCadence"
                  value={formData.patchCadence}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="monthly">Monthly cadence with exception tracking</option>
                  <option value="quarterly">Quarterly windows with partial tracking</option>
                  <option value="ad-hoc">Ad-hoc patching when issues arise</option>
                  <option value="rarely">Rarely patched / vendor driven only</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="itOtSegmentation"><strong>IT/OT network segmentation status</strong></label>
                <select
                  id="itOtSegmentation"
                  name="itOtSegmentation"
                  value={formData.itOtSegmentation}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="strong">Documented segmentation with managed zones</option>
                  <option value="partial">Partial segmentation in key areas</option>
                  <option value="minimal">Basic VLAN separation only</option>
                  <option value="none">Flat network / no OT segmentation</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="immutableBackups"><strong>Backup strategy and immutability</strong></label>
                <select
                  id="immutableBackups"
                  name="immutableBackups"
                  value={formData.immutableBackups}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="tested-immutable">Immutable backups with restore testing</option>
                  <option value="immutable-untested">Immutable backups, limited restore drills</option>
                  <option value="traditional">Traditional backups only</option>
                  <option value="none">No reliable backup posture</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="incidentRunbooks"><strong>Incident response runbooks and exercises</strong></label>
                <select
                  id="incidentRunbooks"
                  name="incidentRunbooks"
                  value={formData.incidentRunbooks}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="documented-tested">Documented and tested at least annually</option>
                  <option value="documented-untested">Documented but not exercised regularly</option>
                  <option value="informal">Informal tribal-knowledge response only</option>
                  <option value="none">No runbooks in place</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="encryptionCoverage"><strong>Encryption coverage for sensitive data</strong></label>
                <select
                  id="encryptionCoverage"
                  name="encryptionCoverage"
                  value={formData.encryptionCoverage}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="broad">At rest + in transit across critical systems</option>
                  <option value="partial">Partial encryption by system or use case</option>
                  <option value="minimal">Limited encryption controls</option>
                  <option value="none">No formal encryption standard</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="supplyChainRiskProgram"><strong>Supplier / third-party cyber risk management</strong></label>
                <select
                  id="supplyChainRiskProgram"
                  name="supplyChainRiskProgram"
                  value={formData.supplyChainRiskProgram}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="formal">Formal vendor risk reviews and contract controls</option>
                  <option value="partial">Reviews for critical suppliers only</option>
                  <option value="informal">Informal checks, no consistent standard</option>
                  <option value="none">No supplier cyber risk process</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="formalCybersecurityPolicy"><strong>Does your organization have a formal, documented cybersecurity policy?</strong></label>
              <select
                id="formalCybersecurityPolicy"
                name="formalCybersecurityPolicy"
                value={formData.formalCybersecurityPolicy}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Yes, comprehensive policy">Yes, comprehensive policy</option>
                <option value="Yes, basic policy">Yes, basic policy</option>
                <option value="In development">In development</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="riskAssessments"><strong>Do you conduct regular risk assessments of your IT infrastructure? If so, how often?</strong></label>
              <select
                id="riskAssessments"
                name="riskAssessments"
                value={formData.riskAssessments}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="quarterly">Quarterly or more frequently</option>
                <option value="annually">Annually</option>
                <option value="sporadic">Occasionally/Ad-hoc</option>
                <option value="never">Never</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cybersecurityIncident"><strong>Has your organization experienced a cybersecurity incident in the past 24 months? (ransomware, data breach, phishing attack, etc.)</strong></label>
              <select
                id="cybersecurityIncident"
                name="cybersecurityIncident"
                value={formData.cybersecurityIncident}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Yes, significant incident">Yes, significant incident</option>
                <option value="Yes, minor incident">Yes, minor incident</option>
                <option value="Suspicious activity detected">Suspicious activity detected</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="breachDetectionConfidence"><strong>How confident are you in your team's ability to detect a breach within 24 hours?</strong></label>
                <input
                  type="range"
                  id="breachDetectionConfidence"
                  name="breachDetectionConfidence"
                  min="1"
                  max="5"
                  step="1"
                  value={formData.breachDetectionConfidence || '2'}
                  onChange={handleChange}
                />
                <div className="slider-caption">
                  Confidence level: {formData.breachDetectionConfidence || '2'} / 5
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="cybersecurityBudgetPercentage"><strong>What percentage of your IT budget is allocated to cybersecurity?</strong></label>
                <input
                  type="range"
                  id="cybersecurityBudgetPercentage"
                  name="cybersecurityBudgetPercentage"
                  min="0"
                  max="25"
                  step="1"
                  value={formData.cybersecurityBudgetPercentage || '8'}
                  onChange={handleChange}
                />
                <div className="slider-caption">
                  Current allocation: {formData.cybersecurityBudgetPercentage || '8'}% ({getBudgetLabel(formData.cybersecurityBudgetPercentage || '8')})
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="disasterRecoveryPlan"><strong>Does your company have a disaster recovery plan?</strong></label>
                <select
                  id="disasterRecoveryPlan"
                  name="disasterRecoveryPlan"
                  value={formData.disasterRecoveryPlan}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="Yes, tested regularly">Yes, tested regularly</option>
                  <option value="Yes, but untested">Yes, but untested</option>
                  <option value="In development">In development</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="phishingExercises"><strong>Do you run simulated phishing exercises?</strong></label>
                <select
                  id="phishingExercises"
                  name="phishingExercises"
                  value={formData.phishingExercises}
                  onChange={handleChange}
                >
                  <option value="">Select...</option>
                  <option value="regularly">Yes, regularly (monthly or quarterly)</option>
                  <option value="occasionally">Yes, occasionally</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="securityAwareness"><strong>Does your organization conduct cybersecurity awareness training for all employees?</strong></label>
              <select
                id="securityAwareness"
                name="securityAwareness"
                value={formData.securityAwareness[0] || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, securityAwareness: e.target.value ? [e.target.value] : [] }))}
              >
                <option value="">Select...</option>
                <option value="Yes, quarterly or more frequently">Yes, quarterly or more frequently</option>
                <option value="Yes, annually">Yes, annually</option>
                <option value="Only during onboarding">Only during onboarding</option>
                <option value="No formal training">No formal training</option>
              </select>
            </div>

            {/* Business Needs */}
            <div className="form-section-title">Business Priorities</div>

            <div className="form-group">
              <label htmlFor="mainPainPoints"><strong>What's your #1 IT pain point right now?</strong></label>
              <textarea
                id="mainPainPoints"
                name="mainPainPoints"
                value={formData.mainPainPoints}
                onChange={handleChange}
                rows={3}
                placeholder="e.g., Systems going down too often, can't see production in real-time, security concerns..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="timeline"><strong>When would you like to address IT challenges?</strong></label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="immediate">Immediate (critical issue)</option>
                <option value="30days">Next 30 days</option>
                <option value="quarter">Next quarter</option>
                <option value="exploring">Just exploring options</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="additionalNotes"><strong>Any additional context or concerns?</strong></label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                value={formData.additionalNotes}
                onChange={handleChange}
                rows={2}
                placeholder="Optional: Help us understand your unique situation..."
              />
            </div>

            <button type="submit" className="submit-button">Submit Cybersecurity Assessment</button>
          </form>
        )}
      </div>
      {showScheduleOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Schedule Your Complimentary Assessment</h3>
            <label htmlFor="assessmentDate">Select Date:</label>
            <input
              type="date"
              id="assessmentDate"
              value={assessmentDate}
              onChange={e => setAssessmentDate(e.target.value)}
            />
            <label htmlFor="assessmentTime">Select Time:</label>
            <input
              type="time"
              id="assessmentTime"
              value={assessmentTime}
              onChange={e => setAssessmentTime(e.target.value)}
            />
            <a
              href="https://outlook.office.com/book/SalesTest@CenterLinkTech.onmicrosoft.com/?ismsaljsauthenabled"
              target="_blank"
              rel="noopener noreferrer"
              className="submit-button"
              style={{ textAlign: 'center', marginTop: '16px', display: 'block' }}
            >
              Book via Outlook
            </a>
            <button type="button" className="submit-button" onClick={() => setShowScheduleOverlay(false)}>
              Confirm
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
