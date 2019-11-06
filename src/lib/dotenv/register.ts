"use strict";

import { realpathSync, existsSync } from "fs";
import { resolve } from "path";
import dotenvExpand from "dotenv-expand";
import { config } from "dotenv";

const appDirectory: string = realpathSync(process.cwd());

const resolveApp = (relativePath: string) => resolve(appDirectory, relativePath);

const NODE_ENV = process.env.NODE_ENV || "development";

const dotenvFiles = [
  resolveApp(`.env/.env.${NODE_ENV}.local`),
  resolveApp(`.env/.env.${NODE_ENV}`),
  resolveApp(`.env/.env.local`),
  resolveApp(`.env/.env`),
].filter(Boolean);

dotenvFiles.forEach(
  dotenvFile =>
    existsSync(dotenvFile) &&
    dotenvExpand(
      config({
        path: dotenvFile,
      })
    )
);
