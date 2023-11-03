<script setup lang="ts">
import IconKey from "@/components/icons/IconKey.vue";
import IconLeft from "@/components/icons/IconLeft.vue";
import { ref } from "vue";
import i18n from "@/i18n";
import { useRouter } from "vue-router";
import { useWalletStore } from "@/stores/wallet";
import { decryptPrivateKey } from "@/service/wallet";
import { useNotification } from "naive-ui";

const { t } = i18n.global;
const $t = t;

const router = useRouter();
const { updateWallet } = useWalletStore();
const notification = useNotification();
const loading = ref<boolean>(false);
const privateKey = ref<string>("");

function handleAccessPrivateKey() {
  const reg = /[^a-fA-F0-9]/;
  if (
    !privateKey.value ||
    (privateKey.value.length !== 64 && privateKey.value.length !== 66) ||
    reg.test(privateKey.value.substring(2))
  ) {
    return notification.error({
      title: $t("AccessWallet"),
      content: $t("EnterPrivateKeyTip"),
      duration: 2000,
    });
  }
  const wallet = decryptPrivateKey(privateKey.value);
  if (wallet) {
    updateWallet(wallet.address, wallet.privateKey);
    router.push("/wallet");
  }
}
</script>

<template>
  <div class="min-h-100vh flex-row-center">
    <div class="container p-tb-120 p-tb-sm-80">
      <div class="wf-70 wf-xl-80 wf-sm-100 m-auto">
        <button
          class="bg-transparent flex-row-start text-white ff-tw-700 fs-16 fs-sm-14 radius-15"
          @click="router.push('/access')"
        >
          <IconLeft class="m-r-5" />
          {{ $t("Back") }}
        </button>
        <div
          class="backdrop-filter-blur-15 box-shadow-black-p-25 border-white-1-p-10 m-t-40 p-40 p-sm-20 radius-15 text-center text-white-p-80 ff-tw-700 fs-16 fs-sm-14"
        >
          <div
            class="text-center fs-24 fs-xl-22 fs-lg-20 fs-sm-18 p-20 p-sm-10"
          >
            {{ $t("PrivateKey") }}
          </div>
          <div class="wf-50 wf-lg-60 wf-md-80 wf-sm-100 m-auto">
            <div
              class="flex-row-between pointer bg-black-p-80 p-tb-15 p-lr-20 radius-10"
            >
              <input
                class="hf-100 wf-90 bg-transparent text-white"
                type="password"
                :placeholder="$t('EnterPrivateKey')"
                v-model="privateKey"
              />
              <IconKey />
            </div>

            <n-button
              class="wf-100 bg-green text-black radius-10 fs-16 fs-sm-14 ff-tw-600 m-t-20"
              :loading="loading"
              :disabled="!privateKey"
              size="large"
              color="#00ffda"
              @click="handleAccessPrivateKey"
            >
              {{ $t("AccessWallet") }}
            </n-button>
          </div>
          <div class="m-t-10">
            <span class="pointer underline" @click="router.push('/access')">
              {{ $t("Cancel") }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
