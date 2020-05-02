import React, { useReducer, useContext } from 'react'

import PropTypes from 'prop-types'

const SessionStateContext = React.createContext()
const SessionDispatchContext = React.createContext()

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE':
      return action.payload
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export const SessionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {})
  return (
    <SessionDispatchContext.Provider value={dispatch}>
      <SessionStateContext.Provider value={state}>
        {children}
      </SessionStateContext.Provider>
    </SessionDispatchContext.Provider>
  )
}

export const useSession = () => useContext(SessionStateContext)
export const useDispatchSession = () => useContext(SessionDispatchContext)

SessionProvider.propTypes = {
  children: PropTypes.node
}
