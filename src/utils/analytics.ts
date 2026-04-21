type AnalyticsValue = string | number | boolean | null | undefined

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

function cleanParams(params: Record<string, AnalyticsValue>) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined)
  )
}

export function trackEvent(eventName: string, params: Record<string, AnalyticsValue> = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', eventName, cleanParams(params))
}

export function trackPageView(pagePath: string, pageTitle: string) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  })
}
