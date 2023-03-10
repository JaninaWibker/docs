import { mdxAnnotations } from 'mdx-annotations'
import { rehypeParseCodeBlocks } from './parse-code-blocks'
import { rehypeShiki } from './shiki'
import { rehypeHighlight } from './highlight'

const rehypeMdxAnnotations = mdxAnnotations.rehype

export {
  rehypeMdxAnnotations,
  rehypeParseCodeBlocks,
  rehypeShiki,
  rehypeHighlight,
}
