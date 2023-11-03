<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const showBlack = ref<boolean>(false);
const scrollTop = ref<number>(0);

const scrollHanlder = () => {
  scrollTop.value = window.scrollY;
  if (scrollTop.value >= 40) {
    showBlack.value = true;
  } else {
    showBlack.value = false;
  }
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
    class="container flex-row-between justify-content-sm-center flex-sm-wrap p-b-60 p-b-sm-40 p-lr-lg-20"
  ></div>
</template>
