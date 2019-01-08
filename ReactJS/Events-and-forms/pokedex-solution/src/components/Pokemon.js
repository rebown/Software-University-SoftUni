import React from 'react'

const divStyle = {
    display: 'inline-block',
    width: '250px',
    margin: '20px',
    float: 'left'
}

const fixImageSize = {
    width: '250px',
    height: '300px'
}

const Pokemon = (props) => {
    return (
        <div style={divStyle}>
            <h2>{props.item.pokeName}</h2>
            <p>{props.item.pokeInfo}</p>
            <img style={fixImageSize} src={props.item.pokeUrl}/>
        </div>
    )
}

export default Pokemon