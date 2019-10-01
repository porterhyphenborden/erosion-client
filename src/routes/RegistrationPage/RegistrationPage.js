import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import ErosionContext from '../../ErosionContext'
import './RegistrationPage.css'

export default class RegistrationPage extends Component {

    static contextType = ErosionContext

    static defaultProps = {
        history: {
        push: () => {},
        },
    }

    componentDidMount() {
        this.context.backdropClickHandler()
    }

    handleRegistrationSuccess = user => {
        const { history } = this.props
        history.push('/login')
    }

    render() {
        return (
            <section className='registration-form'>
                <h2>Register</h2>
                <RegistrationForm
                    onRegistrationSuccess={this.handleRegistrationSuccess}
                />
            </section>
        )
    }
}
