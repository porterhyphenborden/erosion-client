import React, { Component } from 'react'
//import './Leaderboard.css'

export default class Leaderboard extends Component {

    render() {
        return (
            <div className='leaderboard'>
                <h2>Leaderboard</h2>
                <ul>
                    <li>
                        Thisperson: 1000 points
                    </li>
                    <li>
                        Anotherperson: 900 points
                    </li>
                </ul>
            </div>
        )
    }
}