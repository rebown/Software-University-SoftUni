import React from 'react';
import './Register.css';

import withForm from '../Shared/hocs/withForm';

class Register extends React.Component {
    
    usernameOnChangeHandler = this.props.controlChangeHandlerFactory('username');
    passwordOnChangeHandler = this.props.controlChangeHandlerFactory('password');
    rePasswordOnChangeHandler = this.props.controlChangeHandlerFactory('rePassword');

    submitHandler = () => {
        const { username, password, rePassword } = this.props.getFormState();

        console.log(username, password, rePassword)
    }

    render() {
        const { username, password, rePassword } = this.props.getFormState();

        return (
            <form className="Register" method="post">
            <div className="form-control">
                <label htmlFor="">Username</label>
                <input type="text" name="username" value={username} onChange={this.usernameOnChangeHandler} />
            </div>
            <div className="form-control">
                <label htmlFor="">Password</label>
                <input type="password" name="password" value={password} onChange={this.passwordOnChangeHandler} />
            </div>
            <div className="form-control">
                <label htmlFor="">Repeat Password</label>
                <input type="password" name="password" value={rePassword} onChange={this.rePasswordOnChangeHandler} />
            </div>
            <div className="form-control">
                <button onClick={this.submitHandler} type="button">Register</button>
            </div>
        </form>
        )
    }
}

const initialState = {
    username: '',
    password: '',
    rePassword: ''
}

export default withForm(Register, initialState);