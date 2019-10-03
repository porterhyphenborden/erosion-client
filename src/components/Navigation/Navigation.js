import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ErosionContext from '../../ErosionContext'
import TokenService from '../../services/token-service'
import './Navigation.css'
import MobileMenuToggle from '../MobileMenu/MobileMenuToggle';

export default class Navigation extends Component {

    constructor(props) {
        super(props)
            this.state = {
                width: window.innerWidth,
            }
    }

    static contextType = ErosionContext

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.context.setIsLoggedIn()
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange)
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth })
    }

    renderNavLoggedIn() {
        return (
            <nav className='full-nav' role='navigation'>
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
        return (
            <nav className='full-nav' role='navigation'>
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
        const { width } = this.state
        const isTablet = width <= 875;

        if (isTablet) {
            return (
                <MobileMenuToggle />
            )
        }
        else {
            return (
                <>
                {(this.context.isLoggedIn)
                    ? this.renderNavLoggedIn()
                    : this.renderNavLoggedOut()}
                </>
            )
        }
        
    }
}