export function create() {
  let now = Date.now();

  const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (now + Math.random() * 16) % 16 | 0;
    now = Math.floor(now / 16);
    return (c === "x" ? r : (r & 0x7) | 0x8).toString(16);
  });

  return uuid;
}
