import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { defineStore } from "pinia";

export const useLanguageStore = defineStore("language", () => {
  const { locale } = useI18n();
  const localLang = ref<string>(sessionStorage.getItem("locale") || "en");
  const langList = reactive(["en", "zh"]);
  const langObj = reactive({
    en: "En-US",
    zh: "Zh-HK",
  });

  function changeLanguage(la: string) {
    localLang.value = la;
    locale.value = la;
    sessionStorage.setItem("locale", la);
  }

  return { langList, langObj, localLang, changeLanguage };
});
