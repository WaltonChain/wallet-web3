import { RPC } from "@/constant/index";
import { saveAs } from "file-saver";
import { Wallet, ethers } from "ethers";
const provider = new ethers.providers.JsonRpcProvider(RPC);

export async function getBalance(account: string) {
  const reg = /[^a-fA-F0-9]/;
  if (!account || account.length !== 42 || reg.test(account.substring(2))) {
    return 0;
  }
  const balance = await provider.getBalance(account);
  console.log(ethers.utils.formatEther(balance));
  return ethers.utils.formatEther(balance);
}

export function createWallet(salt: string): Wallet | null {
  const wallet = ethers.Wallet.createRandom(salt);
  console.log(wallet);

  return wallet;
}

export function decryptPrivateKey(pk: string): Wallet | null {
  if (!pk) {
    return null;
  }
  if (pk.includes("0x")) {
    pk = pk.substr(2);
  }
  const wallet = new ethers.Wallet(pk);
  return wallet;
}

export function decryptMnemonic(mnemonic: string): Wallet | null {
  if (!mnemonic || mnemonic.split(" ").length != 12) {
    return null;
  }
  const wallet = ethers.Wallet.fromMnemonic(mnemonic);
  return wallet;
}

export function decryptKeystore(data: string, password: string) {
  if (!data) {
    return {
      code: -1,
      massage: "params error",
      data: null,
    };
  }
  try {
    const jsonData = JSON.stringify(data);
    const wallet = ethers.Wallet.fromEncryptedJsonSync(jsonData, password);
    return {
      code: 1,
      massage: "success",
      data: wallet,
    };
  } catch (error) {
    console.log("error:", error);
    return {
      code: -1,
      massage: "incorrect password",
      data: null,
    };
  }
}

export function exportKeystore(wallet: Wallet, password: string) {
  if (!password) {
    return {
      code: -1,
      massage: "password error",
      data: null,
    };
  }
  wallet.encrypt(password).then((json) => {
    const blob = new Blob([json], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "keystore.json");
    return {
      code: 1,
      massage: "success",
      data: "keystore.json",
    };
  });
}

export async function sendWTC(pk: string, recipient: string, amount: string) {
  const wallet = new ethers.Wallet(pk, provider);

  const tx = {
    to: recipient,
    value: ethers.utils.parseEther(amount),
  };
  try {
    const transactionResponse = await wallet.sendTransaction(tx);

    console.log("Transaction hash:", transactionResponse.hash);

    const receipt = await transactionResponse.wait();

    if (receipt && receipt.status === 1) {
      console.log("Transaction was successful!");
      return {
        code: 1,
        massage: "success",
        data: receipt,
      };
    } else {
      console.error("Transaction failed.");
      return {
        code: -1,
        massage: "failed",
        data: "Transaction failed.",
      };
    }
  } catch (error) {
    console.error("Error sending transaction:", error);
    return {
      code: -1,
      massage: "error",
      data: error,
    };
  }
}
