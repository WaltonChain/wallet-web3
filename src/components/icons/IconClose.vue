<script setup lang="ts">
defineProps<{
  showMenu: boolean;
}>();
</script>

<template>
  <svg
    v-show="showMenu"
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 16 16"
    fill="#fff"
    @click="$emit('closeMenu')"
  >
    <path
      d="M-1236.9-205.516l5.257,5.256a1.242,1.242,0,0,1,0,1.756,1.242,1.242,0,0,1-1.756,0h0l-5.257-5.257-5.292,5.292a1.25,1.25,0,0,1-1.768,0,1.251,1.251,0,0,1,0-1.768h0l5.292-5.293-5.257-5.257a1.241,1.241,0,0,1,.047-1.754,1.241,1.241,0,0,1,1.707,0l5.257,5.257,5.328-5.327a1.25,1.25,0,0,1,1.768,0,1.25,1.25,0,0,1,0,1.768Z"
      transform="translate(1246.088 212.979)"
    />
  </svg>
</template>
