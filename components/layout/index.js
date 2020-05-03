import React from 'react'

import PropTypes from 'prop-types'

import Footer from '../footer'
import Loading from '../loading/'
import Navbar from '../navBar/'

function Layout ({ children, loading, navLight }) {
  console.log('navLight', navLight)
  return (
    <>
      <Navbar light={!!navLight}/>
      {loading && <Loading />}
      {children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool,
  navLight: PropTypes.bool
}

export default Layout
