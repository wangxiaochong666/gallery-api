import crypto, { BinaryLike, HexBase64Latin1Encoding } from "crypto";

/**
 * 创建哈希
 *
 * @param algorithm - 算法
 */
export function createHash(algorithm: string) {
  return function(data: BinaryLike, encoding: HexBase64Latin1Encoding = "hex"): Buffer | string {
    const shasum = crypto.createHash(algorithm);
    shasum.update(data);
    return shasum.digest(encoding);
  };
}
