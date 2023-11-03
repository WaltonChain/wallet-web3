<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div class="min-h-100vh flex-row-center">
    <div class="container p-tb-sm-80">
      <n-alert :title="$t('Warning')" type="warning" closable>
        {{ $t("MakeSureNetwork") }}
      </n-alert>
      <div
        class="wf-80 wf-sm-100 m-auto m-tb-40 m-tb-sm-20 text-center text-white-p-80 ff-tw-500 fs-20 fs-xl-18 fs-lg-16 fs-sm-14"
      >
        {{ $t("WaltonchainWallet") }}
      </div>
      <div class="flex-row-between flex-sm-wrap">
        <div
          class="wf-45 wf-sm-100 p-40 p-xl-30 p-lg-20 p-sm-15 backdrop-filter-blur-15 box-shadow-black-p-25 border-white-1-p-10 radius-10"
        >
          <div class="h-96 h-sm-60 ff-tw-600 fs-30 fs-xl-26 fs-lg-22 fs-sm-16">
            {{ $t("CreateWTCWallet") }}
          </div>
          <button
            class="text-white bg-purple radius-10 fs-16 fs-sm-14 ff-tw-600 m-t-60 m-t-sm-40 p-tb-12 p-tb-sm-8 p-lr-25 p-lr-sm-20"
            @click="router.push('/create')"
          >
            {{ $t("CreateWallet") }}
          </button>
        </div>
        <div
          class="wf-45 wf-sm-100 p-40 p-xl-30 p-lg-20 p-sm-15 backdrop-filter-blur-15 box-shadow-black-p-25 border-white-1-p-10 radius-10 m-t-sm-20"
        >
          <div class="h-96 h-sm-30 ff-tw-600 fs-30 fs-xl-26 fs-lg-22 fs-sm-16">
            {{ $t("AccessYourWallet") }}
          </div>
          <button
            class="bg-green text-black radius-10 fs-16 fs-sm-14 ff-tw-600 m-t-60 m-t-sm-40 p-tb-12 p-tb-sm-8 p-lr-25 p-lr-sm-20"
            @click="router.push('/access')"
          >
            {{ $t("AccessWallet") }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
