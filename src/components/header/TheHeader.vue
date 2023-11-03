<script setup lang="ts">
import MenuBar from "./MenuBar.vue";
import IconMenu from "../icons/IconMenu.vue";
import { useLanguageStore } from "@/stores/language";

import { getCurrentInstance, ref, computed } from "vue";
import { useRouter } from "vue-router";

const Language = useLanguageStore();
const { changeLanguage } = Language;

const internalInstance = getCurrentInstance();

const $openLink =
  internalInstance?.appContext.config.globalProperties.$openLink;

const showMenu = ref<boolean>(false);

const router = useRouter();
const navs = computed(() =>
  router.options.routes.filter((item) => {
    return item?.meta?.showPath;
  })
);
</script>

<template>
  <div class="wf-100 header-cover p-fixed">
    <div
      class="wf-100 max-w-1600 max-w-gl-1320 max-w-xl-1200 m-auto p-lr-20 p-lr-sm-10 h-100 h-sm-60 m-auto flex-row-between"
    >
      <div
        class="pointer ff-tw-700 fs-16 fs-sm-14"
        @click.stop="router.push('/')"
      >
        <img class="h-sm-24" src="@/assets/img/logo.png" alt="" />
      </div>
      <div class="wf-70 flex-row-end d-sm-none">
        <div
          class="m-r-50 m-r-lg-40 m-r-md-20 text-white ff-tw-500 fs-16 fs-sm-14 pointer"
          v-for="(route, index) in navs"
          :key="index"
          @click.stop="
            route?.meta?.isLink
              ? $openLink(route?.meta?.link)
              : router.push(route.path)
          "
        >
          {{ $t(String(route.name)) }}
        </div>
      </div>
      <div class="flex-row-end">
        <n-tag class="m-r-10" round :bordered="true">
          {{ $t("Mainnet") }}
          <template #avatar>
            <n-avatar size="small" class="bg-green" />
          </template>
        </n-tag>
        <n-dropdown
          class="ff-tw-600"
          :options="[
            {
              label: 'En-US',
              key: 'en',
            },
            {
              label: 'Zh-HK',
              key: 'zh',
            },
          ]"
          @select="(key: string) => changeLanguage(key)"
        >
          <svg
            class="h-30 outline-none"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path
              d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 0 0-1.38-3.56A8.03 8.03 0 0 1 18.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 0 1 5.08 16zm2.95-8H5.08a7.987 7.987 0 0 1 4.33-3.56A15.65 15.65 0 0 0 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 0 1-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"
              fill="#ffffff"
            ></path>
          </svg>
        </n-dropdown>
        <IconMenu
          :showMenu="showMenu"
          @closeMenu="showMenu = false"
          @openMenu="showMenu = true"
        />
      </div>
    </div>
  </div>
  <MenuBar :showMenu="showMenu" @closeMenu="showMenu = false" />
</template>
<style lang="scss" scoped>
.header-cover {
  backdrop-filter: blur(4px);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
  box-sizing: border-box;
  z-index: 1100;
  background-color: transparent;
}
</style>
