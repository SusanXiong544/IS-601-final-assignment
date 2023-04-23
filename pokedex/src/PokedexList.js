import React, {useState} from "react";

const PokedexWrapper = require("pokeapi-js-wrapper")
const P = new PokedexWrapper.Pokedex()
const PokedexList = (props) => {
    const initialListState = {
        userHaveAnError: false,
        errorMessage: null,
        // Made the same state in pokemon from userhave an error and errormessage
    }
    const [pokedexListState, setPokedexListState] = useState(initialListState);
    
    const onViewClick = (name) => {
        const pokemon_entries = P.getPokedexByName(name).then(function(response) {
          console.log(response.pokemon_entries)
          return response.pokemon_entries
        })
        .then((pokemon_entries)=>{
          props.setPokedexState({
            ...props.pokedexState,
            selectedPokedex : name,
            pokedexEntries : pokemon_entries, 
            contentPage : "entries"
          });
        })
        .catch((error)=> {
            setPokedexListState({
              ...pokedexListState,
              userHaveAnError: true,
              errorMessage: error.errorMessage,
            }); 
        });
      }
    const pokedexList = 
      props.pokedexState.allpokedex 
      ? props.pokedexState.allpokedex.map((pokedex, index) => 
        <div>
          {pokedex.name}
          <button key={index} onClick={() => onViewClick(pokedex.name)}>view</button>
        </div>) 
      : null;
    return (
      <div>
        {pokedexListState.userHaveAnError 
        ? <p>{pokedexListState.errorMessage}</p>
        : pokedexList}
      </div>
    )
}
export default PokedexList;