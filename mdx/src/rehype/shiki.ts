import { visit } from 'unist-util-visit'
import { match, P } from 'ts-pattern'
import shiki from 'shiki'
import type { Theme, Highlighter } from 'shiki'
import { codeToHast } from 'shiki-renderer-hast'
import type { Root, Node } from 'hast'

let highlighterPromise: Promise<Highlighter> | undefined

type PreElementNode = Node & {
  type: 'element',
  tagName: 'pre',
  properties: {
    className?: string[],
    language?: string,
    code?: string
  },
  children: Node[]
}

type TextNode = Node & {
  type: 'text',
  value: string
}

/**
 * This is a rehype plugin that uses shiki to highlight code blocks.
 *
 * For this to work the language must be attached to the parent pre element.
 * This is done by the `rehypeParseCodeBlocks` plugin (thus it needs to come before `rehypeShiki`).
 */
export const rehypeShiki = (theme: Theme[number] = 'css-variables') => {
  return async (tree: Root) => {
    if (highlighterPromise === undefined) {
      highlighterPromise = shiki.getHighlighter({ theme })
    }

    const highlighter = await highlighterPromise

    visit(tree, 'element', (node) => {
      const maybeTextNode = match(node)
        .with({ tagName: 'pre', children: P.array({ tagName: 'code', children: P.select() }) }, ([[textNode]]) => textNode)
        .otherwise(() => undefined)

      if (!maybeTextNode) return

      // using pattern matching we know that node is of type PreElementNode
      const preNode = node as PreElementNode

      // we also assume that maybeTextNode is of type TextNode
      // this is a reasonable assumption
      const textNode = maybeTextNode as TextNode

      preNode.properties.code = textNode.value

      if (preNode.properties.language) {
        const alternativeNode = codeToHast(highlighter, textNode.value, preNode.properties.language, theme)

        node.children[0] = alternativeNode.children[0]
      }
    })
  }
}
