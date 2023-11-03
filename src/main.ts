import { Buffer } from "buffer";
window.Buffer = Buffer;

import { createApp } from "vue";
// import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import pinia from "./stores/index";
import * as utils from "./helpers/util";

import "./assets/css/index.scss";

const app = createApp(App);

// app.use(createPinia());
app.use(pinia);
app.use(router);
app.use(i18n);

Object.entries(utils).forEach((item) => {
  app.config.globalProperties[`$${item[0]}`] = item[1];
});

app.mount("#app");
