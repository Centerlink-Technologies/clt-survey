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
  mfaCoverage: string
  edrLoggingCoverage: string
  patchCadence: string
  itOtSegmentation: string
  immutableBackups: string
  incidentRunbooks: string
  encryptionCoverage: string
  supplyChainRiskProgram: string
}

type MaturityLevel = 'Initial' | 'Developing' | 'Defined' | 'Managed' | 'Optimized'

interface CategoryMaturity {
  name: string
  score: number
  level: MaturityLevel
  referenceModel: string
  dimensions: string[]
  baselineBand: string
  baselineComparison: string
  recommendation: string
}

export async function generateHealthCheckPDF(formData: FormData): Promise<void> {
  // Create a temporary container for HTML to render
  const baseUrl = import.meta.env.BASE_URL
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
  const overallBaselineBand = '60-70%'
  const overallComparison = getBaselineComparisonSentence(overallScore, 60, 70)

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <!-- Header -->
      <div style="display: flex; align-items: center; gap: 20px; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 3px solid #0052cc;">
          <img src="${baseUrl}centerlink-logo.svg" alt="Centerlink Technologies" style="height: 50px; width: auto;">
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
        <h2 style="color: #0052cc; font-size: 16px; margin: 0 0 10px 0; border-bottom: 2px solid #0052cc; padding-bottom: 8px;">Methodology & Reference Alignment</h2>
        <div style="background: #f9fbff; border: 1px solid #dbe8ff; border-radius: 8px; padding: 12px; font-size: 11px; line-height: 1.5;">
          <p style="margin: 0 0 8px 0;"><strong>How your score is calculated:</strong></p>
          <p style="margin: 0 0 8px 0;">Your scores are based on your answers and benchmarked against practices promoted by regional programs for manufacturers in Northeast Ohio (Akron, Canton, Cleveland and surrounding areas).</p>
          <ul style="margin: 0; padding-left: 18px;">
            <li><strong>Systems Modernization:</strong> aligned with Smart Manufacturing Cluster of Northeast Ohio Data-Driven Manufacturing (DDM) dimensions: engagement, organizational support, IIoT opportunities, workforce readiness, and digital maturity.</li>
            <li><strong>Security Posture and Compliance Status:</strong> aligned with Ohio Comprehensive Cybersecurity Plan and NIST-oriented controls (MFA, logging/EDR, encryption, training, incident response), plus manufacturing-focused regional assessment control areas (ICS/OT security, supply-chain risk, policy, training, documentation).</li>
            <li><strong>Benchmark interpretation:</strong> baseline ranges represent typical maturity observed in small-to-mid-size regional manufacturers and are data-informed benchmarks, not official state averages or certifications.</li>
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
            <p style="margin: 5px 0 0 0; font-size: 11px; color: #444;"><strong>NE Ohio baseline band:</strong> ${overallBaselineBand}</p>
            <p style="margin: 5px 0 0 0; font-size: 11px; color: #444;">${overallComparison}</p>
          </div>

          <div style="padding: 15px; background-color: #f9f9f9; border-radius: 8px; font-size: 11px;">
            <p style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">Maturity Scale</p>
            <p style="margin: 0 0 4px 0;"><strong>Initial</strong> (0-30): Minimal / reactive controls and modernization</p>
            <p style="margin: 0 0 4px 0;"><strong>Developing</strong> (31-50): Early programs, partial repeatability</p>
            <p style="margin: 0 0 4px 0;"><strong>Defined</strong> (51-65): Moderate readiness with uneven consistency</p>
            <p style="margin: 0 0 4px 0;"><strong>Managed</strong> (66-85): Strong roadmap with measurable controls</p>
            <p style="margin: 0;"><strong>Optimized</strong> (86-100): Regional leading maturity and resilience</p>
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
              <p style="margin: 0 0 5px 0; color: #4d4d4d;"><strong>NE Ohio baseline band:</strong> ${escapeHtml(category.baselineBand)}</p>
              <p style="margin: 0 0 5px 0; color: #4d4d4d;">${escapeHtml(category.baselineComparison)}</p>
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
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">MFA Coverage:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.mfaCoverage)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">EDR/Logging Coverage:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.edrLoggingCoverage)}</td>
          </tr>
          <tr style="background-color: #f5f5f5;">
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">IT/OT Segmentation:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.itOtSegmentation)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Backup Immutability:</td>
            <td style="padding: 10px; border: 1px solid #ddd;">${escapeHtml(formData.immutableBackups)}</td>
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

    // Create PDF (supports multi-page output when content is taller than one page)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgData = canvas.toDataURL('image/png')
    const pageWidth = 210
    const pageHeight = 297
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width

    let heightLeft = imgHeight
    let position = 0

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight
    }

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
    immediate: 72,
    '30days': 66,
    quarter: 56,
    exploring: 45,
  }, 50)
  const iiotPotential = mapScore(formData.integrationNeeds, {
    siloed: 24,
    partial: 46,
    mostly: 62,
    fully: 84,
  }, 46)
  const orgSupport = mapScore(formData.productionVisibility, {
    manual: 25,
    partial: 47,
    good: 64,
    excellent: 85,
  }, 48)
  const workforceReadiness = mapScore(formData.securityAwareness?.[0] ?? '', {
    'Yes, quarterly or more frequently': 78,
    'Yes, annually': 62,
    'Only during onboarding': 45,
    'No formal training': 25,
  }, 46)

  const score = weightedAverage([
    [engagement, 0.18],
    [orgSupport, 0.20],
    [iiotPotential, 0.25],
    [workforceReadiness, 0.17],
    [digitalMaturity, 0.20],
  ])
  const baselineMin = 50
  const baselineMax = 65

  return {
    name: 'Systems Modernization',
    score,
    level: getMaturityLevel(score),
    referenceModel: 'SMCNEO DDM Readiness dimensions',
    dimensions: ['engagement', 'organizational support', 'IIoT potential', 'workforce readiness', 'digital maturity'],
    baselineBand: `${baselineMin}-${baselineMax}%`,
    baselineComparison: getBaselineComparisonSentence(score, baselineMin, baselineMax),
    recommendation: score < 70
      ? 'Prioritize one pilot line for real-time visibility and phased system integration, then formalize workforce enablement.'
      : 'Expand successful pilots into repeatable digital standards across lines and suppliers.',
  }
}

