import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", () => {
  const ts = ref(Date.now());
  const currentTime = computed(() => ts);
  function timing() {
    ts.value = Date.now();
  }

  return { currentTime, ts, timing };
});
