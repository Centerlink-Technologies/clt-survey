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
}

export async function generateHealthCheckPDF(formData: FormData): Promise<void> {
  // Create a temporary container for HTML to render
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.width = '1000px'
  container.style.backgroundColor = 'white'
  container.style.padding = '40px'
  container.style.fontFamily = 'Arial, sans-serif'

  // Calculate health scores
  const securityScore = calculateSecurityScore(formData.securityConcerns)
  const complianceScore = calculateComplianceScore(formData.compliance)
  const systemsAgeScore = calculateSystemsAgeScore(formData.yearsWithCurrentSystem)
  const downtimeScore = calculateDowntimeScore(formData.downtime)
  const overallScore = Math.round((securityScore + complianceScore + systemsAgeScore + downtimeScore) / 4)

  const html = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 3px solid #0052cc;">
        <h1 style="color: #0052cc; margin: 0; font-size: 28px;">Manufacturing IT Health Check Report</h1>
        <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Centerlink Technologies</p>
      </div>

      <!-- Company Info -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #0052cc; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #0052cc; padding-bottom: 10px;">Company Information</h2>
        <table style="width: 100%; font-size: 14px;">
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

      <!-- Health Scores -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #0052cc; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #0052cc; padding-bottom: 10px;">IT Health Assessment Scores</h2>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- Overall Health Meter -->
          <div style="text-align: center; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 14px;">Overall Health Score</p>
            <div style="font-size: 36px; font-weight: bold; color: ${getScoreColor(overallScore)};">${overallScore}%</div>
            <div style="width: 100%; height: 20px; background-color: #e0e0e0; border-radius: 10px; margin: 10px 0; overflow: hidden;">
              <div style="width: ${overallScore}%; height: 100%; background-color: ${getScoreColor(overallScore)}; transition: width 0.3s;"></div>
            </div>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">${getScoreLabel(overallScore)}</p>
          </div>

          <!-- System Age Score -->
          <div style="text-align: center; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 14px;">Systems Modernization</p>
            <div style="font-size: 36px; font-weight: bold; color: ${getScoreColor(systemsAgeScore)};">${systemsAgeScore}%</div>
            <div style="width: 100%; height: 20px; background-color: #e0e0e0; border-radius: 10px; margin: 10px 0; overflow: hidden;">
              <div style="width: ${systemsAgeScore}%; height: 100%; background-color: ${getScoreColor(systemsAgeScore)};"></div>
            </div>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Current System Age: ${escapeHtml(formData.yearsWithCurrentSystem)} years</p>
          </div>

          <!-- Security Score -->
          <div style="text-align: center; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 14px;">Security Posture</p>
            <div style="font-size: 36px; font-weight: bold; color: ${getScoreColor(securityScore)};">${securityScore}%</div>
            <div style="width: 100%; height: 20px; background-color: #e0e0e0; border-radius: 10px; margin: 10px 0; overflow: hidden;">
              <div style="width: ${securityScore}%; height: 100%; background-color: ${getScoreColor(securityScore)};"></div>
            </div>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Concerns: ${formData.securityConcerns.length || 0}</p>
          </div>

          <!-- Compliance Score -->
          <div style="text-align: center; padding: 15px; background-color: #f9f9f9; border-radius: 8px;">
            <p style="margin: 0 0 10px 0; font-weight: bold; font-size: 14px;">Compliance Status</p>
            <div style="font-size: 36px; font-weight: bold; color: ${getScoreColor(complianceScore)};">${complianceScore}%</div>
            <div style="width: 100%; height: 20px; background-color: #e0e0e0; border-radius: 10px; margin: 10px 0; overflow: hidden;">
              <div style="width: ${complianceScore}%; height: 100%; background-color: ${getScoreColor(complianceScore)};"></div>
            </div>
            <p style="margin: 5px 0 0 0; font-size: 12px; color: #666;">Downtime: ${escapeHtml(formData.downtime)}%</p>
          </div>
        </div>
      </div>

      <!-- Critical Systems -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #0052cc; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #0052cc; padding-bottom: 10px;">Critical Systems</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 14px;">
          ${formData.criticalSystems.length > 0 
            ? formData.criticalSystems.map(system => 
              `<div style="padding: 8px; background-color: #f0f7ff; border-left: 3px solid #0052cc; border-radius: 4px;">✓ ${escapeHtml(system)}</div>`
            ).join('')
            : '<div style="padding: 8px; color: #999;">No critical systems selected</div>'
          }
        </div>
      </div>

      <!-- Assessment Details -->
      <div style="margin-bottom: 30px;">
        <h2 style="color: #0052cc; font-size: 18px; margin: 0 0 15px 0; border-bottom: 2px solid #0052cc; padding-bottom: 10px;">Assessment Details</h2>
        <table style="width: 100%; font-size: 13px; border-collapse: collapse;">
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
        </table>
      </div>

      <!-- Next Steps -->
      <div style="background-color: #f0f7ff; border-left: 4px solid #0052cc; padding: 15px; margin-bottom: 20px; border-radius: 4px;">
        <h3 style="color: #0052cc; margin: 0 0 10px 0; font-size: 16px;">Next Steps</h3>
        <ul style="margin: 0; padding-left: 20px; font-size: 13px; line-height: 1.6;">
          <li>Our IT specialists will review your assessment within 24 hours</li>
          <li>We'll contact you to discuss findings and recommendations</li>
          <li>We'll provide a customized implementation plan if you choose to move forward</li>
          <li>Questions? Contact us at (888) 233-0086 or sales@centerlinktech.com</li>
        </ul>
      </div>

      <!-- Footer -->
      <div style="text-align: center; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #999;">
        <p style="margin: 0;">Centerlink Technologies | Northeast Ohio Manufacturing IT Solutions Provider</p>
        <p style="margin: 5px 0 0 0;">© 2026 Centerlink Technologies. All rights reserved.</p>
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

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const imgData = canvas.toDataURL('image/png')
    const imgWidth = 210 // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    
    let heightLeft = imgHeight
    let position = 0

    // Add pages as needed
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= 297 // A4 height in mm

    while (heightLeft > 0) {
      position = heightLeft - imgHeight
      pdf.addPage()
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= 297
    }

    // Download PDF
    pdf.save(`IT_Health_Check_Report_${formData.companyName}_${new Date().getTime()}.pdf`)
  } finally {
    // Clean up
    document.body.removeChild(container)
  }
}