function calculateSecurityPosture(formData: FormData): CategoryMaturity {
  const mfa = mapScore(formData.mfaCoverage, {
    full: 88,
    partial: 66,
    pilot: 48,
    none: 20,
  }, 48)
  const edrLogging = mapScore(formData.edrLoggingCoverage, {
    full: 86,
    partial: 64,
    minimal: 46,
    none: 18,
  }, 46)
  const patching = mapScore(formData.patchCadence, {
    monthly: 84,
    quarterly: 65,
    'ad-hoc': 44,
    rarely: 18,
  }, 45)
  const segmentation = mapScore(formData.itOtSegmentation, {
    strong: 88,
    partial: 62,
    minimal: 42,
    none: 15,
  }, 44)
  const backups = mapScore(formData.immutableBackups, {
    'tested-immutable': 90,
    'immutable-untested': 68,
    traditional: 48,
    none: 14,
  }, 45)
  const runbooks = mapScore(formData.incidentRunbooks, {
    'documented-tested': 88,
    'documented-untested': 62,
    informal: 42,
    none: 16,
  }, 44)
  const encryption = mapScore(formData.encryptionCoverage, {
    broad: 84,
    partial: 64,
    minimal: 44,
    none: 20,
  }, 48)
  const training = mapScore(formData.phishingExercises, {
    regularly: 74,
    occasionally: 56,
    no: 34,
  }, 50)
  const detectionConfidence = normalizeFivePointScale(formData.breachDetectionConfidence)

  const score = weightedAverage([
    [mfa, 0.14],
    [edrLogging, 0.14],
    [patching, 0.12],
    [segmentation, 0.14],
    [backups, 0.12],
    [runbooks, 0.12],
    [encryption, 0.10],
    [training, 0.06],
    [detectionConfidence, 0.15],
  ])
  const baselineMin = 55
  const baselineMax = 70

  return {
    name: 'Security Posture',
    score,
    level: getMaturityLevel(score),
    referenceModel: 'Ohio OCCP + NIST CSF-aligned control practices',
    dimensions: ['MFA coverage', 'EDR/logging visibility', 'patch management', 'IT/OT segmentation', 'immutable backups', 'incident runbooks', 'encryption', 'training'],
    baselineBand: `${baselineMin}-${baselineMax}%`,
    baselineComparison: getBaselineComparisonSentence(score, baselineMin, baselineMax),
    recommendation: score < 70
      ? 'Close control gaps in MFA, monitoring, segmentation, and tested immutable recovery to align with OCCP/NIST expectations.'
      : 'Shift from baseline controls to continuous monitoring metrics and tabletop-driven improvement cycles.',
  }
}

