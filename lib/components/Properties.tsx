import type { PropsWithChildren } from 'react'
import { tw } from '@twind/core'

export const Properties = ({ children }: PropsWithChildren) => (
  <div className={tw('not-prose py-6')}>
    <ul className={tw('m-0 list-none divide-y divide-gray-500/10 p-0')}>
      {children}
    </ul>
  </div>
)
