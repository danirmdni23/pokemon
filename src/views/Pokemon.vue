<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-200">
    <div
      class="flex justify-between items-center sticky top-0 z-30 bg-slate-200/75 px-8 py-4 lg:px-20 shadow-sm w-full">
      <a href="/" class="router-link-active"><img src="https://pokedex-vert-one.vercel.app/okemon.png" alt="pokemon"
          class="h-10 w-30 lg:px-4"></a>
      <div>
        <button @click="toggleModal">
          <p
            class="px-3 py-2 lg:px-5 lg:py-2 bg-white flex justify-center items-center rounded-full shadow-lg cursor-pointer">
            <span class="mr-2 text-sm" v-if="pokemon.name, pokemon.id, pokemon.image">{{ pokemon.name.length }}
              cacth</span>
            <span class="mr-2 text-sm" v-else>0 cacth</span>
            <img src="https://pokedex-vert-one.vercel.app/bola.png" alt="" class="w-4 h-4 lg:w-5 lg:h-5">
          </p>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-9/12 mt-20">
      <div v-for="(pokemon, index) in pokemons" :key="pokemon.name"
        class="card w-64 bg-white shadow-xl rounded-xl mb-6">
        <router-link :to="`/detail/${index + 1}`"
          class="rounded-xl bg-white w-full p-10 py-10 relative flex items-center justify-between mb-4 transition ease-in-out hover:-translate-y-2.5 duration-300">
          <div>
            <p>{{ (index + 1).toString().padStart(4, '0') }}</p>
            <div class="rounded-lg text-slate-900 font-bold text-2xl hover:text-blue-500  cursor-pointer capitalize">
              {{ pokemon.name }}</div>
          </div>
          <div class="absolute z-5 -top-16 -right-12">
            <img :src="getPokemonImage(pokemon.url)" alt="pokemon" class="w-36 h-auto">
          </div>
        </router-link>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <PokemonModal :pokemon="pokemon" />
  </Teleport>
</template>


<script setup>

import axios from 'axios';
import { ref, onMounted, reactive } from 'vue';
import PokemonModal from '../components/PokemonModal.vue';
import { toggleModal } from '../helpers/modal';

const pokemon = reactive({
  name: '',
  id: '',
  image: ''
})
const pokemons = ref(null);

async function fetchPokemons() {
  try {
    const response = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
    );
    pokemons.value = response.data.results;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
  }
}

function getPokemonImage(url) {
  const id = url.split('/').filter(Boolean).pop();
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork//${id}.png`;
}

async function getCatchPokemon() {
  try {
    // Ambil data dari localStorage saat komponen dimuat
    let namaPokemon = localStorage.getItem("pokemonName");
    let idPokemon = localStorage.getItem("pokemonId");
    let gambarPokemon = localStorage.getItem("pokemonImg");

    // Jika ada data, parsing dan simpan di data property
    if (namaPokemon) {
      pokemon.name = JSON.parse(namaPokemon);
    }
    if (idPokemon) {
      pokemon.id = JSON.parse(idPokemon);
    }
    if (gambarPokemon) {
      pokemon.image = JSON.parse(gambarPokemon);
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
};

onMounted(() => {
  getCatchPokemon();
  fetchPokemons();
})
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-10px);
}
</style>
