import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Navigation'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <Navigation />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})