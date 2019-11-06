import { realpathSync } from "fs";

export const appDirectory = realpathSync(process.cwd());
