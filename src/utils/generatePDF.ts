import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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
  dedicatedSecurityTeam: string
  formalCybersecurityPolicy: string
  riskAssessments: string
  cybersecurityIncident: string
  breachDetectionConfidence: string
  disasterRecoveryPlan: string
  securityAwareness: string[]
  phishingExercises: string
  cybersecurityBudgetPercentage: string
}

type MaturityLevel = 'Initial' | 'Developing' | 'Defined' | 'Managed' | 'Optimized'

interface CategoryMaturity {
  name: string
  score: number
  level: MaturityLevel
  referenceModel: string
  dimensions: string[]
  recommendation: string
}

export async function generateHealthCheckPDF(formData: FormData): Promise<void> {
  // Create a temporary container for HTML to render
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.width = '1000px'
  container.style.backgroundColor = 'white'
  container.style.padding = '25px'
  container.style.fontFamily = 'Arial, sans-serif'

  // Calculate maturity against reference anchors
  const categoryScores = buildMaturityProfile(formData)
  const overallScore = Math.round(categoryScores.reduce((sum, item) => sum + item.score, 0) / categoryScores.length)
  const overallLevel = getMaturityLevel(overallScore)

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #0052cc;">
        <img src="/clt-survey/centerlink-logo.svg" alt="Centerlink Technologies" style="height: 50px; width: auto;">
        <div>
          <h1 style="color: #0052cc; margin: 0; font-size: 24px;">Cybersecurity & Digital Maturity Report</h1>
          <p style="color: #666; margin: 3px 0 0 0; font-size: 12px;">Centerlink Technologies</p>
        </div>
      </div>

      <!-- Company Info -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0052cc; font-size: 16px; margin: 0 0 10px 0; border-bottom: 2px solid #0052cc; padding-bottom: 8px;">Company Information</h2>
        <table style="width: 100%; font-size: 12px;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 8px; font-weight: bold; width: 25%;">Company:</td>
            <td style="padding: 8px;">${escapeHtml(formData.companyName)}</td>
            <td style="padding: 8px; font-weight: bold; width: 25%;">Email:</td>
            <td style="padding: 8px;">${escapeHtml(formData.email)}</td>
          </tr>
          <tr>
            <td style="padding: 8px; font-weight: bold;">Phone:</td>
            <td style="padding: 8px;">${escapeHtml(formData.phone)}</td>
            <td style="padding: 8px; font-weight: bold;">Employees:</td>
            <td style="padding: 8px;">${escapeHtml(formData.employees)}</td>
          </tr>
        </table>
      </div>

      <!-- Reference alignment -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0052cc; font-size: 16px; margin: 0 0 10px 0; border-bottom: 2px solid #0052cc; padding-bottom: 8px;">Reference Model Alignment</h2>
        <div style="background: #f9fbff; border: 1px solid #dbe8ff; border-radius: 8px; padding: 12px; font-size: 11px; line-height: 1.5;">
          <p style="margin: 0 0 8px 0;"><strong>This report estimates maturity against regional and state reference practices:</strong></p>
          <ul style="margin: 0; padding-left: 18px;">
            <li><strong>Systems Modernization:</strong> Smart Manufacturing Cluster of Northeast Ohio Data-Driven Manufacturing readiness dimensions (engagement, organizational support, IIoT potential, workforce readiness, digital maturity).</li>
            <li><strong>Security & Compliance:</strong> Ohio Comprehensive Cybersecurity Plan alignment with NIST CSF style controls (identity/MFA readiness, monitoring, data protection, training, and incident response), plus manufacturing-focused assessment lenses (ICS/OT security, supply-chain risk, policy and documentation readiness).</li>
          </ul>
        </div>
      </div>

      <!-- Maturity Summary -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0052cc; font-size: 16px; margin: 0 0 10px 0; border-bottom: 2px solid #0052cc; padding-bottom: 8px;">Maturity Summary</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div style="text-align: center; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 14px;">Overall Maturity</p>
            <div style="font-size: 36px; font-weight: bold; color: ${getScoreColor(overallScore)};">${overallScore}%</div>
            <div style="width: 100%; height: 20px; background-color: #e0e0e0; border-radius: 10px; margin: 10px 0; overflow: hidden;">
              <div style="width: ${overallScore}%; height: 100%; background-color: ${getScoreColor(overallScore)}; transition: width 0.3s;"></div>
            </div>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">${overallLevel} maturity</p>
          </div>

          <div style="padding: 15px; background-color: #f9f9f9; border-radius: 8px; font-size: 11px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">Maturity Scale</p>
            <p style="margin: 0 0 4px 0;"><strong>Initial</strong> (0-34): Reactive, informal practices</p>
            <p style="margin: 0 0 4px 0;"><strong>Developing</strong> (35-54): Emerging repeatability</p>
            <p style="margin: 0 0 4px 0;"><strong>Defined</strong> (55-74): Documented baseline in place</p>
            <p style="margin: 0 0 4px 0;"><strong>Managed</strong> (75-89): Measured and actively managed</p>
            <p style="margin: 0;"><strong>Optimized</strong> (90-100): Continuous improvement and resilience</p>
          </div>
        </div>
      </div>

      <!-- Category breakdown -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0052cc; font-size: 16px; margin: 0 0 10px 0; border-bottom: 2px solid #0052cc; padding-bottom: 8px;">Category Maturity Breakdown</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 11px;">
          ${categoryScores.map(category => `
            <div style="padding: 10px; border: 1px solid #d9d9d9; border-radius: 8px; background: #fff;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
                <strong style="font-size: 13px; color: #1a1a1a;">${escapeHtml(category.name)}</strong>
                <span style="font-weight: bold; color: ${getScoreColor(category.score)};">${category.score}% (${category.level})</span>
              </div>
              <div style="width: 100%; height: 10px; background: #ececec; border-radius: 8px; overflow: hidden; margin-bottom: 6px;">
                <div style="width: ${category.score}%; height: 100%; background: ${getScoreColor(category.score)};"></div>
              </div>
              <p style="margin: 0 0 5px 0; color: #4d4d4d;"><strong>Reference:</strong> ${escapeHtml(category.referenceModel)}</p>
              <p style="margin: 0 0 5px 0; color: #4d4d4d;"><strong>Dimensions measured:</strong> ${escapeHtml(category.dimensions.join(', '))}</p>
              <p style="margin: 0; color: #2f4f7f;"><strong>Priority recommendation:</strong> ${escapeHtml(category.recommendation)}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Critical Systems -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0052cc; font-size: 16px; margin: 0 0 10px 0; border-bottom: 2px solid #0052cc; padding-bottom: 8px;">Critical Systems</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
          ${formData.criticalSystems.length > 0 
            ? formData.criticalSystems.map(system => 
              `<div style="padding: 8px; background-color: #f0f7ff; border-left: 3px solid #0052cc; border-radius: 4px;">✓ ${escapeHtml(system)}</div>`
            ).join('')
            : '<div style="padding: 8px; color: #999;">No critical systems selected</div>'
          }
        </div>
      </div>

      <!-- Assessment Details -->
      <div style="margin-bottom: 20px;">
        <h2 style="color: #0052cc; font-size: 16px; margin: 0 0 10px 0; border-bottom: 2px solid #0052cc; padding-bottom: 8px;">Assessment Details</h2>
        <table style="width: 100%; font-size: 11px; border-collapse: collapse;">
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Production Visibility:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.productionVisibility)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">System Integration Needs:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.integrationNeeds)}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Implementation Timeline:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.timeline)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Main Pain Points:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.mainPainPoints)}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Security Policy:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.formalCybersecurityPolicy)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Risk Assessments:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.riskAssessments)}</td>
          </tr>
        </table>
      </div>

      <!-- Next Steps -->
      <div style="background-color: #f0f7ff; border-left: 4px solid #0052cc; padding: 12px; margin-bottom: 15px; border-radius: 4px;">
        <h3 style="color: #0052cc; margin: 0 0 8px 0; font-size: 14px;">Next Steps</h3>
        <ul style="margin: 0; padding-left: 20px; font-size: 11px; line-height: 1.5;">
          <li>Our IT specialists will review your assessment within 24 hours</li>
          <li>We'll contact you to discuss findings and recommendations</li>
          <li>We'll provide a customized implementation plan if you choose to move forward</li>
          <li>Questions? Contact us at (888) 233-0086 or sales@centerlinktech.com</li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding-top: 10px; border-top: 1px solid #ccc; font-size: 10px; color: #999;">
        <p style="margin: 0;">Centerlink Technologies | Northeast Ohio Manufacturing IT Solutions Provider</p>
        <p style="margin: 3px 0 0 0;">© 2026 Centerlink Technologies. All rights reserved.</p>
      </div>
    </div>
  `

  container.innerHTML = html
  document.body.appendChild(container)

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(container, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
    })

    // Create PDF with single page
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    // Add single page (no multi-page logic)
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)

    // Download PDF
    pdf.save(`IT_Health_Check_Report_${formData.companyName}_${new Date().getTime()}.pdf`)
  } finally {
    // Clean up
    document.body.removeChild(container)
  }
}

