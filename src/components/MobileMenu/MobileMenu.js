import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ErosionContext from '../../ErosionContext'
import './MobileMenu.css'

export default class MobileMenu extends Component {

    static contextType = ErosionContext

    render() {
        let menuClasses = ['mobile-nav']
        if (this.context.mobileMenuOpen) {
            menuClasses = ['mobile-nav open']
        }

        return (
            <nav role='navigation' className={menuClasses}>
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