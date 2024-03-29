import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import LandingPage from '../../routes/LandingPage/LandingPage'
import RulesPage from '../../routes/RulesPage/RulesPage'
import GamePage from '../../routes/GamePage/GamePage'
import Leaderboard from '../../routes/Leaderboard/Leaderboard'
import UserLandingPage from '../../routes/UserLandingPage/UserLandingPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import MobileMenu from '../MobileMenu/MobileMenu'
import Backdrop from '../Backdrop/Backdrop'
import RegistrationPage from '../../routes/RegistrationPage/RegistrationPage'
import LoginPage from '../../routes/LoginPage/LoginPage'
import ErosionContext from '../../ErosionContext'
import PrivateRoute from '../utils/PrivateRoute'
import PublicOnlyRoute from '../utils/PublicOnlyRoute'
import './App.css'

class App extends Component {

  static contextType = ErosionContext

  state = { 
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    let backdrop

    if (this.context.mobileMenuOpen) {
      backdrop = <Backdrop />
    }

    return (
      <div className='app'>
        <Header />
        <MobileMenu />
        {backdrop}
        <main>
        {this.state.hasError && <p className='error'>There was an error! Please try again later.</p>}
          <Switch>
            <Route 
              exact path='/'
              component={LandingPage}
            />
            <Route 
              path='/rules'
              component={RulesPage}
            />
            <Route 
              exact path='/leaderboard'
              component={Leaderboard}
            />
            <PrivateRoute 
              exact path='/play'
              component={GamePage}
            />
            <PrivateRoute 
              exact path='/my-games'
              component={UserLandingPage}
            />
            <PublicOnlyRoute 
              path='/register'
              component={RegistrationPage}
            />
            <PublicOnlyRoute 
              exact path='/login'
              component={LoginPage}
            />
            <Route
              component={NotFoundPage}
            />
          </Switch>
        </main>
      </div>

    )
  }
}

export default App
