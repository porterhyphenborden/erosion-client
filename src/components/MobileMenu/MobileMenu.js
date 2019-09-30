import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ErosionContext from '../../ErosionContext'
import TokenService from '../../services/token-service'
import './MobileMenu.css'

export default class MobileMenu extends Component {

    static contextType = ErosionContext

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.setIsLoggedIn()
    }

    renderNavLoggedIn() {
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
                <Link
                    onClick={this.handleLogoutClick}
                    to='/'>
                    Logout
                </Link>
            </nav>
        )
    }

    renderNavLoggedOut() {
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
                <Link
                    to='/register'>
                    Register
                </Link>
                <Link
                    to='/login'>
                    Log in
                </Link>
            </nav>
        )
    }

    render() {

        return (
            <>
                {(this.context.isLoggedIn)
                    ? this.renderNavLoggedIn()
                    : this.renderNavLoggedOut()}
            </>
        )
    }
}