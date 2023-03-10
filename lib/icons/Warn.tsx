import React, { forwardRef } from 'react'
import type { SVGProps } from 'react'

export default forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(function Warn(props, ref) {
  return (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" ref={ref} {...props}>
      <line x1="12" y1="3" x2="12" y2="13"></line>
      <line x1="12" y1="21" x2="12.01" y2="21"></line>
    </svg>
  )
})
