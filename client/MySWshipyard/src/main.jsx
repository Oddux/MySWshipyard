import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import navbar from './components/navbar.js'
import AuthContext from './utils/auth-context.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext.Provider value={{ token: null, login: (token) => {}, logout: () => {} }} />
    <navbar />
    <App />
    <AuthContext.Provider />
  </React.StrictMode>,
)
