import { createRouter, createWebHistory } from 'vue-router';
import Pokemon from '../views/Pokemon.vue';
import PokemonDetail from '../views/PokemonDetail.vue';


const routes = [
  { path: '/', component: Pokemon },
  { path: '/detail/:id', name: 'PokemonDetail', component: PokemonDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
