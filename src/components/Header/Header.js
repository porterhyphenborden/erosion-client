import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../Navigation/Navigation'
//import ErosionContext from '../../ErosionContext'
//import TokenService from '../../services/token-service'
import './Header.css'
import logo from '../../images/erosionlogo.png'

export default class Header extends Component {

    render() {
        return (
            <header className='header'>
                <Link className='logo' to='/'>
                    <img className='logo' src={logo} alt='Erosion' />
                </Link>
                <Navigation />
            </header>
        )
    }
}