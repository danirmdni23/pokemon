import './assets/tailwind.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

const app = createApp(App);
app.use(router);
// Filter untuk mengkapitalisasi teks
app.config.globalProperties.$filters = {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
};
app.mount('#app');
