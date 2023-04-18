import { useMemo } from 'react'
import type { PropsWithChildren, ReactNode } from 'react'
import { tw } from '@twind/core'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { Footer } from './Footer'
import type { TocCategory } from './Sidebar'
import { slugify } from '../util/common'
import { HeadingProvider } from '../util/heading-context'

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
        const activePage = category.items.find((page) => page.href === pathname || (page.href === '/' && pathname === ''))

        if (activePage) {
          return { category: category.key, page: activePage.href }
        } else {
          return undefined
        }
      }).find(Boolean),
    [pathname, slugifiedTableOfContents]
  )

  return (
    <div className={tw('max-w-7xl mx-auto ')}>
      <Header />
      <div className={tw('flex justify-center')}>
        <HeadingProvider>
          <div className={tw('pointer-events-none flex z-20')}>
            <div className={tw('bg-white pointer-events-auto w-72 overflow-y-hidden hover:overflow-y-auto border-r border-primary-300/50 py-4 pl-6 pr-4')} style={{
              scrollbarGutter: 'stable'
            }}>
              <div className={tw('flex')}>
                {icon}
              </div>
              <Sidebar toc={slugifiedTableOfContents} activeCategoryAndPage={activeCategoryAndPage} />
            </div>
          </div>
          <div className={tw('px-6 pt-12 max-w-[832px]')}>
            {children}
            <Footer />
          </div>
          <div className={tw('w-72')}>

          </div>
        </HeadingProvider>
      </div>
    </div>
  )
}
