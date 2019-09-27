import React, { Component } from 'react'

const ErosionContext = React.createContext({
    userScores: [],
    highScores: [],
    mobileMenuOpen: {},
    setUserScores: () => {},
    setHighScores: () => {},
    mobileMenuClickHandler: () => {},
    backdropClickHandler: () => {},
})

export default ErosionContext

export class ErosionContextProvider extends Component {
    state = {
        userScores: [],
        highScores: [],
        mobileMenuOpen: false,
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

    render() {
        const value = {
            userScores: this.state.userScores,
            setUserScores: this.setUserScores,
            highScores: this.state.highScores,
            setHighScores: this.setHighScores,
            mobileMenuOpen: this.state.mobileMenuOpen,
            mobileMenuClickHandler: this.mobileMenuClickHandler,
            backdropClickHandler: this.backdropClickHandler,
        }
    

        return (
            <ErosionContext.Provider value={value}>
                {this.props.children}
            </ErosionContext.Provider>
        )
    }
}