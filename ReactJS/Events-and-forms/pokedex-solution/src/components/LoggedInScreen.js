import React, { Component } from 'react'
import AddPokemonForm from './AddPokemonForm'
import Pokemon from './Pokemon'


export default class LoggedInScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            pokeArr: []
        }

        this.updateNewRoster = this.updateNewRoster.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:5000/pokedex/pokedex')
            .then(rawData => rawData.json())
            .then(res => this.setState({pokeArr: res.pokemonColection}))
    }

    updateNewRoster(pokeArr) {
        this.setState({ pokeArr })
    }

    render() {
        return (
            <div>
              <AddPokemonForm updateNewRoster={this.updateNewRoster}/>
                <div>
                    {this.state.pokeArr.map((pokemon, index) => <Pokemon key={index} item={pokemon}/> )}
                </div>
            </div>
        )
    }

}