import React, { Component } from 'react'
//import './RulesPage.css'

export default class RulesPage extends Component {

    render() {
        return (
            <div className='rules'>
                <h2>how to Play Erosion</h2>
                <div role="nav" class="page-nav">
                    <a href="#intro">Intro</a>
                    <a href="#setup">Setup</a>
                    <a href="#gameplay">Gameplay</a>
                    <a href="#scoring">Scoring</a>
                </div>
                <section>
                    <h3 id="intro">Intro</h3>
                    <p>
                    Here is some general info about the game. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    </p>
                </section>
                <section>
                    <h3 id="setup">Setup</h3>
                    <p>
                    Read about how the game is set up. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    </p>
                </section>
                <section>
                    <h3 id="gameplay">Gameplay</h3>
                    <p>
                    Learn how gameplay proceeds. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    </p>
                </section>
                <section>
                    <h3 id="scoring">Scoring</h3>
                    <p>
                    Learn how the game is scored. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                    </p>
                </section>
            </div>
        )
    }
}