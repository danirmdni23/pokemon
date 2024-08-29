import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Pokemon from '../../views/Pokemon.vue';
import PokemonApi from '../../apis/PokemonApi';
import { flushPromises } from '@vue/test-utils';
import { createRouterMock, injectRouterMock } from 'vue-router-mock';

// Buat mock router instance
const router = createRouterMock({
  spy: {
    create: fn => vi.fn(fn),
    reset: spy => spy.mockReset()
  }
});

injectRouterMock(router);

vi.mock('../../apis/PokemonApi.js');

describe('Pokemon.vue', () => {

  it('fetches and renders Pokémon data', async () => {
    mockSuccess()
    const wrapper = mount(Pokemon);
    wrapper.vm.fetchPokemons()
    await flushPromises();
    expect(wrapper.vm.pokemons.length).toBe(20);
  });

  it('handles error when fetching Pokémon data', async () => {
    mockError();
    const wrapper = mount(Pokemon);
    wrapper.vm.fetchPokemons();
    await flushPromises();
    expect(wrapper.text()).toContain('Error')
    expect(wrapper.vm.pokemons.length).toBe(0); // Assuming no Pokémon data is fetched on error
  });

});


function mockSuccess() {
  PokemonApi.get.mockResolvedValue({
    data: {
      "count": 1302,
      "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20",
      "previous": null,
      "results": [
        {
          "name": "bulbasaur",
          "url": "https://pokeapi.co/api/v2/pokemon/1/"
        },
        {
          "name": "ivysaur",
          "url": "https://pokeapi.co/api/v2/pokemon/2/"
        },
        {
          "name": "venusaur",
          "url": "https://pokeapi.co/api/v2/pokemon/3/"
        },
        {
          "name": "charmander",
          "url": "https://pokeapi.co/api/v2/pokemon/4/"
        },
        {
          "name": "charmeleon",
          "url": "https://pokeapi.co/api/v2/pokemon/5/"
        },
        {
          "name": "charizard",
          "url": "https://pokeapi.co/api/v2/pokemon/6/"
        },
        {
          "name": "squirtle",
          "url": "https://pokeapi.co/api/v2/pokemon/7/"
        },
        {
          "name": "wartortle",
          "url": "https://pokeapi.co/api/v2/pokemon/8/"
        },
        {
          "name": "blastoise",
          "url": "https://pokeapi.co/api/v2/pokemon/9/"
        },
        {
          "name": "caterpie",
          "url": "https://pokeapi.co/api/v2/pokemon/10/"
        },
        {
          "name": "metapod",
          "url": "https://pokeapi.co/api/v2/pokemon/11/"
        },
        {
          "name": "butterfree",
          "url": "https://pokeapi.co/api/v2/pokemon/12/"
        },
        {
          "name": "weedle",
          "url": "https://pokeapi.co/api/v2/pokemon/13/"
        },
        {
          "name": "kakuna",
          "url": "https://pokeapi.co/api/v2/pokemon/14/"
        },
        {
          "name": "beedrill",
          "url": "https://pokeapi.co/api/v2/pokemon/15/"
        },
        {
          "name": "pidgey",
          "url": "https://pokeapi.co/api/v2/pokemon/16/"
        },
        {
          "name": "pidgeotto",
          "url": "https://pokeapi.co/api/v2/pokemon/17/"
        },
        {
          "name": "pidgeot",
          "url": "https://pokeapi.co/api/v2/pokemon/18/"
        },
        {
          "name": "rattata",
          "url": "https://pokeapi.co/api/v2/pokemon/19/"
        },
        {
          "name": "raticate",
          "url": "https://pokeapi.co/api/v2/pokemon/20/"
        }
      ]
    }
  })
}

function mockError() {
  PokemonApi.get.mockRejectedValue(new Error('Failed to fetch Pokémon data'));
}

