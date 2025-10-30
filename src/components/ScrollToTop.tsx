// src/components/common/ScrollToTop.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Reset 'React Router + browser history'
//	•	When you navigate back to a page that’s already mounted (cached), 
//    the browser restores your previous scroll position by default (this is normal for SPAs).
//	•	That’s why your page opens at “30% down” — the browser remembers where you scrolled.
//  • If you want every navigation to start at the top of the page, 
//    you need to manually reset the scroll position when the route changes.
//  • Create a component that listens to location changes and calls window.scrollTo(0, 0):
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}