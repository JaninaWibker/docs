import React from 'react'
import { tw, tx } from '@twind/core'
import Link from 'next/link'
import { Octocat } from '../icons'

type HeaderProps = {
  left?: React.ReactNode[],
  right?: React.ReactNode[]
}

export const HeaderLink = ({ title, to, active, isExternal = false }: { title: string, to: string, active: boolean, isExternal?: boolean }) => {
  return (
    <div className={tx('text-sm', {
      'font-semibold text-black': active,
      'text-gray-500': !active,
    })}>
      {isExternal ? <a href={to}>{title}</a> : <Link href={to}>{title}</Link>}
    </div>
  )
}

export const HeaderGithubLink = ({ url, icon }: { url: string, icon?: React.ReactNode }) => {
  return (
    <div className={tw('')}>
      <a href={url}>
        {icon ?? <Octocat />}
      </a>
    </div>
  )
}

export const HeaderDivider = () => <div className={tw('mx-2 w-[1px] h-6 bg-primary-300/50')}></div>

export const Header = ({ left = [], right = [] }: HeaderProps) => {
  return (
    <div className={tw('h-full flex justify-between gap-8 bg-white backdrop-blur supports-backdrop-blur:bg-white/70')}>
      <div className={tw('flex items-center gap-4')}>{left}</div>
      <div className={tw('flex items-center gap-4')}>{right}</div>
    </div>
  )
}
