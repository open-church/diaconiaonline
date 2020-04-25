import React from 'react'

import PropTypes from 'prop-types'

import Footer from '../footer'
import Navbar from '../navBar/'

function Layout ({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
