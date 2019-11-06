import { BinaryLike, HexBase64Latin1Encoding } from "crypto";
import { createHash } from "./createHash";

/**
 * SHA1
 *
 * @param {BinaryLike} data - 数据
 * @param {HexBase64Latin1Encoding} encoding - 编码
 */
export const SHA1 = createHash("sha1");
