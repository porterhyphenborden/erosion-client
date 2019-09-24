import React, { Component } from 'react'
//import './UserLandingPage.css'

export default class UserLandingPage extends Component {

    render() {
        return (
            <div className='user-page'>
                <h2>My Past Games</h2>
                <ul>
                    <li>
                        Game 1: 1000 points
                    </li>
                    <li>
                        Game 2: 900 points
                    </li>
                </ul>
            </div>
        )
    }
}