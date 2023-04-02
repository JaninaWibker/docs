import React, { forwardRef } from 'react'
import type { SVGProps } from 'react'

export default forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(function Contact(props, ref) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" ref={ref} {...props}>
      <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2"></path>
      <rect x="3" y="4" width="18" height="18" rx="2"></rect>
      <circle cx="12" cy="10" r="2"></circle>
      <line x1="8" y1="2" x2="8" y2="4"></line>
      <line x1="16" y1="2" x2="16" y2="4"></line>
    </svg>
  )
})
