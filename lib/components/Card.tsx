import type { MouseEvent, PropsWithChildren } from 'react'
import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import type { IconComponent } from '../icons'
import Link from 'next/link'
import { tw, tx, css } from '@twind/core'

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

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
  Icon?: IconComponent,
  /**
   * The variant of the card
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'positive' | 'negative' | 'info'
}>

const cardsStyle = css`
  &.cards:hover .card {
    background: radial-gradient(
      100rem circle at var(--x-pos) var(--y-pos),
      var(--variant-radial-gradient-start) 0,
      var(--variant-radial-gradient-end) 20%
    );
  }
`

export const Cards = ({ children }: PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null)
  const [cards, setCards] = useState<HTMLElement[]>([])

  useIsomorphicLayoutEffect(() => {
    if (ref.current) {
      setCards(Array.from<HTMLElement>(ref.current.querySelectorAll('.card')))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- ref.current.querySelectorAll implicitely depends on children
  }, [ref, children])

  const onMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    cards.forEach((card) => {
      const { left, top } = card.getBoundingClientRect()
      card.style.setProperty('--x-pos', `${event.clientX - left}px`)
      card.style.setProperty('--y-pos', `${event.clientY - top}px`)
    })
  }

  return (
    <div className={'cards ' + tx(cardsStyle, 'py-6 grid grid-cols-2 gap-4')} onMouseMove={onMouseMove} ref={ref}>
      {children}
    </div>
  )
}

const cardStyle = (variant: 'primary' | 'secondary' | 'positive' | 'negative' | 'info' = 'primary') => css`
  &.card {
    --variant-radial-gradient-start: theme(colors.${variant}.400 / 100%);
    --variant-radial-gradient-end: theme(colors.${variant}.300 / 50%);
  }

  &.card:hover::before {
    opacity: 1;
  }

  &.card::before {
    content: '';
    display: block;
    @apply w-full h-full absolute top-0 left-0;
    opacity: 0;
    border-radius: inherit;
    background: radial-gradient(
      70rem circle at var(--x-pos) var(--y-pos),
      theme(colors.${variant}.300 / 20%),
      transparent 25%
    );
    transition: all 0.15s ease-in-out;
  }
`

export const Card = ({ link, title, children, Icon, variant = 'primary' }: CardProps) => {
  return (
    <Link href={link} className={`card ` + tx(cardStyle(variant), `block group relative flex justify-center items-center rounded-xl bg-${variant}-300/50 ring-${variant}-300/50`)}>
      <div className={tw('transition-all duration-300 px-4 pt-12 pb-4 bg-white rounded-xl')} style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}>
        {Icon ? (
          <div className={tw(`z-[1] w-fit h-fit transition-colors rounded-full bg-${variant}-100/30 ring-1 ring-${variant}-300 group-hover:bg-white group-hover:ring-${variant}-500`)}>
            <Icon className={tw(`w-10 h-10 p-2 text-${variant}-600 group-hover:text-${variant}-700`)} />
          </div>
        ) : null}
        <h3 className={tw('mt-4 mb-2 text-lg font-space font-bold leading-7')}>{title}</h3>
        <span className={tw('mt-1 text-sm text-slate-600')}>{children}</span>
      </div>
    </Link>
  )
}
