import React, { Component } from 'react'

const ErosionContext = React.createContext({
    userScores: [],
    highScores: [],
    setUserScores: () => {},
    setHighScores: () => {},
})

export default ErosionContext

export class ErosionContextProvider extends Component {
    state = {
        userScores: [],
        highScores: [],
    }

    setUserScores = userScores => {
        this.setState({userScores})
    }

    setHighScores = highScores => {
        this.setState({highScores})
    }

    render() {
        const value = {
            userScores: this.state.userScores,
            setUserScores: this.setUserScores,
            highScores: this.state.highScores,
            setHighScores: this.setHighScores,
        }
    

        return (
            <ErosionContext.Provider value={value}>
                {this.props.children}
            </ErosionContext.Provider>
        )
    }
}