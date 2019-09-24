import React, { Component } from 'react'
import Game from '../../components/Game/Game'

export default class GamePage extends Component {

    render() {
        return (
            <div className='game-page'>
                <h2>Play Erosion</h2>
                <Game />
            </div>
        )
    }
}