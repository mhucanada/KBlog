import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {
  HashRouter as Router,
  Routes,
  Route,
  // useLocation,
  // Navigate,
} from 'react-router-dom'
import App from './App'
import LoginForm from './components/Login/Login'
import CreateAccount from './components/CreateAccount/CreateAccount'
import HomePage from './pages/HomePage/HomePage'
// import { useAuth } from './hooks/useAuth'

// function RequireAuth({ children }) {
//   const { authed } = useAuth()
//   const location = useLocation()
//   console.log(authed)
//   if (!authed) {
//     return (
//       <Navigate to="/loginpage" replace state={{ path: location.pathname }} />
//     )
//   }
//   return children
// }

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/createaccount" element={<CreateAccount />} />
      <Route path="/loginpage" element={<LoginForm />} />
      <Route path="/homepage" element={<HomePage />} />
    </Routes>
  </Router>,
  document.getElementById('root')
)
