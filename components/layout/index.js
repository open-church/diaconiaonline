import React from 'react'

import PropTypes from 'prop-types'

import Footer from '../footer'

function Layout ({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node
}

export default Layout
