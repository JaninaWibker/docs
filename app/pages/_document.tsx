import Document, { Html, Head, Main, NextScript } from 'next/document'
import withNextDocument from '@jannnik/ui/twind/next/document'
import { config } from '@jannnik/ui/twind/config'

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
