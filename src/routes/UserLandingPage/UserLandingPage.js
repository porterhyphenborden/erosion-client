import React, { Component } from 'react'
import data from '../../data'
import ErosionContext from '../../ErosionContext'
import './UserLandingPage.css'

export default class UserLandingPage extends Component {

    static contextType = ErosionContext

    componentDidMount() {
        this.context.setUserScores(data.userScores)
        this.context.backdropClickHandler()
    }

    render() {
        const scores = this.context.userScores
        return (
            <div className='user-page'>
                <h2>MY GAMES</h2>
                <ul className='user-scores'>
                    <li className='user-score'>
                        <span>DATE</span><span>SCORE</span>
                    </li>
                    {scores.map(score =>
                        <li className='user-score' key={score.scoreID}>
                            <span>{score.date}</span><span>{score.scoreNum}</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}