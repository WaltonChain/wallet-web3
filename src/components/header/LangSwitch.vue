<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLanguageStore } from "@/stores/language";
import { ref, onMounted, onBeforeUnmount } from "vue";

const showLangSelect = ref<boolean>(false);

const Language = useLanguageStore();
const { changeLanguage } = Language;

const { langObj, localLang, langList } = storeToRefs(Language);

const scrollHanlder = () => {
  showLangSelect.value = false;
};

onMounted(() => {
  window.addEventListener("scroll", scrollHanlder);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", scrollHanlder);
});
</script>

<template>
  <div
    class="h-40 text-white p-relative"
    @mouseenter="showLangSelect = true"
    @mouseleave="showLangSelect = false"
  >
    <div
      class="w-sm-100 hf-100 flex-row-between pointer p-lr-10 p-l-sm-0"
      @click="showLangSelect = !showLangSelect"
    >
      <span
        class="white-space-nowrap m-lr-6 m-l-sm-0 text-white fs-16 ff-tw-500"
      >
        {{ langObj[localLang as keyof typeof langObj] }}
      </span>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.46971 6.89893L0.594114 1.97025C0.527213 1.87261 0.488806 1.75846 0.483151 1.64045C0.477496 1.52244 0.504814 1.40517 0.562076 1.30165C0.619338 1.19813 0.704309 1.1124 0.807572 1.05395C0.910835 0.995502 1.02836 0.966625 1.14711 0.970517H6.90333C7.02209 0.966625 7.13961 0.995502 7.24287 1.05395C7.34613 1.1124 7.4311 1.19813 7.48837 1.30165C7.54563 1.40517 7.57295 1.52244 7.56729 1.64045C7.56164 1.75846 7.52323 1.87261 7.45633 1.97025L4.58073 6.89893C4.52402 6.99537 4.4429 7.07538 4.34544 7.13097C4.24798 7.18657 4.13758 7.21582 4.02522 7.21582C3.91286 7.21582 3.80246 7.18657 3.705 7.13097C3.60754 7.07538 3.52642 6.99537 3.46971 6.89893Z"
          fill="white"
        />
      </svg>
    </div>
    <div
      class="p-t-center p-top-p-100 wf-100 p-t-20 p-t-sm-10 pointer"
      v-if="showLangSelect"
    >
      <ul
        class="w-80 flex-row-between flex-wrap p-10 bg-main-dark border-white-1-p-10 radius-12"
        @mouseleave="showLangSelect = false"
      >
        <li
          class="wf-100 flex-row-center p-tb-4 p-lr-10 text-center ff-tw-400 fs-14"
          :class="{
            'text-purple  radius-10': localLang == item,
          }"
          v-for="(item, index) in langList"
          :key="index"
          @click.stop="
            changeLanguage(item);
            showLangSelect = false;
          "
        >
          <span class="text-center white-space-nowrap">
            {{ langObj[item as keyof typeof langObj] }}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>
