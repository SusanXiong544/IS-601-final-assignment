import { render, screen } from '@testing-library/react';
import { Pokedex } from "pokeapi-js-wrapper";
import PokemonListComponent from './PokemonList';

jest.mock('pokeapi-js-wrapper');

beforeEach(() => {
    Pokedex.mockReturnValue({
        getPokedexByName: jest.fn().mockResolvedValue({
            pokemon_entries: [{ pokemon_species: { name: 'pikachu' } }]
        })
    });
});



afterEach(() => {
    jest.clearAllMocks();
});

test('return list of Pokemon that render on the page', async () => {
    render(
        <PokemonListComponent pokedexName='national' onViewDetailsClick={jest.fn()} />,
    );

    const pokemonList = await screen.findByText('pikachu')
    expect(pokemonList).toBeInTheDocument();
});

