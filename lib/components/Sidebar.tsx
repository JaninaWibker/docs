import { tw, tx } from '@twind/core'

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
      <a className={tw('no-underline text-sm font-semibold text-slate-700')} href={item.href}>
        {item.title}
      </a>
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
    <li className={tw('py-1')}>
      <a className={tx('block pl-2 text-sm', {
        'text-slate-600': !active,
        'text-slate-900': active
      })} href={item.href} data-state-active={active}>{item.title}</a>
      <ul className={tw('')}>
        {headings.map((heading) => (
          <li key={heading.title}>
            <a href={`${item.href}#${heading.hash}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    </li>
  )
}

const NavigationCategory = ({ category, isCategoryActive, activePage }: { category: TocCategory, isCategoryActive: boolean, activePage: TocItem['href'] | undefined }) => {
  if (isCategoryActive) console.log(category.key, activePage)
  return (
    <li className={tw('mb-6')}>
      {category.href
        ? <a className={tw('no-underline text-sm font-semibold text-slate-700')} href={category.href}>{category.title}</a>
        : <span className={tw('text-sm font-semibold')}>{category.title}</span>
      }
      <div className={tw('relative pl-1')}>
        <ul className={tw('pl-2 pt-2')}>
        {category.items.map((item) => ( // TODO: where do we get headings, headingsInView and active from?
          <NavigationItem key={item.title} item={item} active={item.href === activePage} headings={[]} headingsInView={[]} />
        ))}
      </ul>
        <div className={tw('absolute top-0 mt-2 h-[calc(100%-2*4px)] w-px bg-primary-300/50')}></div>
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
