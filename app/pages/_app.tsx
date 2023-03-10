import Head from 'next/head'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import { Inter, Space_Grotesk as SpaceGrotesk } from '@next/font/google'
import { tw } from '@jannnik/ui/twind/index'
import withNextApp from '@jannnik/ui/twind/next/app'
import { config } from '@jannnik/ui/twind/config'
import type { TocCategories } from '@jannnik/ui/components/Layout'
import { Layout } from '@jannnik/ui/components/Layout'
import { components } from '@jannnik/ui/components/native-replacements'

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
    title: 'Some title',
    items: [
      { href: '/', title: 'Index page' },
    ]
  }
]

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // TODO: pageProps.title is undefined most of the time, will have to find another way to get the title of the page
  return (
    <>
      <Head>
        <title>{router.pathname === '/' ? 'Docs' : `${pageProps.title} | Docs`}</title>
        <style>{`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-space: ${spaceGrotesk.style.fontFamily};
          }
        `}</style>
      </Head>
      <div className={tw('font-sans')}>
        <MDXProvider components={components}>
          <Layout icon={<span>LOGO</span>} toc={tableOfContents} options={pageProps.options || {}} pathname={router.pathname}>
            <Component {...pageProps} />
          </Layout>
        </MDXProvider>
      </div>
    </>
  )
}

export default withNextApp(config, MyApp)
