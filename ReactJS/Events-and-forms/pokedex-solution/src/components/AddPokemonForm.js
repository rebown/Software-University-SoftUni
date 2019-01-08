import React, { Component } from 'react'

export default class LoggedInScreen extends Component {
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
            'http://localhost:5000/pokedex/create',
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
                this.props.updateNewRoster(response);
            })
    }

    render() {
        return (
            <div>
                <h2>Add Pokemon</h2>
                <label htmlFor="pokeName">Pokemon Name: </label>
                <input onChange={this.handleChange} type="text" name="pokeName" id="pokeName" /><br />
                <label htmlFor="pokeUrl">Pokemon Image: </label>
                <input onChange={this.handleChange} type="text" name="pokeUrl" id="pokeUrl" /><br />
                <label htmlFor="pokeInfo">Pokemon Info: </label>
                <input onChange={this.handleChange} type="text" name="pokeInfo" id="pokeInfo" /><br />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}