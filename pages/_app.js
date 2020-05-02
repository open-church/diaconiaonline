import React from 'react'

import BootstrapProvider from '@bootstrap-styled/provider'
import nextCookies from 'next-cookies'
import App from 'next/app'
import Head from 'next/head'

import { SessionProvider } from '../components/state/session'
import { GlobalStyle } from '../styles/globalStyle'
import { colors } from '../utils/variables'

class MyApp extends App {
  static async getInitialProps ({ Component, ctx }) {
    const credentials = nextCookies(ctx).DO_CREDENTIALS || {}
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return { pageProps, credentials, query: ctx.query }
  }

  render () {
    const { Component, credentials, query, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Diaconia.online</title>
        </Head>
        <BootstrapProvider theme={{
          '$btn-primary-bg': `${colors.blueZodiac}`,
          '$btn-primary-color': `${colors.white}`,
          '$btn-primary-border': `${colors.white}`,
          '$btn-secondary-bg': `${colors.white}`,
          '$btn-secondary-color': `${colors.blueZodiac}`,
          '$btn-secondary-border': `${colors.blueZodiac}`,
          '$btn-info-color': `${colors.white}`,
          '$btn-info-bg': `${colors.burningOrange}`,
          '$btn-info-border': `${colors.burningOrange}`,
          '$btn-danger-color': `${colors.burningOrange}`,
          '$btn-danger-bg': `${colors.white}`,
          '$btn-danger-border': `${colors.burningOrange}`
        }}>
          <GlobalStyle />
          <SessionProvider>
            <Component credentials={credentials} query={query} {...pageProps} />
          </SessionProvider>
        </BootstrapProvider>
      </>
    )
  }
}

export default MyApp
