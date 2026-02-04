import { createApp } from "vue";
import App from "./App.vue";
import './assets/css/style.css';
import PrimeVue from "primevue/config";
import Lara from "@primevue/themes/lara";

// ÍCONES
import "boxicons/css/boxicons.min.css";

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Lara,
    options: {
      darkModeSelector: false, // 🔒 DESATIVA DARK MODE
    },
  },
});

app.mount("#app");
