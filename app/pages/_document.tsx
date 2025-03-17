import Document, { Html, Head, Main, NextScript } from 'next/document'
import withNextDocument from '@_janina/ui/twind/next/document'
import { config } from '@_janina/ui/twind/config'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* add favicon, opengraph, etc. here */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default withNextDocument(config, MyDocument)
