import React, {useState,useEffect} from "react";
import PokedexList from "./PokedexList";
import PokemonList from "./PokemonList";
import Pokemon from "./Pokemon"
import Pokemonbutton from "./Pokemonbutton"
import Stack from '@mui/material/Stack';  
import Button from '@mui/material/Button';  

<Button
  onClick={() => {
    alert('clicked');
  }}
>
  Click me
</Button>


const PokedexWrapper = require("pokeapi-js-wrapper")
const P = new PokedexWrapper.Pokedex()
const Pokedex = (props) => {
    const initialpokedex = {
        allpokedex: [],
        selectedPokedex : null,
        selectedPokemon : null,
        pokedexEntries : [],
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
          ...initialpokedex,
          allpokedex: data.results
        });
      }
    
      // call the function
      fetchData()
        // make sure to catch any error
        .catch((error)=> {
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
        selectedPokemon : name
      })
    }
    return (
      <div>
        <h2>Pokedex List</h2>
        <p> selected Pokedex:{pokedexState.selectedPokedex?.name}</p>
        { pokedexState.userHaveAnError
        ? <p>{pokedexState.errorMessage}</p>
        : <PokedexList pokedexState = {pokedexState} setPokedexState = {setPokedexState}/>}
        {pokedexState.pokedexEntries 
        ? <PokemonList pokedexEntries = {pokedexState.pokedexEntries} 
          onViewDetailsClick = {onViewDetailsClick}/>
        : null}
        {pokedexState.selectedPokemon 
        ? <Pokemon name = {pokedexState.selectedPokemon} />
        : null}
      </div>
    )
}
export default Pokedex;