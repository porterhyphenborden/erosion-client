import React, { Component } from 'react'
import data from '../../data'
import ErosionContext from '../../ErosionContext'
import './Leaderboard.css'

export default class Leaderboard extends Component {

    static contextType = ErosionContext

    componentDidMount() {
        this.context.setHighScores(data.highScores)
    }

    render() {
        let scores = this.context.highScores
        return (
            <div className='leaderboard'>
                <h2>HIGH SCORES</h2>
                <ul className='high-scores'>
                    <li className='high-score'><span className='rank'>RANK</span><span>SCORE</span><span>NAME</span></li>
                    {scores.map(score =>
                        <li className='high-score' key={score.scoreID}>
                            <span className='rank'>{score.scoreID}</span><span>{score.scoreNum}</span><span>{score.user}</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}