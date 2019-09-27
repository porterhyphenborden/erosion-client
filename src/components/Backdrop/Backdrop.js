import React, { Component } from 'react'
import ErosionContext from '../../ErosionContext'
import './Backdrop.css'

export default class Backdrop extends Component {

    static contextType = ErosionContext

    render() {
        return (
            <div className='backdrop' onClick={this.context.backdropClickHandler}></div>
        )
    }
}