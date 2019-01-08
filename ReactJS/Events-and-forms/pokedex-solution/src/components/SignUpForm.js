import React, { Component } from 'react';

export default class SignUpForm extends Component {
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
            'http://localhost:5000/auth/signup',
            {
                method: 'POST',
                body: JSON.stringify(this.state.form),
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        .then(data => data.json())
        .then(response => console.log(response))
    }



    render() {
        return (
            <div>
                <h2>Sign up</h2>
                <label htmlFor="email">  Email:</label>
                <input onChange={this.handleChange} type="text" name="email" id="email" /><br />
                <label htmlFor="pass">Password:</label>
                <input onChange={this.handleChange} type="text" name="password" id="pass" /><br />
                <label htmlFor="name"></label>
                <input onChange={this.handleChange} type="text" name="name" id="name" /><br />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}