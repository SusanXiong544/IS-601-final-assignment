import { render, screen } from '@testing-library/react';
import { Pokedex } from "pokeapi-js-wrapper";
import PokedexComponent from "./Pokedex";

jest.mock('pokeapi-js-wrapper');

beforeEach(() => {
    Pokedex.mockReturnValue({
        resource: jest.fn().mockResolvedValue({
            results: [{ name: 'national' }]
        })
    })
})

afterEach(() => {
    jest.clearAllMocks();
})

test('return list of Pokedex that render on the page', async () => {
    render(
        <PokedexComponent onViewClick = {jest.fn()}  />,
      );
  
    const nationalPokedex = await screen.getByText('national');
  expect(nationalPokedex).toBeInTheDocument();
});
