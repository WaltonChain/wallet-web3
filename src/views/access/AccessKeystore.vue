<script setup lang="ts">
import IconKeystore from "@/components/icons/IconKeystore.vue";
import IconLeft from "@/components/icons/IconLeft.vue";
import i18n from "@/i18n";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useWalletStore } from "@/stores/wallet";
import { decryptKeystore } from "@/service/wallet";
import { useNotification, type UploadFileInfo } from "naive-ui";

const { t } = i18n.global;
const $t = t;

const router = useRouter();
const { updateWallet } = useWalletStore();
const notification = useNotification();
const showPassword = ref<boolean>(false);
const loading = ref<boolean>(false);
const jsonData = ref<any>();
const password = ref<string>("");

async function handleAccessKeystore() {
  if (!password.value) {
    return notification.error({
      title: $t("AccessWallet"),
      content: $t("EnterPassword"),
      duration: 2000,
    });
  }
  if (!jsonData.value) {
    return notification.error({
      title: $t("AccessWallet"),
      content: $t("UploadFile"),
      duration: 2000,
    });
  }
  const ret = await decryptKeystore(jsonData.value, password.value);
  // console.log(ret);
  if (ret.code == 1 && ret.data) {
    updateWallet(ret.data.address, ret.data.privateKey);
    router.push("/wallet");
  } else {
    notification.error({
      title: $t("AccessWallet"),
      content: ret.massage || "failed",
      duration: 2000,
    });
  }
}

function handleFileUpload(fileList: Array<{ file: File }>) {
  console.log(fileList);
  if (fileList.length > 0) {
    const file = fileList[0].file; // 取第一个文件，因为我们处理的是单个文件上传

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      const textContent = event.target?.result;
      if (typeof textContent === "string") {
        try {
          jsonData.value = JSON.parse(textContent);
          console.log(jsonData.value); // 输出解析后的 JSON 数据
        } catch (error) {
          console.error("Error parsing JSON file:", error);
        }
      }
    };
    reader.readAsText(file); // 读取文件内容为文本
  }
}

function handleUploadChange(params: any) {
  console.log("params", params.file);
}

function handleUploadFinish({
  file,
  event,
}: {
  file: UploadFileInfo;
  event?: ProgressEvent;
}) {
  console.log(file);
  console.log(event);
}
function handleUploadError(params: any) {
  console.log(params);
}
function handleRemove(params: any) {
  console.log(params);
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
            {{ $t("KeystoreFile") }}
          </div>
          <div class="wf-50 wf-lg-60 wf-md-80 wf-sm-100 m-auto">
            <n-upload
              :max="1"
              list-type="text"
              accept=".json, .keystore"
              @error="handleUploadError"
              @remove="handleRemove"
              @change="handleUploadChange"
              @finish="handleUploadFinish"
              @update:file-list="handleFileUpload as any"
            >
              <n-upload-dragger>
                <n-icon size="40" :depth="2">
                  <IconKeystore />
                </n-icon>
                <div class="text-white-p-50 ff-tw-400 fs-14 fs-sm-12">
                  {{ $t("UploadFile") }}
                </div>
              </n-upload-dragger>
            </n-upload>

            <div
              class="flex-row-between pointer bg-black-p-80 p-tb-15 p-lr-20 radius-10"
            >
              <input
                class="hf-100 wf-90 bg-transparent text-white"
                :type="showPassword ? 'text' : 'password'"
                :placeholder="$t('EnterPassword')"
                v-model="password"
              />
              <img
                class="h-20"
                src="@/assets/icons/lock.svg"
                alt=""
                @click="showPassword = !showPassword"
              />
            </div>
            <n-button
              class="wf-100 bg-green text-black radius-10 fs-16 fs-sm-14 ff-tw-600 m-t-20"
              :loading="loading"
              :disabled="!password || !jsonData"
              size="large"
              color="#00ffda"
              @click="handleAccessKeystore"
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
