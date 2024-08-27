<template>
<div class="min-h-screen flex flex-col items-center bg-gray-200">
  <div class="flex justify-between items-center sticky top-0 z-30 bg-slate-200/75 px-8 py-4 lg:px-20 shadow-sm w-full">
      <a href="/" class="router-link-active"><img src="https://pokedex-vert-one.vercel.app/okemon.png" alt="pokemon" class="h-10 w-30 lg:px-4"></a>
      <div>
          <button @click="toggleModal">
              <p class="px-3 py-2 lg:px-5 lg:py-2 bg-white flex justify-center items-center rounded-full shadow-lg cursor-pointer">
                  <span class="mr-2 text-sm">{{pCatchName.length}} cacth</span>
                  <img src="https://pokedex-vert-one.vercel.app/bola.png" alt="" class="w-4 h-4 lg:w-5 lg:h-5">
              </p>
          </button>
      </div>
  </div>
  <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
  <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-900 opacity-75" />
    </div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
    <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
      <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <button @click="toggleModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><img src="https://pokedex-vert-one.vercel.app/assets/tomX-b69bda6f.svg" alt=""></button>
        <div class="flex justify-center items-center px-2 py-2 lg:px-4 lg:py-7">
          <div class="w-full">
            <div class="flex justify-center items-center">
              <h4 class="lg:text-2xl text-lg font-bold text-slate-700">{{pCatchName.length}} Pokemon </h4>
            </div>
            <div class="overflow-y-auto no-scrollbar h-52 lg:h-80 lg:mt-5 mt-2 sm:mt-3 w-full justify-center items-center">
              <div class="bg-slate-300 my-2 rounded-lg flex w-full px-4 py-2 gap-2" style="background-color: #e2e8f0bf;" v-if="pCatchName" v-for="(pcn, index) in pCatchName" :key="pcn">
                <div>
                  <img :src="`${pCatchImg[index]}`" alt="pokemon" class="w-10 lg:w-20">
                </div>
                <div class="">
                  <p class="text-xs sm:text-sm lg:text-base">{{pCatchId[index].toString().padStart(4, '0')}}</p>
                  <h2 class="text-xs font-semibold sm:text-sm lg:text-xl">{{pcn}}</h2>
                </div>
              </div>
              <div class="text-center font-semibold text-lg text-gray-500" v-else> 
                Anda belum mempunyai pokemon yg di ambil silahkan cacth terlebih dahulu 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  <div class="flex flex-wrap mt-3 lg:mt-10" v-if="pokemon">
      <div class="w-full lg:px-2 md:w-1/2">
          <h4 class="text-medium flex justify-center font-semibold"> #{{ (pokemon.id).toString().padStart(4, '0') }}</h4>
          <div>
              <h1 class="text-3xl font-bold tracking-widest capitalize text-center w-full">{{ pokemon.name }}</h1>
          </div>
          <img :src="pokemon.sprites.other.dream_world.front_default" :alt="pokemon.name" class="w-full mx-auto sm:w-72 mt-10 mb-10">
          <button class="bg-white py-2 lg:py-1 lg:px-7 px-10 mx-auto flex rounded-3xl items-center justify-center hover:bg-yellow-400 mt-4">
              <img src="https://pokedex-vert-one.vercel.app/bola.png" alt="" class="w-8 mr-3 animate-bounce">
              <button @click="catchPokemon" class="capitalize text-sm font-semibold">Catch {{pokemon.name}}</button>
          </button>
      </div>
      <div class="w-full lg:px-4 md:w-1/2 md:mt-10 lg:mt-3">
          <div class="bg-white rounded-xl w-full md:w-96 my-10 lg:mt-0 px-4 py-10" data-controller="tabs" data-tabs-index-value="0">
              <div class="bg-white shadow-lg mb-10 py-2 grid grid-cols-3 rounded-full px-2">
                  <button class="bg-yellow-400 px-3 py-2 rounded-full bg-white" data-action="click->tabs#change" data-tabs-target="tab"> About </button>
                  <button class="px-3 py-2 rounded-full bg-white" data-action="click->tabs#change" data-tabs-target="tab"> Stats </button>
                  <button class="px-3 py-2 rounded-full bg-white" data-action="click->tabs#change" data-tabs-target="tab"> Moves </button>
              </div>
              <div class="flex justify-center items-center">
                  <div class="grid gap-y-3 gap-x-2 px-6" data-tabs-target="panel">
                      <div class="grid grid-cols-2">
                          <p class="font-semibold">Types</p>
                          <div class="flex">
                              <span v-for="type in pokemon.types" :key="type.type.name" class="px-1 py-1 w-20 rounded-md flex mr-1 font-semibold justify-center items-center bg-green-400">{{ type.type.name }}</span>
                          </div>
                      </div>
                      <div class="grid grid-cols-2">
                          <p class="font-semibold">Height</p>
                          <p class="font-base">{{ pokemon.height }} (m)</p>
                      </div>
                      <div class="grid grid-cols-2">
                          <p class="font-semibold">Weight</p>
                          <p>{{ pokemon.weight }} (kg)</p>
                      </div>
                      <div class="grid grid-cols-2">
                          <p class="font-semibold">Abilities</p>
                          <div class="flex flex-col">
                              <span v-for="ability in pokemon.abilities" :key="ability.ability.name" class="px-3 py-1 bg-yellow-200 rounded-lg flex font-semibold justify-center items-center mt-1">{{ ability.ability.name }}</span>
                          </div>
                      </div>
                      <div class="grid grid-cols-2">
                          <p class="font-semibold">Experience</p>
                          <p>{{pokemon.base_experience}} (experience)</p>
                      </div>
                  </div>
                  <div class="hidden w-full overflow-y-scroll h-60 px-4" data-tabs-target="panel">
                    <div class="space-y-3" v-for="stat in pokemon.stats" :key="stat.stat.name">
                        <div class="flex justify-between items-center mt-3">
                            <div class="flex items-center">
                                <img :src="`https://pokedex-vert-one.vercel.app/stats/${stat.stat.name}.png`" alt="" class="w-4">
                                <span class="ml-1 capitalize font-semibold">{{stat.stat.name}}</span>
                            </div>
                            <div class="font-semibold">{{stat.base_stat}}</div>
                        </div>
                        <div class="flex w-full h-2 bg-red-200 rounded-full">
                            <div class="h-full bg-yellow-500 rounded-full" :style="`width: ${stat.base_stat}%;`"></div>
                        </div>
                    </div>
                  </div>
                  <div class="hidden flex flex-wrap overflow-y-scroll h-60 px-4" data-tabs-target="panel">
                    <div class="w-1/2 lg:w-1/3 border border-dashed border-slate-300 rounded-md px-1 py-3 flex justify-center items-center my-1" v-for="move in pokemon.moves" :key="move.move.name">
                        <div class="text-sm">{{move.move.name}}</div>
                    </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router'; 

