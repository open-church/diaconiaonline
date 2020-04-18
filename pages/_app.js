import React from 'react'

import BootstrapProvider from '@bootstrap-styled/provider'

import { GlobalStyle } from '../styles/globalStyle'
// eslint-disable-next-line react/prop-types
function MyApp ({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <BootstrapProvider>
        <Component {...pageProps} />
      </BootstrapProvider>
    </>
  )
}

export default MyApp
