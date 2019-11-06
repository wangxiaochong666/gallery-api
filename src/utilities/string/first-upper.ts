import { lowerCase } from "./lower-case";
import { upperCase } from "./upper-case";

/**
 * 首字母大写
 *
 * @param str 字符串
 */
export function firstUpper(str: string) {
  return lowerCase(str).replace(/^\S/g, upperCase);
}