function calculateComplianceStatus(formData: FormData): CategoryMaturity {
  const selectedCompliance = formData.compliance ?? []
  const hasNoRequirements = selectedCompliance.includes('No specific requirements')
  const effectiveRequirements = selectedCompliance.filter(item => item !== 'No specific requirements').length

  const complianceScope = hasNoRequirements && effectiveRequirements === 0
    ? 30
    : effectiveRequirements >= 3
      ? 76
      : effectiveRequirements === 2
        ? 64
        : effectiveRequirements === 1
          ? 54
          : 50

  const policyReadiness = mapScore(formData.formalCybersecurityPolicy, {
    'Yes, comprehensive policy': 80,
    'Yes, basic policy': 62,
    'In development': 48,
    No: 28,
  }, 46)

  const workforceReadiness = mapScore(formData.securityAwareness?.[0] ?? '', {
    'Yes, quarterly or more frequently': 78,
    'Yes, annually': 62,
    'Only during onboarding': 46,
    'No formal training': 24,
  }, 45)

  const documentationCadence = mapScore(formData.riskAssessments, {
    quarterly: 80,
    annually: 64,
    sporadic: 44,
    never: 24,
  }, 45)

  const supplyChainReadiness = mapScore(formData.supplyChainRiskProgram, {
    formal: 76,
    partial: 58,
    informal: 42,
    none: 20,
  }, 44)

  const runbookEvidence = mapScore(formData.incidentRunbooks, {
    'documented-tested': 78,
    'documented-untested': 58,
    informal: 40,
    none: 20,
  }, 44)

  const score = weightedAverage([
    [complianceScope, 0.20],
    [policyReadiness, 0.22],
    [workforceReadiness, 0.18],
    [documentationCadence, 0.20],
    [runbookEvidence, 0.10],
    [supplyChainReadiness, 0.10],
  ])
  const baselineMin = 45
  const baselineMax = 60

  return {
    name: 'Compliance Status',
    score,
    level: getMaturityLevel(score),
    referenceModel: 'OCCP/NIST control evidence + NE Ohio manufacturing assessment focus areas',
    dimensions: ['framework scope (incl. CMMC Level 2)', 'policy documentation', 'training cadence', 'risk assessment records', 'incident documentation', 'supply-chain risk controls'],
    baselineBand: `${baselineMin}-${baselineMax}%`,
    baselineComparison: getBaselineComparisonSentence(score, baselineMin, baselineMax),
    recommendation: score < 70
      ? 'Define minimum policy and evidence standards (training logs, risk records, incident documentation) tied to your required frameworks.'
      : 'Automate evidence collection and align audit artifacts to each control owner for faster certification cycles.',
  }
}

function calculateOperationalResilience(formData: FormData): CategoryMaturity {
  const downtime = calculateDowntimeScore(formData.downtime)
  const recovery = mapScore(formData.disasterRecoveryPlan, {
    'Yes, tested regularly': 84,
    'Yes, but untested': 62,
    'In development': 45,
    No: 22,
  }, 44)
  const backupResilience = mapScore(formData.immutableBackups, {
    'tested-immutable': 88,
    'immutable-untested': 64,
    traditional: 45,
    none: 20,
  }, 44)
  const incidentExposure = mapScore(formData.cybersecurityIncident, {
    No: 74,
    'Suspicious activity detected': 58,
    'Yes, minor incident': 45,
    'Yes, significant incident': 28,
  }, 50)
  const detectionConfidence = normalizeFivePointScale(formData.breachDetectionConfidence)
  const operationsVisibility = mapScore(formData.productionVisibility, {
    manual: 24,
    partial: 48,
    good: 66,
    excellent: 82,
  }, 46)

  const score = weightedAverage([
    [downtime, 0.28],
    [recovery, 0.22],
    [backupResilience, 0.20],
    [incidentExposure, 0.12],
    [detectionConfidence, 0.10],
    [operationsVisibility, 0.08],
  ])
  const baselineMin = 50
  const baselineMax = 65

  return {
    name: 'Operational Resilience',
    score,
    level: getMaturityLevel(score),
    referenceModel: 'OCCP/NIST incident response and manufacturing continuity practices',
    dimensions: ['downtime impact', 'recovery readiness', 'backup immutability', 'incident exposure', 'detection speed', 'operational visibility'],
    baselineBand: `${baselineMin}-${baselineMax}%`,
    baselineComparison: getBaselineComparisonSentence(score, baselineMin, baselineMax),
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
  if (score >= 86) return 'Optimized'
  if (score >= 66) return 'Managed'
  if (score >= 51) return 'Defined'
  if (score >= 31) return 'Developing'
  return 'Initial'
}

function getBaselineComparisonSentence(score: number, baselineMin: number, baselineMax: number): string {
  if (score < baselineMin) {
    return 'Your score indicates you are below the typical NE Ohio manufacturer baseline in this area.'
  }
  if (score > baselineMax) {
    return 'Your score indicates you are above the typical NE Ohio manufacturer baseline in this area.'
  }
  return 'Your score indicates you are at the typical NE Ohio manufacturer baseline in this area.'
}

function calculateSystemsAgeScore(age: string): number {
  const ageNum = parseInt(age, 10) || 0
  if (ageNum <= 3) return 88
  if (ageNum <= 5) return 72
  if (ageNum <= 7) return 60
  if (ageNum <= 10) return 45
  return 30
}

function calculateDowntimeScore(downtime: string): number {
  const downtimeNum = parseFloat(downtime) || 0
  if (downtimeNum === 0) return 88
  if (downtimeNum <= 1) return 78
  if (downtimeNum <= 3) return 64
  if (downtimeNum <= 5) return 52
  if (downtimeNum <= 10) return 38
  return 25
}

function normalizeFivePointScale(value: string): number {
  const numeric = parseInt(value, 10)
  if (Number.isNaN(numeric) || numeric < 1) return 50
  const scaleMap: Record<number, number> = {
    1: 22,
    2: 42,
    3: 56,
    4: 70,
    5: 84,
  }
  return scaleMap[numeric] ?? 50
}

function getScoreColor(score: number): string {
  if (score >= 66) return '#28a745' // Green
  if (score >= 51) return '#ffc107' // Yellow
  if (score >= 31) return '#fd7e14' // Orange
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
