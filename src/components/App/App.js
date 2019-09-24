import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Header from '../Header/Header'
import LandingPage from '../../routes/LandingPage/LandingPage'
import RulesPage from '../../routes/RulesPage/RulesPage'
import GamePage from '../../routes/GamePage/GamePage'
import Leaderboard from '../../routes/Leaderboard/Leaderboard'
import UserLandingPage from '../../routes/UserLandingPage/UserLandingPage'
import NotFoundPage from '../../routes/NotFoundPage/NotFoundPage'
import './App.css'

class App extends Component {

  state = { hasError: false }

  static getDerivedStateFromError(error) {
    console.error(error)
    return { hasError: true }
  }

  render() {
    return (
      <div className='app'>
        <Header />
        {/* <nav className='main-nav' role='navigation'>
          <Navigation />
        </nav> */}
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
            <Route 
              exact path='/play'
              component={GamePage}
            />
            <Route 
              exact path='/my-games'
              component={UserLandingPage}
            />
            {/* <PrivateRoute 
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
            />  */}
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
