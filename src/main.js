import { createApp } from "vue";
import Toast from "vue-toastification";
import App from "./App.vue";
import router from "./router";
import "./index.css";
import 'vue-toastification/dist/index.css';

const toastOptions = {
  position: "bottom-center",
  timeout: 3000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false,
};

createApp(App)
  .use(router)
  .use(Toast, toastOptions)
  .mount("#app");
