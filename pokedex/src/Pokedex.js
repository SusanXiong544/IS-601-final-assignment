import React, { useState, useEffect } from "react";

const PokedexWrapper = require("pokeapi-js-wrapper");
const PokedexComponent = (props) => {
  const initialpokedex = {
    allpokedex: []
  };
  const P = new PokedexWrapper.Pokedex()
  const [pokedexState, setPokedexState] = useState(initialpokedex);
  useEffect(() => {
    const fetchData = async () => {
      const data = await P.resource("/api/v2/pokedex");
      console.log(data)
      setPokedexState({
        ...pokedexState,
        allpokedex: data.results,
      });
    }
    fetchData()
      .catch((error) => {
        setPokedexState({
          ...pokedexState,
          userHaveAnError: true,
          errorMessage: error.errorMessage,
        });
      });
  }, [props.pokedexName]);

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