import React from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import Welcome from './pages/Welcome'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import MyQuotes from './pages/MyQuotes'
import Liked from './pages/Liked'
import Disliked from './pages/Disliked'
import Layout from './components/Layout'
// import PrivateRoute from './components/routing/PrivateRoute'
import { AnimatePresence } from "framer-motion"

import Alerts from './components/Alerts'

import QuoteState from './context/quote/QuoteState'
import AuthState from './context/auth/AuthState'
import AlertState from './context/alert/AlertState'

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'sans-serif',
    ].join(',')
  }
})

const App = () => {
  
  const location = useLocation()

  return (

    <ThemeProvider theme={theme}>
      <AnimatePresence exitBeforeEnter>
        <AuthState>
          <AlertState>
            <QuoteState>
              <Alerts/>
              <Switch location={location} key={location.key}>
                <Route exact path='/' component={Welcome} />
                <Route exact path='/register' component={Register}/>
                <Route exact path='/login' component={Login}/>
                  <Layout>
                    <Route exact path='/home' component={Home}/>
                    {/* <PrivateRoute exact path='/my-quotes' component={MyQuotes}/>
                    <PrivateRoute exact path='/liked' component={Liked}/>
                    <PrivateRoute exact path='/disliked' component={Disliked}/> */}
                  </Layout>
              </Switch>
            </QuoteState>
          </AlertState>
        </AuthState>
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App

