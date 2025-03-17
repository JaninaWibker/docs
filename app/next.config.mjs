import nextMDX from '@next/mdx'
// these need to be mjs files for now, as importing .ts files here obviously doesn't work
// and there currently is no transpilation step
import { rehypeParseCodeBlocks, rehypeShiki, rehypeHighlight, rehypeMdxAnnotations, recmaNextjsStaticProps, recmaMdxAnnotations, remarkMdxAnnotations } from '@_janina/mdx'

// good themes: poimandres, nord, rose-pine, rose-pine-moon
const withMDX = nextMDX({
  options: {
    remarkPlugins: [remarkMdxAnnotations],
    rehypePlugins: [rehypeMdxAnnotations, rehypeParseCodeBlocks, () => rehypeShiki('rose-pine-moon'), rehypeHighlight],
    recmaPlugins: [recmaMdxAnnotations, recmaNextjsStaticProps],
    providerImportSource: '@mdx-js/react'
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  swcMinify: true,
  transpilePackages: ['@_janina/ui']
}

export default withMDX(nextConfig)
