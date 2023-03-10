import recmaNextjsStaticProps from 'recma-nextjs-static-props'

const configuredStaticProps = () => recmaNextjsStaticProps({
  include: ['options']
})

export {
  configuredStaticProps
}
