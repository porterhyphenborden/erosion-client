import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import ErosionContext from '../../ErosionContext'
import './LoginPage.css'

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
            <section className='login-form'>
                <h2>Login</h2>
                <LoginForm
                    onLoginSuccess={this.handleLoginSuccess}
                />
                <div className='demouser'>
                    <h3>Use demo user</h3>
                    <p>Username: DemoUser
                    <br />Password: 1Demo@User</p>
                </div>
            </section>
        )
    }
}