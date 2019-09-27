import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import ErosionContext from '../../ErosionContext'
import './Navigation.css'
import MobileMenuToggle from '../MobileMenu/MobileMenuToggle';

export default class Navigation extends Component {

    constructor(props) {
        super(props)
            this.state = {
                width: window.innerWidth,
            }
    }

    componentDidMount() {
        window.addEventListener('resize', this.handleWindowSizeChange);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWindowSizeChange);
    }

    handleWindowSizeChange = () => {
        this.setState({ width: window.innerWidth });
    };

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
        const { width } = this.state
        const isTablet = width <= 750;

        if (isTablet) {
            return (
                <MobileMenuToggle />
            )
        }
        else {
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
                </nav>
            )
        }
        
    }
}