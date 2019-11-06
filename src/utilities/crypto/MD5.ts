import { BinaryLike, HexBase64Latin1Encoding } from "crypto";
import { createHash } from "./createHash";

/**
 * MD5
 *
 * @param {BinaryLike} data - 数据
 * @param {HexBase64Latin1Encoding} encoding - 编码
 */
export const MD5 = createHash("md5");
