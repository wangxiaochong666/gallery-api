export function decode(base64Str: string) {
  const decode = Buffer.from(base64Str, "base64").toString("utf-8");
  return decode;
}
