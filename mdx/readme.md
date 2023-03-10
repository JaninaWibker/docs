# MDX plugins

This is a collection of MDX plugins which make writing documentation a bit easier.

## Features

- Syntax highlighting (using [shiki](https://shiki.matsu.io/))
- Annotate and highlight certain sections of code
- Add custom props to mdx elements (using [mdx-annotations](https://www.npmjs.com/package/mdx-annotations))

## Usage

1. Install
2. Add plugins to your `next.config.js` file

```bash
pnpm add @jannnik/mdx
```

```js
const withMDX = nextMDX({
  options: {
    remarkPlugins: [remarkMdxAnnotations],
    rehypePlugins: [rehypeMdxAnnotations, rehypeParseCodeBlocks, rehypeShiki, rehypeHighlight],
    recmaPlugins: [recmaMdxAnnotations, recmaNextjsStaticProps],
    providerImportSource: '@mdx-js/react'
  }
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...
}

export default withMDX(nextConfig)
```
