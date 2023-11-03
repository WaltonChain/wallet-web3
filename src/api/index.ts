import request from "../helpers/request";

/**
 * Get WTC price
 */
export function getWTCPrice(params: any) {
  return request({
    url: "https://www.waltonchain.pro/v2/api/getWTCPrice",
    method: "get",
    params,
  });
}
