import CaseStudiesTab from '../components/CaseStudiesTab'
import './CaseStudiesPage.css'

export default function CaseStudiesPage() {
  return (
    <main className="casestudies-page">
      <div className="casestudies-page-header">
        <h1>Case Studies & Testimonials</h1>
        <p>Learn how we've helped manufacturers succeed</p>
      </div>
      <CaseStudiesTab />
    </main>
  )
}
