export function encode(str: string) {
  const encoded: string = Buffer.from(str).toString("base64");
  return encoded;
}
