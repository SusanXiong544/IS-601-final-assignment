import React, { useState, useEffect } from "react";

const PokedexWrapper = require("pokeapi-js-wrapper")
const P = new PokedexWrapper.Pokedex()
const Pokemon = (props) => {
  const initialPokemonState = {
    userHaveAnError: false,
    errorMessage: null,

  }

  const [pokemonState, setpokemonState] = useState(initialPokemonState)
  useEffect(() => {
    P.getPokemonByName(props.name)
      .then(function (response) {
        console.log(response);
        setpokemonState(response);
      })
      .catch(function (error) {
        console.log(error);
        setpokemonState({ userHaveAnError: true, errorMessage: "There is an Error" })
      })
  }, []);
  return (
    <div>
      {pokemonState.userHaveAnError
        ? <p>{pokemonState.errorMessage}</p>
        :
        <div>
          Pokemon will go here:
          <br />{pokemonState !== null && <img src={pokemonState.sprites.front_default} />}
          {pokemonState !== null && pokemonState.name}
          {pokemonState !== null && pokemonState.abilities.map((ability) => { return <h3>{ability.ability.name}</h3> })}
          {pokemonState !== null && pokemonState.stats.map((stat) => { return <h3>{stat.base_stat}</h3> })}
          <div style={{ display: "flex" }}>
            <h3>Types: </h3>
            {pokemonState !== null && pokemonState.types.map((type) => { return <h3> {type.type.name} </h3> })}
            <br />
          </div>
        </div>
      }
    </div>
  )
}
export default Pokemon;




