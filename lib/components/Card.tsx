import type { PropsWithChildren } from 'react'
import type { IconComponent } from '../icons'
import Link from 'next/link'
import { tw, tx, css } from '@twind/core'

export type CardProps = PropsWithChildren<{
  /**
   * The title of the card, use the children prop for the description
   */
  title: string,
  /**
   * Where to navigate to when the card is clicked
   */
  link: string,
  /**
   * Icon to display on the left side of the card
   */
  Icon?: IconComponent
}>


export const Cards = ({ children }: PropsWithChildren) => {
  return (
    <div className={tw('grid grid-cols-2 gap-x-4')}>
      {children}
    </div>
  )
}


export const Card = ({ link, title, children, Icon }: CardProps) => {
  return (
    <Link href={link} className={tw('block group border-1 rounded-xl border-primary-300/50 hover:border-primary-500 hover:bg-primary-100/30')}>
      <div className={tw('transition-all duration-300 px-4 pt-12 pb-4')}>
        {Icon ? (
          <div className={tw('w-fit h-fit transition-colors rounded-full bg-primary-100/30 border border-primary-300 group-hover:bg-white group-hover:border-primary-500')}>
            <Icon className={tw('w-10 h-10 p-2 text-primary-600 group-hover:text-primary-700')} />
          </div>
        ) : null}
        <h3 className={tw('mt-4 mb-2 text-lg font-space font-bold leading-7')}>{title}</h3>
        <span className={tw('mt-1 text-sm text-slate-600')}>{children}</span>
      </div>
    </Link>
  )
}
