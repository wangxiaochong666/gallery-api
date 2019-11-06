/**
 * normalize port
 * @param value - port
 */
export function normalize(val: string): string | number | false {
  const port: number = parseInt(val, 10);
  if (isNaN(port)) return val; // named pipe
  if (port >= 0) return port; // port number
  return false;
}
