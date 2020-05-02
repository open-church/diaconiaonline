import React from 'react'

import { Alert as BAlert } from '@bootstrap-styled/v4'
import PropTypes from 'prop-types'

function Alert ({ message, type }) {
  const getColor = (type) => {
    const colors = {
      success: 'success',
      info: 'info',
      warning: 'warning',
      error: 'danger'
    }
    return colors[type] || colors.error
  }
  return (
    <BAlert color={getColor(type)} autoHideDuration="10000">{message}</BAlert>
  )
}

Alert.propTypes = {
  message: PropTypes.text,
  type: PropTypes.text
}

export default Alert
