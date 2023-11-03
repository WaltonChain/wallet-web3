import { createI18n } from "vue-i18n";

import en from "./lang/en";
import zh from "./lang/zh";

const i18n = createI18n({
  // warnHtmlInMessage: "off", // disable of the Detected HTML in message < v9.x
  warnHtmlMessage: false, // disable of the Detected HTML in message >= v9.x
  legacy: false,
  globalInjection: true, //$t
  locale: sessionStorage.getItem("locale") || "en",
  fallbackLocale: "en",
  messages: {
    en,
    zh,
  },
  silentTranslationWarn: true,
});

export default i18n;
