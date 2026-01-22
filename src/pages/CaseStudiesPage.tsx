import CaseStudiesTab from '../components/CaseStudiesTab'
import './CaseStudiesPage.css'

export default function CaseStudiesPage() {
  return (
    <main className="casestudies-page">
      <div className="casestudies-page-header">
        <h1>Manufacturing Case Studies</h1>
        <p>See how we've helped manufacturers in Northeast Ohio transform their operations with strategic IT solutions.</p>
      </div>
      <CaseStudiesTab />
    </main>
  )
}
