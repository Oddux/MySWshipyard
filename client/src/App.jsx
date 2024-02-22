import React, { Component } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Container from './components/container.jsx'
import './index.css'
import mainNavigation from './components/navbar.jsx'
import AuthContext from './utils/auth-context.js'
import { ApolloProvider } from '@apollo/client'
import { apolloClient } from '../../server/SWapi/connection.js'

class App extends Component {
  state = {
    token: null,
    pilotId: null
  };

  login = (token, pilotId, tokenExpiration) => {
    this.setState({ token: token, userId: pilotId });
  };

  logout = () => {
    this.setState({ token: null, pilotId: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <ApolloProvider client={apolloClient} />  
            <AuthContext.Provider
              value={{
              token: this.state.token,
              pilotId: this.state.pilotId,
              login: this.login,
              logout: this.logout,
            }}>
              <mainNavigation />
              <Container />
            </AuthContext.Provider>
          <ApolloProvider />
        </React.Fragment>,
      </BrowserRouter>
    )
  }
}

export default App