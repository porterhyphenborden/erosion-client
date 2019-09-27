import React, { Component } from 'react'
import ErosionContext from '../../ErosionContext'
import hamburger from '../../images/hamburger.png'
import './MobileMenuToggle.css'

export default class MobileMenuToggle extends Component {

    static contextType = ErosionContext

    render() {
        return (
            <button onClick={this.context.mobileMenuClickHandler} className='hamburger'><img className='hamburger' alt='hamburger menu icon' src={hamburger} /></button>
        )
    }
    
}