function buildMaturityProfile(formData: FormData): CategoryMaturity[] {
  const systemsModernization = calculateSystemsModernization(formData)
  const securityPosture = calculateSecurityPosture(formData)
  const complianceStatus = calculateComplianceStatus(formData)
  const operationalResilience = calculateOperationalResilience(formData)

  return [systemsModernization, securityPosture, complianceStatus, operationalResilience]
}

function calculateSystemsModernization(formData: FormData): CategoryMaturity {
  const digitalMaturity = calculateSystemsAgeScore(formData.yearsWithCurrentSystem)
  const engagement = mapScore(formData.timeline, {
    immediate: 85,
    '30days': 80,
    quarter: 68,
    exploring: 55,
  }, 60)
  const iiotPotential = mapScore(formData.integrationNeeds, {
    siloed: 35,
    partial: 60,
    mostly: 78,
    fully: 92,
  }, 50)
  const orgSupport = mapScore(formData.productionVisibility, {
    manual: 35,
    partial: 58,
    good: 78,
    excellent: 92,
  }, 50)
  const workforceReadiness = mapScore(formData.securityAwareness?.[0] ?? '', {
    'Yes, quarterly or more frequently': 90,
    'Yes, annually': 72,
    'Only during onboarding': 50,
    'No formal training': 30,
  }, 55)

  const score = weightedAverage([
    [engagement, 0.15],
    [orgSupport, 0.20],
    [iiotPotential, 0.25],
    [workforceReadiness, 0.15],
    [digitalMaturity, 0.25],
  ])

  return {
    name: 'Systems Modernization',
    score,
    level: getMaturityLevel(score),
    referenceModel: 'SMCNEO DDM Readiness dimensions',
    dimensions: ['engagement', 'organizational support', 'IIoT potential', 'workforce readiness', 'digital maturity'],
    recommendation: score < 70
      ? 'Prioritize one pilot line for real-time visibility and phased system integration, then formalize workforce enablement.'
      : 'Expand successful pilots into repeatable digital standards across lines and suppliers.',
  }
}

