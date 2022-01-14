import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useAuth()
  return (

    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Navigate to="/signin" />
      }
    />
  )
}

export default PrivateRoute
