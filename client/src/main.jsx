import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import navbar from './components/navbar.js'
import AuthContext from './utils/auth-context.js'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../../api/connection.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient} />  
      <AuthContext.Provider value={{ token: null, login: (token) => {}, logout: () => {this.setState({token: null, pilotId: null})} }} />
        <navbar />
        <App />
      <AuthContext.Provider />
    <ApolloProvider />
  </React.StrictMode>,
)
