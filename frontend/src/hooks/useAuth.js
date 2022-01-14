// /src/hooks/useAuth.tsx
import React, { useState, createContext, useContext, useEffect } from 'react'

// Create the context
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  // Using the useState hook to keep track of the value authed (if a
  // user is logged in)
  const [authed, setAuthed] = useState(false)

  const result = window.localStorage.getItem('loggedTaskappUser')

  if (result) {
    console.log('user has logged in')

    setAuthed(true)
  }

  /// Mock Async Login API call.
  // TODO: Replace with your actual login API Call code
  const fakeAsyncLogin = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Logged In')
      }, 300)
    })
  }

  // Mock Async Logout API call.
  // TODO: Replace with your actual logout API Call code
  const fakeAsyncLogout = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('The user has successfully logged on the server')
      }, 300)
    })
  }

  return (
    // Using the provider so that ANY component in our application can
    // use the values that we are sending.
    <AuthContext.Provider value={{ authed, setAuthed, }}>
      {children}
    </AuthContext.Provider>
  )
}

// Finally creating the custom hook
export const useAuth = () => useContext(AuthContext)

// import React, { useState } from 'react'
// import jwtDecode from 'jwt-decode'
// import { Navigate, useLocation } from 'react-router-dom'

// const useAuth = async () => {
//   const [authed, setAuthed] = useState(false)
//   const loggedUserJSON = await window.localStorage.getItem('loggedTaskappUser')

//   if (loggedUserJSON) {

//     const decoded = jwtDecode(loggedUserJSON)
//     const currentDate = new Date()

//     if (decoded.exp * 1000 > currentDate.getTime()) {
//       setAuthed(true)
//     }
//   }

//   return authed
// }

// export default useAuth
