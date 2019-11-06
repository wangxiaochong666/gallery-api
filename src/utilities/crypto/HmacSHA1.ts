import { BinaryLike, HexBase64Latin1Encoding } from "crypto";
import { createHmac } from "./createHmac";

/**
 * Hmac SHA1
 *
 * @param {BinaryLike} data - 数据
 * @param {BinaryLike} key - key
 * @param {HexBase64Latin1Encoding} encoding - 编码
 */
export const HmacSHA1 = createHmac("sha1");
