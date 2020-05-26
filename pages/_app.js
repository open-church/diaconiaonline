import React from 'react'

import BootstrapProvider from '@bootstrap-styled/provider'
import nextCookies from 'next-cookies'
import App from 'next/app'
import Head from 'next/head'

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

  setGoogleTags () {
    return {
      __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', '${process.env.GOOGLE_ANALYTICS_ID}');
      `
    }
  }

  render () {
    const { Component, credentials, query, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Diaconia.online</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#FF703A" />
          <meta name="description" content="Organize e acompanhe os recursos de sua comunidade com um clique." />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`}></script>
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />
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
          <Component credentials={credentials} query={query} {...pageProps} />
        </BootstrapProvider>
      </>
    )
  }
}

export default MyApp
