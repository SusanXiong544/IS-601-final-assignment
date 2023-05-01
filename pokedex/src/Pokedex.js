import React, { useState, useEffect } from "react";

const PokedexWrapper = require("pokeapi-js-wrapper")
const P = new PokedexWrapper.Pokedex()
const PokedexComponent = (props) => {
  const initialpokedex = {
    allpokedex: []
  }
  // put into pokedexlist 
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
  }, []);
  
  return (
    <div>
      {pokedexState.userHaveAnError
        ? <p>{pokedexState.errorMessage}</p>
        : null
      }
      {
        pokedexState.allpokedex && !pokedexState.userHaveAnError
          ? pokedexState.allpokedex.map((pokedex, index) =>
            <div>
              {pokedex.name}
              <button key={index} onClick={() => props.onViewClick(pokedex.name)}>view</button>
            </div>)
          : null
      }
      
    </div>
  )
}
export default PokedexComponent;