import { match, P } from 'ts-pattern'
import { visit } from 'unist-util-visit'
import type { Root } from 'hast'

/**
 * This is a rehype plugin which extracts the language from the className
 * of the code block and attaches it to the parent pre element.
 *
 * While doing so the `language-` prefix is removed.
 */
export const rehypeParseCodeBlocks = () => {
  return (tree: Root) => {
    visit(tree, 'element', (node, _nodeIndex, parentNode) => {
      const maybeClassNames = match(node)
        .with(
          {
            tagName: 'code',
            properties: {
              className: P.select(P.array(P.string))
            }
          },
          (classNames) => classNames.find((className) => className.startsWith('language-'))
        )
        .otherwise(() => undefined)

      const maybeParent = match(parentNode)
        .with({ tagName: 'pre', properties: {} }, (parentNode) => parentNode)
        .otherwise(() => undefined)

      if (maybeClassNames && maybeParent) {
        const className = maybeClassNames
        const parent = maybeParent

        parent.properties.language = className.replace(/^language-/, '')
      }
    })
  }
}
