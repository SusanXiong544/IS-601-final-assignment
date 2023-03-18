import React, {useState,useEffect} from "react";


const PokemonList = (props) => {
 console.log(props.pokedexEntries)
    const pokemonList = 
      props?.pokedexEntries
      ? props.pokedexEntries.map((pokemon, index) => 
        <div>
          {pokemon.pokemon_species.name}
          <button key={index} onClick={() => props.onViewDetailsClick(pokemon.pokemon_species.name)}>View Details</button>
        </div>) 
      : null;
    return (
      <div>
        {pokemonList}
      </div>
    )
}
export default PokemonList;