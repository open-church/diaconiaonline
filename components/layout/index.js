import React from 'react'

import PropTypes from 'prop-types'

import Footer from '../footer'
import Loading from '../loading/'
import Navbar from '../navBar/'

function Layout ({ children, loading }) {
  return (
    <>
      <Navbar />
      {loading ? <Loading /> : children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node
}

export default Layout
