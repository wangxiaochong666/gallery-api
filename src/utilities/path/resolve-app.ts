import { resolve } from "path";
import { appDirectory } from "./app-directory";

export const resolveApp = (relativePath: string) => resolve(appDirectory, relativePath);