function calculateSecurityPosture(formData: FormData): CategoryMaturity {
  const policy = mapScore(formData.formalCybersecurityPolicy, {
    'Yes, comprehensive policy': 92,
    'Yes, basic policy': 72,
    'In development': 50,
    No: 25,
  }, 50)

  const riskAssessments = mapScore(formData.riskAssessments, {
    quarterly: 90,
    annually: 75,
    sporadic: 50,
    never: 25,
  }, 50)

  const detectionConfidence = normalizeFivePointScale(formData.breachDetectionConfidence)
  const response = mapScore(formData.disasterRecoveryPlan, {
    'Yes, tested regularly': 90,
    'Yes, but untested': 65,
    'In development': 48,
    No: 25,
  }, 50)
  const training = mapScore(formData.phishingExercises, {
    regularly: 88,
    occasionally: 65,
    no: 35,
  }, 55)
  const staffing = mapScore(formData.dedicatedSecurityTeam, {
    dedicated: 88,
    outsourced: 78,
    'part-time': 62,
    'general-it': 55,
  }, 58)

  const score = weightedAverage([
    [policy, 0.20],
    [riskAssessments, 0.20],
    [detectionConfidence, 0.15],
    [response, 0.20],
    [training, 0.10],
    [staffing, 0.15],
  ])

  return {
    name: 'Security Posture',
    score,
    level: getMaturityLevel(score),
    referenceModel: 'Ohio OCCP + NIST CSF-aligned control practices',
    dimensions: ['policy governance', 'assessment cadence', 'monitoring/detection', 'incident response', 'training culture'],
    recommendation: score < 70
      ? 'Establish a documented control baseline (MFA/identity, logging/EDR, incident playbooks, tested recovery) and measure quarterly.'
      : 'Shift from baseline controls to continuous monitoring metrics and tabletop-driven improvement cycles.',
  }
}

