# Docs ui components

This is a collection of useful UI components for documentation websites.
Works best together with [@_janina/mdx](../mdx).

## Features

- Pure TypeScript, no JS bundle
- Fancy code blocks
- Sidebar with headings, etc.
- Cards
- A few icons
- [twind](https://twind.style)

## Usage

1. Install
2. Add twind dependencies
3. Set up next to transpile `@_janina/ui`
4. Configure mdx to use `@_janina/ui`
5. Initialize twind
6. Start using the components, icons and hooks


**Install**:

```bash
pnpm add @_janina/ui
```

**Set up next to transpile `@_janina/ui`**:

```js
// next.config.mjs
const nextConfig = {
  distDir: 'build',
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  swcMinify: true,
  transpilePackages: ['@_janina/ui']
}

export default withMDX(nextConfig)
```

**Add twind dependencies**:

```bash
pnpm add @twind/core @twind/preset-autoprefix @twind/preset-tailwind @twind/preset-tailwind-forms @twind/preset-typography
```


**Configure mdx to use `@_janina/ui`**:

```tsx
// pages/_app.tsx
import { components } from '@_janina/ui/components/native-replacements'

<MDXProvider components={components}>
  {/* ... */}
</MDXProvider>
```

**Initialize twind**:

```tsx
// pages/_app.tsx
import { tw } from '@twind/core'
import withNextApp from '@_janina/ui/twind/next/app'
import { config } from '@_janina/ui/twind/config'

// ...

export default withNextApp(config, MyApp)
```

**Start using the components, icons and hooks**:

```tsx
import { Card } from '@_janina/ui'
import { Info } from '@_janina/ui/icons'

<Card variant="primary" Icon={Info}>
  This is some kind of message.

  Some more text.
</Card>
```
