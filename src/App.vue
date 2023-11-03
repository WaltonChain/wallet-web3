<script setup lang="ts">
import TheHeader from "@/components/header/TheHeader.vue";
// import TheFooter from "@/components/footer/TheFooter.vue";
import { storeToRefs } from "pinia";
import { useLanguageStore } from "@/stores/language";
import { NConfigProvider, type GlobalThemeOverrides } from "naive-ui";
import { zhTW, enUS, dateZhTW, dateEnUS, darkTheme } from "naive-ui";
import { ref, watch, onBeforeUnmount, onBeforeMount } from "vue";
import { useCounterStore } from "@/stores/counter";
const counterStore = useCounterStore();
const Language = useLanguageStore();

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: "#8200ff",
    primaryColorHover: "#8200ff",
    primaryColorPressed: "#F9D023",
    errorColor: "rgb(246, 70, 93)",
    borderRadius: "10px",
  },
  Notification: {
    width: "320px",
    color: "#161B21",
  },
  Message: {
    // color: "#161B21",
  },
  Button: {
    textColor: "#FAB72A",
  },
};

const { localLang } = storeToRefs(Language);

// eslint-disable-next-line no-undef
let stimer: NodeJS.Timer | null = null;

const locale = ref(enUS);
const dateLocale = ref(dateEnUS);

watch(
  () => localLang.value,
  () => {
    if (localLang.value == "zh") {
      locale.value = zhTW;
      dateLocale.value = dateZhTW;
    } else {
      locale.value = enUS;
      dateLocale.value = dateEnUS;
    }
  }
);

onBeforeMount(() => {
  stimer = setInterval(() => {
    counterStore.timing();
  }, 1000);
});

onBeforeUnmount(() => {
  clearInterval(Number(stimer));
});
</script>

<template>
  <n-config-provider
    :locale="locale"
    :date-locale="dateLocale"
    :theme="darkTheme"
    :theme-overrides="themeOverrides"
  >
    <TheHeader />
    <div class="min-h-100vh bg-banner">
      <n-notification-provider>
        <n-message-provider>
          <RouterView />
        </n-message-provider>
      </n-notification-provider>
    </div>
    <!-- <TheFooter /> -->
  </n-config-provider>
</template>
