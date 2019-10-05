import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import RulesPage from './RulesPage'

it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(
        <BrowserRouter>
            <RulesPage />
        </BrowserRouter>,
        div
    )
    ReactDOM.unmountComponentAtNode(div)
})