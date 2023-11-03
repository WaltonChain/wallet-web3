<script setup lang="ts">
import { getCurrentInstance, computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const internalInstance = getCurrentInstance();

const $openLink =
  internalInstance?.appContext.config.globalProperties.$openLink;

const emit = defineEmits(["closeMenu"]);

const props = withDefaults(
  defineProps<{
    showMenu: boolean;
  }>(),
  {
    showMenu: false,
  }
);

const navs = computed(() =>
  router.options.routes.filter((item) => {
    return item?.meta?.showPath;
  })
);

watch(
  () => props.showMenu,
  () => {
    props.showMenu ? stop() : recoveScroll();
  }
);

function preventScroll(e: Event) {
  e.preventDefault();
}

function stop() {
  document.body.style.overflow = "hidden";
  document.addEventListener("touchmove", preventScroll, {
    passive: false,
  });
}

function recoveScroll() {
  document.body.style.overflow = "auto";
  document.removeEventListener("touchmove", preventScroll);
}
</script>

<template>
  <div class="d-none d-sm-block">
    <div
      class="model-overlay overlay-effect"
      v-show="showMenu"
      @click="emit('closeMenu')"
    ></div>
    <transition name="slide-fade" mode="out-in">
      <div
        class="wf-70 p-lr-20 proper-content proper-right"
        :class="{ 'overlay-effect': showMenu }"
        v-show="showMenu"
      >
        <div class="wf-100 hf-94 overflow-y-auto z-index-10">
          <div
            class="wf-100 p-t-20 ff-tw-400 fs-14 text-white"
            v-for="(route, index) in navs"
            :key="index"
            @click.stop="
              () => {
                if (route?.meta?.isLink) {
                  $openLink(route?.meta?.link);
                } else {
                  router.push(route.path);
                  emit('closeMenu');
                }
              }
            "
          >
            {{ $t(String(route.name)) }}
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.model-overlay {
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 1000;
  top: 0;
  right: 0;
  background: rgba($color: #000, $alpha: 0.5);
}

.proper-content {
  position: fixed;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 1000;
  backdrop-filter: blur(4px);
  -webkit-transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
  box-sizing: border-box;
  z-index: 1100;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  background-color: transparent;
}

.proper-right {
  bottom: 0;
  right: 0;
  height: calc(100% - 60px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease-in-out;
  transform: translateX(0%);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(100%);
}
</style>
