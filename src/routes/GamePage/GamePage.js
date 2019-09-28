import React, { Component } from 'react'
import Game from '../../components/Game/Game'
import ErosionContext from '../../ErosionContext'

export default class GamePage extends Component {

    static contextType = ErosionContext

    componentDidMount() {
        this.context.backdropClickHandler()
    }

    render() {
        return (
            <div className='game-page'>
                <Game />
            </div>
        )
    }
}