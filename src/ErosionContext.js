import React, { Component } from 'react'
import TokenService from './services/token-service'

const ErosionContext = React.createContext({
    userScores: [],
    highScores: [],
    mobileMenuOpen: {},
    isLoggedIn: {},
    setUserScores: () => {},
    setHighScores: () => {},
    mobileMenuClickHandler: () => {},
    backdropClickHandler: () => {},
    setIsLoggedIn: () => {},
})

export default ErosionContext

export class ErosionContextProvider extends Component {
    state = {
        userScores: [],
        highScores: [],
        mobileMenuOpen: false,
        isLoggedIn: TokenService.hasAuthToken(),
    }

    setUserScores = userScores => {
        this.setState({userScores})
    }

    setHighScores = highScores => {
        this.setState({highScores})
    }

    mobileMenuClickHandler = () => {
        this.setState(state => ({
            mobileMenuOpen: !state.mobileMenuOpen
        }))
    }

    backdropClickHandler = () => {
        this.setState({mobileMenuOpen: false})
    }

    setIsLoggedIn = () => {
        let loggedIn = TokenService.hasAuthToken()
        this.setState({ 
          isLoggedIn: loggedIn
        })
    }

    render() {
        const value = {
            userScores: this.state.userScores,
            setUserScores: this.setUserScores,
            highScores: this.state.highScores,
            isLoggedIn: this.state.isLoggedIn,
            setHighScores: this.setHighScores,
            mobileMenuOpen: this.state.mobileMenuOpen,
            mobileMenuClickHandler: this.mobileMenuClickHandler,
            backdropClickHandler: this.backdropClickHandler,
            setIsLoggedIn: this.setIsLoggedIn,
        }
    

        return (
            <ErosionContext.Provider value={value}>
                {this.props.children}
            </ErosionContext.Provider>
        )
    }
}