import { createRouter, createWebHistory } from 'vue-router';
import App from '../components/Pokemon.vue';
import PokemonDetail from '../components/PokemonDetail.vue';


const routes = [
    { path: '/', component: App },
    { path: '/detail/:id', name: 'PokemonDetail', component: PokemonDetail, props: true }
];
  
  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  export default router;
