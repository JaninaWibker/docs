import type { PropsWithChildren, ReactNode } from 'react'
import type { IconComponent } from '../icons'
import { tw, tx } from '@twind/core'

export type CardProps = PropsWithChildren<{
  /**
   * determines the color of the card
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'secondary' | 'positive' | 'negative' | 'info',
  /**
   * Icon to display on the left side of the card
   */
  Icon?: IconComponent
}>

export const Card = ({ children, variant = 'default', Icon }: CardProps) => {
  return (
    <div className={tx('my-4 py-4 px-2 rounded-xl border flex', {
      'bg-gray-100/50      text-gray-800      border-gray-300     ': variant === 'default',
      'bg-primary-100/50   text-primary-900   border-primary-300  ': variant === 'primary',
      'bg-secondary-100/50 text-secondary-900 border-secondary-300': variant === 'secondary',
      'bg-positive-200/50  text-positive-800  border-positive-300 ': variant === 'positive',
      'bg-negative-200/50  text-negative-800  border-negative-300 ': variant === 'negative',
      'bg-info-200/50      text-info-200      border-info-300     ': variant === 'info',
    })}>
      {Icon ? (
        <div className={tx('mx-2 w-5 h-5 rounded-full', {
          'bg-gray-300': variant === 'default',
          'bg-primary-300': variant === 'primary',
          'bg-secondary-300': variant === 'secondary',
          'bg-positive-300': variant === 'positive',
          'bg-negative-300': variant === 'negative',
          'bg-info-300': variant === 'info'
        })}>
          <Icon className={tw('w-5 h-5 p-1 text-white')} />
        </div>
      ) : null}
      <div className={tw('mx-2 [&>:first-child]:mt-0 [&>:last-child]:mb-0')}>{children}</div>
    </div>
  )
}
