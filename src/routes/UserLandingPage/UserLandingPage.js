import React, { Component } from 'react'
import ErosionContext from '../../ErosionContext'
import ErosionApiService from '../../services/erosion-api-service'
import { NiceDate } from '../../components/utils/Utils'
import './UserLandingPage.css'

export default class UserLandingPage extends Component {
    state = { error: null }

    static contextType = ErosionContext

    componentDidMount() {
        this.context.backdropClickHandler()
        ErosionApiService.getUserScores()
            .then(res => {
                this.context.setUserScores(res)
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const scores = this.context.userScores
        return (
            <div className='user-page'>
                <h2>MY GAMES</h2>
                <ul className='user-scores'>
                    <li className='user-score'>
                        <span>Date</span><span>Total</span><span>Map</span><span>Initial Score</span><span>Soil Bonus</span><span>Location Multiplier</span>
                    </li>
                    {scores.length !== 0 && scores.map(score =>
                        <li className='user-score' key={score.id}>
                            <span><NiceDate date={score.date} /></span><span>{score.final_score}</span><span>{score.map_id}</span><span>{score.score}</span><span>{score.soil_bonus}</span><span>{score.location_bonus}</span>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}