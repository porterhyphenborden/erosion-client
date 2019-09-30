import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import ErosionContext from '../../ErosionContext'

export default class LoginPage extends Component {
    static defaultProps = {
        location: {},
        history: {
            push: () => {},
        },
    }

    static contextType = ErosionContext

    componentDidMount() {
        this.context.backdropClickHandler()
    }

    handleLoginSuccess = () => {
        this.props.history.push('/my-games')
        this.context.setIsLoggedIn()
    }

    render() {
        return (
            <section>
                <h2>Login</h2>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
            </section>
        )
    }
}