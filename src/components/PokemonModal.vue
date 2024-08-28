<template>
    <div class="fixed z-10 overflow-y-auto top-0 w-full left-0 hidden" id="modal">
        <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-900 opacity-75" />
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div class="inline-block align-center bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <button @click="toggleModal" class="absolute top-4 right-4 text-gray-500 hover:text-gray-800"><img
                            src="https://pokedex-vert-one.vercel.app/assets/tomX-b69bda6f.svg" alt=""></button>
                    <div class="flex justify-center items-center px-2 py-2 lg:px-4 lg:py-7">
                        <div class="w-full">
                            <div class="flex justify-center items-center">
                                <h4 class="lg:text-2xl text-lg font-bold text-slate-700"
                                    v-if="pokemon.name, pokemon.id, pokemon.image">
                                    {{ pokemon.name.length }} Pokemon </h4>
                                <h4 class="lg:text-2xl text-lg font-bold text-slate-700" v-else>0 Pokemon </h4>
                            </div>
                            <div
                                class="overflow-y-auto no-scrollbar h-52 lg:h-80 lg:mt-5 mt-2 sm:mt-3 w-full justify-center items-center">
                                <div class="bg-slate-300 my-2 rounded-lg flex w-full px-4 py-2 gap-2"
                                    style="background-color: #e2e8f0bf;" v-if="pokemon.name, pokemon.id, pokemon.image"
                                    v-for="(pcn, index) in pokemon.name" :key="pcn">
                                    <div>
                                        <img :src="`${pokemon.image[index]}`" alt="pokemon" class="w-10 lg:w-20">
                                    </div>
                                    <div class="">
                                        <p class="text-xs sm:text-sm lg:text-base">{{
                                            pokemon.id[index].toString().padStart(4, '0') }}</p>
                                        <h2 class="text-xs font-semibold sm:text-sm lg:text-xl">{{ pcn }}</h2>
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
</template>

<script setup>
import { toggleModal } from '../helpers/modal';
const props = defineProps({
    pokemon: {
        type: Object,
        default: () => { }
    }
})
</script>