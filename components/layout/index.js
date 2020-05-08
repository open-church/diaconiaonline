import React from 'react'

import PropTypes from 'prop-types'

import Footer from '../footer'
import Loading from '../loading/'
import Navbar from '../navBar/'

function Layout ({ children, loading, credentials }) {
  return (
    <>
      <Navbar credentials={credentials}/>
      {loading && <Loading />}
      {children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  credentials: PropTypes.object,
  children: PropTypes.node,
  loading: PropTypes.bool
}

export default Layout
