import { createContext, useContext, useState } from 'react'
import type { PropsWithChildren, Dispatch, SetStateAction } from 'react'

// mapping from id to TODO
type HeadingsOnPage = Record<string, {
  id: string,
  title: string,
  index: number // TODO: what is this used for?
}>

type TODO = any

const slugs = new WeakMap()

const pageHeadingsContext = createContext<HeadingsOnPage>({})
const updatePageHeadingsContext = createContext<Dispatch<SetStateAction<HeadingsOnPage>>>((v) => v)
const slugsContext = createContext<WeakMap<HTMLAnchorElement, TODO>>(slugs)

export const usePageHeadings = () => useContext(pageHeadingsContext)
export const useUpdatePageHeadings = () => useContext(updatePageHeadingsContext)
export const useSlugs = () => useContext(slugsContext)

export const HeadingProvider = ({ children }: PropsWithChildren) => {
  const [headingsOnPage, setHeadingsOnPage] = useState<HeadingsOnPage>({})
  console.log('did this re-run?', headingsOnPage)
  return (
    <pageHeadingsContext.Provider value={headingsOnPage}>
      <updatePageHeadingsContext.Provider value={setHeadingsOnPage}>
        <slugsContext.Provider value={slugs}>
          {children}
        </slugsContext.Provider>
      </updatePageHeadingsContext.Provider>
    </pageHeadingsContext.Provider>
  )
}
