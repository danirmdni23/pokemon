import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../App.vue';

describe('App.vue', () => {
  it('renders Pokédex title', () => {
    const wrapper = mount(App);
    expect(wrapper.html()).toContain('Pokédex');
  });

  it('fetches and renders Pokémon data', async () => {
    const wrapper = mount(App);
    await wrapper.vm.fetchPokemons();
    expect(wrapper.vm.pokemons.length).toBe(20);
  });
});
