import BigNumber from "bignumber.js";

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function convertStringToHex(value: number | string) {
  return new BigNumber(`${value}`).toString(16);
}

export function sanitizeHex(hex: string) {
  hex = hex.substring(0, 2) === "0x" ? hex.substring(2) : hex;
  if (hex === "") {
    return "";
  }
  hex = hex.length % 2 !== 0 ? "0" + hex : hex;
  return "0x" + hex;
}

export function dividedBy(a: number | string, b: number | string) {
  return new BigNumber(`${a}`).dividedBy(b).toString(10);
}

export function multipliedBy(a: number | string, b: number | string) {
  return new BigNumber(`${a}`).multipliedBy(b).toString(10);
}

export function plus(a: number | string, b: number | string) {
  return new BigNumber(`${a}`).plus(b).toString(10);
}

export function toThreeFilter(
  num: number | string,
  decimal = 3,
  isNumber = true
) {
  if (!num || !Number(num) || isNaN(Number(num))) {
    return isNumber ? (decimal === 0 ? 0 : "0.00") : "--";
  }
  const ft = new BigNumber(num).toString(10).split(".");
  const left = ft[0] || "";
  const right = !ft[1] || !decimal ? "" : "." + ft[1].substring(0, decimal);
  const numberStri = left + right;
  return numberStri.replace(/^-?\d+/g, (m) =>
    m.replace(/(?=(?!\b)(\d{3})+$)/g, ",")
  );
}

export function openLink(url: string) {
  if (url) window.open(url);
}

export function getAssetsImge(url: string) {
  return new URL(url, import.meta.url).href;
}

export function toLocaleTime(time: number): string {
  return (
    new Date(time).toLocaleDateString() +
    " " +
    new Date(time).toLocaleTimeString()
  );
}

export function rcopy(data: string) {
  const oInput = document.createElement("input");
  oInput.value = data;
  document.body.appendChild(oInput);
  oInput.select();
  document.execCommand("Copy");
  oInput.remove();
}
