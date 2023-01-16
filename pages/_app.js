import '../styles/globals.css'

import Head from 'next/head'
import Layout from '../components/layout/layout'
import Notification from '../components/ui/notification'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
        <meta name='description' content='This is the event platform' />
        <title>Next event platform</title>
      </Head>
      <Component {...pageProps} />
      <Notification title="Test" message="This is test" status="pending" />
    </Layout>
  )
}
export default MyApp
