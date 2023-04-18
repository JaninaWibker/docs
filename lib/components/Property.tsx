import type { PropsWithChildren } from 'react'
import { tw } from '@twind/core'

export const Property = ({ name, type, children }: PropsWithChildren<{ name: string, type: string }>) => (
  <li className={tw('py-4 first:pt-0 last:pb-0')}>
    <dl className={tw('flex flex-wrap items-center gap-x-4 gap-y-2')}>
      <dd className={tw('not-prose h-6 leading-[initial] text-gray-600')}>
        <code className={tw('px-1.5 py-1 text-xs leading-[inherit] rounded-lg bg-gray-50 border border-gray-300')}>
          {name}
        </code>
      </dd>
      <dd className={tw('font-mono text-xs text-gray-500')}>
        {type}
      </dd>
      <dd className={tw('w-full flex-none [&>:first-child]:mt-0 [&>:last-child]:mb-0')}>
        {children}
      </dd>
    </dl>
  </li>
)
