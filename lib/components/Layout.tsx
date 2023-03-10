import { useMemo } from 'react'
import type { PropsWithChildren, ReactNode } from 'react'
import { tw } from '@twind/core'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Footer } from './Footer'
import type { TocCategory } from './Sidebar'
import { slugify } from '../util/common'

/**
 * User facing type for table of contents.
 */
export type TocCategories = Omit<TocCategory, 'key'>[]

export type LayoutProps = PropsWithChildren<{
  icon: ReactNode,
  toc: Omit<TocCategory, 'key'>[],
  /**
   * options per page
   */
  options: Partial<{
    pagination: boolean,
    title: string // TODO: what is title used for?
  }>,
  /**
   * pathname used to determine which page is currently active
   */
  pathname: string
}>

export const Layout = ({ children, icon, toc, options = { pagination: true }, pathname }: LayoutProps) => {
  console.log(options)

  const slugifiedTableOfContents = useMemo(() => toc.map((category) => ({
    ...category,
    key: slugify(category.title),
  })), [toc])

  const activeCategoryAndPage = useMemo(
    () =>
      slugifiedTableOfContents.map((category) => {
        const activePage = category.items.find((page) => page.href === pathname)

        if (activePage) {
          return { category: category.key, page: activePage.href }
        } else {
          return undefined
        }
      }).find(Boolean),
    [pathname, slugifiedTableOfContents]
  )

  return (
    <div className={tw('')}>
      <header className={tw('pointer-events-none fixed inset-0 flex z-20')}>
        <div className={tw('bg-white pointer-events-auto w-72 overflow-y-hidden hover:overflow-y-auto border-r border-primary-300/50 py-4 pl-6 pr-4')} style={{
          scrollbarGutter: 'stable'
        }}>
          <div className={tw('flex')}>
            {icon}
          </div>
          <Header />
          <Sidebar toc={slugifiedTableOfContents} activeCategoryAndPage={activeCategoryAndPage} />
        </div>
      </header>
      <div className={tw('ml-72 relative px-6 pt-12')}>
        <div className={tw('w-full')}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  )
}
