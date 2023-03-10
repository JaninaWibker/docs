import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import { tx } from '@twind/core'

type ParagraphProps = ComponentPropsWithoutRef<'p'> & PropsWithChildren<{
  className?: string
}>

export const Paragraph = ({ children, className, ...rest }: ParagraphProps) => (
  <p className={tx('mb-2', className)} {...rest}>{children}</p>
)
