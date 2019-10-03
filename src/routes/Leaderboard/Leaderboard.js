import React, { Component } from 'react'
import ErosionContext from '../../ErosionContext'
import ErosionApiService from '../../services/erosion-api-service'
import './Leaderboard.css'

export default class Leaderboard extends Component {
    state = { error: null }

    static contextType = ErosionContext

    componentDidMount() {
        this.context.backdropClickHandler()
        ErosionApiService.getScores()
            .then(res => {
                let highTen = res.slice(0, 10)
                this.context.setHighScores(highTen)
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        let scores = this.context.highScores
        return (
            <div className='leaderboard'>
                <h2>HIGH SCORES</h2>
                <ul className='high-scores'>
                    <li className='high-score'><span className='rank'>RANK</span><span>SCORE</span><span>NAME</span></li>
                    {scores.map((score, i) =>
                        <li className='high-score' key={score.id}>
                            <span className='rank'>{i + 1}</span><span>{score.final_score}</span><span>{score.handle}</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}