import React from 'react'

import BootstrapProvider from '@bootstrap-styled/provider'

import { GlobalStyle } from '../styles/globalStyle'
import { colors } from '../utils/variables'

// eslint-disable-next-line react/prop-types
function MyApp ({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <BootstrapProvider theme={{
        '$btn-primary-bg': `${colors.blueZodiac}`,
        '$btn-primary-color': `${colors.white}`,
        '$btn-primary-border': `${colors.white}`,
        '$btn-secondary-bg': `${colors.white}`,
        '$btn-secondary-color': `${colors.blueZodiac}`,
        '$btn-secondary-border': `${colors.blueZodiac}`,
        '$btn-info-color': `${colors.white}`,
        '$btn-info-bg': `${colors.burningOrange}`,
        '$btn-info-border': `${colors.burningOrange}`
      }}>
        <Component {...pageProps} />
      </BootstrapProvider>
    </>
  )
}

export default MyApp
