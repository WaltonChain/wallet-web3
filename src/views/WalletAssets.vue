<script setup lang="ts">
import IconLeft from "@/components/icons/IconLeft.vue";
import i18n from "@/i18n";
import { useWalletStore } from "@/stores/wallet";
import { onBeforeMount, ref } from "vue";
import { useRouter } from "vue-router";
import { getWTCPrice } from "@/api/index";
import { getBalance, sendWTC } from "@/service/wallet";
import { sendWTCByLedger } from "@/service/ledger";
import { rcopy, toThreeFilter } from "@/helpers/util";
const { walletInfo } = useWalletStore();
import { useNotification, useMessage } from "naive-ui";
const { t } = i18n.global;

const $t = t;
const notification = useNotification();
const router = useRouter();
const message = useMessage();
const loading = ref<boolean>(false);
const recipient = ref<string>("");
const amount = ref<string>("");
const balance = ref<string | number>(0);
const price = ref<string | number>(0.14);

function handleCopy(addr: string) {
  rcopy(addr);
  message.success($t("Copied"));
}

function handleGetWTCPrice() {
  getWTCPrice({})
    .then((res) => {
      if (res.data) {
        price.value = res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleGetBalance() {
  if (!walletInfo.address) {
    return;
  }
  getBalance(walletInfo.address)
    .then((ret) => {
      console.log("handleGetBalance", ret);
      balance.value = ret;
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSendWTC() {
  if (!walletInfo.privateKey) {
    return notification.info({
      title: $t("Send"),
      content: $t("SendingFailed"),
      duration: 2000,
    });
  }
  loading.value = true;
  sendWTC(walletInfo.privateKey, recipient.value, amount.value)
    .then((ret) => {
      console.log("handleSendWTC", ret);
      if (ret.code == 1) {
        recipient.value = "";
        amount.value = "";
        notification.success({
          title: $t("Send"),
          content: $t("Success"),
          duration: 2000,
        });
      } else {
        notification.error({
          title: $t("Send"),
          content: ret.massage,
          duration: 2000,
        });
      }
      handleGetBalance();
    })
    .catch((err) => {
      console.log(err);
      notification.info({
        title: $t("Send"),
        content: err.message,
        duration: 2000,
      });
    })
    .finally(() => {
      loading.value = false;
    });
}

function handleSendWTCByLedger() {
  loading.value = true;
  sendWTCByLedger(0, recipient.value, amount.value)
    .then((ret) => {
      console.log("handleSendWTC", ret);
      if (ret.code == 1) {
        recipient.value = "";
        amount.value = "";
        notification.success({
          title: $t("Send"),
          content: $t("Success"),
          duration: 2000,
        });
      } else {
        notification.error({
          title: $t("Send"),
          content: ret.message,
          duration: 2000,
        });
      }
      handleGetBalance();
    })
    .catch((err) => {
      console.log(err);
      notification.info({
        title: $t("Send"),
        content: err.message,
        duration: 2000,
      });
    })
    .finally(() => {
      loading.value = false;
    });
}

function handleSend() {
  if (!amount.value || isNaN(Number(amount.value))) {
    return notification.info({
      title: $t("Send"),
      content: $t("ErrorAmount"),
      duration: 2000,
    });
  }
  const reg = /[^a-fA-F0-9]/;
  if (
    !walletInfo.address ||
    walletInfo.address.length !== 42 ||
    !walletInfo.address.startsWith("0x") ||
    reg.test(walletInfo.address.substring(2))
  ) {
    return notification.info({
      title: $t("Send"),
      content: $t("SendingFailed"),
      duration: 2000,
    });
  }
  if (Number(amount.value) > Number(balance.value) - 0.001) {
    return notification.info({
      title: $t("Send"),
      content: $t("InsufficientBalance"),
      duration: 2000,
    });
  }
  walletInfo.privateKey != "" ? handleSendWTC() : handleSendWTCByLedger();
}

onBeforeMount(() => {
  if (!walletInfo.address) {
    return router.push("/access");
  }
  handleGetWTCPrice();
  handleGetBalance();
});
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
          <div class="flex-row-between flex-wrap">
            <div class="wf-48 wf-sm-100 flex-row-start align-items-start">
              <img
                class="h-sm-24 border-white-1-p-30 radius-50"
                src="@/assets/img/WTC.png"
                alt=""
              />
              <div class="text-white text-left m-lr-10">
                <span class="fs-24 fs-xl-22 fs-lg-20 fs-md-18 fs-sm-16">
                  {{ toThreeFilter(balance, 4, true) }} WTC
                </span>
                <span class="text-white-p-50 fs-14 fs-sm-12">
                  ≈ ${{
                    toThreeFilter(Number(balance) * Number(price), 4, true)
                  }}
                </span>
                <div class="ff-tw-400 text-white-p-50 fs-14 fs-sm-12">
                  1 WTC = {{ toThreeFilter(price, 4, true) }} USD
                </div>
              </div>
            </div>
            <div
              class="wf-50 wf-sm-100 flex-row-sm-between text-right text-sm-left m-t-sm-10"
            >
              <div
                class="wf-sm-80 text-wraper ff-tw-400 fs-16 fs-lg-14 fs-sm-12"
              >
                {{ walletInfo.address || "--" }}
              </div>
              <div
                class="wf-sm-200 flex-row-end pointer"
                @click="handleCopy(walletInfo.address)"
              >
                <div class="flex-row-between">
                  <img
                    class="h-20 h-sm-16 m-r-8 pointer"
                    src="@/assets/icons/copy.svg"
                    alt=""
                  />
                  <span class="text-wraper fs-16 fs-lg-14 fs-sm-12">
                    {{ $t("Copy") }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="flex-row-center p-20 p-sm-10">
            <img class="h-30" src="@/assets/icons/transfer.svg" alt="" />
            <span class="fs-24 fs-xl-22 fs-lg-20 fs-sm-18">
              {{ $t("Send") }}
            </span>
          </div>
          <div class="wf-50 wf-lg-60 wf-md-80 wf-sm-100 m-auto">
            <input
              class="wf-100 bg-black-p-80 p-tb-15 p-tb-sm-10 p-lr-20 p-lr-sm-15 radius-10 text-white"
              type="text"
              :placeholder="$t('EnterRecipient')"
              v-model="recipient"
            />
            <input
              class="wf-100 bg-black-p-80 p-tb-15 p-tb-sm-10 p-lr-20 p-lr-sm-15 radius-10 text-white m-t-10"
              type="text"
              :placeholder="$t('EnterAmount')"
              v-model="amount"
            />

            <n-button
              class="wf-100 bg-green text-black radius-10 fs-16 fs-sm-14 ff-tw-600 m-t-20"
              :loading="loading"
              :disabled="!recipient || !amount"
              size="large"
              color="#00ffda"
              @click="handleSend"
            >
              <img class="h-24 m-r-5" src="@/assets/icons/send.svg" alt="" />
              {{ $t("Confirm") }}
            </n-button>
          </div>
          <div class="m-t-10">
            <span
              class="pointer underline"
              @click="
                () => {
                  recipient = '';
                  amount = '';
                }
              "
            >
              {{ $t("Cancel") }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