function calculateComplianceStatus(formData: FormData): CategoryMaturity {
  const selectedCompliance = formData.compliance ?? []
  const hasNoRequirements = selectedCompliance.includes('No specific requirements')
  const effectiveRequirements = selectedCompliance.filter(item => item !== 'No specific requirements').length

  const complianceScope = hasNoRequirements && effectiveRequirements === 0
    ? 35
    : effectiveRequirements >= 3
      ? 88
      : effectiveRequirements === 2
        ? 76
        : effectiveRequirements === 1
          ? 62
          : 50

  const policyReadiness = mapScore(formData.formalCybersecurityPolicy, {
    'Yes, comprehensive policy': 90,
    'Yes, basic policy': 70,
    'In development': 52,
    No: 30,
  }, 52)

  const workforceReadiness = mapScore(formData.securityAwareness?.[0] ?? '', {
    'Yes, quarterly or more frequently': 90,
    'Yes, annually': 72,
    'Only during onboarding': 50,
    'No formal training': 28,
  }, 55)

  const documentationCadence = mapScore(formData.riskAssessments, {
    quarterly: 88,
    annually: 72,
    sporadic: 50,
    never: 28,
  }, 50)

  const manufacturingControlReadiness = mapScore(formData.integrationNeeds, {
    siloed: 35,
    partial: 58,
    mostly: 75,
    fully: 86,
  }, 55)

  const score = weightedAverage([
    [complianceScope, 0.20],
    [policyReadiness, 0.25],
    [workforceReadiness, 0.20],
    [documentationCadence, 0.20],
    [manufacturingControlReadiness, 0.15],
  ])

  return {
    name: 'Compliance Status',
    score,
    level: getMaturityLevel(score),
    referenceModel: 'OCCP/NIST control evidence + NE Ohio manufacturing assessment focus areas',
    dimensions: ['control scope', 'policy documentation', 'training evidence', 'assessment records', 'ICS/OT readiness proxy'],
    recommendation: score < 70
      ? 'Define minimum policy and evidence standards (training logs, risk records, incident documentation) tied to your required frameworks.'
      : 'Automate evidence collection and align audit artifacts to each control owner for faster certification cycles.',
  }
}

function calculateOperationalResilience(formData: FormData): CategoryMaturity {
  const downtime = calculateDowntimeScore(formData.downtime)
  const responseReadiness = mapScore(formData.disasterRecoveryPlan, {
    'Yes, tested regularly': 92,
    'Yes, but untested': 68,
    'In development': 50,
    No: 25,
  }, 52)
  const incidentExposure = mapScore(formData.cybersecurityIncident, {
    No: 86,
    'Suspicious activity detected': 68,
    'Yes, minor incident': 55,
    'Yes, significant incident': 35,
  }, 58)
  const detectionConfidence = normalizeFivePointScale(formData.breachDetectionConfidence)
  const operationsVisibility = mapScore(formData.productionVisibility, {
    manual: 35,
    partial: 60,
    good: 80,
    excellent: 92,
  }, 55)

  const score = weightedAverage([
    [downtime, 0.30],
    [responseReadiness, 0.25],
    [incidentExposure, 0.15],
    [detectionConfidence, 0.15],
    [operationsVisibility, 0.15],
  ])

  return {
    name: 'Operational Resilience',
    score,
    level: getMaturityLevel(score),
    referenceModel: 'Manufacturing continuity and cyber resilience practices promoted in state/regional programs',
    dimensions: ['downtime impact', 'recovery readiness', 'incident exposure', 'detection speed', 'operational visibility'],
    recommendation: score < 70
      ? 'Run recovery tests, tighten downtime KPIs, and map critical systems to incident response playbooks.'
      : 'Move to scenario-based drills that include IT, OT, and supplier dependencies.',
  }
}

function mapScore(value: string, scoreMap: Record<string, number>, fallback: number): number {
  return scoreMap[value] ?? fallback
}

function weightedAverage(items: Array<[number, number]>): number {
  const weightedTotal = items.reduce((sum, [value, weight]) => sum + value * weight, 0)
  return Math.round(weightedTotal)
}

function getMaturityLevel(score: number): MaturityLevel {
  if (score >= 90) return 'Optimized'
  if (score >= 75) return 'Managed'
  if (score >= 55) return 'Defined'
  if (score >= 35) return 'Developing'
  return 'Initial'
}

function calculateSystemsAgeScore(age: string): number {
  const ageNum = parseInt(age, 10) || 0
  if (ageNum <= 3) return 92
  if (ageNum <= 5) return 78
  if (ageNum <= 7) return 64
  if (ageNum <= 10) return 48
  return 32
}

function calculateDowntimeScore(downtime: string): number {
  const downtimeNum = parseFloat(downtime) || 0
  if (downtimeNum === 0) return 95
  if (downtimeNum <= 1) return 85
  if (downtimeNum <= 3) return 72
  if (downtimeNum <= 5) return 58
  if (downtimeNum <= 10) return 42
  return 28
}

function normalizeFivePointScale(value: string): number {
  const numeric = parseInt(value, 10)
  if (Number.isNaN(numeric) || numeric < 1) return 50
  return Math.min(100, Math.max(20, numeric * 20))
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#28a745' // Green
  if (score >= 60) return '#ffc107' // Yellow
  if (score >= 40) return '#fd7e14' // Orange
  return '#dc3545' // Red
}

function escapeHtml(text: string): string {
  const safeText = text || 'Not provided'
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return safeText.replace(/[&<>"']/g, m => map[m])
}
