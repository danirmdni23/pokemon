import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Pokemon from '../components/Pokemon.vue';

describe('Pokemon.vue', () => {

  it('fetches and renders Pokémon data', async () => {
    const wrapper = mount(Pokemon);
    await wrapper.vm.fetchPokemons();
    expect(wrapper.vm.pokemons.length).toBe(20);
  });
});
