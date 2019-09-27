import React, { Component } from 'react'
import './LandingPage.css'

export default class LandingPage extends Component {

    render() {
        return (
            <div className='welcome'>
                <h2>Welcome to the world of Erosion!</h2>
                <p>Erosion is a single-player puzzle game where you, an alien colonist, are tasked with terraforming the terrain of a newly-discovered planet. Manipulate the grid of land tiles to guide the river to it's target location, earning points along the way for eroding tiles and leaving fertile soil along the river. Learn how to play the game and earn your place on the Leaderboard!</p>
            </div>
        )
    }
}