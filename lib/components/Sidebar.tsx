import { tw, tx } from '@twind/core'
import Link from 'next/link'
import { usePageHeadings } from '../util/heading-context'

export type TocTopLevelItem = {
  title: string,
  href: string
}

// TODO: collapsible categories?, default collapsed, etc.?
export type TocCategory = {
  /**
   * This is derived from the title by slugifying it.
   * It must be unique, therefore titles must be unique (even under slugification) as well!
   */
  key: string,
  /**
   * The title of the category, e.g. "Components".
   */
  title: string,
  /**
   * A category might have an overview page itself, if so, it should be linked here.
   * If not, there will be no link to the category.
   */
  href?: string,
  items: TocItem[]
}

export type TocItem = {
  title: string,
  href: string,
  /**
   * If true, the pages headings will not be shown as sub-items in the sidebar.
   * It will look like there are none.
   * @default false
   */
  disableHeadings?: boolean
}

export type TocHeading = {
  title: string,
  hash: string
}

const NavigationItemTopLevel = ({ item, isCategoryActive }: { item: TocTopLevelItem, isCategoryActive: boolean }) => {
  return (
    <li className={tw('')}>
      <Link className={tw('no-underline text-sm font-semibold text-slate-700')} href={item.href}>
        {item.title}
      </Link>
    </li>
  )
}

type NavigationItemProps = {
  item: TocItem,
  active: boolean,
  headings: TocHeading[],
  headingsInView: TocHeading['hash'][]
}

const NavigationItem = ({ item, active, headings, headingsInView }: NavigationItemProps) => {
  return (
    <li className={tw('relative')}>
      {active ? (
        <div className={tw('absolute -left-2 w-[1px] bg-primary-600 h-full')}></div>
      ) : null}
      <Link className={tx('block py-1.5 pl-2 text-sm', {
        'text-slate-500': !active,
        'text-slate-9000': active
      })} href={item.href} data-state-active={active}>
        {item.title}
      </Link>
      <ul className={tw('')}>
        {headings.map((heading) => (
          <li key={heading.title}>
            <Link className={tw('block text-sm py-1 pl-6 pr-2 text-slate-500')} href={`#${heading.hash}`}>{heading.title}</Link>
          </li>
        ))}
      </ul>
    </li>
  )
}

const NavigationCategory = ({ category, isCategoryActive, activePage }: { category: TocCategory, isCategoryActive: boolean, activePage: TocItem['href'] | undefined }) => {
  if (isCategoryActive) console.log(category.key, activePage)

  const pageHeadings = usePageHeadings()
  const actualPageHeadings = Object.values(pageHeadings).map(({ id, title }) => ({
    hash: id,
    title,
  }))
  console.log(actualPageHeadings)

  return (
    <li className={tw('mb-6')}>
      {category.href
        ? <Link className={tw('no-underline text-sm font-semibold text-slate-700')} href={category.href}>{category.title}</Link>
        : <span className={tw('text-sm font-semibold')}>{category.title}</span>
      }
      <div className={tw('relative pl-1')}>
        <ul className={tw('pl-2 pt-2')}>
        {category.items.map((item) => ( // TODO: where do we get headingsInView from?
          <NavigationItem key={item.title} item={item} active={item.href === activePage} headings={item.href === activePage ? actualPageHeadings : []} headingsInView={[]} />
        ))}
      </ul>
        <div className={tw('absolute top-0 mt-2 h-[calc(100%-2*4px)] w-px bg-primary-300/30')}></div>
      </div>
    </li>
  )
}

type SidebarProps = {
  toc: TocCategory[],
  activeCategoryAndPage: {
    category: TocCategory['key'],
    page: TocItem['href']
  } | undefined
}

export const Sidebar = ({ toc, activeCategoryAndPage }: SidebarProps) => {
  return (
    <div>
      <ul>
        {toc.map((category) => {
          const isActive = activeCategoryAndPage !== undefined && activeCategoryAndPage.category === category.key
          const activePage = isActive ? activeCategoryAndPage.page : undefined

          return category.items.length === 0 && category.href !== undefined ?
            <NavigationItemTopLevel key={category.title} item={category as TocTopLevelItem} isCategoryActive={isActive} /> :
            <NavigationCategory key={category.title} category={category} isCategoryActive={isActive} activePage={activePage} />
        })}
      </ul>
    </div>
  )
}