function calculateSecurityScore(securityConcerns: string[]): number {
  // Fewer concerns = higher score
  if (securityConcerns.length === 0) return 100
  if (securityConcerns.length === 1) return 85
  if (securityConcerns.length === 2) return 70
  if (securityConcerns.length === 3) return 55
  return Math.max(30, 100 - (securityConcerns.length * 10))
}

function calculateComplianceScore(compliance: string[]): number {
  // More compliance needs = lower score
  if (compliance.length === 0) return 100
  if (compliance.length === 1) return 85
  if (compliance.length === 2) return 70
  if (compliance.length === 3) return 55
  return Math.max(30, 100 - (compliance.length * 10))
}

function calculateSystemsAgeScore(age: string): number {
  const ageNum = parseInt(age) || 0
  if (ageNum <= 3) return 90
  if (ageNum <= 5) return 75
  if (ageNum <= 7) return 60
  if (ageNum <= 10) return 45
  return 30
}

function calculateDowntimeScore(downtime: string): number {
  const downtimeNum = parseFloat(downtime) || 0
  if (downtimeNum === 0) return 100
  if (downtimeNum <= 1) return 85
  if (downtimeNum <= 3) return 70
  if (downtimeNum <= 5) return 55
  if (downtimeNum <= 10) return 40
  return 25
}

function getScoreColor(score: number): string {
  if (score >= 80) return '#28a745' // Green
  if (score >= 60) return '#ffc107' // Yellow
  if (score >= 40) return '#fd7e14' // Orange
  return '#dc3545' // Red
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  return 'Needs Improvement'
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
}
