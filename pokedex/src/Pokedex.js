import React, { useState, useEffect } from "react";
import PokedexList from "./PokedexList";
import PokemonList from "./PokemonList";
import Pokemon from "./Pokemon"
import Button from '@mui/material/Button';


const PokedexWrapper = require("pokeapi-js-wrapper")
const P = new PokedexWrapper.Pokedex()
const Pokedex = (props) => {
  const initialpokedex = {
    allpokedex: [],
    selectedPokedex: null,
    selectedPokemon: null,
    pokedexEntries: [],
    contentPage : null 
  }
  const [pokedexState, setPokedexState] = useState(initialpokedex);
  useEffect(() => {
    // declare the async data fetching function
    const fetchData = async () => {
      // get the data from the api
      const data = await P.resource("/api/v2/pokedex");
      // convert the data to json
      console.log(data)
      // set state with the result
      setPokedexState({
        ...pokedexState,
        allpokedex: data.results,
        contentPage : "list"
      });
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch((error) => {
        setPokedexState({
          ...pokedexState,
          userHaveAnError: true,
          errorMessage: error.errorMessage,
        });
      });
  }, [])
  const onViewDetailsClick = (name) => {
    setPokedexState({
      ...pokedexState,
      selectedPokemon: name,
      contentPage :"pokemon"
    })
  }
  const back = (page) => {
    setPokedexState({
      ...pokedexState,
      contentPage : page
    })
  }
  return (
    <div>
      <Button
        onClick={() => {
          setPokedexState({
            ...pokedexState,
            selectedPokemon: null,
            selectedPokedex: null,
            contentPage : "list"
          })
        }}
      >
        Home Button
      </Button>
      <h2>Pokedex Project</h2>
      {pokedexState.userHaveAnError
        ? <p>{pokedexState.errorMessage}</p>
        : null
      }
      {pokedexState.allpokedex && pokedexState.contentPage == "list"
        ? <PokedexList pokedexState={pokedexState} setPokedexState={setPokedexState} />
        : null
      }
      {pokedexState.pokedexEntries && pokedexState.contentPage == "entries"
        ? <PokemonList pokedexEntries={pokedexState.pokedexEntries}
          onViewDetailsClick={onViewDetailsClick}
          back= {back} />
        : null
      }
      {pokedexState.selectedPokemon && pokedexState.contentPage == "pokemon"
        ? <Pokemon name={pokedexState.selectedPokemon} 
        back= {back}/>
        : null
      }
    </div>
  )
}
export default Pokedex;