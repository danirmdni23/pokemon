<template>
  <div class="min-h-screen flex flex-col items-center bg-gray-200">
    <div class="flex justify-between items-center sticky top-0 z-30 bg-slate-200/75 px-8 py-4 lg:px-20 shadow-sm w-full">
      <a href="/" class="router-link-active"><img src="https://pokedex-vert-one.vercel.app/okemon.png" alt="pokemon" class="h-10 w-30 lg:px-4"></a>
      <div>
          <button @click="toggleModal">
              <p class="px-3 py-2 lg:px-5 lg:py-2 bg-white flex justify-center items-center rounded-full shadow-lg cursor-pointer">
                  <span class="mr-2 text-sm" v-if="pCatchName, pCatchId, pCatchImg">{{pCatchName.length}} cacth</span>
                  <span class="mr-2 text-sm" v-else>0 cacth</span>
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
              <h4 class="lg:text-2xl text-lg font-bold text-slate-700" v-if="pCatchName, pCatchId, pCatchImg">{{pCatchName.length}} Pokemon </h4>
              <h4 class="lg:text-2xl text-lg font-bold text-slate-700" v-else>0 Pokemon </h4>
            </div>
            <div class="overflow-y-auto no-scrollbar h-52 lg:h-80 lg:mt-5 mt-2 sm:mt-3 w-full justify-center items-center">
              <div class="bg-slate-300 my-2 rounded-lg flex w-full px-4 py-2 gap-2" style="background-color: #e2e8f0bf;" v-if="pCatchName, pCatchId, pCatchImg" v-for="(pcn, index) in pCatchName" :key="pcn">
                <div>
                  <img :src="`${pCatchImg[index]}`" alt="pokemon" class="w-10 lg:w-20">
                </div>
                <div class="">
                  <p class="text-xs sm:text-sm lg:text-base">{{pCatchId[index].toString().padStart(4, '0')}}</p>
                  <h2 class="text-xs font-semibold sm:text-sm lg:text-xl">{{pcn}}</h2>
                </div>
              </div>
              <div class="text-center font-semibold text-lg text-gray-500 mt-20" v-else> 
                Anda belum mempunyai pokemon yg di ambil silahkan cacth terlebih dahulu 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12 w-9/12 mt-20">
      <div
        v-for="(pokemon, index) in pokemons" 
        :key="pokemon.name"
        class="card w-64 bg-white shadow-xl rounded-xl mb-6"
      >
        <router-link :to="`/detail/${index + 1}`" class="rounded-xl bg-white w-full p-10 py-10 relative flex items-center justify-between mb-4 transition ease-in-out hover:-translate-y-2.5 duration-300">
            <div>
              <p>{{ (index + 1).toString().padStart(4, '0') }}</p>
              <div class="bg-primary rounded-lg text-slate-900 font-bold text-2xl hover:text-blue-500  cursor-pointer capitalize">{{ pokemon.name }}</div>
            </div>
            <div class="absolute z-5 -top-16 -right-12">
              <img :src="getPokemonImage(pokemon.url)" alt="pokemon" class="w-36 h-auto">
            </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  data() {
    return {
      pokemons: [],
    };
  },
  methods: {
    async fetchPokemons() {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
        );
        this.pokemons = response.data.results;
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    },
    getPokemonImage(url) {
      
      const id = url.split('/').filter(Boolean).pop();
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork//${id}.png`;
    },
  },
  created() {
    this.fetchPokemons();
  },
};
</script>

<script setup>
import { ref, onMounted } from 'vue';
const pCatchName = ref(null);
const pCatchId = ref(null);
const pCatchImg = ref(null);

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

onMounted(getCatchPokemon);
  // Modal
  const toggleModal = () => {
    document.getElementById('modal').classList.toggle('hidden')
  }
</script>

<style scoped>
.card {
  transition: transform 0.2s;
}
.card:hover {
  transform: translateY(-10px);
}
</style>
