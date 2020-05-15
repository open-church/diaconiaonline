import React from 'react'

import PropTypes from 'prop-types'

import Footer from '../footer'
import Loading from '../loading/'
import Navbar from '../navBar/'
import * as S from './styles'

function Layout ({ children, loading, credentials, navBarBgActive }) {
  return (
    <>
      <Navbar credentials={credentials} bgActive={navBarBgActive}/>
      {loading && <Loading />}
      <S.Wrapper withPaddingTop={navBarBgActive}>
        {children}
      </S.Wrapper>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  credentials: PropTypes.object,
  children: PropTypes.node,
  loading: PropTypes.bool,
  navBarBgActive: PropTypes.bool
}

export default Layout
