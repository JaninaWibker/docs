import { forwardRef, useEffect, useRef } from 'react'
import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react'
import Link from 'next/link'
import { tw, tx } from '@twind/core'
import { slugify, stringifyReactNode } from '../../util/common'
import { Link as LinkIcon } from '../../icons'
import { useSlugs, useUpdatePageHeadings } from '../../util/heading-context'

type Levels = 1 | 2 | 3 | 4 | 5 | 6

type HeadingProps<Level extends Levels> = ComponentPropsWithoutRef<`h${Level}`> & PropsWithChildren<{
  className?: string,
  level: Levels,
  id?: string,
  hasLink?: boolean
}>

type NativeHeadingProps<Level extends Levels> = Omit<HeadingProps<Level>, 'level' | 'hasLink'>

type AnchorProps = PropsWithChildren<{
  id: string
}>

const Anchor = forwardRef<HTMLAnchorElement | null, AnchorProps>(function Anchor({ id, children }, ref) {
  return (
    <Link ref={ref} href={`#${id}`} className={tw('group no-underline relative')}>
      <div className={tw('absolute mt-[1.5px] -ml-[34.5px] h-full opacity-0 group-hover:opacity-100 transition flex flex-col justify-center z-30')}>
        <div className={tw('w-5 h-5 mr-[14px] bg-white rounded-lg ring-1 ring-inset ring-primary-300 hover:ring-primary-400')}>
          <LinkIcon className={tw('w-5 h-5 p-1 stroke-primary-500')} />
        </div>
      </div>
      {children}
    </Link>
  )
})

const headingStyles = {
  // no margin top because a h1 is likely the first element on the page
  h1: 'font-space text-4xl font-bold mt-0 mb-4',
  h2: 'font-sans text-2xl font-bold mt-8 mb-2',
  h3: 'font-sans text-xl font-bold mt-8 mb-2',
  h4: 'font-sans text-lg font-semibold mt-4 mb-1',
  h5: 'font-sans text-lg font-medium mt-4 mb-1',
  h6: 'font-sans text-lg font-normal mt-4 mb-1'
}

export const Heading = <Level extends Levels>({
  children,
  className,
  level,
  title = stringifyReactNode(children),
  id = slugify(title),
  hasLink = false,
  ...rest
}: HeadingProps<Level>) => {
  const Component = `h${level}` as const

  const headingAnchorRef = useRef<HTMLAnchorElement | null>(null)
  const setPageHeadings = useUpdatePageHeadings()
  const slugs = useSlugs()

  useEffect(() => {
    if (!hasLink) return
    if (!headingAnchorRef.current) return

    const heading = headingAnchorRef.current
    slugs.set(heading, [id, { placeholder: 1 /* TODO */ }])
    setPageHeadings((headings) => ({ ...headings, [id]: { id, title, index: 0 /* TODO */ } }))
    return () => {
      slugs.delete(heading)
      setPageHeadings((headings) => {
        const newHeadings = { ...headings }
        delete newHeadings[id]
        return newHeadings
      })
    }
  }, [id, title, hasLink, headingAnchorRef, slugs, setPageHeadings])

  return (
    <Component className={tx(headingStyles[Component], className)} id={id} {...rest}>
      {hasLink ? <Anchor id={id} ref={headingAnchorRef}>{children}</Anchor> : children}
    </Component>
  )
}

export const H1 = ({ children, ...rest }: NativeHeadingProps<1>) => (
  <Heading level={1} hasLink={false} {...rest}>
    {children}
  </Heading>
)

export const H2 = ({ children, ...rest }: NativeHeadingProps<2>) => (
  <Heading level={2} hasLink={true} {...rest}>
    {children}
  </Heading>
)

export const H3 = ({ children, ...rest }: NativeHeadingProps<3>) => (
  <Heading level={3} hasLink={false} {...rest}>
    {children}
  </Heading>
)

export const H4 = ({ children, ...rest }: NativeHeadingProps<3>) => (
  <Heading level={4} hasLink={false} {...rest}>
    {children}
  </Heading>
)

export const H5 = ({ children, ...rest }: NativeHeadingProps<3>) => (
  <Heading level={5} hasLink={false} {...rest}>
    {children}
  </Heading>
)

export const H6 = ({ children, ...rest }: NativeHeadingProps<3>) => (
  <Heading level={6} hasLink={false} {...rest}>
    {children}
  </Heading>
)
