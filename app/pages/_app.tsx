import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import { Inter, Space_Grotesk as SpaceGrotesk } from '@next/font/google'
import { tw } from '@twind/core'
import withNextApp from '@_janina/ui/twind/next/app'
import { config } from '@_janina/ui/twind/config'
import type { TocCategories } from '@_janina/ui/components/Layout'
import { Layout } from '@_janina/ui/components/Layout'
import { components } from '@_janina/ui/components/native-replacements'
import { Header, HeaderDivider, HeaderGithubLink, HeaderLink } from '@_janina/ui/components/Header'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const spaceGrotesk = SpaceGrotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk'
})

const tableOfContents: TocCategories = [
  {
    title: 'Introduction',
    items: [
      { href: '/', title: 'Introduction' },
      { href: '/design-system', title: 'Design System' }
    ]
  },
  {
    title: 'Components',
    items: [
      { href: '/callouts', title: 'Callouts' },
      { href: '/code-blocks', title: 'Code blocks' },
      { href: '/headings', title: 'Headings' },
    ],
  }
]

const CustomizedHeader = ({ pathname }: { pathname: string }) => {
  const links = [
    { key: 'link-documentation', title: 'Documentation', to: '/' },
    { key: 'link-about', title: 'About', to: '/about' }
  ]

  const activePage = links.find((link) => link.to === pathname) || links[0]

  return (
    <Header left={[

    ]} right={[
      ...links.map((link) => (
        <HeaderLink key={link.key} title={link.title} to={link.to} active={link === activePage} />
      )),
      <HeaderDivider key="divider-1" />,
      <HeaderGithubLink key="github-link-1" url="https://github.com/JaninaWibker/docs" />
    ]} />
  )
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const maybeTitle = pageProps.options !== undefined ? pageProps.options.title : undefined

  return (
    <>
      <Head>
        <title>{router.pathname === '/' ? 'Docs' : `${maybeTitle || router.pathname.substring(1)} | Docs`}</title>
        <style>{`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-space: ${spaceGrotesk.style.fontFamily};
          }
        `}</style>
      </Head>
      <div className={tw('font-sans')}>
        <MDXProvider components={components}>
          <Layout header={<CustomizedHeader pathname={router.pathname} />} toc={tableOfContents} options={pageProps.options || {}} pathname={router.pathname}>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </div>
    </>
  )
}

export default withNextApp(config, MyApp)
