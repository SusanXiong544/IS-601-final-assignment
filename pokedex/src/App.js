import React, { useState } from 'react';
import PokedexComponent from './Pokedex';
import Button from '@mui/material/Button';
import PokemonList from './PokemonList';
import Pokemon from './Pokemon';

function App() {
  const initialAppState = {
    selectedPokedex: null,
    selectedPokemon: null,
    contentPage: null
  };
  const [appState, setAppState] = useState(initialAppState);

  const onViewClick = (name) => {
    setAppState({
      ...appState,
      selectedPokedex: name,
      contentPage: "entries"
    });
  };

  const onViewDetailsClick = (name) => {
    setAppState({
      ...appState,
      selectedPokemon: name,
      contentPage: "pokemon"
    });
  };

  const backtolist = () => {
    setAppState({
      ...appState,
      contentPage: "list",
      selectedPokedex: null
    });
  };

  const backtoentries = () => {
    setAppState({
      ...appState,
      contentPage: "entries",
      selectedPokemon: null
    });
  }
  return (
    <div>
      <h2>Pokedex Project</h2>

      <Button
        onClick={() => {
          setAppState({
            ...appState,
            selectedPokemon: null,
            selectedPokedex: null,
            contentPage: "list"
          })
        }}
      >
        Home Button
      </Button>
      {!appState.selectedPokedex
        ? <PokedexComponent onViewClick={onViewClick} />
        : null}
      {appState.selectedPokedex && appState.contentPage === "entries"
        ? <PokemonList
          pokedexName={appState.selectedPokedex} onViewDetailsClick={onViewDetailsClick}
          back={backtolist} />
        : null
      }
      {appState.selectedPokemon && appState.contentPage === "pokemon"
        ? <Pokemon name={appState.selectedPokemon}
          back={backtoentries} />
        : null
      }
    </div>
  );
}

export default App;
