import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import ErosionContext from '../../ErosionContext'
//import './Navigation.css'

export default class Navigation extends Component {

    // static contextType = ErosionContext

    // renderNavLoggedIn() {
    //     return (
    //         <>
    //             <Link to='/my-games'>
    //                 My Games
    //             </Link>
    //         </>
    //     )
    // }

    // renderNavLoggedOut() {
    //     return (
    //         <>
    //             <Link to='/play'>
    //                 Play Erosion
    //             </Link>
    //             <Link to='/rules'>
    //                 How to Play
    //             </Link>
    //             <Link to='/leaderboard'>
    //                 Leaderboard
    //             </Link>
    //         </>
    //     )
    // }

    // render() {
    //     return (
    //         <>
    //             {(this.context.isLoggedIn)
    //                 ? this.renderNavLoggedIn()
    //                 : this.renderNavLoggedOut()}
    //         </>
    //     )
    // }

    render() {
        return (
            <nav>
                <Link to='/play'>
                    Play Erosion
                 </Link>
                 <Link to='/rules'>
                    How to Play
                 </Link>
                 <Link to='/leaderboard'>
                    Leaderboard
                 </Link>
                 <Link to='/my-games'>
                    My Games
                 </Link>
            </nav>
        )
    }
}