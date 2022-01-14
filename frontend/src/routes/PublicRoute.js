import React from 'react'
import { Route,Navigate  } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const auth = useAuth()
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        auth && restricted ? (
          <Navigate to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default PublicRoute
