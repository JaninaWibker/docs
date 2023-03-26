import recmaNextjsStaticProps from 'recma-nextjs-static-props'
import type { Plugin } from 'unified'
import type { Program } from 'estree'

const recmaNextjsStaticPropsProperlyTyped = recmaNextjsStaticProps as Plugin<[RecmaNextjsStaticPropsOptions?], Program>

type RecmaNextjsStaticPropsOptions = {
  /**
   * The name of the export to generate.
   */
  name?: string | undefined,
  /**
   * A list to filter identifiers to include in the generated function.
   *
   * This list may include strings which must be matched exactly, a regular expression to test
   * against, or a function that will be called with the value to test, and must return a boolean. By
   * default everything will be included.
   */
  include?: string[] | undefined,
  /**
   * The same as `include`, but matching values will be excluded instead.
   */
  exclude?: string[] | undefined
}

const configuredStaticProps = () => recmaNextjsStaticPropsProperlyTyped({
  include: ['options']
})

export {
  configuredStaticProps
}
