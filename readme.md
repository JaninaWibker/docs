# Docs

This is ment as a tool for quickly building a documentation site for your project.

This project is made up of 3 parts:
- [`app/`](/app): This is the boilerplate code you'll likely copy or recreate for your project. This is where you put your mdx files
- [`lib/`](/lib): Library with react components and a lot of utilities which can be used by `app/`
- [`mdx/`](/mdx): MDX plugins used by `app/`, mostly related to syntax highlighting

Both `lib/` and `mdx/` can be installed using npm, pnpm or yarn, you'll therefore not need the pnpm monorepo structure this repo has.

For development however this monorepo structure is benefitial to quickly iterate on features spanning multiple packages.

## Similar projects

- [nextra](https://nextra.site/)
- [mintlify](https://mintlify.com/docs/quickstart)
- [protocol](https://protocol.tailwindui.com)
- [docsify](https://docsify.js.org/)