const pokemon = ref(null);
const caught = ref(false);
const pCatchName = ref(null);
const pCatchId = ref(null);
const pCatchImg = ref(null);

const route = useRoute();
const pokemonId = route.params.id; 

const fetchPokemon = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
    pokemon.value = await response.json();

    const storedPokemon = localStorage.getItem('pokemonName');
    if (storedPokemon && JSON.parse(storedPokemon).name === pokemon.value.name) {
      caught.value = true;
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
};

const getCatchPokemon = async () => {
  try {
    // Ambil data dari localStorage saat komponen dimuat
    let namaPokemon   = localStorage.getItem("pokemonName");
    let idPokemon     = localStorage.getItem("pokemonId");
    let gambarPokemon = localStorage.getItem("pokemonImg");

    // Jika ada data, parsing dan simpan di data property
    if (namaPokemon) {
      pCatchName.value = JSON.parse(namaPokemon);
    }
    if(idPokemon) {
      pCatchId.value = JSON.parse(idPokemon);
    }
    if(gambarPokemon) {
      pCatchImg.value = JSON.parse(gambarPokemon);
    }
  } catch (error) {
    console.error("Error fetching Pokémon:", error);
  }
};

const catchPokemon = () => {
  caught.value = true;
  // pokemon name
  let pn = localStorage.getItem("pokemonName");
  pn = pn ? JSON.parse(pn) : [];
  pn.push(pokemon.value.name);
  // pokemon id
  let pid = localStorage.getItem("pokemonId");
  pid = pid ? JSON.parse(pid) : [];
  pid.push(pokemonId);
  // pokemon image
  let pimg = localStorage.getItem("pokemonImg");
  pimg = pimg ? JSON.parse(pimg) : [];
  pimg.push(pokemon.value.sprites.other.dream_world.front_default);
  localStorage.setItem('pokemonName', JSON.stringify(pn));
  localStorage.setItem('pokemonId', JSON.stringify(pid));
  localStorage.setItem('pokemonImg', JSON.stringify(pimg));
};

onMounted(fetchPokemon);
onMounted(getCatchPokemon);

// Tabs
  import { Application, Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js"
  window.Stimulus = Application.start()

  Stimulus.register("tabs", class extends Controller {
    static targets = [ "tab", "panel" ]
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
// Modal
  const toggleModal = () => {
    document.getElementById('modal').classList.toggle('hidden')
  }
// End Modal
</script>

<style>
img {
  max-width: 200px;
  height: auto;
}
</style>
