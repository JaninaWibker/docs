import { createContext, useContext, useState, Children } from 'react'
import type { ComponentPropsWithoutRef, PropsWithChildren, ReactNode, ReactElement, Key } from 'react'
import { tw, tx } from '@twind/core'

type PreProps = ComponentPropsWithoutRef<'pre'> &
  PropsWithChildren<{
    className?: string,
    fileName?: string
  }>

type CodeProps = ComponentPropsWithoutRef<'code'> & PropsWithChildren<{ className?: string }>

type CodeGroupProps = {
  title: string,
  children: ReactNode[]
}

const commonLanguagesPrettyNames: Record<string, string> = {
  js: 'JavaScript',
  jsx: 'JavaScript (JSX)',
  ts: 'TypeScript',
  tsx: 'TypeScript (TSX)',
  json: 'JSON',
  html: 'HTML',
  css: 'CSS',
  python: 'Python'
}

const CodeGroupContext = createContext(false)

const CodeBlockTabs = <KeyType extends Key | null | undefined = string>({
  tabs,
  selected,
  onChange
}: {
  tabs: Array<{ key: KeyType, title: string }>,
  selected: KeyType,
  onChange: (key: KeyType) => void
}) => (
  <div>
    {tabs.map(({ key, title }) => (
      <button
        className={tx('text-sm px-2 hover:text-primary-500', {
          'text-primary-400': key === selected,
          'text-white': key !== selected,
        })}
        onClick={() => onChange(key)}
        key={key}
      >
        {title}
      </button>
    ))}
  </div>
  )

const CodeBlockContainer = ({ children, titleBar }: PropsWithChildren<{ titleBar?: ReactNode }>) => (
  <div className={tw('overflow-hidden my-6 rounded-xl shadow-md not-prose')} style={{ colorScheme: 'dark' }}>
    {titleBar !== undefined ? (
      <div className={tw('px-4 py-2 rounded-t-xl border-t-2 border-l-2 border-r-2 border-dark-gray-800 bg-dark-gray-700')}>
        {titleBar}
      </div>
    ) : null}
    <div className={tx('overflow-x-auto p-4 border-2 border-dark-gray-800 bg-dark-gray-600 ', {
      'rounded-b-xl': titleBar !== undefined,
      'rounded-xl': titleBar === undefined,
    })}>
      {children}
    </div>
  </div>
)

export const CodeGroup = ({ title, children }: CodeGroupProps) => {
  const [selectedTab, setSelectedTab] = useState(0)

  const tabs = Children.map(children, (child, index) => {
    const props = (child as ReactElement<{ language: string, title?: string }>).props
    const language = props.language
    const title = props.title

    return { key: index, title: title || commonLanguagesPrettyNames[language] || language }
  }) || []

  const titleComponent = <span className={tw('text-sm font-semibold text-white')}>{title}</span>
  const tabsComponent = children.length > 1 ? (
    <CodeBlockTabs<number> tabs={tabs} selected={selectedTab} onChange={setSelectedTab} />
  ) : undefined

  return (
    <CodeGroupContext.Provider value={true}>
      <CodeBlockContainer titleBar={<div className={tw('flex justify-between items-center')}>{titleComponent}{tabsComponent}</div>}>
        {children[selectedTab]}
      </CodeBlockContainer>
    </CodeGroupContext.Provider>
  )
}

export const Pre = ({ children, className, title, ...restProps }: PreProps) => {
  const isPartOfCodeGroup = useContext(CodeGroupContext)

  const preElement = (
    <pre className={tx('text-sm font-normal leading-6', className)} {...restProps}>
      {children}
    </pre>
  )

  if (isPartOfCodeGroup) {
    return preElement
  }

  return (
    <CodeBlockContainer titleBar={title !== undefined ? <span className={tw('text-sm font-semibold text-white')}>{title}</span> : undefined}>
      {preElement}
    </CodeBlockContainer>
  )
}

export const Code = ({ children, className, ...restProps }: CodeProps) => (
  <code className={tx('', className)} {...restProps}>
    {children}
  </code>
)

type MaybeHijackedSpanProps = ComponentPropsWithoutRef<'span'> &
  PropsWithChildren<{
    highlight?: string,
    highlightColor?: string
  }>

export const Span = ({ children, className, highlight, highlightColor, ...restProps }: MaybeHijackedSpanProps) => {
  // we want to hijack the rendering of 'highlight' spans, the other ones we don't want to touch

  const isHighlight = highlight !== undefined
  const dataIsHighlight = isHighlight ? { 'data-is-highlight': true } : {}

  return (
    <span className={isHighlight ? tx('rounded px-1 py-[1.5px] border-b-[2px] [&>*]:!text-white', {
      'bg-red-500/40   border-red-500/70': highlightColor === 'red' || highlightColor === undefined,
      'bg-green-500/40 border-green-500/70': highlightColor === 'green',
      'bg-blue-500/40  border-blue-500/70': highlightColor === 'blue',

    }) : className} {...dataIsHighlight} {...restProps}>{children}</span>
  )
}
