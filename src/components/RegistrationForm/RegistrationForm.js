import React, { Component } from 'react'
import AuthApiService from '../../services/auth-api-service'
//import './RegistrationForm.css'

export default class RegistrationForm extends Component {
    state = { error: null }

    static defaultProps = {
      onRegistrationSuccess: () => {}
    }

    updateHandle(handle) {
        this.setState({handle})
    }

    updateUsername(username) {
        this.setState({username})
    }

    updatePassword(password) {
        this.setState({password})
    }

    handleSubmit = ev => {
        ev.preventDefault()
        const { handle, username, password } = ev.target

        this.setState({ error: null })
        AuthApiService.postUser({
            username: username.value,
            password: password.value,
            handle: handle.value,
          })
            .then(user => {
                handle.value = ''
                username.value = ''
                password.value = ''
                this.props.onRegistrationSuccess()
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
    }

    render() {
        const { error } = this.state
        return (
            <form className='registration-form' onSubmit={this.handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='handle'>Handle</label>
                    <input type='handle' name='handle' id='handle' onChange={e => this.updateHandle(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='username'>Username</label>
                    <input type='username' name='username' id='username' onChange={e => this.updateUsername(e.target.value)}  />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <label htmlFor='password' className='password-label'>Must be at least 8 characters, contain 1 uppercase, 1 number, and 1 special character.</label>
                    <input type='password' name='password' id='password' onChange={e => this.updatePassword(e.target.value)}  />
                </div>
                <button type='submit'>Register</button>
                <div role='alert'>
                    {error && <div className='error'>{error}</div>}
                </div>
            </form>
        )
    }
}