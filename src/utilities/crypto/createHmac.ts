import crypto, { BinaryLike, HexBase64Latin1Encoding } from "crypto";

/**
 * 创建 HMAC
 *
 * @param algorithm - 算法
 */
export function createHmac(algorithm: string) {
  return function(data: BinaryLike, key: BinaryLike, encoding: HexBase64Latin1Encoding = "hex") {
    return crypto
      .createHmac(algorithm, key)
      .update(data)
      .digest(encoding);
  };
}
