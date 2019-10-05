import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import MobileMenu from './MobileMenu'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <MobileMenu />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})