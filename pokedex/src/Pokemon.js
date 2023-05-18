import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

const PokedexWrapper = require("pokeapi-js-wrapper");
const Pokemon = (props) => {
  const P = new PokedexWrapper.Pokedex()
  const initialPokemonState = {
    userHaveAnError: false,
    errorMessage: null,
  };

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
      });
  }, [props.name]);
  return (
    <div>
      <Button
        onClick={() => {
          props.back("entries")
        }}
      >
        Back
      </Button>
      {pokemonState.userHaveAnError
        ? <p>{pokemonState.errorMessage}</p>
        :
        <div>
          Pokemon will go here:
          <br />{pokemonState.name && <img src={pokemonState?.sprites?.front_default} />}
          <h2>{pokemonState.name}</h2>
          {pokemonState.name && pokemonState.abilities.map((ability) => { return <h3>{ability.ability.name}</h3> })}
          {pokemonState.name && pokemonState.stats.map((stat) => { return <h3>{stat.stat.name}: {stat.base_stat}</h3> })}
          <div style={{ display: "flex" }}>
            <h3>Types: </h3>
            {pokemonState.name && pokemonState.types.map((type) => { return <h3> {type.type.name} </h3> })}
            <br />
          </div>
        </div>
      }
    </div>
  )
}
export default Pokemon;


