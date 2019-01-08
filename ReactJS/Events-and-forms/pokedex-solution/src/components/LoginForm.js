import React, { Component } from 'react';

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            form: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let name = event.target.name;
        let value = event.target.value;
        const newObj = {};
        newObj[name] = value;

        this.setState({
            //assign the properties of the source obj to the target obj
            form: Object.assign(this.state.form, newObj)
        })
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch(
            'http://localhost:5000/auth/login',
            {
                method: 'POST',
                body: JSON.stringify(this.state.form),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
            .then(data => data.json())
            .then(response => {
                if(response.success && response.token) {
                    localStorage.setItem('token', response.token);
                    this.props.setLoggedIn();
                }
            }).catch(err => console.log(err))
    }



    render() {
        return (
            <div>
                <h2>Login</h2>
                <label htmlFor="email"> Email:</label>
                <input onChange={this.handleChange} type="text" name="email" id="email" /><br />:
                <label htmlFor="pass">Password:</label>
                <input onChange={this.handleChange} type="text" name="password" id="pass" /><br />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}