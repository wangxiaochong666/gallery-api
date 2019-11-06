import os from "os";
import { MD5 } from "../crypto/MD5";

export const make = (function() {
  let counter = 0;
  let last: number;

  const machine: string = os.hostname();
  const pid: number = process.pid;

  return function() {
    const val: number = Math.floor(Math.random() * 1000000000000);

    if (val === last) {
      counter++;
    } else {
      counter = 0;
    }

    last = val;

    const uid = `${machine}${pid}${val}${counter}`;
    return MD5(uid, "hex");
  };
})();
