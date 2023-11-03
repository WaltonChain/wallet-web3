import { ref } from "vue";
import { defineStore } from "pinia";

interface IWallet {
  address: string;
  privateKey: string;
}

export const useWalletStore = defineStore("wallet", () => {
  const walletInfo = ref<IWallet>({
    address: "",
    privateKey: "",
  });

  function updateWallet(address: string, privateKey: string) {
    walletInfo.value = {
      address,
      privateKey,
    };
  }

  return { walletInfo, updateWallet };
});
