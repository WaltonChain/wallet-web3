import { RPC, CHAINID } from "@/constant/index";
import { listen } from "@ledgerhq/logs";
import AppEth from "@ledgerhq/hw-app-eth";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(RPC);

export async function connectLedger(fromPath = 0) {
  console.log(`Trying to connect via WEB USB...`);
  let transport = null;
  try {
    transport = await TransportWebUSB.create();
    listen((log) => console.log(log));
    const appEth = new AppEth(transport);

    const accountInfo = await appEth.getAddress(`44'/60'/${fromPath}'/0/0`);
    const appConf = await appEth.getAppConfiguration();
    return {
      code: 1,
      message: "success",
      data: {
        transport,
        accountInfo,
        appConf,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      code: -1,
      message: "Error: Ledger device: UNKNOWN_ERROR",
      data: {
        transport: null,
        accountInfo: {
          address: "",
        },
        appConf: {},
      },
    };
  }
}

export async function sendWTCByLedger(
  fromPath: number,
  recipient: string,
  amount: string
) {
  try {
    // 1. Set provider
    // const provider = new ethers.providers.JsonRpcProvider(RPC);

    // 2. Connect to Ledger
    const transport = await TransportWebUSB.create();
    const appEth = new AppEth(transport);

    // 3. GET Ledger address
    const { address } = await appEth.getAddress(
      `44'/60'/${fromPath}'/0/0`,
      false
    );
    console.log("address:", address);
    console.log("gasPrice:", (await provider.getGasPrice()).toNumber());

    // 4. Build tx
    const tx = {
      nonce: await provider.getTransactionCount(address),
      gasPrice: ethers.utils.hexlify(await provider.getGasPrice()),
      gasLimit: ethers.utils.hexlify(21000),
      to: recipient,
      value: ethers.utils.parseEther(amount)._hex,
      data: "0x00",
      chainId: CHAINID,
    };

    // console.log("tx:::", tx);

    // 5. Serialize
    const unsignedTx = ethers.utils.serializeTransaction(tx).substring(2);

    // 6. Sign
    const signature = await appEth.signTransaction(
      `44'/60'/${fromPath}'/0/0`,
      unsignedTx
    );

    const signedTx = ethers.utils.serializeTransaction(tx, {
      r: "0x" + signature.r,
      s: "0x" + signature.s,
      v: tx.chainId * 2 + 35, // or transaction.chainId * 2 + 36
    });

    //Sending the transaction to the blockchain
    const response = await provider.sendTransaction(signedTx);
    console.log(`Transaction hash: ${response.hash}`);

    await response.wait();
    console.log("Transaction confirmed");
    return {
      code: 1,
      message: "success",
      data: response,
    };
  } catch (error) {
    console.log(error);
    return {
      code: -1,
      message: "failed",
    };
  }
}
