import React, { Component } from 'react'
import ErosionContext from '../../ErosionContext'
import ErosionApiService from '../../services/erosion-api-service'
import { NiceDate } from '../../components/utils/Utils'
import './UserLandingPage.css'

export default class UserLandingPage extends Component {
    state = { 
        error: null,
        map1: false,
        map2: false,
        map3: false,
        map4: false,
        map5: false
    }

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

    toggleScores1() {
        this.setState(state => ({
            map1: !state.map1
        }))
    }

    toggleScores2() {
        this.setState(state => ({
            map2: !state.map2
        }))
    }

    toggleScores3() {
        this.setState(state => ({
            map3: !state.map3
        }))
    }

    toggleScores4() {
        this.setState(state => ({
            map4: !state.map4
        }))
    }

    toggleScores5() {
        this.setState(state => ({
            map5: !state.map5
        }))
    }

    render() {
        const scores = this.context.userScores
        const map1scores = scores.filter(score => score.map_id === 1)
        const map2scores = scores.filter(score => score.map_id === 2)
        const map3scores = scores.filter(score => score.map_id === 3)
        const map4scores = scores.filter(score => score.map_id === 4)
        const map5scores = scores.filter(score => score.map_id === 5)
        return (
            <div className='user-page'>
                <h2>MY GAMES</h2>
                <div className='user-scores'>
                    <section className='map1'>
                        <button className='scores-toggle' disabled={!map1scores.length} onClick={() => this.toggleScores1()}>MAP 1</button>
                        {this.state.map1 && <ul className='user-scores'>
                            <li className='user-score'>
                                <span>Date</span><span>Total</span><span>Initial Score</span><span>Soil Bonus</span><span>Location Bonus</span>
                            </li>
                            {map1scores.length !== 0 && map1scores.map(score =>
                                <li className='user-score' key={score.id}>
                                    <span><NiceDate date={score.date} /></span><span>{score.final_score}</span><span>{score.score}</span><span>{score.soil_bonus}</span><span>x {score.location_bonus}</span>
                                </li>
                            )}
                        </ul>}
                    </section>
                    <section className='map2'>
                        <button className='scores-toggle' disabled={!map2scores.length} onClick={() => this.toggleScores2()}>MAP 2</button>
                        {this.state.map2 && <ul className='user-scores'>
                            <li className='user-score'>
                                <span>Date</span><span>Total</span><span>Initial Score</span><span>Soil Bonus</span><span>Location Bonus</span>
                            </li>
                            {map2scores.length !== 0 && map2scores.map(score =>
                                <li className='user-score' key={score.id}>
                                    <span><NiceDate date={score.date} /></span><span>{score.final_score}</span><span>{score.score}</span><span>{score.soil_bonus}</span><span>x {score.location_bonus}</span>
                                </li>
                            )}
                        </ul>}
                    </section>
                    <section className='map3'>
                        <button className='scores-toggle' disabled={!map3scores.length} onClick={() => this.toggleScores3()}>MAP 3</button>
                        {this.state.map3 && <ul className='user-scores'>
                            <li className='user-score'>
                                <span>Date</span><span>Total</span><span>Initial Score</span><span>Soil Bonus</span><span>Location Bonus</span>
                            </li>
                            {map3scores.length !== 0 && map3scores.map(score =>
                                <li className='user-score' key={score.id}>
                                    <span><NiceDate date={score.date} /></span><span>{score.final_score}</span><span>{score.score}</span><span>{score.soil_bonus}</span><span>x {score.location_bonus}</span>
                                </li>
                            )}
                        </ul>}
                    </section>
                    <section className='map4'>
                        <button className='scores-toggle' disabled={!map4scores.length} onClick={() => this.toggleScores4()}>MAP 4</button>
                        {this.state.map4 && <ul className='user-scores'>
                            <li className='user-score'>
                                <span>Date</span><span>Total</span><span>Initial Score</span><span>Soil Bonus</span><span>Location Bonus</span>
                            </li>
                            {map4scores.length !== 0 && map4scores.map(score =>
                                <li className='user-score' key={score.id}>
                                    <span><NiceDate date={score.date} /></span><span>{score.final_score}</span><span>{score.score}</span><span>{score.soil_bonus}</span><span>x {score.location_bonus}</span>
                                </li>
                            )}
                        </ul>}
                    </section>
                    <section className='map5'>
                        <button className='scores-toggle' disabled={!map5scores.length} onClick={() => this.toggleScores5()}>MAP 5</button>
                        {this.state.map5 && <ul className='user-scores'>
                            <li className='user-score'>
                                <span>Date</span><span>Total</span><span>Initial Score</span><span>Soil Bonus</span><span>Location Bonus</span>
                            </li>
                            {map5scores.length !== 0 && map5scores.map(score =>
                                <li className='user-score' key={score.id}>
                                    <span><NiceDate date={score.date} /></span><span>{score.final_score}</span><span>{score.score}</span><span>{score.soil_bonus}</span><span>x {score.location_bonus}</span>
                                </li>
                            )}
                        </ul>}
                    </section>
                </div>
            </div>
        )
    }
}