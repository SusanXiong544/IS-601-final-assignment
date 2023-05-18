import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';

const PokedexWrapper = require("pokeapi-js-wrapper");
const PokemonList = (props) => {
  const initialPokemonListState = {
    userHaveAnError: false,
    errorMessage: null,
    pokedexEntries: null
  };
  const P = new PokedexWrapper.Pokedex();
  const [pokemonListState, setPokemonListState] = useState(initialPokemonListState);
  useEffect(() => {
    const pokemon_entries = P.getPokedexByName(props.pokedexName).then(function (response) {
      console.log(response.pokemon_entries)
      return response.pokemon_entries
    })
      .then((pokemon_entries) => {
        setPokemonListState({
          ...pokemonListState,
          pokedexEntries: pokemon_entries,
        });
      })
      .catch((error) => {
        setPokemonListState({
          ...pokemonListState,
          userHaveAnError: true,
          errorMessage: error.errorMessage,
        });
      });
  }, [props.pokedexName]);
  const pokemonList =
    pokemonListState?.pokedexEntries
      ? pokemonListState.pokedexEntries.map((pokemon, index) =>
        <div>
          {pokemon.pokemon_species.name}
          <button key={index} onClick={() => props.onViewDetailsClick(pokemon.pokemon_species.name)}>View Details</button>
        </div>)
      : null;
  return (
    <div>
      <Button
        onClick={() => {
          props.back("list")
        }}
      >
        Back
      </Button>
      {pokemonList}
    </div>
  )
}
export default PokemonList;