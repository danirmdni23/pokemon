<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-200">
    <div class="flex justify-between items-center sticky top-0 bg-gray-200 px-8 py-4 lg:px-20 shadow-sm w-full">
      <a href="/" class="router-link-active"><img src="https://pokedex-vert-one.vercel.app/okemon.png" alt="pokemon"
          class="h-10 w-30 lg:px-4"></a>
      <div>
        <button @click="toggleModal">
          <p
            class="px-3 py-2 lg:px-5 lg:py-2 bg-white flex justify-center items-center rounded-full shadow-lg cursor-pointer">
            <span class="mr-2 text-sm" v-if="pokemon.name, pokemon.id, pokemon.image" data-test="result-pokemon">{{
              pokemon.name.length }}
              cacth</span>
            <span class="mr-2 text-sm" v-else>0 cacth</span>
            <img src="https://pokedex-vert-one.vercel.app/bola.png" alt="" class="w-4 h-4 lg:w-5 lg:h-5">
          </p>
        </button>
      </div>
    </div>
    <div class="flex flex-wrap mt-3 lg:mt-10" v-if="pokemons">
      <div class="w-full lg:px-2 md:w-1/2">
        <h4 class="text-medium flex justify-center font-semibold"> #{{ (pokemons.id).toString().padStart(4, '0') }}</h4>
        <div>
          <h1 class="text-3xl font-bold tracking-widest capitalize text-center w-full" data-test="pokemon-name">{{
            pokemons.name }}</h1>
        </div>
        <img :src="pokemons.sprites.other.dream_world.front_default" :alt="pokemon.name"
          class="w-full mx-auto sm:w-72 mt-10 mb-10">
        <button
          class="bg-white py-2 lg:py-1 lg:px-7 px-10 mx-auto flex rounded-3xl items-center justify-center hover:bg-yellow-400 mt-4">
          <img src="https://pokedex-vert-one.vercel.app/bola.png" alt="" class="w-8 mr-3 animate-bounce">
          <button @click="catchPokemon" class="capitalize text-sm font-semibold" data-test="pokemon-catch">Catch {{
            pokemons.name }}</button>
        </button>
      </div>
      <div class="w-full lg:px-4 md:w-1/2 md:mt-10 lg:mt-3">
        <div class="bg-white rounded-xl w-full md:w-96 my-10 lg:mt-0 px-4 py-10" data-controller="tabs"
          data-tabs-index-value="0">
          <div class="bg-white shadow-lg mb-10 py-2 grid grid-cols-3 rounded-full px-2">
            <button class="bg-yellow-400 px-3 py-2 rounded-full bg-white" data-action="click->tabs#change"
              data-tabs-target="tab"> About </button>
            <button class="px-3 py-2 rounded-full bg-white" data-action="click->tabs#change" data-tabs-target="tab">
              Stats </button>
            <button class="px-3 py-2 rounded-full bg-white" data-action="click->tabs#change" data-tabs-target="tab">
              Moves </button>
          </div>
          <div class="flex justify-center items-center">
            <div class="grid gap-y-3 gap-x-2 px-6" data-tabs-target="panel">
              <div class="grid grid-cols-2">
                <p class="font-semibold">Types</p>
                <div class="flex">
                  <span v-for="type in pokemons.types" :key="type.type.name"
                    class="px-1 py-1 w-20 rounded-md flex mr-1 font-semibold justify-center items-center bg-green-400">{{
                      type.type.name }}</span>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <p class="font-semibold">Height</p>
                <p class="font-base">{{ pokemons.height }} (m)</p>
              </div>
              <div class="grid grid-cols-2">
                <p class="font-semibold">Weight</p>
                <p>{{ pokemons.weight }} (kg)</p>
              </div>
              <div class="grid grid-cols-2">
                <p class="font-semibold">Abilities</p>
                <div class="flex flex-col">
                  <span v-for="ability in pokemons.abilities" :key="ability.ability.name"
                    class="px-3 py-1 bg-yellow-200 rounded-lg flex font-semibold justify-center items-center mt-1">{{
                      ability.ability.name }}</span>
                </div>
              </div>
              <div class="grid grid-cols-2">
                <p class="font-semibold">Experience</p>
                <p>{{ pokemons.base_experience }} (experience)</p>
              </div>
            </div>
            <div class="hidden w-full overflow-y-scroll h-60 px-4" data-tabs-target="panel">
              <div class="space-y-3" v-for="stat in pokemons.stats" :key="stat.stat.name">
                <div class="flex justify-between items-center mt-3">
                  <div class="flex items-center">
                    <img :src="`https://pokedex-vert-one.vercel.app/stats/${stat.stat.name}.png`" alt="" class="w-4">
                    <span class="ml-1 capitalize font-semibold">{{ stat.stat.name }}</span>
                  </div>
                  <div class="font-semibold">{{ stat.base_stat }}</div>
                </div>
                <div class="flex w-full h-2 bg-red-200 rounded-full">
                  <div class="h-full bg-yellow-500 rounded-full" :style="`width: ${stat.base_stat}%;`"></div>
                </div>
              </div>
            </div>
            <div class="hidden flex flex-wrap overflow-y-scroll h-60 px-4" data-tabs-target="panel">
              <div
                class="w-1/2 lg:w-1/3 border border-dashed border-slate-300 rounded-md px-1 py-3 flex justify-center items-center my-1"
                v-for="move in pokemons.moves" :key="move.move.name">
                <div class="text-sm">{{ move.move.name }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Error</p>
    </div>
  </div>
  <Teleport to="body">
    <PokemonModal :pokemon="pokemon" />
  </Teleport>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import PokemonModal from '../components/PokemonModal.vue';
import { toggleModal } from '../helpers/modal';
import detailApi from '../apis/PokemonDetailApi';

const pokemons = ref(null);
const caught = ref(false);
const pokemon = reactive({
  name: '',
  id: '',
  image: ''
})

const route = useRoute();
const pokemonId = route.params.id;

async function fetchPokemon() {
  try {
    const response = await detailApi.get(pokemonId);
    console.log(response, 'response')
    pokemons.value = response.data;

    const storedPokemon = localStorage.getItem('pokemonName');
    if (storedPokemon && JSON.parse(storedPokemon).name === pokemons.value.name) {
      caught.value = true;
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
};

async function getCatchPokemon() {
  try {
    // Ambil data dari localStorage saat komponen dimuat
    let namaPokemon = localStorage.getItem("pokemonName");
    let idPokemon = localStorage.getItem("pokemonId");
    let gambarPokemon = localStorage.getItem("pokemonImg");
    console.log(namaPokemon, 'namaaa')
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

async function catchPokemon() {
  caught.value = true;
  // pokemon name
  let pn = localStorage.getItem("pokemonName");
  pn = pn ? JSON.parse(pn) : [];
  if (!pn.includes(pokemons.value.name)) {
    pn.push(pokemons.value.name);
  }
  // pokemon id
  let pid = localStorage.getItem("pokemonId");
  pid = pid ? JSON.parse(pid) : [];
  if (!pid.includes(pokemonId)) {
    pid.push(pokemonId);
  }
  // pokemon image
  let pimg = localStorage.getItem("pokemonImg");
  pimg = pimg ? JSON.parse(pimg) : [];
  if (!pimg.includes(pokemons.value.sprites.other.dream_world.front_default)) {
    pimg.push(pokemons.value.sprites.other.dream_world.front_default);
  }
  localStorage.setItem('pokemonName', JSON.stringify(pn));
  localStorage.setItem('pokemonId', JSON.stringify(pid));
  localStorage.setItem('pokemonImg', JSON.stringify(pimg));
  pokemon.name = JSON.parse(localStorage.getItem("pokemonName"));
  pokemon.id = JSON.parse(localStorage.getItem("pokemonId"));
  pokemon.image = JSON.parse(localStorage.getItem("pokemonImg"));
};

// Tabs
import { Application, Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"
window.Stimulus = Application.start()

Stimulus.register("tabs", class extends Controller {
  static targets = ["tab", "panel"]
  static values = { index: Number }

  initialize() {
    this.showTab()
  }

  change(event) {
    event.preventDefault()
    this.indexValue = this.tabTargets.indexOf(event.currentTarget)
    this.showTab()
  }

  showTab() {
    this.panelTargets.forEach((el, index) => {
      index == this.indexValue ? el.classList.remove("hidden") : el.classList.add("hidden")
    })
    this.tabTargets.forEach((el, index) => {
      index == this.indexValue ? el.classList.add("bg-yellow-400") : el.classList.remove("bg-yellow-400")
    })
  }
})
// End Tabs

onMounted(() => {
  fetchPokemon();
  getCatchPokemon();
})

</script>

<style>
img {
  max-width: 200px;
  height: auto;
}
</style>