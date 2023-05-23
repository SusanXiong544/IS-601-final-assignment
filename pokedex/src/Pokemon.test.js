import { render, screen } from '@testing-library/react';
import { Pokedex } from "pokeapi-js-wrapper";
import Pokemon from './Pokemon';

jest.mock('pokeapi-js-wrapper');

beforeEach(() => {
    Pokedex.mockReturnValue({
        getPokemonByName: jest.fn().mockResolvedValue(
            {
                "abilities": [
                    {
                        "ability": {
                            "name": "torrent",
                            "url": "https://pokeapi.co/api/v2/ability/67/"
                        },
                        "is_hidden": false,
                        "slot": 1
                    },
                    {
                        "ability": {
                            "name": "damp",
                            "url": "https://pokeapi.co/api/v2/ability/6/"
                        },
                        "is_hidden": true,
                        "slot": 3
                    }
                ],
                "id": 258,
                "name": "mudkip",
                "species": {
                    "name": "mudkip",
                    "url": "https://pokeapi.co/api/v2/pokemon-species/258/"
                },
                "sprites": {
                    "front_default": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/258.png",
                },
                "stats": [
                    {
                        "base_stat": 50,
                        "effort": 0,
                        "stat": {
                            "name": "hp",
                            "url": "https://pokeapi.co/api/v2/stat/1/"
                        }
                    },
                    {
                        "base_stat": 70,
                        "effort": 1,
                        "stat": {
                            "name": "attack",
                            "url": "https://pokeapi.co/api/v2/stat/2/"
                        }
                    },
                    {
                        "base_stat": 50,
                        "effort": 0,
                        "stat": {
                            "name": "defense",
                            "url": "https://pokeapi.co/api/v2/stat/3/"
                        }
                    },
                    {
                        "base_stat": 50,
                        "effort": 0,
                        "stat": {
                            "name": "special-attack",
                            "url": "https://pokeapi.co/api/v2/stat/4/"
                        }
                    },
                    {
                        "base_stat": 50,
                        "effort": 0,
                        "stat": {
                            "name": "special-defense",
                            "url": "https://pokeapi.co/api/v2/stat/5/"
                        }
                    },
                    {
                        "base_stat": 40,
                        "effort": 0,
                        "stat": {
                            "name": "speed",
                            "url": "https://pokeapi.co/api/v2/stat/6/"
                        }
                    }
                ],
                "types": [
                    {
                        "slot": 1,
                        "type": {
                            "name": "water",
                            "url": "https://pokeapi.co/api/v2/type/11/"
                        }
                    }
                ],
            }
        )
    })
})



afterEach(() => {
    jest.clearAllMocks();
});

test('return Pokemon details that render on the page', async () => {
    render(
        <Pokemon name='mudkip' back={jest.fn()} />,
    );

    const sprites_image = await screen.findByAltText('mudkip')
    expect(sprites_image).toBeInTheDocument();
    const pokemon = await screen.findByText('mudkip')
    expect(pokemon).toBeInTheDocument();
    const abilities1 = await screen.findByText('damp')
    expect(abilities1).toBeInTheDocument();
    const abilities2 = await screen.findByText('torrent')
    expect(abilities2).toBeInTheDocument();
    const types = await screen.findByText('water')
    expect(types).toBeInTheDocument();
    const stat1 = await screen.findByText('hp: 50')
    expect(stat1).toBeInTheDocument();
    const stat2 = await screen.findByText('attack: 70')
    expect(stat2).toBeInTheDocument();
    const stat3 = await screen.findByText('defense: 50')
    expect(stat3).toBeInTheDocument();
    const stat4 = await screen.findByText('special-attack: 50')
    expect(stat4).toBeInTheDocument();
    const stat5 = await screen.findByText('special-defense: 50')
    expect(stat5).toBeInTheDocument();
    const stat6 = await screen.findByText('speed: 40')
    expect(stat6).toBeInTheDocument();
});


