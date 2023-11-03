<script setup lang="ts">
import IconKey from "@/components/icons/IconKey.vue";
import IconMnemonic from "@/components/icons/IconMnemonic.vue";
import IconKeystore from "@/components/icons/IconKeystore.vue";
import IconLedger from "@/components/icons/IconLedger.vue";
import IconLeft from "@/components/icons/IconLeft.vue";
import i18n from "@/i18n";
import { useWalletStore } from "@/stores/wallet";
import { useNotification } from "naive-ui";
import { ref } from "vue";

const { updateWallet } = useWalletStore();
import { useRouter } from "vue-router";
import { connectLedger } from "@/service/ledger";

const { t } = i18n.global;
const $t = t;

const notification = useNotification();
const router = useRouter();
const loading = ref<boolean>(false);

async function handleConnectLedger() {
  loading.value = true;
  const ret = await connectLedger();
  console.log(ret);
  if (ret.code == 1) {
    notification.success({
      title: $t("AccessWallet"),
      content: $t("ConnectedLedger"),
      duration: 2000,
    });
    updateWallet(ret?.data?.accountInfo?.address, "");
    router.push("/wallet");
  } else {
    notification.error({
      title: $t("AccessWallet"),
      content: ret.message,
      duration: 2000,
    });
  }
  loading.value = false;
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
          class="backdrop-filter-blur-15 box-shadow-black-p-25 border-white-1-p-10 m-t-40 p-40 p-sm-20 radius-15 text-center text-white-p-80 ff-tw-700 fs-16 fs-sm-14"
        >
          <div class="text-center">
            <img class="h-sm-24" src="@/assets/img/wtc-logo.png" alt="" />
            <div class="p-20 p-sm-10">{{ $t("HowToAccess") }}</div>
          </div>
          <div class="wf-50 wf-lg-60 wf-md-80 wf-sm-100 m-auto">
            <div
              class="flex-row-between pointer bg-black-p-80 p-tb-15 p-lr-20 access-select"
              @click="router.push('/privatekey')"
            >
              <div>{{ $t("PrivateKey") }}</div>
              <IconKey />
            </div>
            <div
              class="flex-row-between pointer bg-black-p-80 p-tb-15 p-lr-20 access-select m-t-10"
              @click="router.push('/mnemonic')"
            >
              <div>{{ $t("MnemonicKeyPhrase") }}</div>
              <IconMnemonic />
            </div>
            <div
              class="flex-row-between pointer bg-black-p-80 p-tb-15 p-lr-20 access-select m-t-10"
              @click="router.push('/keystore')"
            >
              <div>{{ $t("KeystoreFile") }}</div>
              <IconKeystore />
            </div>
            <n-space class="wf-100 n-ledger">
              <n-spin class="wf-100 n-ledger-spin" :show="loading" size="small">
                <div
                  class="wf-100 flex-row-between pointer bg-black-p-80 p-tb-15 p-lr-20 access-select m-t-10"
                  @click="handleConnectLedger"
                >
                  <div>Ledger</div>
                  <IconLedger class="w-20" />
                </div>
                <template #description>
                  <div class="fs-12 text-white">
                    {{ $t("UnlockLedger") }}
                  </div>
                </template>
              </n-spin>
            </n-space>
          </div>

          <div class="m-t-10">
            <span class="pointer underline" @click="router.push('/')">
              {{ $t("Cancel") }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
