import { createRouter, createWebHistory } from "vue-router";
import { createDiscreteApi } from "naive-ui";
import HomeView from "../views/HomeView.vue";

const { loadingBar } = createDiscreteApi(["loadingBar"]);

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      meta: {
        icon: "",
        showPath: false,
        isLink: false,
        link: "",
      },
    },
    {
      path: "/create",
      name: "CreateWallet",
      component: () => import("../views/CreateWallet.vue"),
      meta: {
        icon: "",
        showPath: true,
        isLink: false,
        link: "",
      },
    },
    {
      path: "/access",
      name: "AccessWallet",
      component: () => import("../views/AccessWallet.vue"),
      meta: {
        icon: "",
        showPath: true,
        isLink: false,
        link: "",
      },
    },
    {
      path: "/privatekey",
      name: "AccessPrivateKey",
      component: () => import("../views/access/AccessPrivateKey.vue"),
      meta: {
        icon: "",
        showPath: false,
        isLink: false,
        link: "",
      },
    },
    {
      path: "/mnemonic",
      name: "Mnemonic",
      component: () => import("../views/access/AccessMnemonic.vue"),
      meta: {
        icon: "",
        showPath: false,
        isLink: false,
        link: "",
      },
    },
    {
      path: "/keystore",
      name: "Keystore",
      component: () => import("../views/access/AccessKeystore.vue"),
      meta: {
        icon: "",
        showPath: false,
        isLink: false,
        link: "",
      },
    },
    {
      path: "/wallet",
      name: "Wallet",
      component: () => import("../views/WalletAssets.vue"),
      meta: {
        icon: "",
        showPath: false,
        isLink: false,
        link: "",
      },
    },
    {
      meta: {
        icon: "",
        showPath: false,
      },
      path: "/:pathMatch(.*)",
      redirect: "/",
    },
  ],
});

router.beforeEach((to, from, next) => {
  loadingBar.start();
  next();
});
router.afterEach(() => {
  loadingBar.finish();
});
export default router;
