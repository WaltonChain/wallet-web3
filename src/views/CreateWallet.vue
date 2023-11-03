<script setup lang="ts">
import IconLeft from "@/components/icons/IconLeft.vue";
import i18n from "@/i18n";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { rcopy } from "@/helpers/util";
// import { useWalletStore } from "@/stores/wallet";
import { createWallet } from "@/service/wallet";
import { useNotification, useMessage } from "naive-ui";
// const { updateWallet } = useWalletStore();
const message = useMessage();
const { t } = i18n.global;

const $t = t;
const notification = useNotification();

const router = useRouter();

const loading = ref<boolean>(false);
const salt = ref<string>("");
const address = ref<string>("");
const privateKey = ref<string>("");
const mnemonic = ref<string>("");

// const wallet = {
//   _isSigner: true,
//   address: "0x24b6287cd971A942ADD6B0e30B5E7d6993441081",
//   provider: null,
//   mnemonic: {
//     phrase:
//       "age garage gallery labor spare dignity belt glow one joy vapor patient",
//     path: "m/44'/60'/0'/0/0",
//     locale: "en",
//   },
//   privateKey:
//     "0xe1f2cef364753ae6eb2e47bd41fce6dcf9b4548901338c19a2df1bca8d035946",
//   publicKey:
//     "0x04834b77a13c65581576b86764dba7cdcebd51b8dac27bb56f4952fc71c5b1fa193e72df9de2609cf3c67a8d8366af4216c286cff76187653355f7c7f8a0be0369",
// };

// address.value = wallet?.address || "";
// privateKey.value = wallet.privateKey;
// mnemonic.value = wallet.mnemonic.phrase;
function handleCopy(addr: string) {
  rcopy(addr);
  message.success($t("Copied"));
}

function handleSubmit() {
  const wallet = createWallet(salt.value);
  console.log("wallet::::", wallet);
  if (!wallet?.address) {
    return notification.info({
      title: $t("CreateWallet"),
      content: $t("Failed"),
      duration: 2000,
    });
  }
  address.value = wallet?.address || "";
  privateKey.value = wallet.privateKey;
  mnemonic.value = wallet.mnemonic.phrase;
  // updateWallet(address.value, privateKey.value);
  // router.push("/wallet");
}
</script>

<template>
  <div class="min-h-100vh flex-row-center">
    <div class="container p-tb-120 p-tb-sm-80">
      <div class="wf-70 wf-xl-80 wf-sm-100 m-auto">
        <button
          class="bg-transparent flex-row-start text-white ff-tw-700 fs-16 fs-sm-14 radius-15"
          @click="router.push('/')"
        >
          <IconLeft class="m-r-5" />
          {{ $t("Back") }}
        </button>
        <div
          class="backdrop-filter-blur-15 box-shadow-black-p-25 border-white-1-p-10 m-t-40 p-40 p-sm-20 radius-15 text-center text-white-p-80 ff-tw-400 fs-16 fs-sm-14"
        >
          <div class="text-center">
            <img class="h-sm-24" src="@/assets/img/wtc-logo.png" alt="" />
            <div class="p-20 p-sm-10">{{ $t("CreateNewWallet") }}</div>
          </div>
          <div class="wf-100 border-t-white-p-20 m-tb-20"></div>
          <div class="wf-70 wf-xl-80 wf-sm-100 m-auto" v-if="address">
            <div
              class="flex-row-between pointer bg-black-p-80 p-tb-15 p-lr-20 access-select m-t-10"
              @click="handleCopy(address)"
            >
              <div class="wf-90 text-left text-wraper">{{ address }}</div>
              <img class="h-24" src="@/assets/icons/copy.svg" alt="" />
            </div>
            <div
              class="flex-row-between pointer bg-black-p-80 p-tb-15 p-lr-20 access-select m-t-10"
              @click="handleCopy(privateKey)"
            >
              <div class="wf-90 text-left text-wraper">{{ privateKey }}</div>
              <img class="h-24" src="@/assets/icons/copy.svg" alt="" />
            </div>
            <div
              class="flex-row-between pointer bg-black-p-80 p-tb-15 p-lr-20 access-select m-t-10"
              @click="handleCopy(mnemonic)"
            >
              <div class="wf-90 text-left word-break">{{ mnemonic }}</div>
              <img class="h-24" src="@/assets/icons/copy.svg" alt="" />
            </div>
          </div>

          <n-button
            class="w-240 fw-700 fs-16 h-45 h-sm-40"
            type="primary"
            text-color="#fff"
            :loading="loading"
            @click="handleSubmit"
            v-else
          >
            {{ $t("GenerateKeyPhrase") }}
          </n-button>

          <div class="wf-100 m-tb-20 fs-14 fs-sm-12">
            {{ $t("MakeSureBackup") }}
          </div>
          <n-button
            class="w- fw-700 fs-16 h-45 h-sm-40"
            type="default"
            text-color="#fff"
            :loading="loading"
            @click="router.push('/')"
          >
            {{ $t("Cancel") }}
          </n-button>
        </div>
      </div>
    </div>
  </div>
</template>
